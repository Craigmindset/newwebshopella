"use client";

import Image from "next/image";

const brands = [
  { id: 1, name: "Brand 1", logo: "/brands/brand logo1 (1).png" },
  { id: 2, name: "Brand 2", logo: "/brands/brand logo1 (2).png" },
  { id: 3, name: "Brand 3", logo: "/brands/brand logo1 (3).png" },
  { id: 4, name: "Brand 4", logo: "/brands/brand logo1 (4).png" },
  { id: 5, name: "Hisense", logo: "/brands/hisense.png" },
  { id: 6, name: "Itel", logo: "/brands/itel logo.png" },
  { id: 7, name: "Lenovo", logo: "/brands/Lenovo logo.png" },
  { id: 8, name: "LG", logo: "/brands/lg.png" },
  { id: 9, name: "Polystar", logo: "/brands/polystar.jpeg" },
  { id: 10, name: "Samsung", logo: "/brands/samsung.png" },

  { id: 12, name: "TCL", logo: "/brands/TCL logo.png" },
  { id: 13, name: "Techno", logo: "/brands/techno.png" },
];

import React, { useRef, useEffect, useState } from "react";

export default function CategorySection() {
  const [startIdx, setStartIdx] = useState(0);
  const visibleCount = 7;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setStartIdx((prev) => (prev + 1) % brands.length);
    }, 3000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Get the 6 visible brands, looping if needed
  const visibleBrands = Array.from(
    { length: visibleCount },
    (_, i) => brands[(startIdx + i) % brands.length]
  );

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Shop by Brands
        </h2>
        <div className="flex gap-6 justify-center items-center overflow-hidden">
          {visibleBrands.map((brand) => (
            <a
              key={brand.id}
              href="#"
              className="flex items-center justify-center cursor-pointer group"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center">
                <Image
                  src={brand.logo || "/placeholder.svg"}
                  alt={`${brand.name} logo`}
                  width={70}
                  height={70}
                  className="object-contain max-w-full max-h-full transition-all duration-300"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
