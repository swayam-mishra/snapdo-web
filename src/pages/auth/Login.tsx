import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();

  const onSubmit = async (_data: LoginForm) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    toast.success("Welcome back!");
    navigate("/dashboard");
  };

  return (
    <div className="w-full max-w-sm">
      <h1 className="text-heading-xl text-ink mb-2">Log in to Snapdo</h1>
      <p className="text-body-md text-shade-50 mb-8">
        Don't have an account?{" "}
        <Link to="/signup" className="text-ink underline hover:no-underline">Sign up free</Link>
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
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-caption text-ink font-[500]">Password</label>
            <Link to="/forgot-password" className="text-micro text-shade-50 hover:text-ink transition-colors">
              Forgot password?
            </Link>
          </div>
          <input
            type="password"
            placeholder="Your password"
            className={`w-full bg-canvas-light text-ink text-body-md rounded-md border px-3 py-[10px] outline-none transition-colors placeholder:text-shade-40 ${errors.password ? "border-red-500 ring-1 ring-red-500" : "border-hairline-light focus:border-ink focus:ring-1 focus:ring-ink"}`}
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <p className="text-micro text-red-500">{errors.password.message}</p>}
        </div>

        <Button type="submit" variant="primary" size="md" loading={loading} className="mt-1">
          Log in
        </Button>
      </form>
    </div>
  );
}
