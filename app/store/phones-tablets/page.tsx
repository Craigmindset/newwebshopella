"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import BrandFilter from "@/components/BrandFilter";
import { useCart } from "@/components/ProductGrid";
import { useAuth } from "@/hooks/useAuth";
import AdBanner2 from "@/components/AdBanner2";
import StoreDisplayBelow from "@/components/StoreDisplayBelow";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { products } from "@/lib/products";
import ProductPreviewModal from "@/components/ProductPreviewModal";
// Demo products for Phones & Tablets
const demoProducts = [
  {
    id: 101,
    name: "iPhone 15 Pro Max",
    price: 1200000,
    brand: "Apple",
    category: "Phones",
    image: "/Apple/iphone1.jpg",
  },
  {
    id: 109,
    name: "iPhone 14 Pro",
    price: 950000,
    brand: "Apple",
    category: "Phones",
    image: "/Apple/iphone2.jpg",
  },
  {
    id: 110,
    name: "iPhone 13 Mini",
    price: 700000,
    brand: "Apple",
    category: "Phones",
    image: "/Apple/iphone3.jpg",
  },
  {
    id: 111,
    name: "iPhone 12",
    price: 500000,
    brand: "Apple",
    category: "Phones",
    image: "/Apple/iphone4.jpg",
  },
  {
    id: 112,
    name: "iPhone 11",
    price: 350000,
    brand: "Apple",
    category: "Phones",
    image: "/Apple/iphone5.jpg",
  },
  {
    id: 113,
    name: "iPhone SE",
    price: 250000,
    brand: "Apple",
    category: "Phones",
    image: "/Apple/iphone6.jpg",
  },
  {
    id: 102,
    name: "Samsung Galaxy S24 Ultra",
    price: 950000,
    brand: "Samsung",
    category: "Phones",
    image: "/demo-samsung/1 (3).jpg",
  },
  {
    id: 103,
    name: "Tecno Camon 20",
    price: 120000,
    brand: "Tecno",
    category: "Phones",
    image: "/products/tecnocamon20.jpg",
  },
  {
    id: 104,
    name: "iPad Pro 12.9",
    price: 800000,
    brand: "Apple",
    category: "Tablets",
    image: "/Apple/iphone2.jpg",
  },
  {
    id: 105,
    name: "Samsung Galaxy Tab S9",
    price: 650000,
    brand: "Samsung",
    category: "Tablets",
    image: "/demo-samsung/1 (2).jpg",
  },
  {
    id: 107,
    name: "Samsung Galaxy A73",
    price: 350000,
    brand: "Samsung",
    category: "Phones",
    image: "/demo-samsung/1 (1).jpg",
  },
  {
    id: 108,
    name: "Samsung Galaxy M54",
    price: 280000,
    brand: "Samsung",
    category: "Phones",
    image: "/demo-samsung/1.jpg",
  },
  {
    id: 106,
    name: "Lenovo Tab M10",
    price: 95000,
    brand: "Lenovo",
    category: "Tablets",
    image: "/products/lenovotabm10.jpg",
  },
];

