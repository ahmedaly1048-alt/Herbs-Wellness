"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ShieldAlert, Lock, Minus, Plus, HeartHandshake } from "lucide-react";

import ShopNavbar from "@/src/components/ShopNavbar";
import Footer from "@/src/components/Footer";
import WhatsAppButton from "@/src/components/WhatsAppButton";
import {Product} from "@/src/types/product";

export default function ProductClientView({ product }: { product: Product }) {
  // Handle state for variable vs simple products
  const [selectedVariant, setSelectedVariant] = useState(
    product.isVariable && product.variants ? product.variants[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("formula");

  // Price calculation
  const currentPrice = selectedVariant ? selectedVariant.price : (product.price || 0);
  const formattedPrice = (currentPrice * quantity).toLocaleString();

  return (
    <div className="min-h-screen bg-stone-50/50 text-stone-800 font-sans flex flex-col justify-between">
      <div>
        <ShopNavbar />

        <main className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 py-10 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Image Gallery */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
                <Image
                  src={product.images[0] || "/placeholder-product.jpg"}
                  alt={product.title}
                  fill
                  className="object-cover"
                  priority
                />
                {product.requiresConsultation && (
                  <div className="absolute top-4 left-4 bg-[#093212] text-amber-300 text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    <Lock className="w-3 h-3" /> Consultation Required
                  </div>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase text-[#125821]">HERBS & WELLNESS</span>
                <h1 className="text-3xl font-serif text-stone-900 mt-1">{product.title}</h1>
                <p className="text-sm text-stone-500 italic">{product.subtitle}</p>
              </div>

              <p className="text-sm text-stone-600 font-light">{product.description}</p>

              {/* Variant Selector (Only renders if product has variations) */}
              {product.isVariable && product.variants && (
                <div className="space-y-3">
                  <span className="text-xs font-semibold uppercase text-stone-500">Select Option:</span>
                  <div className="grid grid-cols-1 gap-2">
                    {product.variants.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(v)}
                        className={`flex justify-between p-3.5 rounded-xl border text-left text-xs ${
                          selectedVariant?.id === v.id
                            ? "border-[#125821] bg-[#125821]/5 font-bold"
                            : "border-stone-200 bg-white"
                        }`}
                      >
                        <span>{v.name}</span>
                        <span className="text-[#125821]">₦{v.price.toLocaleString()}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Price & Cart Actions */}
              <div className="bg-stone-100/70 p-5 rounded-2xl flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-stone-500 block">Total Price</span>
                  <span className="text-2xl font-bold text-stone-900">₦{formattedPrice}</span>
                </div>

                {product.requiresConsultation ? (
                  <Link
                    href="/hub/consultation"
                    className="bg-[#093212] hover:bg-[#125821] text-white text-xs font-semibold px-6 py-3.5 rounded-xl flex items-center gap-2"
                  >
                    <HeartHandshake className="w-4 h-4 text-amber-300" />
                    <span>Book Consultation to Purchase</span>
                  </Link>
                ) : (
                  <button className="bg-[#125821] hover:bg-[#0e461a] text-white text-xs font-semibold px-6 py-3.5 rounded-xl">
                    Add to Cart
                  </button>
                )}
              </div>
            </div>

          </div>
        </main>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}