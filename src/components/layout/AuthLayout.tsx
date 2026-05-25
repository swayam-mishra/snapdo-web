import { Outlet } from "react-router";
import { Link } from "react-router";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-canvas-cream flex flex-col">
      <header className="px-6 py-5">
        <Link to="/" className="text-heading-md text-ink font-[500]">
          Snapdo
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <Outlet />
      </main>
      <footer className="px-6 py-5 text-center">
        <p className="text-micro text-shade-40">
          © {new Date().getFullYear()} Snapdo ·{" "}
          <Link to="/privacy" className="hover:text-ink transition-colors">Privacy</Link>
          {" · "}
          <Link to="/terms" className="hover:text-ink transition-colors">Terms</Link>
        </p>
      </footer>
    </div>
  );
}
