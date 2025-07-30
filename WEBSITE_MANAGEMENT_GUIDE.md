# 🛠️ Managing Your Website & Database After Deployment

## 📊 Database Management Options

### Option 1: Through Your Website Admin Panel
Your website has built-in admin functionality:

1. **Access Admin Panel**: `https://your-website.onrender.com/admin`
2. **Features Available**:
   - ✅ View all bookings
   - ✅ Manage staff schedules
   - ✅ Add/edit services
   - ✅ Customer management
   - ✅ Booking statistics

### Option 2: Database Browser Tools (Recommended)
Since you're using SQLite, you can use web-based database tools:

#### **DB Browser for SQLite** (Desktop Tool)
1. Download: https://sqlitebrowser.org/
2. Connect to your database file
3. **Features**:
   - Visual table editor
   - Run SQL queries
   - Import/export data
   - Database structure viewer

#### **SQLite Viewer Online** (Web Tool)
1. Go to: https://sqliteviewer.app/
2. Upload your `dev.db` file
3. **Features**:
   - Browse tables online
   - Edit records
   - Run queries
   - Export to CSV/JSON

### Option 3: Create API Endpoints for Management
Add management endpoints to your website:

```javascript
// Example: /api/admin/bookings - Get all bookings
// Example: /api/admin/services - Manage services
// Example: /api/admin/staff - Manage staff
```

## 🔄 Website Management

### **Render Dashboard**: https://dashboard.render.com
- ✅ **View deployment logs**
- ✅ **Monitor website performance**
- ✅ **Restart your service**
- ✅ **Update environment variables**
- ✅ **View usage statistics**

### **GitHub for Code Updates**:
1. **Make changes** to your code locally
2. **Commit and push** to GitHub:
   ```bash
   git add .
   git commit -m "Update website"
   git push
   ```
3. **Render auto-deploys** your changes (5-10 minutes)

## 📋 Common Management Tasks

### **Add New Services**:
```sql
INSERT INTO Service (id, name, slug, description, price, duration, categoryId) 
VALUES ('new-service', 'New Service', 'new-service', 'Description', '$50', '60 min', 'hair');
```

### **Add New Staff Member**:
```sql
INSERT INTO Staff (id, name, title, bio, email, specialties) 
VALUES ('new-staff', 'Jane Doe', 'Stylist', 'Experienced stylist', 'jane@example.com', '["Hair", "Makeup"]');
```

### **View All Bookings**:
```sql
SELECT b.*, s.name as service_name, st.name as staff_name 
FROM Booking b 
JOIN Service s ON b.serviceId = s.id 
JOIN Staff st ON b.staffId = st.id 
ORDER BY b.appointmentDate DESC;
```

### **Update Service Prices**:
```sql
UPDATE Service SET price = '$60' WHERE id = 'haircut';
```

## 🔧 Database Backup Strategy

### **Automatic Backup** (Recommended):
Create a backup endpoint in your website:

```javascript
// /api/admin/backup
// Downloads current database file
```

### **Manual Backup**:
1. **Download database** from Render (if accessible)
2. **Keep local copies** of your `dev.db` file
3. **Git commits** serve as version history

## 📱 Mobile Management

### **Access from Phone/Tablet**:
- ✅ **Admin panel** works on mobile
- ✅ **Render dashboard** is mobile-friendly
- ✅ **Database tools** can be accessed via mobile browser

### **Quick Tasks via API**:
- Check bookings: `GET /api/bookings`
- View staff schedule: `GET /api/availability/staff-id`
- Get daily statistics: `GET /api/admin/stats`

## 🚨 Monitoring & Alerts

### **Render Provides**:
- ✅ **Uptime monitoring**
- ✅ **Performance metrics**
- ✅ **Error logs**
- ✅ **Email notifications** for issues

### **Set Up Alerts** (Optional):
- **UptimeRobot**: Free website monitoring
- **Google Analytics**: Track visitor behavior
- **Email notifications**: For new bookings

## 🔐 Security Best Practices

### **Admin Access**:
- Use strong passwords
- Consider adding authentication to admin panel
- Regularly backup your database

### **Database Security**:
- Keep backups in multiple locations
- Monitor for unusual booking patterns
- Regular security updates

## 📈 Scaling Options

When you need more features:

### **Upgrade Database**:
- **PostgreSQL**: More features and better performance
- **Admin panels**: pgAdmin, Adminer
- **Cloud databases**: Railway, Supabase

### **Enhanced Management**:
- **Custom admin dashboard**
- **Staff mobile app**
- **Customer portal**
- **Analytics dashboard**

## 🆘 Troubleshooting

### **Common Issues**:
1. **Website down**: Check Render dashboard logs
2. **Database locked**: Restart Render service
3. **Slow performance**: Monitor resource usage
4. **Lost data**: Restore from backup

### **Get Help**:
- **Render Support**: Help docs and community
- **GitHub Issues**: Track code problems
- **Database Forums**: SQLite community support

---

**Your website will be easy to manage with these tools!** 🎉

Most day-to-day management can be done through your admin panel at `/admin`, while database management can be handled with simple SQL tools or your custom admin endpoints.
