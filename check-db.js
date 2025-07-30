const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function checkDatabase() {
  try {
    console.log('📊 Checking database contents...')
    
    const bookings = await prisma.booking.findMany({
      include: {
        service: true,
        staff: true
      }
    })
    
    console.log(`Found ${bookings.length} bookings:`)
    bookings.forEach(booking => {
      console.log(`- Booking ${booking.id}: ${booking.service?.name || 'Unknown service'} with ${booking.staff?.name || 'Unknown staff'}`)
    })
    
    const services = await prisma.service.findMany()
    console.log(`\nFound ${services.length} services`)
    
    const categories = await prisma.category.findMany()
    console.log(`Found ${categories.length} categories`)
    
    const staffServices = await prisma.staffService.findMany()
    console.log(`Found ${staffServices.length} staff-service relationships`)
    
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkDatabase()
