import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Your exact RWF service list organized by categories
const yourServiceList = [
  // Massage Therapy Services
  { id: 'aromatherapy-massage', name: 'Aromatherapy Massage', price: '30000', categoryId: 'massage-therapy' },
  { id: 'body-massage', name: 'Body Massage', price: '40000', categoryId: 'massage-therapy' },
  { id: 'couples-massage', name: 'Couples Massage', price: '70000', categoryId: 'massage-therapy' },
  { id: 'deep-tissue-massage', name: 'Deep Tissue Massage', price: '45000', categoryId: 'massage-therapy' },
  { id: 'foot-massage', name: 'Foot Massage', price: '20000', categoryId: 'massage-therapy' },
  { id: 'head-massage', name: 'Head Massage', price: '15000', categoryId: 'massage-therapy' },
  { id: 'hot-stone-massage', name: 'Hot Stone Massage', price: '50000', categoryId: 'massage-therapy' },
  { id: 'pregnancy-massage', name: 'Pregnancy Massage', price: '35000', categoryId: 'massage-therapy' },
  { id: 'relaxation-massage', name: 'Relaxation Massage', price: '35000', categoryId: 'massage-therapy' },
  { id: 'sports-massage', name: 'Sports Massage', price: '45000', categoryId: 'massage-therapy' },
  { id: 'therapeutic-massage', name: 'Therapeutic Massage', price: '40000', categoryId: 'massage-therapy' },

  // Facial Treatments
  { id: 'acne-facial-treatment', name: 'Acne Facial Treatment', price: '25000', categoryId: 'facial-treatments' },
  { id: 'anti-aging-facial', name: 'Anti-Aging Facial', price: '40000', categoryId: 'facial-treatments' },
  { id: 'brightening-facial', name: 'Brightening Facial', price: '30000', categoryId: 'facial-treatments' },
  { id: 'classic-facial', name: 'Classic Facial', price: '20000', categoryId: 'facial-treatments' },
  { id: 'deep-cleansing-facial', name: 'Deep Cleansing Facial', price: '25000', categoryId: 'facial-treatments' },
  { id: 'diamond-facial-treatment', name: 'Diamond Facial Treatment', price: '45000', categoryId: 'facial-treatments' },
  { id: 'exfoliating-facial', name: 'Exfoliating Facial', price: '22000', categoryId: 'facial-treatments' },
  { id: 'hydrating-facial', name: 'Hydrating Facial', price: '28000', categoryId: 'facial-treatments' },
  { id: 'microdermabrasion', name: 'Microdermabrasion', price: '35000', categoryId: 'facial-treatments' },
  { id: 'sensitive-skin-facial', name: 'Sensitive Skin Facial', price: '25000', categoryId: 'facial-treatments' },

  // Body Treatments - Waxing
  { id: 'arms-waxing', name: 'Arms Waxing', price: '8000', categoryId: 'body-treatments' },
  { id: 'back-waxing', name: 'Back Waxing', price: '15000', categoryId: 'body-treatments' },
  { id: 'bikini-waxing', name: 'Bikini Waxing', price: '12000', categoryId: 'body-treatments' },
  { id: 'brazilian-waxing', name: 'Brazilian Waxing', price: '20000', categoryId: 'body-treatments' },
  { id: 'chest-waxing', name: 'Chest Waxing', price: '12000', categoryId: 'body-treatments' },
  { id: 'chin-waxing', name: 'Chin Waxing', price: '3000', categoryId: 'body-treatments' },
  { id: 'full-body-waxing', name: 'Full Body Waxing', price: '50000', categoryId: 'body-treatments' },
  { id: 'full-legs-waxing', name: 'Full Legs Waxing', price: '18000', categoryId: 'body-treatments' },
  { id: 'lower-legs-waxing', name: 'Lower Legs Waxing', price: '10000', categoryId: 'body-treatments' },
  { id: 'stomach-waxing', name: 'Stomach Waxing', price: '8000', categoryId: 'body-treatments' },
  { id: 'underarms-waxing', name: 'Underarms Waxing', price: '5000', categoryId: 'body-treatments' },
  { id: 'upper-legs-waxing', name: 'Upper Legs Waxing', price: '12000', categoryId: 'body-treatments' },
  { id: 'upper-lip-waxing', name: 'Upper Lip Waxing', price: '3000', categoryId: 'body-treatments' },

  // Pedicure & Manicure
  { id: 'classic-manicure', name: 'Classic Manicure', price: '8000', categoryId: 'pedicure-manicure' },
  { id: 'classic-pedicure', name: 'Classic Pedicure', price: '10000', categoryId: 'pedicure-manicure' },
  { id: 'french-manicure', name: 'French Manicure', price: '10000', categoryId: 'pedicure-manicure' },
  { id: 'french-pedicure', name: 'French Pedicure', price: '12000', categoryId: 'pedicure-manicure' },
  { id: 'gel-manicure', name: 'Gel Manicure', price: '12000', categoryId: 'pedicure-manicure' },
  { id: 'gel-pedicure', name: 'Gel Pedicure', price: '15000', categoryId: 'pedicure-manicure' },
  { id: 'luxury-manicure', name: 'Luxury Manicure', price: '15000', categoryId: 'pedicure-manicure' },
  { id: 'luxury-pedicure', name: 'Luxury Pedicure', price: '18000', categoryId: 'pedicure-manicure' },
  { id: 'spa-manicure', name: 'Spa Manicure', price: '12000', categoryId: 'pedicure-manicure' },
  { id: 'spa-pedicure', name: 'Spa Pedicure', price: '15000', categoryId: 'pedicure-manicure' },

  // Hair Services - Haircuts
  { id: 'buzz-cut', name: 'Buzz Cut', price: '5000', categoryId: 'hair-services' },
  { id: 'children-haircut', name: 'Children Haircut', price: '8000', categoryId: 'hair-services' },
  { id: 'layered-cut', name: 'Layered Cut', price: '15000', categoryId: 'hair-services' },
  { id: 'mens-haircut', name: 'Mens Haircut', price: '10000', categoryId: 'hair-services' },
  { id: 'pixie-cut', name: 'Pixie Cut', price: '12000', categoryId: 'hair-services' },
  { id: 'womens-haircut', name: 'Womens Haircut', price: '15000', categoryId: 'hair-services' },

  // Hair Services - Treatments
  { id: 'deep-conditioning', name: 'Deep Conditioning', price: '20000', categoryId: 'hair-services' },
  { id: 'hair-mask-treatment', name: 'Hair Mask Treatment', price: '25000', categoryId: 'hair-services' },
  { id: 'keratin-treatment', name: 'Keratin Treatment', price: '80000', categoryId: 'hair-services' },
  { id: 'protein-treatment', name: 'Protein Treatment', price: '30000', categoryId: 'hair-services' },
  { id: 'scalp-treatment', name: 'Scalp Treatment', price: '18000', categoryId: 'hair-services' },

  // Hair Services - Styling
  { id: 'blowout-styling', name: 'Blowout Styling', price: '15000', categoryId: 'hair-services' },
  { id: 'braids-styling', name: 'Braids Styling', price: '20000', categoryId: 'hair-services' },
  { id: 'curls-styling', name: 'Curls Styling', price: '18000', categoryId: 'hair-services' },
  { id: 'dreadlocks-styling', name: 'Dreadlocks Styling', price: '25000', categoryId: 'hair-services' },
  { id: 'event-styling', name: 'Event Styling', price: '30000', categoryId: 'hair-services' },
  { id: 'updo-styling', name: 'Updo Styling', price: '25000', categoryId: 'hair-services' },

  // Hair Services - Color
  { id: 'balayage', name: 'Balayage', price: '60000', categoryId: 'hair-services' },
  { id: 'full-color', name: 'Full Color', price: '40000', categoryId: 'hair-services' },
  { id: 'hair-highlights', name: 'Hair Highlights', price: '50000', categoryId: 'hair-services' },
  { id: 'ombre', name: 'Ombre', price: '55000', categoryId: 'hair-services' },
  { id: 'root-touch-up', name: 'Root Touch Up', price: '25000', categoryId: 'hair-services' },

  // Hair Services - Wash & Sets
  { id: 'shampoo-blowdry', name: 'Shampoo Blowdry', price: '12000', categoryId: 'hair-services' },
  { id: 'wash-and-set', name: 'Wash and Set', price: '15000', categoryId: 'hair-services' },
  { id: 'wash-cut-blowdry', name: 'Wash Cut Blowdry', price: '20000', categoryId: 'hair-services' }
]

