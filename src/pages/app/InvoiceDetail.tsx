import { useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, Download, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import Button from "../../components/ui/Button";

interface LineItem {
  description: string;
  hsn: string;
  qty: number;
  unit: string;
  rate: number;
  amount: number;
  cgst: number;
  sgst: number;
  igst: number;
}

interface InvoiceData {
  invoiceNo: string;
  orderId: string;
  date: string;
  dueDate: string;
  gstType: "CGST/SGST" | "IGST";
  business: { name: string; address: string; gstin: string; phone: string };
  customer: { name: string; address: string; gstin: string; phone: string };
  items: LineItem[];
  subtotal: number;
  totalCgst: number;
  totalSgst: number;
  totalIgst: number;
  grandTotal: number;
}

const mockInvoice: InvoiceData = {
  invoiceNo: "INV-2026-0148",
  orderId: "ORD-2026-1283",
  date: "25 May 2026",
  dueDate: "1 Jun 2026",
  gstType: "CGST/SGST",
  business: {
    name: "Snapdo Foods Pvt. Ltd.",
    address: "Plot 42, Industrial Area, Phase II, Gurugram, Haryana – 122001",
    gstin: "06AABCS9876P1ZX",
    phone: "+91 11 4567 8900",
  },
  customer: {
    name: "Sharma Kirana Store",
    address: "14, Gandhi Market, Laxmi Nagar, New Delhi – 110092",
    gstin: "07AABCS1234P1ZX",
    phone: "+91 98765 43210",
  },
  items: [
    { description: "Sunflower Oil", hsn: "1512", qty: 15, unit: "L", rate: 160, amount: 2400, cgst: 120, sgst: 120, igst: 0 },
    { description: "Sugar", hsn: "1701", qty: 50, unit: "kg", rate: 44, amount: 2200, cgst: 110, sgst: 110, igst: 0 },
    { description: "Refined Wheat Flour (Maida)", hsn: "1101", qty: 25, unit: "kg", rate: 32, amount: 800, cgst: 40, sgst: 40, igst: 0 },
    { description: "Amul Full Cream Milk", hsn: "0401", qty: 48, unit: "500ml", rate: 32, amount: 1536, cgst: 76.8, sgst: 76.8, igst: 0 },
  ],
  subtotal: 6936,
  totalCgst: 346.8,
  totalSgst: 346.8,
  totalIgst: 0,
  grandTotal: 7629.6,
};

export default function InvoiceDetail() {
  const { id } = useParams<{ id: string }>();
  const invoice = { ...mockInvoice, invoiceNo: id ?? mockInvoice.invoiceNo };

  const [regenerating, setRegenerating] = useState(false);

  const handleRegenerate = () => {
    setRegenerating(true);
    setTimeout(() => {
      setRegenerating(false);
      toast.success("Invoice regenerated");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-canvas-cream pt-8 px-8 pb-12">
      <div className="max-w-6xl mx-auto">
        <Link
          to="/invoices"
          className="inline-flex items-center gap-1.5 text-caption text-shade-50 hover:text-ink transition-colors mb-6"
        >
          <ArrowLeft size={14} />
          Invoices
        </Link>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-heading-xl text-ink">{invoice.invoiceNo}</h1>
          <div className="flex items-center gap-3">
            <Button
              variant="outline-light"
              size="md"
              loading={regenerating}
              onClick={handleRegenerate}
            >
              <RefreshCw size={14} />
              Regenerate
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => toast.success("Downloading PDF…")}
            >
              <Download size={16} />
              Download PDF
            </Button>
          </div>
        </div>

        <div className="bg-canvas-light rounded-xl shadow-elev-3 overflow-hidden">
          <div className="p-8 border-b border-hairline-light">
            <div className="flex flex-col sm:flex-row sm:justify-between gap-6">
              <div>
                <p className="text-heading-md text-ink mb-1">{invoice.business.name}</p>
                <p className="text-caption text-shade-50 max-w-xs">{invoice.business.address}</p>
                <p className="text-caption text-shade-50 mt-1">GSTIN: <span className="font-mono">{invoice.business.gstin}</span></p>
                <p className="text-caption text-shade-50">{invoice.business.phone}</p>
              </div>
              <div className="text-right">
                <p className="text-eyebrow text-shade-50 mb-1">Tax Invoice</p>
                <p className="text-heading-lg text-ink font-mono">{invoice.invoiceNo}</p>
                <div className="mt-3 flex flex-col gap-1 text-right">
                  <div className="flex justify-end gap-8">
                    <span className="text-caption text-shade-50">Invoice Date</span>
                    <span className="text-caption text-ink">{invoice.date}</span>
                  </div>
                  <div className="flex justify-end gap-8">
                    <span className="text-caption text-shade-50">Due Date</span>
                    <span className="text-caption text-ink">{invoice.dueDate}</span>
                  </div>
                  <div className="flex justify-end gap-8">
                    <span className="text-caption text-shade-50">Order Ref</span>
                    <span className="text-caption font-mono text-ink">{invoice.orderId}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 border-b border-hairline-light bg-canvas-cream">
            <p className="text-eyebrow text-shade-50 mb-3">Bill To</p>
            <p className="text-body-md text-ink font-[500]">{invoice.customer.name}</p>
            <p className="text-caption text-shade-50 max-w-xs mt-1">{invoice.customer.address}</p>
            <p className="text-caption text-shade-50 mt-1">GSTIN: <span className="font-mono">{invoice.customer.gstin}</span></p>
            <p className="text-caption text-shade-50">{invoice.customer.phone}</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-hairline-light bg-canvas-cream">
                  <th className="text-left px-6 py-3 text-eyebrow text-shade-50">Description</th>
                  <th className="text-left px-4 py-3 text-eyebrow text-shade-50">HSN</th>
                  <th className="text-right px-4 py-3 text-eyebrow text-shade-50">Qty</th>
                  <th className="text-left px-3 py-3 text-eyebrow text-shade-50">Unit</th>
                  <th className="text-right px-4 py-3 text-eyebrow text-shade-50">Rate</th>
                  <th className="text-right px-4 py-3 text-eyebrow text-shade-50">Amount</th>
                  {invoice.gstType === "CGST/SGST" ? (
                    <>
                      <th className="text-right px-4 py-3 text-eyebrow text-shade-50">CGST</th>
                      <th className="text-right px-6 py-3 text-eyebrow text-shade-50">SGST</th>
                    </>
                  ) : (
                    <th className="text-right px-6 py-3 text-eyebrow text-shade-50">IGST</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, i) => (
                  <tr key={i} className="border-b border-hairline-light last:border-b-0">
                    <td className="px-6 py-4 text-body-md text-ink">{item.description}</td>
                    <td className="px-4 py-4 text-caption font-mono text-shade-60">{item.hsn}</td>
                    <td className="px-4 py-4 text-caption text-ink text-right">{item.qty}</td>
                    <td className="px-3 py-4 text-caption text-shade-50">{item.unit}</td>
                    <td className="px-4 py-4 text-caption text-ink text-right">₹{item.rate}</td>
                    <td className="px-4 py-4 text-body-md text-ink text-right">₹{item.amount.toLocaleString("en-IN")}</td>
                    {invoice.gstType === "CGST/SGST" ? (
                      <>
                        <td className="px-4 py-4 text-caption text-shade-60 text-right">₹{item.cgst.toLocaleString("en-IN")}</td>
                        <td className="px-6 py-4 text-caption text-shade-60 text-right">₹{item.sgst.toLocaleString("en-IN")}</td>
                      </>
                    ) : (
                      <td className="px-6 py-4 text-caption text-shade-60 text-right">₹{item.igst.toLocaleString("en-IN")}</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-8 bg-canvas-cream border-t border-hairline-light">
            <div className="flex flex-col items-end gap-2 max-w-sm ml-auto">
              <div className="flex justify-between w-full">
                <span className="text-caption text-shade-50">Subtotal</span>
                <span className="text-caption text-ink">₹{invoice.subtotal.toLocaleString("en-IN")}</span>
              </div>
              {invoice.gstType === "CGST/SGST" ? (
                <>
                  <div className="flex justify-between w-full">
                    <span className="text-caption text-shade-50">CGST (5%)</span>
                    <span className="text-caption text-ink">₹{invoice.totalCgst.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between w-full">
                    <span className="text-caption text-shade-50">SGST (5%)</span>
                    <span className="text-caption text-ink">₹{invoice.totalSgst.toLocaleString("en-IN")}</span>
                  </div>
                </>
              ) : (
                <div className="flex justify-between w-full">
                  <span className="text-caption text-shade-50">IGST (10%)</span>
                  <span className="text-caption text-ink">₹{invoice.totalIgst.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="flex justify-between w-full pt-3 border-t border-hairline-dark">
                <span className="text-body-strong text-ink">Grand Total</span>
                <span className="text-body-strong text-ink">₹{invoice.grandTotal.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <p className="mt-8 text-micro text-shade-40 text-center">
              This is a computer-generated invoice. No signature required.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
