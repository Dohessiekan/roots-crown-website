const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

prisma.service.findMany({ 
  select: { name: true, slug: true, price: true, category: true }
}).then(services => {
  console.log('Current services in database:');
  services.forEach(s => console.log(`- ${s.name} (${s.slug}) - ${s.price} RWF - Category: ${s.category}`));
}).finally(() => prisma.$disconnect());
