"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: fd.get("name"),
        email: fd.get("email"),
        message: fd.get("message"),
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setStatus("error");
      setMessage(data.error ?? "Failed to send.");
      return;
    }
    setStatus("success");
    setMessage("Thank you! We will respond soon.");
    e.currentTarget.reset();
  }

  if (status === "success") {
    return <p className="rounded-xl border border-default bg-surface p-6">{message}</p>;
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input name="name" required placeholder="Name" className="w-full min-h-[44px] rounded-lg border border-default bg-background px-3" />
      <input name="email" type="email" required placeholder="Email" className="w-full min-h-[44px] rounded-lg border border-default bg-background px-3" />
      <textarea name="message" required rows={5} placeholder="Message" className="w-full rounded-lg border border-default bg-background px-3 py-2" />
      {status === "error" ? <p className="text-sm text-red-600">{message}</p> : null}
      <Button type="submit" disabled={status === "loading"}>Send message</Button>
    </form>
  );
}
