import Sidebar from "../components/common/Sidebar";

export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1">
        <header className="bg-white shadow p-4">
          <h1 className="font-bold text-xl">
            AI Tender & Vendor Evaluation Assistant
          </h1>
        </header>

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}