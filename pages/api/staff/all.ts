import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

// Utility to slugify names for URLs
function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const staff = await prisma.staff.findMany({
      where: { isActive: true },
      include: {
        staffServices: {
          include: {
            service: true
          }
        },
        availability: true
      }
    })

    console.log('Total active staff found:', staff.length)
    console.log('Staff members:', staff.map(s => ({ id: s.id, name: s.name, isActive: s.isActive })))

    // Transform to match your frontend's staffList structure
    const staffList = staff.map(member => ({
      name: member.name,
      role: member.title,
      rating: member.rating || 4.5,
      availability: member.nextAvailable || getNextAvailability(member.availability),
      specialties: member.staffServices.map(ss => ss.service.name),
      slug: slugify(member.name),
      id: member.id,
      bio: member.bio,
      email: member.email,
      phone: member.phone,
      image: member.image
    }))

    return res.status(200).json({ staffList })
  } catch (error) {
    console.error('Error fetching staff list:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

function getNextAvailability(availability: any[]): string {
  if (!availability.length) return 'Available on request'
  
  const today = new Date()
  const currentDay = today.getDay()
  
  // Find next available day
  for (let i = 0; i < 7; i++) {
    const checkDay = (currentDay + i) % 7
    const dayAvailability = availability.find(a => a.dayOfWeek === checkDay && a.isActive)
    
    if (dayAvailability) {
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      return `${dayNames[checkDay]}, ${dayAvailability.startTime}`
    }
  }
  
  return 'Available on request'
}
