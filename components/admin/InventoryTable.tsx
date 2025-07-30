"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type Product = {
  name: string;
  category: string;
  brand: string;
  merchant: string;
  merchantPrice: number;
  discount: number;
  markup: number;
  salesPrice: number;
};

type EditState = {
  open: boolean;
  index: number | null;
}

const initialProducts: Product[] = [
  {
    name: "Product A",
    category: "Electronics",
    brand: "BrandX",
    merchant: "Merchant One",
    merchantPrice: 20000,
    discount: 500,
    markup: 2000,
    salesPrice: 22000,
  },
  {
    name: "Product B",
    category: "Fashion",
    brand: "BrandY",
    merchant: "Merchant Two",
    merchantPrice: 10000,
    discount: 300,
    markup: 1000,
    salesPrice: 11000,
  },
];

const filterFields = [
  { key: "name", label: "Product Name" },
  { key: "category", label: "Category" },
  { key: "brand", label: "Brand" },
  { key: "merchant", label: "Merchant" },
];

export default function InventoryTable() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [filter, setFilter] = useState<{ key: keyof Product; value: string }>({ key: "name", value: "" });
  const [page, setPage] = useState(1);
  const pageSize = 50;

  const [editState, setEditState] = useState<EditState>({ open: false, index: null });
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter((p) => {
    const value = p[filter.key];
    if (typeof value === "string") {
      return value.toLowerCase().includes(filter.value.toLowerCase());
    }
    if (typeof value === "number") {
      return value.toString().includes(filter.value);
    }
    return false;
  });

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  return (
    <div className="rounded-xl shadow-lg p-6 w-full overflow-x-auto bg-white dark:bg-[#18181b] border border-gray-200 dark:border-[#23232a]">
      <h2 className="text-2xl font-bold mb-6 text-[#466cf4] dark:text-white tracking-tight">Inventory Management</h2>
      <div className="flex gap-4 mb-6 flex-wrap">
        <select
          className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#466cf4] text-xs placeholder-gray-400 dark:placeholder-gray-300 bg-white dark:bg-[#23232a] text-gray-900 dark:text-white"
          value={filter.key}
          onChange={(e) => setFilter({ ...filter, key: e.target.value as keyof Product })}
        >
          {filterFields.map((f) => (
            <option key={f.key} value={f.key}>{f.label}</option>
          ))}
        </select>
        <input
          type="text"
          className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#466cf4] text-xs placeholder-gray-400 dark:placeholder-gray-300 bg-white dark:bg-[#23232a] text-gray-900 dark:text-white"
          placeholder={`${filterFields.find(f => f.key === filter.key)?.label}`}
          value={filter.value}
          onChange={(e) => setFilter({ ...filter, value: e.target.value })}
        />
      </div>
      <table className="min-w-full text-sm text-left rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-[#466cf4] text-white dark:bg-[#23232a] dark:text-[#466cf4]">
            <th className="px-4 py-3 font-semibold">Product Name</th>
            <th className="px-4 py-3 font-semibold">Category</th>
            <th className="px-4 py-3 font-semibold">Brand</th>
            <th className="px-4 py-3 font-semibold">Merchant</th>
            <th className="px-4 py-3 font-semibold">Merchant Price</th>
            <th className="px-4 py-3 font-semibold">Discount</th>
            <th className="px-4 py-3 font-semibold">Mark Up</th>
            <th className="px-4 py-3 font-semibold">Sales Price</th>
            <th className="px-4 py-3 font-semibold">Edit</th>
          </tr>
        </thead>
        <tbody>
          {paginatedProducts.map((p, i) => (
            <tr
              key={i}
              className="border-b last:border-none dark:border-[#23232a] hover:bg-[#f5f7ff] dark:hover:bg-[#23232a]/70 transition"
            >
              <td className="pl-6 pr-10 py-3 whitespace-nowrap text-gray-800 dark:text-gray-200">{p.name}</td>
              <td className="px-4 py-3 whitespace-nowrap text-gray-800 dark:text-gray-200">{p.category}</td>
              <td className="px-4 py-3 whitespace-nowrap text-gray-800 dark:text-gray-200">{p.brand}</td>
              <td className="px-4 py-3 whitespace-nowrap text-gray-800 dark:text-gray-200">{p.merchant}</td>
              <td className="pl-9 pr-12 py-3 whitespace-nowrap text-[#466cf4] dark:text-[#90a7f7]">₦{p.merchantPrice.toLocaleString()}</td>
              <td className="px-4 py-3 whitespace-nowrap text-green-600 dark:text-green-400">₦{p.discount.toLocaleString()}</td>
              <td className="px-4 py-3 pr-10 whitespace-nowrap text-orange-600 dark:text-orange-400">₦{p.markup.toLocaleString()}</td>
              <td className="px-4 py-3 pr-10 whitespace-nowrap text-gray-900 dark:text-white font-semibold">₦{p.salesPrice.toLocaleString()}</td>
              <td className="px-4 py-3 whitespace-nowrap">
                <Button
                  size="sm"
                  className="bg-[#466cf4] text-white"
                  onClick={() => {
                    setEditState({ open: true, index: i + (page - 1) * pageSize });
                    setEditProduct(products[i + (page - 1) * pageSize]);
                  }}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Edit Modal */}
      {editState.open && editProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-[#23232a] rounded-xl shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4 text-[#466cf4] dark:text-white">Edit Product</h3>
            <form
              onSubmit={e => {
                e.preventDefault();
                if (editState.index !== null) {
                  const updated = [...products];
                  updated[editState.index] = editProduct;
                  setProducts(updated);
                  setEditState({ open: false, index: null });
                  setEditProduct(null);
                }
              }}
            >
              {Object.entries(editProduct).map(([key, value]) => (
                key !== "salesPrice" ? (
                  <div key={key} className="mb-3">
                    <label className="block text-sm font-medium mb-1 capitalize text-gray-700 dark:text-gray-300">{key.replace(/([A-Z])/g, ' $1')}</label>
                    <input
                      className="border px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#466cf4] dark:bg-[#18181b] dark:text-white"
                      type={typeof value === "number" ? "number" : "text"}
                      value={value}
                      onChange={e => setEditProduct({ ...editProduct, [key]: typeof value === "number" ? Number(e.target.value) : e.target.value })}
                    />
                  </div>
                ) : null
              ))}
              <div className="flex gap-2 mt-6">
                <Button type="submit" className="bg-[#466cf4] text-white">Save</Button>
                <Button type="button" variant="outline" onClick={() => { setEditState({ open: false, index: null }); setEditProduct(null); }}>Cancel</Button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="flex justify-between items-center mt-6">
        <span className="text-xs text-gray-500 dark:text-gray-300">
          Showing {paginatedProducts.length} of {filteredProducts.length} products
        </span>
        {filteredProducts.length > pageSize && (
          <div className="flex gap-2">
            <Button
              size="sm"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="bg-[#466cf4] text-white"
            >
              Previous
            </Button>
            <span className="text-sm font-medium">Page {page} of {totalPages}</span>
            <Button
              size="sm"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="bg-[#466cf4] text-white"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
