import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, Link } from "react-router-dom";
import { UserPlus, Mail, Lock, User, ArrowRight } from "lucide-react";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Confirm password is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    console.log("Registration data:", data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    navigate("/login");
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left Side: Visual/Aesthetic */}
      <div className="hidden lg:flex bg-[#1A1A1A] text-white p-24 flex-col justify-between relative overflow-hidden">
        <div className="relative z-10">
          <Link to="/" className="text-3xl serif tracking-tighter hover:opacity-70 transition-opacity">
            maison<span className="text-[#C2714F]">.</span>
          </Link>
          <div className="mt-32 max-w-md space-y-8">
            <h2 className="serif text-6xl leading-tight">Join the <br /> collective.</h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Unlock exclusive access to new arrivals, sustainable collections, and curated fashion insights.
            </p>
          </div>
        </div>
        
        <div className="relative z-10 flex items-center gap-4 text-[10px] uppercase tracking-widest font-bold text-gray-500">
          <div className="w-12 h-[1px] bg-gray-800" />
          <span>Established 2026</span>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-[-10%] right-[-10%] w-[80%] h-[80%] bg-[#C2714F] opacity-5 rounded-full blur-[120px]" />
      </div>

      {/* Right Side: Form */}
      <div className="flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-12">
          <div className="space-y-4">
            <h1 className="serif text-4xl">Create account</h1>
            <p className="text-sm text-[#999] uppercase tracking-widest font-medium">Please enter your details</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Name */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#6B6B6B]">Full Name</label>
              <div className="relative group">
                <User className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999] group-focus-within:text-black transition-colors" />
                <input
                  {...register("name")}
                  className="w-full bg-transparent border-none border-b border-black/10 py-4 pl-8 text-sm outline-none focus:border-black transition-all"
                  placeholder="Jane Doe"
                />
              </div>
              {errors.name && <p className="text-red-500 text-[10px] uppercase font-bold">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#6B6B6B]">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999] group-focus-within:text-black transition-colors" />
                <input
                  {...register("email")}
                  className="w-full bg-transparent border-none border-b border-black/10 py-4 pl-8 text-sm outline-none focus:border-black transition-all"
                  placeholder="jane@example.com"
                />
              </div>
              {errors.email && <p className="text-red-500 text-[10px] uppercase font-bold">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#6B6B6B]">Password</label>
              <div className="relative group">
                <Lock className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999] group-focus-within:text-black transition-colors" />
                <input
                  {...register("password")}
                  type="password"
                  className="w-full bg-transparent border-none border-b border-black/10 py-4 pl-8 text-sm outline-none focus:border-black transition-all"
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="text-red-500 text-[10px] uppercase font-bold">{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#6B6B6B]">Confirm Password</label>
              <div className="relative group">
                <Lock className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999] group-focus-within:text-black transition-colors" />
                <input
                  {...register("confirmPassword")}
                  type="password"
                  className="w-full bg-transparent border-none border-b border-black/10 py-4 pl-8 text-sm outline-none focus:border-black transition-all"
                  placeholder="••••••••"
                />
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-[10px] uppercase font-bold">{errors.confirmPassword.message}</p>}
            </div>

            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full bg-black text-white py-6 text-[11px] uppercase tracking-[0.3em] font-bold flex items-center justify-center gap-4 hover:bg-[#C2714F] transition-all disabled:opacity-50"
            >
              {isSubmitting ? "Creating account..." : "Join Collective"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center pt-8">
            <p className="text-xs text-[#999] uppercase tracking-widest">
              Already a member?{" "}
              <Link to="/login" className="text-black font-bold border-b border-black hover:text-[#C2714F] hover:border-[#C2714F] transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
