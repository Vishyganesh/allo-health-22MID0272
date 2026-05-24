"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Reservation = {
  id: string;
  quantity: number;
  status: string;
  expiresAt: string;

  product: {
    name: string;
  };

  warehouse: {
    name: string;
  };
};

export default function ReservationPage() {

  const params = useParams();

  const router = useRouter();

  const reservationId =
    params.id as string;

  const [reservation, setReservation] =
    useState<Reservation | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [timeLeft, setTimeLeft] =
    useState("");

  async function fetchReservation() {

    try {

      setError("");

      const response = await fetch(
        `/api/reservations/${reservationId}`
      );

      const data =
        await response.json();

      if (!response.ok) {

        setError(
          data.error ||
          "Failed to load reservation"
        );

        return;
      }

      setReservation(data);

    } catch {

      setError(
        "Something went wrong"
      );

    } finally {

      setLoading(false);
    }
  }

  useEffect(() => {

    if (reservationId) {
      fetchReservation();
    }

  }, [reservationId]);

  useEffect(() => {

    if (!reservation) return;

    const interval = setInterval(() => {

      const now = new Date();

      const expiry =
        new Date(
          reservation.expiresAt
        );

      const difference =
        expiry.getTime() -
        now.getTime();

      if (difference <= 0) {

        setTimeLeft("Expired");

        clearInterval(interval);

        return;
      }

      const minutes =
        Math.floor(
          difference / 1000 / 60
        );

      const seconds =
        Math.floor(
          (difference / 1000) % 60
        );

      setTimeLeft(
        `${minutes}m ${seconds}s`
      );

    }, 1000);

    return () =>
      clearInterval(interval);

  }, [reservation]);

  async function confirmReservation() {

    try {

      setError("");

      const response = await fetch(
        `/api/reservations/${reservationId}/confirm`,
        {
          method: "POST",
        }
      );

      const data =
        await response.json();

      if (!response.ok) {

        setError(
          data.error ||
          "Confirm failed"
        );

        return;
      }

      fetchReservation();

    } catch {

      setError(
        "Something went wrong"
      );
    }
  }

  async function releaseReservation() {

    try {

      setError("");

      const response = await fetch(
        `/api/reservations/${reservationId}/release`,
        {
          method: "POST",
        }
      );

      const data =
        await response.json();

      if (!response.ok) {

        setError(
          data.error ||
          "Release failed"
        );

        return;
      }

      fetchReservation();

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

  if (!reservation) {

    return (
      <div className="p-10">
        Reservation not found
      </div>
    );
  }

  return (

    <div className="p-10 max-w-2xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        Reservation Details
      </h1>

      {error && (

        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="border rounded-lg p-6 space-y-4">

        <div>
          <span className="font-semibold">
            Product:
          </span>
          {" "}
          {reservation.product.name}
        </div>

        <div>
          <span className="font-semibold">
            Warehouse:
          </span>
          {" "}
          {reservation.warehouse.name}
        </div>

        <div>
          <span className="font-semibold">
            Quantity:
          </span>
          {" "}
          {reservation.quantity}
        </div>

        <div>
          <span className="font-semibold">
            Status:
          </span>
          {" "}
          {reservation.status}
        </div>

        <div>
          <span className="font-semibold">
            Expires In:
          </span>
          {" "}
          {timeLeft}
        </div>

        <div className="flex gap-4 pt-4">

          <button
            onClick={
              confirmReservation
            }

            disabled={
              reservation.status !==
              "PENDING"
            }

            className="bg-green-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
          >
            Confirm
          </button>

          <button
            onClick={
              releaseReservation
            }

            disabled={
              reservation.status !==
              "PENDING"
            }

            className="bg-red-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
          >
            Cancel
          </button>

          <button
            onClick={() =>
              router.push("/")
            }

            className="border px-4 py-2 rounded"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}