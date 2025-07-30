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

// Create transporter (you'll need to configure this with your email service)
const transporter = nodemailer.createTransport({
  // Example configuration for Gmail
  // For production, use environment variables
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-salon-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
})

// Alternative configuration for other email services
// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: parseInt(process.env.SMTP_PORT || '587'),
//   secure: false,
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS
//   }
// })

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
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #C7A15A, #34893F); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #fff; padding: 30px; border: 1px solid #ddd; }
        .booking-details { background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; margin: 10px 0; }
        .detail-label { font-weight: bold; color: #34893F; }
        .booking-id { font-size: 24px; font-weight: bold; color: #C7A15A; text-align: center; margin: 20px 0; }
        .button { background: #C7A15A; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 5px; }
        .footer { background: #f8f8f8; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Booking Confirmed!</h1>
          <p>Thank you for choosing Roots & Crown</p>
        </div>
        
        <div class="content">
          <p>Dear ${customerName},</p>
          
          <p>Your appointment has been successfully confirmed. We're excited to see you!</p>
          
          <div class="booking-id">
            Booking ID: ${bookingId}
          </div>
          
          <div class="booking-details">
            <h3 style="color: #34893F; margin-top: 0;">Appointment Details</h3>
            <div class="detail-row">
              <span class="detail-label">Service:</span>
              <span>${serviceName}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Staff Member:</span>
              <span>${staffName}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Date:</span>
              <span>${formattedDate}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Time:</span>
              <span>${appointmentTime}</span>
            </div>
            ${totalPrice ? `
            <div class="detail-row">
              <span class="detail-label">Price:</span>
              <span>${totalPrice}</span>
            </div>
            ` : ''}
          </div>
          
          <p><strong>Important Information:</strong></p>
          <ul>
            <li>Please arrive 10 minutes before your appointment time</li>
            <li>If you need to reschedule or cancel, please call us at least 24 hours in advance</li>
            <li>Bring a valid ID and any relevant medical information</li>
          </ul>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL}/feedback?bookingId=${bookingId}" class="button">
              Share Your Feedback
            </a>
            <a href="${process.env.NEXT_PUBLIC_SITE_URL}/contact" class="button">
              Contact Us
            </a>
          </div>
        </div>
        
        <div class="footer">
          <p><strong>Roots & Crown</strong></p>
          <p>${process.env.NEXT_PUBLIC_BUSINESS_ADDRESS}</p>
          <p>Phone: ${process.env.NEXT_PUBLIC_BUSINESS_PHONE}</p>
          <p>Email: ${process.env.NEXT_PUBLIC_BUSINESS_EMAIL}</p>
        </div>
      </div>
    </body>
    </html>
  `

  const mailOptions = {
    from: process.env.NEXT_PUBLIC_BUSINESS_EMAIL,
    to: customerEmail,
    subject: `Booking Confirmed - ${serviceName} at Roots & Crown`,
    html: customerEmailContent
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('Customer confirmation email sent successfully')
  } catch (error) {
    console.error('Error sending customer email:', error)
    throw error
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
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #34893F; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #fff; padding: 30px; border: 1px solid #ddd; }
        .booking-details { background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; margin: 10px 0; }
        .detail-label { font-weight: bold; color: #34893F; }
        .customer-info { background: #e8f5e8; padding: 15px; border-radius: 5px; margin: 15px 0; }
        .alert { background: #e8f5e8; padding: 15px; border-left: 4px solid #34893F; margin: 15px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
            <h1>🗓️ New Booking Alert</h1>
          <p>Booking ID: ${bookingId}</p>
        </div>
        
        <div class="content">
          <div class="alert">
            <strong>📋 Information:</strong> A new appointment has been automatically confirmed and added to your schedule.
          </div>
          
          <div class="booking-details">
            <h3 style="color: #34893F; margin-top: 0;">Appointment Details</h3>
            <div class="detail-row">
              <span class="detail-label">Service:</span>
              <span>${serviceName}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Staff Member:</span>
              <span>${staffName}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Date:</span>
              <span>${formattedDate}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Time:</span>
              <span>${appointmentTime}</span>
            </div>
            ${totalPrice ? `
            <div class="detail-row">
              <span class="detail-label">Price:</span>
              <span>${totalPrice}</span>
            </div>
            ` : ''}
          </div>
          
          <div class="customer-info">
            <h3 style="color: #34893F; margin-top: 0;">Customer Information</h3>
            <div class="detail-row">
              <span class="detail-label">Name:</span>
              <span>${customerName}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Email:</span>
              <span>${customerEmail}</span>
            </div>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin" 
               style="background: #34893F; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
              View in Admin Dashboard
            </a>
          </div>
          
          <p><small>This email was automatically generated when a customer completed their online booking. The appointment is confirmed and has been added to your schedule.</small></p>
        </div>
      </div>
    </body>
    </html>
  `

  const mailOptions = {
    from: process.env.NEXT_PUBLIC_BUSINESS_EMAIL,
    to: process.env.NEXT_PUBLIC_BUSINESS_EMAIL, // Send to salon
    subject: `� New Appointment: ${serviceName} - ${formattedDate} at ${appointmentTime}`,
    html: salonEmailContent
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('Salon notification email sent successfully')
  } catch (error) {
    console.error('Error sending salon notification email:', error)
    throw error
  }
}
