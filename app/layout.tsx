import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/components/ProductGrid"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Shopella - Credit-Powered E-commerce Platform",
  description: "Access instant wallet loans and shop top products with the best deals",
    generator: ''
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
