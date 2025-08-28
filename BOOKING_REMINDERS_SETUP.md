# Booking Reminder System Setup Guide

## 🔔 Automatic Booking Reminders

This system sends email reminders to clients 12 hours before their scheduled appointments.

## 📋 How It Works

1. **API Endpoint**: `/api/send-booking-reminders`
2. **Trigger**: Checks for bookings 11-13 hours in advance
3. **Email**: Sends beautifully formatted reminder emails
4. **Content**: Includes appointment details, preparation tips, and contact info

## 🚀 Setting Up Automatic Reminders

### Option 1: Render Cron Jobs (Recommended for production)

1. In your Render dashboard, go to your web service
2. Add a new **Cron Job**:
   - **Name**: Booking Reminders
   - **Command**: `curl -X POST https://your-app-name.onrender.com/api/send-booking-reminders`
   - **Schedule**: `0 */2 * * *` (runs every 2 hours)

### Option 2: GitHub Actions (Alternative)

Create `.github/workflows/booking-reminders.yml`:

```yaml
name: Send Booking Reminders
on:
  schedule:
    - cron: '0 */2 * * *'  # Every 2 hours
  workflow_dispatch:  # Allow manual trigger

jobs:
  send-reminders:
    runs-on: ubuntu-latest
    steps:
      - name: Send Booking Reminders
        run: |
          curl -X POST https://your-app-name.onrender.com/api/send-booking-reminders
```

### Option 3: External Cron Service

Use services like:
- **UptimeRobot** (free monitoring with webhook calls)
- **Cronhub.io**
- **EasyCron**

Set them to call: `https://your-app-name.onrender.com/api/send-booking-reminders`

## 📧 Reminder Email Features

✅ **Professional Design**: Branded email template with salon colors
✅ **Complete Details**: Service, staff, date, time, booking ID
✅ **Preparation Tips**: Helpful reminders for customers
✅ **Contact Information**: Phone and email for questions
✅ **Responsive Layout**: Looks great on all devices

## 🔧 Manual Testing

Test the reminder system manually:

```bash
# Test the API endpoint
curl -X POST https://your-app-name.onrender.com/api/send-booking-reminders

# Or visit in browser (will show method not allowed, but endpoint exists)
https://your-app-name.onrender.com/api/send-booking-reminders
```

## ⚙️ Configuration

The system automatically:
- Finds confirmed bookings 12 hours in advance
- Sends personalized reminder emails
- Logs successful sends and errors
- Returns summary of reminders sent

## 📊 Monitoring

The API returns:
```json
{
  "message": "Booking reminders processed successfully",
  "remindersSent": 3,
  "totalBookingsChecked": 5,
  "errors": []
}
```

## 🛡️ Error Handling

- Gracefully handles email send failures
- Continues processing other bookings if one fails
- Logs detailed error information
- Returns summary of successes and failures

## 📱 Future Enhancements

Consider adding:
- SMS reminders (using Twilio)
- Multiple reminder times (24h, 2h before)
- Customer preference settings
- Reminder tracking in database
- Admin dashboard for reminder statistics

## 🔐 Security

- Uses your existing email configuration
- Secured API endpoint
- No sensitive data in logs
- Email content is safe and professional
