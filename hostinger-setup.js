const { PrismaClient } = require('@prisma/client')

async function setupHostingerDatabase() {
  console.log('🚀 Setting up database for Hostinger deployment...')
  
  try {
    const prisma = new PrismaClient()
    
    // Test database connection
    console.log('📡 Testing database connection...')
    await prisma.$connect()
    console.log('✅ Database connected successfully!')
    
    // Check if tables exist by trying to count records
    try {
      const staffCount = await prisma.staff.count()
      const serviceCount = await prisma.service.count()
      
      console.log(`📊 Found ${staffCount} staff members and ${serviceCount} services`)
      
      if (staffCount === 0 || serviceCount === 0) {
        console.log('🌱 Database appears empty, running seed script...')
        
        // Import and run the seed function
        const seedFunction = require('./seed-production.js')
        if (typeof seedFunction === 'function') {
          await seedFunction()
        } else {
          // If seed-production.js doesn't export a function, run it directly
          require('./seed-production.js')
        }
        
        console.log('✅ Database seeded successfully!')
      } else {
        console.log('✅ Database already contains data, skipping seed.')
      }
      
    } catch (error) {
      console.log('🔧 Tables not found, they will be created automatically.')
      console.log('🌱 Running database initialization...')
      
      // Run Prisma migrations
      const { exec } = require('child_process')
      const util = require('util')
      const execPromise = util.promisify(exec)
      
      try {
        await execPromise('npx prisma db push --accept-data-loss')
        console.log('✅ Database schema created!')
        
        // Run seed script
        await execPromise('npm run seed')
        console.log('✅ Database seeded!')
      } catch (migrationError) {
        console.error('❌ Migration error:', migrationError.message)
      }
    }
    
    await prisma.$disconnect()
    console.log('🎉 Database setup completed successfully!')
    
  } catch (error) {
    console.error('❌ Database setup failed:', error.message)
    console.error('Full error:', error)
    
    if (error.message.includes('Environment variable not found: DATABASE_URL')) {
      console.error('🔧 Please ensure DATABASE_URL is set in your Hostinger environment variables')
    }
    
    process.exit(1)
  }
}

// Run setup if called directly
if (require.main === module) {
  setupHostingerDatabase()
}

module.exports = setupHostingerDatabase
