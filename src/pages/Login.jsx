import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

// Step 1: Define Zod schema (the blueprint)
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
});

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  // Step 2: Bridge Zod with RHF
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  // Step 3: onSubmit — only runs if Zod validation passes
  const onSubmit = (data) => {
    console.log("Validated data:", data);

    // Simulate API response with fake token
    const fakeToken = "fake-jwt-token-123";
    login(fakeToken);         // save token in Zustand
    navigate("/");            // redirect to home
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back</h1>
        <p className="text-sm text-gray-500 mb-6">Sign in to your account</p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* Email field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            {/* Step 4: Register input with RHF — no useState needed! */}
            <input
              {...register("email")}
              type="text"
              placeholder="you@example.com"
              className={`w-full px-4 py-2.5 border rounded-lg text-sm outline-none transition ${
                errors.email
                  ? "border-red-400 focus:border-red-500"
                  : "border-gray-300 focus:border-gray-500"
              }`}
            />
            {/* Step 5: Display Zod error messages */}
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              placeholder="Min. 8 characters"
              className={`w-full px-4 py-2.5 border rounded-lg text-sm outline-none transition ${
                errors.password
                  ? "border-red-400 focus:border-red-500"
                  : "border-gray-300 focus:border-gray-500"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-gray-900 text-white rounded-full font-medium text-sm hover:bg-gray-700 transition border-0 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Hint for testing */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-400 text-center">
            Test: any valid email + 8+ char password
          </p>
        </div>
      </div>
    </div>
  );
}