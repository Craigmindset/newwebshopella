import React, { useState } from "react";

const loanProviders = [
  {
    name: "Provider A",
    image: "/brands/UK-FLAG.png",
    loans: ["Personal Loan", "Business Loan"],
    requirements: ["ID Card", "Proof of Income"],
  },
  {
    name: "Provider B",
    image: "/brands/Ghana-flag.png",
    loans: ["Car Loan", "Home Loan"],
    requirements: ["Passport", "Bank Statement"],
  },
  {
    name: "Provider C",
    image: "/brands/NGN-flag.png",
    loans: ["Education Loan"],
    requirements: ["Admission Letter", "Guarantor"],
  },
];

const loanImage = "/brands/LOAN-IMG.png";

export default function LoanRequest() {
  const [selectedProvider, setSelectedProvider] = useState(loanProviders[0]);

  return (
    <div className="flex flex-col md:flex-row min-h-[70vh] bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Left Column: Image & Provider Select */}
      <div className="relative w-full md:w-1/2 h-64 md:h-auto">
        <img
          src={loanImage}
          alt="Loan Request"
          className="object-cover w-full h-full"
        />
        {/* Overlay Select Button at Bottom */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
          <select
            className="bg-white text-[#466cf4] font-semibold px-4 py-2 rounded-lg shadow border border-gray-300"
            value={selectedProvider.name}
            onChange={(e) => {
              const provider = loanProviders.find(
                (p) => p.name === e.target.value
              );
              if (provider) setSelectedProvider(provider);
            }}
          >
            {loanProviders.map((provider) => (
              <option key={provider.name} value={provider.name}>
                {provider.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Right Column: Loans, Requirements, Apply */}
      <div className="w-full md:w-1/2 flex flex-col p-6 gap-6 justify-center">
        {/* Loans */}
        <div>
          <h2 className="text-xl font-bold text-[#466cf4] mb-2">Loans</h2>
          <div className="flex flex-col gap-2">
            {selectedProvider.loans.map((loan, idx) => (
              <div
                key={loan}
                className="py-2 border-b border-gray-200 last:border-b-0"
              >
                {loan}
              </div>
            ))}
          </div>
        </div>
        {/* Requirements */}
        <div>
          <h2 className="text-xl font-bold text-[#466cf4] mb-2">
            Requirements
          </h2>
          <div className="flex flex-col gap-2">
            {selectedProvider.requirements.map((req, idx) => (
              <div
                key={req}
                className="py-2 border-b border-gray-200 last:border-b-0"
              >
                {req}
              </div>
            ))}
          </div>
        </div>
        {/* Apply Button */}
        <button className="mt-4 bg-[#466cf4] text-white font-bold py-3 rounded-lg shadow hover:bg-[#3553b3] transition-all">
          Apply
        </button>
      </div>
    </div>
  );
}
