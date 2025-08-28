import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function updateSarahSpecialty() {
  console.log('🔧 Updating Sarah Johnson to Massage Therapy only...')
  
  try {
    // First, remove all of Sarah's current service connections
    console.log('🗑️  Removing Sarah\'s current service connections...')
    const removedConnections = await prisma.staffService.deleteMany({
      where: { staffId: 'sarah' }
    })
    console.log(`✅ Removed ${removedConnections.count} existing connections`)

    // Get all massage therapy services
    const massageServices = await prisma.service.findMany({
      where: { categoryId: 'massage-therapy' }
    })
    
    console.log(`🌿 Connecting Sarah to ${massageServices.length} massage therapy services...`)

    // Connect Sarah only to massage therapy services
    let connectionsCreated = 0
    for (const service of massageServices) {
      await prisma.staffService.create({
        data: {
          id: `sarah-${service.id}`,
          staffId: 'sarah',
          serviceId: service.id
        }
      })
      connectionsCreated++
      console.log(`   ✅ Connected to ${service.name}`)
    }

    // Update Sarah's specialties to reflect massage therapy only
    console.log('👤 Updating Sarah\'s specialties...')
    await prisma.staff.update({
      where: { id: 'sarah' },
      data: {
        specialties: JSON.stringify(['Massage Therapy', 'Swedish Massage', 'Deep Tissue Massage', 'Aromatherapy'])
      }
    })

    console.log(`\n🎉 Successfully updated Sarah Johnson!`)
    console.log(`🌿 Now connected to ${connectionsCreated} massage therapy services only`)

    // Verify the changes
    const sarahConnections = await prisma.staffService.findMany({
      where: { staffId: 'sarah' },
      include: {
        service: { select: { name: true, categoryId: true } }
      }
    })

    console.log(`\n📋 Sarah's current services (${sarahConnections.length}):`)
    sarahConnections.forEach(conn => {
      console.log(`   - ${conn.service.name} (${conn.service.categoryId})`)
    })

    // Check if facial services still have staff assigned
    console.log('\n✨ Checking facial services staff coverage...')
    const facialServices = await prisma.service.findMany({
      where: { categoryId: 'facial-treatments' },
      include: {
        staffServices: {
          include: { staff: { select: { name: true } } }
        }
      }
    })

    facialServices.forEach(service => {
      const staffNames = service.staffServices.map(ss => ss.staff.name).join(', ')
      console.log(`   ${service.name}: ${staffNames || 'No staff assigned'}`)
    })

  } catch (error) {
    console.error('❌ Error updating Sarah:', error)
  } finally {
    await prisma.$disconnect()
  }
}

updateSarahSpecialty()
