"use client"


import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Check } from "lucide-react"
import Image from "next/image"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
export default function Component() {
  const [loanAmount, setLoanAmount] = useState([50000])
  const router = useRouter()

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Shop at Zero 
                  <span className="text-green-500">%</span>
                </h1>
              </div>

              <div className="space-y-4">
                <p className="text-gray-700">
                  Get your wallet backed loan with Shopella, and have your favorite brands delivered to you in minutes in nationwide), 
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-gray-700">Description write here!</span>
              </div>
            </div>

            {/* Right Content */}
            <div className="relative">
              {/* Pig Character (now Shopella image) */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="relative">
                  <Image
                    src="https://hlfwfvupabrc8fwr.public.blob.vercel-storage.com/ChatGPT%20Image%20Aug%201%2C%202025%2C%2012_42_04%20AM.png"
                    alt="Shopella branded character"
                    width={200}
                    height={250}
                    className="object-contain"
                  />
                  {/* Floating coins */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full opacity-80"></div>
                  <div className="absolute top-8 -left-6 w-6 h-6 bg-yellow-300 rounded-full opacity-60"></div>
                  <div className="absolute -bottom-2 right-8 w-7 h-7 bg-yellow-400 rounded-full opacity-70"></div>
                </div>
              </div>

              {/* Loan Details Card */}
              <Card className="ml-auto max-w-sm bg-white shadow-xl relative z-20">
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Get access to over Million wallet loan credit</h2>
                    <p className="text-sm text-gray-600 mb-1">Provided that the loan is repaid on time</p>
                    <button className="text-sm text-green-600 underline">Terms of action</button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Loan amount</span>
                        <span className="text-sm text-gray-400">50 000</span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900 mb-4">₦ {loanAmount[0].toLocaleString()}</div>
                      <div className="relative">
                        <Slider
                          value={loanAmount}
                          onValueChange={setLoanAmount}
                          max={1000000}
                          min={50000}
                          step={1000}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                          <span>50,000</span>
                          <span>1,000 000</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm text-gray-600">You will return:</div>
                        <div className="text-lg font-semibold text-gray-900">₦ 30.00</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">Rate</div>
                        <div className="text-lg font-semibold text-gray-900">0%</div>
                      </div>
                    </div>

                    <Button
                      className="w-full bg-green-500 hover:bg-green-600 active:opacity-80 text-white py-3 rounded-full text-lg font-semibold transition-opacity"
                      onClick={() => router.push("/auth/signup")}
                    >
                      Get a loan
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-16 text-center">
            <h3 className="text-xl text-gray-600"></h3>
          </div>
        </div>

        {/* Background decorative elements */}
        <div className="absolute top-20 right-20 w-4 h-4 bg-red-400 rounded-full opacity-60"></div>
        <div className="absolute bottom-40 left-20 w-6 h-6 bg-blue-400 rounded-full opacity-40"></div>
        <div className="absolute top-1/3 left-10 w-3 h-3 bg-yellow-400 rounded-full opacity-50"></div>
      </div>
      <Footer />
    </>
  )
}
