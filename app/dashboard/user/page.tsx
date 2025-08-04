"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  Wallet,
  Bell,
  ShoppingBag,
  CreditCard,
  MapPin,
  Settings,
  LogOut,
  Menu,
  X,
  Plus,
} from "lucide-react";
import MiniCart from "@/components/MiniCart";
import UserHeader from "@/components/UserHeader";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

// Mock user data - In real app, this would come from API
const userData = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  avatar: "/placeholder.svg?height=100&width=100",
  walletBalance: 2500.0,
  totalOrders: 24,
  pendingOrders: 3,
};

const loanProviders = [
  { id: 1, name: "QuickLoan", maxAmount: 5000, interestRate: "12%" },
  { id: 2, name: "FastCredit", maxAmount: 3000, interestRate: "15%" },
  { id: 3, name: "InstantCash", maxAmount: 7500, interestRate: "10%" },
  { id: 4, name: "EasyMoney", maxAmount: 2000, interestRate: "18%" },
];

const recentOrders = [
  {
    id: 1,
    product: "iPhone 15 Pro",
    amount: 999,
    status: "Delivered",
    date: "2024-01-15",
  },
  {
    id: 2,
    product: "Samsung Galaxy S24",
    amount: 899,
    status: "Shipped",
    date: "2024-01-12",
  },
  {
    id: 3,
    product: "MacBook Air M3",
    amount: 1299,
    status: "Processing",
    date: "2024-01-10",
  },
];

