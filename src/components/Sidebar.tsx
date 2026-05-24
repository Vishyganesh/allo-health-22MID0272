"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "Products",
    href: "/",
    icon: "📦",
  },

  {
    name: "Reservations",
    href: "/reservations",
    icon: "🧾",
  },

  {
    name: "Warehouses",
    href: "/warehouses",
    icon: "🏬",
  },
];

export default function Sidebar() {

  const pathname = usePathname();

  return (

    <aside className="min-w-280px bg-white border-r border-slate-200 p-6 flex flex-col justify-between">

      <div>

        <h1 className="text-4xl font-bold mb-10">

          <span className="text-slate-900">
            Allo
          </span>

          <span className="text-orange-500">
            Store
          </span>
        </h1>

        <div className="space-y-4">

          {links.map((link) => {

            const active =
              pathname === link.href;

            return (

              <Link
                key={link.href}
                href={link.href}

                className={`
                  flex items-center justify-between
                  px-5 py-5 rounded-2xl font-semibold transition

                  ${
                    active
                      ? "bg-indigo-50 border border-indigo-200"
                      : "hover:bg-slate-100"
                  }
                `}
              >

                <div className="flex items-center gap-3">

                  <span>
                    {link.icon}
                  </span>

                  <span>
                    {link.name}
                  </span>
                </div>

                <span>
                  ›
                </span>

              </Link>
            );
          })}
        </div>
      </div>

      <div className="border-t pt-6 text-slate-500 text-sm">
        System operational
      </div>
    </aside>
  );
}