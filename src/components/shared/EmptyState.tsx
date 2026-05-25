import { type LucideIcon } from "lucide-react";
import Button from "../ui/Button";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: { label: string; onClick: () => void };
}

export default function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="w-14 h-14 rounded-xl bg-shade-30 flex items-center justify-center mb-4">
        <Icon size={24} className="text-shade-50" />
      </div>
      <h3 className="text-heading-md text-ink">{title}</h3>
      <p className="mt-2 text-body-md text-shade-50 max-w-sm">{description}</p>
      {action && (
        <div className="mt-6">
          <Button variant="primary" size="sm" onClick={action.onClick}>
            {action.label}
          </Button>
        </div>
      )}
    </div>
  );
}
