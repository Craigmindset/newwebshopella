"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const heroImage = {
  src: "https://hlfwfvupabrc8fwr.public.blob.vercel-storage.com/shopella-hero-img.png",
  alt: "Shopella Hero Section",
};

export default function HeroSection() {
  const [word, setWord] = useState("Smarter");
  useEffect(() => {
    const interval = setInterval(() => {
      setWord((prev) => (prev === "Smarter" ? "Better" : "Smarter"));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="relative bg-[#d0e6f5] min-h-[700px] overflow-hidden">
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
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch h-full min-h-[600px]">
            {/* Left Column - Content */}
            <div className="space-y-6 ml-14 lg:ml-16 flex flex-col justify-center pt-4">
             

              <div className="space-y-2">
                <h1
                  className={`${poppins.className} text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight tracking-tighter`}
                >
                  Shop{' '}
                  <span
                    className={`transition-all duration-500 inline-block ${word === 'Better' ? 'text-[#466cf4]' : 'text-red-600'}`}
                  >
                    {word}
                  </span>
                </h1>
                <h1
                  className={`${poppins.className} text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight tracking-tighter`}
                >
                  Access Loans
                </h1>
              </div>

              <p className="text-xm text-gray-700 leading-normal max-w-lg">
               welcome to shopella! Your credit-powered e-commerce platform. Access instant wallet loans and shop top products with the best deal.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  className="bg-green-900 hover:bg-gray-800 shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200"
                  onClick={() => window.location.href = "/getloans"}
                >
                  Get Loans
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200 bg-transparent"
                >
                  Visit Store
                </Button>
              </div>
            </div>

            {/* Right Column - Image aligned bottom */}
            <div className="relative w-full h-full min-h-[500px] flex items-end justify-center">
              <Image
                src={heroImage.src}
                alt={heroImage.alt}
                fill
                className="object-contain object-bottom"
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}