import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query

  if (typeof slug !== 'string') {
    return res.status(400).json({ message: 'Invalid category slug' })
  }

  switch (req.method) {
    case 'GET':
      return await getCategoryBySlug(req, res, slug)
    default:
      return res.status(405).json({ message: 'Method not allowed' })
  }
}

async function getCategoryBySlug(req: NextApiRequest, res: NextApiResponse, slug: string) {
  try {
    const category = await prisma.category.findUnique({
      where: { slug },
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
      }
    })

    if (!category) {
      return res.status(404).json({ message: 'Category not found' })
    }

    return res.status(200).json(category)
  } catch (error) {
    console.error('Error fetching category:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
