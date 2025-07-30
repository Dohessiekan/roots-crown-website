import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // First, let's see what staff members exist
    const allStaff = await prisma.staff.findMany({
      select: {
        id: true,
        name: true
      }
    })

    // Get all bookings with their staff info
    const allBookings = await prisma.booking.findMany({
      include: {
        staff: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 10
    })

    // Get all feedback
    const allFeedback = await (prisma as any).feedback.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return res.status(200).json({
      staff: allStaff,
      recentBookings: allBookings,
      allFeedback: allFeedback
    })
  } catch (error) {
    console.error('Debug error:', error)
    return res.status(500).json({ error: String(error) })
  } finally {
    await prisma.$disconnect()
  }
}
