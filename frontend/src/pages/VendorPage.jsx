export default function VendorPage() {
  const vendors = [
    {
      name: "ABC Industries",
      quotation: "₹5,00,000",
      compliance: "Compliant",
      score: 92,
    },
    {
      name: "XYZ Engineering",
      quotation: "₹5,40,000",
      compliance: "Compliant",
      score: 88,
    },
    {
      name: "PQR Technologies",
      quotation: "₹4,90,000",
      compliance: "Non-Compliant",
      score: 70,
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Vendor Management
        </h1>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          + Add Vendor
        </button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">Vendor</th>
              <th className="text-left p-4">Quotation</th>
              <th className="text-left p-4">Compliance</th>
              <th className="text-left p-4">Score</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {vendors.map((vendor, index) => (
              <tr key={index} className="border-t">
                <td className="p-4">{vendor.name}</td>
                <td className="p-4">{vendor.quotation}</td>
                <td className="p-4">{vendor.compliance}</td>
                <td className="p-4">{vendor.score}</td>

                <td className="p-4">
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-blue-100 rounded">
                      View
                    </button>

                    <a
  href="/vendors/comparison"
  className="px-3 py-1 bg-green-100 rounded"
>
  Compare
</a>
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