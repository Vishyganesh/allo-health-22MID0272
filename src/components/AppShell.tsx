import Sidebar from "./Sidebar";

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <div className="flex min-h-screen bg-[#F3F4F6]">

      <Sidebar />

      <main className="flex-1 overflow-y-auto p-10">

        <div className="max-w-7xl mx-auto">
          {children}
        </div>

      </main>
    </div>
  );
}