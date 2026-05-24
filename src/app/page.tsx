"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
  inventories: Inventory[];
};

export default function Home() {

  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const router = useRouter();

  async function fetchProducts() {

    try {

      const response = await fetch(
        "/api/products"
      );

      const data = await response.json();

      setProducts(data);

    } catch {

      setError(
        "Failed to load products"
      );

    } finally {

      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  async function reserveProduct(
    productId: string,
    warehouseId: string
  ) {

    try {

      setError("");

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

      if (!response.ok) {

        setError(
          data.error ||
          "Reservation failed"
        );

        return;
      }

      router.push(
        `/reservation/${data.id}`
      );

    } catch {

      setError(
        "Something went wrong"
      );
    }
  }

  if (loading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-8">
        Products
      </h1>

      {error && (

        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="space-y-6">

        {products.map((product) => (

          <div
            key={product.id}
            className="border p-6 rounded-lg"
          >

            <h2 className="text-2xl font-semibold mb-4">
              {product.name}
            </h2>

            <div className="space-y-4">

              {product.inventories.map(
                (inventory) => (

                <div
                  key={
                    inventory.warehouseId
                  }

                  className="border rounded p-4 flex justify-between items-center"
                >

                  <div>

                    <p className="font-medium">
                      {
                        inventory.warehouseName
                      }
                    </p>

                    <p>
                      Available Stock:
                      {" "}
                      {
                        inventory.availableStock
                      }
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      reserveProduct(
                        product.id,
                        inventory.warehouseId
                      )
                    }

                    disabled={
                      inventory.availableStock <= 0
                    }

                    className="bg-black text-white px-4 py-2 rounded disabled:bg-gray-400"
                  >

                    Reserve
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}