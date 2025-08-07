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
    id: 301,
    name: "HP Pavilion 15 Laptop",
    price: 350000,
    brand: "HP",
    category: "Computing",
    image: "/products/hp-pavilion-15.jpg",
    deal: true,
  },
  {
    id: 302,
    name: "Apple MacBook Air M1",
    price: 650000,
    brand: "Apple",
    category: "Computing",
    image: "/products/macbook-air-m1.jpg",
    deal: false,
  },
  {
    id: 303,
    name: "Dell Inspiron 14",
    price: 320000,
    brand: "Dell",
    category: "Computing",
    image: "/products/dell-inspiron-14.jpg",
    deal: false,
  },
  {
    id: 304,
    name: "Lenovo ThinkPad X1",
    price: 480000,
    brand: "Lenovo",
    category: "Computing",
    image: "/products/lenovo-thinkpad-x1.jpg",
    deal: true,
  },
  {
    id: 305,
    name: "Acer Aspire 5",
    price: 270000,
    brand: "Acer",
    category: "Computing",
    image: "/products/acer-aspire-5.jpg",
    deal: false,
  },
  {
    id: 306,
    name: "Asus VivoBook 15",
    price: 295000,
    brand: "Asus",
    category: "Computing",
    image: "/products/asus-vivobook-15.jpg",
    deal: true,
  },
  {
    id: 307,
    name: "Microsoft Surface Pro 7",
    price: 520000,
    brand: "Microsoft",
    category: "Computing",
    image: "/products/surface-pro-7.jpg",
    deal: false,
  },
  {
    id: 308,
    name: "Samsung Galaxy Book Flex",
    price: 410000,
    brand: "Samsung",
    category: "Computing",
    image: "/products/galaxy-book-flex.jpg",
    deal: true,
  },
];

export default function ComputingPage() {
  const allCategories = [
    "Computing",
    "Phones and Tablets",
    "Electronics",
    "Generators",
    "Accessories",
    "Home & Kitchen",
    "Lifestyle",
    "Watches",
    "Premium Devices",
  ];
  const activeCategory = "Computing";
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
      : product.category === "Computing";
    const matchBrand = selectedBrand ? product.brand === selectedBrand : true;
    const matchMin = minPrice !== "" ? product.price >= minPrice : true;
    const matchMax = maxPrice !== "" ? product.price <= maxPrice : true;
    const matchDeal = showDeals
      ? "deal" in product
        ? product.deal === true
        : false
      : true;
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
      products.filter((p) => p.category === "Computing").map((p) => p.brand)
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
              title="All Computing"
              products={filteredProducts}
              setPreviewProduct={(product) => {
                setPreviewProduct(product);
                setQuantity(1);
                setActiveGalleryIdx(0);
              }}
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
}: {
  title: string;
  products: any[];
  setPreviewProduct: (product: any) => void;
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
                  onClick={() => setPreviewProduct(product)}
                >
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
                ₦{product.price.toLocaleString()}
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
