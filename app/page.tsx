import Header from "@/components/Header"
import HeroSection from "@/components/HeroSection"
import BrandCategory from "@/components/BrandCategory"
import ProductGrid from "@/components/ProductGrid"
import CategorySection from "@/components/CategorySection"
import AdBanner from "@/components/AdBanner"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header Component - Sticky navigation with logo, menu, and auth buttons */}
      <Header />

      {/* Hero Section - Two-column layout with CTA and hero image */}
      <HeroSection />


      {/* Category Section - Grid of product categories with icons */}
      <CategorySection />

    
      {/* Product Grid - Sliding product showcase with modal view */}
      <ProductGrid />

      {/* Ad Banner - Three rotating promotional banners */}
      <AdBanner />

      {/* Second Product Grid - Additional products showcase */}
      <ProductGrid />

      {/* Footer - Comprehensive site links and contact info */}
      <Footer />
    </div>
  )
}
