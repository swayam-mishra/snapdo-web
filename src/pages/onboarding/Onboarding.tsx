import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "sonner";
import { apiFetch, ApiError } from "../../lib/api";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

interface OnboardForm {
  organization_name: string;
  business_name: string;
  gst_number: string;
}

const indianStates = [
  "Andhra Pradesh","Assam","Bihar","Delhi","Gujarat","Haryana",
  "Karnataka","Kerala","Madhya Pradesh","Maharashtra","Punjab",
  "Rajasthan","Tamil Nadu","Telangana","Uttar Pradesh","West Bengal",
];

export default function Onboarding() {
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<OnboardForm>();

  const onSubmit = async (data: OnboardForm) => {
    setLoading(true);
    try {
      const token = await getToken();
      await apiFetch("/onboard", {
        method: "POST",
        body: JSON.stringify({
          organization_name: data.organization_name,
          business_name: data.business_name,
          gst_number: data.gst_number || undefined,
        }),
      }, token ?? undefined);

      localStorage.setItem("onboarded", "true");
      toast.success("Welcome to Snapdo!");
      navigate("/dashboard");
    } catch (err) {
      if (err instanceof ApiError) {
        toast.error(err.message || "Setup failed. Please try again.");
      } else {
        toast.error("Network error. Check your connection and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-canvas-cream flex flex-col">
      <header className="px-6 py-5 flex items-center justify-between border-b border-hairline-light">
        <span className="text-heading-md text-ink font-[500]">Snapdo</span>
        <span className="text-caption text-shade-50">Setup · 1 of 1</span>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-heading-xl text-ink mb-2">Set up your business</h1>
            <p className="text-body-md text-shade-50">
              This takes 30 seconds. Your business name appears on every invoice.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <Input
              label="Organization name"
              placeholder="e.g. Sharma Traders Pvt Ltd"
              hint="Your legal entity name"
              error={errors.organization_name?.message}
              {...register("organization_name", { required: "Organization name is required" })}
            />
            <Input
              label="Business name"
              placeholder="e.g. Sharma Kirana Store"
              hint="Appears on invoices — use your shop name"
              error={errors.business_name?.message}
              {...register("business_name", { required: "Business name is required" })}
            />
            <Input
              label="GST number (optional)"
              placeholder="e.g. 29ABCDE1234F1Z5"
              hint="Leave blank if you're not GST-registered"
              {...register("gst_number")}
            />

            <Button type="submit" variant="primary" size="md" loading={loading} className="mt-2">
              Start managing orders
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
