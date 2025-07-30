import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-[#466cf4]">Shopella</h3>
            <p className="text-gray-300 leading-relaxed">
              Your credit-powered e-commerce platform. Access instant wallet loans and shop top products with the best
              deals.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#466cf4] transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#466cf4] transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#466cf4] transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-[#466cf4] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/stores" className="text-gray-300 hover:text-[#466cf4] transition-colors">
                  Stores
                </Link>
              </li>
              <li>
                <Link href="/deals" className="text-gray-300 hover:text-[#466cf4] transition-colors">
                  Shopella Deals
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-[#466cf4] transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-gray-300 hover:text-[#466cf4] transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-300 hover:text-[#466cf4] transition-colors">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-300 hover:text-[#466cf4] transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-[#466cf4] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-[#466cf4]" />
                <span className="text-gray-300">support@shopella.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-[#466cf4]" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-[#466cf4]" />
                <span className="text-gray-300">123 Commerce St, City, State 12345</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Responsive Adjustments */}
        <div className="md:hidden space-y-6">
          {/* Newsletter Signup */}
          <div className="bg-gray-900 p-6 rounded-lg">
            <h4 className="text-lg font-semibold mb-3">Stay Updated</h4>
            <p className="text-gray-300 mb-4">Subscribe to get special offers and updates.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#466cf4]"
              />
              <button className="bg-[#466cf4] hover:bg-[#3a5ce0] text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">© 2024 Shopella. All rights reserved.</div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-[#466cf4] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-[#466cf4] transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-[#466cf4] transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
