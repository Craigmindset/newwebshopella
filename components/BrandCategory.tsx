"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

// Mock brand data - In real app, this would come from API
const brands = [
  { id: 1, name: "Apple", logo: "/placeholder.svg?height=80&width=120", url: "/brands/apple" },
  { id: 2, name: "Samsung", logo: "/placeholder.svg?height=80&width=120", url: "/brands/samsung" },
  { id: 3, name: "Nike", logo: "/placeholder.svg?height=80&width=120", url: "/brands/nike" },
  { id: 4, name: "Adidas", logo: "/placeholder.svg?height=80&width=120", url: "/brands/adidas" },
  { id: 5, name: "Sony", logo: "/placeholder.svg?height=80&width=120", url: "/brands/sony" },
  { id: 6, name: "LG", logo: "/placeholder.svg?height=80&width=120", url: "/brands/lg" },
  { id: 7, name: "HP", logo: "/placeholder.svg?height=80&width=120", url: "/brands/hp" },
  { id: 8, name: "Dell", logo: "/placeholder.svg?height=80&width=120", url: "/brands/dell" },
]

export default function BrandCategory() {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-sliding functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 5 >= brands.length ? 0 : prevIndex + 1))
    }, 3000) // Slide every 3 seconds

    return () => clearInterval(interval)
  }, [])

  // Get visible brands (5 per slide)
  const getVisibleBrands = () => {
    const visible = []
    for (let i = 0; i < 5; i++) {
      const index = (currentIndex + i) % brands.length
      visible.push(brands[index])
    }
    return visible
  }

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Shop Brands</h2>
          <div className="w-24 h-1 bg-[#466cf4] mx-auto"></div>
        </div>

        {/* Brand Carousel */}
        <div className="relative overflow-hidden">
          <div className="flex transition-transform duration-500 ease-in-out">
            {getVisibleBrands().map((brand) => (
              <div key={brand.id} className="flex-shrink-0 w-1/5 px-4">
                <Link href={brand.url} className="block group">
                  <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                    <Image
                      src={brand.logo || "/placeholder.svg"}
                      alt={`${brand.name} logo`}
                      width={120}
                      height={80}
                      className="w-full h-20 object-contain mx-auto"
                    />
                    <p className="text-center mt-3 font-medium text-gray-700 group-hover:text-[#466cf4] transition-colors">
                      {brand.name}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Responsive Grid for smaller screens */}
        <div className="md:hidden grid grid-cols-2 gap-4 mt-8">
          {brands.slice(0, 6).map((brand) => (
            <Link key={brand.id} href={brand.url} className="block group">
              <div className="bg-gray-50 rounded-lg p-4 hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <Image
                  src={brand.logo || "/placeholder.svg"}
                  alt={`${brand.name} logo`}
                  width={120}
                  height={80}
                  className="w-full h-16 object-contain mx-auto"
                />
                <p className="text-center mt-2 font-medium text-gray-700 group-hover:text-[#466cf4] transition-colors text-sm">
                  {brand.name}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Carousel Indicators */}
        <div className="hidden md:flex justify-center mt-6 space-x-2">
          {Array.from({ length: Math.ceil(brands.length / 5) }).map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                Math.floor(currentIndex / 5) === index ? "bg-[#466cf4]" : "bg-gray-300"
              }`}
              onClick={() => setCurrentIndex(index * 5)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
