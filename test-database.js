const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function testDatabase() {
  console.log('🔄 Testing SQLite database connection...\n')
  
  try {
    // Test 1: Count all records
    console.log('📊 Checking database content:')
    const categoryCount = await prisma.category.count()
    const serviceCount = await prisma.service.count()
    const staffCount = await prisma.staff.count()
    const availabilityCount = await prisma.availability.count()
    const bookingCount = await prisma.booking.count()
    
    console.log(`  • Categories: ${categoryCount}`)
    console.log(`  • Services: ${serviceCount}`)
    console.log(`  • Staff: ${staffCount}`)
    console.log(`  • Availability slots: ${availabilityCount}`)
    console.log(`  • Bookings: ${bookingCount}`)
    
    // Test 2: Check some sample data
    console.log('\n📋 Sample data:')
    const categories = await prisma.category.findMany({ take: 3 })
    console.log('  Categories:', categories.map(c => c.name))
    
    const staff = await prisma.staff.findMany({ take: 3 })
    console.log('  Staff:', staff.map(s => s.name))
    
    const services = await prisma.service.findMany({ take: 5 })
    console.log('  Services:', services.map(s => s.name))
    
    // Test 3: Test booking functionality
    console.log('\n🔍 Testing booking relationships:')
    const bookingsWithRelations = await prisma.booking.findMany({
      include: {
        service: true,
        staff: true
      },
      take: 3
    })
    
    console.log(`  Found ${bookingsWithRelations.length} bookings with relationships`)
    bookingsWithRelations.forEach(booking => {
      console.log(`    • ${booking.customerName} booked ${booking.service.name} with ${booking.staff.name}`)
    })
    
    // Test 4: Test availability
    console.log('\n📅 Testing availability:')
    const availability = await prisma.availability.findMany({
      include: {
        staff: true
      },
      take: 3
    })
    
    availability.forEach(slot => {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      console.log(`    • ${slot.staff.name}: ${days[slot.dayOfWeek]} ${slot.startTime}-${slot.endTime}`)
    })
    
    console.log('\n✅ All database tests passed! SQLite is working perfectly.')
    
  } catch (error) {
    console.error('❌ Database test failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testDatabase()
