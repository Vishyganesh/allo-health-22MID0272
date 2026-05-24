import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { productId, warehouseId, quantity } = body;

    if (!productId || !warehouseId || !quantity) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      // Find inventory row
      const inventoryRows =
  await tx.$queryRaw<
    {
      id: string;
      totalStock: number;
      reservedStock: number;
    }[]
  >`

  SELECT *
  FROM "Inventory"
  WHERE "productId" = ${productId}
  AND "warehouseId" = ${warehouseId}
  FOR UPDATE
`;

const inventory = inventoryRows[0];

      if (!inventory) {
        throw new Error("Inventory not found");
      }

      const availableStock =
        inventory.totalStock - inventory.reservedStock;

      // Not enough stock
      if (availableStock < quantity) {
        return {
          error: "Not enough stock",
          status: 409,
        };
      }

      // Increase reserved stock
      await tx.inventory.update({
        where: {
          id: inventory.id,
        },
        data: {
          reservedStock: {
            increment: quantity,
          },
        },
      });

      // Create reservation
      const reservation = await tx.reservation.create({
        data: {
          productId,
          warehouseId,
          quantity,
          expiresAt: new Date(
            Date.now() + 10 * 60 * 1000
          ),
        },
      });

      return {
        reservation,
        status: 200,
      };
    });

    if ("error" in result) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status }
      );
    }

    return NextResponse.json(result.reservation);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}