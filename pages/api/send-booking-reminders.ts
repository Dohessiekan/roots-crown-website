import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import nodemailer from 'nodemailer'

const prisma = new PrismaClient()

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'rootsandcrownspa@gmail.com',
    pass: process.env.EMAIL_PASS || 'ljvr hfgh xbrs xtms'
  }
})

async function sendBookingReminder(bookingData: any) {
  const { customerName, customerEmail, serviceName, staffName, appointmentDate, appointmentTime, bookingId } = bookingData
  
  const formattedDate = new Date(appointmentDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const reminderEmailContent = `
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
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          overflow: hidden;
        }
        .header { 
          background: linear-gradient(135deg, #C49B38 0%, #b8860b 100%); 
          color: white; 
          padding: 30px; 
          text-align: center; 
        }
        .content { padding: 30px; }
        .reminder-badge {
          background: #ff6b35;
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: bold;
          display: inline-block;
          margin-bottom: 20px;
        }
        .booking-details {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 6px;
          margin: 20px 0;
        }
        .footer { 
          background-color: #f8f9fa; 
          padding: 20px; 
          text-align: center; 
          font-size: 14px; 
          color: #666; 
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0; font-size: 28px;">⏰ Appointment Reminder</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px;">Roots & Crown Salon</p>
        </div>
        
        <div class="content">
          <div class="reminder-badge">
            🔔 Reminder: Your appointment is in 12 hours!
          </div>
          
          <p style="font-size: 18px; margin-bottom: 25px;">
            Hello <strong>${customerName}</strong>,
          </p>
          
          <p style="font-size: 16px; margin-bottom: 20px;">
            This is a friendly reminder that you have an upcoming appointment with us tomorrow!
          </p>
          
          <div class="booking-details">
            <h3 style="color: #C49B38; margin-top: 0;">📅 Appointment Details</h3>
            <p><strong>Service:</strong> ${serviceName}</p>
            <p><strong>Staff Member:</strong> ${staffName}</p>
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Time:</strong> ${appointmentTime}</p>
            <p><strong>Booking ID:</strong> ${bookingId}</p>
          </div>
          
          <p style="font-size: 16px; margin: 20px 0;">
            <strong>📍 Location:</strong> Roots & Crown Salon, Kigali
          </p>
          
          <p style="font-size: 16px; margin: 20px 0;">
            <strong>📞 Contact:</strong> +250792866794
          </p>
          
          <div style="background: #e8f5e8; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px; color: #2d5a2d;">
              <strong>💡 Preparation Tips:</strong><br>
              • Please arrive 10 minutes before your appointment<br>
              • Bring any inspiration photos for your desired style<br>
              • Let us know if you need to reschedule
            </p>
          </div>
          
          <p style="font-size: 16px; margin: 20px 0;">
            Need to reschedule or have questions? Contact us at +250792866794 or reply to this email.
          </p>
          
          <p style="font-size: 16px; margin-top: 30px;">
            We look forward to seeing you soon!
          </p>
          
          <p style="font-size: 16px; color: #C49B38; font-weight: 500;">
            Best regards,<br>
            The Roots & Crown Team
          </p>
        </div>
        
        <div class="footer">
          <p><strong>Roots & Crown Salon</strong> | rootsandcrownspa@gmail.com | +250792866794</p>
          <p>Your beauty, our passion ✨</p>
        </div>
      </div>
    </body>
    </html>
  `

  const mailOptions = {
    from: `"Roots & Crown Salon" <${process.env.EMAIL_USER || 'rootsandcrownspa@gmail.com'}>`,
    to: customerEmail,
    subject: `⏰ Reminder: Your appointment tomorrow at ${appointmentTime} - Roots & Crown`,
    html: reminderEmailContent
  }

  await transporter.sendMail(mailOptions)
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    // Calculate the time 12 hours from now
    const now = new Date()
    const twelveHoursFromNow = new Date(now.getTime() + 12 * 60 * 60 * 1000)
    const fourteenHoursFromNow = new Date(now.getTime() + 14 * 60 * 60 * 1000)

    console.log('Checking for bookings between:', twelveHoursFromNow, 'and', fourteenHoursFromNow)

    // Find bookings that are approximately 12 hours away (within a 2-hour window)
    const upcomingBookings = await prisma.booking.findMany({
      where: {
        status: 'CONFIRMED',
        appointmentDate: {
          gte: twelveHoursFromNow.toISOString().split('T')[0], // Tomorrow's date
          lte: fourteenHoursFromNow.toISOString().split('T')[0]  // Tomorrow's date
        },
        // Add a field to track if reminder was sent (we'll add this to schema if needed)
        // For now, we'll send reminders without tracking
      },
      include: {
        service: true,
        staff: true
      }
    })

    console.log(`Found ${upcomingBookings.length} upcoming bookings`)

    let remindersSent = 0
    const errors = []

    for (const booking of upcomingBookings) {
      try {
        // Check if the booking time is approximately 12 hours from now
        const appointmentDateTime = new Date(`${booking.appointmentDate} ${booking.appointmentTime}`)
        const timeDifference = appointmentDateTime.getTime() - now.getTime()
        const hoursUntilBooking = timeDifference / (1000 * 60 * 60)

        // Send reminder if booking is between 11-13 hours away
        if (hoursUntilBooking >= 11 && hoursUntilBooking <= 13) {
          await sendBookingReminder({
            customerName: booking.customerName,
            customerEmail: booking.customerEmail,
            serviceName: booking.service?.name || 'Service',
            staffName: booking.staff?.name || 'Staff Member',
            appointmentDate: booking.appointmentDate,
            appointmentTime: booking.appointmentTime,
            bookingId: booking.bookingId
          })

          remindersSent++
          console.log(`Reminder sent for booking ${booking.bookingId}`)
        }
      } catch (error) {
        console.error(`Error sending reminder for booking ${booking.bookingId}:`, error)
        errors.push({ bookingId: booking.bookingId, error: error instanceof Error ? error.message : 'Unknown error' })
      }
    }

    return res.status(200).json({
      message: `Booking reminders processed successfully`,
      remindersSent,
      totalBookingsChecked: upcomingBookings.length,
      errors
    })

  } catch (error) {
    console.error('Error processing booking reminders:', error)
    return res.status(500).json({ 
      message: 'Failed to process booking reminders',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  } finally {
    await prisma.$disconnect()
  }
}
