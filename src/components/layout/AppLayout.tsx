import { Outlet, Navigate } from "react-router";
import { useAuth } from "@clerk/clerk-react";
import AppSidebar from "./AppSidebar";
import ScrollToTop from "../shared/ScrollToTop";

function Spinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas-cream">
      <div className="w-6 h-6 rounded-full border-2 border-shade-30 border-t-ink animate-spin" />
    </div>
  );
}

export default function AppLayout() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) return <Spinner />;
  if (!isSignedIn) return <Navigate to="/sign-in" replace />;

  const onboarded = localStorage.getItem("onboarded");
  if (!onboarded) return <Navigate to="/onboard" replace />;

  return (
    <div className="flex min-h-screen bg-canvas-cream">
      <ScrollToTop />
      <AppSidebar />
      <main className="flex-1 min-w-0 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
