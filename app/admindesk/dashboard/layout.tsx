"use client";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { useState } from "react";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(true);

  const toggleTheme = () => {
    setDark((prev) => !prev);
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", !dark);
      document.documentElement.classList.toggle("light", dark);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${dark ? "bg-[#18181b] text-white" : "bg-white text-gray-800"}`}>
      <AdminHeader dark={dark} toggleTheme={toggleTheme} />
      <div className="flex flex-1">
      <AdminSidebar dark={dark} />
        <main className="flex-1 p-6 overflow-x-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
