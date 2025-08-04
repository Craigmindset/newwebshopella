"use client";

import { Search, AlignJustify, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

export default function StoreHeader() {
  const [search, setSearch] = useState("");

  return (
    <header className="w-full bg-white py-4 px-6 shadow flex items-center gap-4">
      {/* Align Justify Icon */}
      <AlignJustify className="h-6 w-6 text-gray-600" />
      {/* Search Bar */}
      <div className="flex-1 flex items-center">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search for your brands"
          className="w-full border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:border-[#466cf4]"
        />
        <Button className="rounded-none rounded-r-lg px-4 py-2 flex items-center gap-2 bg-[#466cf4] text-white">
          <Search className="h-4 w-4" />
          Search
        </Button>
      </div>
      {/* Get Loans to Shop Button */}
      <Button className="ml-4 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold">
        <CreditCard className="h-5 w-5" />
        Get loans to shop
      </Button>
    </header>
  );
}
