"use client";

import { signIn } from "next-auth/react";
import { getSession } from "next-auth/react";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const result = await signIn(
      "credentials",
      {
        email,
        password,
        redirect: false,
      }
    );
    console.log(result);

    if (!result?.ok) {
      setError(
        "Email atau password salah"
      );
      setLoading(false);
      return;
    }

    const session =
      await getSession();

    if (
      session?.user?.role ===
      "ADMIN"
    ) {
      router.push(
        "/dashboard/admin"
      );
    } else {
      router.push(
        "/dashboard/user"
      );
    }

    setLoading(false);
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 border p-6 rounded"
      >
        <h1 className="text-2xl font-bold">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full border p-2 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full border p-2 rounded"
        />

        {error && (
          <p className="text-red-500">
            {error}
          </p>
        )}

        <button
          disabled={loading}
          className="w-full rounded bg-black p-2 text-white"
        >
          {loading
            ? "Loading..."
            : "Login"}
        </button>
      </form>
    </main>
  );
}