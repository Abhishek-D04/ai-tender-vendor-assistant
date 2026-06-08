export default function DashboardPage() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">
        Dashboard
      </h2>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">
            Total Tenders
          </h3>

          <p className="text-3xl font-bold mt-2">
            24
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">
            Vendors Evaluated
          </h3>

          <p className="text-3xl font-bold mt-2">
            135
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">
            AI Recommendations
          </h3>

          <p className="text-3xl font-bold mt-2">
            48
          </p>
        </div>
      </div>
    </div>
  );
}