import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Get all feedback with detailed information
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

    // Get all bookings for Mike specifically
    const mikeBookings = await prisma.booking.findMany({
      where: { staffId: 'mike' },
      include: {
        staff: true,
        service: true
      }
    })

    console.log('All feedback:', JSON.stringify(allFeedback, null, 2))
    console.log('Mike bookings:', JSON.stringify(mikeBookings, null, 2))

    return res.status(200).json({
      totalFeedbacks: allFeedback.length,
      feedbacks: allFeedback,
      mikeBookings: mikeBookings,
      mikeBookingIds: mikeBookings.map(b => b.bookingId)
    })
  } catch (error) {
    console.error('Debug error:', error)
    return res.status(500).json({ error: String(error) })
  } finally {
    await prisma.$disconnect()
  }
}
