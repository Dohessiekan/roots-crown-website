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
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const services = await prisma.service.findMany({
      include: {
        category: true,
        staffServices: {
          include: {
            staff: true
          }
        }
      }
    })

    // Transform to match your frontend's categoryServices structure
    const categoryServices: Record<string, any[]> = {}

    services.forEach(service => {
      const categorySlug = service.category.slug
      if (!categoryServices[categorySlug]) {
        categoryServices[categorySlug] = []
      }

      categoryServices[categorySlug].push({
        name: service.name,
        description: service.description,
        price: service.price,
        duration: service.duration,
        slug: slugify(service.name),
        category: categorySlug,
        id: service.id
      })
    })

    // Also return flattened array with category info
    const allServices = services.map(service => ({
      name: service.name,
      description: service.description,
      price: service.price,
      duration: service.duration,
      category: service.category.slug,
      slug: slugify(service.name),
      id: service.id
    }))

    return res.status(200).json({
      categoryServices,
      allServices
    })
  } catch (error) {
    console.error('Error fetching all services:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
