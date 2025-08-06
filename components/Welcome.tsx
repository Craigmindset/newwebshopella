import React from "react";
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

const Welcome: React.FC<WelcomeProps> = ({ username, isFirstTime = true, onContinue }) => {
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
            className="flex flex-col items-center bg-blue-50 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border border-blue-200 min-h-[220px]"
          >
            {action.icon}
            <div className="font-bold text-blue-700 mb-1 text-lg text-center">
              {action.title}
            </div>
            <div className="text-sm text-gray-600 mb-4 text-center">
              {action.description}
            </div>
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-lg text-base font-semibold hover:bg-blue-700 transition-all shadow"
              onClick={() => onContinue(action.key as any)}
            >
              Continue
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Welcome;
