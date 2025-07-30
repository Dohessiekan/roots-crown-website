import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return await getServices(req, res)
    case 'POST':
      return await createService(req, res)
    default:
      return res.status(405).json({ message: 'Method not allowed' })
  }
}

async function getServices(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { categoryId } = req.query
    
    const whereClause = categoryId && typeof categoryId === 'string' 
      ? { categoryId } 
      : {}

    const services = await prisma.service.findMany({
      where: whereClause,
      include: {
        category: true,
        staffServices: {
          include: {
            staff: true
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    })

    return res.status(200).json(services)
  } catch (error) {
    console.error('Error fetching services:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

async function createService(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id, name, slug, description, price, duration, image, categoryId } = req.body

    if (!id || !name || !slug || !description || !price || !duration || !categoryId) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const service = await prisma.service.create({
      data: {
        id,
        name,
        slug,
        description,
        price,
        duration,
        image,
        categoryId
      },
      include: {
        category: true
      }
    })

    return res.status(201).json(service)
  } catch (error) {
    console.error('Error creating service:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
