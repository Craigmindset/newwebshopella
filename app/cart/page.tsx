"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/ProductGrid"
import Header from "@/components/Header"

export default function CartPage() {
  const { cartItems, cartCount, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart() as import("@/components/ProductGrid").CartContextType
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    updateQuantity(productId, newQuantity)
  }

  const handleRemoveItem = (productId: number) => {
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
            <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
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
              <div key={item.id} className="bg-white rounded-lg shadow p-3">
                <div className="flex items-center space-x-3">
                  {/* Product Image */}
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={56}
                    height={56}
                    className="w-14 h-14 object-cover rounded"
                  />
                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-gray-900 truncate">{item.name}</h3>
                    <p className="text-xs text-gray-600 truncate">{item.description}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-base font-bold text-[#466cf4]">₦{item.price.toLocaleString()}</span>
                      <div className="flex items-center border rounded">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="px-1 py-0.5 hover:bg-gray-100 transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-2 py-0.5 font-semibold text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="px-1 py-0.5 hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="ml-2 p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  {/* Item Total */}
                  <div className="text-right min-w-[70px]">
                    <p className="text-xs text-gray-600">Total</p>
                    <p className="text-base font-bold text-gray-900">₦{(item.price * item.quantity).toLocaleString()}</p>
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
                  <span className="font-semibold">₦{getCartTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery</span>
                  <span className="font-semibold">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Vat</span>
                  <span className="font-semibold">₦{(getCartTotal() * 0.08).toLocaleString()}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-xl font-bold text-[#466cf4]">₦{(getCartTotal() * 1.08).toLocaleString()}</span>
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
