const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

prisma.category.findMany().then(categories => {
  console.log('Current categories in database:');
  categories.forEach(c => console.log(`- ${c.name} (ID: ${c.id}, Slug: ${c.slug})`));
}).finally(() => prisma.$disconnect());
