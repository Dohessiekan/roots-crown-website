import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

type HealthCheckResponse = {
  status: string
  timestamp: string
  database: string
  version: string
  uptime: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HealthCheckResponse>
) {
  try {
    // Test database connection
    const prisma = new PrismaClient()
    await prisma.$connect()
    
    // Quick database health check
    const staffCount = await prisma.staff.count()
    await prisma.$disconnect()

    res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: `connected (${staffCount} staff members)`,
      version: process.env.npm_package_version || '1.0.0',
      uptime: process.uptime()
    })
  } catch (error) {
    console.error('Health check failed:', error)
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      database: 'disconnected',
      version: process.env.npm_package_version || '1.0.0',
      uptime: process.uptime()
    })
  }
}
