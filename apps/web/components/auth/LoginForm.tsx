"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function LoginForm({ redirectTo }: { redirectTo: string }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createSupabaseBrowserClient();
    const origin = window.location.origin;
    const { error: signInError } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: `${origin}/auth/callback?redirect=${encodeURIComponent(redirectTo)}`,
      },
    });

    setLoading(false);
    if (signInError) {
      setError(signInError.message);
      return;
    }

    window.location.href = `/login?message=check-email&redirect=${encodeURIComponent(redirectTo)}`;
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-foreground">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full min-h-[44px] rounded-md border border-default bg-surface px-3 text-base text-foreground"
          placeholder="you@example.com"
        />
      </div>
      {error ? (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={loading}
        className="w-full min-h-[44px] rounded-md bg-brand-primary px-4 text-base font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {loading ? "Sending link…" : "Email me a sign-in link"}
      </button>
    </form>
  );
}
