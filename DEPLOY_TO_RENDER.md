# 🚀 Deploy to Render - Free SQLite Hosting

Your Next.js + SQLite website is ready for deployment! Follow these steps:

## ✅ Prerequisites Done
- ✅ SQLite database with all your data
- ✅ Package.json scripts configured
- ✅ Prisma client setup
- ✅ .gitignore updated to include database

## 🔧 Deployment Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for Render deployment"
git push origin main
```

### 2. Deploy on Render
1. Go to **https://render.com**
2. Click **"New Web Service"**
3. Connect your GitHub repository
4. Configure settings:
   - **Name**: `rootscrown-website` (or any name)
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment**: `Node`
   - **Plan**: `Free Plan`
5. Click **"Create Web Service"**

### 3. That's it! 🎉
Render will:
- Install your dependencies
- Build your Next.js app
- Start your server
- Your SQLite database will persist between deploys

## 🌐 Your Live Website
After deployment (5-10 minutes), you'll get a URL like:
`https://rootscrown-website.onrender.com`

## 📊 Features Working
- ✅ All your services and staff data
- ✅ Booking system
- ✅ SQLite database persistence
- ✅ All API routes
- ✅ Static pages

## 🔄 Making Updates
1. Make changes to your code
2. Push to GitHub: `git push`
3. Render auto-deploys your changes

## 💾 Database Persistence
- Your `prisma/dev.db` file stays on Render's disk
- Data persists between app restarts
- No data loss unless you rebuild from scratch

## 🆘 Need Help?
If deployment fails, check:
1. All files are committed to git
2. `prisma/dev.db` exists and has data
3. No syntax errors in your code

---

**Ready to deploy? Run the git commands above!** 🚀
