import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { cleanupExpiredReservations }
from "@/lib/cleanupExpiredReservations";

export async function GET() {
  await cleanupExpiredReservations();
  const products = await prisma.product.findMany({
    include: {
      inventories: {
        include: {
          warehouse: true,
        },
      },
    },
  });

  const formatted = products.map((product) => ({
    id: product.id,
    name: product.name,
    imageUrl: product.imageUrl,
    inventories: product.inventories.map((inventory) => ({
      warehouseId: inventory.warehouseId,
      warehouseName: inventory.warehouse.name,
      totalStock: inventory.totalStock,
      reservedStock: inventory.reservedStock,
      availableStock:
        inventory.totalStock - inventory.reservedStock,
    })),
  }));

  return NextResponse.json(formatted);
}