import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Get all staff members without filters
    const allStaff = await prisma.staff.findMany({
      select: {
        id: true,
        name: true,
        title: true,
        isActive: true
      }
    })

    return res.status(200).json({
      totalStaff: allStaff.length,
      allStaff,
      activeStaff: allStaff.filter(s => s.isActive),
      inactiveStaff: allStaff.filter(s => !s.isActive)
    })
  } catch (error) {
    console.error('Staff check error:', error)
    return res.status(500).json({ error: String(error) })
  } finally {
    await prisma.$disconnect()
  }
}
