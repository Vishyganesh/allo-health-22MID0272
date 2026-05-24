"use client";

import { useEffect, useState } from "react";

type Reservation = {
  id: string;

  quantity: number;

  status: string;

  product: {
    name: string;
    imageUrl?: string;
  };

  warehouse: {
    name: string;
  };
};

export default function ReservationsPage() {

  const [reservations,
    setReservations] =
    useState<Reservation[]>([]);

  const [loading, setLoading] =
    useState(true);

  async function fetchReservations() {

    try {

      const response = await fetch(
        "/api/reservations"
      );

      const data =
        await response.json();

      setReservations(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  }

  useEffect(() => {
    fetchReservations();
  }, []);

  if (loading) {

    return (
      <div className="text-xl">
        Loading reservations...
      </div>
    );
  }

  return (

    <div>

      <div className="flex justify-between items-start mb-10">

        <div>

          <h1 className="text-5xl font-bold text-slate-900 mb-3">
            Reservations
          </h1>

          <p className="text-slate-500 text-lg">
            Track active holds and confirmed reservations.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl px-5 py-3 shadow-sm">

          <p className="text-sm text-slate-500">
            Total reservations
          </p>

          <p className="text-2xl font-bold text-slate-900">
            {reservations.length}
          </p>
        </div>
      </div>

      <div className="space-y-6">

        {reservations.map(
          (reservation) => (

          <div
            key={reservation.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm"
          >

            <div className="flex items-center gap-6">

              <img
                src={
                  reservation.product.imageUrl
                }

                alt={
                  reservation.product.name
                }

                className="w-40 h-40 rounded-2xl object-cover"
              />

              <div className="flex-1">

                <div className="flex items-center justify-between mb-4">

                  <div>

                    <h2 className="text-3xl font-bold text-slate-900">
                      {
                        reservation.product.name
                      }
                    </h2>

                    <p className="text-slate-500">
                      {
                        reservation.warehouse.name
                      }
                    </p>
                  </div>

                  <span
                    className={`
                      px-4 py-2 rounded-full text-sm font-semibold

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

                <div className="grid grid-cols-2 gap-4">

                  <div className="bg-slate-50 rounded-2xl p-4">

                    <p className="text-sm text-slate-500 mb-2">
                      Quantity
                    </p>

                    <p className="text-2xl font-bold text-slate-900">
                      {
                        reservation.quantity
                      }
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-4">

                    <p className="text-sm text-slate-500 mb-2">
                      Reservation ID
                    </p>

                    <p className="text-sm font-bold text-slate-900 break-all">
                      {reservation.id}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}