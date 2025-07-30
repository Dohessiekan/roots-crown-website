import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Get database statistics
    const stats = {
      categories: await prisma.category.count(),
      services: await prisma.service.count(),
      staff: await prisma.staff.count(),
      availabilitySlots: await prisma.availability.count(),
      totalBookings: await prisma.booking.count(),
      recentBookings: await prisma.booking.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
          }
        }
      }),
      bookingsByStatus: await prisma.booking.groupBy({
        by: ['status'],
        _count: {
          status: true
        }
      })
    }

    // Get recent bookings with details
    const recentBookingsDetails = await prisma.booking.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        service: true,
        staff: true
      }
    })

    // Get popular services
    const popularServices = await prisma.booking.groupBy({
      by: ['serviceId'],
      _count: {
        serviceId: true
      },
      orderBy: {
        _count: {
          serviceId: 'desc'
        }
      },
      take: 5
    })

    // Get staff booking counts
    const staffBookings = await prisma.booking.groupBy({
      by: ['staffId'],
      _count: {
        staffId: true
      },
      orderBy: {
        _count: {
          staffId: 'desc'
        }
      }
    })

    res.status(200).json({
      stats,
      recentBookings: recentBookingsDetails,
      popularServices,
      staffBookings,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Admin stats error:', error)
    res.status(500).json({ error: 'Failed to fetch admin statistics' })
  } finally {
    await prisma.$disconnect()
  }
}
