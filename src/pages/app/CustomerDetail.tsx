import { Link, useParams } from "react-router";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import EmptyState from "../../components/shared/EmptyState";

type OrderStatus = "pending" | "confirmed" | "fulfilled" | "cancelled";

interface CustomerOrder {
  id: string;
  date: string;
  total: string;
  status: OrderStatus;
}

interface CustomerData {
  id: string;
  name: string;
  phone: string;
  totalOrders: number;
  totalRevenue: string;
  avgOrderValue: string;
  memberSince: string;
  orders: CustomerOrder[];
}

const mockCustomer: CustomerData = {
  id: "CUS-002",
  name: "Sharma Kirana Store",
  phone: "+91 98765 43210",
  totalOrders: 28,
  totalRevenue: "₹1,98,400",
  avgOrderValue: "₹7,086",
  memberSince: "Jan 2025",
  orders: [
    { id: "ORD-2026-1283", date: "25 May 2026", total: "₹12,300", status: "confirmed" },
    { id: "ORD-2026-1261", date: "18 May 2026", total: "₹9,450", status: "fulfilled" },
    { id: "ORD-2026-1238", date: "11 May 2026", total: "₹6,200", status: "fulfilled" },
    { id: "ORD-2026-1215", date: "4 May 2026", total: "₹14,100", status: "fulfilled" },
    { id: "ORD-2026-1190", date: "27 Apr 2026", total: "₹8,800", status: "cancelled" },
  ],
};

const statusStyles: Record<OrderStatus, string> = {
  pending: "bg-shade-30 text-ink",
  confirmed: "bg-aloe text-ink",
  fulfilled: "bg-pistachio text-ink",
  cancelled: "bg-red-100 text-red-700",
};

const statusLabels: Record<OrderStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  fulfilled: "Fulfilled",
  cancelled: "Cancelled",
};

const statItems = [
  { label: "Total Orders", value: mockCustomer.totalOrders.toString() },
  { label: "Total Revenue", value: mockCustomer.totalRevenue },
  { label: "Avg Order Value", value: mockCustomer.avgOrderValue },
  { label: "Member Since", value: mockCustomer.memberSince },
];

export default function CustomerDetail() {
  const { id } = useParams<{ id: string }>();
  const customer = { ...mockCustomer, id: id ?? mockCustomer.id };

  return (
    <div className="min-h-screen bg-canvas-cream pt-8 px-8 pb-12">
      <div className="max-w-6xl mx-auto">
        <Link
          to="/customers"
          className="inline-flex items-center gap-1.5 text-caption text-shade-50 hover:text-ink transition-colors mb-6"
        >
          <ArrowLeft size={14} />
          Customers
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-full bg-shade-30 flex items-center justify-center">
              <span className="text-heading-md text-shade-60">{customer.name.charAt(0)}</span>
            </div>
            <h1 className="text-heading-xl text-ink">{customer.name}</h1>
          </div>
          <p className="text-body-md text-shade-50 ml-[52px]">{customer.phone}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {statItems.map((s) => (
            <div key={s.label} className="bg-canvas-light rounded-xl shadow-elev-3 p-5">
              <p className="text-eyebrow text-shade-50 mb-2">{s.label}</p>
              <p className="text-heading-lg text-ink">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-canvas-light rounded-xl shadow-elev-3 overflow-hidden">
          <div className="px-6 py-4 border-b border-hairline-light">
            <h2 className="text-heading-md text-ink">Order History</h2>
          </div>

          {customer.orders.length === 0 ? (
            <EmptyState
              icon={ShoppingCart}
              title="No orders yet"
              description="This customer hasn't placed any orders."
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-hairline-light bg-canvas-cream">
                    <th className="text-left px-6 py-3 text-eyebrow text-shade-50">Order ID</th>
                    <th className="text-left px-6 py-3 text-eyebrow text-shade-50">Date</th>
                    <th className="text-right px-6 py-3 text-eyebrow text-shade-50">Total</th>
                    <th className="text-left px-6 py-3 text-eyebrow text-shade-50">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {customer.orders.map((order, i) => (
                    <tr
                      key={order.id}
                      className={`border-b border-hairline-light hover:bg-canvas-cream transition-colors ${i === customer.orders.length - 1 ? "border-b-0" : ""}`}
                    >
                      <td className="px-6 py-4">
                        <Link
                          to={`/orders/${order.id}`}
                          className="text-caption font-mono text-shade-60 underline underline-offset-2 hover:text-ink"
                        >
                          {order.id}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-caption text-shade-50">{order.date}</td>
                      <td className="px-6 py-4 text-body-md text-ink font-[500] text-right">{order.total}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center rounded-pill px-3 py-1 text-eyebrow ${statusStyles[order.status]}`}>
                          {statusLabels[order.status]}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
