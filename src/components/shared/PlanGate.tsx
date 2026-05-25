import { Link } from "react-router";
import { Lock } from "lucide-react";
import Button from "../ui/Button";

interface PlanGateProps {
  children: React.ReactNode;
  requiredPlan: "pro" | "enterprise";
  currentPlan?: "free" | "pro" | "enterprise";
}

const planRank = { free: 0, pro: 1, enterprise: 2 };

export default function PlanGate({ children, requiredPlan, currentPlan = "free" }: PlanGateProps) {
  const hasAccess = planRank[currentPlan] >= planRank[requiredPlan];

  if (hasAccess) return <>{children}</>;

  return (
    <div className="relative">
      <div className="pointer-events-none select-none opacity-30 blur-[2px]">{children}</div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-canvas-light/80 rounded-xl">
        <div className="w-12 h-12 rounded-full bg-shade-30 flex items-center justify-center">
          <Lock size={20} className="text-shade-50" />
        </div>
        <div className="text-center">
          <p className="text-heading-md text-ink capitalize">{requiredPlan} feature</p>
          <p className="mt-1 text-caption text-shade-50">Upgrade to unlock this.</p>
        </div>
        <Link to="/settings/billing">
          <Button variant="primary" size="sm">Upgrade plan</Button>
        </Link>
      </div>
    </div>
  );
}
