import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Use raw SQL to check what's in the Feedback table
    const feedbackRows = await prisma.$queryRaw`SELECT * FROM Feedback`
    
    // Use raw SQL to check what's in the Booking table  
    const bookingRows = await prisma.$queryRaw`SELECT * FROM Booking WHERE bookingId = '957260'`
    
    // Check all staff members
    const staffRows = await prisma.$queryRaw`SELECT * FROM Staff`
    
    // Check if the tables exist
    const tables = await prisma.$queryRaw`SELECT name FROM sqlite_master WHERE type='table'`

    return res.status(200).json({
      tables,
      feedbackRows,
      bookingRows,
      staffRows,
      staffCount: Array.isArray(staffRows) ? staffRows.length : 0,
      targetBookingId: '957260'
    })
  } catch (error) {
    console.error('SQL Debug error:', error)
    return res.status(500).json({ error: String(error) })
  } finally {
    await prisma.$disconnect()
  }
}
