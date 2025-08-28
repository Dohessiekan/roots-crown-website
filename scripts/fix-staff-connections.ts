import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function fixStaffServiceConnections() {
  console.log('🔧 Fixing staff-service connections with proper specialty mapping...')
  
  try {
    // Clear existing connections first
    await prisma.staffService.deleteMany({})
    console.log('🗑️  Cleared existing connections')
    
    // Get all staff and services
    const allStaff = await prisma.staff.findMany()
    const massageServices = await prisma.service.findMany({ where: { categoryId: 'massage-therapy' } })
    const facialServices = await prisma.service.findMany({ where: { categoryId: 'facial-treatments' } })
    const bodyServices = await prisma.service.findMany({ where: { categoryId: 'body-treatments' } })
    const nailServices = await prisma.service.findMany({ where: { categoryId: 'pedicure-manicure' } })
    const hairServices = await prisma.service.findMany({ where: { categoryId: 'hair-services' } })
    
    let totalConnections = 0
    
    for (const staff of allStaff) {
      const specialties = JSON.parse(staff.specialties)
      console.log(`\n👤 ${staff.name}: ${specialties.join(', ')}`)
      
      const servicesToConnect = []
      
      // Sarah Johnson - Massage specialist
      if (specialties.some((s: string) => s.includes('Massage') || s.includes('Aromatherapy') || s.includes('Deep Tissue'))) {
        servicesToConnect.push(...massageServices)
        console.log(`   🌿 Connected to ${massageServices.length} massage services`)
      }
      
      // Facial treatments
      if (specialties.some((s: string) => s.includes('Facial'))) {
        servicesToConnect.push(...facialServices)
        console.log(`   ✨ Connected to ${facialServices.length} facial services`)
      }
      
      // Body treatments and waxing
      if (specialties.some((s: string) => s.includes('Body') || s.includes('Waxing') || s.includes('Beauty Therapy'))) {
        servicesToConnect.push(...bodyServices)
        console.log(`   💆 Connected to ${bodyServices.length} body/waxing services`)
      }
      
      // Nail services
      if (specialties.some((s: string) => s.includes('Manicure') || s.includes('Pedicure') || s.includes('Nail'))) {
        servicesToConnect.push(...nailServices)
        console.log(`   💅 Connected to ${nailServices.length} nail services`)
      }
      
      // Hair services
      if (specialties.some((s: string) => s.includes('Hair') || s.includes('Braiding') || s.includes('Cornrows') || s.includes('Protective Styles'))) {
        servicesToConnect.push(...hairServices)
        console.log(`   💇 Connected to ${hairServices.length} hair services`)
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
          console.log(`   ⚠️  Could not connect to ${service.name}`)
        }
      }
    }
    
    console.log(`\n🎉 Successfully created ${totalConnections} staff-service connections!`)
    
    // Verify massage services now have staff
    const massageWithStaff = await prisma.service.findMany({
      where: { categoryId: 'massage-therapy' },
      include: {
        staffServices: {
          include: { staff: { select: { name: true } } }
        }
      }
    })
    
    console.log('\n🌿 Massage services now connected to:')
    massageWithStaff.forEach(service => {
      const staffNames = service.staffServices.map(ss => ss.staff.name).join(', ')
      console.log(`   ${service.name}: ${staffNames || 'No staff'}`)
    })
    
  } catch (error) {
    console.error('❌ Error fixing connections:', error)
  } finally {
    await prisma.$disconnect()
  }
}

fixStaffServiceConnections()
