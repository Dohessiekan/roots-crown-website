const { PrismaClient } = require('@prisma/client')

async function addSampleTestimonials() {
  try {
    const prisma = new PrismaClient()
    
    // First, let's get some existing bookings to link testimonials to
    const bookings = await prisma.booking.findMany({
      include: {
        service: true,
        staff: true
      },
      take: 3
    })
    
    if (bookings.length === 0) {
      console.log('No bookings found. Creating sample bookings first...')
      
      // Get first service and staff to create sample bookings
      const service = await prisma.service.findFirst()
      const staff = await prisma.staff.findFirst()
      
      if (!service || !staff) {
        console.log('No services or staff found. Please run the seed script first.')
        return
      }
      
      // Create sample bookings
      const sampleBookings = await Promise.all([
        prisma.booking.create({
          data: {
            bookingId: 'TST001',
            customerName: 'Sarah Johnson',
            customerEmail: 'sarah@example.com',
            customerPhone: '+250788123456',
            serviceId: service.id,
            staffId: staff.id,
            staffName: staff.name,
            appointmentDate: new Date('2024-08-20'),
            appointmentTime: '10:00',
            status: 'COMPLETED',
            totalPrice: service.price.toString()
          }
        }),
        prisma.booking.create({
          data: {
            bookingId: 'TST002',
            customerName: 'Maria Garcia',
            customerEmail: 'maria@example.com',
            customerPhone: '+250788123457',
            serviceId: service.id,
            staffId: staff.id,
            staffName: staff.name,
            appointmentDate: new Date('2024-08-22'),
            appointmentTime: '14:00',
            status: 'COMPLETED',
            totalPrice: service.price.toString()
          }
        }),
        prisma.booking.create({
          data: {
            bookingId: 'TST003',
            customerName: 'Emma Wilson',
            customerEmail: 'emma@example.com',
            customerPhone: '+250788123458',
            serviceId: service.id,
            staffId: staff.id,
            staffName: staff.name,
            appointmentDate: new Date('2024-08-25'),
            appointmentTime: '16:00',
            status: 'COMPLETED',
            totalPrice: service.price.toString()
          }
        })
      ])
      
      console.log('Created sample bookings:', sampleBookings.length)
      
      // Now create feedback for these bookings
      await Promise.all([
        prisma.feedback.create({
          data: {
            bookingId: sampleBookings[0].bookingId,
            customerName: 'Sarah Johnson',
            customerEmail: 'sarah@example.com',
            rating: 5,
            staffRating: 5,
            serviceRating: 5,
            facilityRating: 5,
            comment: 'Amazing experience! The braiding was perfect and the staff was so friendly. I felt so relaxed and beautiful afterwards. Highly recommend!',
            wouldRecommend: true
          }
        }),
        prisma.feedback.create({
          data: {
            bookingId: sampleBookings[1].bookingId,
            customerName: 'Maria Garcia',
            customerEmail: 'maria@example.com',
            rating: 5,
            staffRating: 5,
            serviceRating: 5,
            facilityRating: 4,
            comment: 'Best salon in Kigali! The attention to detail is incredible. My hair has never looked better. The team really knows what they\'re doing.',
            wouldRecommend: true
          }
        }),
        prisma.feedback.create({
          data: {
            bookingId: sampleBookings[2].bookingId,
            customerName: 'Emma Wilson',
            customerEmail: 'emma@example.com',
            rating: 4,
            staffRating: 4,
            serviceRating: 5,
            facilityRating: 4,
            comment: 'Great service and beautiful atmosphere. The staff made me feel so welcome. Will definitely be coming back for more treatments!',
            wouldRecommend: true
          }
        })
      ])
      
    } else {
      // Use existing bookings
      await Promise.all(
        bookings.slice(0, 3).map((booking, index) => {
          const testimonials = [
            {
              name: 'Sarah Johnson',
              rating: 5,
              comment: 'Amazing experience! The braiding was perfect and the staff was so friendly. I felt so relaxed and beautiful afterwards. Highly recommend!'
            },
            {
              name: 'Maria Garcia', 
              rating: 5,
              comment: 'Best salon in Kigali! The attention to detail is incredible. My hair has never looked better. The team really knows what they\'re doing.'
            },
            {
              name: 'Emma Wilson',
              rating: 4,
              comment: 'Great service and beautiful atmosphere. The staff made me feel so welcome. Will definitely be coming back for more treatments!'
            }
          ]
          
          const testimonial = testimonials[index]
          
          return prisma.feedback.create({
            data: {
              bookingId: booking.bookingId,
              customerName: testimonial.name,
              customerEmail: `${testimonial.name.toLowerCase().replace(' ', '.')}@example.com`,
              rating: testimonial.rating,
              staffRating: testimonial.rating,
              serviceRating: testimonial.rating,
              facilityRating: testimonial.rating,
              comment: testimonial.comment,
              wouldRecommend: true
            }
          })
        })
      )
    }
    
    console.log('Sample testimonials added successfully!')
    
    // Verify the testimonials
    const testimonials = await prisma.feedback.findMany({
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
    
    console.log(`Created ${testimonials.length} testimonials:`)
    testimonials.forEach(t => {
      console.log(`- ${t.customerName}: ${t.staffRating} stars - "${t.comment.substring(0, 50)}..."`)
    })
    
    await prisma.$disconnect()
    
  } catch (error) {
    console.error('Error adding testimonials:', error)
  }
}

addSampleTestimonials()
