"use client";

import * as Popover from "@radix-ui/react-popover";
import { useCallback, useEffect, useState } from "react";
import { cn } from "./lib/cn";

export type ThemeId = "bold" | "warm" | "advent" | "easter";
export type ModeId = "light" | "dark" | "reading";

const THEME_KEY = "lsc-theme";
const MODE_KEY = "lsc-mode";

const THEMES: {
  id: ThemeId;
  label: string;
  swatch: string;
  personality: string;
}[] = [
  {
    id: "bold",
    label: "Bold",
    swatch: "#1A1A2E",
    personality: "Bold & Powerful — sermon-first, modern, high contrast",
  },
  {
    id: "warm",
    label: "Warm",
    swatch: "#2D4A22",
    personality: "Warm & Welcoming — community, neighbourhood church",
  },
  {
    id: "advent",
    label: "Advent",
    swatch: "#6B1A1A",
    personality: "Advent & Christmas — rich, reverent, celebratory",
  },
  {
    id: "easter",
    label: "Easter",
    swatch: "#1B5E3B",
    personality: "Easter & Spring — fresh, hopeful, joyful",
  },
];

const MODES: { id: ModeId; label: string; icon: string; hint: string }[] = [
  { id: "light", label: "Light", icon: "☀️", hint: "Bright & open" },
  { id: "dark", label: "Dark", icon: "🌙", hint: "Low light" },
  { id: "reading", label: "Reading", icon: "📖", hint: "Serif & spacious" },
];

const VALID_THEMES = new Set<ThemeId>(["bold", "warm", "advent", "easter"]);

function normalizeTheme(raw: string | null, fallback: ThemeId): ThemeId {
  if (raw === "default") return "bold";
  if (raw && VALID_THEMES.has(raw as ThemeId)) return raw as ThemeId;
  return fallback;
}

function getSystemMode(): ModeId {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: ThemeId, mode: ModeId) {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  root.setAttribute("data-mode", mode);
}

function readStoredTheme(fallback: ThemeId): ThemeId {
  return normalizeTheme(localStorage.getItem(THEME_KEY), fallback);
}

function readStoredMode(): ModeId {
  const stored = localStorage.getItem(MODE_KEY);
  if (stored === "light" || stored === "dark" || stored === "reading") {
    return stored;
  }
  return getSystemMode();
}

export type ThemeSwitcherProps = {
  cmsDefaultTheme?: ThemeId;
};

export function ThemeSwitcher({ cmsDefaultTheme = "bold" }: ThemeSwitcherProps) {
  const fallback = normalizeTheme(cmsDefaultTheme, "bold");
  const [theme, setTheme] = useState<ThemeId>(fallback);
  const [mode, setMode] = useState<ModeId>("dark");
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = readStoredTheme(fallback);
    const m = readStoredMode();
    setTheme(t);
    setMode(m);
    applyTheme(t, m);
    setMounted(true);

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (!localStorage.getItem(MODE_KEY)) {
        const next = getSystemMode();
        setMode(next);
        applyTheme(readStoredTheme(fallback), next);
      }
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [fallback]);

  const setThemeAndStore = useCallback(
    (next: ThemeId) => {
      setTheme(next);
      localStorage.setItem(THEME_KEY, next);
      applyTheme(next, mode);
    },
    [mode],
  );

  const setModeAndStore = useCallback(
    (next: ModeId) => {
      setMode(next);
      localStorage.setItem(MODE_KEY, next);
      applyTheme(theme, next);
    },
    [theme],
  );

  if (!mounted) return null;

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          type="button"
          className={cn(
            "fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full",
            "border border-strong bg-surface text-foreground-primary shadow-card",
            "hover:bg-surface-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
          )}
          style={{ transitionDuration: "var(--transition-speed)" }}
          aria-label="Design & appearance"
          aria-haspopup="dialog"
          aria-expanded={open}
        >
          <span className="text-xl" aria-hidden>
            {MODES.find((m) => m.id === mode)?.icon ?? "☀️"}
          </span>
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          side="top"
          align="end"
          sideOffset={12}
          className="z-50 w-80 rounded-card border border-default bg-surface p-5 shadow-card"
          aria-label="Design & appearance"
        >
          <p className="font-display text-sm font-semibold text-foreground-primary">
            Design personality
          </p>
          <p className="mt-1 text-xs text-foreground-muted">
            Each theme changes typography, spacing, and layout feel — not just colours.
          </p>

          <p className="mb-2 mt-4 text-label text-foreground-muted">Mode</p>
          <div className="grid grid-cols-3 gap-2" role="group" aria-label="Color mode">
            {MODES.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setModeAndStore(m.id)}
                className={cn(
                  "flex min-h-[48px] flex-col items-center justify-center gap-0.5 rounded-card border px-2 py-2 text-xs",
                  mode === m.id
                    ? "border-brand-primary bg-surface-2 text-brand-primary"
                    : "border-default bg-background text-foreground-secondary hover:bg-surface",
                )}
                aria-pressed={mode === m.id}
              >
                <span aria-hidden>{m.icon}</span>
                <span className="font-semibold">{m.label}</span>
                <span className="text-[10px] text-foreground-muted">{m.hint}</span>
              </button>
            ))}
          </div>

          <p className="mb-2 mt-4 text-label text-foreground-muted">Theme</p>
          <div className="space-y-2" role="group" aria-label="Design theme">
            {THEMES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setThemeAndStore(t.id)}
                className={cn(
                  "flex w-full items-start gap-3 rounded-card border p-3 text-left transition-colors",
                  theme === t.id
                    ? "border-brand-primary bg-surface-2"
                    : "border-default bg-background hover:bg-surface",
                )}
                aria-pressed={theme === t.id}
              >
                <span
                  className="mt-0.5 h-8 w-8 shrink-0 rounded-full border border-default"
                  style={{ backgroundColor: t.swatch }}
                  aria-hidden
                />
                <span>
                  <span className="block text-sm font-semibold text-foreground-primary">
                    {t.label}
                  </span>
                  <span className="mt-0.5 block text-xs text-foreground-muted">
                    {t.personality}
                  </span>
                </span>
              </button>
            ))}
          </div>

          <Popover.Arrow className="fill-surface" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
