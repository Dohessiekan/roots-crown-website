const { PrismaClient } = require('@prisma/client')

async function testTestimonials() {
  try {
    const prisma = new PrismaClient()
    
    // Check if we have any feedback in the database
    const feedbackCount = await prisma.feedback.count()
    console.log(`Total feedback entries: ${feedbackCount}`)
    
    // Check high-rated feedback with comments
    const goodFeedback = await prisma.feedback.findMany({
      where: {
        staffRating: {
          gte: 4 // 4 stars and above
        },
        comment: {
          not: null
        },
        NOT: [
          { comment: '' }
        ]
      }
    })
    
    console.log(`High-rated feedback with comments: ${goodFeedback.length}`)
    console.log('Feedback entries:', goodFeedback)
    
    await prisma.$disconnect()
  } catch (error) {
    console.error('Error:', error.message)
  }
}

testTestimonials()
