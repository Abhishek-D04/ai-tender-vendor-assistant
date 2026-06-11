export default function TenderPage() {
  const tenders = [
    {
      id: "TEN-001",
      title: "Electrical Equipment Procurement",
      status: "Open",
      deadline: "15 Jun 2026",
    },
    {
      id: "TEN-002",
      title: "Industrial Safety Equipment",
      status: "Under Review",
      deadline: "20 Jun 2026",
    },
    {
      id: "TEN-003",
      title: "Transformer Components Supply",
      status: "Closed",
      deadline: "25 Jun 2026",
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Tender Management
        </h1>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          + New Tender
        </button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">Tender ID</th>
              <th className="text-left p-4">Title</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Deadline</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {tenders.map((tender) => (
              <tr key={tender.id} className="border-t">
                <td className="p-4">{tender.id}</td>
                <td className="p-4">{tender.title}</td>
                <td className="p-4">{tender.status}</td>
                <td className="p-4">{tender.deadline}</td>

                <td className="p-4">
                  <div className="flex gap-2">
                    <a
  href="/tenders/details"
  className="px-3 py-1 bg-blue-100 rounded"
>
  View
</a>

                    <button className="px-3 py-1 bg-green-100 rounded">
                      Analyze
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}