import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create warehouses
  const warehouse1 = await prisma.warehouse.create({
    data: {
      name: "Chennai Warehouse",
    },
  });

  const warehouse2 = await prisma.warehouse.create({
    data: {
      name: "Bangalore Warehouse",
    },
  });

  // Create products
  const product1 = await prisma.product.create({
    data: {
      name: "iPhone 15",
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: "AirPods Pro",
    },
  });

  // Inventory
  await prisma.inventory.createMany({
    data: [
      {
        productId: product1.id,
        warehouseId: warehouse1.id,
        totalStock: 5,
      },
      {
        productId: product1.id,
        warehouseId: warehouse2.id,
        totalStock: 3,
      },
      {
        productId: product2.id,
        warehouseId: warehouse1.id,
        totalStock: 10,
      },
    ],
  });

  console.log("Seed data inserted");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });