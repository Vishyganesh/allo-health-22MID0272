"use client";

export default function Home() {
  async function createReservation() {
    const response = await fetch("/api/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: "cmpk289yd0002947so7fmhuj8",
        warehouseId: "cmpk289ux0000947s7arnbe22",
        quantity: 5,
      }),
    });

    const data = await response.json();

    console.log(data);

    alert(JSON.stringify(data, null, 2));
  }
  async function confirmReservation() {
    const reservationId = "PASTE_RESERVATION_ID";

    const response = await fetch(`/api/reservations/${reservationId}/confirm`, {
      method: "POST",
    });

    const data = await response.json();

    console.log(data);

    alert(JSON.stringify(data, null, 2));
  }
  async function releaseReservation() {
    const reservationId = "cmpk3c8tm0005943o52wu08dg";

    const response = await fetch(`/api/reservations/${reservationId}/release`, {
      method: "POST",
    });

    const data = await response.json();

    console.log(data);

    alert(JSON.stringify(data, null, 2));
  }

  return (
    <div className="p-10">
      <button
        onClick={createReservation}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Reserve Product
      </button>
      <button
        onClick={confirmReservation}
        className="bg-green-600 text-white px-4 py-2 rounded mt-4"
      >
        Confirm Reservation
      </button>
      <button
        onClick={releaseReservation}
        className="bg-red-600 text-white px-4 py-2 rounded mt-4 ml-4"
      >
        Release Reservation
      </button>
    </div>
  );
}
