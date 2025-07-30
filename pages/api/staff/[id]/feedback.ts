import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { id } = req.query

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'Staff ID is required' })
  }

  try {
    console.log('Fetching feedback for staff ID:', id)
    
    // Alternative approach: Get all feedback, then filter by staff through booking
    const allFeedback = await (prisma as any).feedback.findMany({
      include: {
        booking: {
          include: {
            staff: true,
            service: true
          }
        }
      }
    })

    console.log('All feedback entries:', allFeedback.length)
    
    // Filter feedback for this specific staff member
    const staffFeedbacks = allFeedback.filter((feedback: any) => 
      feedback.booking && feedback.booking.staffId === id
    )

    console.log('Filtered feedbacks for staff', id, ':', staffFeedbacks.length)
    console.log('Staff feedbacks:', JSON.stringify(staffFeedbacks, null, 2))

    // Format the feedback data for display
    const formattedFeedbacks = staffFeedbacks.map((feedback: any) => ({
      id: feedback.id,
      customerName: feedback.customerName,
      rating: feedback.staffRating,
      comment: feedback.comment,
      serviceName: feedback.booking?.service?.name || 'Unknown Service',
      date: feedback.createdAt,
      wouldRecommend: feedback.wouldRecommend
    }))

    // Calculate average rating and review count
    const totalRating = staffFeedbacks.reduce((sum: number, feedback: any) => sum + feedback.staffRating, 0)
    const averageRating = staffFeedbacks.length > 0 ? totalRating / staffFeedbacks.length : 0
    const reviewCount = staffFeedbacks.length

    return res.status(200).json({
      feedbacks: formattedFeedbacks,
      averageRating: Math.round(averageRating * 10) / 10,
      reviewCount
    })
  } catch (error) {
    console.error('Error fetching staff feedback:', error)
    return res.status(500).json({ message: 'Internal server error' })
  } finally {
    await prisma.$disconnect()
  }
}
