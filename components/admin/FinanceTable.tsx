"use client";

const transactions = [
  {
    profile: "/placeholder-user.jpg",
    name: "John Doe",
    email: "john@example.com",
    phone: "08012345678",
    item: "Product A",
    merchant: "Merchant One",
    payment: "Card",
    price: "₦20,000",
    markedPrice: "₦22,000",
    commission: "₦2,000",
    delivery: "₦1,000",
    vat: "₦500",
    payout: "₦18,500",
  },
];

export default function FinanceTable() {
  return (
    <div className="bg-[#23232a] rounded-lg shadow p-6 w-full overflow-x-auto">
      <h2 className="text-xl font-bold mb-4 text-white">Transactions</h2>
      <table className="min-w-full text-sm text-left text-white">
        <thead>
          <tr className="bg-[#18181b]">
            <th className="px-4 py-2">Profile</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Phone</th>
            <th className="px-4 py-2">Item</th>
            <th className="px-4 py-2">Merchant</th>
            <th className="px-4 py-2">Payment</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Marked Price</th>
            <th className="px-4 py-2">Commission</th>
            <th className="px-4 py-2">Delivery</th>
            <th className="px-4 py-2">VAT</th>
            <th className="px-4 py-2">Payout</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t, i) => (
            <tr key={i} className="border-b border-[#23232a]">
              <td className="px-4 py-2 whitespace-nowrap">
                <img src={t.profile} alt={t.name} className="h-8 w-8 rounded-full object-cover" />
              </td>
              <td className="px-4 py-2 whitespace-nowrap">{t.name}</td>
              <td className="px-4 py-2 whitespace-nowrap">{t.email}</td>
              <td className="px-4 py-2 whitespace-nowrap">{t.phone}</td>
              <td className="px-4 py-2 whitespace-nowrap">{t.item}</td>
              <td className="px-4 py-2 whitespace-nowrap">{t.merchant}</td>
              <td className="px-4 py-2 whitespace-nowrap">{t.payment}</td>
              <td className="px-4 py-2 whitespace-nowrap">{t.price}</td>
              <td className="px-4 py-2 whitespace-nowrap">{t.markedPrice}</td>
              <td className="px-4 py-2 whitespace-nowrap">{t.commission}</td>
              <td className="px-4 py-2 whitespace-nowrap">{t.delivery}</td>
              <td className="px-4 py-2 whitespace-nowrap">{t.vat}</td>
              <td className="px-4 py-2 whitespace-nowrap">{t.payout}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
