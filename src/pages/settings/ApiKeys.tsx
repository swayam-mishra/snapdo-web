import { useState } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Plus, Copy, Trash2, Key } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import ConfirmDialog from "../../components/shared/ConfirmDialog";

const settingsNav = [
  { label: "Profile", to: "/settings/profile" },
  { label: "Organization", to: "/settings/organization" },
  { label: "API Keys", to: "/settings/api-keys" },
  { label: "Webhooks", to: "/settings/webhooks" },
  { label: "Billing", to: "/settings/billing" },
  { label: "Notifications", to: "/settings/notifications" },
];

interface ApiKey {
  id: string;
  name: string;
  created: string;
  lastUsed: string;
  masked: string;
}

const initialKeys: ApiKey[] = [
  { id: "k1", name: "Production", created: "12 Jan 2025", lastUsed: "2 hours ago", masked: "sk_live_...K8mX" },
  { id: "k2", name: "Staging", created: "5 Feb 2025", lastUsed: "3 days ago", masked: "sk_live_...P3nY" },
  { id: "k3", name: "Local dev", created: "20 Mar 2025", lastUsed: "Never", masked: "sk_live_...Q7rZ" },
];

interface CreateForm {
  name: string;
}

export default function ApiKeys() {
  const [keys, setKeys] = useState<ApiKey[]>(initialKeys);
  const [createOpen, setCreateOpen] = useState(false);
  const [newKey, setNewKey] = useState<string | null>(null);
  const [revokeId, setRevokeId] = useState<string | null>(null);
  const [revoking, setRevoking] = useState(false);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<CreateForm>();

  function onCreateKey(_data: CreateForm) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const generated = `sk_live_${Math.random().toString(36).slice(2, 18)}${Math.random().toString(36).slice(2, 18)}`;
        setNewKey(generated);
        resolve();
      }, 700);
    });
  }

  function handleCloseCreate() {
    if (newKey) {
      const masked = `sk_live_...${newKey.slice(-4)}`;
      const formData = { id: `k${Date.now()}`, name: "New key", created: "Today", lastUsed: "Never", masked };
      setKeys((prev) => [...prev, formData]);
    }
    setCreateOpen(false);
    setNewKey(null);
    reset();
  }

  function handleRevoke() {
    if (!revokeId) return;
    setRevoking(true);
    setTimeout(() => {
      setKeys((prev) => prev.filter((k) => k.id !== revokeId));
      setRevokeId(null);
      setRevoking(false);
      toast.success("API key revoked");
    }, 700);
  }

  function copyKey(value: string) {
    navigator.clipboard.writeText(value);
    toast.success("Copied to clipboard");
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

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-heading-xl text-ink">API Keys</h1>
          <Button variant="primary" size="sm" onClick={() => setCreateOpen(true)}>
            <Plus size={16} />
            Create new key
          </Button>
        </div>

        <div className="bg-canvas-light rounded-xl border border-hairline-light shadow-elev-3 overflow-hidden">
          {keys.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-shade-30 flex items-center justify-center mb-4">
                <Key size={20} className="text-shade-50" />
              </div>
              <p className="text-heading-md text-ink">No API keys</p>
              <p className="text-caption text-shade-50 mt-1">Create your first key to get started.</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-hairline-light">
                  <th className="text-left text-eyebrow text-shade-50 px-6 py-4">Name</th>
                  <th className="text-left text-eyebrow text-shade-50 px-6 py-4 hidden sm:table-cell">Created</th>
                  <th className="text-left text-eyebrow text-shade-50 px-6 py-4 hidden md:table-cell">Last used</th>
                  <th className="text-left text-eyebrow text-shade-50 px-6 py-4">Key</th>
                  <th className="px-6 py-4" />
                </tr>
              </thead>
              <tbody>
                {keys.map((key, i) => (
                  <tr key={key.id} className={i < keys.length - 1 ? "border-b border-hairline-light" : ""}>
                    <td className="px-6 py-4 text-body-md text-ink font-[500]">{key.name}</td>
                    <td className="px-6 py-4 text-caption text-shade-50 hidden sm:table-cell">{key.created}</td>
                    <td className="px-6 py-4 text-caption text-shade-50 hidden md:table-cell">{key.lastUsed}</td>
                    <td className="px-6 py-4 text-micro text-shade-40 font-mono">{key.masked}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setRevokeId(key.id)}
                        className="text-caption text-red-500 hover:text-red-700 transition-colors flex items-center gap-1"
                      >
                        <Trash2 size={14} />
                        Revoke
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Dialog.Root open={createOpen} onOpenChange={(open) => { if (!open) handleCloseCreate(); else setCreateOpen(true); }}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm" />
          <Dialog.Content className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-canvas-light rounded-xl shadow-elev-4 p-6 focus:outline-none">
            <Dialog.Title className="text-heading-md text-ink mb-1">Create API key</Dialog.Title>
            <Dialog.Description className="text-caption text-shade-50 mb-5">
              Give your key a descriptive name to remember where it's used.
            </Dialog.Description>

            {!newKey ? (
              <form onSubmit={handleSubmit(onCreateKey)} className="flex flex-col gap-4">
                <Input
                  label="Key name"
                  placeholder="e.g. Production server"
                  error={errors.name?.message}
                  {...register("name", { required: "Name is required" })}
                />
                <div className="flex justify-end gap-3 mt-2">
                  <Dialog.Close asChild>
                    <Button variant="outline-light" size="sm" type="button">Cancel</Button>
                  </Dialog.Close>
                  <Button variant="primary" size="sm" type="submit" loading={isSubmitting}>
                    Generate key
                  </Button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="bg-aloe/20 border border-aloe rounded-lg px-4 py-3">
                  <p className="text-micro text-shade-60 mb-2 font-[500]">Copy this key now — it will only be shown once.</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-micro font-mono text-ink break-all">{newKey}</code>
                    <button
                      onClick={() => copyKey(newKey)}
                      className="shrink-0 w-8 h-8 rounded-lg bg-shade-30 flex items-center justify-center hover:bg-shade-40 transition-colors"
                    >
                      <Copy size={14} className="text-shade-50" />
                    </button>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button variant="primary" size="sm" onClick={handleCloseCreate}>Done</Button>
                </div>
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <ConfirmDialog
        open={!!revokeId}
        onOpenChange={(open) => { if (!open) setRevokeId(null); }}
        title="Revoke API key?"
        description="Any integrations using this key will stop working immediately."
        confirmLabel="Revoke key"
        onConfirm={handleRevoke}
        destructive
        loading={revoking}
      />
    </div>
  );
}