async function syncWithYourServiceList() {
  console.log('🔧 Syncing database with your exact RWF service list...')
  
  try {
    let updatedCount = 0
    let addedCount = 0
    
    // Process each service in your list
    for (const service of yourServiceList) {
      // Try to update existing service first
      const updateResult = await prisma.service.updateMany({
        where: { 
          OR: [
            { id: service.id },
            { slug: service.id }
          ]
        },
        data: {
          name: service.name,
          slug: service.id,
          price: service.price,
          categoryId: service.categoryId
        }
      })
      
      if (updateResult.count > 0) {
        updatedCount++
        console.log(`✅ Updated ${service.name}: RWF ${parseInt(service.price).toLocaleString()} (${service.categoryId})`)
      } else {
        // Service doesn't exist, create it
        try {
          await prisma.service.create({
            data: {
              id: service.id,
              name: service.name,
              slug: service.id,
              price: service.price,
              description: `Professional ${service.name.toLowerCase()} service.`,
              duration: '60 minutes',
              categoryId: service.categoryId
            }
          })
          addedCount++
          console.log(`➕ Added ${service.name}: RWF ${parseInt(service.price).toLocaleString()} (${service.categoryId})`)
        } catch (createError: any) {
          console.log(`⚠️  Could not add ${service.name}: ${createError.message}`)
        }
      }
    }
    
    // Get list of services not in your list (to identify extras)
    const currentServices = await prisma.service.findMany({
      select: { id: true, name: true, slug: true }
    })
    
    const yourServiceIds = new Set(yourServiceList.map(s => s.id))
    const yourServiceSlugs = new Set(yourServiceList.map(s => s.id))
    
    const extraServices = currentServices.filter(s => 
      !yourServiceIds.has(s.id) && !yourServiceSlugs.has(s.slug)
    )
    
    console.log(`\n📊 Summary:`)
    console.log(`✅ Updated existing services: ${updatedCount}`)
    console.log(`➕ Added new services: ${addedCount}`)
    console.log(`🎯 Total services in your list: ${yourServiceList.length}`)
    console.log(`📝 Extra services not in your list: ${extraServices.length}`)
    
    if (extraServices.length > 0) {
      console.log(`\n⚠️  Services not in your RWF list:`)
      extraServices.forEach(s => console.log(`   - ${s.name} (${s.id})`))
    }
    
    console.log(`\n🎉 Database synced with your exact RWF price list!`)
    
  } catch (error) {
    console.error('❌ Error syncing services:', error)
  } finally {
    await prisma.$disconnect()
  }
}

syncWithYourServiceList()
