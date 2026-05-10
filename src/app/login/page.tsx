"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import kyInstance from "@/lib/ky";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setLoading(true);

      const res: any = await kyInstance
        .post("auth/login", {
          json: {
            email: email.trim().toLowerCase(),
            password,
          },
        })
        .json();

      const user = res?.data?.user;

      if (!user) {
        toast.error("Login failed");
        return;
      }

      localStorage.setItem("tfp_user", JSON.stringify(user));

      toast.success("Login successful");
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-6xl grid lg:grid-cols-[1.1fr_0.9fr] overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
        <section className="relative hidden lg:flex flex-col justify-between bg-primary text-primary-foreground p-10 overflow-hidden">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
              <ShieldCheck size={16} />
              Secure Dashboard Access
            </div>

            <h1 className="mt-8 text-4xl font-bold leading-tight">
              TFP Coding Classes Management System
            </h1>

          </div>

          <div className="relative z-10 grid grid-cols-3 gap-4">
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-2xl font-bold">Admin</p>
              <p className="text-xs text-white/60">Control Panel</p>
            </div>

            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-2xl font-bold">TFP</p>
              <p className="text-xs text-white/60">Coding Classes</p>
            </div>

          </div>
        </section>

        <section className="p-6 sm:p-10 lg:p-12">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-10">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
                <LockKeyhole size={24} />
              </div>

              <h2 className="text-3xl font-bold tracking-tight">
                Welcome Back
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Login to continue to your TFP dashboard.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />

                  <input
                    type="email"
                    placeholder="admin@tfp.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 w-full rounded-xl border border-border bg-muted/40 pl-11 pr-4 text-sm outline-none transition focus:bg-background focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12 w-full rounded-xl border border-border bg-muted/40 pl-11 pr-12 text-sm outline-none transition focus:bg-background focus:ring-2 focus:ring-primary/20"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground font-medium shadow-lg transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading && <Loader2 size={18} className="animate-spin" />}
                {loading ? "Logging in..." : "Login to Dashboard"}
              </button>
            </form>

            <p className="mt-8 text-center text-xs text-muted-foreground">
              TFP Coding Classes © Dashboard System
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}