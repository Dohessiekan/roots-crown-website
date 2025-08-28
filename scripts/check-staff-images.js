const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkStaffImages() {
  try {
    const staff = await prisma.staff.findMany({
      select: { id: true, name: true, image: true }
    });

    console.log('📸 Staff images in database:');
    staff.forEach(s => {
      console.log(`- ${s.name} (${s.id}): ${s.image || 'No image'}`);
    });

    console.log(`\n📊 Total staff: ${staff.length}`);
    const withImages = staff.filter(s => s.image).length;
    const withoutImages = staff.length - withImages;
    console.log(`✅ With images: ${withImages}`);
    console.log(`❌ Without images: ${withoutImages}`);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkStaffImages();
