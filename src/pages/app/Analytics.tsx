import { useState } from "react";
import PlanGate from "../../components/shared/PlanGate";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

type TimeRange = "daily" | "weekly" | "monthly";

interface StatItem {
  label: string;
  value: string;
  sub: string;
}

interface TopCustomer {
  rank: number;
  name: string;
  orders: number;
  revenue: string;
}

const dailyData = [
  { label: "19 May", orders: 4 },
  { label: "20 May", orders: 6 },
  { label: "21 May", orders: 5 },
  { label: "22 May", orders: 8 },
  { label: "23 May", orders: 7 },
  { label: "24 May", orders: 9 },
  { label: "25 May", orders: 11 },
];

const weeklyData = [
  { label: "Week 16", orders: 32 },
  { label: "Week 17", orders: 41 },
  { label: "Week 18", orders: 38 },
  { label: "Week 19", orders: 49 },
  { label: "Week 20", orders: 44 },
  { label: "Week 21", orders: 52 },
];

const monthlyData = [
  { label: "Dec '25", orders: 88 },
  { label: "Jan '26", orders: 102 },
  { label: "Feb '26", orders: 95 },
  { label: "Mar '26", orders: 118 },
  { label: "Apr '26", orders: 130 },
  { label: "May '26", orders: 148 },
];

const statusPieData = [
  { name: "Pending", value: 23, color: "#d4d4d8" },
  { name: "Confirmed", value: 41, color: "#c1fbd4" },
  { name: "Fulfilled", value: 78, color: "#d4f9e0" },
  { name: "Cancelled", value: 6, color: "#fca5a5" },
];

const topCustomers: TopCustomer[] = [
  { rank: 1, name: "Singh Supermarket", orders: 55, revenue: "₹4,85,000" },
  { rank: 2, name: "Mehta Traders", orders: 41, revenue: "₹3,10,200" },
  { rank: 3, name: "Ramesh Enterprises", orders: 34, revenue: "₹2,45,800" },
  { rank: 4, name: "Sharma Kirana Store", orders: 28, revenue: "₹1,98,400" },
  { rank: 5, name: "Agarwal Food Mart", orders: 22, revenue: "₹1,67,300" },
];

const statsByRange: Record<TimeRange, StatItem[]> = {
  daily: [
    { label: "Revenue Today", value: "₹28,450", sub: "+18% vs yesterday" },
    { label: "Orders Today", value: "11", sub: "As of 5 PM" },
    { label: "Avg Order Value", value: "₹2,586", sub: "Today" },
    { label: "Top Customer", value: "Singh Supermarket", sub: "3 orders" },
  ],
  weekly: [
    { label: "Revenue This Week", value: "₹1,04,200", sub: "+12% vs last week" },
    { label: "Orders This Week", value: "52", sub: "Mon – Sun" },
    { label: "Avg Order Value", value: "₹2,004", sub: "This week" },
    { label: "Top Customer", value: "Mehta Traders", sub: "7 orders" },
  ],
  monthly: [
    { label: "Revenue This Month", value: "₹4,32,500", sub: "+14% vs last month" },
    { label: "Orders This Month", value: "148", sub: "May 2026" },
    { label: "Avg Order Value", value: "₹2,922", sub: "This month" },
    { label: "Top Customer", value: "Singh Supermarket", sub: "55 orders" },
  ],
};

const chartDataByRange: Record<TimeRange, { label: string; orders: number }[]> = {
  daily: dailyData,
  weekly: weeklyData,
  monthly: monthlyData,
};

const timeRanges: { label: string; value: TimeRange }[] = [
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
];

export default function Analytics() {
  const [timeRange, setTimeRange] = useState<TimeRange>("monthly");

  const stats = statsByRange[timeRange];
  const chartData = chartDataByRange[timeRange];

  return (
    <div className="min-h-screen bg-canvas-cream pt-8 px-8 pb-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-heading-xl text-ink">Analytics</h1>
          <div className="flex gap-1 p-1 bg-canvas-light rounded-pill border border-hairline-light shadow-elev-3">
            {timeRanges.map((r) => (
              <button
                key={r.value}
                onClick={() => setTimeRange(r.value)}
                className={`rounded-pill px-5 py-2 text-caption transition-all duration-150 ${
                  timeRange === r.value
                    ? "bg-ink text-on-primary"
                    : "text-shade-50 hover:text-ink"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="bg-canvas-light rounded-xl shadow-elev-3 p-6">
              <p className="text-eyebrow text-shade-50 mb-2">{s.label}</p>
              <p className="text-heading-lg text-ink leading-tight mb-1">{s.value}</p>
              <p className="text-micro text-shade-40">{s.sub}</p>
            </div>
          ))}
        </div>

        <PlanGate requiredPlan="pro">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 bg-canvas-light rounded-xl shadow-elev-3 p-6">
              <h2 className="text-heading-md text-ink mb-6">Orders Over Time</h2>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={chartData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
                  <XAxis
                    dataKey="label"
                    tick={{ fontSize: 11, fill: "#71717a", fontFamily: "Inter" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "#71717a", fontFamily: "Inter" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#ffffff",
                      border: "1px solid #e4e4e7",
                      borderRadius: "8px",
                      fontSize: "13px",
                      fontFamily: "Inter",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="orders"
                    stroke="#000000"
                    strokeWidth={2}
                    dot={{ fill: "#000000", r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-canvas-light rounded-xl shadow-elev-3 p-6">
              <h2 className="text-heading-md text-ink mb-4">Orders by Status</h2>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={statusPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {statusPieData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    formatter={(value) => (
                      <span style={{ fontSize: "11px", color: "#71717a", fontFamily: "Inter" }}>
                        {value}
                      </span>
                    )}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#ffffff",
                      border: "1px solid #e4e4e7",
                      borderRadius: "8px",
                      fontSize: "13px",
                      fontFamily: "Inter",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-canvas-light rounded-xl shadow-elev-3 overflow-hidden">
            <div className="px-6 py-4 border-b border-hairline-light">
              <h2 className="text-heading-md text-ink">Top Customers by Revenue</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-hairline-light bg-canvas-cream">
                    <th className="text-left px-6 py-3 text-eyebrow text-shade-50">Rank</th>
                    <th className="text-left px-6 py-3 text-eyebrow text-shade-50">Customer</th>
                    <th className="text-right px-6 py-3 text-eyebrow text-shade-50">Orders</th>
                    <th className="text-right px-6 py-3 text-eyebrow text-shade-50">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {topCustomers.map((c, i) => (
                    <tr
                      key={c.rank}
                      className={`border-b border-hairline-light hover:bg-canvas-cream transition-colors ${i === topCustomers.length - 1 ? "border-b-0" : ""}`}
                    >
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex w-6 h-6 items-center justify-center rounded-full text-micro font-[600] ${
                            c.rank === 1
                              ? "bg-aloe text-ink"
                              : c.rank === 2
                              ? "bg-pistachio text-ink"
                              : "bg-shade-30 text-shade-60"
                          }`}
                        >
                          {c.rank}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-body-md text-ink font-[500]">{c.name}</td>
                      <td className="px-6 py-4 text-caption text-shade-60 text-right">{c.orders}</td>
                      <td className="px-6 py-4 text-body-md text-ink font-[500] text-right">{c.revenue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </PlanGate>
      </div>
    </div>
  );
}
