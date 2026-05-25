import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

const settingsNav = [
  { label: "Profile", to: "/settings/profile" },
  { label: "Organization", to: "/settings/organization" },
  { label: "API Keys", to: "/settings/api-keys" },
  { label: "Webhooks", to: "/settings/webhooks" },
  { label: "Billing", to: "/settings/billing" },
  { label: "Notifications", to: "/settings/notifications" },
];

interface ProfileForm {
  businessName: string;
  gstNumber: string;
  state: string;
  address: string;
  currency: string;
}

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu & Kashmir", "Ladakh", "Puducherry",
];

export default function Profile() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProfileForm>({
    defaultValues: { currency: "INR" },
  });

  function onSubmit(_data: ProfileForm) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        toast.success("Business profile saved");
        resolve();
      }, 800);
    });
  }

  return (
    <div className="min-h-screen bg-canvas-cream px-6 py-8">
      <div className="max-w-3xl mx-auto">
        <nav className="flex flex-wrap gap-1 mb-8 bg-canvas-light rounded-pill border border-hairline-light p-1.5 shadow-elev-3">
          {settingsNav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="px-4 py-1.5 rounded-pill text-caption text-shade-50 hover:text-ink hover:bg-shade-30 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <h1 className="text-heading-xl text-ink mb-6">Business profile</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="bg-canvas-light rounded-xl border border-hairline-light shadow-elev-3 p-6 flex flex-col gap-5">
            <h2 className="text-heading-md text-ink">Business information</h2>

            <Input
              label="Business name"
              placeholder="Ramesh Kirana Store"
              error={errors.businessName?.message}
              {...register("businessName", { required: "Business name is required" })}
            />

            <Input
              label="GST number"
              placeholder="22AAAAA0000A1Z5"
              hint="15-digit GSTIN. Leave blank if not registered."
              {...register("gstNumber")}
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-caption text-ink font-[500]">State</label>
              <select
                className="w-full bg-canvas-light text-ink text-body-md rounded-md border border-hairline-light px-3 py-[10px] outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-colors"
                {...register("state")}
              >
                <option value="">Select state</option>
                {indianStates.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-caption text-ink font-[500]">Address</label>
              <textarea
                rows={3}
                placeholder="Shop No. 12, Market Road, Bangalore 560001"
                className="w-full bg-canvas-light text-ink text-body-md rounded-md border border-hairline-light px-3 py-[10px] outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-colors resize-none placeholder:text-shade-40"
                {...register("address")}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-caption text-ink font-[500]">Default currency</label>
              <select
                className="w-full bg-canvas-light text-ink text-body-md rounded-md border border-hairline-light px-3 py-[10px] outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-colors"
                {...register("currency")}
              >
                <option value="INR">INR — Indian Rupee</option>
                <option value="USD">USD — US Dollar</option>
                <option value="EUR">EUR — Euro</option>
              </select>
            </div>
          </div>

          <div className="bg-canvas-light rounded-xl border border-hairline-light shadow-elev-3 p-6">
            <h2 className="text-heading-md text-ink mb-2">Business logo</h2>
            <p className="text-caption text-shade-50 mb-4">Displayed on your GST invoices. PNG or JPG, max 2 MB.</p>
            <div className="border-2 border-dashed border-hairline-light rounded-xl flex flex-col items-center justify-center gap-3 py-10 cursor-pointer hover:border-shade-40 transition-colors">
              <div className="w-10 h-10 rounded-full bg-shade-30 flex items-center justify-center">
                <Upload size={18} className="text-shade-50" />
              </div>
              <p className="text-caption text-shade-50">Click to upload logo</p>
              <p className="text-micro text-shade-40">PNG, JPG up to 2 MB</p>
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" variant="primary" size="md" loading={isSubmitting}>
              Save profile
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
