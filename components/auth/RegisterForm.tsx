"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useApp } from "@/context/AppContext";
import { Mail, Lock, User, AtSign, Sprout, Camera, FileText } from "lucide-react";
import Link from "next/link";

export default function RegisterForm() {
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    bio: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState<1 | 2>(1);
  const { register, isAuthenticated } = useApp();
  const router = useRouter();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }
    setError("");
    setLoading(true);
    try {
      const success = await register(form);
      if (success) {
        router.push("/dashboard");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const update =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm({ ...form, [field]: e.target.value });

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2.5 mb-6">
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-sm">
            <Sprout className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold text-gray-900">
            Grow<span className="text-emerald-500">ora</span>
          </span>
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">
          {step === 1 ? "Create your account" : "Tell us about you"}
        </h1>
        <p className="mt-2 text-gray-600">
          {step === 1
            ? "Join the community and start swapping skills"
            : "Add a photo and bio to help others know you (optional)"}
        </p>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <div
            className={`w-8 h-1 rounded-full ${
              step >= 1 ? "bg-emerald-500" : "bg-gray-200"
            }`}
          />
          <div
            className={`w-8 h-1 rounded-full ${
              step >= 2 ? "bg-emerald-500" : "bg-gray-200"
            }`}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600">
            {error}
          </div>
        )}

        {step === 1 ? (
          <>
            <Input
              label="Full Name"
              placeholder="John Doe"
              icon={<User className="w-4 h-4" />}
              value={form.fullName}
              onChange={update("fullName")}
              required
            />

            <Input
              label="Username"
              placeholder="johndoe"
              icon={<AtSign className="w-4 h-4" />}
              value={form.username}
              onChange={update("username")}
              required
            />

            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              icon={<Mail className="w-4 h-4" />}
              value={form.email}
              onChange={update("email")}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              icon={<Lock className="w-4 h-4" />}
              value={form.password}
              onChange={update("password")}
              required
            />
          </>
        ) : (
          <>
            {/* Profile photo upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Photo
              </label>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center border-2 border-dashed border-emerald-300">
                  <Camera className="w-8 h-8 text-emerald-400" />
                </div>
                <div>
                  <button
                    type="button"
                    className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Choose Photo
                  </button>
                  <p className="text-xs text-gray-400 mt-1">
                    JPG, PNG. Max 5MB
                  </p>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Bio
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-3 text-gray-400">
                  <FileText className="w-4 h-4" />
                </div>
                <textarea
                  placeholder="Tell others about yourself, your skills, and what you want to learn..."
                  value={form.bio}
                  onChange={update("bio")}
                  rows={4}
                  className="w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 resize-none"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {form.bio.length}/300 characters
              </p>
            </div>
          </>
        )}

        {step === 1 ? (
          <>
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500 mt-0.5"
                required
              />
              <span className="text-sm text-gray-600">
                I agree to the{" "}
                <a href="#" className="text-emerald-600 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-emerald-600 hover:underline">
                  Privacy Policy
                </a>
              </span>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Continue
            </Button>
          </>
        ) : (
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(1)}
              className="flex-1"
              size="lg"
            >
              Back
            </Button>
            <Button
              type="submit"
              loading={loading}
              className="flex-1"
              size="lg"
            >
              Create Account
            </Button>
          </div>
        )}

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-emerald-600 hover:text-emerald-700 font-semibold"
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
