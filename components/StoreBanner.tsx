import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import {
  Smartphone,
  Laptop,
  Monitor,
  BatteryCharging,
  Headphones,
  Home,
  Heart,
  Watch,
  Gem,
} from "lucide-react";
import Image from "next/image";

const sliderImages = [
  {
    src: "/StoreBanner/8502320_192.jpg",
    alt: "Natural Cosmetics Banner",
    text: "Berries Natural Cosmetics - Refreshing and Moisturizing",
  },
  {
    src: "/StoreBanner/2149670637.jpg",
    alt: "Store Banner 2",
    text: "Discover our latest skincare collection",
  },
  {
    src: "/StoreBanner/2151074307.jpg",
    alt: "Store Banner 3",
    text: "Shop premium beauty products today",
  },
];

const sideBannerImages = [
  {
    src: "/StoreBanner/fairmoney-ad.jpg",
    alt: "FairMoney Ad Banner",
  },
  {
    src: "/StoreBanner/creditcredit-ad.jpg",
    alt: "CreditDirect Side Banner",
  },
  {
    src: "/StoreBanner/creditcredit-ad.jpg",
    alt: "CreditDirect Ad Banner",
  },
];

export default function StoreBanner() {
  // Map category names to their respective URLs
  const categoryLinks: Record<string, string> = {
    "Phones and Tablets": "/store/phones-tablets",
    Computing: "/store/computing",
    Electronics: "/store/electronics",
    Generators: "/store/generators",
    Accessories: "/store/accessories",
    "Home & Kitchen": "/store/home-&-kitchen",
    Lifestyle: "/store/lifestyle",
    Watches: "/store/watches",
    "Premium Devices": "/store/premium-devices",
  };

  const handleCategoryClick = (catName: string) => {
    const url = categoryLinks[catName];
    if (url) {
      window.location.href = url;
    }
  };
  const [showBrands, setShowBrands] = useState(false);
  const [current, setCurrent] = useState(0);
  const [sideCurrent, setSideCurrent] = useState(0);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliderImages.length);
      setSideCurrent((prev) => (prev + 1) % sideBannerImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () =>
    setCurrent((prev) => (prev + 1) % sliderImages.length);
  const prevSlide = () =>
    setCurrent(
      (prev) => (prev - 1 + sliderImages.length) % sliderImages.length
    );
  const nextSideSlide = () =>
    setSideCurrent((prev) => (prev + 1) % sideBannerImages.length);
  const prevSideSlide = () =>
    setSideCurrent(
      (prev) => (prev - 1 + sideBannerImages.length) % sideBannerImages.length
    );

  const categories = [
    {
      name: "Phones and Tablets",
      icon: <Smartphone className="h-4 w-4 text-black" />,
    },
    { name: "Computing", icon: <Laptop className="h-4 w-4 text-black" /> },
    {
      name: "Electronics",
      icon: <Monitor className="h-4 w-4 text-black" />,
    },
    {
      name: "Generators",
      icon: <BatteryCharging className="h-4 w-4 text-black" />,
    },
    {
      name: "Accessories",
      icon: <Headphones className="h-4 w-4 text-black" />,
    },
    {
      name: "Home & Kitchen",
      icon: <Home className="h-4 w-4 text-black" />,
    },
    { name: "Lifestyle", icon: <Heart className="h-4 w-4 text-black" /> },
    { name: "Watches", icon: <Watch className="h-4 w-4 text-black" /> },
    {
      name: "Premium Devices",
      icon: <Gem className="h-4 w-4 text-black" />,
    },
  ];

  return (
    <div className="flex w-full max-w-7xl mx-auto my-0 py-6 gap-4 px-4 justify-center bg-[#efefef]">
      {/* Categories Column */}
      <div className="hidden md:flex flex-col w-[15%] min-w-[120px] bg-white rounded-lg shadow p-4 gap-2">
        <h3 className="text-xs font-bold text-[#466cf4] mb-2 uppercase tracking-wide">
          Categories
        </h3>
        <ul className="space-y-2">
          {categories.map((cat, idx) => (
            <React.Fragment key={cat.name}>
              <li
                className="flex items-center gap-3 text-xs text-black hover:text-[#466cf4] cursor-pointer ml-2"
                onClick={() => handleCategoryClick(cat.name)}
              >
                {React.cloneElement(cat.icon, { width: 36, height: 36 })}
                <span className="font-medium">{cat.name}</span>
              </li>
              {cat.name === "Premium Devices" && (
                <>
                  <hr className="my-3 border-t border-gray-200" />
                  <div
                    className="flex items-center gap-2 text-xs font-bold text-[#466cf4] mb-2 mt-1 uppercase tracking-wide cursor-pointer select-none relative"
                    onClick={() => setShowBrands((prev) => !prev)}
                  >
                    Shop Brands
                    <Plus
                      className={`h-4 w-4 transition-transform ${
                        showBrands ? "rotate-45" : "rotate-0"
                      }`}
                    />
                  </div>
                </>
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>
      {/* Main Banner Column */}
      <div className="w-full md:w-[65%] bg-[#050f1f] rounded-lg relative overflow-hidden flex flex-col justify-center items-center min-h-[340px]">
        <div className="relative w-full h-full min-h-[340px] flex items-center justify-center">
          <Image
            src={sliderImages[current].src}
            alt={sliderImages[current].alt}
            fill
            className="object-cover w-full h-full"
            sizes="(max-width: 768px) 100vw, 60vw"
          />
          <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-white px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center drop-shadow-lg">
              {sliderImages[current].text}
            </h2>
            <button
              className="bg-[#466cf4] hover:bg-[#2746a3] text-white text-sm font-semibold px-5 py-2 rounded-full shadow transition-all duration-200"
              style={{ minWidth: 120 }}
            >
              Shop Now
            </button>
          </div>
          {/* Navigation Buttons */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:bg-white"
            onClick={prevSlide}
            aria-label="Previous Slide"
          >
            &#8592;
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:bg-white"
            onClick={nextSlide}
            aria-label="Next Slide"
          >
            &#8594;
          </button>
        </div>
      </div>
      {/* Side Banner Column */}
      <div className="w-full md:w-[20%] bg-[#466cf4] rounded-lg flex flex-col justify-center items-center text-white p-0 relative overflow-hidden min-h-[340px]">
        <div className="relative w-full h-full min-h-[340px] flex items-center justify-center">
          <Image
            src={sideBannerImages[sideCurrent].src}
            alt={sideBannerImages[sideCurrent].alt}
            fill
            className="object-cover w-full h-full rounded-lg"
            sizes="(max-width: 868px) 100vw, 20vw"
          />
          <div className="absolute inset-x-0 bottom-6 flex items-end justify-center">
            <button
              className="bg-[#2b0822] hover:bg-[#2746a3] text-white text-sm font-semibold px-5 py-2 shadow transition-all duration-200"
              style={{ minWidth: 100 }}
            >
              Get loan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
