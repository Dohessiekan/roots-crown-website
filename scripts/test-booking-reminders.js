const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function testBookingReminders() {
  console.log('🔍 Testing Booking Reminder System...\n')
  
  try {
    // Check current time and 12 hours ahead
    const now = new Date()
    const twelveHoursAhead = new Date(now.getTime() + 12 * 60 * 60 * 1000)
    
    console.log('📅 Current time:', now.toLocaleString())
    console.log('⏰ Looking for bookings around:', twelveHoursAhead.toLocaleString())
    console.log()
    
    // Find all confirmed bookings
    const allBookings = await prisma.booking.findMany({
      where: {
        status: 'CONFIRMED'
      },
      include: {
        service: true,
        staff: true
      },
      orderBy: {
        appointmentDate: 'asc'
      }
    })
    
    console.log(`📋 Total confirmed bookings: ${allBookings.length}`)
    
    if (allBookings.length === 0) {
      console.log('ℹ️  No confirmed bookings found. Create some bookings to test reminders.')
      return
    }
    
    console.log('\n📊 All confirmed bookings:')
    console.log('=====================================')
    
    allBookings.forEach((booking, index) => {
      const appointmentDateTime = new Date(`${booking.appointmentDate} ${booking.appointmentTime}`)
      const timeDifference = appointmentDateTime.getTime() - now.getTime()
      const hoursUntilBooking = Math.round(timeDifference / (1000 * 60 * 60) * 100) / 100
      
      console.log(`\n${index + 1}. Booking ID: ${booking.bookingId}`)
      console.log(`   Customer: ${booking.customerName} (${booking.customerEmail})`)
      console.log(`   Service: ${booking.service?.name || 'Unknown'}`)
      console.log(`   Staff: ${booking.staff?.name || 'Unknown'}`)
      console.log(`   Date: ${booking.appointmentDate}`)
      console.log(`   Time: ${booking.appointmentTime}`)
      console.log(`   Hours until appointment: ${hoursUntilBooking}`)
      
      if (hoursUntilBooking >= 11 && hoursUntilBooking <= 13) {
        console.log(`   🔔 WOULD SEND REMINDER - Perfect timing!`)
      } else if (hoursUntilBooking < 0) {
        console.log(`   ⏱️  Past appointment`)
      } else if (hoursUntilBooking < 11) {
        console.log(`   ⏳ Too soon for reminder`)
      } else {
        console.log(`   📅 Too far in future for reminder`)
      }
    })
    
    // Test the actual API endpoint
    console.log('\n🧪 Testing API endpoint...')
    
    const fetch = require('node-fetch')
    const response = await fetch('http://localhost:3000/api/send-booking-reminders', {
      method: 'POST'
    })
    
    if (response.ok) {
      const result = await response.json()
      console.log('✅ API Response:', result)
    } else {
      console.log('❌ API Error:', response.status, response.statusText)
    }
    
  } catch (error) {
    console.error('❌ Error testing booking reminders:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the test
testBookingReminders()
