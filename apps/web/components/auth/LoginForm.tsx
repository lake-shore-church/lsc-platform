"use client";

import { useActionState } from "react";
import {
  sendMagicLink,
  type LoginActionState,
} from "@/app/login/actions";

export function LoginForm({ redirectTo }: { redirectTo: string }) {
  const [state, formAction, pending] = useActionState<LoginActionState, FormData>(
    sendMagicLink,
    null,
  );

  return (
    <form action={formAction} className="mt-8 space-y-4">
      <input type="hidden" name="redirect" value={redirectTo} />
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
          className="mt-1 w-full min-h-[44px] rounded-md border border-default bg-surface px-3 text-base text-foreground"
          placeholder="you@example.com"
        />
      </div>
      {state?.error ? (
        <p className="text-sm text-red-600" role="alert">
          {state.error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="w-full min-h-[44px] rounded-md bg-brand-primary px-4 text-base font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Sending link…" : "Email me a sign-in link"}
      </button>
    </form>
  );
}
