type Props = {
  availableStock: number;
};

export default function StatusBadge({
  availableStock,
}: Props) {

  if (availableStock <= 0) {

    return (

      <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold">
        Out of stock
      </span>
    );
  }

  if (availableStock <= 2) {

    return (

      <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-semibold">
        Low stock
      </span>
    );
  }

  return (

    <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
      Ready to reserve
    </span>
  );
}