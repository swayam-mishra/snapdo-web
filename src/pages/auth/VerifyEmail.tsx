import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import Button from "../../components/ui/Button";

type State = "verifying" | "success" | "error";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const [state, setState] = useState<State>("verifying");

  useEffect(() => {
    const timer = setTimeout(() => {
      // Simulate token validation — replace with real API call
      const token = new URLSearchParams(window.location.search).get("token");
      setState(token ? "success" : "error");
      if (token) setTimeout(() => navigate("/dashboard"), 2000);
    }, 1200);
    return () => clearTimeout(timer);
  }, [navigate]);

  if (state === "verifying") {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 rounded-full border-2 border-shade-30 border-t-ink animate-spin" />
        <p className="text-body-md text-shade-50">Verifying your email…</p>
      </div>
    );
  }

  if (state === "success") {
    return (
      <div className="w-full max-w-sm text-center">
        <div className="w-14 h-14 rounded-full bg-aloe flex items-center justify-center mx-auto mb-5">
          <span className="text-2xl">✓</span>
        </div>
        <h1 className="text-heading-xl text-ink mb-2">Email verified!</h1>
        <p className="text-body-md text-shade-50">Redirecting you to the dashboard…</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm text-center">
      <div className="w-14 h-14 rounded-full bg-shade-30 flex items-center justify-center mx-auto mb-5">
        <span className="text-2xl">✗</span>
      </div>
      <h1 className="text-heading-xl text-ink mb-2">Link expired or invalid</h1>
      <p className="text-body-md text-shade-50 mb-6">
        This verification link is no longer valid. Request a new one.
      </p>
      <Link to="/login">
        <Button variant="primary" size="sm">Request new link</Button>
      </Link>
    </div>
  );
}
