import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      // Get all bookings with details
      const bookings = await prisma.booking.findMany({
        include: {
          service: true,
          staff: true
        },
        orderBy: { appointmentDate: 'desc' }
      })

      res.status(200).json(bookings)

    } else if (req.method === 'PUT') {
      // Update booking status
      const { id, status } = req.body

      if (!id || !status) {
        return res.status(400).json({ error: 'ID and status are required' })
      }

      const updatedBooking = await prisma.booking.update({
        where: { id },
        data: { status },
        include: {
          service: true,
          staff: true
        }
      })

      res.status(200).json(updatedBooking)

    } else if (req.method === 'DELETE') {
      // Cancel/Delete booking
      const { id } = req.query

      if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: 'Booking ID is required' })
      }

      const deletedBooking = await prisma.booking.delete({
        where: { id }
      })

      res.status(200).json({ message: 'Booking deleted', booking: deletedBooking })

    } else {
      res.status(405).json({ error: 'Method not allowed' })
    }

  } catch (error) {
    console.error('Admin bookings error:', error)
    res.status(500).json({ error: 'Failed to manage bookings' })
  } finally {
    await prisma.$disconnect()
  }
}
