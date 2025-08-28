const { PrismaClient } = require('@prisma/client')

async function addMoreTestimonials() {
  try {
    const prisma = new PrismaClient()
    
    // Get an existing service and staff
    const service = await prisma.service.findFirst()
    const staff = await prisma.staff.findFirst()
    
    if (!service || !staff) {
      console.log('No services or staff found.')
      return
    }
    
    // Create more sample bookings and testimonials
    const moreBookings = await Promise.all([
      prisma.booking.create({
        data: {
          bookingId: 'TST004',
          customerName: 'Aisha Uwimana',
          customerEmail: 'aisha@example.com',
          customerPhone: '+250788123459',
          serviceId: service.id,
          staffId: staff.id,
          staffName: staff.name,
          appointmentDate: new Date('2024-08-26'),
          appointmentTime: '11:00',
          status: 'COMPLETED',
          totalPrice: service.price.toString()
        }
      }),
      prisma.booking.create({
        data: {
          bookingId: 'TST005',
          customerName: 'Grace Mutoni',
          customerEmail: 'grace@example.com',
          customerPhone: '+250788123460',
          serviceId: service.id,
          staffId: staff.id,
          staffName: staff.name,
          appointmentDate: new Date('2024-08-27'),
          appointmentTime: '15:30',
          status: 'COMPLETED',
          totalPrice: service.price.toString()
        }
      })
    ])

    // Create feedback for these bookings
    await Promise.all([
      prisma.feedback.create({
        data: {
          bookingId: moreBookings[0].bookingId,
          customerName: 'Aisha Uwimana',
          customerEmail: 'aisha@example.com',
          rating: 5,
          staffRating: 5,
          serviceRating: 5,
          facilityRating: 5,
          comment: 'Exceptional service! I love how they understood exactly what I wanted. The atmosphere is so welcoming and professional. This is definitely my new go-to salon!',
          wouldRecommend: true
        }
      }),
      prisma.feedback.create({
        data: {
          bookingId: moreBookings[1].bookingId,
          customerName: 'Grace Mutoni',
          customerEmail: 'grace@example.com',
          rating: 4,
          staffRating: 4,
          serviceRating: 5,
          facilityRating: 4,
          comment: 'Really impressed with the quality and attention to detail. The staff is skilled and friendly. Great value for money and I feel pampered every time I visit.',
          wouldRecommend: true
        }
      })
    ])
    
    console.log('Added 2 more testimonials successfully!')
    
    // Show all testimonials
    const allTestimonials = await prisma.feedback.findMany({
      where: {
        staffRating: { gte: 4 },
        comment: { not: null }
      },
      include: {
        booking: {
          include: {
            service: { select: { name: true } },
            staff: { select: { name: true } }
          }
        }
      }
    })
    
    console.log(`\nTotal testimonials: ${allTestimonials.length}`)
    allTestimonials.forEach(t => {
      console.log(`- ${t.customerName}: ${t.staffRating} stars`)
      console.log(`  "${t.comment.substring(0, 80)}..."`)
      console.log()
    })
    
    await prisma.$disconnect()
    
  } catch (error) {
    console.error('Error adding testimonials:', error)
  }
}

addMoreTestimonials()
