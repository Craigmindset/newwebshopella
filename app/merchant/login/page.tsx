"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, Mail, Lock, Store } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function MerchantLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // API integration point: POST /api/merchant/auth/login
    try {
      console.log("Merchant login attempt:", formData)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // Redirect to merchant dashboard after successful login
      window.location.href = "/merchant/dashboard"
    } catch (error) {
      console.error("Merchant login error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-green-600 p-3 rounded-full">
              <Store className="h-8 w-8 text-white" />
            </div>
          </div>
          <Link href="/" className="text-3xl font-bold text-green-600 mb-2 block">
            Shopella Merchant
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Merchant Portal</h1>
          <p className="text-gray-600">Sign in to your merchant account</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="pl-10 h-12 border-gray-300 focus:border-green-600 focus:ring-green-600"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleInputChange}
                className="pl-10 pr-10 h-12 border-gray-300 focus:border-green-600 focus:ring-green-600"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <Link href="/merchant/forgot-password" className="text-sm text-green-600 hover:text-green-700 font-medium">
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-semibold text-lg transition-all duration-200"
          >
            {isLoading ? "Signing In..." : "Sign In to Dashboard"}
          </Button>
        </form>

        {/* Merchant Registration Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            New merchant?{" "}
            <Link href="/merchant/register" className="text-green-600 hover:text-green-700 font-medium">
              Apply to sell
            </Link>
          </p>
        </div>

        {/* Back to Site Link */}
        <div className="mt-4 text-center">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
            ← Back to Shopella
          </Link>
        </div>
      </div>
    </div>
  )
}
