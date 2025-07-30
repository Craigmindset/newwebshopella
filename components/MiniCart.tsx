"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, X, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "./ProductGrid"

export default function MiniCart() {
  const [isOpen, setIsOpen] = useState(false)
  const { cartItems, cartCount, removeFromCart, getCartTotal } = useCart()

  if (cartCount === 0) {
    return (
      <div className="relative">
        <button className="relative p-2 hover:bg-white/10 rounded-full transition-colors">
          <ShoppingCart className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            0
          </span>
        </button>
      </div>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-white/10 rounded-full transition-colors"
      >
        <ShoppingCart className="h-6 w-6" />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {cartCount}
        </span>
      </button>

      {/* Mini Cart Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

          {/* Mini Cart Panel */}
          <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl border z-50">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Shopping Cart</h3>
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="max-h-64 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.id} className="p-4 border-b last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={50}
                      height={50}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">{item.name}</h4>
                      <p className="text-sm text-gray-600">
                        ${item.price} × {item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t bg-gray-50">
              <div className="flex justify-between items-center mb-3">
                <span className="font-semibold">Total:</span>
                <span className="font-bold text-[#466cf4]">${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="space-y-2">
                <Link href="/cart" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-[#466cf4] hover:bg-[#3a5ce0] text-white">View Cart</Button>
                </Link>
                <Link href="/checkout" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full bg-transparent">
                    Checkout
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
