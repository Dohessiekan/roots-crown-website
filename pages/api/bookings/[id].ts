import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (typeof id !== 'string') {
    return res.status(400).json({ message: 'Invalid booking ID' })
  }

  switch (req.method) {
    case 'GET':
      return await getBookingById(req, res, id)
    case 'PUT':
      return await updateBooking(req, res, id)
    case 'DELETE':
      return await deleteBooking(req, res, id)
    default:
      return res.status(405).json({ message: 'Method not allowed' })
  }
}

async function getBookingById(req: NextApiRequest, res: NextApiResponse, id: string) {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        service: {
          include: {
            category: true
          }
        },
        staff: true
      }
    })

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' })
    }

    return res.status(200).json(booking)
  } catch (error) {
    console.error('Error fetching booking:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

async function updateBooking(req: NextApiRequest, res: NextApiResponse, id: string) {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      serviceId,
      staffId,
      appointmentDate,
      appointmentTime,
      status,
      notes
    } = req.body

    const booking = await prisma.booking.update({
      where: { id },
      data: {
        customerName,
        customerEmail,
        customerPhone,
        serviceId,
        staffId,
        appointmentDate: appointmentDate ? new Date(appointmentDate) : undefined,
        appointmentTime,
        status,
        notes
      },
      include: {
        service: {
          include: {
            category: true
          }
        },
        staff: true
      }
    })

    return res.status(200).json(booking)
  } catch (error) {
    console.error('Error updating booking:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

async function deleteBooking(req: NextApiRequest, res: NextApiResponse, id: string) {
  try {
    await prisma.booking.delete({
      where: { id }
    })

    return res.status(200).json({ message: 'Booking deleted successfully' })
  } catch (error) {
    console.error('Error deleting booking:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
