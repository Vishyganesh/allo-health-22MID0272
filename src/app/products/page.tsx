"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import ProductCard from "@/components/ProductCard";

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

export default function ProductsPage() {

  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  const router = useRouter();

  async function fetchProducts() {

    try {

      const response = await fetch(
        "/api/products"
      );

      const data =
        await response.json();

      setProducts(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  async function reserve(
    productId: string,
    warehouseId: string
  ) {

    try {

      const response = await fetch(
        "/api/reservations",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            productId,
            warehouseId,
            quantity: 1,
          }),
        }
      );

      const data =
        await response.json();

      router.push(
        `/reservation/${data.id}`
      );

    } catch (error) {

      console.error(error);
    }
  }

  if (loading) {

    return (

      <div className="text-xl">
        Loading products...
      </div>
    );
  }

  return (

    <div className="max-w-7xl mx-auto">

      <div className="flex justify-between items-start mb-10">

        <div>

          <h1 className="text-5xl font-bold text-slate-900 mb-3">
            Products
          </h1>

          <p className="text-slate-500 text-lg">
            Browse live inventory across all warehouses.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl px-5 py-3 shadow-sm">

          <p className="text-sm text-slate-500">
            Total products
          </p>

          <p className="text-2xl font-bold text-slate-900">
            {products.length}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

        {products.map((product) => (

          <ProductCard
            key={product.id}
            product={product}
            onReserve={reserve}
          />
        ))}
      </div>
    </div>
  );
}