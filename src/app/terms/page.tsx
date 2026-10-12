import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#F6F4EE] px-6 py-16 lg:px-16 font-sans text-stone-800">
      <div className="mx-auto max-w-4xl rounded-3xl border border-stone-200 bg-white p-8 shadow-sm md:p-12">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-stone-400">TERMS</p>
        <h1 className="font-serif text-4xl text-stone-900 md:text-5xl">Terms & Conditions</h1>

        <div className="mt-8 space-y-5 text-sm leading-7 text-stone-600">
          <p>
            By using our site, you agree to use our products and services for lawful purposes and in a manner consistent with our values and wellness focus.
          </p>
          <p>
            Product descriptions and wellness guidance are intended for educational and informational purposes. They are not a substitute for medical advice or individualized clinical care.
          </p>
          <p>
            We reserve the right to update product details, pricing, or service information at any time without prior notice.
          </p>
          <p>
            We do our best to provide clear guidance, but final care decisions remain the responsibility of each customer and their qualified healthcare provider.
          </p>
        </div>

        <div className="mt-10">
          <Link href="/" className="rounded-full bg-[#2D5A43] px-5 py-3 text-sm font-semibold text-white">
            Back home
          </Link>
        </div>
      </div>
    </main>
  );
}
