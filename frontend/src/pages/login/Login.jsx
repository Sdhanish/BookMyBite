import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { loginSchema } from "../../validation/loginSchema";
import { Loader, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      toast.success("Login successful!");
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/banner-2.jpg')",
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60" />

      {/* Motion Form Container */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative bg-white/30 backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/20"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-white drop-shadow">
          Welcome Back 👋
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="w-full rounded-xl px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none transition bg-white/70 text-gray-800 placeholder-gray-500"
            />
            {errors.email && (
              <p className="text-orange-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
              className="w-full rounded-xl px-4 py-2 pr-10 focus:ring-2 focus:ring-green-400 focus:outline-none transition bg-white/70 text-gray-800 placeholder-gray-500"
            />
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600 hover:text-green-500 transition"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
            {errors.password && (
              <p className="text-orange-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="flex w-full justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-1/2 px-2 bg-gradient-to-b from-green-500 via-green-600 to-green-700 text-white py-2 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-60 flex justify-center"
            >
              {isSubmitting ? (
                <Loader className="animate-spin h-5 w-5 text-white" />
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-white">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-green-300 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </motion.div>
    </section>
  );
}
