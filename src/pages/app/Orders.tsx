import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Zap, ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import Button from "../../components/ui/Button";
import { TableSkeleton } from "../../components/shared/Skeleton";
import EmptyState from "../../components/shared/EmptyState";
import { useApi } from "../../hooks/useApi";
import type { Order } from "../../lib/api";

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

const statusFilters: { label: string; value: OrderStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Fulfilled", value: "fulfilled" },
  { label: "Cancelled", value: "cancelled" },
];

const PAGE_SIZE = 50;

function formatINR(value: number): string {
  return "₹" + value.toLocaleString("en-IN");
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function itemsSummary(items: Order["items"]): string {
  if (!items || items.length === 0) return "—";
  if (items.length === 1) return items[0].product_name;
  return `${items[0].product_name} and ${items.length - 1} more`;
}

export default function Orders() {
  const navigate = useNavigate();
  const api = useApi();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [offset, setOffset] = useState(0);

  async function load(currentOffset: number) {
    setLoading(true);
    try {
      const data = await api.get<{ orders: Order[] } | Order[]>(`/orders?limit=${PAGE_SIZE}&offset=${currentOffset}`);
      const list = Array.isArray(data) ? data : (data as { orders: Order[] }).orders ?? [];
      setOrders(list);
    } catch (err) {
      api.handleError(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(offset); }, [offset]);

  const filtered = statusFilter === "all"
    ? orders
    : orders.filter((o) => o.status === statusFilter);

  const hasPrev = offset > 0;
  const hasNext = orders.length === PAGE_SIZE;

  return (
    <div className="min-h-screen bg-canvas-cream pt-8 px-8 pb-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-heading-xl text-ink">Orders</h1>
            {!loading && (
              <span className="inline-flex items-center rounded-pill px-3 py-1 text-eyebrow bg-shade-30 text-ink">
                {filtered.length}
              </span>
            )}
          </div>
          <Button variant="primary" size="md" onClick={() => navigate("/extract")}>
            <Zap size={16} />
            Extract new
          </Button>
        </div>

        <div className="flex items-center gap-2 flex-wrap mb-6">
          {statusFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setStatusFilter(f.value)}
              className={`rounded-pill px-4 py-2 text-eyebrow transition-colors ${
                statusFilter === f.value
                  ? "bg-ink text-on-primary"
                  : "bg-canvas-light text-shade-50 border border-hairline-light hover:border-ink hover:text-ink"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="bg-canvas-light rounded-xl shadow-elev-3 overflow-hidden">
          {loading ? (
            <div className="p-6"><TableSkeleton rows={8} /></div>
          ) : filtered.length === 0 ? (
            <EmptyState
              icon={ShoppingCart}
              title="No orders yet"
              description="Extract your first order from a WhatsApp or SMS message."
              action={{ label: "Extract order", onClick: () => navigate("/extract") }}
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-hairline-light bg-canvas-cream">
                    <th className="text-left px-6 py-3 text-eyebrow text-shade-50">Customer</th>
                    <th className="text-left px-6 py-3 text-eyebrow text-shade-50">Items</th>
                    <th className="text-left px-6 py-3 text-eyebrow text-shade-50">Total</th>
                    <th className="text-left px-6 py-3 text-eyebrow text-shade-50">Status</th>
                    <th className="text-left px-6 py-3 text-eyebrow text-shade-50">Date</th>
                    <th className="px-6 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((order, i) => (
                    <tr
                      key={order.id}
                      className={`border-b border-hairline-light hover:bg-canvas-cream transition-colors ${i === filtered.length - 1 ? "border-b-0" : ""}`}
                    >
                      <td className="px-6 py-4 text-body-md text-ink font-[500]">{order.customer_name ?? "—"}</td>
                      <td className="px-6 py-4 text-caption text-shade-50 max-w-[200px] truncate">{itemsSummary(order.items)}</td>
                      <td className="px-6 py-4 text-body-md text-ink font-[500]">{order.total != null ? formatINR(Number(order.total)) : "—"}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center rounded-pill px-3 py-1 text-eyebrow ${statusStyles[order.status]}`}>
                          {statusLabels[order.status]}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-caption text-shade-50">{formatDate(order.created_at)}</td>
                      <td className="px-6 py-4">
                        <Button variant="outline-light" size="sm" onClick={() => navigate(`/orders/${order.id}`)}>
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!loading && (hasPrev || hasNext) && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-hairline-light">
              <span className="text-caption text-shade-50">
                Showing {offset + 1}–{offset + filtered.length}
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={() => setOffset((o) => Math.max(0, o - PAGE_SIZE))}
                  disabled={!hasPrev}
                >
                  <ChevronLeft size={14} />
                  Previous
                </Button>
                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={() => setOffset((o) => o + PAGE_SIZE)}
                  disabled={!hasNext}
                >
                  Next
                  <ChevronRight size={14} />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
