# 📧 Email Setup Guide for Render Deployment

## Issue: Email Authentication Failing
Your booking system is **working perfectly**, but email notifications need proper authentication setup.

## Current Status:
✅ **Bookings are being saved** to database  
✅ **Time slots are removed** when booked  
✅ **Feedback system works**  
❌ **Email notifications failing** (authentication issue)

## Solution: Set up Gmail App Password

### Step 1: Enable 2-Factor Authentication on Gmail
1. Go to your **Google Account settings**
2. Go to **Security** → **2-Step Verification**
3. **Enable** 2-Step Verification if not already enabled

### Step 2: Generate App Password
1. In **Google Account** → **Security** → **App passwords**
2. **Select app**: "Mail"
3. **Select device**: "Other" → Enter "Roots Crown Website"
4. **Copy the 16-character password** (like: `abcd efgh ijkl mnop`)

### Step 3: Add Environment Variables in Render
1. Go to your **Render Dashboard**
2. Click on your **roots-crown-website** service
3. Go to **Environment** tab
4. **Add these variables**:

```
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-16-character-app-password
ADMIN_EMAIL=your-salon-email@gmail.com
```

### Step 4: Redeploy
After adding environment variables, click **"Manual Deploy"** → **"Deploy latest commit"**

## Alternative: Use Professional Email Service

For production, consider using:
- **SendGrid** (free tier: 100 emails/day)
- **Mailgun** (free tier: 1,000 emails/month)
- **Resend** (free tier: 3,000 emails/month)

## Test Email Setup

After setup, test by:
1. Making a booking on your website
2. Check Render logs for email success
3. Check customer email inbox
4. Check salon admin email inbox

## Email Templates Included:

✅ **Customer Confirmation Email**:
- Booking details
- Service information 
- Appointment time
- Staff member details
- Booking ID for reference

✅ **Salon Admin Notification**:
- New booking alert
- Customer information
- Service and staff details
- Time and date information

Your booking system is fully functional - just need email authentication! 🎉
