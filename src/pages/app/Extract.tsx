import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { Zap, X, CheckCircle, AlertCircle, Download, Trash2, Edit2, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import Button from "../../components/ui/Button";
import { useApi } from "../../hooks/useApi";
import type { Order } from "../../lib/api";

type InputMode = "chat" | "single";

function parseMessages(raw: string): { sender: string; text: string }[] {
  return raw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      const i = line.indexOf(":");
      if (i === -1) return { sender: "Unknown", text: line };
      return { sender: line.slice(0, i).trim(), text: line.slice(i + 1).trim() };
    });
}

const confidenceStyle = (c: "high" | "medium" | "low") => {
  if (c === "high") return "bg-[#E6FFDA] text-ink";
  if (c === "medium") return "bg-pistachio text-ink";
  return "bg-red-100 text-red-800";
};

export default function Extract() {
  const navigate = useNavigate();
  const api = useApi();

  const [mode, setMode] = useState<InputMode>("single");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);

  const [editingCustomer, setEditingCustomer] = useState(false);
  const [customerDraft, setCustomerDraft] = useState("");
  const customerInputRef = useRef<HTMLInputElement>(null);

  const [invoiceResult, setInvoiceResult] = useState<{ invoice_number: string } | null>(null);
  const [generatingInvoice, setGeneratingInvoice] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [discarding, setDiscarding] = useState(false);

  async function handleExtract() {
    if (!input.trim()) {
      toast.error("Please paste a message to extract.");
      return;
    }
    setLoading(true);
    setOrder(null);
    setInvoiceResult(null);
    try {
      let result: Order;
      if (mode === "chat") {
        const messages = parseMessages(input);
        result = await api.post<Order>("/extract-order", { messages });
      } else {
        result = await api.post<Order>("/extract", { message: input });
      }
      setOrder(result);
    } catch (err) {
      api.handleError(err);
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    setInput("");
    setOrder(null);
    setInvoiceResult(null);
  }

  function startEditCustomer() {
    setCustomerDraft(order?.customer_name ?? "");
    setEditingCustomer(true);
    setTimeout(() => customerInputRef.current?.focus(), 0);
  }

  function saveCustomer() {
    if (order) setOrder({ ...order, customer_name: customerDraft });
    setEditingCustomer(false);
  }

  async function handleGenerateInvoice() {
    if (!order) return;
    setGeneratingInvoice(true);
    try {
      const res = await api.post<{ invoice_number: string }>("/generate-invoice", { orderId: order.id });
      setInvoiceResult(res);
      toast.success("Invoice generated");
    } catch (err) {
      api.handleError(err);
    } finally {
      setGeneratingInvoice(false);
    }
  }

  async function handleDownloadPdf() {
    if (!order) return;
    setDownloadingPdf(true);
    try {
      await api.download(`/orders/${order.id}/download`, `invoice-${order.id}.pdf`);
    } catch {
      toast.error("Failed to download PDF.");
    } finally {
      setDownloadingPdf(false);
    }
  }

  async function handleDiscard() {
    if (!order) return;
    setDiscarding(true);
    try {
      await api.del(`/orders/${order.id}`);
      setOrder(null);
      setInvoiceResult(null);
      toast.success("Order discarded.");
    } catch (err) {
      api.handleError(err);
    } finally {
      setDiscarding(false);
    }
  }

  return (
    <div className="min-h-screen bg-canvas-cream pt-8 px-8 pb-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <p className="text-eyebrow text-shade-50 mb-1">Power user tool</p>
          <h1 className="text-heading-xl text-ink">Extract Order</h1>
        </div>

        <div className="flex gap-1 p-1 bg-canvas-light rounded-pill border border-hairline-light w-fit mb-8 shadow-elev-3">
          {(["single", "chat"] as InputMode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`rounded-pill px-5 py-2 text-caption transition-all duration-150 ${
                mode === m ? "bg-ink text-on-primary shadow-elev-3" : "text-shade-50 hover:text-ink"
              }`}
            >
              {m === "single" ? "Single message" : "Chat log"}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            <div className="bg-canvas-light rounded-xl shadow-elev-3 p-6">
              <div className="flex items-center justify-between mb-3">
                <label className="text-heading-md text-ink">
                  {mode === "single" ? "Paste message" : "Paste chat log"}
                </label>
                {input && (
                  <button
                    onClick={handleClear}
                    className="inline-flex items-center gap-1 text-micro text-shade-50 hover:text-ink transition-colors"
                  >
                    <X size={12} />
                    Clear
                  </button>
                )}
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  mode === "single"
                    ? "Paste a WhatsApp/SMS order message here…"
                    : 'Paste a chat log here (format: "Name: message" per line)…'
                }
                className="w-full min-h-[220px] bg-canvas-cream text-ink text-body-md rounded-lg border border-hairline-light px-4 py-3 outline-none focus:border-ink focus:ring-1 focus:ring-ink placeholder:text-shade-40 transition-colors resize-none font-body leading-relaxed"
              />
              <div className="flex items-center justify-end mt-4">
                <Button variant="primary" size="md" loading={loading} onClick={handleExtract}>
                  <Zap size={16} />
                  Extract order
                </Button>
              </div>
            </div>

            {mode === "chat" && (
              <div className="bg-canvas-cream rounded-xl border border-hairline-light p-5">
                <p className="text-caption text-shade-50 leading-relaxed">
                  In chat log mode, paste the full conversation thread. Each line should be in "Name: message" format. Snapdo will parse the conversation and extract the order.
                </p>
              </div>
            )}
          </div>

          <AnimatePresence>
            {(loading || order) && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="flex flex-col gap-4"
              >
                {loading ? (
                  <div className="bg-canvas-light rounded-xl shadow-elev-3 p-8 flex flex-col items-center justify-center gap-3 min-h-[300px]">
                    <div className="w-8 h-8 rounded-full border-2 border-shade-30 border-t-ink animate-spin" />
                    <p className="text-caption text-shade-50">Claude is reading your chat…</p>
                  </div>
                ) : order && (
                  <>
                    <div className="bg-canvas-light rounded-xl shadow-elev-3 overflow-hidden">
                      <div className="flex items-center justify-between px-6 py-4 border-b border-hairline-light">
                        <div className="flex items-center gap-2">
                          <CheckCircle size={16} className="text-ink" />
                          <h2 className="text-heading-md text-ink">Extracted Order</h2>
                        </div>
                        <span className={`inline-flex items-center rounded-pill px-3 py-1 text-eyebrow ${confidenceStyle(order.confidence)}`}>
                          {order.confidence} confidence
                        </span>
                      </div>

                      <div className="p-6 border-b border-hairline-light">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-eyebrow text-shade-50 mb-1">Customer</p>
                            {editingCustomer ? (
                              <div className="flex items-center gap-2">
                                <input
                                  ref={customerInputRef}
                                  value={customerDraft}
                                  onChange={(e) => setCustomerDraft(e.target.value)}
                                  onKeyDown={(e) => { if (e.key === "Enter") saveCustomer(); if (e.key === "Escape") setEditingCustomer(false); }}
                                  className="flex-1 bg-canvas-cream text-ink text-body-md rounded border border-ink px-2 py-1 outline-none"
                                />
                                <button onClick={saveCustomer} className="text-ink hover:text-shade-60">
                                  <Check size={14} />
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 group">
                                <p className="text-body-md text-ink font-[500]">{order.customer_name ?? "—"}</p>
                                <button
                                  onClick={startEditCustomer}
                                  className="opacity-0 group-hover:opacity-100 transition-opacity text-shade-40 hover:text-ink"
                                >
                                  <Edit2 size={12} />
                                </button>
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="text-eyebrow text-shade-50 mb-1">Delivery Address</p>
                            <p className="text-body-md text-ink">{order.delivery_address ?? "—"}</p>
                          </div>
                          {order.delivery_date && (
                            <div>
                              <p className="text-eyebrow text-shade-50 mb-1">Delivery Date</p>
                              <p className="text-body-md text-ink">{order.delivery_date}</p>
                            </div>
                          )}
                          {order.special_instructions && (
                            <div className="col-span-2">
                              <p className="text-eyebrow text-shade-50 mb-1">Special Instructions</p>
                              <p className="text-body-md text-ink">{order.special_instructions}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-hairline-light bg-canvas-cream">
                              <th className="text-left px-6 py-3 text-eyebrow text-shade-50">Product</th>
                              <th className="text-right px-4 py-3 text-eyebrow text-shade-50">Qty</th>
                              <th className="text-right px-6 py-3 text-eyebrow text-shade-50">Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.items.map((item, i) => (
                              <tr key={i} className="border-b border-hairline-light last:border-b-0">
                                <td className="px-6 py-3 text-body-md text-ink">{item.product_name}</td>
                                <td className="px-4 py-3 text-caption text-ink text-right">{item.quantity}</td>
                                <td className="px-6 py-3 text-caption text-ink text-right">
                                  {item.price != null ? `₹${Number(item.price).toLocaleString("en-IN")}` : "—"}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr className="border-t border-hairline-light bg-canvas-cream">
                              <td colSpan={2} className="px-6 py-3 text-body-strong text-ink text-right">Total</td>
                              <td className="px-6 py-3 text-body-strong text-ink text-right">
                                {order.total != null ? `₹${Number(order.total).toLocaleString("en-IN")}` : "—"}
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>

                      {order.special_instructions && (
                        <div className="px-6 py-4 border-t border-hairline-light bg-canvas-cream">
                          <div className="flex items-start gap-2">
                            <AlertCircle size={14} className="text-shade-50 mt-0.5 shrink-0" />
                            <p className="text-micro text-shade-50">{order.special_instructions}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {invoiceResult ? (
                      <div className="bg-canvas-light rounded-xl shadow-elev-3 p-5 flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                          <CheckCircle size={16} className="text-ink" />
                          <p className="text-body-md text-ink font-[500]">Invoice {invoiceResult.invoice_number} generated</p>
                        </div>
                        <Button
                          variant="outline-light"
                          size="sm"
                          loading={downloadingPdf}
                          onClick={handleDownloadPdf}
                        >
                          <Download size={14} />
                          Download PDF
                        </Button>
                      </div>
                    ) : (
                      <div className="flex gap-3">
                        <Button variant="primary" size="md" loading={generatingInvoice} onClick={handleGenerateInvoice}>
                          Generate Invoice
                        </Button>
                        <Button variant="outline-light" size="md" onClick={() => navigate(`/orders/${order.id}`)}>
                          Edit before confirming
                        </Button>
                        <Button variant="outline-light" size="md" loading={discarding} onClick={handleDiscard}>
                          <Trash2 size={14} />
                          Discard
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
