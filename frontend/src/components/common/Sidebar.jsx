export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow h-screen">
      <div className="p-6 font-bold text-blue-600 text-xl">
        AI Tender
      </div>

      <nav className="px-4">
        <ul className="space-y-2">
          <li className="p-3 rounded-lg bg-blue-100 text-blue-600">
            Dashboard
          </li>

          <a
  href="/tenders"
  className="block p-3 rounded-lg hover:bg-gray-100"
>
  Tenders
</a>

          <a
  href="/vendors"
  className="block p-3 rounded-lg hover:bg-gray-100"
>
  Vendors
</a>

          <li className="p-3 rounded-lg hover:bg-gray-100">
            Reports
          </li>

          <li className="p-3 rounded-lg hover:bg-gray-100">
            Settings
          </li>
        </ul>
      </nav>
    </aside>
  );
}