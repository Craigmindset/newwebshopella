"use client";

const products = [
  {
    name: "Product A",
    category: "Electronics",
    price: "₦20,000",
    markup: "₦2,000",
    merchant: "Merchant One",
    status: "Active",
  },
  {
    name: "Product B",
    category: "Fashion",
    price: "₦10,000",
    markup: "₦1,000",
    merchant: "Merchant Two",
    status: "Inactive",
  },
];

export default function ProductTable() {
  return (
    <div className="bg-[#23232a] rounded-lg shadow p-6 w-full overflow-x-auto">
      <h2 className="text-xl font-bold mb-4 text-white">Products</h2>
      <table className="min-w-full text-sm text-left text-white">
        <thead>
          <tr className="bg-[#18181b]">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Markup</th>
            <th className="px-4 py-2">Merchant</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, i) => (
            <tr key={i} className="border-b border-[#23232a]">
              <td className="px-4 py-2 whitespace-nowrap">{p.name}</td>
              <td className="px-4 py-2 whitespace-nowrap">{p.category}</td>
              <td className="px-4 py-2 whitespace-nowrap">{p.price}</td>
              <td className="px-4 py-2 whitespace-nowrap">{p.markup}</td>
              <td className="px-4 py-2 whitespace-nowrap">{p.merchant}</td>
              <td className="px-4 py-2 whitespace-nowrap">{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
