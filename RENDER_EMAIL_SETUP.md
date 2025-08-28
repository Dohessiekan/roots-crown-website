# Render Environment Variables Setup for Email System

## 🚨 IMPORTANT: Set these environment variables in your Render dashboard

### Required Environment Variables:

1. **EMAIL_USER**
   - Value: `rootsandcrownspa@gmail.com`
   - Description: Gmail account for sending emails

2. **EMAIL_PASS** 
   - Value: `ljvr hfgh xbrs xtms`
   - Description: Gmail App Password for rootsandcrownspa@gmail.com

3. **NEXT_PUBLIC_BUSINESS_EMAIL**
   - Value: `rootsandcrownspa@gmail.com`
   - Description: Business contact email

4. **NEXT_PUBLIC_SITE_URL**
   - Value: `https://your-render-app-name.onrender.com`
   - Description: Your deployed site URL

5. **DATABASE_URL**
   - Value: [Render will provide this automatically for PostgreSQL]

## 📧 Gmail App Password Setup:

1. Go to Gmail settings
2. Enable 2-factor authentication 
3. Go to https://myaccount.google.com/apppasswords
4. Generate new App Password for "Mail"
5. Use that 16-character password as EMAIL_PASS

## 🔧 Alternative Email Solutions:

If Gmail continues to have issues, consider:

### Option 1: Use SendGrid (Recommended for production)
```
EMAIL_SERVICE=sendgrid
SENDGRID_API_KEY=[your sendgrid api key]
EMAIL_FROM=rootsandcrownspa@gmail.com
```

### Option 2: Use Render's recommended email service
- Mailgun
- Postmark  
- AWS SES

## 🐛 Debugging on Render:

1. Check Render logs for email errors
2. Test email endpoint: `https://your-app.onrender.com/api/test-email`
3. Verify environment variables are set in Render dashboard

## 📋 Render Deployment Checklist:

✅ Set all environment variables above
✅ Gmail App Password generated and set
✅ 2-factor authentication enabled on Gmail
✅ Check logs after booking attempt
✅ Test with actual booking on deployed site
