import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (typeof id !== 'string') {
    return res.status(400).json({ message: 'Invalid staff ID' })
  }

  switch (req.method) {
    case 'GET':
      return await getStaffById(req, res, id)
    case 'PUT':
      return await updateStaff(req, res, id)
    case 'DELETE':
      return await deleteStaff(req, res, id)
    default:
      return res.status(405).json({ message: 'Method not allowed' })
  }
}

async function getStaffById(req: NextApiRequest, res: NextApiResponse, id: string) {
  try {
    const staff = await prisma.staff.findUnique({
      where: { id },
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
        availability: true,
        bookings: {
          include: {
            service: true
          },
          orderBy: {
            appointmentDate: 'desc'
          }
        }
      }
    })

    if (!staff) {
      return res.status(404).json({ message: 'Staff member not found' })
    }

    // Parse specialties from JSON string
    const staffWithParsedSpecialties = {
      ...staff,
      specialties: JSON.parse(staff.specialties || '[]')
    }

    return res.status(200).json(staffWithParsedSpecialties)
  } catch (error) {
    console.error('Error fetching staff member:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

async function updateStaff(req: NextApiRequest, res: NextApiResponse, id: string) {
  try {
    const { 
      name, 
      title, 
      bio, 
      email, 
      phone, 
      image, 
      specialties, 
      isActive,
      serviceIds = [] 
    } = req.body

    // Update staff member
    const staff = await prisma.staff.update({
      where: { id },
      data: {
        name,
        title,
        bio,
        email,
        phone,
        image,
        specialties: JSON.stringify(specialties || []),
        isActive
      }
    })

    // Update service associations if provided
    if (serviceIds.length >= 0) {
      // Remove existing associations
      await prisma.staffService.deleteMany({
        where: { staffId: id }
      })

      // Add new associations
      if (serviceIds.length > 0) {
        await prisma.staffService.createMany({
          data: serviceIds.map((serviceId: string) => ({
            staffId: id,
            serviceId
          }))
        })
      }
    }

    // Fetch updated staff data with relations
    const updatedStaff = await prisma.staff.findUnique({
      where: { id },
      include: {
        staffServices: {
          include: {
            service: true
          }
        },
        availability: true
      }
    })

    return res.status(200).json({
      ...updatedStaff,
      specialties: JSON.parse(updatedStaff?.specialties || '[]')
    })
  } catch (error) {
    console.error('Error updating staff member:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

async function deleteStaff(req: NextApiRequest, res: NextApiResponse, id: string) {
  try {
    await prisma.staff.delete({
      where: { id }
    })

    return res.status(200).json({ message: 'Staff member deleted successfully' })
  } catch (error) {
    console.error('Error deleting staff member:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
