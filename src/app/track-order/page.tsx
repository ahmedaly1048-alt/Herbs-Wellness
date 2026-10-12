import Link from "next/link";

export default function TrackOrderPage() {
  return (
    <main className="min-h-screen bg-[#F6F4EE] px-6 py-16 lg:px-16 font-sans text-stone-800">
      <div className="mx-auto max-w-4xl rounded-3xl border border-stone-200 bg-white p-8 shadow-sm md:p-12">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-stone-400">TRACK ORDER</p>
        <h1 className="font-serif text-4xl text-stone-900 md:text-5xl">Order Tracking</h1>

        <div className="mt-8 rounded-2xl bg-[#EEF4EE] p-6 text-sm text-stone-600">
          <p className="mb-3">We&apos;re preparing a dedicated tracking experience for your orders.</p>
          <p>Please contact our support team with your order details if you need a live update on your parcel.</p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/shop" className="rounded-full bg-[#2D5A43] px-5 py-3 text-sm font-semibold text-white">
            Continue shopping
          </Link>
          <Link href="/contact" className="rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-800">
            Contact support
          </Link>
        </div>
      </div>
    </main>
  );
}
