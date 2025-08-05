"use client";

import { Search, AlignJustify, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

export default function StoreHeader() {
  const [search, setSearch] = useState("");
  const [showCategories, setShowCategories] = useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  // Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowCategories(false);
      }
    }
    if (showCategories) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCategories]);
  const categories = [
    {
      name: "Phones and Tablets",
      icon: <Search className="h-4 w-4 text-[#466cf4]" />,
    },
    {
      name: "Computing",
      icon: <CreditCard className="h-4 w-4 text-[#466cf4]" />,
    },
    {
      name: "Electronics",
      icon: <AlignJustify className="h-4 w-4 text-[#466cf4]" />,
    },
    {
      name: "Generators",
      icon: <Search className="h-4 w-4 text-[#466cf4]" />,
    },
    {
      name: "Accessories",
      icon: <CreditCard className="h-4 w-4 text-[#466cf4]" />,
    },
    {
      name: "Home & Kitchen",
      icon: <AlignJustify className="h-4 w-4 text-[#466cf4]" />,
    },
    { name: "Lifestyle", icon: <Search className="h-4 w-4 text-[#466cf4]" /> },
    {
      name: "Watches",
      icon: <CreditCard className="h-4 w-4 text-[#466cf4]" />,
    },
    {
      name: "Premium Devices",
      icon: <AlignJustify className="h-4 w-4 text-[#466cf4]" />,
    },
  ];

  return (
    <header className="w-full bg-white py-4 px-6 shadow flex items-center gap-4 relative sticky top-0 z-30">
      {/* Align Justify Icon */}
      <div className="relative" ref={dropdownRef}>
        <AlignJustify
          className="h-6 w-6 text-gray-600 cursor-pointer"
          onClick={() => setShowCategories((prev) => !prev)}
        />
        {showCategories && (
          <div className="absolute left-0 mt-2 bg-white border rounded shadow-lg z-10 min-w-[200px]">
            <ul>
              {categories.map((cat) => (
                <li
                  key={cat.name}
                  className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer text-sm"
                >
                  {cat.icon}
                  <span className="text-xs">{cat.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <span className="font-bold text-lg text-[#466cf4] ml-2">KREDMART</span>
      {/* Search Bar */}
      <div className="flex-1 flex items-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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
