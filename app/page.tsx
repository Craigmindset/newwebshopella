import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import BrandCategory from "@/components/BrandCategory";
import AdBanner2 from "@/components/AdBanner2";
import ThreeColumnAd from "@/components/ThreeColumnAd";
import ProductGrid from "@/components/ProductGrid";
import CategorySection from "@/components/CategorySection";
import TestimonialGrid from "@/components/TestimonialGrid";
import NewsletterFooterDivider from "@/components/NewsletterFooterDivider";
import NewsLetter from "@/components/NewsLetter";
import AdBanner from "@/components/AdBanner";
import Footer from "@/components/Footer";

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

      {/* Brand Category - Grid of brand logos with links */}
      <AdBanner2 />

      {/* Ad Banner - Three rotating promotional banners */}
      <ThreeColumnAd />

      {/* Ad Banner - Three rotating promotional banners */}
      <AdBanner />

      {/* Testimonial Grid - Customer reviews and ratings */}

      <TestimonialGrid />

      {/* Newsletter Signup - Email subscription form */}
      <NewsLetter />

      <NewsletterFooterDivider />

      {/* Footer - Comprehensive site links and contact info */}
      <Footer />
    </div>
  );
}
