import { useState } from "react";
import { RefreshCw, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
import Button from "../../components/ui/Button";

type JobStatus = "queued" | "processing" | "completed" | "failed";
type TabType = "inprogress" | "dlq";

interface Job {
  id: string;
  type: string;
  created: string;
  status: JobStatus;
  error?: string;
}

const inProgressJobs: Job[] = [
  { id: "JOB-8821", type: "order.extract", created: "25 May 2026, 10:55 AM", status: "processing" },
  { id: "JOB-8820", type: "invoice.generate", created: "25 May 2026, 10:51 AM", status: "queued" },
  { id: "JOB-8818", type: "order.extract", created: "25 May 2026, 10:44 AM", status: "queued" },
  { id: "JOB-8815", type: "export.csv", created: "25 May 2026, 10:30 AM", status: "processing" },
  { id: "JOB-8810", type: "webhook.dispatch", created: "25 May 2026, 10:20 AM", status: "completed" },
];

const failedJobs: Job[] = [
  {
    id: "JOB-8800",
    type: "invoice.generate",
    created: "25 May 2026, 09:55 AM",
    status: "failed",
    error: "PDF generation service timed out after 30s. GSTIN validation returned 503.",
  },
  {
    id: "JOB-8791",
    type: "webhook.dispatch",
    created: "25 May 2026, 09:30 AM",
    status: "failed",
    error: "Target URL https://api.merchant.in/webhook returned 404. Endpoint may have changed.",
  },
  {
    id: "JOB-8784",
    type: "order.extract",
    created: "24 May 2026, 11:22 PM",
    status: "failed",
    error: "Claude API rate limit exceeded. Retried 3 times. Message too long for context window.",
  },
  {
    id: "JOB-8762",
    type: "export.csv",
    created: "24 May 2026, 05:10 PM",
    status: "failed",
    error: "S3 upload failed: AccessDenied. Check bucket permissions for IAM role snapdo-prod.",
  },
];

const statusStyles: Record<JobStatus, string> = {
  queued: "bg-shade-30 text-ink",
  processing: "bg-aloe text-ink",
  completed: "bg-pistachio text-ink",
  failed: "bg-red-100 text-red-700",
};

const statusLabels: Record<JobStatus, string> = {
  queued: "Queued",
  processing: "Processing",
  completed: "Completed",
  failed: "Failed",
};

function JobRow({ job, showRetry }: { job: Job; showRetry: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const [retrying, setRetrying] = useState(false);

  const handleRetry = () => {
    setRetrying(true);
    setTimeout(() => {
      setRetrying(false);
      toast.success(`Job ${job.id} queued for retry`);
    }, 1000);
  };

  return (
    <>
      <tr className="border-b border-hairline-light hover:bg-canvas-cream transition-colors">
        <td className="px-6 py-4 text-caption font-mono text-shade-60">{job.id}</td>
        <td className="px-6 py-4">
          <span className="inline-flex items-center rounded-pill px-3 py-1 text-eyebrow bg-shade-30 text-ink">
            {job.type}
          </span>
        </td>
        <td className="px-6 py-4 text-caption text-shade-50">{job.created}</td>
        <td className="px-6 py-4">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center rounded-pill px-3 py-1 text-eyebrow ${statusStyles[job.status]}`}>
              {job.status === "processing" && (
                <span className="w-2 h-2 rounded-full bg-ink mr-1.5 animate-pulse" />
              )}
              {statusLabels[job.status]}
            </span>
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center gap-2">
            {showRetry && (
              <Button variant="outline-light" size="sm" loading={retrying} onClick={handleRetry}>
                <RefreshCw size={12} />
                Retry
              </Button>
            )}
            {job.error && (
              <button
                onClick={() => setExpanded((v) => !v)}
                className="text-caption text-shade-50 hover:text-ink transition-colors"
              >
                {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            )}
          </div>
        </td>
      </tr>
      {expanded && job.error && (
        <tr className="border-b border-hairline-light bg-canvas-cream">
          <td colSpan={5} className="px-6 py-4">
            <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-100">
              <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
              <p className="text-caption text-red-700 leading-relaxed">{job.error}</p>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export default function AsyncJobs() {
  const [activeTab, setActiveTab] = useState<TabType>("inprogress");
  const [retryingAll, setRetryingAll] = useState(false);

  const handleRetryAll = () => {
    setRetryingAll(true);
    setTimeout(() => {
      setRetryingAll(false);
      toast.success(`${failedJobs.length} jobs queued for retry`);
    }, 1500);
  };

  const tabs: { label: string; value: TabType; count: number }[] = [
    { label: "In Progress", value: "inprogress", count: inProgressJobs.length },
    { label: "Failed (DLQ)", value: "dlq", count: failedJobs.length },
  ];

  const currentJobs = activeTab === "inprogress" ? inProgressJobs : failedJobs;

  return (
    <div className="min-h-screen bg-canvas-cream pt-8 px-8 pb-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-heading-xl text-ink">Async Jobs</h1>
          {activeTab === "dlq" && failedJobs.length > 0 && (
            <Button
              variant="outline-light"
              size="md"
              loading={retryingAll}
              onClick={handleRetryAll}
            >
              <RefreshCw size={14} />
              Retry all failed
            </Button>
          )}
        </div>

        <div className="flex gap-1 p-1 bg-canvas-light rounded-pill border border-hairline-light w-fit mb-6 shadow-elev-3">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`rounded-pill px-5 py-2 text-caption transition-all duration-150 inline-flex items-center gap-2 ${
                activeTab === tab.value
                  ? "bg-ink text-on-primary"
                  : "text-shade-50 hover:text-ink"
              }`}
            >
              {tab.label}
              <span
                className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-[600] ${
                  activeTab === tab.value
                    ? "bg-on-primary/20 text-on-primary"
                    : "bg-shade-30 text-shade-60"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <div className="bg-canvas-light rounded-xl shadow-elev-3 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-hairline-light bg-canvas-cream">
                  <th className="text-left px-6 py-3 text-eyebrow text-shade-50">Job ID</th>
                  <th className="text-left px-6 py-3 text-eyebrow text-shade-50">Type</th>
                  <th className="text-left px-6 py-3 text-eyebrow text-shade-50">Created</th>
                  <th className="text-left px-6 py-3 text-eyebrow text-shade-50">Status</th>
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <tbody>
                {currentJobs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center text-caption text-shade-50">
                      No jobs in this queue.
                    </td>
                  </tr>
                ) : (
                  currentJobs.map((job) => (
                    <JobRow
                      key={job.id}
                      job={job}
                      showRetry={activeTab === "dlq"}
                    />
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
