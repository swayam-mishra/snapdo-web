import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import * as Switch from "@radix-ui/react-switch";
import Button from "../../components/ui/Button";

const settingsNav = [
  { label: "Profile", to: "/settings/profile" },
  { label: "Organization", to: "/settings/organization" },
  { label: "API Keys", to: "/settings/api-keys" },
  { label: "Webhooks", to: "/settings/webhooks" },
  { label: "Billing", to: "/settings/billing" },
  { label: "Notifications", to: "/settings/notifications" },
];

interface NotifItem {
  id: string;
  label: string;
  description: string;
}

const notifications: NotifItem[] = [
  { id: "new_order", label: "New order extracted", description: "Get notified when the AI successfully extracts a new order." },
  { id: "job_failed", label: "Job failed", description: "Alert when an async extraction job fails after all retries." },
  { id: "dlq_threshold", label: "DLQ threshold hit", description: "Notify when dead-letter queue exceeds 10 messages." },
  { id: "weekly_summary", label: "Weekly summary", description: "Receive a weekly email with order and revenue stats." },
  { id: "webhook_failures", label: "Webhook failures", description: "Alert when a webhook endpoint returns repeated errors." },
];

export default function Notifications() {
  const [prefs, setPrefs] = useState<Record<string, boolean>>({
    new_order: true,
    job_failed: true,
    dlq_threshold: false,
    weekly_summary: true,
    webhook_failures: false,
  });
  const [saving, setSaving] = useState(false);

  function toggle(id: string) {
    setPrefs((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function save() {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("Notification preferences saved");
    }, 700);
  }

  return (
    <div className="min-h-screen bg-canvas-cream px-6 py-8">
      <div className="max-w-3xl mx-auto">
        <nav className="flex flex-wrap gap-1 mb-8 bg-canvas-light rounded-pill border border-hairline-light p-1.5 shadow-elev-3">
          {settingsNav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="px-4 py-1.5 rounded-pill text-caption text-shade-50 hover:text-ink hover:bg-shade-30 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <h1 className="text-heading-xl text-ink mb-6">Notifications</h1>

        <div className="bg-canvas-light rounded-xl border border-hairline-light shadow-elev-3 overflow-hidden">
          {notifications.map((notif, i) => (
            <div
              key={notif.id}
              className={`flex items-center justify-between gap-4 px-6 py-5 ${i < notifications.length - 1 ? "border-b border-hairline-light" : ""}`}
            >
              <div className="flex-1">
                <p className="text-body-md text-ink font-[500]">{notif.label}</p>
                <p className="text-caption text-shade-50 mt-0.5">{notif.description}</p>
              </div>
              <Switch.Root
                checked={prefs[notif.id]}
                onCheckedChange={() => toggle(notif.id)}
                className={`relative inline-flex h-6 w-11 items-center rounded-pill transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ink ${
                  prefs[notif.id] ? "bg-ink" : "bg-shade-30"
                }`}
              >
                <Switch.Thumb className="block h-4 w-4 rounded-full bg-white shadow-sm transition-transform data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-1" />
              </Switch.Root>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-5">
          <Button variant="primary" size="md" onClick={save} loading={saving}>
            Save preferences
          </Button>
        </div>
      </div>
    </div>
  );
}
