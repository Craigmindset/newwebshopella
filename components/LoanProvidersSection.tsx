import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const providers = [
  {
    name: "CreditDirect",
    logo: "https://hlfwfvupabrc8fwr.public.blob.vercel-storage.com/loan1.png",
    description: "Fast, flexible loans for all your shopping needs.",
    highlights: ["Up to N500,000", "Quick approval", "Flexible repayment"],
    requirements: {
      creditScore: "600+",
      income: "N50,000/month minimum",
      loanAmount: "N50,000 - N500,000",
      interestRate: "2.5% - 4.5% per month",
      processingTime: "24 hours",
    },
    applyUrl: "/auth/signup",
  },
  {
    name: "FairMoney",
    logo: "https://hlfwfvupabrc8fwr.public.blob.vercel-storage.com/loan2.png",
    description: "Instant wallet loans for top brands.",
    highlights: ["No collateral", "Instant funding", "Low rates"],
    requirements: {
      creditScore: "650+",
      income: "N70,000/month minimum",
      loanAmount: "N30,000 - N400,000",
      interestRate: "2% - 3.5% per month",
      processingTime: "Instant",
    },
    applyUrl: "/auth/signup",
  },
  {
    name: "Binatone Finance",
    logo: "https://hlfwfvupabrc8fwr.public.blob.vercel-storage.com/loans%20logos%20Jul%2031%2C%202025%2C%2005_10_20%20PM.png",
    description: "Shop top appliances with easy credit.",
    highlights: ["Appliance loans", "Fast processing", "Trusted brands"],
    requirements: {
      creditScore: "620+",
      income: "N60,000/month minimum",
      loanAmount: "N20,000 - N300,000",
      interestRate: "3% - 5% per month",
      processingTime: "48 hours",
    },
    applyUrl: "/auth/signup",
  },
];

export default function LoanProvidersSection() {
  const [selected, setSelected] = useState<number>(0);
  const [showDetails, setShowDetails] = useState(false);
  const provider = providers[selected];
  return (
    <section className="py-10 px-4 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#466cf4]">
        Loan Providers
      </h2>
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col sm:flex-row items-center gap-8">
        <div className="w-full sm:w-1/2">
          <label
            htmlFor="provider-select"
            className="block mb-2 text-gray-700 font-medium"
          >
            Choose a provider:
          </label>
          <select
            id="provider-select"
            value={selected}
            onChange={(e) => {
              setSelected(Number(e.target.value));
              setShowDetails(false);
            }}
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#466cf4] focus:outline-none text-gray-900 bg-[#f9fafb]"
          >
            {providers.map((p, idx) => (
              <option key={p.name} value={idx}>
                {p.name}
              </option>
            ))}
          </select>
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {provider.name}
            </h3>
            <p className="text-gray-700 mb-2">{provider.description}</p>
            <ul className="flex flex-wrap gap-2 mb-4">
              {provider.highlights.map((h) => (
                <li
                  key={h}
                  className="bg-[#f3f6fa] text-[#466cf4] px-3 py-1 rounded-full text-xs font-medium shadow-sm"
                >
                  {h}
                </li>
              ))}
            </ul>
            {!showDetails && (
              <Button
                size="lg"
                className="w-full bg-[#466cf4] text-white font-bold rounded-lg shadow-lg hover:bg-[#3556b2] transition-all duration-200"
                onClick={() => setShowDetails(true)}
              >
                View Details
              </Button>
            )}
          </div>
        </div>
        <div className="w-full sm:w-1/2 flex flex-col items-center">
          <Image
            src={provider.logo}
            alt={provider.name + " logo"}
            width={120}
            height={120}
            className="object-contain mb-4"
          />
          {showDetails && (
            <div className="w-full animate-fade-in">
              <div className="bg-[#f9fafb] rounded-lg p-4 mb-4 border border-gray-200">
                <h4 className="font-bold text-gray-800 mb-2">Requirements</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>
                    <span className="font-medium">Minimum Credit Score:</span>{" "}
                    {provider.requirements.creditScore}
                  </li>
                  <li>
                    <span className="font-medium">Income Requirement:</span>{" "}
                    {provider.requirements.income}
                  </li>
                  <li>
                    <span className="font-medium">Interest Rates:</span>{" "}
                    {provider.requirements.interestRate}
                  </li>
                </ul>
                {/* Stack Maximum Loan and Maximum Repayment Time vertically */}
                <div className="mt-4">
                  <div className="bg-[#eaf2fb] rounded-lg p-3 w-full mb-2">
                    <span className="font-medium text-gray-800">
                      Maximum Loan:
                    </span>{" "}
                    <span className="text-[#466cf4] font-bold">
                      {provider.requirements.loanAmount}
                    </span>
                  </div>
                  <div className="bg-[#eaf2fb] rounded-lg w-full p-3">
                    <span className="font-medium text-gray-800">
                      Maximum Repayment Time:
                    </span>{" "}
                    <span className="text-[#466cf4] font-bold">
                      {provider.requirements.processingTime}
                    </span>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="mt-4 bg-gray-200 text-gray-900 hover:bg-gray-300 rounded shadow"
                  onClick={async () => {
                    const text = `Minimum Credit Score: ${provider.requirements.creditScore}\nIncome Requirement: ${provider.requirements.income}\nLoan Amounts: ${provider.requirements.loanAmount}\nInterest Rates: ${provider.requirements.interestRate}\nProcessing Time: ${provider.requirements.processingTime}`;
                    if (typeof window !== "undefined" && navigator.clipboard) {
                      try {
                        await navigator.clipboard.writeText(text);
                        alert("Requirements copied to clipboard!");
                      } catch {
                        alert("Clipboard is not supported in this browser.");
                      }
                    } else {
                      alert("Clipboard is not supported in this browser.");
                    }
                  }}
                >
                  Copy Requirements
                </Button>
              </div>
              <Button
                size="lg"
                className="w-full bg-[#466cf4] text-white font-bold rounded-lg shadow-lg hover:bg-[#3556b2] transition-all duration-200"
                onClick={() => (window.location.href = provider.applyUrl)}
              >
                Apply Now
              </Button>
              <button
                className="mt-3 w-full text-sm text-[#466cf4] hover:underline"
                onClick={() => setShowDetails(false)}
              >
                Collapse
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
