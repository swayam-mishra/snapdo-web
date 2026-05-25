import { useState } from "react";
import { Link, useLocation } from "react-router";
import { LayoutDashboard, ShoppingCart, Zap, ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { UserButton, useClerk } from "@clerk/clerk-react";
import { clsx } from "clsx";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Orders", href: "/orders", icon: ShoppingCart },
  { label: "Extract", href: "/extract", icon: Zap },
  { label: "Orders", href: "/orders", icon: ShoppingCart },
];

export default function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();
  const { signOut } = useClerk();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <aside
      className={clsx(
        "shrink-0 h-screen sticky top-0 bg-canvas-light border-r border-hairline-light flex flex-col transition-all duration-200",
        collapsed ? "w-16" : "w-56"
      )}
    >
      {/* Logo */}
      <div className={clsx("h-16 flex items-center border-b border-hairline-light px-4", collapsed ? "justify-center" : "justify-between")}>
        {!collapsed && (
          <Link to="/dashboard" className="text-heading-md text-ink font-[500]">
            Snapdo
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-md hover:bg-shade-30 transition-colors text-shade-50"
          aria-label="Toggle sidebar"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Main nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        <div className="flex flex-col gap-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                className={clsx(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-body-md",
                  active
                    ? "bg-ink text-on-primary"
                    : "text-shade-50 hover:bg-shade-30 hover:text-ink",
                  collapsed && "justify-center"
                )}
                title={collapsed ? item.label : undefined}
              >
                <Icon size={16} className="shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </div>

      </nav>

      {/* User + sign out */}
      <div className="border-t border-hairline-light p-3 flex flex-col gap-1">
        <div className={clsx("flex items-center gap-3 px-3 py-2", collapsed && "justify-center")}>
          <UserButton afterSignOutUrl="/" />
          {!collapsed && <span className="text-caption text-shade-50">Account</span>}
        </div>
        <button
          onClick={() => signOut({ redirectUrl: "/" })}
          className={clsx(
            "flex items-center gap-3 px-3 py-2 rounded-md text-shade-50 hover:text-ink hover:bg-shade-30 transition-colors text-body-md w-full",
            collapsed && "justify-center"
          )}
          title={collapsed ? "Sign out" : undefined}
        >
          <LogOut size={16} className="shrink-0" />
          {!collapsed && <span>Sign out</span>}
        </button>
      </div>
    </aside>
  );
}
