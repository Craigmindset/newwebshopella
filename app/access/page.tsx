"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { Poppins } from "next/font/google";
import Header from "@/components/Header";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const heroImage = {
  src: "https://hlfwfvupabrc8fwr.public.blob.vercel-storage.com/young-african-ladies-viewing-something-their-mobile-phones-while-carrying-shopping-bags.png",
  alt: "Shopella credit-powered",
};

export default function Access() {
  const [word, setWord] = useState("Smarter");
  useEffect(() => {
    const interval = setInterval(() => {
      setWord((prev) => (prev === "Smarter" ? "Better" : "Smarter"));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header />
      <section className="relative bg-[#d0e6f5] min-h-screen overflow-hidden">
        {/* Background image with opacity */}
        <div
          className="absolute inset-0 w-full h-full z-0"
          style={{
            backgroundImage: 'url("/background-img .jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.1,
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-4 lg:px-8 py-2 z-10">
          {/* Mobile: Image on top, then content below */}
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-12 items-stretch h-full min-h-[400px] lg:min-h-[600px]">
            <div className="block lg:hidden w-full">
              <div className="relative w-full h-[320px] sm:h-[400px]">
                <Image
                  src={heroImage.src}
                  alt={heroImage.alt}
                  fill
                  className="object-cover rounded-xl"
                  priority
                />
              </div>
            </div>
            <div className="space-y-4 ml-2 lg:ml-16 flex flex-col justify-center pt-2">
              <div className="space-y-1">
                <h1
                  className={`${poppins.className} text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight tracking-tighter text-center`}
                >
                  Wallet Credit<span className="text-red-500">!</span>
                </h1>
                <h1
                  className={`${poppins.className} text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 leading-tight tracking-tighter text-center`}
                >
                  When you need it, the most.
                </h1>
              </div>
              <p className="text-sm sm:text-base text-gray-700 leading-normal max-w-lg mb-1 text-center">
                Get your wallet backed up loan to shop your favourite brand at Shopella. Access to over N500,000 shopping credit to make your purchase and pay flexibly.
              </p>
              <div className="flex flex-row gap-2 items-center justify-center whitespace-nowrap">
                <Image src="https://hlfwfvupabrc8fwr.public.blob.vercel-storage.com/loan1.png" alt="Loan Logo 1" width={120} height={80} className="object-contain" />
                <Image src="https://hlfwfvupabrc8fwr.public.blob.vercel-storage.com/loan2.png" alt="Loan Logo 2" width={120} height={80} className="object-contain" />
                <Image src="https://hlfwfvupabrc8fwr.public.blob.vercel-storage.com/loans%20logos%20Jul%2031%2C%202025%2C%2005_10_20%20PM.png" alt="Loan Logo 3" width={120} height={80} className="object-contain" />
              </div>
              <div className="flex justify-center w-full mb-6">
                <a href="/auth/signup">
                  <Button size="lg" className="bg-[#466cf4] text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-[#3556b2] transition-all duration-200">
                    Sign Up
                  </Button>
                </a>
              </div>
            </div>
            {/* Desktop: Image on right */}
            <div className="hidden lg:block relative w-full h-[700px]">
              <Image
                src={heroImage.src}
                alt={heroImage.alt}
                fill
                className="object-cover rounded-xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}