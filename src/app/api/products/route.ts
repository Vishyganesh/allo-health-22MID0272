import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
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