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
import { ShoppingCart, Eye } from "lucide-react";

const demoProducts = [
  {
    id: 401,
    name: "Tiger TG950 Generator",
    price: 65000,
    brand: "Tiger",
    category: "Generators",
    image: "/placeholder.jpg",
    deal: false,
  },
  {
    id: 402,
    name: "Sumec Firman SPG3000E2",
    price: 120000,
    brand: "Sumec",
    category: "Generators",
    image: "/placeholder.jpg",
    deal: true,
  },
  {
    id: 403,
    name: "Elepaq SV2200",
    price: 85000,
    brand: "Elepaq",
    category: "Generators",
    image: "/placeholder.jpg",
    deal: false,
  },
  {
    id: 404,
    name: "Honda EG6500",
    price: 350000,
    brand: "Honda",
    category: "Generators",
    image: "/placeholder.jpg",
    deal: true,
  },
  {
    id: 405,
    name: "Lutian LT3600",
    price: 110000,
    brand: "Lutian",
    category: "Generators",
    image: "/placeholder.jpg",
    deal: false,
  },
  {
    id: 406,
    name: "Maxmech 2.5KVA",
    price: 95000,
    brand: "Maxmech",
    category: "Generators",
    image: "/placeholder.jpg",
    deal: false,
  },
  {
    id: 407,
    name: "Elemax SH3900EX",
    price: 210000,
    brand: "Elemax",
    category: "Generators",
    image: "/placeholder.jpg",
    deal: true,
  },
  {
    id: 408,
    name: "Perkins 10KVA",
    price: 950000,
    brand: "Perkins",
    category: "Generators",
    image: "/placeholder.jpg",
    deal: false,
  },
];

export default function GeneratorsPage() {
  const allCategories = [
    "Generators",
    "Phones and Tablets",
    "Electronics",
    "Computing",
    "Accessories",
    "Home & Kitchen",
    "Lifestyle",
    "Watches",
    "Premium Devices",
  ];
  const activeCategory = "Generators";
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { user, loading, logout } = useAuth();
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"low" | "high" | "newest" | null>(null);
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [showDeals, setShowDeals] = useState(false);

  let filteredProducts = [...products, ...demoProducts].filter((product) => {
    const isActiveCategory = selectedCategory
      ? product.category === selectedCategory
      : product.category === "Generators";
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
        .filter((p) => p.category === "Generators")
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
              title="All Generators"
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

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-lg group transition hover:scale-105"
          >
            <div className="relative overflow-hidden rounded-t-xl">
              <img
                src={product.image && product.image !== "" ? product.image : "/placeholder.jpg"}
                alt={product.name}
                className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                onError={e => (e.currentTarget.src = "/placeholder.jpg")}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-4">
                <button className="bg-white p-2 rounded-full shadow hover:bg-blue-100">
                  <Eye className="h-5 w-5 text-blue-700" />
                </button>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-blue-600 text-white p-2 rounded-full shadow hover:bg-blue-800"
                >
                  <ShoppingCart className="h-5 w-5" />
                </button>
              </div>
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
    </section>
  );
}
