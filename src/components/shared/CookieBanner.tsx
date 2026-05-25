import { useState, useEffect } from "react";
import { Link } from "react-router";
import Button from "../ui/Button";

const STORAGE_KEY = "snapdo_cookie_consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem(STORAGE_KEY, "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="mx-auto max-w-2xl bg-canvas-light border border-hairline-light rounded-xl shadow-elev-4 p-5 flex flex-col md:flex-row items-start md:items-center gap-4">
        <p className="flex-1 text-caption text-shade-50">
          We use cookies for session auth and analytics. See our{" "}
          <Link to="/cookies" className="text-ink underline hover:no-underline">
            Cookie Policy
          </Link>
          .
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <Button variant="outline-light" size="sm" onClick={reject}>
            Reject
          </Button>
          <Button variant="primary" size="sm" onClick={accept}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
