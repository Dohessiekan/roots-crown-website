import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function removeStaff() {
  console.log('🗑️  Removing Lisa Chen and Anna Rodriguez from staff...')
  
  try {
    // First, remove their staff-service connections
    console.log('🔗 Removing staff-service connections...')
    const staffServiceResult = await prisma.staffService.deleteMany({
      where: {
        OR: [
          { staffId: 'lisa' },
          { staffId: 'anna' }
        ]
      }
    })
    console.log(`✅ Removed ${staffServiceResult.count} staff-service connections`)

    // Remove their availability schedules
    console.log('📅 Removing availability schedules...')
    const availabilityResult = await prisma.availability.deleteMany({
      where: {
        OR: [
          { staffId: 'lisa' },
          { staffId: 'anna' }
        ]
      }
    })
    console.log(`✅ Removed ${availabilityResult.count} availability schedules`)

    // Remove any bookings assigned to them
    console.log('📋 Removing their bookings...')
    const bookingResult = await prisma.booking.deleteMany({
      where: {
        OR: [
          { staffId: 'lisa' },
          { staffId: 'anna' }
        ]
      }
    })
    console.log(`✅ Removed ${bookingResult.count} bookings`)

    // Finally, remove the staff members
    console.log('👥 Removing staff members...')
    const staffResult = await prisma.staff.deleteMany({
      where: {
        OR: [
          { id: 'lisa' },
          { id: 'anna' }
        ]
      }
    })
    console.log(`✅ Removed ${staffResult.count} staff members`)

    // Verify final staff count
    const remainingStaff = await prisma.staff.findMany({
      select: { id: true, name: true }
    })
    
    console.log(`\n📊 Remaining staff (${remainingStaff.length}):`)
    remainingStaff.forEach(staff => {
      console.log(`   - ${staff.name} (${staff.id})`)
    })
    
    console.log('\n🎉 Successfully removed Lisa Chen and Anna Rodriguez!')
    
  } catch (error) {
    console.error('❌ Error removing staff:', error)
  } finally {
    await prisma.$disconnect()
  }
}

removeStaff()
