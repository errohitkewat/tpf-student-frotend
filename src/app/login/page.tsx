"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import kyInstance from "@/lib/ky";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      const res: any = await kyInstance
        .post("auth/login", {
          json: {
            email,
            password,
          },
        })
        .json();

      console.log("Login Response:", res);

      // exact backend response structure
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
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-2xl bg-gray-100 p-8 shadow-xl"
      >
        <h1 className="text-2xl uppercase text-center font-bold text-zinc-900">
          Login
        </h1>

        <p className="mt-2 text-center text-sm text-zinc-500">
          Enter your credentials to access dashboard
        </p>

        <div className="mt-10 space-y-4">
          <input
            type="email"
            placeholder="Enter email"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-zinc-900"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter password"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-zinc-900"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-zinc-900 py-3 text-white font-medium disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </main>
  );
}