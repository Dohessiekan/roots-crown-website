import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { staffId, date } = req.query

  if (!staffId || !date || typeof staffId !== 'string' || typeof date !== 'string') {
    return res.status(400).json({ message: 'Staff ID and date are required' })
  }

  try {
    // Get staff availability for the day
    const selectedDate = new Date(date)
    const dayOfWeek = selectedDate.getDay()

    const availability = await prisma.availability.findFirst({
      where: {
        staffId,
        dayOfWeek,
        isActive: true
      }
    })

    if (!availability) {
      return res.status(200).json({ availableSlots: [] })
    }

    // Generate time slots between start and end time
    const timeSlots = generateTimeSlots(availability.startTime, availability.endTime)

    // Get existing bookings for the day
    const startDate = new Date(date)
    const endDate = new Date(date)
    endDate.setDate(endDate.getDate() + 1)

    const existingBookings = await prisma.booking.findMany({
      where: {
        staffId,
        appointmentDate: {
          gte: startDate,
          lt: endDate
        },
        status: {
          not: 'CANCELLED'
        }
      },
      select: {
        appointmentTime: true
      }
    })

    // Filter out booked slots
    const bookedTimes = existingBookings.map(booking => booking.appointmentTime)
    const availableSlots = timeSlots.filter(slot => !bookedTimes.includes(slot))

    return res.status(200).json({ availableSlots })
  } catch (error) {
    console.error('Error fetching available slots:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

function generateTimeSlots(startTime: string, endTime: string): string[] {
  const slots: string[] = []
  const start = parseTime(startTime)
  const end = parseTime(endTime)
  
  let current = start
  while (current < end) {
    slots.push(formatTime(current))
    current += 30 // 30-minute intervals
  }
  
  return slots
}

function parseTime(timeString: string): number {
  const [hours, minutes] = timeString.split(':').map(Number)
  return hours * 60 + minutes
}

function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`
}
