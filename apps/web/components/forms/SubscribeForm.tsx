"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function SubscribeForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: fd.get("email") }),
    });
    if (!res.ok) {
      setStatus("error");
      return;
    }
    setStatus("success");
    e.currentTarget.reset();
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2 sm:flex-row">
      <input name="email" type="email" required placeholder="your@email.com" className="min-h-[44px] flex-1 rounded-lg border border-default bg-background px-3" aria-label="Email" />
      <Button type="submit" disabled={status === "loading"}>
        {status === "success" ? "Subscribed!" : "Subscribe"}
      </Button>
      {status === "error" ? <p className="text-sm text-red-600 w-full">Could not subscribe.</p> : null}
    </form>
  );
}
