import "dotenv/config";
import { PrismaClient, Role } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg"; // 👈 1. Import the adapter
import { Pool } from "pg";                    // 👈 2. Import the database driver
import bcrypt from "bcryptjs";

// 3. Set up the connection pool using your env URL
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

// 4. Pass the adapter into the PrismaClient constructor
const prisma = new PrismaClient({ adapter });

async function main() {
  const password = await bcrypt.hash("12345678", 10);

  await prisma.user.upsert({
    where: { email: "admin@google.com" },
    update: {},
    create: {
      name: "Super Admin",
      email: "admin@google.com",
      password,
      role: Role.ADMIN,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    pool.end(); // Clean up the database pool connection too
    console.log("🌱 Database seeded successfully!");
  })
  .catch(async (e) => {
    console.error("❌ Error seeding database:", e);
    await prisma.$disconnect();
    pool.end();
    process.exit(1);
  });