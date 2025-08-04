"use client";

import { ShieldCheck, Truck, BadgeCheck, Coins } from "lucide-react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
});

const features = [
  {
    icon: <Coins size={40} className="text-yellow-500" />,
    title: "Flexible Payment Options",
    description:
      "Buy outright or use our Wallet Loan and Buy Now, Pay Later options to shop with ease, even when cash is tight. Pay in ways that work for you.",
    bgColor: "bg-purple-100 border-purple-300",
  },
  {
    icon: <Truck size={40} className="text-orange-500" />,
    title: "Fast & Reliable Delivery",
    description:
      "Your orders are delivered quickly and securely, right to your doorstep and Nation Wide.",
    bgColor: "bg-green-100 border-green-300",
  },
  {
    icon: <ShieldCheck size={40} className="text-red-500" />,
    title: "Safe & Secure Transactions",
    description:
      "Your data and payments are protected with bank-level security and encryption. Shop with total peace of mind.",
    bgColor: "bg-orange-100 border-orange-300",
  },
  {
    icon: <BadgeCheck size={40} className="text-blue-500" />,
    title: "Trusted Brands, Quality Products",
    description:
      "From smartphones to home appliances, Shopella only features authentic, top-rated products from brands you trust.",
    bgColor: "bg-pink-100 border-pink-300",
  },
];

export default function WhyChooseUs() {
  return (
    <>
      <section
        className="relative py-16 px-4 md:px-8 lg:px-16"
        style={{
          backgroundImage: "url(/background-img.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-white/80 pointer-events-none" />
        <div className="relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900">
              Why choose us?
            </h2>
            <div className="h-6" />
            <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
              Shopella isn’t just another online store. We’re your trusted
              shopping partner. Here’s why thousands choose us every day:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className={`rounded-xl p-6 border ${feature.bgColor} shadow-sm transition-transform hover:scale-105`}
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-white rounded-full p-4 shadow">
                    {feature.icon}
                  </div>
                </div>
                <h3
                  className="font-semibold text-[16px] text-gray-800 mb-2 text-center"
                  style={{
                    fontFamily: poppins.style.fontFamily,
                    letterSpacing: "-0.04em",
                  }}
                >
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-700 text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
