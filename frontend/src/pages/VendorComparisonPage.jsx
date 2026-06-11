export default function VendorComparisonPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Vendor Comparison
      </h1>

      <div className="bg-white rounded-xl shadow p-6">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3">Criteria</th>
              <th className="text-left p-3">ABC Industries</th>
              <th className="text-left p-3">XYZ Engineering</th>
              <th className="text-left p-3">PQR Technologies</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b">
              <td className="p-3">Quotation</td>
              <td className="p-3">₹5,00,000</td>
              <td className="p-3">₹5,40,000</td>
              <td className="p-3">₹4,90,000</td>
            </tr>

            <tr className="border-b">
              <td className="p-3">Compliance</td>
              <td className="p-3">Yes</td>
              <td className="p-3">Yes</td>
              <td className="p-3">No</td>
            </tr>

            <tr className="border-b">
              <td className="p-3">Delivery Time</td>
              <td className="p-3">20 Days</td>
              <td className="p-3">25 Days</td>
              <td className="p-3">18 Days</td>
            </tr>

            <tr>
              <td className="p-3 font-bold">Score</td>
              <td className="p-3 font-bold">92</td>
              <td className="p-3 font-bold">88</td>
              <td className="p-3 font-bold">70</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-green-100 border border-green-300 rounded-xl p-6 mt-6">
        <h2 className="text-xl font-bold text-green-700">
          Recommended Vendor
        </h2>

        <p className="mt-2">
          ABC Industries has the highest overall score
          and meets all compliance requirements.
        </p>
      </div>
    </div>
  );
}