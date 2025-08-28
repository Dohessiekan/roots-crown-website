const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkStaffSpecialties() {
  try {
    const staff = await prisma.staff.findMany({
      select: { name: true, specialties: true }
    });

    console.log('👥 Staff specialties:');
    staff.forEach(s => {
      console.log(`- ${s.name}: ${s.specialties}`);
    });
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkStaffSpecialties();
