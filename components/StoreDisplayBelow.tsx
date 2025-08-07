import React, { useState } from "react";
import Image from "next/image";

export default function StoreDisplayBelow() {
  // Example images, replace with your own
  const leftDisplays = [
    {
      src: "/ad-section-img.jpg",
      alt: "Ad Section",
    },
    {
      src: "/credit-direct banner.png",
      alt: "Credit Direct Banner",
    },
  ];
  const rightDisplay = {
    src: "/ad2 banner.png",
    alt: "Ad2 Banner",
  };

  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = leftDisplays.length;

  // Auto-slide effect
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, [totalSlides]);

  const goToPrev = () =>
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  const goToNext = () =>
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));

  return (
    <div className="flex justify-center items-center mx-auto max-w-7xl px-4 bg-[#efefef] py-1">
      <div
        className="grid grid-cols-2 gap-2 w-full"
        style={{ gridTemplateColumns: "60% 40%" }}
      >
        {/* Left: Slider */}
        <div className="relative bg-white rounded-lg shadow flex items-center justify-center h-40 overflow-hidden">
          <Image
            src={leftDisplays[currentSlide].src}
            alt={leftDisplays[currentSlide].alt}
            width={300}
            height={120}
            className="object-cover w-full h-full transition-all duration-300"
          />
          {/* Slider navigation */}
          <button
            onClick={goToPrev}
            disabled={currentSlide === 0}
            className={`absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white rounded-full p-2 z-10 ${
              currentSlide === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            aria-label="Previous"
          >
            &#8592;
          </button>
          <button
            onClick={goToNext}
            disabled={currentSlide === totalSlides - 1}
            className={`absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white rounded-full p-2 z-10 ${
              currentSlide === totalSlides - 1
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            aria-label="Next"
          >
            &#8594;
          </button>
        </div>
        {/* Right: Static image */}
        <div className="bg-white rounded-lg shadow flex items-center justify-center h-40 overflow-hidden">
          <Image
            src={rightDisplay.src}
            alt={rightDisplay.alt}
            width={300}
            height={120}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
