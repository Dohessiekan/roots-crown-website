import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { bookingId } = req.query

  try {
    // Find the booking
    const booking = await prisma.booking.findUnique({
      where: { bookingId: String(bookingId) },
      include: {
        staff: true,
        service: true
      }
    })

    // Find feedback for this booking
    const feedback = await (prisma as any).feedback.findUnique({
      where: { bookingId: String(bookingId) }
    })

    return res.status(200).json({
      booking,
      feedback,
      query: { bookingId }
    })
  } catch (error) {
    console.error('Debug error:', error)
    return res.status(500).json({ error: String(error) })
  } finally {
    await prisma.$disconnect()
  }
}
