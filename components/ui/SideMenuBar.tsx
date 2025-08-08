"use client";
import Link from "next/link";
import React from "react";

const menuItems = [
  { id: "overview", label: "Overview" },
  { id: "loan-request", label: "Loan Request" },
  { id: "wallet", label: "Wallet" },
  { id: "transactions", label: "Transactions" },
  { id: "my-orders", label: "My Orders" },
  { id: "track-orders", label: "Track Orders" },
  { id: "account-settings", label: "Account Settings" },
  { id: "logout", label: "Log Out" },
];

type SideMenuBarProps = {
  active: string;
  onSelect?: (id: string) => void;
};

export default function SideMenuBar({ active, onSelect }: SideMenuBarProps) {
  return (
    <aside className="bg-white min-h-screen w-64 shadow-md flex flex-col py-8 px-4">
      {/* Mobile: Show Shopella logo at top */}
      <div className="mb-6 md:hidden">
        <Link
          href="/dashboard/user"
          className="text-2xl font-bold text-[#466cf4] block text-center"
        >
          KredMart
        </Link>
      </div>
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect && onSelect(item.id)}
            className={`text-left px-4 py-2 rounded-lg transition-colors font-medium ${
              active === item.id
                ? "bg-[#466cf4] text-white"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
