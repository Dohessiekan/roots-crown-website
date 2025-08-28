import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function reconnectStaffToYourServices() {
  console.log('🔗 Reconnecting staff to your RWF service list...')
  
  try {
    // Get all staff
    const allStaff = await prisma.staff.findMany()
    console.log(`Found ${allStaff.length} staff members`)
    
    // Get all services by category
    const massageServices = await prisma.service.findMany({
      where: { categoryId: 'massage-therapy' }
    })
    
    const facialServices = await prisma.service.findMany({
      where: { categoryId: 'facial-treatments' }
    })
    
    const bodyServices = await prisma.service.findMany({
      where: { categoryId: 'body-treatments' }
    })
    
    const nailServices = await prisma.service.findMany({
      where: { categoryId: 'pedicure-manicure' }
    })
    
    const hairServices = await prisma.service.findMany({
      where: { categoryId: 'hair-services' }
    })
    
    let totalConnections = 0
    
    // Connect each staff member to appropriate services
    for (const staff of allStaff) {
      const specialties = JSON.parse(staff.specialties)
      console.log(`\n👤 Connecting ${staff.name} (${specialties.join(', ')})...`)
      
      const servicesToConnect = []
      
      // Based on specialties, connect to appropriate services
      if (specialties.includes('Massage Therapy')) {
        servicesToConnect.push(...massageServices)
      }
      
      if (specialties.includes('Facial Treatments')) {
        servicesToConnect.push(...facialServices)
      }
      
      if (specialties.includes('Body Treatments') || specialties.includes('Waxing')) {
        servicesToConnect.push(...bodyServices)
      }
      
      if (specialties.includes('Pedicure & Manicure') || specialties.includes('Nail Care')) {
        servicesToConnect.push(...nailServices)
      }
      
      if (specialties.includes('Hair Services') || specialties.includes('Hair Styling') || 
          specialties.includes('Hair Treatments') || specialties.includes('Hair Coloring') ||
          specialties.includes('Hair Braiding')) {
        servicesToConnect.push(...hairServices)
      }
      
      // Create connections
      for (const service of servicesToConnect) {
        try {
          await prisma.staffService.create({
            data: {
              id: `${staff.id}-${service.id}`,
              staffId: staff.id,
              serviceId: service.id
            }
          })
          totalConnections++
        } catch (error) {
          // Connection might already exist, skip
        }
      }
      
      console.log(`   ✅ Connected to ${servicesToConnect.length} services`)
    }
    
    console.log(`\n🎉 Successfully created ${totalConnections} staff-service connections!`)
    
    // Verify connections
    const finalConnections = await prisma.staffService.count()
    console.log(`📊 Total connections now: ${finalConnections}`)
    
  } catch (error) {
    console.error('❌ Error reconnecting staff:', error)
  } finally {
    await prisma.$disconnect()
  }
}

reconnectStaffToYourServices()
