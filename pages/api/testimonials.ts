import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    // Fetch high-rated feedback (4-5 stars) with booking and staff details
    const testimonials = await prisma.feedback.findMany({
      where: {
        staffRating: {
          gte: 4 // 4 stars and above
        },
        comment: {
          not: null // Only feedback with comments
        }
      },
      include: {
        booking: {
          include: {
            staff: {
              select: {
                name: true
              }
            },
            service: {
              select: {
                name: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 6 // Get latest 6 testimonials
    })

    // Format testimonials for display
    const formattedTestimonials = testimonials.map(feedback => ({
      id: feedback.id,
      customerName: feedback.customerName,
      rating: feedback.staffRating,
      comment: feedback.comment,
      serviceName: feedback.booking?.service?.name || 'Service',
      staffName: feedback.booking?.staff?.name || 'Staff Member',
      date: feedback.createdAt,
      wouldRecommend: feedback.wouldRecommend
    }))

    return res.status(200).json({
      testimonials: formattedTestimonials,
      count: formattedTestimonials.length
    })

  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return res.status(500).json({ 
      message: 'Failed to fetch testimonials',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  } finally {
    await prisma.$disconnect()
  }
}
