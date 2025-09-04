# 🚀 Complete Hostinger Deployment Guide

## Step-by-Step Hostinger Setup

### 1. Purchase & Setup Hostinger Hosting
1. **Sign up** for Hostinger hosting with Node.js support
2. **Purchase your domain** (e.g., rootsandcrown.com)
3. **Access Hostinger Control Panel** (hPanel)

### 2. Enable Node.js Hosting
1. In hPanel, go to **"Hosting"** → Your domain
2. Click **"Setup"** next to Node.js
3. Select **Node.js version 18 or higher**
4. Set **Document Root** to `/public_html`

### 3. Database Setup
1. In hPanel, go to **"Databases"** → **"PostgreSQL"**
2. **Create new database**:
   - Database name: `roots_crown_db`
   - Username: `roots_crown_user`
   - Password: (create secure password)
3. **Note down** your database credentials

### 4. Environment Variables Configuration
Go to **"Advanced"** → **"Environment Variables"** and add:

```
NODE_ENV=production
DATABASE_URL=postgresql://roots_crown_user:YOUR_PASSWORD@localhost:5432/roots_crown_db
GMAIL_USER=rootscrown.rwanda@gmail.com
GMAIL_APP_PASSWORD=ljvr hfgh xbrs xtms
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
PORT=3000
```

### 5. GitHub Repository Connection
1. In hPanel, go to **"Advanced"** → **"Git"**
2. **Connect Repository**:
   - Repository URL: `https://github.com/Dohessiekan/roots-crown-website.git`
   - Branch: `main`
   - Deploy Path: `/public_html`

### 6. Build Configuration
Set these commands in Git deployment settings:
- **Build Command**: `npm run hostinger:build`
- **Start Command**: `npm start`

### 7. Domain Configuration
1. **Point domain** to your hosting account
2. **Update** NEXT_PUBLIC_BASE_URL to your actual domain
3. **Enable SSL** certificate (free with Hostinger)

### 8. First Deployment
1. **Push** your code to GitHub main branch
2. In hPanel Git section, click **"Deploy"**
3. **Wait** for deployment to complete (5-10 minutes)
4. **Check logs** for any errors

### 9. Verify Deployment
Visit your website and check:
- ✅ Homepage loads correctly
- ✅ Staff profiles display with images
- ✅ Services catalog works
- ✅ Booking system functional
- ✅ Email notifications working
- ✅ Admin panel accessible at `/admin`

### 10. Post-Deployment Tasks
1. **Test booking flow** end-to-end
2. **Verify email notifications** are sent
3. **Check testimonials** display correctly
4. **Test all forms** and functionality

## Troubleshooting

### Common Issues:
1. **"Cannot connect to database"**
   - Check DATABASE_URL format
   - Verify database credentials
   - Ensure PostgreSQL is enabled

2. **"Module not found" errors**
   - Run `npm install` in deployment
   - Check package.json dependencies

3. **Images not loading**
   - Verify image paths are correct
   - Check file permissions

4. **Email not sending**
   - Verify Gmail app password
   - Check SMTP settings

### Support Resources:
- **Hostinger Documentation**: Node.js hosting guides
- **Hostinger Live Chat**: 24/7 support
- **Application Logs**: Check in hPanel for errors

## Success Checklist:
- [ ] Domain pointing to Hostinger
- [ ] Node.js enabled (version 18+)
- [ ] Database created and configured
- [ ] Environment variables set
- [ ] GitHub repository connected
- [ ] SSL certificate enabled
- [ ] First deployment successful
- [ ] Website accessible online
- [ ] All features tested and working

Your Roots & Crown website will be live at: **https://yourdomain.com** 🌟
