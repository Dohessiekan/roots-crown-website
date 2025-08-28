const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function seedAvailability() {
  try {
    console.log('🕐 Adding availability for all staff members...')
    
    const staff = await prisma.staff.findMany()
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const dayNumbers = [1, 2, 3, 4, 5, 6] // 1=Monday, 2=Tuesday, etc.
    
    for (const member of staff) {
      console.log(`Setting availability for ${member.name}...`)
      
      // First, delete existing availability to avoid duplicates
      await prisma.availability.deleteMany({
        where: { staffId: member.id }
      })
      
      // Add availability for Monday-Saturday (9 AM - 6 PM)
      for (let i = 0; i < days.length; i++) {
        const dayName = days[i].toLowerCase()
        await prisma.availability.create({
          data: {
            id: `${member.id}-${dayName}`,
            staffId: member.id,
            dayOfWeek: dayNumbers[i],
            startTime: '09:00',
            endTime: '18:00',
            isActive: true
          }
        })
      }
    }
    
    console.log('✅ Availability added for all staff members!')
    await prisma.$disconnect()
  } catch (error) {
    console.error('Error:', error)
    await prisma.$disconnect()
  }
}

seedAvailability()
