import * as Dialog from "@radix-ui/react-dialog";
import Button from "../ui/Button";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  destructive?: boolean;
  loading?: boolean;
}

export default function ConfirmDialog({
  open, onOpenChange, title, description,
  confirmLabel = "Confirm", cancelLabel = "Cancel",
  onConfirm, destructive = false, loading = false,
}: ConfirmDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm animate-in fade-in" />
        <Dialog.Content className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-canvas-light rounded-xl shadow-elev-4 p-6 focus:outline-none animate-in fade-in zoom-in-95">
          <Dialog.Title className="text-heading-md text-ink">{title}</Dialog.Title>
          <Dialog.Description className="mt-2 text-body-md text-shade-50">
            {description}
          </Dialog.Description>
          <div className="mt-6 flex justify-end gap-3">
            <Dialog.Close asChild>
              <Button variant="outline-light" size="sm">{cancelLabel}</Button>
            </Dialog.Close>
            <Button
              variant="primary"
              size="sm"
              loading={loading}
              onClick={onConfirm}
              className={destructive ? "bg-red-600 hover:bg-red-700 border-red-600" : ""}
            >
              {confirmLabel}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
