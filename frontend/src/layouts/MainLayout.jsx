export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-blue-600 text-white p-4 shadow">
        <h1 className="font-bold">
          AI Tender & Vendor Evaluation Assistant
        </h1>
      </header>

      <main className="p-6">
        {children}
      </main>
    </div>
  );
}