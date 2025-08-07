"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import BrandFilter from "@/components/BrandFilter";
import { products } from "@/lib/products";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/ProductGrid";
import StoreDisplayBelow from "@/components/StoreDisplayBelow";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const demoProducts = [];

export default function HomeKitchenPage() {
  const allCategories = [
    "Home & Kitchen",
    "Phones and Tablets",
    "Electronics",
    "Computing",
    "Generators",
    "Accessories",
    "Lifestyle",
    "Watches",
    "Premium Devices",
  ];
  const activeCategory = "Home & Kitchen";
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
    const isActiveCategory = selectedCategory
      ? product.category === selectedCategory
      : product.category === "Home & Kitchen";
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
        .filter((p) => p.category === "Home & Kitchen")
        .map((p) => p.brand)
    )
  );

  return (
    <>
      <Header />
      <StoreDisplayBelow />
      <main className="bg-[#efefef] min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 flex gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full max-w-[260px] bg-white rounded-lg shadow p-6 h-fit sticky top-24 self-start">
            <h3 className="text-base font-bold mb-4 text-blue-900">Filter</h3>
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
              title="All Home & Kitchen"
              products={filteredProducts}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function ProductSection({
  title,
  products,
}: {
  title: string;
  products: any[];
}) {
  const { addToCart } = useCart();

  // Add empty state message and reset button
  // Accept filter setters as props for reset button
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
            onClick={() => {
              if (typeof window !== "undefined") {
                window.location.reload();
              }
            }}
          >
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg group transition hover:scale-105"
            >
              <div className="relative overflow-hidden rounded-t-xl">
                {/* ...image and actions... */}
              </div>
              <div className="p-4">
                <h3 className="font-medium truncate text-sm">{product.name}</h3>
                <p className="text-blue-600 font-bold text-base">
                  ₦{product.price}
                </p>
                <p className="text-sm text-gray-500">
                  {product.brand} · {product.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
