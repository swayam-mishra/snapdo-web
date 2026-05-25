import { useState } from "react";
import { Link } from "react-router";
import { Download, Search } from "lucide-react";
import { toast } from "sonner";
import Button from "../../components/ui/Button";

type InvoiceStatus = "paid" | "unpaid" | "draft";
type GstType = "CGST/SGST" | "IGST";

interface Invoice {
  invoiceNo: string;
  orderId: string;
  customer: string;
  amount: string;
  gstType: GstType;
  date: string;
  status: InvoiceStatus;
}

const allInvoices: Invoice[] = [
  { invoiceNo: "INV-2026-0148", orderId: "ORD-2026-1283", customer: "Sharma Kirana Store", amount: "₹7,629", gstType: "CGST/SGST", date: "25 May 2026", status: "unpaid" },
  { invoiceNo: "INV-2026-0147", orderId: "ORD-2026-1282", customer: "Gupta Wholesale", amount: "₹6,572", gstType: "CGST/SGST", date: "24 May 2026", status: "paid" },
  { invoiceNo: "INV-2026-0146", orderId: "ORD-2026-1281", customer: "Mehta Traders", amount: "₹10,388", gstType: "IGST", date: "24 May 2026", status: "paid" },
  { invoiceNo: "INV-2026-0145", orderId: "ORD-2026-1279", customer: "Agarwal Food Mart", amount: "₹8,109", gstType: "CGST/SGST", date: "23 May 2026", status: "paid" },
  { invoiceNo: "INV-2026-0144", orderId: "ORD-2026-1278", customer: "Jain Brothers", amount: "₹5,724", gstType: "CGST/SGST", date: "22 May 2026", status: "paid" },
  { invoiceNo: "INV-2026-0143", orderId: "ORD-2026-1277", customer: "Verma General Store", amount: "₹2,014", gstType: "CGST/SGST", date: "22 May 2026", status: "draft" },
  { invoiceNo: "INV-2026-0142", orderId: "ORD-2026-1276", customer: "Singh Supermarket", amount: "₹30,210", gstType: "IGST", date: "21 May 2026", status: "paid" },
  { invoiceNo: "INV-2026-0141", orderId: "ORD-2026-1275", customer: "Yadav Wholesale", amount: "₹4,452", gstType: "CGST/SGST", date: "21 May 2026", status: "unpaid" },
];

const statusStyles: Record<InvoiceStatus, string> = {
  paid: "bg-aloe text-ink",
  unpaid: "bg-shade-30 text-ink",
  draft: "bg-pistachio text-ink",
};

const statusLabels: Record<InvoiceStatus, string> = {
  paid: "Paid",
  unpaid: "Unpaid",
  draft: "Draft",
};

const gstStyles: Record<GstType, string> = {
  "CGST/SGST": "bg-shade-30 text-ink",
  "IGST": "bg-pistachio text-ink",
};

const statusFilters: { label: string; value: InvoiceStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Paid", value: "paid" },
  { label: "Unpaid", value: "unpaid" },
  { label: "Draft", value: "draft" },
];

export default function Invoices() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<InvoiceStatus | "all">("all");

  const filtered = allInvoices.filter((inv) => {
    const matchSearch =
      inv.invoiceNo.toLowerCase().includes(search.toLowerCase()) ||
      inv.customer.toLowerCase().includes(search.toLowerCase()) ||
      inv.orderId.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || inv.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="min-h-screen bg-canvas-cream pt-8 px-8 pb-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-heading-xl text-ink">Invoices</h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-shade-40" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search invoices…"
              className="w-full bg-canvas-light text-ink text-body-md rounded-md border border-hairline-light px-3 py-[10px] pl-9 outline-none focus:border-ink focus:ring-1 focus:ring-ink placeholder:text-shade-40 transition-colors"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
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
        </div>

        <div className="bg-canvas-light rounded-xl shadow-elev-3 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-hairline-light bg-canvas-cream">
                  <th className="text-left px-6 py-3 text-eyebrow text-shade-50">Invoice #</th>
                  <th className="text-left px-6 py-3 text-eyebrow text-shade-50">Order ID</th>
                  <th className="text-left px-6 py-3 text-eyebrow text-shade-50">Customer</th>
                  <th className="text-right px-6 py-3 text-eyebrow text-shade-50">Amount</th>
                  <th className="text-left px-6 py-3 text-eyebrow text-shade-50">GST Type</th>
                  <th className="text-left px-6 py-3 text-eyebrow text-shade-50">Date</th>
                  <th className="text-left px-6 py-3 text-eyebrow text-shade-50">Status</th>
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-16 text-center text-caption text-shade-50">
                      No invoices found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((inv, i) => (
                    <tr
                      key={inv.invoiceNo}
                      className={`border-b border-hairline-light hover:bg-canvas-cream transition-colors ${i === filtered.length - 1 ? "border-b-0" : ""}`}
                    >
                      <td className="px-6 py-4">
                        <Link
                          to={`/invoices/${inv.invoiceNo}`}
                          className="text-caption font-mono text-ink underline underline-offset-2 hover:text-shade-60"
                        >
                          {inv.invoiceNo}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-caption font-mono text-shade-60">{inv.orderId}</td>
                      <td className="px-6 py-4 text-body-md text-ink font-[500]">{inv.customer}</td>
                      <td className="px-6 py-4 text-body-md text-ink font-[500] text-right">{inv.amount}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center rounded-pill px-3 py-1 text-eyebrow ${gstStyles[inv.gstType]}`}>
                          {inv.gstType}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-caption text-shade-50">{inv.date}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center rounded-pill px-3 py-1 text-eyebrow ${statusStyles[inv.status]}`}>
                          {statusLabels[inv.status]}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Button
                          variant="outline-light"
                          size="sm"
                          onClick={() => toast.success(`Downloading ${inv.invoiceNo}`)}
                        >
                          <Download size={13} />
                          Download
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
