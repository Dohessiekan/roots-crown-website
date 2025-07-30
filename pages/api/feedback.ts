import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    console.log('=== FEEDBACK SUBMISSION DEBUG ===')
    console.log('Request body:', JSON.stringify(req.body, null, 2))
    
    const {
      customerName,
      customerEmail,
      bookingId,
      rating,
      serviceRating,
      staffRating,
      facilityRating,
      comment,
      wouldRecommend,
      improvementSuggestions
    } = req.body

    console.log('Extracted booking ID:', bookingId)
    console.log('Customer:', customerName, customerEmail)

    if (!customerName || !customerEmail || !rating) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    // Create feedback record
    let staffId = null;
    
    // If bookingId is provided, get the staff ID
    if (bookingId) {
      try {
        console.log('Looking for booking with ID:', bookingId)
        const booking = await prisma.booking.findUnique({
          where: { bookingId },
          select: { staffId: true, staffName: true, customerName: true, customerEmail: true }
        })
        console.log('Found booking:', booking)
        staffId = booking?.staffId
        
        if (!booking) {
          console.log('⚠️  Warning: No booking found with ID:', bookingId)
        } else {
          console.log('✅ Booking found, staff ID:', staffId)
        }
      } catch (error) {
        console.error('Error finding booking:', error)
      }
    } else {
      console.log('⚠️  No booking ID provided in feedback')
    }

    console.log('Creating feedback record...')
    const feedback = await (prisma as any).feedback.create({
      data: {
        customerName,
        customerEmail,
        bookingId: bookingId || null,
        rating,
        serviceRating,
        staffRating,
        facilityRating,
        comment: comment || null,
        wouldRecommend,
        improvementSuggestions: improvementSuggestions || null
      }
    })
    
    console.log('✅ Feedback created:', feedback.id)

    // If bookingId is provided, try to link it and update staff rating
    if (bookingId) {
      try {
        const booking = await prisma.booking.findUnique({
          where: { bookingId },
          include: { staff: true }
        })

        if (booking) {
          // Update staff's average rating
          const allStaffFeedbacks = await (prisma as any).feedback.findMany({
            where: {
              bookingId: {
                in: await prisma.booking.findMany({
                  where: { staffId: booking.staffId },
                  select: { bookingId: true }
                }).then(bookings => bookings.map(b => b.bookingId))
              }
            }
          })

          if (allStaffFeedbacks.length > 0) {
            const avgRating = allStaffFeedbacks.reduce((sum: number, f: any) => sum + f.staffRating, 0) / allStaffFeedbacks.length
            
            await prisma.staff.update({
              where: { id: booking.staffId },
              data: {
                rating: Math.round(avgRating * 10) / 10, // Round to 1 decimal place
                reviewCount: allStaffFeedbacks.length
              }
            })
          }
        }
      } catch (error) {
        console.error('Error updating staff rating:', error)
        // Don't fail the feedback submission if staff update fails
      }
    }

    return res.status(201).json({ message: 'Feedback submitted successfully', feedback })
  } catch (error) {
    console.error('Error submitting feedback:', error)
    return res.status(500).json({ message: 'Internal server error' })
  } finally {
    await prisma.$disconnect()
  }
}
