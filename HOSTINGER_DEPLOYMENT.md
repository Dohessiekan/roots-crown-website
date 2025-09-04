# Hostinger Deployment Guide for Roots & Crown Website

## Prerequisites
1. Hostinger hosting account with Node.js support
2. Domain name configured in Hostinger
3. GitHub repository access

## Deployment Steps

### Step 1: Hostinger Configuration
1. Log into your Hostinger control panel
2. Go to "Hosting" → Your domain
3. Enable Node.js hosting (Node.js 18+ recommended)
4. Set up your domain/subdomain

### Step 2: Environment Variables Setup
In Hostinger control panel, add these environment variables:

```
NODE_ENV=production
DATABASE_URL=your_postgresql_database_url
GMAIL_USER=rootscrown.rwanda@gmail.com
GMAIL_APP_PASSWORD=ljvr hfgh xbrs xtms
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

### Step 3: Database Setup
1. Create PostgreSQL database in Hostinger
2. Update DATABASE_URL with your Hostinger database credentials
3. Database will be automatically seeded on first deploy

### Step 4: GitHub Integration
1. In Hostinger, go to "Git" section
2. Connect your GitHub repository: `https://github.com/Dohessiekan/roots-crown-website.git`
3. Set branch to `main`
4. Set build command: `npm run build`
5. Set start command: `npm start`

### Step 5: Domain Configuration
Update NEXT_PUBLIC_BASE_URL to your actual domain name

## Important Files Created:
- `.hostinger-deploy.yml` - Deployment configuration
- `hostinger-setup.js` - Database initialization script
- `ecosystem.config.js` - Process management configuration

## Post-Deployment:
1. Your website will be available at your domain
2. Admin panel: `https://yourdomain.com/admin`
3. Test booking system and email notifications
4. Monitor logs in Hostinger control panel

## Support:
- Check Hostinger documentation for Node.js hosting
- Monitor application logs for any issues
- Ensure all environment variables are properly set
