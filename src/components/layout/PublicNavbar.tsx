import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { clsx } from "clsx";
import Button from "../ui/Button";

interface PublicNavbarProps {
  dark?: boolean;
}

const navLinks = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
];

export default function PublicNavbar({ dark = false }: PublicNavbarProps) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav
      className={clsx(
        "sticky top-0 z-50 w-full",
        dark ? "bg-canvas-night border-b border-hairline-dark" : "bg-canvas-light border-b border-hairline-light"
      )}
    >
      <div className="mx-auto max-w-[1440px] px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span
            className={clsx(
              "font-display text-[20px] font-[500] tracking-tight",
              dark ? "text-on-primary" : "text-ink"
            )}
          >
            Snapdo
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={clsx(
                "text-body-md transition-colors",
                dark
                  ? isActive(link.href) ? "text-on-primary" : "text-shade-40 hover:text-on-primary"
                  : isActive(link.href) ? "text-ink" : "text-shade-50 hover:text-ink"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/sign-in">
            <Button variant={dark ? "outline-dark" : "outline-light"} size="sm">
              Log in
            </Button>
          </Link>
          <Link to="/sign-up">
            <Button variant="primary" size="sm">
              Get started
            </Button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open
            ? <X size={20} className={dark ? "text-on-primary" : "text-ink"} />
            : <Menu size={20} className={dark ? "text-on-primary" : "text-ink"} />
          }
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className={clsx(
            "md:hidden border-t px-6 py-4 flex flex-col gap-4",
            dark ? "bg-canvas-night border-hairline-dark" : "bg-canvas-light border-hairline-light"
          )}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setOpen(false)}
              className={clsx(
                "text-body-md",
                dark ? "text-shade-40 hover:text-on-primary" : "text-shade-50 hover:text-ink"
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 pt-2 border-t border-hairline-light">
            <Link to="/sign-in" onClick={() => setOpen(false)}>
              <Button variant={dark ? "outline-dark" : "outline-light"} size="sm" className="w-full justify-center">
                Log in
              </Button>
            </Link>
            <Link to="/sign-up" onClick={() => setOpen(false)}>
              <Button variant="primary" size="sm" className="w-full justify-center">
                Get started
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
