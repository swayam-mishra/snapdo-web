import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

interface ResetForm {
  password: string;
  confirm: string;
}

export default function ResetPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<ResetForm>();

  const onSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    toast.success("Password updated. Please log in.");
    navigate("/login");
  };

  return (
    <div className="w-full max-w-sm">
      <h1 className="text-heading-xl text-ink mb-2">Set a new password</h1>
      <p className="text-body-md text-shade-50 mb-8">Must be at least 8 characters.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <Input
          label="New password"
          type="password"
          placeholder="Min. 8 characters"
          error={errors.password?.message}
          {...register("password", {
            required: "Password is required",
            minLength: { value: 8, message: "At least 8 characters" },
          })}
        />
        <Input
          label="Confirm password"
          type="password"
          placeholder="Repeat your new password"
          error={errors.confirm?.message}
          {...register("confirm", {
            required: "Please confirm your password",
            validate: (v) => v === watch("password") || "Passwords don't match",
          })}
        />
        <Button type="submit" variant="primary" size="md" loading={loading} className="mt-1">
          Update password
        </Button>
      </form>
    </div>
  );
}
