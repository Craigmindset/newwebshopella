"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import WhyChooseUs from "@/components/WhyChooseUs";
import { Poppins } from "next/font/google";
import { ChevronDown } from "lucide-react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

export default function Access() {
  const [selectedProvider, setSelectedProvider] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [providerChosen, setProviderChosen] = useState(false);

  const loanProviders = [
    {
      name: "CreditDirect",
      logo: "https://hlfwfvupabrc8fwr.public.blob.vercel-storage.com/loan1.png",
      requirements: {
        creditScore: "600+",
        bulletPoints: [
          "You must be aged 22 to 55 years",
          "Be a Salary earning employee",
          "At least 6 Months salary pay slips",
          "Employment Letter",
        ],
        income: "N50,000/month minimum",
        loanAmount: "N50,000 - N500,000",
        processingTime: "24 months",
      },
      applyUrl: "/auth/signup",
    },
    {
      name: "FairMoney",
      logo: "https://hlfwfvupabrc8fwr.public.blob.vercel-storage.com/loan2.png",
      requirements: {
        creditScore: "650+",
        income: "N70,000/month minimum",
        loanAmount: "N30,000 - N400,000",
        processingTime: "18 months",
      },
      applyUrl: "/auth/signup",
    },
    {
      name: "Binatone Finance",
      logo: "https://hlfwfvupabrc8fwr.public.blob.vercel-storage.com/loans%20logos%20Jul%2031%2C%202025%2C%2005_10_20%20PM.png",
      requirements: {
        creditScore: "620+",
        income: "N60,000/month minimum",
        loanAmount: "N20,000 - N300,000",
        processingTime: "12 months",
      },
      applyUrl: "/auth/signup",
    },
    {
      name: "QuickCash",
      logo: "https://hlfwfvupabrc8fwr.public.blob.vercel-storage.com/placeholder-logo.png",
      requirements: {
        creditScore: "630+",
        income: "N55,000/month minimum",
        loanAmount: "N10,000 - N200,000",
        processingTime: "6 months",
      },
      applyUrl: "/auth/signup",
    },
  ];

  return (
    <>
      <Header />
      <section className="bg-white min-h-screen py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/background-img .jpg"
            alt="Shopella Hero Background"
            layout="fill"
            objectFit="cover"
            className="opacity-15"
            priority
          />
        </div>
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center ml-8 md:ml-16">
            {/* Left Side: Text */}
            <div>
              <div
                className="inline-flex items-center text-base font-semibold px-4 py-1 rounded-full bg-gray-100 text-gray-700 mb-4"
                style={{ fontFamily: poppins.style.fontFamily }}
              >
                <span className="mr-2">🚀</span> Customers Come First
              </div>
              <h1
                className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight mb-8 tracking-tight"
                style={{
                  fontFamily: poppins.style.fontFamily,
                  letterSpacing: "-0.01em",
                }}
              >
                Top Lenders <br />
                <span className="block mt-2">All in one Place</span>
              </h1>
              <p
                className="text-gray-700 text-base mb-10 tracking-tight"
                style={{
                  fontFamily: poppins.style.fontFamily,
                  letterSpacing: "-0.01em",
                }}
              >
                Whether you’re shopping for a new gadget, appliance or dealing
                with unexpected needs, we make borrowing simple and stress-free.
              </p>
              <div className="relative inline-block mb-10">
                <div className="flex items-center gap-2 mb-10">
                  <Button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="bg-[#1d3633] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#162a28] flex items-center gap-2"
                  >
                    {providerChosen
                      ? loanProviders[selectedProvider].name
                      : "Select Provider"}{" "}
                    <ChevronDown size={16} />
                  </Button>
                  {dropdownOpen && (
                    <div className="flex items-center gap-0 ml-2">
                      <div className="w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                        {loanProviders.map((provider, index) => (
                          <div
                            key={index}
                            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              setSelectedProvider(index);
                              setProviderChosen(true);
                              setDropdownOpen(false);
                            }}
                          >
                            {provider.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Side: Provider Card */}
            <div className="bg-[#e0f2fe] bg-opacity-80 rounded-2xl p-4 sm:p-6 shadow-xl w-full max-w-sm mx-auto">
              <div className="bg-white rounded-2xl p-6 space-y-1">
                <div className="flex justify-center mt-[-20px] mb-1">
                  <Image
                    src={loanProviders[selectedProvider].logo}
                    alt="provider logo"
                    width={200}
                    height={200}
                  />
                </div>
                <div className="space-y-1 pb-4 ">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Requirements
                  </h3>
                  <ul className="text-sm text-gray-700 list-disc list-inside">
                    {loanProviders[selectedProvider].name === "CreditDirect" &&
                      Array.isArray(
                        loanProviders[selectedProvider].requirements
                          .bulletPoints
                      ) &&
                      loanProviders[
                        selectedProvider
                      ].requirements.bulletPoints.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    <li>
                      Income:{" "}
                      {loanProviders[selectedProvider].requirements.income}
                    </li>
                  </ul>
                  <hr className="my-2 border-gray-300" />
                  {/* Required Document Section */}
                  <h3 className="text-lg font-semibold text-gray-900">
                    Required Document
                  </h3>
                  <ul className="text-sm text-gray-700 list-disc list-inside mb-12">
                    <li>
                      Valid government ID. (Intl Passport, Voter card, Driver's
                      License)
                    </li>
                    <li>BVN or NIN</li>
                    <li>Active Debit Card</li>
                  </ul>
                </div>
                <Button
                  className="w-full bg-[#466cf4] text-white font-bold py-3 mt-18 rounded-lg hover:bg-[#3556b2] "
                  onClick={() =>
                    (window.location.href =
                      loanProviders[selectedProvider].applyUrl)
                  }
                >
                  Apply Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
