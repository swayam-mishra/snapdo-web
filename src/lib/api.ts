const BASE = import.meta.env.VITE_API_BASE_URL as string;

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  token?: string | null,
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}`, { ...options, headers });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(res.status, body.message ?? "Request failed");
  }

  return res.json();
}

export async function downloadBlob(path: string, filename: string, token: string) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    redirect: "follow",
  });
  if (!res.ok) throw new ApiError(res.status, "Download failed");
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ── Type definitions ──────────────────────────────────

export interface OrderItem {
  product_name: string;
  quantity: number;
  price: number | null;
}

export interface Order {
  id: string;
  customer_name: string | null;
  items: OrderItem[];
  delivery_address: string | null;
  delivery_date: string | null;
  special_instructions: string | null;
  total: number | null;
  confidence: "high" | "medium" | "low";
  status: "pending" | "confirmed" | "fulfilled" | "cancelled";
  created_at: string;
  invoice?: Invoice | null;
}

export interface InvoiceItem {
  product_name: string;
  quantity: number;
  price: number;
  amount: number;
}

export interface Invoice {
  invoice_number: string;
  date: string;
  customer_name: string;
  items: InvoiceItem[];
  subtotal: number;
  cgst: number;
  sgst: number;
  igst?: number;
  total: number;
  business_name: string;
  gst_number: string;
}

export interface DemoResponse {
  sample_input: { sender: string; text: string }[];
  order: Order;
  invoice: Invoice;
  pdf_url: string;
}

export interface Stats {
  total_orders: number;
  pending_orders: number;
  confirmed_orders: number;
  total_revenue: number;
}
