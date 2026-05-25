import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Toaster } from "sonner";

import PublicLayout from "./components/layout/PublicLayout";
import AppLayout from "./components/layout/AppLayout";

// ── Public / Marketing ────────────────────────────────
const Landing       = lazy(() => import("./pages/public/Landing"));
const Features      = lazy(() => import("./pages/public/Features"));
const Pricing       = lazy(() => import("./pages/public/Pricing"));
const About         = lazy(() => import("./pages/public/About"));
const Contact       = lazy(() => import("./pages/public/Contact"));
const Changelog     = lazy(() => import("./pages/public/Changelog"));
const Blog          = lazy(() => import("./pages/public/Blog"));
const BlogPost      = lazy(() => import("./pages/public/BlogPost"));
const UseCases      = lazy(() => import("./pages/public/UseCases"));
const UseCaseDetail = lazy(() => import("./pages/public/UseCaseDetail"));

// ── Legal ─────────────────────────────────────────────
const Privacy  = lazy(() => import("./pages/legal/Privacy"));
const Terms    = lazy(() => import("./pages/legal/Terms"));
const Cookies  = lazy(() => import("./pages/legal/Cookies"));
const Refund   = lazy(() => import("./pages/legal/Refund"));
const Security = lazy(() => import("./pages/legal/Security"));
const DPA      = lazy(() => import("./pages/legal/DPA"));

// ── Auth — Clerk-hosted pages ─────────────────────────
const SignInPage = lazy(() => import("./pages/auth/SignInPage"));
const SignUpPage = lazy(() => import("./pages/auth/SignUpPage"));

// ── Onboarding ────────────────────────────────────────
const Onboarding = lazy(() => import("./pages/onboarding/Onboarding"));

// ── App (protected) ───────────────────────────────────
const Dashboard   = lazy(() => import("./pages/app/Dashboard"));
const Orders      = lazy(() => import("./pages/app/Orders"));
const OrderDetail = lazy(() => import("./pages/app/OrderDetail"));
const Extract     = lazy(() => import("./pages/app/Extract"));

// ── Errors ────────────────────────────────────────────
const NotFound    = lazy(() => import("./pages/errors/NotFound"));
const ServerError = lazy(() => import("./pages/errors/ServerError"));
const Maintenance = lazy(() => import("./pages/errors/Maintenance"));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas-cream">
      <div className="w-6 h-6 rounded-full border-2 border-shade-30 border-t-ink animate-spin" />
    </div>
  );
}

function S({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
}

const router = createBrowserRouter([
  // ── Public (navbar + footer) ────────────────────────
  {
    element: <PublicLayout />,
    children: [
      { path: "/",              element: <S><Landing /></S> },
      { path: "/features",      element: <S><Features /></S> },
      { path: "/pricing",       element: <S><Pricing /></S> },
      { path: "/about",         element: <S><About /></S> },
      { path: "/contact",       element: <S><Contact /></S> },
      { path: "/changelog",     element: <S><Changelog /></S> },
      { path: "/blog",          element: <S><Blog /></S> },
      { path: "/blog/:slug",    element: <S><BlogPost /></S> },
      { path: "/use-cases",     element: <S><UseCases /></S> },
      { path: "/use-cases/:id", element: <S><UseCaseDetail /></S> },
      { path: "/privacy",       element: <S><Privacy /></S> },
      { path: "/terms",         element: <S><Terms /></S> },
      { path: "/cookies",       element: <S><Cookies /></S> },
      { path: "/refund",        element: <S><Refund /></S> },
      { path: "/security",      element: <S><Security /></S> },
      { path: "/dpa",           element: <S><DPA /></S> },
    ],
  },

  // ── Auth — Clerk renders the UI ──────────────────────
  { path: "/sign-in/*", element: <S><SignInPage /></S> },
  { path: "/sign-up/*", element: <S><SignUpPage /></S> },

  // ── Onboarding (post-signup, pre-app) ───────────────
  { path: "/onboard", element: <S><Onboarding /></S> },

  // ── App (protected by AppLayout auth guard) ─────────
  {
    element: <AppLayout />,
    children: [
      { path: "/dashboard",  element: <S><Dashboard /></S> },
      { path: "/orders",     element: <S><Orders /></S> },
      { path: "/orders/:id", element: <S><OrderDetail /></S> },
      { path: "/extract",    element: <S><Extract /></S> },
    ],
  },

  // ── Utility ─────────────────────────────────────────
  { path: "/maintenance", element: <S><Maintenance /></S> },
  { path: "/500",         element: <S><ServerError /></S> },
  { path: "*",            element: <S><NotFound /></S> },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontFamily: "Inter, sans-serif",
            fontSize: "14px",
            fontWeight: 500,
            borderRadius: "9999px",
            padding: "12px 20px",
          },
        }}
      />
    </>
  );
}
