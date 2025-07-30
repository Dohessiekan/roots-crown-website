import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      // Export database as JSON
      const data = {
        categories: await prisma.category.findMany(),
        services: await prisma.service.findMany({
          include: { category: true }
        }),
        staff: await prisma.staff.findMany(),
        availability: await prisma.availability.findMany({
          include: { staff: true }
        }),
        bookings: await prisma.booking.findMany({
          include: {
            service: true,
            staff: true
          }
        }),
        exportedAt: new Date().toISOString(),
        totalRecords: {
          categories: await prisma.category.count(),
          services: await prisma.service.count(),
          staff: await prisma.staff.count(),
          availability: await prisma.availability.count(),
          bookings: await prisma.booking.count()
        }
      }

      // Set headers for file download
      res.setHeader('Content-Type', 'application/json')
      res.setHeader('Content-Disposition', `attachment; filename="roots-crown-backup-${new Date().toISOString().split('T')[0]}.json"`)
      
      res.status(200).json(data)

    } else if (req.method === 'POST') {
      // Simple database health check
      const healthCheck = {
        database: 'connected',
        timestamp: new Date().toISOString(),
        tables: {
          categories: await prisma.category.count(),
          services: await prisma.service.count(),
          staff: await prisma.staff.count(),
          bookings: await prisma.booking.count()
        }
      }

      res.status(200).json(healthCheck)

    } else {
      res.status(405).json({ error: 'Method not allowed' })
    }

  } catch (error) {
    console.error('Backup error:', error)
    res.status(500).json({ 
      error: 'Backup failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  } finally {
    await prisma.$disconnect()
  }
}
