import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

interface SignupForm {
  email: string;
  password: string;
  agreed: boolean;
}

export default function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<SignupForm>();

  const onSubmit = async (_data: SignupForm) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    toast.success("Account created! Let's set up your business.");
    navigate("/onboarding");
  };

  return (
    <div className="w-full max-w-sm">
      <h1 className="text-heading-xl text-ink mb-2">Create your account</h1>
      <p className="text-body-md text-shade-50 mb-8">
        Already have one?{" "}
        <Link to="/login" className="text-ink underline hover:no-underline">Log in</Link>
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
        <Input
          label="Password"
          type="password"
          placeholder="Min. 8 characters"
          error={errors.password?.message}
          {...register("password", {
            required: "Password is required",
            minLength: { value: 8, message: "At least 8 characters" },
          })}
        />

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="mt-0.5 w-4 h-4 rounded accent-black"
            {...register("agreed", { required: "You must agree to continue" })}
          />
          <span className="text-caption text-shade-50">
            By signing up you agree to our{" "}
            <Link to="/terms" className="text-ink underline hover:no-underline">Terms</Link>
            {" "}and{" "}
            <Link to="/privacy" className="text-ink underline hover:no-underline">Privacy Policy</Link>.
          </span>
        </label>
        {errors.agreed && (
          <p className="text-micro text-red-500 -mt-3">{errors.agreed.message}</p>
        )}

        <Button type="submit" variant="primary" size="md" loading={loading} className="mt-1">
          Create account
        </Button>
      </form>
    </div>
  );
}
