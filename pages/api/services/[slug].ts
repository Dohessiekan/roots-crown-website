import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

// Utility to slugify service names for URLs
function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query

  if (typeof slug !== 'string') {
    return res.status(400).json({ message: 'Invalid service slug' })
  }

  switch (req.method) {
    case 'GET':
      return await getServiceBySlug(req, res, slug)
    default:
      return res.status(405).json({ message: 'Method not allowed' })
  }
}

async function getServiceBySlug(req: NextApiRequest, res: NextApiResponse, slug: string) {
  try {
    // First try to find by slug
    let service = await prisma.service.findUnique({
      where: { slug },
      include: {
        category: true,
        staffServices: {
          include: {
            staff: {
              include: {
                availability: true
              }
            }
          }
        }
      }
    })

    // If not found by slug, try to find by name slug
    if (!service) {
      const services = await prisma.service.findMany({
        include: {
          category: true,
          staffServices: {
            include: {
              staff: {
                include: {
                  availability: true
                }
              }
            }
          }
        }
      })
      
      service = services.find(s => slugify(s.name) === slug) || null
    }

    if (!service) {
      return res.status(404).json({ message: 'Service not found' })
    }

    // Transform to match frontend expectations
    const transformedService = {
      ...service,
      category: service.category.slug, // Frontend expects category as string
      slug: slugify(service.name), // Ensure slug matches frontend expectation
      specialties: service.staffServices.map(ss => ss.staff.name), // Available staff names
      availableStaff: service.staffServices.map(ss => ({
        name: ss.staff.name,
        role: ss.staff.title,
        rating: ss.staff.rating || 4.5,
        availability: ss.staff.nextAvailable || 'Available',
        specialties: JSON.parse(ss.staff.specialties || '[]')
      }))
    }

    return res.status(200).json(transformedService)
  } catch (error) {
    console.error('Error fetching service:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
