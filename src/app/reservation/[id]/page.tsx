"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Reservation = {
  id: string;
  status: string;
  quantity: number;
  expiresAt: string;

  product: {
    name: string;
    imageUrl?: string;
  };

  warehouse: {
    name: string;
  };
};

export default function ReservationPage() {

  const params = useParams();

  const router = useRouter();

  const [reservation, setReservation] =
    useState<Reservation | null>(null);

  const [loading, setLoading] =
    useState(true);

  async function fetchReservation() {

    try {

      const response = await fetch(
        `/api/reservations/${params.id}`
      );

      const data =
        await response.json();

      setReservation(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  }

  useEffect(() => {
    fetchReservation();
  }, []);

  async function confirmReservation() {

    try {

      await fetch(
        `/api/reservations/${params.id}/confirm`,
        {
          method: "POST",
        }
      );

      fetchReservation();

    } catch (error) {

      console.error(error);
    }
  }

  async function releaseReservation() {

    try {

      await fetch(
        `/api/reservations/${params.id}/release`,
        {
          method: "POST",
        }
      );

      router.push("/");

    } catch (error) {

      console.error(error);
    }
  }

  if (loading) {

    return (

      <div className="text-xl">
        Loading reservation...
      </div>
    );
  }

  if (!reservation) {

    return (

      <div className="text-xl text-red-600">
        Reservation not found
      </div>
    );
  }

  return (

    <div className="max-w-3xl mx-auto">

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">

        <img
          src={reservation.product.imageUrl}

          alt={reservation.product.name}

          className="w-full h-400px object-cover"
        />

        <div className="p-8">

          <div className="flex items-center justify-between mb-8">

            <div>

              <h1 className="text-5xl font-bold text-slate-900 mb-3">
                {reservation.product.name}
              </h1>

              <p className="text-slate-500 text-lg">
                {
                  reservation.warehouse.name
                }
              </p>
            </div>

            <span
              className={`
                px-5 py-3 rounded-full text-sm font-semibold

                ${
                  reservation.status ===
                  "PENDING"

                    ? "bg-yellow-100 text-yellow-700"

                    : reservation.status ===
                      "CONFIRMED"

                    ? "bg-green-100 text-green-700"

                    : "bg-red-100 text-red-700"
                }
              `}
            >

              {reservation.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

            <div className="bg-slate-50 rounded-2xl p-5">

              <p className="text-sm text-slate-500 mb-2">
                Quantity
              </p>

              <p className="text-2xl font-bold text-slate-900">
                {reservation.quantity}
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5">

              <p className="text-sm text-slate-500 mb-2">
                Reservation ID
              </p>

              <p className="text-sm font-bold text-slate-900 break-all">
                {reservation.id}
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5">

              <p className="text-sm text-slate-500 mb-2">
                Expires At
              </p>

              <p className="text-sm font-bold text-slate-900">
                {new Date(
                  reservation.expiresAt
                ).toLocaleString()}
              </p>
            </div>
          </div>

          {reservation.status ===
            "PENDING" && (

            <div className="flex gap-4">

              <button
                onClick={
                  confirmReservation
                }

                className="bg-green-600 text-white px-8 py-4 rounded-2xl hover:bg-green-700 transition font-semibold"
              >

                Confirm Purchase
              </button>

              <button
                onClick={
                  releaseReservation
                }

                className="bg-red-600 text-white px-8 py-4 rounded-2xl hover:bg-red-700 transition font-semibold"
              >

                Release Reservation
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}