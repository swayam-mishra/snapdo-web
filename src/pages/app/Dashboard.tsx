import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Zap, ShoppingCart, TrendingUp, IndianRupee, Clock, ArrowRight, RefreshCw } from "lucide-react";
import Button from "../../components/ui/Button";
import { CardSkeleton, TableSkeleton } from "../../components/shared/Skeleton";
import EmptyState from "../../components/shared/EmptyState";
import { useApi } from "../../hooks/useApi";
import type { Stats, Order } from "../../lib/api";

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

function formatINR(value: number): string {
  return "₹" + value.toLocaleString("en-IN");
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function itemsSummary(items: Order["items"]): string {
  if (!items || items.length === 0) return "—";
  if (items.length === 1) return items[0].product_name;
  return `${items[0].product_name} + ${items.length - 1} more`;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const api = useApi();

  const [stats, setStats] = useState<Stats | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [statsLoading, setStatsLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [error, setError] = useState(false);

  async function load() {
    setStatsLoading(true);
    setOrdersLoading(true);
    setError(false);
    try {
      const [statsData, ordersData] = await Promise.all([
        api.get<Stats>("/stats"),
        api.get<{ orders: Order[] }>("/orders?limit=5&offset=0"),
      ]);
      setStats(statsData);
      setOrders(ordersData.orders ?? (ordersData as unknown as Order[]));
    } catch (err) {
      api.handleError(err);
      setError(true);
    } finally {
      setStatsLoading(false);
      setOrdersLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const statCards = stats
    ? [
        { label: "Total Orders", value: String(stats.total_orders), icon: <ShoppingCart size={18} className="text-shade-50" />, sub: "All time" },
        { label: "Pending Orders", value: String(stats.pending_orders), icon: <Clock size={18} className="text-shade-50" />, sub: "Needs attention" },
        { label: "Confirmed Orders", value: String(stats.confirmed_orders), icon: <TrendingUp size={18} className="text-shade-50" />, sub: "In progress" },
        { label: "Total Revenue", value: formatINR(stats.total_revenue), icon: <IndianRupee size={18} className="text-shade-50" />, sub: "All time" },
      ]
    : [];

  return (
    <div className="min-h-screen bg-canvas-cream pt-8 px-8 pb-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-eyebrow text-shade-50 mb-1">Dashboard</p>
            <h1 className="text-heading-xl text-ink">Overview</h1>
          </div>
          <Button variant="primary" size="md" onClick={() => navigate("/extract")}>
            <Zap size={16} />
            Extract new order
          </Button>
        </div>

        {error ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <p className="text-body-md text-shade-50">Failed to load dashboard data.</p>
            <Button variant="outline-light" size="sm" onClick={load}>
              <RefreshCw size={14} />
              Retry
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {statsLoading
                ? Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
                : statCards.map((card) => (
                    <div key={card.label} className="bg-canvas-light rounded-xl shadow-elev-3 p-6 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-caption text-shade-50">{card.label}</span>
                        {card.icon}
                      </div>
                      <p className="text-heading-xl text-ink">{card.value}</p>
                      <p className="text-micro text-shade-40">{card.sub}</p>
                    </div>
                  ))}
            </div>

            <div className="bg-canvas-light rounded-xl shadow-elev-3 overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-hairline-light">
                <h2 className="text-heading-md text-ink">Recent Orders</h2>
                <span className="text-caption text-shade-50">Last 5 orders</span>
              </div>

              {ordersLoading ? (
                <div className="p-6"><TableSkeleton rows={5} /></div>
              ) : orders.length === 0 ? (
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
                      {orders.map((order, i) => (
                        <tr
                          key={order.id}
                          className={`border-b border-hairline-light hover:bg-canvas-cream transition-colors ${i === orders.length - 1 ? "border-b-0" : ""}`}
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
                            <Link to={`/orders/${order.id}`} className="text-caption text-ink underline underline-offset-2 hover:text-shade-60">
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="px-6 py-4 border-t border-hairline-light">
                <Link to="/orders" className="inline-flex items-center gap-1.5 text-caption text-ink hover:text-shade-60 transition-colors">
                  View all orders
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
