import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Seed Users
  const user1 = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Nasran',
      password: '123456z', // ⚠️ In production, hash this
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: 'John Doe',
      password: 'password123', // ⚠️ In production, hash this
    },
  });

  console.log('✅ Created users:', { user1, user2 });

  // Seed Contact Requests
  const contact1 = await prisma.contactRequest.create({
    data: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      message: 'Hello! I am interested in your services.',
      status: 'new',
    },
  });

  const contact2 = await prisma.contactRequest.create({
    data: {
      name: 'Bob Johnson',
      email: 'bob@example.com',
      message: 'Can you help me with my project?',
      status: 'new',
    },
  });

  console.log('✅ Created contact requests:', { contact1, contact2 });

  console.log('🎉 Database seed completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

