"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// Mock banner data - In real app, this would come from API
const banners = [
  {
    id: 1,
    title: "",
    image: "/credit-direct banner.png",
    link: "/deals/banner1",
  },
  {
    id: 2,
    title: "Banner 2",
    image: "/ad2 banner.png",
    link: "/deals/banner2",
  },
  {
    id: 3,
    title: "Banner 3",
    image: "/credit-direct banner.png",
    link: "/deals/banner3",
  },
];

export default function AdBanner() {
  const [currentBanner, setCurrentBanner] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000); // Change banner every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Banner Slider */}
        <div className="relative w-full h-[300px] overflow-hidden rounded-lg shadow-lg">
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                index === currentBanner
                  ? "translate-x-0"
                  : index < currentBanner
                  ? "-translate-x-full"
                  : "translate-x-full"
              }`}
            >
              <a
                href={banner.link}
                className="block w-full h-full relative group"
              >
                <Image
                  src={banner.image || "/placeholder.svg"}
                  alt={banner.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Only Apply for loan button overlay */}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <a
                    href="/apply-loan"
                    className="inline-block bg-green-600 text-white font-semibold px-5 py-2 rounded-lg shadow hover:bg-green-700 transition-all duration-200"
                  >
                    Apply for loan
                  </a>
                </div>
              </a>
            </div>
          ))}
        </div>

        {/* Banner Navigation Dots */}
        <div className="flex justify-center mt-6 space-x-3">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`w-4 h-4 rounded-full transition-all duration-200 ${
                index === currentBanner
                  ? "bg-[#466cf4] scale-110"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* Banner Navigation Arrows */}
        <button
          onClick={() =>
            setCurrentBanner(
              (prev) => (prev - 1 + banners.length) % banners.length
            )
          }
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={() =>
            setCurrentBanner((prev) => (prev + 1) % banners.length)
          }
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