export default function PhonesTabletsPage() {
  const router = useRouter();

  // All categories for dropdown (excluding current 'Phones and Tablets')
  const allCategories = [
    "Phones and Tablets",
    "Computing",
    "Electronics",
    "Generators",
    "Accessories",
    "Home & Kitchen",
    "Premium Devices",
  ];
  const activeCategory = "Phones and Tablets";
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { user, loading, logout } = useAuth();
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"low" | "high" | "newest" | null>(
    null
  );
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [showDeals, setShowDeals] = useState(false);

  let filteredProducts = [...products, ...demoProducts].filter((product) => {
    // Only show Phones & Tablets by default, or filter by selected category
    const isActiveCategory = selectedCategory
      ? product.category === selectedCategory
      : product.category === "Phones" || product.category === "Tablets";
    const matchBrand = selectedBrand ? product.brand === selectedBrand : true;
    const matchMin = minPrice !== "" ? product.price >= minPrice : true;
    const matchMax = maxPrice !== "" ? product.price <= maxPrice : true;
    const matchDeal = showDeals ? product.deal === true : true;
    return isActiveCategory && matchBrand && matchMin && matchMax && matchDeal;
  });

  if (sortOrder === "low") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortOrder === "high") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortOrder === "newest") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.id - a.id);
  }

  if (loading) return <div className="p-8">Loading...</div>;

  const brands = Array.from(
    new Set(
      products
        .filter((p) => p.category === "Phones" || p.category === "Tablets")
        .map((p) => p.brand)
    )
  );

  const [previewProduct, setPreviewProduct] = useState<any | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeGalleryIdx, setActiveGalleryIdx] = useState(0);
  const { addToCart } = useCart();

  return (
    <>
      <Header />

      <StoreDisplayBelow />

      <main className="bg-[#efefef] min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 flex gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full max-w-[260px] bg-white rounded-lg shadow p-6 h-fit sticky top-24 self-start">
            <h3 className="text-base font-bold mb-4 text-blue-900">Filter</h3>
            {/* Brand Filter */}
            <BrandFilter
              brands={brands}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              showDeals={showDeals}
              setShowDeals={setShowDeals}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              resetFilters={() => {
                setSelectedBrand(null);
                setMinPrice("");
                setMaxPrice("");
                setShowDeals(false);
                setSortOrder(null);
              }}
              allCategories={allCategories}
              activeCategory={activeCategory}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </aside>
          {/* Main Content */}
          <div className="flex-1">
            <ProductSection
              title="All Phones & Tablets"
              products={filteredProducts}
              setPreviewProduct={(product) => {
                setPreviewProduct(product);
                setQuantity(1);
                setActiveGalleryIdx(0);
              }}
              addToCart={addToCart}
            />
          </div>
        </div>
        {/* Preview Modal */}
        {previewProduct && (
          <ProductPreviewModal
            product={{
              ...previewProduct,
              gallery:
                previewProduct.gallery && previewProduct.gallery.length > 0
                  ? previewProduct.gallery
                  : [previewProduct.image],
              description: previewProduct.description || "",
            }}
            quantity={quantity}
            setQuantity={setQuantity}
            activeGalleryIdx={activeGalleryIdx}
            setActiveGalleryIdx={setActiveGalleryIdx}
            onAddToCart={() => {
              const productWithDefaults = {
                ...previewProduct,
                gallery:
                  previewProduct.gallery && previewProduct.gallery.length > 0
                    ? previewProduct.gallery
                    : [previewProduct.image],
                description: previewProduct.description || "",
              };
              addToCart(productWithDefaults, quantity);
              setPreviewProduct(null);
            }}
            onClose={() => setPreviewProduct(null)}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

function ProductSection({
  title,
  products,
  setPreviewProduct,
  addToCart,
}: {
  title: string;
  products: any[];
  setPreviewProduct: (product: any) => void;
  addToCart: (product: any, quantity?: number) => void;
}) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="text-3xl mb-4">😕</div>
          <h3 className="text-lg font-semibold mb-2">
            No products found for this brand or filter.
          </h3>
          <p className="text-sm text-gray-500 mb-6 text-center">
            Try resetting your filters or choose another brand/category.
          </p>
          <Button
            variant="outline"
            className="px-6 py-2 text-xs"
            onClick={() => window.location.reload()}
          >
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const productWithDefaults = {
              ...product,
              gallery: [product.image],
              specifications: [],
              description: product.description || "",
            };
            return (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-lg group transition hover:scale-105"
              >
                <div className="relative overflow-hidden rounded-t-xl">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-4">
                    <button
                      className="bg-white p-2 rounded-full shadow hover:bg-blue-100"
                      onClick={() => setPreviewProduct(product)}
                    >
                      <Eye className="h-5 w-5 text-blue-700" />
                    </button>
                    <button
                      onClick={() => addToCart(productWithDefaults)}
                      className="bg-blue-600 text-white p-2 rounded-full shadow hover:bg-blue-800"
                    >
                      <ShoppingCart className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium truncate text-sm">
                    {product.name}
                  </h3>
                  <p className="text-blue-600 font-bold text-base">
                    ₦{product.price.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    {product.brand} · {product.category}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
