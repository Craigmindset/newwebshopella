"use client";
import React from "react";

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
  HelpCircle,
} from "lucide-react";
import MiniCart from "@/components/MiniCart";
import UserHeader from "@/components/UserHeader";
import Welcome from "@/components/Welcome";
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

// Mock loans data for 'My Loans' tab
const myLoans = [
  {
    id: 101,
    provider: "QuickLoan",
    amount: 3000,
    status: "Active",
    nextRepayment: "2024-08-15",
    outstanding: 1200,
    schedule: [
      { date: "2024-07-15", amount: 600, paid: true },
      { date: "2024-08-15", amount: 600, paid: false },
    ],
  },
  {
    id: 102,
    provider: "FastCredit",
    amount: 2000,
    status: "Completed",
    nextRepayment: null,
    outstanding: 0,
    schedule: [
      { date: "2024-06-10", amount: 1000, paid: true },
      { date: "2024-07-10", amount: 1000, paid: true },
    ],
  },
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
  // Contact Support Modal State
  const { user, logout } = useAuth();
  // Welcome state (client only)
  const [showWelcome, setShowWelcome] = useState(true);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const username = user?.name || userData.name || "User";
  // Determine if first time or repeat user
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");
      if (!hasSeenWelcome) {
        setIsFirstTime(true);
        localStorage.setItem("hasSeenWelcome", "true");
      } else {
        setIsFirstTime(false);
      }
    }
  }, []);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [supportForm, setSupportForm] = useState({ subject: "", message: "" });
  const [supportStatus, setSupportStatus] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [fundAmount, setFundAmount] = useState("");
  // Filter state for recent orders
  const [orderFilter, setOrderFilter] = useState({ date: "", product: "" });
  // Filter state for My Orders tab
  const [ordersFilter, setOrdersFilter] = useState({
    product: "",
    status: "",
    payment: "",
    dateFrom: "",
    dateTo: "",
  });

  // Edit Profile Modal State
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [editProfile, setEditProfile] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    avatar: userData.avatar,
    avatarFile: null,
  });
  const [editError, setEditError] = useState("");

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: User },
    { id: "orders", label: "My Orders", icon: ShoppingBag },
    { id: "loans", label: "Loan Requests", icon: CreditCard },
    { id: "myloans", label: "My Loans", icon: Bell }, // Changed icon
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
      case "overview": {
        // ...existing code for overview...
        const filteredOrders = recentOrders.filter((order) => {
          const matchesProduct = orderFilter.product
            ? order.product
                .toLowerCase()
                .includes(orderFilter.product.toLowerCase())
            : true;
          const matchesDate = orderFilter.date
            ? order.date === orderFilter.date
            : true;
          return matchesProduct && matchesDate;
        });
        return (
          <div className="space-y-6">
            {/* ...existing code for stats cards... */}
            {/* ...existing code for recent orders and filter... */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
              {/* Filter UI */}
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">
                    Filter by Product
                  </label>
                  <input
                    type="text"
                    value={orderFilter.product}
                    onChange={(e) =>
                      setOrderFilter((prev) => ({
                        ...prev,
                        product: e.target.value,
                      }))
                    }
                    placeholder="Enter product name"
                    className="border p-2 rounded-lg focus:outline-none focus:border-[#466cf4]"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">
                    Filter by Date
                  </label>
                  <input
                    type="date"
                    value={orderFilter.date}
                    onChange={(e) =>
                      setOrderFilter((prev) => ({
                        ...prev,
                        date: e.target.value,
                      }))
                    }
                    className="border p-2 rounded-lg focus:outline-none focus:border-[#466cf4]"
                  />
                </div>
              </div>
              <hr className="my-4 border-gray-200" />
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
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td
                          colSpan={4}
                          className="py-3 text-center text-gray-500"
                        >
                          No orders found.
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((order) => (
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
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      }
      case "orders": {
        // Modern My Orders tab: detailed transaction history with advanced filters
        // Demo: add payment method and orderId to recentOrders
        const orders = recentOrders.map((order, idx) => ({
          ...order,
          payment: idx % 2 === 0 ? "Card" : "Wallet",
          orderId: `ORD-${1000 + order.id}`,
        }));
        const filteredOrders = orders.filter((order) => {
          const matchesProduct = ordersFilter.product
            ? order.product
                .toLowerCase()
                .includes(ordersFilter.product.toLowerCase())
            : true;
          const matchesStatus = ordersFilter.status
            ? order.status === ordersFilter.status
            : true;
          const matchesPayment = ordersFilter.payment
            ? order.payment === ordersFilter.payment
            : true;
          const matchesDateFrom = ordersFilter.dateFrom
            ? order.date >= ordersFilter.dateFrom
            : true;
          const matchesDateTo = ordersFilter.dateTo
            ? order.date <= ordersFilter.dateTo
            : true;
          return (
            matchesProduct &&
            matchesStatus &&
            matchesPayment &&
            matchesDateFrom &&
            matchesDateTo
          );
        });
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">My Orders</h3>
              {/* Advanced Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">Product</label>
                  <input
                    type="text"
                    value={ordersFilter.product}
                    onChange={(e) =>
                      setOrdersFilter((prev) => ({
                        ...prev,
                        product: e.target.value,
                      }))
                    }
                    placeholder="Search product name"
                    className="border p-2 rounded-lg focus:outline-none focus:border-[#466cf4]"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">Status</label>
                  <select
                    value={ordersFilter.status}
                    onChange={(e) =>
                      setOrdersFilter((prev) => ({
                        ...prev,
                        status: e.target.value,
                      }))
                    }
                    className="border p-2 rounded-lg"
                  >
                    <option value="">All</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Processing">Processing</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">
                    Payment Method
                  </label>
                  <select
                    value={ordersFilter.payment}
                    onChange={(e) =>
                      setOrdersFilter((prev) => ({
                        ...prev,
                        payment: e.target.value,
                      }))
                    }
                    className="border p-2 rounded-lg"
                  >
                    <option value="">All</option>
                    <option value="Card">Card</option>
                    <option value="Wallet">Wallet</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">Date From</label>
                  <input
                    type="date"
                    value={ordersFilter.dateFrom}
                    onChange={(e) =>
                      setOrdersFilter((prev) => ({
                        ...prev,
                        dateFrom: e.target.value,
                      }))
                    }
                    className="border p-2 rounded-lg"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">Date To</label>
                  <input
                    type="date"
                    value={ordersFilter.dateTo}
                    onChange={(e) =>
                      setOrdersFilter((prev) => ({
                        ...prev,
                        dateTo: e.target.value,
                      }))
                    }
                    className="border p-2 rounded-lg"
                  />
                </div>
              </div>
              <hr className="my-4 border-gray-200" />
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Order ID</th>
                      <th className="text-left py-2">Product</th>
                      <th className="text-left py-2">Amount</th>
                      <th className="text-left py-2">Status</th>
                      <th className="text-left py-2">Payment</th>
                      <th className="text-left py-2">Date</th>
                      <th className="text-left py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td
                          colSpan={7}
                          className="py-3 text-center text-gray-500"
                        >
                          No orders found.
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((order) => (
                        <tr
                          key={order.orderId}
                          className="border-b hover:bg-gray-50 transition"
                        >
                          <td className="py-3 font-mono">{order.orderId}</td>
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
                          <td className="py-3 flex items-center gap-2">
                            {order.payment === "Card" ? (
                              <span className="inline-flex items-center gap-1">
                                <CreditCard className="h-4 w-4" /> Card
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1">
                                <Wallet className="h-4 w-4" /> Wallet
                              </span>
                            )}
                          </td>
                          <td className="py-3">{order.date}</td>
                          <td className="py-3 flex gap-2">
                            <Button size="sm" variant="outline">
                              Invoice
                            </Button>
                            <Button size="sm" variant="outline">
                              Track
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      }
      case "account": {
        // Simple UI for Account Settings
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">
                Profile Information
              </h3>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={userData.avatar}
                  alt="Avatar"
                  className="h-16 w-16 rounded-full"
                />
                <div>
                  <div className="font-semibold text-lg">{userData.name}</div>
                  <div className="text-gray-600">{userData.email}</div>
                  <div className="text-gray-600">{userData.phone}</div>
                </div>
              </div>
              <Button
                className="bg-[#466cf4] hover:bg-[#3a5ce0]"
                onClick={() => setShowEditProfile(true)}
              >
                Edit Profile
              </Button>
            </div>
            <div className="bg-yellow-50 rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Change Password</h3>
              <form className="space-y-4 max-w-md">
                <input
                  type="password"
                  placeholder="Current Password"
                  className="border p-2 rounded-lg w-full"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  className="border p-2 rounded-lg w-full"
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  className="border p-2 rounded-lg w-full"
                />
                <Button className="bg-[#466cf4] hover:bg-[#3a5ce0] w-full">
                  Update Password
                </Button>
              </form>
            </div>
            {/* Contact Support Section */}
            <div className="bg-green-50 rounded-lg shadow-md p-6 relative">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Contact Support</h3>
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => setShowSupportModal(true)}
                >
                  <HelpCircle className="h-5 w-5" />
                  Contact
                </Button>
              </div>
              <div className="text-gray-600 text-sm">
                Need help? Click the Contact button to reach support.
              </div>
            </div>

            {/* Contact Support Modal Popup */}
            {showSupportModal && (
              <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
                  <button
                    className="absolute top-4 right-4"
                    onClick={() => setShowSupportModal(false)}
                  >
                    <X className="h-6 w-6" />
                  </button>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-[#466cf4]" /> Contact
                    Support
                  </h3>
                  <form
                    className="space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!supportForm.subject || !supportForm.message) {
                        setSupportStatus("Please fill in all fields.");
                        return;
                      }
                      // Simulate send (API integration point)
                      setSupportStatus(
                        "Message sent! We'll get back to you soon."
                      );
                      setTimeout(() => {
                        setShowSupportModal(false);
                        setSupportStatus("");
                        setSupportForm({ subject: "", message: "" });
                      }, 1500);
                    }}
                  >
                    <input
                      type="text"
                      value={userData.name}
                      readOnly
                      className="border p-2 rounded-lg w-full bg-gray-100"
                      placeholder="Name"
                    />
                    <input
                      type="email"
                      value={userData.email}
                      readOnly
                      className="border p-2 rounded-lg w-full bg-gray-100"
                      placeholder="Email"
                    />
                    <input
                      type="text"
                      value={supportForm.subject}
                      onChange={(e) =>
                        setSupportForm((prev) => ({
                          ...prev,
                          subject: e.target.value,
                        }))
                      }
                      placeholder="Subject"
                      className="border p-2 rounded-lg w-full"
                    />
                    <textarea
                      value={supportForm.message}
                      onChange={(e) =>
                        setSupportForm((prev) => ({
                          ...prev,
                          message: e.target.value,
                        }))
                      }
                      placeholder="Your message..."
                      className="border p-2 rounded-lg w-full min-h-[100px]"
                    />
                    {supportStatus && (
                      <div className="text-sm text-center text-green-600">
                        {supportStatus}
                      </div>
                    )}
                    <Button
                      type="submit"
                      className="bg-[#466cf4] hover:bg-[#3a5ce0] w-full"
                    >
                      Send Message
                    </Button>
                  </form>
                </div>
              </div>
            )}

            {/* Edit Profile Modal Popup */}
            {showEditProfile && (
              <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
                  <button
                    className="absolute top-4 right-4"
                    onClick={() => setShowEditProfile(false)}
                  >
                    <X className="h-6 w-6" />
                  </button>
                  <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>
                  <form
                    className="space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!editProfile.name || !editProfile.email) {
                        setEditError("Name and Email are required.");
                        return;
                      }
                      // Simulate save (API integration point)
                      setShowEditProfile(false);
                      setEditError("");
                    }}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <img
                        src={editProfile.avatar}
                        alt="Avatar Preview"
                        className="h-16 w-16 rounded-full mb-2"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setEditProfile((prev) => ({
                              ...prev,
                              avatarFile: file,
                              avatar: URL.createObjectURL(file),
                            }));
                          }
                        }}
                        className="text-sm"
                      />
                    </div>
                    <input
                      type="text"
                      value={editProfile.name}
                      onChange={(e) =>
                        setEditProfile((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      placeholder="Name"
                      className="border p-2 rounded-lg w-full"
                    />
                    <input
                      type="email"
                      value={editProfile.email}
                      onChange={(e) =>
                        setEditProfile((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      placeholder="Email"
                      className="border p-2 rounded-lg w-full"
                    />
                    <input
                      type="text"
                      value={editProfile.phone}
                      onChange={(e) =>
                        setEditProfile((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      placeholder="Phone Number"
                      className="border p-2 rounded-lg w-full"
                    />
                    {editError && (
                      <div className="text-red-600 text-sm">{editError}</div>
                    )}
                    <div className="flex gap-2">
                      <Button
                        type="submit"
                        className="bg-[#466cf4] hover:bg-[#3a5ce0] w-full"
                      >
                        Save
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => setShowEditProfile(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        );
      }

      case "loans":
        // Loan Requests tab: application form, status tracker
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Apply for a Loan</h3>
              <form className="flex flex-col md:flex-row gap-4">
                <select className="border p-2 rounded-lg w-full md:w-1/3">
                  <option value="">Select Provider</option>
                  {loanProviders.map((provider) => (
                    <option key={provider.id} value={provider.name}>
                      {provider.name}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Amount"
                  className="border p-2 rounded-lg w-full md:w-1/3"
                />
                <select className="border p-2 rounded-lg w-full md:w-1/3">
                  <option value="">Repayment Period</option>
                  <option value="3">3 months</option>
                  <option value="6">6 months</option>
                  <option value="12">12 months</option>
                </select>
                <Button className="bg-[#466cf4] hover:bg-[#3a5ce0]">
                  Submit Application
                </Button>
              </form>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">
                Loan Application Status
              </h3>
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Provider</th>
                    <th className="text-left py-2">Amount</th>
                    <th className="text-left py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Demo: show mock status for submitted applications */}
                  <tr>
                    <td className="py-3">QuickLoan</td>
                    <td className="py-3">₦3,000</td>
                    <td className="py-3">
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                        Pending
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3">FastCredit</td>
                    <td className="py-3">₦2,000</td>
                    <td className="py-3">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        Approved
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      case "myloans":
        // My Loans tab: active loans, repayment schedule, history, repay button
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Active Loans</h3>
              {myLoans.filter((loan) => loan.status === "Active").length ===
              0 ? (
                <p className="text-gray-500">No active loans.</p>
              ) : (
                myLoans
                  .filter((loan) => loan.status === "Active")
                  .map((loan) => (
                    <div key={loan.id} className="mb-4 border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <span className="font-semibold">{loan.provider}</span>{" "}
                          &mdash; ₦{loan.amount}
                        </div>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                          Active
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        Outstanding: ₦{loan.outstanding}
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        Next Repayment: {loan.nextRepayment}
                      </div>
                      <Button className="bg-[#466cf4] hover:bg-[#3a5ce0]">
                        Repay Now
                      </Button>
                    </div>
                  ))
              )}
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Repayment Schedule</h3>
              {myLoans.filter((loan) => loan.status === "Active").length ===
              0 ? (
                <p className="text-gray-500">No repayment schedule.</p>
              ) : (
                myLoans
                  .filter((loan) => loan.status === "Active")
                  .map((loan) => (
                    <table key={loan.id} className="w-full mb-4">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Date</th>
                          <th className="text-left py-2">Amount</th>
                          <th className="text-left py-2">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loan.schedule.map((item, idx) => (
                          <tr key={idx} className="border-b">
                            <td className="py-3">{item.date}</td>
                            <td className="py-3">₦{item.amount}</td>
                            <td className="py-3">
                              {item.paid ? (
                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                                  Paid
                                </span>
                              ) : (
                                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs">
                                  Due
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ))
              )}
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Loan History</h3>
              {myLoans.length === 0 ? (
                <p className="text-gray-500">No loan history.</p>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Provider</th>
                      <th className="text-left py-2">Amount</th>
                      <th className="text-left py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myLoans.map((loan) => (
                      <tr key={loan.id} className="border-b">
                        <td className="py-3">{loan.provider}</td>
                        <td className="py-3">₦{loan.amount}</td>
                        <td className="py-3">
                          {loan.status === "Completed" ? (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                              Completed
                            </span>
                          ) : (
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                              Active
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
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

  if (showWelcome) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f9ff] px-4 py-12">
        <Welcome
          username={username}
          isFirstTime={isFirstTime}
          onContinue={(action) => {
            if (action === "dashboard") setShowWelcome(false);
            else if (action === "loan") window.location.href = "/getloans";
            else if (action === "store") window.location.href = "/store";
          }}
        />
      </div>
    );
  }

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
                <p className="text-xs text-gray-600">
                  {user?.email || userData.email}
                </p>
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
              <h1 className="text-lg font-bold text-gray-900">
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
