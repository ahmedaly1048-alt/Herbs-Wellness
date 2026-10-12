import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#F6F4EE] px-6 py-16 lg:px-16 font-sans text-stone-800">
      <div className="mx-auto max-w-4xl rounded-3xl border border-stone-200 bg-white p-8 shadow-sm md:p-12">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-stone-400">CONTACT</p>
        <h1 className="font-serif text-4xl text-stone-900 md:text-5xl">Let&apos;s Talk Wellness</h1>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="space-y-5 text-sm text-stone-600">
            <p>
              We’re here to help you find the right support for your wellness journey.
            </p>
            <p>
              Call us for natural wellness guidance, consultation bookings, and product support.
            </p>
            <div className="space-y-2">
              <p><strong className="text-stone-900">Phone:</strong> +234 706 483 6444</p>
              <p><strong className="text-stone-900">Email:</strong> info@herbsandwellnesshub.com</p>
              <p><strong className="text-stone-900">Location:</strong> Nigeria</p>
            </div>
          </div>

          <div className="rounded-2xl bg-[#EEF4EE] p-6">
            <h2 className="mb-4 text-lg font-semibold text-stone-900">Quick actions</h2>
            <div className="flex flex-col gap-3">
              <Link href="/hub/consultation" className="rounded-full bg-[#2D5A43] px-5 py-3 text-center text-sm font-semibold text-white">
                Book a consultation
              </Link>
              <Link href="/shop" className="rounded-full border border-stone-300 bg-white px-5 py-3 text-center text-sm font-semibold text-stone-800">
                Explore the shop
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
