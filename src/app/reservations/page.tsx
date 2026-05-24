"use client";

import { useEffect, useState } from "react";

type Reservation = {
  id: string;

  quantity: number;

  status: string;

  expiresAt: string;

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

    const interval =
      setInterval(
        fetchReservations,
        1000
      );

    return () =>
      clearInterval(interval);

  }, []);

  async function confirmReservation(
    id: string
  ) {

    try {

      await fetch(
        `/api/reservations/${id}/confirm`,
        {
          method: "POST",
        }
      );

      fetchReservations();

    } catch (error) {

      console.error(error);
    }
  }

  async function releaseReservation(
    id: string
  ) {

    try {

      await fetch(
        `/api/reservations/${id}/release`,
        {
          method: "POST",
        }
      );

      fetchReservations();

    } catch (error) {

      console.error(error);
    }
  }

  function getRemainingTime(
    expiresAt: string
  ) {

    const diff =
      new Date(expiresAt).getTime() -
      Date.now();

    if (diff <= 0) {
      return "Expired";
    }

    const mins =
      Math.floor(diff / 60000);

    const secs =
      Math.floor(
        (diff % 60000) / 1000
      );

    return `${mins}m ${secs}s`;
  }

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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

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

                  <div className="bg-slate-50 rounded-2xl p-4">

                    <p className="text-sm text-slate-500 mb-2">
                      Expires In
                    </p>

                    <p className="text-1xl font-bold text-slate-900">

                      {reservation.status ===
                        "PENDING"

                        ? getRemainingTime(
                            reservation.expiresAt
                          )

                        : "Completed"}
                    </p>
                  </div>
                </div>

                {reservation.status ===
                  "PENDING" && (

                  <div className="flex gap-4">

                    <button
                      onClick={() =>
                        confirmReservation(
                          reservation.id
                        )
                      }

                      className="bg-green-600 text-white px-6 py-3 rounded-2xl hover:bg-green-700 transition"
                    >

                      Confirm
                    </button>

                    <button
                      onClick={() =>
                        releaseReservation(
                          reservation.id
                        )
                      }

                      className="bg-red-600 text-white px-6 py-3 rounded-2xl hover:bg-red-700 transition"
                    >

                      Release
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}