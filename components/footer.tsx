import Link from "next/link";
import Image from "next/image";

const shopLinks = [
  { label: "All Vehicles", href: "/vehicles" },
  { label: "Electric Bikes", href: "/electric-bikes" },
  { label: "Electric Scooters", href: "/electric-scooters" },
  { label: "All Brands", href: "/" },
  { label: "Compare Vehicles", href: "/compare" },
  { label: "Book a Test Ride", href: "/test-ride" },
];

const serviceLinks = [
  { label: "Find a Dealer", href: "/find-dealer" },
  { label: "Warranty Information", href: "/warranty" },
  { label: "After Sales / Service", href: "/after-sales" },
  { label: "Battery & Charging", href: "/battery-charging" },
  { label: "Accessories", href: "/accessories" },
  { label: "Spare Parts", href: "/spare-parts" },
  { label: "Service Booking", href: "/service-booking" },
];

const infoLinks = [
  { label: "FAQs", href: "/faq" },
  { label: "Blog & News", href: "/blog" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Shipping & Delivery", href: "/shipping-delivery" },
];

const brandLinks = [
  { label: "Okla Electric", href: "/brands/okla" },
  { label: "Ecruze", href: "/brands/ecruze" },
  { label: "EVINN", href: "/brands/evinn" },
  { label: "Jinpeng", href: "/brands/jinpeng" },
  { label: "Road-King", href: "/brands/road-king" },
  { label: "Crown-CMC", href: "/brands/crown-cmc" },
  { label: "United", href: "/brands/united" },
  { label: "Luyuan", href: "/brands/luyuan" },
];

const socialLinks = [
  { icon: "f", href: "https://facebook.com", label: "Facebook" },
  { icon: "◎", href: "https://instagram.com", label: "Instagram" },
  { icon: "▶", href: "https://youtube.com", label: "YouTube" },
  { icon: "in", href: "https://linkedin.com", label: "LinkedIn" },
  { icon: "X", href: "https://x.com", label: "X" },
];

const badges = [
  {
    icon: "🛡",
    title: "100% Secure",
    sub: "Secure Transactions",
  },
  {
    icon: "🚚",
    title: "Nationwide Delivery",
    sub: "Across Pakistan",
  },
  {
    icon: "✔",
    title: "Authorized Dealers",
    sub: "Genuine Products",
  },
  {
    icon: "🎧",
    title: "24/7 Support",
    sub: "We're Here to Help",
  },
];

export default function Footer() {
  return (
    <footer className="w-full overflow-hidden bg-[#0b0f14] text-[#cfd6dd]">
      <div className="mx-auto w-full max-w-[1600px] px-4 pt-10 sm:px-6 sm:pt-12 md:px-8 lg:px-10 xl:px-12 2xl:px-16">

        <div className="grid grid-cols-1 gap-10 pb-10 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 xl:grid-cols-6 xl:gap-8">
          
          <div className="min-w-0 sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="inline-block text-xl font-extrabold tracking-wide text-white transition-colors hover:text-lime-400 sm:text-2xl"
            >
              EV<span className="text-lime-400">INN</span>
            </Link>

            <div className="mb-3 mt-1 text-xs font-semibold tracking-wider text-lime-400 sm:text-sm">
              ELECTRIC MOBILITY MARKETPLACE
            </div>

            <p className="mb-5 max-w-sm text-sm leading-6 text-gray-400 sm:text-[15px]">
              Pakistan&apos;s trusted platform for electric bikes and
              scooters. Discover, compare, and choose the future of mobility.
            </p>

            <div className="flex flex-wrap gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-sm text-gray-300 transition-all duration-300 hover:border-lime-400/50 hover:text-lime-400 sm:h-10 sm:w-10"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="SHOP" links={shopLinks} />

          <FooterCol title="SERVICES" links={serviceLinks} />

          <FooterCol title="INFORMATION" links={infoLinks} />

          <FooterCol title="POPULAR BRANDS" links={brandLinks} />

          <div className="min-w-0 sm:col-span-2 lg:col-span-3 xl:col-span-1">
            <h4 className="mb-3.5 text-sm font-bold text-white sm:text-[15px]">
              NEWSLETTER
            </h4>

            <p className="mb-4 max-w-md text-sm leading-6 text-gray-400 sm:text-[15px]">
              Subscribe to get the latest updates, offers and EV news.
            </p>

            <form className="mb-5 flex w-full overflow-hidden rounded-md border border-white/10">
              <input
                type="email"
                placeholder="Enter your email"
                className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-white outline-none placeholder:text-gray-500"
              />

              <button
                type="submit"
                aria-label="Subscribe"
                className="flex w-11 shrink-0 items-center justify-center bg-lime-400 text-lg text-black transition-colors hover:bg-lime-300"
              >
                →
              </button>
            </form>

            <div className="grid grid-cols-2 gap-2">
              {badges.map((b) => (
                <div
                  key={b.title}
                  className="min-w-0 rounded-md border border-white/10 px-2 py-2.5 text-center"
                >
                  <div className="mb-1 text-base text-lime-400">
                    {b.icon}
                  </div>

                  <div className="text-[10px] text-gray-400 sm:text-[11px]">
                    <span className="block font-medium text-gray-300">
                      {b.title}
                    </span>

                    <span className="mt-0.5 block text-[9px] sm:text-[10px]">
                      {b.sub}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 border-t border-white/10 py-5 text-xs text-gray-400 sm:text-sm lg:flex-row lg:items-center lg:justify-between lg:gap-6">
          
          <div className="text-center lg:text-left">
            © 2024{" "}
            <Link
              href="/"
              className="font-semibold text-white transition-colors hover:text-lime-400"
            >
              EV<span className="text-lime-400">INN</span>
            </Link>
            . All Rights Reserved.
          </div>

          <div className="flex items-center justify-center gap-1.5">
            <span className="text-lime-400">✔</span>
            <span>Trusted by</span>
            <span className="font-semibold text-white">10K+</span>
            <span>Happy Customers</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <Image
              src="/visa.png"
              alt="Visa"
              width={55}
              height={32}
              className="h-7 w-auto object-contain"
            />

            <Image
              src="/meezan-bank.png"
              alt="Meezan Bank"
              width={70}
              height={32}
              className="h-7 w-auto object-contain"
            />

            <Image
              src="/easy-paisa.png"
              alt="Easypaisa"
              width={80}
              height={32}
              className="h-7 w-auto object-contain"
            />

            <Image
              src="/jazz-cash.jfif"
              alt="JazzCash"
              width={70}
              height={32}
              className="h-7 w-auto object-contain"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="min-w-0">
      <h4 className="mb-4 text-sm font-bold tracking-wide text-lime-400 sm:text-[15px]">
        {title}
      </h4>

      <ul className="flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.label} className="min-w-0">
            <Link
              href={link.href}
              className="block break-words text-sm leading-5 text-gray-400 transition-colors hover:text-lime-400 sm:text-[15px]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}