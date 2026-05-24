import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  await prisma.reservation.deleteMany();
  await prisma.inventory.deleteMany();
  await prisma.product.deleteMany();
  await prisma.warehouse.deleteMany();

  const chennai =
    await prisma.warehouse.create({
      data: {
        name: "Chennai Warehouse",
      },
    });

  const bangalore =
    await prisma.warehouse.create({
      data: {
        name: "Bangalore Warehouse",
      },
    });

  const iphone =
    await prisma.product.create({
      data: {
        name: "iPhone 15",

        imageUrl:
          "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop",
      },
    });

  const airpods =
    await prisma.product.create({
      data: {
        name: "AirPods Pro",

        imageUrl:
          "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?q=80&w=1200&auto=format&fit=crop",
      },
    });

  const macbook =
    await prisma.product.create({
      data: {
        name: "MacBook Pro",

        imageUrl:
          "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?q=80&w=1200&auto=format&fit=crop",
      },
    });

  await prisma.inventory.createMany({
    data: [
      {
        productId: iphone.id,
        warehouseId: chennai.id,
        totalStock: 10,
        reservedStock: 0,
      },

      {
        productId: iphone.id,
        warehouseId: bangalore.id,
        totalStock: 5,
        reservedStock: 0,
      },

      {
        productId: airpods.id,
        warehouseId: chennai.id,
        totalStock: 20,
        reservedStock: 0,
      },

      {
        productId: macbook.id,
        warehouseId: bangalore.id,
        totalStock: 3,
        reservedStock: 0,
      },
    ],
  });

  console.log(
    "Database seeded successfully"
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })

  .finally(async () => {
    await prisma.$disconnect();
  });