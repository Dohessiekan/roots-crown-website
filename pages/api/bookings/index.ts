import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import { sendBookingConfirmationToCustomer, sendBookingNotificationToSalon } from '../../../lib/email'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return await getBookings(req, res)
    case 'POST':
      return await createBooking(req, res)
    default:
      return res.status(405).json({ message: 'Method not allowed' })
  }
}

async function getBookings(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { staffId, status, date } = req.query
    
    let whereClause: any = {}
    
    if (staffId && typeof staffId === 'string') {
      whereClause.staffId = staffId
    }
    
    if (status && typeof status === 'string') {
      whereClause.status = status
    }
    
    if (date && typeof date === 'string') {
      const startDate = new Date(date)
      const endDate = new Date(date)
      endDate.setDate(endDate.getDate() + 1)
      
      whereClause.appointmentDate = {
        gte: startDate,
        lt: endDate
      }
    }

    const bookings = await prisma.booking.findMany({
      where: whereClause,
      include: {
        service: {
          include: {
            category: true
          }
        },
        staff: true
      },
      orderBy: [
        { appointmentDate: 'asc' },
        { appointmentTime: 'asc' }
      ]
    })

    return res.status(200).json(bookings)
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

async function createBooking(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      serviceId,
      staffId,
      appointmentDate,
      appointmentTime,
      notes
    } = req.body

    if (!customerName || !customerEmail || !serviceId || !staffId || !appointmentDate || !appointmentTime) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    // Generate 6-digit booking ID
    const bookingId = Math.floor(100000 + Math.random() * 900000).toString()

    // Get service details for pricing
    const service = await prisma.service.findUnique({
      where: { id: serviceId }
    })

    if (!service) {
      return res.status(404).json({ message: 'Service not found' })
    }

    // Get staff details for name
    const staff = await prisma.staff.findUnique({
      where: { id: staffId }
    })

    if (!staff) {
      return res.status(404).json({ message: 'Staff not found' })
    }

    // Check if the time slot is available
    const existingBooking = await prisma.booking.findFirst({
      where: {
        staffId,
        appointmentDate: new Date(appointmentDate),
        appointmentTime,
        status: {
          not: 'CANCELLED'
        }
      }
    })

    if (existingBooking) {
      return res.status(409).json({ message: 'Time slot is already booked' })
    }

    const booking = await prisma.booking.create({
      data: {
        bookingId,
        customerName,
        customerEmail,
        customerPhone,
        serviceId,
        staffId,
        staffName: staff.name,
        appointmentDate: new Date(appointmentDate),
        appointmentTime,
        notes,
        totalPrice: service.price,
        status: 'CONFIRMED'
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

    // Send confirmation emails
    try {
      const emailData = {
        customerName,
        customerEmail,
        serviceName: service.name,
        staffName: staff.name,
        appointmentDate,
        appointmentTime,
        bookingId,
        totalPrice: service.price
      }

      // Send email to customer
      await sendBookingConfirmationToCustomer(emailData)
      
      // Send notification to salon
      await sendBookingNotificationToSalon(emailData)
      
      console.log('Booking confirmation emails sent successfully')
    } catch (emailError) {
      console.error('Error sending emails:', emailError)
      // Don't fail the booking if email fails, just log the error
    }

    return res.status(201).json(booking)
  } catch (error) {
    console.error('Error creating booking:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
