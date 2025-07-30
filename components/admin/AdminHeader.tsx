"use client";
import { Bell, Wallet, Sun, Moon } from "lucide-react";
import { useState } from "react";

export default function AdminHeader({ dark, toggleTheme }: { dark: boolean; toggleTheme: () => void }) {
  return (
    <header
      className={`sticky top-0 z-40 flex items-center justify-between px-6 h-16 border-b ${dark ? "bg-[#18181b] border-[#23232a] shadow-lg" : "bg-white border-gray-200 shadow-lg"}`}
      style={{ boxShadow: dark
        ? "0 4px 16px 0 rgba(70,108,244,0.12), 0 2px 0 0 #23232a"
        : "0 4px 16px 0 rgba(70,108,244,0.16), 0 2px 0 0 #e5e7eb" }}
    >
      {/* Left: Logo */}
      <div className="flex items-center min-w-0">
        <span className={`font-bold text-2xl tracking-tight ${dark ? "text-white" : "text-[#466cf4]"}`}>Shopella</span>
      </div>
      {/* Right: Admin profile, wallet, theme toggle, notifications */}
      <div className="flex items-center gap-6">
        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-[#23232a]/20 transition">
          {dark ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-gray-800" />}
        </button>
        <div className={`flex items-center gap-2 ${dark ? "text-white" : "text-gray-800"}`}>
          <Wallet className="h-5 w-5" />
          <span className="font-medium">₦100,000</span>
        </div>
        <button className="relative">
          <Bell className={`h-6 w-6 ${dark ? "text-white" : "text-gray-800"}`} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
        </button>
        <div className="flex items-center gap-3 min-w-0">
          <img
            src="/placeholder-user.jpg"
            alt="Profile"
            className="h-10 w-10 rounded-full object-cover border border-[#23232a]"
          />
          <span className={`font-semibold truncate max-w-[120px] ${dark ? "text-white" : "text-gray-800"}`}>Admin</span>
        </div>
      </div>
    </header>
  );
}
