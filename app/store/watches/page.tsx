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
import ProductPreviewModal from "@/components/ProductPreviewModal";

const demoProducts = [
  {
    id: 501,
    name: "Rolex Submariner",
    price: 2500000,
    brand: "Rolex",
    category: "Watches",
    image: "/placeholder.jpg",
    deal: true,
  },
  {
    id: 502,
    name: "Apple Watch Series 7",
    price: 350000,
    brand: "Apple",
    category: "Watches",
    image: "/placeholder.jpg",
    deal: false,
  },
  {
    id: 503,
    name: "Casio G-Shock",
    price: 80000,
    brand: "Casio",
    category: "Watches",
    image: "/placeholder.jpg",
    deal: false,
  },
  {
    id: 504,
    name: "Omega Seamaster",
    price: 1200000,
    brand: "Omega",
    category: "Watches",
    image: "/placeholder.jpg",
    deal: true,
  },
  {
    id: 505,
    name: "Fossil Gen 6",
    price: 95000,
    brand: "Fossil",
    category: "Watches",
    image: "/placeholder.jpg",
    deal: false,
  },
  {
    id: 506,
    name: "Samsung Galaxy Watch 4",
    price: 120000,
    brand: "Samsung",
    category: "Watches",
    image: "/placeholder.jpg",
    deal: true,
  },
  {
    id: 507,
    name: "Tissot PRX",
    price: 180000,
    brand: "Tissot",
    category: "Watches",
    image: "/placeholder.jpg",
    deal: false,
  },
  {
    id: 508,
    name: "Seiko 5 Sports",
    price: 110000,
    brand: "Seiko",
    category: "Watches",
    image: "/placeholder.jpg",
    deal: true,
  },
];

export default function WatchesPage() {
  const allCategories = [
    "Watches",
    "Phones and Tablets",
    "Electronics",
    "Computing",
    "Generators",
    "Accessories",
    "Home & Kitchen",
    "Lifestyle",
    "Premium Devices",
  ];
  const activeCategory = "Watches";
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
      : product.category === "Watches";
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
      products.filter((p) => p.category === "Watches").map((p) => p.brand)
    )
  );

  const [previewProduct, setPreviewProduct] = useState<any | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeGalleryIdx, setActiveGalleryIdx] = useState(0);
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
              title="All Watches"
              products={filteredProducts}
              setPreviewProduct={setPreviewProduct}
              setQuantity={setQuantity}
              setActiveGalleryIdx={setActiveGalleryIdx}
            />
          </div>
        </div>
        {/* Preview Modal */}
        {previewProduct && (
          <ProductPreviewModal
            product={previewProduct}
            quantity={quantity}
            setQuantity={setQuantity}
            activeGalleryIdx={activeGalleryIdx}
            setActiveGalleryIdx={setActiveGalleryIdx}
            onAddToCart={() => {
              const productWithDefaults = {
                ...previewProduct,
                gallery: previewProduct.gallery || [previewProduct.image],
                description: previewProduct.description || "",
              };
              const { addToCart } = useCart();
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
  setQuantity,
  setActiveGalleryIdx,
}: {
  title: string;
  products: any[];
  setPreviewProduct: (product: any) => void;
  setQuantity: (q: number) => void;
  setActiveGalleryIdx: (idx: number) => void;
}) {
  const { addToCart } = useCart();
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
              setSelectedBrand && setSelectedBrand(null);
              setMinPrice && setMinPrice("");
              setMaxPrice && setMaxPrice("");
              setShowDeals && setShowDeals(false);
              setSortOrder && setSortOrder(null);
              setSelectedCategory && setSelectedCategory(null);
            }}
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
              description: product.description || "",
            };
            return (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-lg group transition hover:scale-105"
              >
                <div className="relative overflow-hidden rounded-t-xl">
                  <img
                    src={
                      product.image && product.image !== ""
                        ? product.image
                        : "/placeholder.jpg"
                    }
                    alt={product.name}
                    className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-4">
                    <button
                      className="bg-white p-2 rounded-full shadow hover:bg-blue-100"
                      onClick={() => {
                        setPreviewProduct(productWithDefaults);
                        setQuantity(1);
                        setActiveGalleryIdx(0);
                      }}
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
                  <h3 className="font-medium truncate text-sm">{product.name}</h3>
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
