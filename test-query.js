const { PrismaClient } = require('@prisma/client')

async function testTestimonialsQuery() {
  try {
    const prisma = new PrismaClient()
    
    console.log('Testing the exact testimonials query used in getServerSideProps...')
    
    const testimonials = await prisma.feedback.findMany({
      where: {
        staffRating: {
          gte: 4 // 4 stars and above
        },
        comment: {
          not: null
        },
        NOT: [
          { comment: '' }, // Exclude empty comments
          { comment: null } // Exclude null comments
        ]
      },
      include: {
        booking: {
          include: {
            staff: {
              select: {
                name: true
              }
            },
            service: {
              select: {
                name: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 6 // Get latest 6 testimonials
    })
    
    console.log(`Found ${testimonials.length} testimonials`)
    
    // Format testimonials for display (same as in getServerSideProps)
    const formattedTestimonials = testimonials.map(feedback => ({
      id: feedback.id,
      customerName: feedback.customerName,
      rating: feedback.staffRating,
      comment: feedback.comment || '',
      serviceName: feedback.booking?.service?.name || 'Service',
      staffName: feedback.booking?.staff?.name || 'Staff Member',
      date: feedback.createdAt.toISOString(),
      wouldRecommend: feedback.wouldRecommend
    }))
    
    console.log('\nFormatted testimonials:')
    formattedTestimonials.forEach((t, index) => {
      console.log(`${index + 1}. ${t.customerName} (${t.rating} stars)`)
      console.log(`   Service: ${t.serviceName} with ${t.staffName}`)
      console.log(`   Comment: "${t.comment.substring(0, 50)}..."`)
      console.log(`   Would recommend: ${t.wouldRecommend}`)
      console.log()
    })
    
    await prisma.$disconnect()
    
  } catch (error) {
    console.error('Error in testimonials query:', error)
  }
}

testTestimonialsQuery()
