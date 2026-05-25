import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useForm, useFieldArray } from "react-hook-form";
import { ArrowLeft, ChevronDown, FileText, Download, Plus, Trash2, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import ConfirmDialog from "../../components/shared/ConfirmDialog";
import { Skeleton } from "../../components/shared/Skeleton";
import { useApi } from "../../hooks/useApi";
import type { Order, Invoice } from "../../lib/api";

type OrderStatus = "pending" | "confirmed" | "fulfilled" | "cancelled";

const statusStyles: Record<OrderStatus, string> = {
  pending: "bg-amber-100 text-amber-800",
  confirmed: "bg-blue-100 text-blue-800",
  fulfilled: "bg-[#E6FFDA] text-ink",
  cancelled: "bg-red-100 text-red-800",
};

const statusLabels: Record<OrderStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  fulfilled: "Fulfilled",
  cancelled: "Cancelled",
};

const confidenceStyle = (c: "high" | "medium" | "low") => {
  if (c === "high") return "bg-[#E6FFDA] text-ink";
  if (c === "medium") return "bg-pistachio text-ink";
  return "bg-red-100 text-red-800";
};

function formatINR(value: number): string {
  return "₹" + Number(value).toLocaleString("en-IN");
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

interface EditFormValues {
  customer_name: string;
  delivery_address: string;
  delivery_date: string;
  special_instructions: string;
  total: string;
  items: { product_name: string; quantity: number; price: string }[];
}

function PageSkeleton() {
  return (
    <div className="min-h-screen bg-canvas-cream pt-8 px-8 pb-12">
      <div className="max-w-6xl mx-auto">
        <Skeleton className="h-4 w-24 mb-6" />
        <Skeleton className="h-8 w-64 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Skeleton className="h-64 rounded-xl" />
            <Skeleton className="h-40 rounded-xl" />
          </div>
          <div className="flex flex-col gap-6">
            <Skeleton className="h-48 rounded-xl" />
            <Skeleton className="h-32 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const api = useApi();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [status, setStatus] = useState<OrderStatus>("pending");
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const [editOpen, setEditOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [generatingInvoice, setGeneratingInvoice] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  const { register, control, handleSubmit, reset } = useForm<EditFormValues>();
  const { fields, append, remove } = useFieldArray({ control, name: "items" });

  async function loadOrder() {
    if (!id) return;
    setLoading(true);
    setNotFound(false);
    try {
      const data = await api.get<Order>(`/orders/${id}`);
      setOrder(data);
      setStatus(data.status);
      setInvoice(data.invoice ?? null);
    } catch (err: unknown) {
      const e = err as { status?: number };
      if (e?.status === 404) setNotFound(true);
      else api.handleError(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadOrder(); }, [id]);

  function openEdit() {
    if (!order) return;
    reset({
      customer_name: order.customer_name ?? "",
      delivery_address: order.delivery_address ?? "",
      delivery_date: order.delivery_date ?? "",
      special_instructions: order.special_instructions ?? "",
      total: order.total != null ? String(order.total) : "",
      items: order.items.map((it) => ({
        product_name: it.product_name,
        quantity: it.quantity,
        price: it.price != null ? String(it.price) : "",
      })),
    });
    setEditOpen(true);
  }

  async function onSave(values: EditFormValues) {
    if (!id) return;
    setSaving(true);
    try {
      const updated = await api.patch<Order>(`/orders/${id}/edit`, {
        customer_name: values.customer_name,
        delivery_address: values.delivery_address || null,
        delivery_date: values.delivery_date || null,
        special_instructions: values.special_instructions || null,
        total: values.total ? Number(values.total) : null,
        items: values.items.map((it) => ({
          product_name: it.product_name,
          quantity: Number(it.quantity),
          price: it.price ? Number(it.price) : null,
        })),
      });
      setOrder(updated);
      setEditOpen(false);
      toast.success("Order updated.");
    } catch (err) {
      api.handleError(err);
    } finally {
      setSaving(false);
    }
  }

  async function handleStatusChange(newStatus: OrderStatus) {
    if (!id) return;
    setUpdatingStatus(true);
    try {
      await api.patch(`/orders/${id}`, { status: newStatus });
      setStatus(newStatus);
      toast.success(`Status updated to ${statusLabels[newStatus]}.`);
    } catch (err) {
      api.handleError(err);
    } finally {
      setUpdatingStatus(false);
    }
  }

  async function handleDelete() {
    if (!id) return;
    setDeleting(true);
    try {
      await api.del(`/orders/${id}`);
      toast.success("Order deleted.");
      navigate("/orders");
    } catch (err) {
      api.handleError(err);
      setDeleting(false);
    }
  }

  async function handleGenerateInvoice() {
    if (!id) return;
    setGeneratingInvoice(true);
    try {
      const res = await api.post<{ invoice: Invoice }>("/generate-invoice", { orderId: id });
      setInvoice(res.invoice ?? (res as unknown as Invoice));
      toast.success("Invoice generated.");
    } catch (err) {
      api.handleError(err);
    } finally {
      setGeneratingInvoice(false);
    }
  }

  async function handleDownloadPdf() {
    if (!id) return;
    setDownloadingPdf(true);
    try {
      await api.download(`/orders/${id}/download`, `invoice-${id}.pdf`);
    } catch {
      toast.error("Failed to download PDF.");
    } finally {
      setDownloadingPdf(false);
    }
  }

  if (loading) return <PageSkeleton />;

  if (notFound || !order) {
    return (
      <div className="min-h-screen bg-canvas-cream pt-8 px-8 pb-12">
        <div className="max-w-6xl mx-auto">
          <Link to="/orders" className="inline-flex items-center gap-1.5 text-caption text-shade-50 hover:text-ink transition-colors mb-6">
            <ArrowLeft size={14} />
            Orders
          </Link>
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <p className="text-heading-md text-ink">Order not found</p>
            <p className="text-body-md text-shade-50">This order doesn't exist or has been deleted.</p>
            <Button variant="outline-light" size="sm" onClick={() => navigate("/orders")}>Back to Orders</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas-cream pt-8 px-8 pb-12">
      <div className="max-w-6xl mx-auto">
        <Link to="/orders" className="inline-flex items-center gap-1.5 text-caption text-shade-50 hover:text-ink transition-colors mb-6">
          <ArrowLeft size={14} />
          Orders
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-heading-xl text-ink">{order.customer_name ?? "Order"}</h1>
            <span className={`inline-flex items-center rounded-pill px-3 py-1 text-eyebrow ${statusStyles[status]}`}>
              {statusLabels[status]}
            </span>
            <span className={`inline-flex items-center rounded-pill px-3 py-1 text-eyebrow ${confidenceStyle(order.confidence)}`}>
              {order.confidence} confidence
            </span>
          </div>
          <p className="text-caption text-shade-50">{formatDate(order.created_at)}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-canvas-light rounded-xl shadow-elev-3 overflow-hidden">
              <div className="px-6 py-4 border-b border-hairline-light">
                <h2 className="text-heading-md text-ink">Order Items</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-hairline-light bg-canvas-cream">
                      <th className="text-left px-6 py-3 text-eyebrow text-shade-50">Product</th>
                      <th className="text-right px-4 py-3 text-eyebrow text-shade-50">Qty</th>
                      <th className="text-right px-4 py-3 text-eyebrow text-shade-50">Unit Price</th>
                      <th className="text-right px-6 py-3 text-eyebrow text-shade-50">Line Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item, i) => (
                      <tr key={i} className="border-b border-hairline-light last:border-b-0">
                        <td className="px-6 py-4 text-body-md text-ink">{item.product_name}</td>
                        <td className="px-4 py-4 text-body-md text-ink text-right">{item.quantity}</td>
                        <td className="px-4 py-4 text-body-md text-ink text-right">
                          {item.price != null ? formatINR(Number(item.price)) : "—"}
                        </td>
                        <td className="px-6 py-4 text-body-md text-ink text-right font-[500]">
                          {item.price != null ? formatINR(Number(item.price) * item.quantity) : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  {order.total != null && (
                    <tfoot>
                      <tr className="border-t border-hairline-light bg-canvas-cream">
                        <td colSpan={3} className="px-6 py-3 text-body-strong text-ink text-right">Total</td>
                        <td className="px-6 py-3 text-body-strong text-ink text-right">{formatINR(Number(order.total))}</td>
                      </tr>
                    </tfoot>
                  )}
                </table>
              </div>
            </div>

            <div className="bg-canvas-light rounded-xl shadow-elev-3 p-6">
              <h2 className="text-heading-md text-ink mb-4">Order Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <p className="text-eyebrow text-shade-50 mb-1">Delivery Address</p>
                  <p className="text-body-md text-ink">{order.delivery_address ?? "—"}</p>
                </div>
                <div>
                  <p className="text-eyebrow text-shade-50 mb-1">Delivery Date</p>
                  <p className="text-body-md text-ink">{order.delivery_date ?? "—"}</p>
                </div>
                <div>
                  <p className="text-eyebrow text-shade-50 mb-1">Special Instructions</p>
                  <p className="text-body-md text-ink">{order.special_instructions ?? "—"}</p>
                </div>
              </div>
            </div>

            {editOpen && (
              <div className="bg-canvas-light rounded-xl shadow-elev-3 p-6">
                <h2 className="text-heading-md text-ink mb-6">Edit Order</h2>
                <form onSubmit={handleSubmit(onSave)} className="flex flex-col gap-5">
                  <Input label="Customer Name" {...register("customer_name")} />
                  <Input label="Delivery Address" {...register("delivery_address")} />
                  <Input label="Delivery Date" {...register("delivery_date")} placeholder="e.g. 2026-05-26" />
                  <Input label="Special Instructions" {...register("special_instructions")} />
                  <Input label="Total (₹)" {...register("total")} type="number" />

                  <div>
                    <p className="text-caption text-ink font-[500] mb-3">Items</p>
                    <div className="flex flex-col gap-3">
                      {fields.map((field, i) => (
                        <div key={field.id} className="flex items-end gap-2">
                          <div className="flex-1">
                            <Input label={i === 0 ? "Product" : undefined} {...register(`items.${i}.product_name`)} placeholder="Product name" />
                          </div>
                          <div className="w-20">
                            <Input label={i === 0 ? "Qty" : undefined} {...register(`items.${i}.quantity`)} type="number" placeholder="0" />
                          </div>
                          <div className="w-28">
                            <Input label={i === 0 ? "Price" : undefined} {...register(`items.${i}.price`)} type="number" placeholder="0.00" />
                          </div>
                          <button
                            type="button"
                            onClick={() => remove(i)}
                            className="mb-0.5 p-2 text-shade-40 hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => append({ product_name: "", quantity: 1, price: "" })}
                      className="mt-3 inline-flex items-center gap-1.5 text-caption text-shade-50 hover:text-ink transition-colors"
                    >
                      <Plus size={14} />
                      Add item
                    </button>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button type="submit" variant="primary" size="md" loading={saving}>Save changes</Button>
                    <Button type="button" variant="outline-light" size="md" onClick={() => setEditOpen(false)}>Cancel</Button>
                  </div>
                </form>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-canvas-light rounded-xl shadow-elev-3 p-6">
              <h2 className="text-heading-md text-ink mb-4">Actions</h2>
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-eyebrow text-shade-50 mb-2">Update Status</p>
                  <div className="relative">
                    <select
                      value={status}
                      disabled={updatingStatus}
                      onChange={(e) => handleStatusChange(e.target.value as OrderStatus)}
                      className="w-full appearance-none bg-canvas-cream text-body-md text-ink border border-hairline-light rounded-md px-3 py-[10px] pr-8 outline-none focus:border-ink cursor-pointer disabled:opacity-50"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="fulfilled">Fulfilled</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-shade-50 pointer-events-none" />
                  </div>
                </div>

                <div className="border-t border-hairline-light pt-4 flex flex-col gap-3">
                  {!editOpen && (
                    <Button variant="outline-light" size="md" className="w-full" onClick={openEdit}>
                      Edit Order
                    </Button>
                  )}
                  <Button
                    variant="outline-light"
                    size="md"
                    className="w-full text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() => setDeleteOpen(true)}
                  >
                    <Trash2 size={14} />
                    Delete Order
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-canvas-light rounded-xl shadow-elev-3 p-6">
              <h2 className="text-heading-md text-ink mb-4">Invoice</h2>
              {invoice ? (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <span className="text-eyebrow text-shade-50">Invoice No.</span>
                      <span className="text-caption text-ink font-mono">{invoice.invoice_number}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-eyebrow text-shade-50">Date</span>
                      <span className="text-caption text-ink">{invoice.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-eyebrow text-shade-50">Subtotal</span>
                      <span className="text-caption text-ink">{formatINR(invoice.subtotal)}</span>
                    </div>
                    {invoice.cgst != null && (
                      <div className="flex justify-between">
                        <span className="text-eyebrow text-shade-50">CGST</span>
                        <span className="text-caption text-ink">{formatINR(invoice.cgst)}</span>
                      </div>
                    )}
                    {invoice.sgst != null && (
                      <div className="flex justify-between">
                        <span className="text-eyebrow text-shade-50">SGST</span>
                        <span className="text-caption text-ink">{formatINR(invoice.sgst)}</span>
                      </div>
                    )}
                    {invoice.igst != null && (
                      <div className="flex justify-between">
                        <span className="text-eyebrow text-shade-50">IGST</span>
                        <span className="text-caption text-ink">{formatINR(invoice.igst)}</span>
                      </div>
                    )}
                    <div className="flex justify-between pt-2 border-t border-hairline-light">
                      <span className="text-body-strong text-ink">Total</span>
                      <span className="text-body-strong text-ink">{formatINR(invoice.total)}</span>
                    </div>
                  </div>
                  <Button variant="primary" size="md" loading={downloadingPdf} onClick={handleDownloadPdf}>
                    <Download size={14} />
                    Download PDF
                  </Button>
                  <button
                    onClick={handleGenerateInvoice}
                    className="text-caption text-shade-50 hover:text-ink underline underline-offset-2 transition-colors text-center"
                  >
                    <RefreshCw size={12} className="inline mr-1" />
                    Regenerate invoice
                  </button>
                </div>
              ) : (
                <Button
                  variant="primary"
                  size="md"
                  className="w-full"
                  loading={generatingInvoice}
                  onClick={handleGenerateInvoice}
                >
                  <FileText size={16} />
                  Generate Invoice
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete order?"
        description="This action cannot be undone. The order and any associated invoice will be permanently deleted."
        confirmLabel="Delete"
        onConfirm={handleDelete}
        destructive
        loading={deleting}
      />
    </div>
  );
}
