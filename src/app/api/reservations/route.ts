import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {

  try {

    const reservations =
      await prisma.reservation.findMany({

        include: {
          product: true,
          warehouse: true,
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    return NextResponse.json(
      reservations
    );

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to fetch reservations",
      },

      {
        status: 500,
      }
    );
  }
}

export async function POST(
  request: Request
) {

  try {

    const body =
      await request.json();

    const {
      productId,
      warehouseId,
      quantity,
    } = body;

    const inventory =
      await prisma.inventory.findFirst({
        where: {
          productId,
          warehouseId,
        },
      });

    if (!inventory) {

      return NextResponse.json(
        {
          error:
            "Inventory not found",
        },

        {
          status: 404,
        }
      );
    }

    const availableStock =
      inventory.totalStock -
      inventory.reservedStock;

    if (
      availableStock < quantity
    ) {

      return NextResponse.json(
        {
          error:
            "Not enough stock",
        },

        {
          status: 400,
        }
      );
    }

    await prisma.inventory.update({
      where: {
        id: inventory.id,
      },

      data: {
        reservedStock: {
          increment: quantity,
        },
      },
    });

    const reservation =
      await prisma.reservation.create({
        data: {
          productId,
          warehouseId,
          quantity,

          status: "PENDING",

          expiresAt:
            new Date(
              Date.now() +
              30 * 1000
            ),
        },
      });

    return NextResponse.json(
      reservation
    );

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to create reservation",
      },

      {
        status: 500,
      }
    );
  }
}