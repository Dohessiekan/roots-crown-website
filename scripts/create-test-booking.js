const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function createTestBooking() {
  console.log('🧪 Creating test booking for reminder system...\n')
  
  try {
    // Get a service and staff member
    const service = await prisma.service.findFirst()
    const staff = await prisma.staff.findFirst()
    
    if (!service || !staff) {
      console.log('❌ Need at least one service and staff member in database')
      return
    }
    
    // Create booking for approximately 12 hours from now
    const now = new Date()
    const appointmentDateTime = new Date(now.getTime() + 12 * 60 * 60 * 1000) // 12 hours ahead
    
    const appointmentDate = appointmentDateTime.toISOString().split('T')[0] // YYYY-MM-DD
    const appointmentTime = appointmentDateTime.toTimeString().substring(0, 5) // HH:MM
    
    const testBooking = await prisma.booking.create({
      data: {
        bookingId: `TEST-${Date.now()}`,
        customerName: 'Test Customer',
        customerEmail: 'test@example.com', // Change this to your email for testing
        serviceId: service.id,
        staffId: staff.id,
        appointmentDate: appointmentDate,
        appointmentTime: appointmentTime,
        status: 'CONFIRMED',
        totalPrice: service.price
      },
      include: {
        service: true,
        staff: true
      }
    })
    
    console.log('✅ Test booking created successfully!')
    console.log('📋 Booking Details:')
    console.log(`   Booking ID: ${testBooking.bookingId}`)
    console.log(`   Customer: ${testBooking.customerName}`)
    console.log(`   Email: ${testBooking.customerEmail}`)
    console.log(`   Service: ${testBooking.service.name}`)
    console.log(`   Staff: ${testBooking.staff.name}`)
    console.log(`   Date: ${testBooking.appointmentDate}`)
    console.log(`   Time: ${testBooking.appointmentTime}`)
    console.log(`   Status: ${testBooking.status}`)
    
    console.log('\n🔔 This booking should trigger a reminder in the next API call!')
    console.log('💡 Run: node scripts/test-booking-reminders.js to test the system')
    
  } catch (error) {
    console.error('❌ Error creating test booking:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

// Run if called directly
if (require.main === module) {
  createTestBooking()
}

module.exports = { createTestBooking }
