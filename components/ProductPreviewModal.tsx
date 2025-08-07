import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export type ProductPreviewModalProps = {
  product: {
    id: number;
    name: string;
    price: number;
    brand: string;
    category: string;
    image: string;
    description?: string;
    gallery?: string[];
  };
  quantity: number;
  setQuantity: (q: number) => void;
  activeGalleryIdx: number;
  setActiveGalleryIdx: (idx: number) => void;
  onAddToCart: () => void;
  onClose: () => void;
};

const ProductPreviewModal: React.FC<ProductPreviewModalProps> = ({
  product,
  quantity,
  setQuantity,
  activeGalleryIdx,
  setActiveGalleryIdx,
  onAddToCart,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full overflow-hidden flex flex-row items-stretch p-0 relative">
        {/* Left: Gallery */}
        <div className="flex flex-col items-center justify-center bg-gray-50 p-6 min-w-[300px] max-w-[340px]">
          <Image
            src={
              product.gallery && product.gallery.length > 0
                ? product.gallery[activeGalleryIdx]
                : product.image || "/placeholder.svg"
            }
            alt={product.name}
            width={280}
            height={220}
            className="rounded object-contain mb-4 w-full h-[220px]"
          />
          {/* Gallery Thumbnails */}
          {product.gallery && product.gallery.length > 1 && (
            <div className="flex gap-2 mb-2">
              {product.gallery.map((img, idx) => (
                <button
                  key={img}
                  onClick={() => setActiveGalleryIdx(idx)}
                  className={`border rounded p-1 ${
                    activeGalleryIdx === idx
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  <Image
                    src={img && img !== "" ? img : "/placeholder.svg"}
                    alt={`Thumbnail ${idx + 1}`}
                    width={40}
                    height={40}
                    className="object-cover rounded"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        {/* Right: Details */}
        <div className="flex flex-col justify-between p-8 flex-1 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-black"
            style={{ position: "absolute", top: 16, right: 16 }}
          >
            ×
          </button>
          <div>
            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
            <p className="text-blue-600 font-bold text-xl mb-2">
              ₦{product.price.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500 mb-2">
              {product.brand} · {product.category}
            </p>
            <p className="text-sm text-gray-700 mb-4">
              {product.description || "No description available."}
            </p>
          </div>
          <div>
            <div className="flex items-center gap-4 mb-4">
              <label className="text-xs">Quantity:</label>
              <div className="flex items-center border rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3"
                >
                  -
                </button>
                <span className="px-4 border-x">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3"
                >
                  +
                </button>
              </div>
            </div>
            <Button
              onClick={onAddToCart}
              className="bg-blue-600 text-white px-6 py-2 w-full"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPreviewModal;
