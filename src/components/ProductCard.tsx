"use client";

import { useState } from "react";

import StatusBadge from "./StatusBadge";

type Inventory = {
  warehouseId: string;
  warehouseName: string;
  totalStock: number;
  reservedStock: number;
  availableStock: number;
};

type Product = {
  id: string;
  name: string;
  imageUrl?: string;
  inventories: Inventory[];
};

type Props = {
  product: Product;

  onReserve: (
    productId: string,
    warehouseId: string,
    quantity: number
  ) => void;
};

export default function ProductCard({
  product,
  onReserve,
}: Props) {

  const [selectedWarehouse,
    setSelectedWarehouse] =
    useState(
      product.inventories[0]
        ?.warehouseId || ""
    );

  const [quantity, setQuantity] =
    useState(1);

  const inventory =
    product.inventories.find(
      (i) =>
        i.warehouseId ===
        selectedWarehouse
    );

  return (

    <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm hover:shadow-lg transition">

      <div className="flex items-center justify-between mb-5">

        <span className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm font-semibold">
          {product.inventories.length} warehouses
        </span>

        <StatusBadge
          availableStock={
            inventory
              ?.availableStock || 0
          }
        />
      </div>

      <img
        src={product.imageUrl}

        alt={product.name}

        className="w-full h-320px object-cover rounded-3xl mb-6"
      />

      <h2 className="text-3xl font-bold text-slate-900 mb-5">
        {product.name}
      </h2>

      <div className="space-y-4 mb-6">

        <div>

          <p className="text-sm font-semibold text-slate-700 mb-2">
            Warehouse
          </p>

          <select
            value={selectedWarehouse}

            onChange={(e) =>
              setSelectedWarehouse(
                e.target.value
              )
            }

            className="w-full border border-slate-200 rounded-2xl p-4"
          >

            {product.inventories.map(
              (inventory) => (

              <option
                key={
                  inventory.warehouseId
                }

                value={
                  inventory.warehouseId
                }
              >

                {
                  inventory.warehouseName
                }
                {" • "}
                {
                  inventory.availableStock
                }
                {" available"}

              </option>
            ))}
          </select>
        </div>

        <div>

          <p className="text-sm font-semibold text-slate-700 mb-2">
            Quantity
          </p>

          <input
            type="number"

            min={1}

            max={
              inventory
                ?.availableStock || 1
            }

            value={quantity}

            onChange={(e) =>
              setQuantity(
                Number(e.target.value)
              )
            }

            className="w-full border border-slate-200 rounded-2xl p-4"
          />
        </div>
      </div>

      <button
        onClick={() =>
          onReserve(
            product.id,
            selectedWarehouse,
            quantity
          )
        }

        disabled={
          !inventory ||
          inventory.availableStock <= 0
        }

        className="w-full bg-slate-900 text-white px-5 py-4 rounded-2xl hover:bg-slate-700 transition disabled:bg-slate-300"
      >
        Reserve
      </button>
    </div>
  );
}