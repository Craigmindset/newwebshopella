"use client";

import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import Image from "next/image";
import { ShoppingCart, Eye, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Sample product data (replace this with your dynamic import later)
type Product = {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  image: string;
  gallery: string[];
  description: string;
  specifications: string[];
};

const products: Product[] = [
  {
    id: 1,
    name: "Untitled Product",
    price: 170560,
    oldPrice: 250560,
    discount: 12,
    image: "/brands/products/untitled-1_10_1.png",
    gallery: ["/brands/products/untitled-1_10_1.png"],
    description: "Product description.",
    specifications: ["Spec 1", "Spec 2", "Spec 3"],
  },
  {
    id: 2,
    name: "HP Pavilion 15",
    price: 70000,
    oldPrice: 126060,
    discount: 20,
    image: "/brands/products/hp_pavilion_15-eh0083nia-removebg-preview.png",
    gallery: ["/brands/products/hp_pavilion_15-eh0083nia-removebg-preview.png"],
    description: "HP Pavilion 15 laptop.",
    specifications: ["AMD Ryzen", "15-inch", "512GB SSD"],
  },
  {
    id: 3,
    name: "HP Omen 14",
    price: 85000,
    oldPrice: 120000,
    discount: 15,
    image: "/brands/products/hp_omen_14_1_tb.png",
    gallery: ["/brands/products/hp_omen_14_1_tb.png"],
    description: "HP Omen 14 gaming laptop.",
    specifications: ["Intel i7", "14-inch", "1TB SSD"],
  },
  {
    id: 4,
    name: "HP PPPP",
    price: 12000,
    oldPrice: 15000,
    discount: 10,
    image: "/brands/products/hpppp.png",
    gallery: ["/brands/products/hpppp.png"],
    description: "HP PPPP model.",
    specifications: ["Spec A", "Spec B"],
  },
  {
    id: 5,
    name: "Samsung Galaxy Fold 6",
    price: 3500,
    oldPrice: 5000,
    discount: 30,
    image: "/brands/products/samsung_galaxy_fold_6_1tb.png",
    gallery: ["/brands/products/samsung_galaxy_fold_6_1tb.png"],
    description: "Samsung Galaxy Fold 6 smartphone.",
    specifications: ["Foldable", "1TB Storage"],
  },
  // Add more products as needed...
];

// Cart Context
type CartItem = Product & { quantity: number };
type CartContextType = {
  cartItems: CartItem[];
  cartCount: number;
  addToCart: (product: Product, quantity?: number) => void;
  getCartTotal: () => number;
  clearCart: () => void;
};
const CartContext = createContext<CartContextType | null>(null);
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState<number>(0);

  useEffect(() => {
    const saved = localStorage.getItem("shopella-cart");
    if (saved) {
      const parsed: CartItem[] = JSON.parse(saved);
      setCartItems(parsed);
      setCartCount(parsed.reduce((acc: number, i: CartItem) => acc + i.quantity, 0));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("shopella-cart", JSON.stringify(cartItems));
    setCartCount(cartItems.reduce((acc: number, i: CartItem) => acc + i.quantity, 0));
  }, [cartItems]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems((prev: CartItem[]) => {
      const existing = prev.find((i) => i.id === product.id);
      return existing
        ? prev.map((i) =>
            i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
          )
        : [...prev, { ...product, quantity }];
    });
  };

  // Calculate total price of items in cart
  const getCartTotal = () => {
    return cartItems.reduce((acc: number, item: CartItem) => acc + item.price * item.quantity, 0);
  };

  // Clear all items from cart
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, cartCount, addToCart, getCartTotal, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default function ProductGrid() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { addToCart } = useCart();

  const PRODUCTS_PER_VIEW = 5;
  const totalSlides = Math.ceil(products.length / PRODUCTS_PER_VIEW);

  const getVisibleProducts = () => {
    const start = currentSlide * PRODUCTS_PER_VIEW;
    return products.slice(start, start + PRODUCTS_PER_VIEW);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
  };

  return (
    <CartProvider>
      <section className="py-12 bg-[#f9f9f9]">
        <div className="container px-4">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900">
              Shopella <span className="text-red-500">Deals</span>
            </h2>
            <p className="text-sm text-gray-500">
              Check out the best selling gadgets
            </p>
          </div>

          <div className="relative flex items-center justify-center">
            {/* Left navigation button overlay */}
            <button
              onClick={goToPrevSlide}
              disabled={currentSlide === 0}
              className={`absolute left-4 z-20 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white font-semibold shadow-lg top-1/2 transform -translate-y-1/2 transition ${
                currentSlide === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            {/* Product grid */}
            <div className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {getVisibleProducts().map((product) => (
                <div
                  key={product.id}
                  className="bg-white p-4 rounded-lg shadow relative"
                >
                  {product.discount && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {product.discount}% OFF
                    </div>
                  )}
                  <div className="relative group">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={200}
                      className="rounded-md w-full h-40 object-contain"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity">
                      <button
                        onClick={() => addToCart(product)}
                        className="p-2 bg-[#466cf4] text-white rounded-full"
                      >
                        <ShoppingCart className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => openModal(product)}
                        className="p-2 bg-white text-gray-800 rounded-full"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-sm font-semibold text-gray-900 truncate">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <p className="text-[#466cf4] font-bold text-lg">
                        ₦{product.price.toLocaleString()}
                      </p>
                      {product.oldPrice && (
                        <p className="text-gray-400 line-through text-sm">
                          ₦{product.oldPrice.toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Right navigation button overlay */}
            <button
              onClick={goToNextSlide}
              disabled={currentSlide === totalSlides - 1}
              className={`absolute right-4 z-20 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white font-semibold shadow-lg top-1/2 transform -translate-y-1/2 transition ${
                currentSlide === totalSlides - 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="text-center mt-8">
            <Button className="bg-[#466cf4] hover:bg-[#3a5ce0] text-white px-6 py-2 rounded-full">
              View More
            </Button>
          </div>

          {selectedProduct && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg max-w-md w-full overflow-hidden flex flex-col items-center p-6">
                <Image
                  src={selectedProduct.image || "/placeholder.svg"}
                  alt={selectedProduct.name}
                  width={250}
                  height={250}
                  className="rounded object-contain mb-4"
                />
                <h2 className="text-lg font-bold text-center mb-2">
                  {selectedProduct.name}
                </h2>
                <p className="text-[#466cf4] font-bold text-xl mb-2">
                  ₦{selectedProduct.price.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 mb-2 text-center">
                  {selectedProduct.description}
                </p>
                <ul className="text-sm text-gray-600 list-disc list-inside mb-4 text-left w-full">
                  {selectedProduct.specifications?.map((spec, i) => (
                    <li key={i}>{spec}</li>
                  ))}
                </ul>
                <div className="flex items-center gap-4 mb-4">
                  <label>Quantity:</label>
                  <div className="flex items-center border rounded">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3"
                    >
                      -
                    </button>
                    <span className="px-4 border-x">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3"
                    >
                      +
                    </button>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    addToCart(selectedProduct, quantity);
                    setShowSuccessMessage(true);
                    setTimeout(() => setShowSuccessMessage(false), 2000);
                    setSelectedProduct(null);
                  }}
                  className="bg-[#466cf4] text-white px-6 py-2 w-full"
                >
                  Add to Cart
                </Button>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 text-gray-600 hover:text-black"
                  style={{ position: "absolute", top: 16, right: 16 }}
                >
                  <X className="w-5 h-5" />
                </button>
                {showSuccessMessage && (
                  <p className="text-green-600 mt-2">Added to cart!</p>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </CartProvider>
  );
}
