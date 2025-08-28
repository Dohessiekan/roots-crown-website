// Test script to verify email functionality via API
// Run this with: node scripts/test-email.js

const http = require('http')

const testBookingData = {
  customerName: 'Test Customer',
  customerEmail: 'gnondoyixavier@gmail.com', // Using your Gmail for testing
  customerPhone: '+250792866794',
  serviceId: 'scissor-haircut', // Changed to scissor haircut to test Sabra with all hair services
  staffId: 'sabra',        // Testing with Sabra
  appointmentDate: '2025-08-31',
  appointmentTime: '17:30', // Changed to 5:30 PM
  notes: 'Test booking for Sabra - scissor haircut service (testing all hair services)'
}

function makeAPIRequest(data) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data)
    
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/bookings',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    }

    const req = http.request(options, (res) => {
      let responseData = ''
      
      res.on('data', (chunk) => {
        responseData += chunk
      })
      
      res.on('end', () => {
        try {
          const response = JSON.parse(responseData)
          resolve({ status: res.statusCode, data: response })
        } catch (error) {
          reject(new Error('Failed to parse response'))
        }
      })
    })

    req.on('error', (error) => {
      reject(error)
    })

    req.write(postData)
    req.end()
  })
}

async function testEmailSystem() {
  try {
    console.log('📧 Email System Test')
    console.log('===================')
    console.log('🧪 Testing email system by creating a test booking...')
    console.log('📧 This will send emails to:', testBookingData.customerEmail)
    console.log('📧 Salon notification will go to: gnondoyixavier@gmail.com')
    console.log('')
    
    const result = await makeAPIRequest(testBookingData)
    
    if (result.status === 201) {
      console.log('✅ Test booking created successfully!')
      console.log('📧 Booking ID:', result.data.bookingId)
      console.log('📧 Customer Name:', result.data.customerName)
      console.log('📧 Service:', result.data.service?.name || 'Service')
      console.log('📧 Staff:', result.data.staffName)
      console.log('')
      console.log('🎉 Email system test completed!')
      console.log('📮 Check your Gmail inbox for:')
      console.log('   • Customer confirmation email')
      console.log('   • Salon notification email')
    } else {
      console.error('❌ Test booking failed:', result.data.message)
      console.log('💡 Make sure your development server is running and the database has the required services/staff')
    }
  } catch (error) {
    console.error('❌ Email test failed:', error.message)
    console.log('💡 Make sure your development server is running at http://localhost:3000')
  }
}

testEmailSystem()
