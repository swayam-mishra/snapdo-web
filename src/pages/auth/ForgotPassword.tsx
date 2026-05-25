import { useState } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { ArrowLeft } from "lucide-react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function ForgotPassword() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, getValues, formState: { errors } } = useForm<{ email: string }>();

  const onSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="w-full max-w-sm text-center">
        <div className="w-14 h-14 rounded-full bg-aloe flex items-center justify-center mx-auto mb-5">
          <span className="text-2xl">📬</span>
        </div>
        <h1 className="text-heading-xl text-ink mb-2">Check your inbox</h1>
        <p className="text-body-md text-shade-50 mb-6">
          We sent a reset link to <strong className="text-ink">{getValues("email")}</strong>.
        </p>
        <Link to="/login">
          <Button variant="outline-light" size="sm">
            <ArrowLeft size={14} /> Back to login
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm">
      <Link to="/login" className="flex items-center gap-1.5 text-caption text-shade-50 hover:text-ink transition-colors mb-8">
        <ArrowLeft size={14} /> Back to login
      </Link>
      <h1 className="text-heading-xl text-ink mb-2">Reset your password</h1>
      <p className="text-body-md text-shade-50 mb-8">
        Enter your email and we'll send you a reset link.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <Input
          label="Email"
          type="email"
          placeholder="you@business.com"
          error={errors.email?.message}
          {...register("email", {
            required: "Email is required",
            pattern: { value: /\S+@\S+\.\S+/, message: "Enter a valid email" },
          })}
        />
        <Button type="submit" variant="primary" size="md" loading={loading}>
          Send reset link
        </Button>
      </form>
    </div>
  );
}
