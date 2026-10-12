import Link from "next/link";

export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-[#F6F4EE] px-6 py-16 lg:px-16 font-sans text-stone-800">
      <div className="mx-auto max-w-4xl rounded-3xl border border-stone-200 bg-white p-8 shadow-sm md:p-12">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-stone-400">SHIPPING</p>
        <h1 className="font-serif text-4xl text-stone-900 md:text-5xl">Shipping Information</h1>

        <div className="mt-8 space-y-5 text-sm leading-7 text-stone-600">
          <p>
            We aim to process and dispatch orders promptly. Delivery timelines may vary depending on your location and shipping method.
          </p>
          <p>
            Orders within Nigeria are typically dispatched using reliable delivery partners. International orders may also be accommodated based on destination and delivery availability.
          </p>
          <p>
            Customers will receive order updates once their purchase is confirmed and shipped.
          </p>
        </div>

        <div className="mt-10">
          <Link href="/shop" className="rounded-full bg-[#2D5A43] px-5 py-3 text-sm font-semibold text-white">
            Continue shopping
          </Link>
        </div>
      </div>
    </main>
  );
}
