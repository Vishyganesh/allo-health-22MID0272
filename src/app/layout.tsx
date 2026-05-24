import type { Metadata } from "next";

import "./globals.css";

import AppShell from "@/components/AppShell";

export const metadata: Metadata = {
  title: "Allo Store",
  description:
    "Inventory reservation dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

    <html lang="en">

      <body>

        <AppShell>
          {children}
        </AppShell>

      </body>
    </html>
  );
}