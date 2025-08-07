"use client";
import { useState } from "react";
import { products } from "@/components/ProductGrid";
import { useCart } from "@/components/ProductGrid";
import BrandFilter from "@/components/BrandFilter";
import Header from "@/components/Header";
import StoreHeader from "@/components/ui/StoreHeader";
import Footer from "@/components/Footer";
import StoreDisplayBelow from "@/components/StoreDisplayBelow";
import ProductPreviewModal from "@/components/ProductPreviewModal";
import { ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DealsPage() {
  // Get all products with deal: true
  const storeCategories = [
    "Phones",
    "Tablets",
    "Computing",
    "Electronics",
    "Generators",
    "Accessories",
    "Home & Kitchen",
    "Lifestyle",
    "Watches",
    "Premium Devices",
  ];

  let dealProducts = products.filter((product) => product.deal);

  // Add fallback demo deal products for missing categories
  const missingCategories = storeCategories.filter(
    (cat) => !dealProducts.some((p) => p.category === cat)
  );
  if (missingCategories.length > 0) {
    const demoDeals = missingCategories.map((cat, idx) => ({
      id: 9000 + idx,
      name: `Demo Deal for ${cat}`,
      price: 99999,
      image: "/placeholder.jpg",
      gallery: ["/placeholder.jpg"],
      description: `Special deal in ${cat}`,
      specifications: [],
      brand: "DemoBrand",
      category: cat,
      deal: true,
    }));
    dealProducts = [...dealProducts, ...demoDeals];
  }

  const categories = Array.from(new Set(dealProducts.map((p) => p.category)));
  const brands = Array.from(new Set(dealProducts.map((p) => p.brand)));

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [previewProduct, setPreviewProduct] = useState<any | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeGalleryIdx, setActiveGalleryIdx] = useState(0);

  // Filter deals by category and brand
  let filteredProducts = dealProducts.filter((product) => {
    const matchCategory = selectedCategory
      ? product.category === selectedCategory
      : true;
    const matchBrand = selectedBrand ? product.brand === selectedBrand : true;
    return matchCategory && matchBrand;
  });

  return (
    <>
      <Header />
      <StoreHeader />
      <StoreDisplayBelow />
      <main className="bg-[#efefef] min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 flex gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full max-w-[260px] bg-white rounded-lg shadow p-6 h-fit sticky top-24 self-start">
            <h3 className="text-base font-bold mb-4 text-blue-900">
              Filter Deals
            </h3>
            <BrandFilter
              brands={brands}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
              minPrice={null}
              setMinPrice={() => {}}
              maxPrice={null}
              setMaxPrice={() => {}}
              showDeals={false}
              setShowDeals={() => {}}
              sortOrder={null}
              setSortOrder={() => {}}
              resetFilters={() => {
                setSelectedCategory(null);
                setSelectedBrand(null);
              }}
              allCategories={categories}
              activeCategory={""}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </aside>
          {/* Main Content */}
          <div className="flex-1">
            <section className="mb-12">
              <h2 className="text-lg font-medium mb-4">Shop All Deals</h2>
              {filteredProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="text-3xl mb-4">😕</div>
                  <h3 className="text-lg font-semibold mb-2">
                    No deals found for this filter.
                  </h3>
                  <p className="text-sm text-gray-500 mb-6 text-center">
                    Try resetting your filters or choose another brand/category.
                  </p>
                  <Button
                    variant="outline"
                    className="px-6 py-2 text-xs"
                    onClick={() => {
                      setSelectedCategory(null);
                      setSelectedBrand(null);
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => {
                    const productWithDefaults = {
                      ...product,
                      gallery: [product.image],
                      description: product.description || "",
                    };
                    return (
                      <div
                        key={product.id}
                        className="bg-white rounded-xl shadow-lg group transition hover:scale-105 border-2 border-yellow-400"
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
                            onError={(e) =>
                              (e.currentTarget.src = "/placeholder.jpg")
                            }
                          />
                          <div className="absolute top-2 left-2 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded">
                            Deal
                          </div>
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-4">
                            <button
                              className="bg-white p-2 rounded-full shadow hover:bg-yellow-100"
                              onClick={() => {
                                setPreviewProduct(productWithDefaults);
                                setQuantity(1);
                                setActiveGalleryIdx(0);
                              }}
                            >
                              <Eye className="h-5 w-5 text-yellow-600" />
                            </button>
                            <button
                              onClick={() =>
                                useCart().addToCart(productWithDefaults)
                              }
                              className="bg-yellow-400 text-white p-2 rounded-full shadow hover:bg-yellow-500"
                            >
                              <ShoppingCart className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium truncate text-sm">
                            {product.name}
                          </h3>
                          <p className="text-yellow-600 font-bold text-base">
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
              useCart().addToCart(productWithDefaults, quantity);
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
