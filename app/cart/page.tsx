"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/ProductGrid"
import Header from "@/components/Header"

export default function CartPage() {
  const { cartItems, cartCount, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart()
  const [isLoading, setIsLoading] = useState(false)

  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, newQuantity)
  }

  const handleRemoveItem = (productId) => {
    removeFromCart(productId)
  }

  const handleProceedToCheckout = () => {
    setIsLoading(true)
    // API integration point: POST /api/checkout/create-session
    console.log("Proceeding to checkout with items:", cartItems)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to checkout page
      window.location.href = "/checkout"
    }, 1000)
  }

  if (cartCount === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link href="/">
              <Button className="bg-[#466cf4] hover:bg-[#3a5ce0] text-white px-8 py-3">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-[#466cf4] hover:text-[#3a5ce0]">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
            <span className="bg-[#466cf4] text-white px-3 py-1 rounded-full text-sm">
              {cartCount} {cartCount === 1 ? "item" : "items"}
            </span>
          </div>

          {cartCount > 0 && (
            <Button
              onClick={clearCart}
              variant="outline"
              className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent"
            >
              Clear Cart
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={120}
                      height={120}
                      className="w-24 h-24 md:w-30 md:h-30 object-cover rounded-lg"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-[#466cf4]">${item.price.toFixed(2)}</span>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center border rounded-lg">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 py-2 font-semibold min-w-[3rem] text-center">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Item Total */}
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="text-xl font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({cartCount} items)</span>
                  <span className="font-semibold">${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold">${(getCartTotal() * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-xl font-bold text-[#466cf4]">${(getCartTotal() * 1.08).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleProceedToCheckout}
                disabled={isLoading}
                className="w-full bg-[#466cf4] hover:bg-[#3a5ce0] text-white py-3 text-lg font-semibold"
              >
                {isLoading ? "Processing..." : "Proceed to Checkout"}
              </Button>

              <div className="mt-4 text-center">
                <Link href="/" className="text-[#466cf4] hover:text-[#3a5ce0] text-sm">
                  Continue Shopping
                </Link>
              </div>

              {/* Security Badge */}
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-800 font-medium">Secure Checkout Guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
