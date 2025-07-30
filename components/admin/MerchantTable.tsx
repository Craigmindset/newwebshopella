"use client";
import { Button } from "@/components/ui/button";

const merchants = [
  {
    name: "Merchant One",
    products: 120,
    transactions: 340,
    totalSales: "₦500,000",
    commission: "₦50,000",
    status: "Approved",
  },
  {
    name: "Merchant Two",
    products: 80,
    transactions: 210,
    totalSales: "₦300,000",
    commission: "₦30,000",
    status: "Pending",
  },
];

export default function MerchantTable({ dark }: { dark?: boolean }) {
  return (
    <div className={`rounded-lg shadow p-6 w-full overflow-x-auto ${dark ? "bg-[#23232a]" : "bg-gray-100"}`}>
      <h2 className={`text-xl font-bold mb-4 ${dark ? "text-white" : "text-gray-800"}`}>Merchants</h2>
      <table className={`min-w-full text-sm text-left ${dark ? "text-white" : "text-gray-800"}`}>
        <thead>
          <tr className={dark ? "bg-[#18181b]" : "bg-gray-200"}>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Products</th>
            <th className="px-4 py-2">Transactions</th>
            <th className="px-4 py-2">Total Sales</th>
            <th className="px-4 py-2">Commission</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {merchants.map((m, i) => (
            <tr key={i} className={dark ? "border-b border-[#23232a]" : "border-b border-gray-300"}>
              <td className="px-4 py-2 whitespace-nowrap">{m.name}</td>
              <td className="px-4 py-2 whitespace-nowrap">{m.products}</td>
              <td className="px-4 py-2 whitespace-nowrap">{m.transactions}</td>
              <td className="px-4 py-2 whitespace-nowrap">{m.totalSales}</td>
              <td className="px-4 py-2 whitespace-nowrap">{m.commission}</td>
              <td className="px-4 py-2 whitespace-nowrap">{m.status}</td>
              <td className="px-4 py-2 whitespace-nowrap flex gap-2">
                <Button size="sm" variant="outline" className={dark ? "bg-green-600 text-white border-none" : "bg-green-100 text-green-800 border-none"}>Approve</Button>
                <Button size="sm" variant="outline" className={dark ? "bg-red-600 text-white border-none" : "bg-red-100 text-red-800 border-none"}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
