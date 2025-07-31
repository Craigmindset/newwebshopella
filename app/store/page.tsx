"use client"

// ...existing code...
import { useCart, CartProvider } from "@/components/ProductGrid"
import Image from "next/image"
import { ShoppingCart, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

import { products } from "@/lib/products"

const categories = ["Phones", "Laptops", "Accessories", "TVs", "Appliances"]
const brands = ["Apple", "Samsung", "LG", "Sony", "Dell"]

export default function StorePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)

  // Filter products by selected category and brand
  const filteredProducts = products.filter(product => {
    const matchCategory = selectedCategory ? product.category === selectedCategory : true
    const matchBrand = selectedBrand ? product.brand === selectedBrand : true
    return matchCategory && matchBrand
  })

  return (
    <StorePageContent
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      selectedBrand={selectedBrand}
      setSelectedBrand={setSelectedBrand}
      filteredProducts={filteredProducts}
    />
  )
}

// ...existing code...

import { useState } from "react"

function StorePageContent({ selectedCategory, setSelectedCategory, selectedBrand, setSelectedBrand, filteredProducts }: {
  selectedCategory: string | null,
  setSelectedCategory: (cat: string | null) => void,
  selectedBrand: string | null,
  setSelectedBrand: (brand: string | null) => void,
  filteredProducts: typeof products
}) {
  const { addToCart } = useCart()
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const handleAddToCart = (product: any) => {
    addToCart({ ...product, quantity })
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 2000)
    setSelectedProduct(null)
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8">Shop Our Store</h1>
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
              >
                {category}
              </Button>
            ))}
          </div>
          {/* Brand Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {brands.map(brand => (
              <Button
                key={brand}
                variant={selectedBrand === brand ? "default" : "outline"}
                onClick={() => setSelectedBrand(selectedBrand === brand ? null : brand)}
              >
                {brand}
              </Button>
            ))}
          </div>
          {/* Product Grid (same UI as ProductGrid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
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
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors"
                      title="Quick View"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-[#466cf4] text-white p-2 rounded-full hover:bg-[#3a5ce0] transition-colors"
                      title="Add to Cart"
                    >
                      <ShoppingCart className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 truncate">{product.name}</h3>
                  <p className="text-[#466cf4] font-bold text-lg">₦{product.price}</p>
                  <p className="text-sm text-gray-500">{product.brand} &middot; {product.category}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Product Modal for Quick View and Purchase Flow */}
          {selectedProduct && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-6 border-b">
                  <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
                  <button onClick={() => setSelectedProduct(null)} className="text-gray-500 hover:text-gray-700">
                    <span className="text-xl">×</span>
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                  {/* Product Gallery */}
                  <div>
                    <div className="mb-4">
                      <Image
                        src={selectedProduct.gallery?.[selectedImage] || "/placeholder.svg"}
                        alt={selectedProduct.name}
                        width={400}
                        height={400}
                        className="w-full h-80 object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex space-x-2 overflow-x-auto">
                      {selectedProduct.gallery?.map((image: string, index: number) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden ${
                            selectedImage === index ? "border-[#466cf4]" : "border-gray-200"
                          }`}
                        >
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`${selectedProduct.name} ${index + 1}`}
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
                      <p className="text-gray-600">{selectedProduct.description}</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Specifications</h3>
                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                        {selectedProduct.specifications?.map((spec: string, index: number) => (
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
                      <span className="text-3xl font-bold text-[#466cf4]">₦{selectedProduct.price}</span>
                      <div className="relative">
                        <Button
                          onClick={() => handleAddToCart(selectedProduct)}
                          className="bg-[#466cf4] hover:bg-[#3a5ce0] text-white px-8 py-3"
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {showSuccessMessage && (
            <div className="fixed top-6 right-6 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
              Added to cart!
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
