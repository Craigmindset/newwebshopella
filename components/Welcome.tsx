import React, { useState } from "react";
import { User, CreditCard, ShoppingBag, LayoutDashboard } from "lucide-react";

interface WelcomeProps {
  username: string;
  isFirstTime?: boolean;
  onContinue: (action: "dashboard" | "loan" | "store") => void;
}

const actions = [
  {
    key: "dashboard",
    title: "Dashboard",
    description: "View your account overview, activity, and settings.",
    icon: <LayoutDashboard className="w-8 h-8 text-blue-600 mb-2" />,
  },
  {
    key: "loan",
    title: "Access Loan",
    description: "Apply for a new loan or check your loan status.",
    icon: <CreditCard className="w-8 h-8 text-blue-600 mb-2" />,
  },
  {
    key: "store",
    title: "Visit Store",
    description: "Browse and shop products with your credit.",
    icon: <ShoppingBag className="w-8 h-8 text-blue-600 mb-2" />,
  },
];

const Welcome: React.FC<WelcomeProps> = ({
  username,
  isFirstTime = true,
  onContinue,
}) => {
  // Modal state
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [bvn, setBvn] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Example prefilled user data (replace with real props/data)
  const userData = {
    name: username,
    email: "user@email.com",
    phone: "+2348012345678",
  };

  // Only use onContinue for dashboard and store

  // Handle BVN confirm
  const handleConfirmBVN = () => {
    if (bvn.length !== 11 || !/^[0-9]+$/.test(bvn)) {
      setToast({
        type: "error",
        message: "Please enter a valid 11-digit BVN.",
      });
      return;
    }
    setLoading(true);
    setToast(null);
    // Simulate BVN validation
    setTimeout(() => {
      if (bvn === "12345678901") {
        setLoading(false);
        setShowWalletModal(false);
        setBvn("");
        setToast({ type: "success", message: "Wallet created successfully!" });
        // Show toast for 1.5s, then route to wallet section
        setTimeout(() => {
          setToast(null);
          onContinue("dashboard"); // Use dashboard or update as needed
        }, 1500);
      } else {
        setLoading(false);
        setToast({
          type: "error",
          message: "BVN mismatch",
        });
      }
    }, 1500);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center animate-fadeIn relative overflow-hidden">
      {/* Hero Illustration or Lottie Placeholder */}
      <div className="w-20 h-20 mb-4 flex items-center justify-center rounded-full bg-gradient-to-tr from-blue-100 to-blue-300 shadow-lg">
        <User className="w-12 h-12 text-blue-500" />
      </div>
      <h2 className="text-2xl font-bold mb-1 text-blue-700 text-center drop-shadow-sm">
        {isFirstTime ? `Welcome, ${username}!` : `Welcome Back, ${username}!`}
      </h2>
      <div className="text-base text-gray-700 text-center mb-1">
        We're excited to have you on Shopella.
      </div>
      <div className="text-lg font-semibold mb-8 text-center text-blue-700">
        What would you like to do next?
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-2">
        {actions.map((action) => (
          <div
            key={action.key}
            className="flex flex-col items-center bg-blue-50 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border border-blue-200 min-h-[220px] h-full"
            style={{ minHeight: 240 }}
          >
            {action.icon}
            <div className="font-bold text-blue-700 mb-1 text-lg text-center">
              {action.title}
            </div>
            <div className="text-sm text-gray-600 mb-4 text-center">
              {action.description}
            </div>
            <div className="flex-1" />
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-lg text-base font-semibold hover:bg-blue-700 transition-all shadow w-full mt-auto"
              onClick={() => {
                if (action.key === "loan") {
                  setShowWalletModal(true);
                } else if (
                  action.key === "dashboard" ||
                  action.key === "store"
                ) {
                  onContinue(action.key as any);
                }
              }}
            >
              Continue
            </button>
          </div>
        ))}
      </div>
      {/* Quick Tip Section */}
      <div className="w-full mt-6 bg-blue-100 rounded-xl p-4 flex items-center gap-3 shadow">
        <span className="bg-blue-600 text-white rounded-full px-3 py-1 text-xs font-bold">
          Quick Tip
        </span>
        <span className="text-blue-700 text-sm">
          You can shop with your credit instantly, or access your dashboard to
          manage your account and loans. Explore all features for the best
          experience!
        </span>
      </div>

      {/* Wallet Modal */}
      {showWalletModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative animate-fadeIn">
            <h3 className="text-xl font-bold text-blue-700 mb-2 text-center">
              Create Wallet Account
            </h3>
            <p className="text-sm text-gray-600 mb-4 text-center">
              Enter your BVN to verify your identity. Your details are prefilled
              for convenience.
            </p>
            <form className="flex flex-col gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={userData.name}
                  disabled
                  className="w-full border rounded-lg px-3 py-2 bg-gray-100 text-gray-700"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={userData.email}
                  disabled
                  className="w-full border rounded-lg px-3 py-2 bg-gray-100 text-gray-700"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Phone
                </label>
                <input
                  type="text"
                  value={userData.phone}
                  disabled
                  className="w-full border rounded-lg px-3 py-2 bg-gray-100 text-gray-700"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">BVN</label>
                <input
                  type="text"
                  value={bvn}
                  onChange={(e) =>
                    setBvn(e.target.value.replace(/[^0-9]/g, "").slice(0, 11))
                  }
                  placeholder="Enter your 11-digit BVN"
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                  maxLength={11}
                  disabled={loading}
                />
              </div>
              <button
                type="button"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow mt-2"
                onClick={handleConfirmBVN}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="loader border-t-2 border-blue-200 rounded-full w-4 h-4 animate-spin"></span>{" "}
                    Confirming...
                  </span>
                ) : (
                  "Confirm"
                )}
              </button>
              <button
                type="button"
                className="text-blue-600 mt-2 underline text-xs"
                onClick={() => {
                  setShowWalletModal(false);
                  setBvn("");
                  setToast(null);
                }}
                disabled={loading}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Main Toast Message (after modal closes) */}
      {toast && !showWalletModal && (
        <div
          className={`fixed top-8 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-lg font-semibold text-center text-lg ${
            toast.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default Welcome;
