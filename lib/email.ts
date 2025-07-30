import nodemailer from 'nodemailer'

interface BookingEmailData {
  customerName: string
  customerEmail: string
  serviceName: string
  staffName: string
  appointmentDate: string
  appointmentTime: string
  bookingId: string
  totalPrice?: string
}

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'd.gnondoyi@alustudent.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
})

export async function sendBookingConfirmationToCustomer(bookingData: BookingEmailData) {
  const { customerName, customerEmail, serviceName, staffName, appointmentDate, appointmentTime, bookingId, totalPrice } = bookingData
  
  const formattedDate = new Date(appointmentDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const customerEmailContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #8B4513; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9f9f9; }
        .booking-details { background-color: white; padding: 15px; margin: 20px 0; border-radius: 5px; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        .logo { font-size: 24px; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">Roots & Crown Salon</div>
          <p>Your Beauty, Our Passion</p>
        </div>
        
        <div class="content">
          <h2>Booking Confirmation</h2>
          
          <p>Dear ${customerName},</p>
          
          <p>Thank you for booking with Roots & Crown Salon! We're excited to serve you.</p>
          
          <div class="booking-details">
            <h3>Appointment Details:</h3>
            <p><strong>Service:</strong> ${serviceName}</p>
            <p><strong>Staff Member:</strong> ${staffName}</p>
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Time:</strong> ${appointmentTime}</p>
            <p><strong>Booking ID:</strong> ${bookingId}</p>
            ${totalPrice ? `<p><strong>Total Price:</strong> ${totalPrice}</p>` : ''}
          </div>
          
          <p>We look forward to seeing you soon!</p>
          
          <p>Best regards,<br>The Roots & Crown Team</p>
        </div>
        
        <div class="footer">
          <p>Roots & Crown Salon | Contact: ${process.env.NEXT_PUBLIC_BUSINESS_EMAIL || 'd.gnondoyi@alustudent.com'}</p>
        </div>
      </div>
    </body>
    </html>
  `

  const mailOptions = {
    from: `"Roots & Crown Salon" <${process.env.EMAIL_USER || 'd.gnondoyi@alustudent.com'}>`,
    to: customerEmail,
    subject: `Booking Confirmation - ${serviceName} on ${formattedDate}`,
    html: customerEmailContent
  }

  try {
    const result = await transporter.sendMail(mailOptions)
    console.log('Customer confirmation email sent:', result.messageId)
    return { success: true, messageId: result.messageId }
  } catch (error) {
    console.error('Error sending customer confirmation email:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' }
  }
}

export async function sendBookingNotificationToSalon(bookingData: BookingEmailData) {
  const { customerName, customerEmail, serviceName, staffName, appointmentDate, appointmentTime, bookingId, totalPrice } = bookingData
  
  const formattedDate = new Date(appointmentDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const salonEmailContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #8B4513; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9f9f9; }
        .booking-details { background-color: white; padding: 15px; margin: 20px 0; border-radius: 5px; }
        .urgent { background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 10px; border-radius: 5px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">New Booking Alert</div>
        </div>
        
        <div class="content">
          <div class="urgent">
            <h2>🆕 New Booking Received!</h2>
          </div>
          
          <div class="booking-details">
            <h3>Booking Details:</h3>
            <p><strong>Customer:</strong> ${customerName} (${customerEmail})</p>
            <p><strong>Service:</strong> ${serviceName}</p>
            <p><strong>Staff:</strong> ${staffName}</p>
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Time:</strong> ${appointmentTime}</p>
            <p><strong>Booking ID:</strong> ${bookingId}</p>
            ${totalPrice ? `<p><strong>Total:</strong> ${totalPrice}</p>` : ''}
          </div>
        </div>
      </div>
    </body>
    </html>
  `

  const mailOptions = {
    from: `"Booking System" <${process.env.EMAIL_USER || 'd.gnondoyi@alustudent.com'}>`,
    to: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || 'd.gnondoyi@alustudent.com',
    subject: `🆕 New Booking: ${customerName} - ${serviceName}`,
    html: salonEmailContent
  }

  try {
    const result = await transporter.sendMail(mailOptions)
    console.log('Salon notification email sent:', result.messageId)
    return { success: true, messageId: result.messageId }
  } catch (error) {
    console.error('Error sending salon notification email:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' }
  }
}

// Test email function for troubleshooting
export async function testEmailConfiguration() {
  const testMailOptions = {
    from: `"Roots & Crown Test" <${process.env.EMAIL_USER || 'd.gnondoyi@alustudent.com'}>`,
    to: process.env.EMAIL_USER || 'd.gnondoyi@alustudent.com',
    subject: 'Email Configuration Test',
    html: `
      <h2>Email Test Successful! ✅</h2>
      <p>This email confirms that your email configuration is working correctly.</p>
      <p>Sent at: ${new Date().toLocaleString()}</p>
      <p>From: Roots & Crown Salon Email System</p>
    `
  }

  try {
    const result = await transporter.sendMail(testMailOptions)
    console.log('Test email sent successfully:', result.messageId)
    return { success: true, messageId: result.messageId }
  } catch (error) {
    console.error('Test email failed:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' }
  }
}
