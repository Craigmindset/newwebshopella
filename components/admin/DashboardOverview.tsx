"use client";
import { User, Store, Package, CreditCard } from "lucide-react";

const stats = [
  { title: "Total Users", value: "2,340", icon: User },
  { title: "Total Merchants", value: "120", icon: Store },
  { title: "Total Product Inventory", value: "4,500", icon: Package },
  { title: "Total Revenue", value: "₦12,000,000", icon: CreditCard },
];

const recentOrders = [
  {
    user: "Jane Doe",
    item: "Product A",
    merchant: "Merchant One",
    price: "₦20,000",
    date: "2025-07-29",
    status: "Completed",
  },
  {
    user: "John Smith",
    item: "Product B",
    merchant: "Merchant Two",
    price: "₦10,000",
    date: "2025-07-28",
    status: "Pending",
  },
];

export default function DashboardOverview({ dark }: { dark?: boolean }) {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className={`rounded-lg shadow px-4 py-3 flex flex-col items-center justify-center cursor-pointer transition-colors
                ${dark ? "bg-[#23232a] text-white hover:bg-[#466cf4]/10" : "bg-gray-50 text-gray-800 hover:bg-[#466cf4]/10"}`}
            >
              <Icon className={`h-7 w-7 mb-1 ${dark ? "text-[#466cf4]" : "text-[#466cf4]"}`} />
              <span className="text-base font-medium mb-1 whitespace-nowrap overflow-hidden text-ellipsis w-full text-center">{stat.title}</span>
              <span className="text-xl font-bold whitespace-nowrap">{stat.value}</span>
            </div>
          );
        })}
      </div>
      <div className={`rounded-lg shadow p-6 w-full overflow-x-auto ${dark ? "bg-[#23232a]" : "bg-gray-100"}`}>
        <h2 className={`text-xl font-bold mb-4 ${dark ? "text-white" : "text-gray-800"}`}>Recent Order Transactions</h2>
        <table className={`min-w-full text-sm text-left ${dark ? "text-white" : "text-gray-800"}`}>
          <thead>
            <tr className={dark ? "bg-[#18181b]" : "bg-gray-200"}>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Item</th>
              <th className="px-4 py-2">Merchant</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order, i) => (
              <tr key={i} className={dark ? "border-b border-[#23232a]" : "border-b border-gray-300"}>
                <td className="px-4 py-2 whitespace-nowrap">{order.user}</td>
                <td className="px-4 py-2 whitespace-nowrap">{order.item}</td>
                <td className="px-4 py-2 whitespace-nowrap">{order.merchant}</td>
                <td className="px-4 py-2 whitespace-nowrap">{order.price}</td>
                <td className="px-4 py-2 whitespace-nowrap">{order.date}</td>
                <td className="px-4 py-2 whitespace-nowrap">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
