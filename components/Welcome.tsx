import React from "react";

interface WelcomeProps {
  username: string;
  onContinue: (action: "dashboard" | "loan" | "store") => void;
}

const actions = [
  {
    key: "dashboard",
    title: "Dashboard",
    description: "View your account overview, activity, and settings.",
  },
  {
    key: "loan",
    title: "Access Loan",
    description: "Apply for a new loan or check your loan status.",
  },
  {
    key: "store",
    title: "Visit Store",
    description: "Browse and shop products with your credit.",
  },
];

const Welcome: React.FC<WelcomeProps> = ({ username, onContinue }) => {
  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center animate-fadeIn">
      <h2 className="text-2xl font-bold mb-2">Hi {username}!</h2>
      <div className="text-lg font-semibold mb-6 text-center">What would you like to do?</div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
        {actions.map((action) => (
          <div
            key={action.key}
            className="flex flex-col items-center bg-blue-50 rounded-xl p-4 shadow hover:shadow-lg transition-all border border-blue-100"
          >
            <div className="font-bold text-blue-700 mb-2 text-center">{action.title}</div>
            <div className="text-xs text-gray-600 mb-4 text-center">{action.description}</div>
            <button
              className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm font-semibold hover:bg-blue-700 transition-all"
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
