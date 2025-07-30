"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="bg-[#d0e6f5] py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Column - Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Shop Better <br />
              <span className="text-[#466cf4]">Access Loans</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-lg">
              Welcome to Shopella! Your credit-powered e-commerce platform. Access instant wallet loans and shop top
              products with the best deals.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-[#466cf4] hover:bg-[#3a5ce0] text-white px-8 py-3 text-lg font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
              >
                Get Loan
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#466cf4] text-[#466cf4] hover:bg-[#466cf4] hover:text-white px-8 py-3 text-lg font-semibold transition-all duration-200 hover:scale-105 active:scale-95 bg-transparent"
              >
                Visit Store
              </Button>
            </div>
          </div>

          {/* Right Column - Hero Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-lg">
              <Image
                src="https://hlfwfvupabrc8fwr.public.blob.vercel-storage.com/shopella-hero-img.png"
                alt="Shopella Hero Image"
                width={500}
                height={400}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
