import { Link } from "react-router";
import { clsx } from "clsx";

interface PublicFooterProps {
  dark?: boolean;
}

const footerSections = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Use cases",
    links: [
      { label: "Kirana stores", href: "/use-cases/kirana" },
      { label: "Distributors", href: "/use-cases/distributor" },
      { label: "Tiffin services", href: "/use-cases/tiffin" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
      { label: "Security", href: "/security" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Cookies", href: "/cookies" },
      { label: "Refund policy", href: "/refund" },
      { label: "DPA", href: "/dpa" },
    ],
  },
];

export default function PublicFooter({ dark = false }: PublicFooterProps) {
  return (
    <footer
      className={clsx(
        "w-full",
        dark ? "bg-canvas-night" : "bg-canvas-light border-t border-hairline-light"
      )}
    >
      <div className="mx-auto max-w-[1440px] px-6 pt-16 pb-8">
        {/* Top row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 pb-12 border-b border-hairline-dark">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <span className={clsx("font-display text-[20px] font-[500]", dark ? "text-on-primary" : "text-ink")}>
              Snapdo
            </span>
            <p className={clsx("mt-3 text-caption max-w-[180px]", dark ? "text-link-cool-1" : "text-shade-50")}>
              WhatsApp order management for Indian businesses.
            </p>
          </div>

          {/* Link columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <p className={clsx("text-caption font-[500] mb-4", dark ? "text-on-primary" : "text-ink")}>
                {section.title}
              </p>
              <ul className="flex flex-col gap-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className={clsx(
                        "text-caption transition-colors",
                        dark
                          ? "text-link-cool-1 hover:text-on-primary"
                          : "text-shade-50 hover:text-ink"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className={clsx("text-micro", dark ? "text-link-cool-2" : "text-shade-40")}>
            © {new Date().getFullYear()} Snapdo. All rights reserved.
          </p>
          <p className={clsx("text-micro", dark ? "text-link-cool-2" : "text-shade-40")}>
            Made in India 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  );
}
