"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function PriceMarkupForm() {
  const [category, setCategory] = useState("");
  const [product, setProduct] = useState("");
  const [markup, setMarkup] = useState("");

  return (
    <form className="bg-[#23232a] rounded-lg shadow p-6 w-full flex flex-col gap-4 mb-8">
      <h2 className="text-xl font-bold text-white">Add Price Markup</h2>
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 rounded bg-[#18181b] text-white border border-[#23232a] flex-1"
        />
        <input
          type="text"
          placeholder="Product"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          className="px-4 py-2 rounded bg-[#18181b] text-white border border-[#23232a] flex-1"
        />
        <input
          type="number"
          placeholder="Markup (₦)"
          value={markup}
          onChange={(e) => setMarkup(e.target.value)}
          className="px-4 py-2 rounded bg-[#18181b] text-white border border-[#23232a] flex-1"
        />
      </div>
      <Button type="submit" className="bg-green-600 text-white w-full md:w-auto">Add Markup</Button>
    </form>
  );
}
