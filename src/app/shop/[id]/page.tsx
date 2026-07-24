'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';
import CartDrawer from '@/components/shop/CartDrawer';
import ModelViewer from '@/components/3d/ModelViewer';
import { products } from '@/lib/data';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/lib/store';
import { ChevronLeft, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;

  const product = products.find((p) => p.id === productId);

  const { addItem, setCartOpen } = useCartStore();
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="relative min-h-screen bg-warm-white flex flex-col justify-between">
        <Navigation />
        <main className="flex-grow flex items-center justify-center pt-28 pb-16 px-4">
          <div className="text-center glass-panel p-10 max-w-md">
            <h2 className="text-2xl font-[family-name:var(--font-display)] font-bold text-espresso mb-4">
              Product Not Found
            </h2>
            <p className="text-charcoal/60 text-sm mb-6">
              The product you are looking for does not exist or has been removed from our boutique catalog.
            </p>
            <Link
              href="/shop"
              className="bg-gold text-espresso font-semibold py-3 px-6 rounded-full text-xs uppercase tracking-wider hover:bg-gold-dark transition-colors inline-block"
            >
              Back to Shop
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      product_id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      size: selectedSize,
      color: selectedColor,
    });
    setCartOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-warm-white flex flex-col justify-between">
      <Navigation />
      <CartDrawer />

      <main className="flex-grow pt-28 pb-16 px-4 md:px-8 max-w-7xl mx-auto w-full">
        {/* Back Link button */}
        <button
          onClick={() => router.push('/shop')}
          className="flex items-center gap-2 text-espresso/60 hover:text-espresso font-semibold text-xs uppercase tracking-wider mb-8 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Shop Collection</span>
        </button>

        {/* Product Details Split view */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Left: 3D model visualizer panel */}
          <div className="w-full">
            <ModelViewer productName={product.name} />
          </div>

          {/* Right: details info */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-terracotta mb-2 block">
                {product.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-[family-name:var(--font-display)] font-bold text-espresso mb-2">
                {product.name}
              </h1>
              <p className="text-gold-dark font-extrabold text-2xl">
                {formatPrice(product.price)}
              </p>
            </div>

            <p className="text-charcoal/70 text-sm leading-relaxed font-[family-name:var(--font-body)]">
              {product.description}
            </p>

            <div className="h-[1px] bg-espresso/5 my-2" />

            {/* Colors picker */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-espresso/50">
                Color Options
              </span>
              <div className="flex gap-2">
                {product.colors.map((col) => (
                  <button
                    key={col}
                    onClick={() => setSelectedColor(col)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider border cursor-pointer transition-all ${
                      selectedColor === col
                        ? 'bg-espresso text-cream border-espresso font-bold'
                        : 'border-espresso/15 text-espresso/70 hover:bg-cream/40'
                    }`}
                  >
                    {col}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes picker */}
            <div className="flex flex-col gap-2 mt-2">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-espresso/50">
                Size Options
              </span>
              <div className="flex gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider border cursor-pointer transition-all ${
                      selectedSize === sz
                        ? 'bg-espresso text-cream border-espresso font-bold'
                        : 'border-espresso/15 text-espresso/70 hover:bg-cream/40'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector & Add to Cart button */}
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center border border-espresso/15 rounded-xl bg-cream/10">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 text-espresso/60 hover:bg-cream/45 rounded-l-xl"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-4 font-bold text-sm text-espresso select-none">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 text-espresso/60 hover:bg-cream/45 rounded-r-xl"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                id="detail-add-cart-btn"
                onClick={handleAddToCart}
                className="flex-grow bg-gold hover:bg-gold-dark text-espresso font-semibold py-4 rounded-xl transition-all duration-300 hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer text-sm shadow-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Shopping Cart</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
