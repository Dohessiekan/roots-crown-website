import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return await getCategories(req, res)
    case 'POST':
      return await createCategory(req, res)
    default:
      return res.status(405).json({ message: 'Method not allowed' })
  }
}

async function getCategories(req: NextApiRequest, res: NextApiResponse) {
  try {
    const categories = await prisma.category.findMany({
      include: {
        services: {
          include: {
            staffServices: {
              include: {
                staff: true
              }
            }
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    })

    return res.status(200).json(categories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

async function createCategory(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id, name, slug, description, icon } = req.body

    if (!id || !name || !slug) {
      return res.status(400).json({ message: 'ID, name and slug are required' })
    }

    const category = await prisma.category.create({
      data: {
        id,
        name,
        slug,
        description,
        icon
      }
    })

    return res.status(201).json(category)
  } catch (error) {
    console.error('Error creating category:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
