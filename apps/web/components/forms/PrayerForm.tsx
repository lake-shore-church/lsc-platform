"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

export type PrayerFormLabels = {
  public: string;
  private: string;
  nameOptional: string;
  share: string;
  submit: string;
  success: string;
};

export function PrayerForm({ labels }: { labels?: PrayerFormLabels }) {
  const t = useTranslations("prayer");
  const L = labels ?? {
    public: t("public"),
    private: t("private"),
    nameOptional: t("name_optional"),
    share: t("share"),
    submit: t("submit"),
    success: t("success"),
  };

  const [isPrivate, setIsPrivate] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/prayer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: fd.get("name"),
        content: fd.get("content"),
        is_private: isPrivate,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setStatus("error");
      setMessage(data.error ?? "Something went wrong.");
      return;
    }
    setStatus("success");
    setMessage(L.success);
    e.currentTarget.reset();
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-brand-accent bg-surface p-6 text-foreground-primary">
        <p>{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-xl border border-default bg-surface p-6">
      <div className="flex gap-4">
        <label className="flex min-h-[44px] cursor-pointer items-center gap-2">
          <input type="radio" checked={!isPrivate} onChange={() => setIsPrivate(false)} />
          {L.public}
        </label>
        <label className="flex min-h-[44px] cursor-pointer items-center gap-2">
          <input type="radio" checked={isPrivate} onChange={() => setIsPrivate(true)} />
          {L.private}
        </label>
      </div>
      <input
        name="name"
        placeholder={L.nameOptional}
        className="w-full min-h-[44px] rounded-lg border border-default bg-background px-3"
      />
      <textarea
        name="content"
        required
        rows={5}
        placeholder={L.share}
        className="w-full rounded-lg border border-default bg-background px-3 py-2"
      />
      {status === "error" ? <p className="text-sm text-red-600">{message}</p> : null}
      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "…" : L.submit}
      </Button>
    </form>
  );
}
