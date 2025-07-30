import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return await getStaff(req, res)
    case 'POST':
      return await createStaff(req, res)
    default:
      return res.status(405).json({ message: 'Method not allowed' })
  }
}

async function getStaff(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { serviceId } = req.query
    
    let whereClause = { isActive: true }
    
    if (serviceId && typeof serviceId === 'string') {
      whereClause = {
        ...whereClause,
        staffServices: {
          some: {
            serviceId
          }
        }
      } as any
    }

    const staff = await prisma.staff.findMany({
      where: whereClause,
      include: {
        staffServices: {
          include: {
            service: {
              include: {
                category: true
              }
            }
          }
        },
        availability: true
      },
      orderBy: {
        name: 'asc'
      }
    })

    // Parse specialties from JSON string
    const staffWithParsedSpecialties = staff.map(member => ({
      ...member,
      specialties: JSON.parse(member.specialties || '[]')
    }))

    return res.status(200).json(staffWithParsedSpecialties)
  } catch (error) {
    console.error('Error fetching staff:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

async function createStaff(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { 
      id,
      name, 
      title, 
      bio, 
      email, 
      phone, 
      image, 
      specialties, 
      serviceIds = [] 
    } = req.body

    if (!id || !name || !title || !bio || !email) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    // Create staff member
    const staff = await prisma.staff.create({
      data: {
        id,
        name,
        title,
        bio,
        email,
        phone,
        image,
        specialties: JSON.stringify(specialties || [])
      }
    })

    // Associate with services if provided
    if (serviceIds.length > 0) {
      await prisma.staffService.createMany({
        data: serviceIds.map((serviceId: string) => ({
          staffId: staff.id,
          serviceId
        }))
      })
    }

    // Fetch complete staff data with relations
    const completeStaff = await prisma.staff.findUnique({
      where: { id: staff.id },
      include: {
        staffServices: {
          include: {
            service: true
          }
        },
        availability: true
      }
    })

    return res.status(201).json({
      ...completeStaff,
      specialties: JSON.parse(completeStaff?.specialties || '[]')
    })
  } catch (error) {
    console.error('Error creating staff:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
