import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#F6F4EE] px-6 py-16 lg:px-16 font-sans text-stone-800">
      <div className="mx-auto max-w-4xl rounded-3xl border border-stone-200 bg-white p-8 shadow-sm md:p-12">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-stone-400">PRIVACY</p>
        <h1 className="font-serif text-4xl text-stone-900 md:text-5xl">Privacy Policy</h1>

        <div className="mt-8 space-y-5 text-sm leading-7 text-stone-600">
          <p>
            We respect your privacy and are committed to protecting the personal information you share with us.
          </p>
          <p>
            Information collected may include your name, contact information, order details, and wellness-related preferences. This information is used to support your purchases, consultations, and communication with our team.
          </p>
          <p>
            We do not sell your personal information. We may share information only when required for order fulfillment, secure payment processing, or necessary service support.
          </p>
          <p>
            You may contact us at any time to request updates, corrections, or deletion of personally identifiable information where permitted by law.
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
