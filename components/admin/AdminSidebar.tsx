"use client";
import Link from "next/link";
import {
  Users,
  Store,
  Package,
  Image,
  CreditCard,
  BarChart2,
  Boxes,
  Truck,
  LogOut,
} from "lucide-react";

const links = [
  { name: "Overview", href: "/admindesk/dashboard", icon: BarChart2 },
  { name: "Users Management", href: "/admindesk/dashboard/users", icon: Users },
  {
    name: "Merchant Management",
    href: "/admindesk/dashboard/merchants",
    icon: Store,
  },
  { name: "Product", href: "/admindesk/dashboard/products", icon: Package },
  { name: "Inventory Management", href: "/admindesk/dashboard/inventory", icon: Boxes },
  { name: "Delivery Management", href: "/admindesk/dashboard/delivery", icon: Truck },
  {
    name: "Banner Management",
    href: "/admindesk/dashboard/banners",
    icon: Image,
  },
  {
    name: "Transactions",
    href: "/admindesk/dashboard/transactions",
    icon: CreditCard,
  },
  { name: "Finance", href: "/admindesk/dashboard/finance", icon: BarChart2 },
];

export default function AdminSidebar({ dark }: { dark: boolean }) {
  return (
    <aside className={`w-64 min-h-screen flex flex-col py-8 px-4 border-r ${dark ? "bg-[#23232a] text-white border-[#23232a]" : "bg-gray-100 text-gray-800 border-gray-200"}`}>
      <nav className="flex flex-col gap-3 flex-1">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`flex items-center gap-3 px-4 py-2 rounded transition text-sm font-medium whitespace-normal ${dark ? "hover:bg-[#466cf4] hover:text-white" : "hover:bg-[#466cf4] hover:text-white"}`}
          >
            <link.icon className={`h-5 w-5 shrink-0 ${dark ? "text-white" : "text-gray-800"}`} />
            <span className="truncate max-w-[140px]">{link.name}</span>
          </Link>
        ))}
      </nav>
      <button
        onClick={() => {
          // Clear session or token here if needed
          if (typeof window !== "undefined") {
            // Example: localStorage.removeItem("adminToken");
            window.location.href = "/";
          }
        }}
        className={`flex items-center gap-3 px-4 py-2 rounded transition text-sm font-medium mt-6 ${dark ? "hover:bg-[#18181b] text-red-400" : "hover:bg-gray-200 text-red-600"}`}
      >
        <LogOut className={`h-5 w-5 shrink-0 ${dark ? "text-red-400" : "text-red-600"}`} />
        <span>Logout</span>
      </button>
    </aside>
  );
}
