import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../validation/registerSchema";
import toast from "react-hot-toast";
import { Loader, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Register() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("phone", data.phone);
      if (data.profilePic?.[0]) {
        formData.append("profilePic", data.profilePic[0]);
      }

      await registerUser(formData);
      toast.success("Registration successful!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
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

      {/* Glass Effect Form with Animation */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative bg-white/30 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-white">
          Create Account
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* Name */}
          <div>
            <input
              type="text"
              placeholder="Full Name"
              {...register("name")}
              className="w-full rounded-xl px-4 py-2 focus:ring-1 focus:ring-green-300 focus:outline-none transition bg-white/50"
            />
            {errors.name && (
              <p className="text-green-300 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="w-full rounded-xl px-4 py-2 focus:ring-1 focus:ring-green-300 focus:outline-none transition bg-white/50"
            />
            {errors.email && (
              <p className="text-green-300 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
              className="w-full rounded-xl px-4 py-2 pr-10 focus:ring-1 focus:ring-green-300 focus:outline-none transition bg-white/50"
            />
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-white"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
            {errors.password && (
              <p className="text-green-300 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <input
              type="text"
              placeholder="Phone number"
              {...register("phone")}
              className="w-full rounded-xl px-4 py-2 focus:ring-1 focus:ring-green-300 focus:outline-none transition bg-white/50"
            />
            {errors.phone && (
              <p className="text-green-300 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          {/* Profile Picture */}
          <div>
            <input
              type="file"
              accept="image/*"
              {...register("profilePic")}
              className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 
                         file:rounded-lg file:border-0 
                         file:text-sm file:font-medium
                         file:bg-green-200 file:text-green-900
                         hover:file:bg-green-300 cursor-pointer"
            />
            {errors.profilePic && (
              <p className="text-green-300 text-sm mt-1">{errors.profilePic.message}</p>
            )}
          </div>

          {/* Button */}
          <div className="flex justify-center w-full">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-3/4 px-2 bg-gradient-to-b from-green-500 via-green-600 to-green-700 text-white py-2 rounded-xl font-medium hover:opacity-90 transition disabled:opacity-60 flex justify-center"
            >
              {isSubmitting ? (
                <Loader className="animate-spin h-5 w-5 text-white" />
              ) : (
                "Register"
              )}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-white">
          Already have an account?{" "}
          <Link to="/login" className="text-white font-semibold hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </section>
  );
}
