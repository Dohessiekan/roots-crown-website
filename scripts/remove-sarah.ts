import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function removeSarahJohnson() {
  console.log('🗑️  Removing Sarah Johnson from staff...')
  
  try {
    // First, remove Sarah's staff-service connections
    console.log('🔗 Removing Sarah\'s service connections...')
    const staffServiceResult = await prisma.staffService.deleteMany({
      where: { staffId: 'sarah' }
    })
    console.log(`✅ Removed ${staffServiceResult.count} staff-service connections`)

    // Remove Sarah's availability schedules
    console.log('📅 Removing Sarah\'s availability schedules...')
    const availabilityResult = await prisma.availability.deleteMany({
      where: { staffId: 'sarah' }
    })
    console.log(`✅ Removed ${availabilityResult.count} availability schedules`)

    // Remove any bookings assigned to Sarah
    console.log('📋 Removing Sarah\'s bookings...')
    const bookingResult = await prisma.booking.deleteMany({
      where: { staffId: 'sarah' }
    })
    console.log(`✅ Removed ${bookingResult.count} bookings`)

    // Finally, remove Sarah Johnson
    console.log('👥 Removing Sarah Johnson...')
    const staffResult = await prisma.staff.deleteMany({
      where: { id: 'sarah' }
    })
    console.log(`✅ Removed ${staffResult.count} staff member`)

    // Check massage therapy services status
    console.log('\n🌿 Checking Massage Therapy services status...')
    const massageServices = await prisma.service.findMany({
      where: { categoryId: 'massage-therapy' },
      include: {
        staffServices: {
          include: { staff: { select: { name: true } } }
        }
      }
    })

    console.log('Massage Therapy Services now have:')
    massageServices.forEach(service => {
      const staffNames = service.staffServices.map(ss => ss.staff.name).join(', ')
      console.log(`   - ${service.name}: ${staffNames || 'No staff assigned'}`)
    })

    // Verify final staff count
    const remainingStaff = await prisma.staff.findMany({
      select: { id: true, name: true, specialties: true }
    })
    
    console.log(`\n📊 Remaining staff (${remainingStaff.length}):`)
    remainingStaff.forEach(staff => {
      const specialties = JSON.parse(staff.specialties)
      console.log(`   - ${staff.name} (${staff.id}): ${specialties.join(', ')}`)
    })
    
    console.log('\n🎉 Successfully removed Sarah Johnson!')
    console.log('⚠️  Note: Massage Therapy services now have no staff assigned.')
    
  } catch (error) {
    console.error('❌ Error removing Sarah:', error)
  } finally {
    await prisma.$disconnect()
  }
}

removeSarahJohnson()
