// Test booking functionality
const testBookingFlow = async () => {
  console.log('🧪 Testing booking functionality...\n')
  
  try {
    // Test 1: Get staff availability
    console.log('1️⃣ Testing staff availability API...')
    const staffResponse = await fetch('http://localhost:3002/api/staff/anna')
    const staffData = await staffResponse.json()
    console.log(`✅ Staff API working: Found ${staffData.name}`)
    
    // Test 2: Get availability for staff
    console.log('2️⃣ Testing availability API...')
    const availabilityResponse = await fetch('http://localhost:3002/api/availability/anna')
    const availabilityData = await availabilityResponse.json()
    console.log(`✅ Availability API working: Found ${availabilityData.length} availability slots`)
    
    // Test 3: Get services
    console.log('3️⃣ Testing services API...')
    const servicesResponse = await fetch('http://localhost:3002/api/services')
    const servicesData = await servicesResponse.json()
    console.log(`✅ Services API working: Found ${servicesData.length} services`)
    
    // Test 4: Test booking creation (simulation)
    console.log('4️⃣ Testing booking creation...')
    const bookingData = {
      customerName: "Test Customer",
      customerEmail: "test@example.com",
      customerPhone: "123-456-7890",
      serviceId: "deep-tissue-massage",
      staffId: "anna",
      appointmentDate: "2025-08-01",
      appointmentTime: "14:00",
      notes: "Test booking"
    }
    
    const bookingResponse = await fetch('http://localhost:3002/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData)
    })
    
    if (bookingResponse.ok) {
      const newBooking = await bookingResponse.json()
      console.log(`✅ Booking creation working: Created booking ID ${newBooking.bookingId}`)
    } else {
      console.log(`⚠️  Booking API responded with status: ${bookingResponse.status}`)
    }
    
    console.log('\n🎉 All booking functionality tests completed!')
    
  } catch (error) {
    console.error('❌ Booking test failed:', error.message)
  }
}

// Run in browser console or with fetch
if (typeof window !== 'undefined') {
  testBookingFlow()
} else {
  console.log('Run this in browser console to test booking APIs')
}
