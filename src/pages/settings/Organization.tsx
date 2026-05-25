import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import { Building2 } from "lucide-react";
import Button from "../../components/ui/Button";
import PillTag from "../../components/ui/PillTag";
import ConfirmDialog from "../../components/shared/ConfirmDialog";

const settingsNav = [
  { label: "Profile", to: "/settings/profile" },
  { label: "Organization", to: "/settings/organization" },
  { label: "API Keys", to: "/settings/api-keys" },
  { label: "Webhooks", to: "/settings/webhooks" },
  { label: "Billing", to: "/settings/billing" },
  { label: "Notifications", to: "/settings/notifications" },
];

export default function Organization() {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  function handleDelete() {
    setDeleting(true);
    setTimeout(() => {
      setDeleting(false);
      setDeleteOpen(false);
      toast.error("Organization deleted");
    }, 1200);
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

        <h1 className="text-heading-xl text-ink mb-6">Organization</h1>

        <div className="flex flex-col gap-5">
          <div className="bg-canvas-light rounded-xl border border-hairline-light shadow-elev-3 p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-shade-30 flex items-center justify-center shrink-0">
                <Building2 size={22} className="text-shade-50" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="text-heading-md text-ink">Ramesh Traders</h2>
                  <PillTag variant="mint">Free</PillTag>
                </div>
                <p className="text-caption text-shade-50 mt-0.5">Created 12 Jan 2025</p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-caption text-shade-50">Organization name</span>
                <span className="text-body-md text-ink">Ramesh Traders</span>
              </div>
              <div className="h-px bg-hairline-light" />
              <div className="flex flex-col gap-1">
                <span className="text-caption text-shade-50">Organization ID</span>
                <span className="text-body-md text-ink font-mono text-shade-60 text-[13px]">org_01J9X2K8M3N5P7Q4R6S0T1U2V</span>
              </div>
              <div className="h-px bg-hairline-light" />
              <div className="flex flex-col gap-1">
                <span className="text-caption text-shade-50">Current plan</span>
                <div className="flex items-center gap-2">
                  <PillTag variant="mint">Free</PillTag>
                  <Link to="/settings/billing" className="text-caption text-link-cool-1 hover:text-ink transition-colors">
                    Upgrade plan →
                  </Link>
                </div>
              </div>
              <div className="h-px bg-hairline-light" />
              <div className="flex flex-col gap-1">
                <span className="text-caption text-shade-50">Members</span>
                <span className="text-body-md text-ink">1 member</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-red-200 bg-red-50 p-6">
            <h2 className="text-heading-md text-red-700 mb-2">Danger zone</h2>
            <p className="text-caption text-red-600 mb-4">
              Deleting your organization will permanently remove all orders, invoices, customers, and API keys. This action cannot be undone.
            </p>
            <Button
              variant="primary"
              size="sm"
              className="bg-red-600 hover:bg-red-700"
              onClick={() => setDeleteOpen(true)}
            >
              Delete organization
            </Button>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete organization?"
        description="This will permanently delete your organization, all data, and revoke all API keys. This cannot be undone."
        confirmLabel="Delete forever"
        onConfirm={handleDelete}
        destructive
        loading={deleting}
      />
    </div>
  );
}
