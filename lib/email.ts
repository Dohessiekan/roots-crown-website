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
    user: process.env.EMAIL_USER || 'rootsandcrownspa@gmail.com',
    pass: process.env.EMAIL_PASS || 'ljvr hfgh xbrs xtms'
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
        body { 
          font-family: 'Lato', Arial, sans-serif; 
          line-height: 1.6; 
          color: #2A2A2A; 
          background-color: #FDF5EF;
          margin: 0;
          padding: 20px;
        }
        .container { 
          max-width: 600px; 
          margin: 0 auto; 
          background-color: #FFFFFF;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        .header { 
          background: linear-gradient(135deg, #34893F 0%, #2d7035 100%);
          color: #FFFFFF; 
          padding: 25px; 
          text-align: center; 
        }
        .content { 
          padding: 30px; 
        }
        .section { 
          margin-bottom: 25px;
        }
        .section-title {
          font-family: 'Montaga', serif;
          font-size: 18px;
          font-weight: 400;
          color: #34893F;
          margin-bottom: 15px;
          border-bottom: 2px solid #C49B38;
          padding-bottom: 5px;
        }
        .info-row {
          display: flex;
          margin-bottom: 8px;
        }
        .info-label {
          font-weight: bold;
          min-width: 120px;
          color: #2A2A2A;
        }
        .info-value {
          color: #2A2A2A;
        }
        .important-box {
          background-color: #FDF5EF;
          border: 1px solid #C49B38;
          padding: 20px;
          margin: 20px 0;
          border-radius: 8px;
        }
        .important-box h3 {
          margin-top: 0;
          color: #34893F;
          font-family: 'Montaga', serif;
        }
        .important-box ul {
          margin: 10px 0;
          padding-left: 20px;
        }
        .footer {
          background-color: #FDF5EF;
          padding: 20px;
          text-align: center;
          font-size: 14px;
          color: #2A2A2A;
          border-top: 1px solid #C49B38;
        }
        .contact-section {
          text-align: center;
          margin-top: 20px;
          padding: 15px;
          background-color: #FDF5EF;
          border-radius: 8px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0; font-size: 28px; font-family: 'Montaga', serif;">✅ Booking Confirmed!</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px;">Thank you for choosing Roots & Crown</p>
        </div>
        
        <div class="content">
          <p><strong>Dear ${customerName},</strong></p>
          
          <p>Your appointment has been successfully confirmed. We're excited to see you!</p>
          
          <div style="text-align: center; margin: 25px 0;">
            <div style="background: linear-gradient(135deg, #C49B38 0%, #b8860b 100%); color: white; padding: 10px 20px; border-radius: 8px; display: inline-block;">
              <strong>Booking ID: ${bookingId}</strong>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Appointment Details</div>
            <div class="info-row">
              <div class="info-label">Service:</div>
              <div class="info-value">${serviceName}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Staff Member:</div>
              <div class="info-value">${staffName}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Date:</div>
              <div class="info-value">${formattedDate}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Time:</div>
              <div class="info-value">${appointmentTime}</div>
            </div>
            ${totalPrice ? `<div class="info-row">
              <div class="info-label">Price:</div>
              <div class="info-value">${totalPrice}</div>
            </div>` : ''}
          </div>

          <div class="important-box">
            <h3>Important Information:</h3>
            <ul>
              <li>Please arrive 10 minutes before your appointment time</li>
              <li>If you need to reschedule or cancel, please call us at least 24 hours in advance</li>
              <li>Bring a valid ID and any relevant medical information</li>
            </ul>
          </div>

          <div class="contact-section">
            <div style="text-align: center; margin-top: 10px;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/feedback?bookingId=${bookingId}" style="background: linear-gradient(135deg, #C49B38 0%, #b8860b 100%); color: white; padding: 8px 16px; border-radius: 6px; text-decoration: none; font-weight: 500; display: inline-block; font-size: 14px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-right: 30px;">Feedback</a>
              <a href="mailto:${process.env.NEXT_PUBLIC_BUSINESS_EMAIL || 'rootsandcrownspa@gmail.com'}" style="background: linear-gradient(135deg, #C49B38 0%, #b8860b 100%); color: white; padding: 8px 16px; border-radius: 6px; text-decoration: none; font-weight: 500; display: inline-block; font-size: 14px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">Contact Us</a>
            </div>
          </div>
        </div>
        
        <div class="footer">
          <p style="margin: 0 0 10px 0;"><strong>Roots & Crown</strong></p>
          <p style="margin: 5px 0;">📍 123 Beauty Street, Suite 456, City, State 12345</p>
          <p style="margin: 5px 0;">📞 Phone: +250792866794</p>
          <p style="margin: 5px 0;">📧 Email: ${process.env.NEXT_PUBLIC_BUSINESS_EMAIL || 'rootsandcrownspa@gmail.com'}</p>
        </div>
      </div>
    </body>
    </html>
  `

  const mailOptions = {
    from: `"Roots & Crown Salon" <${process.env.EMAIL_USER || 'rootsandcrownspa@gmail.com'}>`,
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
        body { 
          font-family: 'Lato', Arial, sans-serif; 
          line-height: 1.6; 
          color: #2A2A2A; 
          background-color: #FDF5EF;
          margin: 0;
          padding: 20px;
        }
        .container { 
          max-width: 600px; 
          margin: 0 auto; 
          background-color: #FFFFFF;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        .header { 
          background: linear-gradient(135deg, #34893F 0%, #2d7035 100%);
          color: #FFFFFF; 
          padding: 25px; 
          text-align: center; 
        }
        .content { 
          padding: 30px; 
        }
        .section { 
          margin-bottom: 25px;
        }
        .section-title {
          font-family: 'Montaga', serif;
          font-size: 18px;
          font-weight: 400;
          color: #34893F;
          margin-bottom: 15px;
          border-bottom: 2px solid #C49B38;
          padding-bottom: 5px;
        }
        .info-row {
          display: flex;
          margin-bottom: 8px;
        }
        .info-label {
          font-weight: bold;
          min-width: 120px;
          color: #2A2A2A;
        }
        .info-value {
          color: #2A2A2A;
        }
        .alert-box {
          background: linear-gradient(135deg, #e8f5e8 0%, #f0f9f0 100%);
          border-left: 4px solid #34893F;
          padding: 20px;
          margin-bottom: 25px;
          border-radius: 8px;
        }
        .footer {
          background-color: #FDF5EF;
          padding: 20px;
          text-align: center;
          font-size: 14px;
          color: #2A2A2A;
          border-top: 1px solid #C49B38;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0; font-size: 28px; font-family: 'Montaga', serif;">🗓️ New Booking Alert</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px;">Booking ID: ${bookingId}</p>
        </div>
        
        <div class="content">
          <div class="alert-box">
            <strong>📋 Information:</strong> A new appointment has been automatically confirmed and added to your schedule.
          </div>

          <div class="section">
            <div class="section-title">Appointment Details</div>
            <div class="info-row">
              <div class="info-label">Service:</div>
              <div class="info-value">${serviceName}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Staff Member:</div>
              <div class="info-value">${staffName}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Date:</div>
              <div class="info-value">${formattedDate}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Time:</div>
              <div class="info-value">${appointmentTime}</div>
            </div>
            ${totalPrice ? `<div class="info-row">
              <div class="info-label">Price:</div>
              <div class="info-value">${totalPrice}</div>
            </div>` : ''}
          </div>

          <div class="section">
            <div class="section-title">Customer Information</div>
            <div class="info-row">
              <div class="info-label">Name:</div>
              <div class="info-value">${customerName}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Email:</div>
              <div class="info-value">${customerEmail}</div>
            </div>
          </div>

          <div style="text-align: center; margin-top: 30px;">
            <div style="background: linear-gradient(135deg, #C49B38 0%, #b8860b 100%); color: white; padding: 12px 24px; border-radius: 8px; display: inline-block;">
              <strong>📊 View in Admin Dashboard</strong>
            </div>
          </div>
        </div>
        
        <div class="footer">
          <p style="margin-bottom: 10px;">This email was automatically generated when a customer completed their online booking. The appointment is confirmed and has been added to your schedule.</p>
          <p><strong>Roots & Crown Salon</strong> | ${process.env.NEXT_PUBLIC_BUSINESS_EMAIL || 'rootsandcrownspa@gmail.com'}</p>
        </div>
      </div>
    </body>
    </html>
  `

  const mailOptions = {
    from: `"Booking System" <${process.env.EMAIL_USER || 'rootsandcrownspa@gmail.com'}>`,
    to: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || 'rootsandcrownspa@gmail.com',
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
    from: `"Roots & Crown Test" <${process.env.EMAIL_USER || 'rootsandcrownspa@gmail.com'}>`,
    to: process.env.EMAIL_USER || 'rootsandcrownspa@gmail.com',
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
