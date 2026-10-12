import Link from "next/link";

export default function IssuePage() {
  return (
    <main className="min-h-screen bg-[#F6F4EE] px-6 py-16 lg:px-16 font-sans text-stone-800">
      <div className="mx-auto max-w-4xl rounded-3xl border border-stone-200 bg-white p-8 shadow-sm md:p-12">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-stone-400">ISSUE</p>
        <h1 className="font-serif text-4xl text-stone-900 md:text-5xl">Report an Issue</h1>

        <div className="mt-8 space-y-5 text-sm leading-7 text-stone-600">
          <p>We want to resolve any concern quickly and respectfully.</p>
          <p>Please reach out to our support team with your order, product, or consultation details so we can review the issue and provide next steps.</p>
        </div>

        <div className="mt-10">
          <Link href="/contact" className="rounded-full bg-[#2D5A43] px-5 py-3 text-sm font-semibold text-white">
            Contact support
          </Link>
        </div>
      </div>
    </main>
  );
}
