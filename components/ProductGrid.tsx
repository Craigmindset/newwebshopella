"use client"

import { useState, useEffect, createContext, useContext, ReactNode } from "react"
import Image from "next/image"
import { ShoppingCart, Eye, X } from "lucide-react"
import { Button } from "@/components/ui/button"

// Cart Context for global cart state management
type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  gallery?: string[];
  description?: string;
  specifications?: string[];
};

type CartContextType = {
  cartItems: CartItem[];
  cartCount: number;
  addToCart: (product: CartItem, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, newQuantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
};

const CartContext = createContext<CartContextType | null>(null)

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [cartCount, setCartCount] = useState<number>(0)

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem("shopella-cart")
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart)
      setCartItems(parsedCart)
      setCartCount(parsedCart.reduce((total: number, item: CartItem) => total + item.quantity, 0))
    }
  }, [])

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("shopella-cart", JSON.stringify(cartItems))
    setCartCount(cartItems.reduce((total: number, item: CartItem) => total + item.quantity, 0))
  }, [cartItems])

  const addToCart = (product: CartItem, quantity: number = 1) => {
    setCartItems((prevItems: CartItem[]) => {
      const existingItem = prevItems.find((item) => item.id === product.id)
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
        )
      } else {
        return [...prevItems, { ...product, quantity }]
      }
    })
  }

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems: CartItem[]) => prevItems.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCartItems((prevItems: CartItem[]) =>
      prevItems.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item)),
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const getCartTotal = (): number => {
    return cartItems.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

import { products } from "@/lib/products"

export default function ProductGrid() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const { addToCart: addToCartContext } = useCart()

  // Auto-slide functionality
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % Math.ceil(products.length / 6))
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [isHovered])

  // Get visible products for current slide
  const getVisibleProducts = () => {
    const startIndex = currentSlide * 6
    return products.slice(startIndex, startIndex + 6)
  }

  // Add to cart functionality - now properly updates cart state
  const addToCart = (product: CartItem) => {
    // API integration point: POST /api/cart/add
    console.log("Adding to cart:", { productId: product.id, quantity })

    // Add to cart context
    addToCartContext(product, quantity)

    // Show success message
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 2000)

    // Close modal if open
    if (selectedProduct) {
      setSelectedProduct(null)
    }
  }

  // Open product modal
  const openProductModal = (product: CartItem) => {
    setSelectedProduct(product)
    setSelectedImage(0)
    setQuantity(1)
  }

  return (
    <CartProvider>
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Section Title */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Top Brands</h2>
            <div className="w-24 h-1 bg-[#466cf4] mx-auto"></div>
          </div>

          {/* Product Slider */}
          <div
            className="relative overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {getVisibleProducts().map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Product Actions Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                      <button
                        onClick={() => addToCart(product)}
                        className="bg-[#466cf4] text-white p-2 rounded-full hover:bg-[#3a5ce0] transition-colors"
                        title="Add to Cart"
                      >
                        <ShoppingCart className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => openProductModal(product)}
                        className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors"
                        title="Quick View"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 truncate">{product.name}</h3>
                    <p className="text-[#466cf4] font-bold text-lg">₦{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slider Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: Math.ceil(products.length / 6) }).map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === index ? "bg-[#466cf4]" : "bg-gray-300"
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>

        {/* Product Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-2xl font-bold">{(selectedProduct as CartItem).name}</h2>
                <button onClick={() => setSelectedProduct(null)} className="text-gray-500 hover:text-gray-700">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                {/* Product Gallery */}
                <div>
                  <div className="mb-4">
                    <Image
                      src={(selectedProduct as CartItem).gallery?.[selectedImage] || "/placeholder.svg"}
                      alt={(selectedProduct as CartItem).name}
                      width={400}
                      height={400}
                      className="w-full h-80 object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex space-x-2 overflow-x-auto">
                    {(selectedProduct as CartItem).gallery?.map((image: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden ${
                          selectedImage === index ? "border-[#466cf4]" : "border-gray-200"
                        }`}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${(selectedProduct as CartItem).name} ${index + 1}`}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Product Details */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Description</h3>
                    <p className="text-gray-600">{(selectedProduct as CartItem).description}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">Specifications</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {(selectedProduct as CartItem).specifications?.map((spec: string, index: number) => (
                        <li key={index}>{spec}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center space-x-4">
                    <label className="font-semibold">Quantity:</label>
                    <div className="flex items-center border rounded">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="px-4 py-1 border-x">{quantity}</span>
                      <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-1 hover:bg-gray-100">
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-[#466cf4]">₦{(selectedProduct as CartItem).price}</span>
                    <div className="relative">
                      <Button
                        onClick={() => addToCart(selectedProduct as CartItem)}
                        className="bg-[#466cf4] hover:bg-[#3a5ce0] text-white px-8 py-3"
                      >
                        Add to Cart
                      </Button>
                      {showSuccessMessage && (
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded text-sm whitespace-nowrap">
                          Added successfully!
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </CartProvider>
  )
}
