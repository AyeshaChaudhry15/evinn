import Link from "next/link";
import Image from "next/image";

const shopLinks = [
  { label: "All Vehicles", href: "/vehicles" },
  { label: "Electric Bikes", href: "/electric-bikes" },
  { label: "Electric Scooters", href: "/electric-scooters" },
  { label: "All Brands", href: "/brands" },
  { label: "All Models", href: "/model-detail" },
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
  { label: "Blog / News", href: "/blog" },
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
    <footer className="bg-[#0b0f14] text-[#cfd6dd] px-5 sm:px-8 lg:px-12 xl:px-16 pt-12">
      <div className="flex flex-wrap justify-between gap-x-8 gap-y-10 pb-9">
        <div className="flex-1 min-w-[220px] max-w-[260px]">
          <Link
            href="/"
            className="text-xl font-extrabold text-white tracking-wide inline-block"
          >
            EV<span className="text-lime-400">INN</span>
          </Link>

          <div className="text-lime-400 text-sm font-semibold tracking-wider mt-1 mb-3">
            ELECTRIC MOBILITY MARKETPLACE
          </div>

          <p className="text-md text-gray-400 leading-relaxed mb-4">
            Pakistan&apos;s trusted platform for electric bikes and scooters.
            Discover, compare, and choose the future of mobility.
          </p>

          <div className="flex gap-2.5">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-9 h-9 rounded-full border-2 border-white/10 flex items-center justify-center text-md text-gray-300 hover:text-lime-400 hover:border-lime-400/50 transition-all duration-300"
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

        <div className="flex-1 min-w-[280px] max-w-[320px]">
          <h4 className="text-white text-md font-bold mb-3.5">NEWSLETTER</h4>

          <p className="text-md text-gray-400 leading-relaxed mb-4">
            Subscribe to get the latest updates, offers and EV news.
          </p>

          <form className="flex border border-white/10 rounded-md overflow-hidden mb-5">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 min-w-0 bg-transparent outline-none px-3 py-2.5 text-md text-white placeholder:text-gray-500"
            />

            <button
              type="submit"
              className="bg-lime-400 px-4 flex items-center justify-center text-black hover:bg-lime-300 transition-colors"
            >
              →
            </button>
          </form>

          <div className="grid grid-cols-2 gap-2.5">
            {badges.map((b) => (
              <div
                key={b.title}
                className="min-w-0 border border-white/10 rounded-md text-center px-2 py-2.5"
              >
                <div className="text-lime-400 text-base mb-1">{b.icon}</div>

                <div className="text-[11px] text-gray-400 ">
                  <span className="block font-medium text-gray-300">
                    {b.title}
                  </span>

                  <span className="block mt-0.5 text-[10px]">{b.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-md text-gray-400">
        <div className="text-center sm:text-left">
          © 2024{" "}
          <Link
            href="/"
            className="text-white font-semibold hover:text-lime-400 transition-colors"
          >
            EV<span className="text-lime-400">INN</span>
          </Link>
          . All Rights Reserved.
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-lime-400">✔</span>
          Trusted by <span className="text-white font-semibold">10K+</span>{" "}
          Happy Customers
        </div>

        <div className="flex flex-wrap justify-center items-center gap-2">
          <Image
            src="/visa.jfif"
            alt="Visa"
            width={55}
            height={32}
            className="h-7 w-auto object-contain"
          />

          <Image
            src="/meezan-bank.webp"
            alt="Meezan Bank"
            width={70}
            height={32}
            className="h-7 w-auto object-contain"
          />

          <Image
            src="/easy-paisa.jfif"
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
    <div className="flex-1 min-w-[140px]">
      <h4 className="text-lime-400 text-[15px] font-bold tracking-wide mb-4">
        {title}
      </h4>

      <ul className="flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-md text-gray-400 hover:text-lime-400 transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
