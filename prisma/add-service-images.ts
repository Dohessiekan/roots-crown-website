import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🖼️ Adding images to services in Roots & Crown database...')

  // Update services with appropriate images based on categories
  const serviceImages = [
    // Massage Therapy - use massageIcon.svg
    { id: 'swedish-massage', image: '/images/massageIcon.svg' },
    { id: 'deep-tissue-massage', image: '/images/massageIcon.svg' },
    { id: 'hot-stone-massage', image: '/images/massageIcon.svg' },
    { id: 'aromatherapy-massage', image: '/images/massageIcon.svg' },
    { id: 'prenatal-massage', image: '/images/massageIcon.svg' },
    { id: 'sports-massage', image: '/images/massageIcon.svg' },
    { id: 'reflexology', image: '/images/massageIcon.svg' },
    { id: 'couples-massage', image: '/images/massageIcon.svg' },
    { id: 'chair-massage', image: '/images/massageIcon.svg' },
    { id: 'thai-massage', image: '/images/massageIcon.svg' },
    { id: 'relaxmassage', image: '/images/massageIcon.svg' },
    { id: 'deepmassage', image: '/images/massageIcon.svg' },

    // Facial Treatments - use skinIcon.svg
    { id: 'classic-facial', image: '/images/skinIcon.svg' },
    { id: 'anti-aging-facial', image: '/images/skinIcon.svg' },
    { id: 'acne-treatment', image: '/images/skinIcon.svg' },
    { id: 'hydrating-facial', image: '/images/skinIcon.svg' },
    { id: 'brightening-facial', image: '/images/skinIcon.svg' },
    { id: 'sensitive-skin-facial', image: '/images/skinIcon.svg' },
    { id: 'microdermabrasion', image: '/images/skinIcon.svg' },
    { id: 'chemical-peel', image: '/images/skinIcon.svg' },
    { id: 'oxygen-facial', image: '/images/skinIcon.svg' },
    { id: 'eyebrow-shaping', image: '/images/skinIcon.svg' },
    { id: 'classicfacial', image: '/images/skinIcon.svg' },
    { id: 'deepfacial', image: '/images/skinIcon.svg' },

    // Body Treatments - use BodyIcon.svg
    { id: 'body-scrub', image: '/images/BodyIcon.svg' },
    { id: 'body-wrap', image: '/images/BodyIcon.svg' },
    { id: 'cellulite-treatment', image: '/images/BodyIcon.svg' },
    { id: 'back-facial', image: '/images/BodyIcon.svg' },
    { id: 'sunless-tanning', image: '/images/BodyIcon.svg' },
    { id: 'body-contouring', image: '/images/BodyIcon.svg' },
    { id: 'stretch-mark-treatment', image: '/images/BodyIcon.svg' },
    { id: 'detox-treatment', image: '/images/BodyIcon.svg' },

    // Pedicure & Manicure - use nailsIcon.svg
    { id: 'classic-manicure-new', image: '/images/nailsIcon.svg' },
    { id: 'gel-manicure-new', image: '/images/nailsIcon.svg' },
    { id: 'french-manicure', image: '/images/nailsIcon.svg' },
    { id: 'nail-art', image: '/images/nailsIcon.svg' },
    { id: 'classic-pedicure-new', image: '/images/nailsIcon.svg' },
    { id: 'spa-pedicure', image: '/images/nailsIcon.svg' },
    { id: 'gel-pedicure', image: '/images/nailsIcon.svg' },
    { id: 'paraffin-treatment', image: '/images/nailsIcon.svg' },
    { id: 'callus-removal', image: '/images/nailsIcon.svg' },
    { id: 'nail-repair', image: '/images/nailsIcon.svg' },
    { id: 'manicure', image: '/images/nailsIcon.svg' },
    { id: 'gelmanicure', image: '/images/nailsIcon.svg' },
    { id: 'pedicure', image: '/images/nailsIcon.svg' },

    // Hair Services - use hairIcon.svg
    { id: 'haircut-styling-new', image: '/images/hairIcon.svg' },
    { id: 'hair-coloring-new', image: '/images/hairIcon.svg' },
    { id: 'highlights', image: '/images/hairIcon.svg' },
    { id: 'balayage', image: '/images/hairIcon.svg' },
    { id: 'hair-treatment-new', image: '/images/hairIcon.svg' },
    { id: 'keratin-treatment', image: '/images/hairIcon.svg' },
    { id: 'hair-extensions', image: '/images/hairIcon.svg' },
    { id: 'bridal-hair', image: '/images/hairIcon.svg' },
    { id: 'hair-wash-blowdry', image: '/images/hairIcon.svg' },
    { id: 'scalp-treatment', image: '/images/hairIcon.svg' },
    { id: 'haircut', image: '/images/hairIcon.svg' },
    { id: 'haircolor', image: '/images/hairIcon.svg' },
    { id: 'hairtreatment', image: '/images/hairIcon.svg' },

    // Tattoo & Piercing - use tattooIcon.svg and piercingIcon.svg
    { id: 'small-tattoo', image: '/images/tattooIcon.svg' },
    { id: 'medium-tattoo', image: '/images/tattooIcon.svg' },
    { id: 'large-tattoo', image: '/images/tattooIcon.svg' },
    { id: 'tattoo-consultation', image: '/images/tattooIcon.svg' },
    { id: 'ear-piercing', image: '/images/piercingIcon.svg' },
    { id: 'nose-piercing', image: '/images/piercingIcon.svg' },
    { id: 'lip-piercing', image: '/images/piercingIcon.svg' },
    { id: 'eyebrow-piercing', image: '/images/piercingIcon.svg' },
    { id: 'body-piercing', image: '/images/piercingIcon.svg' },
    { id: 'piercing-jewelry', image: '/images/piercingIcon.svg' }
  ]

  console.log(`🖼️ Updating ${serviceImages.length} services with images...`)

  for (const serviceImage of serviceImages) {
    try {
      await prisma.service.update({
        where: { id: serviceImage.id },
        data: { image: serviceImage.image }
      })
      console.log(`✅ Updated ${serviceImage.id} with image: ${serviceImage.image}`)
    } catch (error) {
      console.log(`⚠️ Service ${serviceImage.id} not found or error updating`)
    }
  }

  console.log('🎉 Service images updated successfully!')
  
  // Verify the updates
  const servicesWithImages = await prisma.service.findMany({
    where: {
      image: {
        not: null
      }
    },
    select: {
      id: true,
      name: true,
      image: true,
      category: {
        select: {
          name: true
        }
      }
    }
  })

  console.log(`\n📊 Summary: ${servicesWithImages.length} services now have images`)
  console.log('Services by category:')
  
  const servicesByCategory = servicesWithImages.reduce((acc: any, service) => {
    const categoryName = service.category.name
    if (!acc[categoryName]) {
      acc[categoryName] = []
    }
    acc[categoryName].push(service)
    return acc
  }, {})

  Object.entries(servicesByCategory).forEach(([category, services]: [string, any]) => {
    console.log(`  ${category}: ${services.length} services`)
  })
}

main()
  .catch((e) => {
    console.error('❌ Error updating service images:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
