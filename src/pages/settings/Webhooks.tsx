import { useState } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Plus, Trash2, Play, ChevronDown, ChevronUp } from "lucide-react";
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

const allEvents = [
  { id: "order.created", label: "order.created", desc: "Fired when an order is extracted" },
  { id: "order.updated", label: "order.updated", desc: "Fired when an order status changes" },
  { id: "job.completed", label: "job.completed", desc: "Async extraction job finished" },
  { id: "job.failed", label: "job.failed", desc: "Async extraction job failed" },
];

interface Webhook {
  id: string;
  url: string;
  events: string[];
  active: boolean;
}

const deliveryLogs = [
  { id: "d1", url: "https://api.example.com/hooks", status: 200, ts: "2025-05-25 09:14" },
  { id: "d2", url: "https://api.example.com/hooks", status: 200, ts: "2025-05-25 08:52" },
  { id: "d3", url: "https://hook2.example.com/snap", status: 502, ts: "2025-05-25 07:30" },
  { id: "d4", url: "https://api.example.com/hooks", status: 200, ts: "2025-05-24 21:10" },
  { id: "d5", url: "https://hook2.example.com/snap", status: 200, ts: "2025-05-24 18:45" },
];

const initialWebhooks: Webhook[] = [
  { id: "w1", url: "https://api.example.com/hooks/snapdo", events: ["order.created", "job.completed"], active: true },
  { id: "w2", url: "https://hook2.example.com/snap", events: ["job.failed"], active: false },
];

interface WebhookForm {
  url: string;
}

export default function Webhooks() {
  const [webhooks, setWebhooks] = useState<Webhook[]>(initialWebhooks);
  const [addOpen, setAddOpen] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [logsOpen, setLogsOpen] = useState(false);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<WebhookForm>();

  function toggleEvent(id: string) {
    setSelectedEvents((prev) => prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]);
  }

  function onAddWebhook(data: WebhookForm) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        if (selectedEvents.length === 0) {
          toast.error("Select at least one event");
          resolve();
          return;
        }
        setWebhooks((prev) => [...prev, { id: `w${Date.now()}`, url: data.url, events: selectedEvents, active: true }]);
        setAddOpen(false);
        setSelectedEvents([]);
        reset();
        toast.success("Webhook added");
        resolve();
      }, 700);
    });
  }

  function handleDelete() {
    if (!deleteId) return;
    setDeleting(true);
    setTimeout(() => {
      setWebhooks((prev) => prev.filter((w) => w.id !== deleteId));
      setDeleteId(null);
      setDeleting(false);
      toast.success("Webhook removed");
    }, 700);
  }

  function handleTest(wh: Webhook) {
    toast.success(`Test ping sent to ${wh.url.slice(0, 30)}...`);
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
          <h1 className="text-heading-xl text-ink">Webhooks</h1>
          <Button variant="primary" size="sm" onClick={() => setAddOpen(true)}>
            <Plus size={16} />
            Add webhook
          </Button>
        </div>

        <div className="flex flex-col gap-5">
          <div className="bg-canvas-light rounded-xl border border-hairline-light shadow-elev-3 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-hairline-light">
                  <th className="text-left text-eyebrow text-shade-50 px-6 py-4">URL</th>
                  <th className="text-left text-eyebrow text-shade-50 px-6 py-4 hidden md:table-cell">Events</th>
                  <th className="text-left text-eyebrow text-shade-50 px-6 py-4">Status</th>
                  <th className="px-6 py-4" />
                </tr>
              </thead>
              <tbody>
                {webhooks.map((wh, i) => (
                  <tr key={wh.id} className={i < webhooks.length - 1 ? "border-b border-hairline-light" : ""}>
                    <td className="px-6 py-4">
                      <p className="text-caption text-ink font-mono truncate max-w-[180px]">{wh.url}</p>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {wh.events.map((e) => (
                          <span key={e} className="text-micro text-shade-50 bg-shade-30 rounded-pill px-2 py-0.5">{e}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-micro rounded-pill px-2 py-0.5 ${wh.active ? "bg-aloe text-ink" : "bg-shade-30 text-shade-50"}`}>
                        {wh.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleTest(wh)} className="text-shade-50 hover:text-ink transition-colors">
                          <Play size={14} />
                        </button>
                        <button onClick={() => setDeleteId(wh.id)} className="text-red-400 hover:text-red-600 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-canvas-light rounded-xl border border-hairline-light shadow-elev-3 overflow-hidden">
            <button
              onClick={() => setLogsOpen((v) => !v)}
              className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-shade-30/50 transition-colors"
            >
              <span className="text-heading-md text-ink">Delivery logs</span>
              {logsOpen ? <ChevronUp size={18} className="text-shade-50" /> : <ChevronDown size={18} className="text-shade-50" />}
            </button>
            {logsOpen && (
              <div className="border-t border-hairline-light">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-hairline-light">
                      <th className="text-left text-eyebrow text-shade-50 px-6 py-3">Endpoint</th>
                      <th className="text-left text-eyebrow text-shade-50 px-6 py-3">Status</th>
                      <th className="text-left text-eyebrow text-shade-50 px-6 py-3">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deliveryLogs.map((log, i) => (
                      <tr key={log.id} className={i < deliveryLogs.length - 1 ? "border-b border-hairline-light" : ""}>
                        <td className="px-6 py-3 text-micro text-shade-50 font-mono truncate max-w-[180px]">{log.url}</td>
                        <td className="px-6 py-3">
                          <span className={`text-micro font-[600] ${log.status >= 400 ? "text-red-500" : "text-green-600"}`}>
                            {log.status}
                          </span>
                        </td>
                        <td className="px-6 py-3 text-micro text-shade-40">{log.ts}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      <Dialog.Root open={addOpen} onOpenChange={setAddOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm" />
          <Dialog.Content className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-canvas-light rounded-xl shadow-elev-4 p-6 focus:outline-none">
            <Dialog.Title className="text-heading-md text-ink mb-1">Add webhook</Dialog.Title>
            <Dialog.Description className="text-caption text-shade-50 mb-5">
              We'll POST a JSON payload to this URL when selected events fire.
            </Dialog.Description>
            <form onSubmit={handleSubmit(onAddWebhook)} className="flex flex-col gap-4">
              <Input
                label="Endpoint URL"
                placeholder="https://your-server.com/hooks/snapdo"
                error={errors.url?.message}
                {...register("url", { required: "URL is required" })}
              />

              <div className="flex flex-col gap-2">
                <label className="text-caption text-ink font-[500]">Events</label>
                {allEvents.map((ev) => (
                  <label key={ev.id} className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedEvents.includes(ev.id)}
                      onChange={() => toggleEvent(ev.id)}
                      className="mt-0.5 accent-ink"
                    />
                    <div>
                      <p className="text-caption text-ink">{ev.label}</p>
                      <p className="text-micro text-shade-50">{ev.desc}</p>
                    </div>
                  </label>
                ))}
              </div>

              <div className="flex justify-end gap-3 mt-2">
                <Dialog.Close asChild>
                  <Button variant="outline-light" size="sm" type="button">Cancel</Button>
                </Dialog.Close>
                <Button variant="primary" size="sm" type="submit" loading={isSubmitting}>
                  Add webhook
                </Button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => { if (!open) setDeleteId(null); }}
        title="Remove webhook?"
        description="This webhook will stop receiving events immediately."
        confirmLabel="Remove"
        onConfirm={handleDelete}
        destructive
        loading={deleting}
      />
    </div>
  );
}
