import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";

type BrandFilterProps = {
  brands: string[];
  selectedBrand: string | null;
  setSelectedBrand: (brand: string | null) => void;
  minPrice: number | "";
  setMinPrice: (val: number | "") => void;
  maxPrice: number | "";
  setMaxPrice: (val: number | "") => void;
  showDeals: boolean;
  setShowDeals: (val: boolean) => void;
  sortOrder: "low" | "high" | "newest" | null;
  setSortOrder: (val: "low" | "high" | "newest" | null) => void;
  resetFilters: () => void;
  allCategories: string[];
  activeCategory: string;
  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;
};

export default function BrandFilter({
  brands,
  selectedBrand,
  setSelectedBrand,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  showDeals,
  setShowDeals,
  sortOrder,
  setSortOrder,
  resetFilters,
  allCategories,
  activeCategory,
  selectedCategory,
  setSelectedCategory,
}: BrandFilterProps) {
  const router = useRouter();
  // Static brand list for dropdown
  const staticBrands = [
    "Apple",
    "Sony",
    "Panasonic",
    "Hisense",
    "Samsung",
    "Scanfrost",
    "Haier Thermocool",
    "Binatone",
    "Nexus",
    "Midea",
    "Oraimo",
    "JBL",
  ];
  // Merge and deduplicate brands
  const allBrandOptions = Array.from(new Set([...staticBrands, ...brands]));

  return (
    <>
      {/* Category Dropdown Filter */}
      <div className="mb-6">
        <label className="block text-xs font-semibold mb-2">Category</label>
        <select
          className="border rounded px-3 py-2 bg-white shadow w-full text-xs"
          value={selectedCategory || ""}
          onChange={(e) => {
            const value = e.target.value || null;
            setSelectedCategory(value);
            // Map category names to their page slugs
            const categoryToSlug: Record<string, string> = {
              Electronics: "/store/electronics",
              "Phones and Tablets": "/store/phones-tablets",
              Computing: "/store/computing",
              Generators: "/store/generators",
              Accessories: "/store/accessories",
              "Home & Kitchen": "/store/home-&-kitchen",
              Lifestyle: "/store/lifestyle",
              Watches: "/store/watches",
              "Premium Devices": "/store/premium-devices",
            };
            if (value && categoryToSlug[value]) {
              router.push(categoryToSlug[value]);
            }
          }}
        >
          <option value="" className="text-xs">
            All Categories
          </option>
          {allCategories.map((cat) => (
            <option key={cat} value={cat} className="text-xs">
              {cat}
            </option>
          ))}
        </select>
      </div>
      {/* Brand Filter */}
      <div className="mb-6">
        <label className="block text-xs font-semibold mb-2">Brand</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {brands.map((brand) => (
            <Button
              key={brand}
              variant={selectedBrand === brand ? "default" : "outline"}
              onClick={() => {
                setSelectedBrand(selectedBrand === brand ? null : brand);
              }}
              className="text-xs px-3 py-1"
            >
              {brand}
            </Button>
          ))}
        </div>
        {/* Brand Dropdown */}
        <select
          className="border rounded px-3 py-2 bg-white shadow w-full text-xs"
          value={selectedBrand || ""}
          onChange={(e) => {
            const value = e.target.value || null;
            setSelectedBrand(value);
          }}
        >
          <option value="" className="text-xs">
            All Brands
          </option>
          {allBrandOptions.map((brand) => (
            <option key={brand} value={brand} className="text-xs">
              {brand}
            </option>
          ))}
        </select>
      </div>
      {/* Price Sort */}
      <div className="mb-6">
        <label className="block text-xs font-semibold mb-2">
          Sort by Price
        </label>
        <select
          className="border rounded px-3 py-2 bg-white shadow w-full text-xs"
          value={sortOrder || ""}
          onChange={(e) =>
            setSortOrder(e.target.value as "low" | "high" | "newest" | null)
          }
        >
          <option value="" className="text-xs">
            Default
          </option>
          <option value="low" className="text-xs">
            Low to High
          </option>
          <option value="high" className="text-xs">
            High to Low
          </option>
        </select>
        {/* Sort by Budget */}
        <div className="mt-3">
          <label className="block text-xs font-semibold mb-2">
            Sort by Budget
          </label>
          <input
            type="number"
            placeholder="Enter your budget (₦)"
            value={minPrice}
            onChange={(e) =>
              setMinPrice(e.target.value ? Number(e.target.value) : "")
            }
            className="border rounded px-2 py-1 w-full text-xs"
            min={0}
          />
        </div>
      </div>
      {/* Deals */}
      <div className="mb-6">
        <label className="block text-xs font-semibold mb-2">Deals</label>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="deals"
            checked={showDeals}
            onChange={(e) => setShowDeals(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="deals" className="text-xs">
            Show Deals Only
          </label>
        </div>
      </div>
      {/* Reset Button */}
      <Button
        variant="outline"
        className="w-full text-xs py-2"
        onClick={resetFilters}
      >
        Reset Filters
      </Button>
    </>
  );
}
