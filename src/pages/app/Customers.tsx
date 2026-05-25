import { useState } from "react";
import { Link } from "react-router";
import { Users, Search } from "lucide-react";
import EmptyState from "../../components/shared/EmptyState";

interface Customer {
  id: string;
  name: string;
  phone: string;
  totalOrders: number;
  totalRevenue: string;
  lastOrderDate: string;
}

const allCustomers: Customer[] = [
  { id: "CUS-001", name: "Ramesh Enterprises", phone: "+91 99887 76655", totalOrders: 34, totalRevenue: "₹2,45,800", lastOrderDate: "25 May 2026" },
  { id: "CUS-002", name: "Sharma Kirana Store", phone: "+91 98765 43210", totalOrders: 28, totalRevenue: "₹1,98,400", lastOrderDate: "25 May 2026" },
  { id: "CUS-003", name: "Gupta Wholesale", phone: "+91 97654 32109", totalOrders: 19, totalRevenue: "₹1,42,000", lastOrderDate: "24 May 2026" },
  { id: "CUS-004", name: "Mehta Traders", phone: "+91 96543 21098", totalOrders: 41, totalRevenue: "₹3,10,200", lastOrderDate: "24 May 2026" },
  { id: "CUS-005", name: "Patel Provisions", phone: "+91 95432 10987", totalOrders: 12, totalRevenue: "₹88,500", lastOrderDate: "23 May 2026" },
  { id: "CUS-006", name: "Agarwal Food Mart", phone: "+91 94321 09876", totalOrders: 22, totalRevenue: "₹1,67,300", lastOrderDate: "23 May 2026" },
  { id: "CUS-007", name: "Jain Brothers", phone: "+91 93210 98765", totalOrders: 9, totalRevenue: "₹62,400", lastOrderDate: "22 May 2026" },
  { id: "CUS-008", name: "Singh Supermarket", phone: "+91 92109 87654", totalOrders: 55, totalRevenue: "₹4,85,000", lastOrderDate: "21 May 2026" },
];

export default function Customers() {
  const [search, setSearch] = useState("");

  const filtered = allCustomers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

  return (
    <div className="min-h-screen bg-canvas-cream pt-8 px-8 pb-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-heading-xl text-ink">Customers</h1>
            <span className="inline-flex items-center rounded-pill px-3 py-1 text-eyebrow bg-shade-30 text-ink">
              {allCustomers.length}
            </span>
          </div>
        </div>

        <div className="relative max-w-sm mb-6">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-shade-40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or phone…"
            className="w-full bg-canvas-light text-ink text-body-md rounded-md border border-hairline-light px-3 py-[10px] pl-9 outline-none focus:border-ink focus:ring-1 focus:ring-ink placeholder:text-shade-40 transition-colors"
          />
        </div>

        {filtered.length === 0 ? (
          <div className="bg-canvas-light rounded-xl shadow-elev-3">
            <EmptyState
              icon={Users}
              title="No customers found"
              description="Try searching with a different name or phone number."
            />
          </div>
        ) : (
          <div className="bg-canvas-light rounded-xl shadow-elev-3 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-hairline-light bg-canvas-cream">
                    <th className="text-left px-6 py-3 text-eyebrow text-shade-50">Name</th>
                    <th className="text-left px-6 py-3 text-eyebrow text-shade-50">Phone</th>
                    <th className="text-right px-6 py-3 text-eyebrow text-shade-50">Total Orders</th>
                    <th className="text-right px-6 py-3 text-eyebrow text-shade-50">Total Revenue</th>
                    <th className="text-left px-6 py-3 text-eyebrow text-shade-50">Last Order</th>
                    <th className="px-6 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((customer, i) => (
                    <tr
                      key={customer.id}
                      className={`border-b border-hairline-light hover:bg-canvas-cream transition-colors ${i === filtered.length - 1 ? "border-b-0" : ""}`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-shade-30 flex items-center justify-center shrink-0">
                            <span className="text-eyebrow text-shade-60">
                              {customer.name.charAt(0)}
                            </span>
                          </div>
                          <span className="text-body-md text-ink font-[500]">{customer.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-caption text-shade-60">{customer.phone}</td>
                      <td className="px-6 py-4 text-body-md text-ink text-right">{customer.totalOrders}</td>
                      <td className="px-6 py-4 text-body-md text-ink font-[500] text-right">{customer.totalRevenue}</td>
                      <td className="px-6 py-4 text-caption text-shade-50">{customer.lastOrderDate}</td>
                      <td className="px-6 py-4">
                        <Link
                          to={`/customers/${customer.id}`}
                          className="text-caption text-ink underline underline-offset-2 hover:text-shade-60"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
