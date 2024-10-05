import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const now = new Date();

async function main() {
  // Seed the admin table with an initial record
  const admin = await prisma.admin.create({
    data: {
      id: 1,
      data_status: true,
      airtime_status: true,
      electricity_status: true,
      cable_status: true,
      education_status: true,
      internet_status: true,
      daily_bonus: 2,
      all_services_status: true,
      created_at: now,
      updated_at: now,
    },
  });

  console.log("Admin record created:", admin);
}

main()
  .then(() => {
    console.log("Seeding completed successfully.");
  })
  .catch((error) => {
    console.error("Error while seeding:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