export default function UserDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [fundAmount, setFundAmount] = useState("");

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: User },
    { id: "orders", label: "My Orders", icon: ShoppingBag },
    { id: "loans", label: "Loan Requests", icon: CreditCard },
    { id: "wallet", label: "Wallet", icon: Wallet },
    { id: "track", label: "Track Order", icon: MapPin },
    { id: "account", label: "Account Settings", icon: Settings },
    { id: "logout", label: "Log Out", icon: LogOut },
  ];

  const handleAddFunds = () => {
    // API integration point: POST /api/wallet/add-funds
    console.log("Adding funds:", fundAmount);
    setShowAddFunds(false);
    setFundAmount("");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Wallet Balance</p>
                    <p className="text-lg font-bold text-[#466cf4]">
                      ₦{userData.walletBalance.toFixed(2)}
                    </p>
                  </div>
                  <Wallet className="h-8 w-8 text-[#466cf4]" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Orders</p>
                    <p className="text-lg font-bold text-green-600">
                      {userData.totalOrders}
                    </p>
                  </div>
                  <ShoppingBag className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Pending Orders</p>
                    <p className="text-lg font-bold text-orange-600">
                      {userData.pendingOrders}
                    </p>
                  </div>
                  <Bell className="h-8 w-8 text-orange-600" />
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Product</th>
                      <th className="text-left py-2">Amount</th>
                      <th className="text-left py-2">Status</th>
                      <th className="text-left py-2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b">
                        <td className="py-3">{order.product}</td>
                        <td className="py-3">₦{order.amount}</td>
                        <td className="py-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-800"
                                : order.status === "Shipped"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-orange-100 text-orange-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3">{order.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case "loans":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">
                Available Loan Providers
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {loanProviders.map((provider) => (
                  <div
                    key={provider.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <h4 className="font-semibold text-lg">{provider.name}</h4>
                    <p className="text-gray-600">
                      Max Amount: ₦{provider.maxAmount.toLocaleString()}
                    </p>
                    <p className="text-gray-600">
                      Interest Rate: {provider.interestRate}
                    </p>
                    <Button className="mt-3 bg-[#466cf4] hover:bg-[#3a5ce0]">
                      Apply Now
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "wallet":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Wallet Balance</h3>
                <Button
                  onClick={() => setShowAddFunds(true)}
                  className="bg-[#466cf4] hover:bg-[#3a5ce0]"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Funds
                </Button>
              </div>
              <div className="text-3xl font-bold text-[#466cf4] mb-6">
                ₦{userData.walletBalance.toFixed(2)}
              </div>

              {/* Transaction History */}
              <h4 className="font-semibold mb-3">Recent Transactions</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium">Purchase - iPhone 15 Pro</p>
                    <p className="text-sm text-gray-600">Jan 15, 2024</p>
                  </div>
                  <span className="text-red-600 font-semibold">-₦999.00</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium">Wallet Top-up</p>
                    <p className="text-sm text-gray-600">Jan 10, 2024</p>
                  </div>
                  <span className="text-green-600 font-semibold">
                    +₦1,500.00
                  </span>
                </div>
              </div>
            </div>

            {/* Add Funds Modal */}
            {showAddFunds && (
              <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">
                      Add Funds to Wallet
                    </h3>
                    <button onClick={() => setShowAddFunds(false)}>
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Amount
                      </label>
                      <input
                        type="number"
                        value={fundAmount}
                        onChange={(e) => setFundAmount(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:border-[#466cf4]"
                        placeholder="Enter amount"
                      />
                    </div>
                    <Button
                      onClick={handleAddFunds}
                      className="w-full bg-[#466cf4] hover:bg-[#3a5ce0]"
                    >
                      Add Funds
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case "track":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Track Your Order</h3>
              <div className="mb-6 flex flex-col md:flex-row md:items-center gap-4">
                <input
                  type="text"
                  placeholder="Enter Order ID"
                  className="border p-3 rounded-lg w-full md:w-1/2 focus:outline-none focus:border-[#466cf4]"
                />
                <Button className="bg-[#466cf4] hover:bg-[#3a5ce0] w-full md:w-auto">
                  Search
                </Button>
              </div>
              {/* Example Order Tracking Visualization */}
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  {/* Step 1 */}
                  <div className="flex flex-col items-center">
                    <div className="bg-[#466cf4] text-white rounded-full h-10 w-10 flex items-center justify-center font-bold">
                      1
                    </div>
                    <span className="mt-2 text-xs font-medium">
                      Order Placed
                    </span>
                  </div>
                  <div className="flex-1 h-1 bg-gray-200 mx-2" />
                  {/* Step 2 */}
                  <div className="flex flex-col items-center">
                    <div className="bg-blue-500 text-white rounded-full h-10 w-10 flex items-center justify-center font-bold">
                      2
                    </div>
                    <span className="mt-2 text-xs font-medium">Processing</span>
                  </div>
                  <div className="flex-1 h-1 bg-gray-200 mx-2" />
                  {/* Step 3 */}
                  <div className="flex flex-col items-center">
                    <div className="bg-green-500 text-white rounded-full h-10 w-10 flex items-center justify-center font-bold">
                      3
                    </div>
                    <span className="mt-2 text-xs font-medium">Shipped</span>
                  </div>
                  <div className="flex-1 h-1 bg-gray-200 mx-2" />
                  {/* Step 4 */}
                  <div className="flex flex-col items-center">
                    <div className="bg-green-700 text-white rounded-full h-10 w-10 flex items-center justify-center font-bold">
                      4
                    </div>
                    <span className="mt-2 text-xs font-medium">Delivered</span>
                  </div>
                </div>
              </div>
              {/* Example Order Details */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Order Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Order ID:</span>{" "}
                    <span className="font-medium">#123456</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Product:</span>{" "}
                    <span className="font-medium">iPhone 15 Pro</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Amount:</span>{" "}
                    <span className="font-medium">₦999</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Status:</span>{" "}
                    <span className="font-medium text-green-600">
                      Delivered
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Date:</span>{" "}
                    <span className="font-medium">2024-01-15</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold">Coming Soon</h3>
            <p className="text-gray-600 mt-2">
              This feature is under development.
            </p>
          </div>
        );
    }
  };

  if (!user)
    return <div className="p-8">Please log in to access your dashboard.</div>;
  return (
    <div className="min-h-screen bg-gray-100">
      <UserHeader user={user} onLogout={logout} />

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`bg-white shadow-sm w-64 min-h-screen transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 fixed md:relative z-40`}
        >
          <div className="p-4">
            <div className="flex items-center space-x-3 mb-6">
              <img
                src={userData.avatar || "/placeholder.svg"}
                alt="Profile"
                className="h-12 w-12 rounded-full"
              />
              <div>
                <h3 className="font-semibold">{userData.name}</h3>
                <p className="text-sm text-gray-600">{userData.email}</p>
              </div>
            </div>

            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                    activeTab === item.id
                      ? "bg-[#466cf4] text-white"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                {sidebarItems.find((item) => item.id === activeTab)?.label ||
                  "Dashboard"}
              </h1>
            </div>
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
