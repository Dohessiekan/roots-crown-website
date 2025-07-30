# 🚀 Deploy Your Roots Crown Website to Render

## Step 1: Create GitHub Repository

1. **Go to GitHub**: https://github.com
2. **Create New Repository**:
   - Click "New" or "+" → "New repository"
   - Repository name: `roots-crown-website`
   - Description: "Roots Crown Beauty Salon Booking Website"
   - Set to **Public** (required for free Render deployment)
   - Don't add README (we already have files)
   - Click "Create repository"

3. **Connect Your Local Code to GitHub**:
```bash
git remote add origin https://github.com/YOUR_USERNAME/roots-crown-website.git
git branch -M main
git push -u origin main
```
*Replace YOUR_USERNAME with your actual GitHub username*

## Step 2: Deploy to Render

1. **Go to Render**: https://render.com
2. **Sign up/Login** (you can use your GitHub account)
3. **Create New Web Service**:
   - Click "New" → "Web Service"
   - Connect your GitHub account
   - Select your `roots-crown-website` repository
   - Click "Connect"

4. **Configure Deployment Settings**:
   - **Name**: `roots-crown-website`
   - **Environment**: `Node`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: `Free` (gives you 750 hours/month)

5. **Click "Create Web Service"**

## Step 3: Wait for Deployment (5-10 minutes)

Render will:
- ✅ Clone your repository
- ✅ Install dependencies (npm install)
- ✅ Build your Next.js app (npm run build)
- ✅ Start your server (npm start)
- ✅ Give you a live URL like: `https://roots-crown-website.onrender.com`

## ✅ What You Get

- **Free hosting** for your booking website
- **Persistent SQLite database** with all 67 services
- **All booking functionality** working
- **HTTPS certificate** included
- **Automatic deployments** when you push to GitHub

## 🔧 If You Need Help

If you don't have a GitHub account:
1. Create one at https://github.com
2. Follow the steps above

If deployment fails:
1. Check the build logs in Render dashboard
2. Make sure all files are pushed to GitHub
3. Verify your `package.json` scripts are correct

## 📱 After Deployment

Your website will be live at your Render URL with:
- ✅ 67 services across 6 categories
- ✅ 5 staff members with availability
- ✅ Full booking system
- ✅ Time slot management
- ✅ Customer booking forms

**Ready to go live!** 🎉
