"use client";
import { Button } from "@/components/ui/button";

const users = [
  {
    profile: "/placeholder-user.jpg",
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "08012345678",
    status: "Active",
    orders: 12,
    totalSpent: "₦120,000",
    creditStatus: "Good",
    dateJoined: "2024-01-15",
  },
  {
    profile: "/placeholder-user.jpg",
    name: "John Smith",
    email: "john@example.com",
    phone: "08087654321",
    status: "Inactive",
    orders: 5,
    totalSpent: "₦40,000",
    creditStatus: "Poor",
    dateJoined: "2023-11-02",
  },
];

export default function UserTable({ dark }: { dark?: boolean }) {
  return (
    <div className={`rounded-lg shadow p-6 w-full overflow-x-auto ${dark ? "bg-[#23232a]" : "bg-gray-100"}`}>
      <h2 className={`text-xl font-bold mb-4 ${dark ? "text-white" : "text-gray-800"}`}>Users</h2>
      <table className={`min-w-full text-sm text-left ${dark ? "text-white" : "text-gray-800"}`}>
        <thead>
          <tr className={dark ? "bg-[#18181b]" : "bg-gray-200"}>
            <th className="px-4 py-2">Profile</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Phone Number</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Orders</th>
            <th className="px-4 py-2">Total Spent</th>
            <th className="px-4 py-2">Credit Status</th>
            <th className="px-4 py-2">Date Joined</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr key={i} className={dark ? "border-b border-[#23232a]" : "border-b border-gray-300"}>
              <td className="px-4 py-2 whitespace-nowrap">
                <img src={u.profile} alt={u.name} className="h-8 w-8 rounded-full object-cover" />
              </td>
              <td className="px-4 py-2 whitespace-nowrap">{u.name}</td>
              <td className="px-4 py-2 whitespace-nowrap">{u.email}</td>
              <td className="px-4 py-2 whitespace-nowrap">{u.phone}</td>
              <td className="px-4 py-2 whitespace-nowrap">{u.status}</td>
              <td className="px-4 py-2 whitespace-nowrap">{u.orders}</td>
              <td className="px-4 py-2 whitespace-nowrap">{u.totalSpent}</td>
              <td className="px-4 py-2 whitespace-nowrap">{u.creditStatus}</td>
              <td className="px-4 py-2 whitespace-nowrap">{u.dateJoined}</td>
              <td className="px-4 py-2 whitespace-nowrap">
                <Button size="sm" variant="outline" className={dark ? "bg-red-600 text-white border-none" : "bg-red-100 text-red-800 border-none"}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
