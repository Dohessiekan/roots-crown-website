import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Your exact RWF service list - these are the ONLY services that should remain
const yourServiceIds = [
  // Massage Therapy Services
  'aromatherapy-massage', 'body-massage', 'couples-massage', 'deep-tissue-massage', 
  'foot-massage', 'head-massage', 'hot-stone-massage', 'pregnancy-massage', 
  'relaxation-massage', 'sports-massage', 'therapeutic-massage',

  // Facial Treatments
  'acne-facial-treatment', 'anti-aging-facial', 'brightening-facial', 'classic-facial',
  'deep-cleansing-facial', 'diamond-facial-treatment', 'exfoliating-facial', 
  'hydrating-facial', 'microdermabrasion', 'sensitive-skin-facial',

  // Body Treatments - Waxing
  'arms-waxing', 'back-waxing', 'bikini-waxing', 'brazilian-waxing', 'chest-waxing',
  'chin-waxing', 'full-body-waxing', 'full-legs-waxing', 'lower-legs-waxing',
  'stomach-waxing', 'underarms-waxing', 'upper-legs-waxing', 'upper-lip-waxing',

  // Pedicure & Manicure
  'classic-manicure', 'classic-pedicure', 'french-manicure', 'french-pedicure',
  'gel-manicure', 'gel-pedicure', 'luxury-manicure', 'luxury-pedicure',
  'spa-manicure', 'spa-pedicure',

  // Hair Services - Haircuts
  'buzz-cut', 'children-haircut', 'layered-cut', 'mens-haircut', 'pixie-cut', 'womens-haircut',

  // Hair Services - Treatments
  'deep-conditioning', 'hair-mask-treatment', 'keratin-treatment', 'protein-treatment', 'scalp-treatment',

  // Hair Services - Styling
  'blowout-styling', 'braids-styling', 'curls-styling', 'dreadlocks-styling', 'event-styling', 'updo-styling',

  // Hair Services - Color
  'balayage', 'full-color', 'hair-highlights', 'ombre', 'root-touch-up',

  // Hair Services - Wash & Sets
  'shampoo-blowdry', 'wash-and-set', 'wash-cut-blowdry'
]

async function removeExtraServices() {
  console.log('🔧 Removing all services NOT in your RWF price list...')
  
  try {
    // First, remove all staff-service connections for services not in your list
    console.log('🔗 Removing staff connections for extra services...')
    const staffServiceResult = await prisma.staffService.deleteMany({
      where: {
        service: {
          id: {
            notIn: yourServiceIds
          }
        }
      }
    })
    console.log(`✅ Removed ${staffServiceResult.count} staff-service connections`)

    // Remove all bookings for services not in your list
    console.log('📅 Removing bookings for extra services...')
    const bookingResult = await prisma.booking.deleteMany({
      where: {
        service: {
          id: {
            notIn: yourServiceIds
          }
        }
      }
    })
    console.log(`✅ Removed ${bookingResult.count} bookings for extra services`)

    // Get list of services to be removed (for logging)
    const servicesToRemove = await prisma.service.findMany({
      where: {
        id: {
          notIn: yourServiceIds
        }
      },
      select: { id: true, name: true }
    })

    // Now remove all services not in your list
    console.log('🗑️  Removing extra services...')
    const serviceResult = await prisma.service.deleteMany({
      where: {
        id: {
          notIn: yourServiceIds
        }
      }
    })

    console.log(`\n📊 Removal Summary:`)
    console.log(`🗑️  Removed ${serviceResult.count} extra services`)
    console.log(`🔗 Removed ${staffServiceResult.count} staff-service connections`)
    console.log(`📅 Removed ${bookingResult.count} bookings`)

    console.log(`\n🗑️  Services removed:`)
    servicesToRemove.forEach(s => console.log(`   - ${s.name} (${s.id})`))

    // Verify final count
    const remainingServices = await prisma.service.count()
    console.log(`\n✅ Services remaining: ${remainingServices}`)
    console.log(`🎯 Expected services (your list): ${yourServiceIds.length}`)

    if (remainingServices === yourServiceIds.length) {
      console.log(`\n🎉 Perfect! Database now contains ONLY your RWF price list services!`)
    } else {
      console.log(`\n⚠️  Warning: Service count mismatch. Please check.`)
    }
    
  } catch (error) {
    console.error('❌ Error removing extra services:', error)
  } finally {
    await prisma.$disconnect()
  }
}

removeExtraServices()
