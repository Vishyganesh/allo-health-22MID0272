export default function WarehousesPage() {

  return (

    <div>

      <div className="flex justify-between items-start mb-10">

        <div>

          <h1 className="text-5xl font-bold text-slate-900 mb-3">
            Warehouses
          </h1>

          <p className="text-slate-500 text-lg">
            Multi-warehouse inventory overview and analytics.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl px-5 py-3 shadow-sm">

          <p className="text-sm text-slate-500">
            Active locations
          </p>

          <p className="text-2xl font-bold text-slate-900">
            2
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">

          <div className="flex items-center justify-between mb-6">

            <div>

              <h2 className="text-2xl font-bold text-slate-900">
                Chennai Warehouse
              </h2>

              <p className="text-slate-500">
                Primary fulfillment center
              </p>
            </div>

            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
              Operational
            </span>
          </div>

          <div className="space-y-4">

            <div className="flex items-center justify-between bg-slate-50 rounded-2xl p-4">

              <span className="font-medium text-slate-700">
                Products stored
              </span>

              <span className="font-bold text-slate-900">
                2
              </span>
            </div>

            <div className="flex items-center justify-between bg-slate-50 rounded-2xl p-4">

              <span className="font-medium text-slate-700">
                Reserved stock
              </span>

              <span className="font-bold text-yellow-600">
                Active holds
              </span>
            </div>

            <div className="flex items-center justify-between bg-slate-50 rounded-2xl p-4">

              <span className="font-medium text-slate-700">
                Inventory health
              </span>

              <span className="font-bold text-green-700">
                Stable
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">

          <div className="flex items-center justify-between mb-6">

            <div>

              <h2 className="text-2xl font-bold text-slate-900">
                Bangalore Warehouse
              </h2>

              <p className="text-slate-500">
                Secondary inventory node
              </p>
            </div>

            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
              Operational
            </span>
          </div>

          <div className="space-y-4">

            <div className="flex items-center justify-between bg-slate-50 rounded-2xl p-4">

              <span className="font-medium text-slate-700">
                Products stored
              </span>

              <span className="font-bold text-slate-900">
                1
              </span>
            </div>

            <div className="flex items-center justify-between bg-slate-50 rounded-2xl p-4">

              <span className="font-medium text-slate-700">
                Reserved stock
              </span>

              <span className="font-bold text-yellow-600">
                Minimal
              </span>
            </div>

            <div className="flex items-center justify-between bg-slate-50 rounded-2xl p-4">

              <span className="font-medium text-slate-700">
                Inventory health
              </span>

              <span className="font-bold text-green-700">
                Stable
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}