import Link from "next/link";

export default function HelpPage() {
  return (
    <main className="min-h-screen bg-[#F6F4EE] px-6 py-16 lg:px-16 font-sans text-stone-800">
      <div className="mx-auto max-w-4xl rounded-3xl border border-stone-200 bg-white p-8 shadow-sm md:p-12">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-stone-400">HELP</p>
        <h1 className="font-serif text-4xl text-stone-900 md:text-5xl">Need Assistance?</h1>

        <div className="mt-8 space-y-5 text-sm leading-7 text-stone-600">
          <p>Our team is available to answer questions about products, consultations, orders, and wellness guidance.</p>
          <p>For urgent or product-specific questions, please reach out directly through our contact details and support channels.</p>
        </div>

        <div className="mt-10">
          <Link href="/contact" className="rounded-full bg-[#2D5A43] px-5 py-3 text-sm font-semibold text-white">
            Get support
          </Link>
        </div>
      </div>
    </main>
  );
}
