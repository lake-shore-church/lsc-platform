"use client";

import * as Popover from "@radix-ui/react-popover";
import { useCallback, useEffect, useState } from "react";
import { cn } from "./lib/cn";

export type ThemeId = "default" | "advent" | "easter" | "warm";
export type ModeId = "light" | "dark" | "reading";

const THEME_KEY = "lsc-theme";
const MODE_KEY = "lsc-mode";

const THEMES: {
  id: ThemeId;
  label: string;
  swatch: string;
  tooltip: string;
  description: string;
}[] = [
  {
    id: "default",
    label: "Default",
    swatch: "#1B4F8A",
    tooltip: "Everyday",
    description: "Default (deep blue) — Everyday",
  },
  {
    id: "advent",
    label: "Advent",
    swatch: "#7C1D1D",
    tooltip: "Christmas & Advent",
    description: "Advent (burgundy) — Christmas & Advent",
  },
  {
    id: "easter",
    label: "Easter",
    swatch: "#166534",
    tooltip: "Easter & Spring",
    description: "Easter (green) — Easter & Spring",
  },
  {
    id: "warm",
    label: "Warm",
    swatch: "#5C4033",
    tooltip: "Warm & Welcoming",
    description: "Warm (brown) — Welcoming & Community",
  },
];

const MODES: { id: ModeId; label: string; icon: string }[] = [
  { id: "light", label: "Light", icon: "☀️" },
  { id: "dark", label: "Dark", icon: "🌙" },
  { id: "reading", label: "Reading", icon: "📖" },
];

const VALID_THEMES = new Set<ThemeId>(["default", "advent", "easter", "warm"]);

function getSystemMode(): ModeId {
  if (typeof window === "undefined") return "light";
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
  const stored = localStorage.getItem(THEME_KEY);
  if (stored && VALID_THEMES.has(stored as ThemeId)) {
    return stored as ThemeId;
  }
  return fallback;
}

function readStoredMode(): ModeId {
  const stored = localStorage.getItem(MODE_KEY);
  if (stored === "light" || stored === "dark" || stored === "reading") {
    return stored;
  }
  return getSystemMode();
}

export type ThemeSwitcherProps = {
  /** Sanity `siteConfig.activeTheme` — used when user has no localStorage preference */
  cmsDefaultTheme?: ThemeId;
};

export function ThemeSwitcher({ cmsDefaultTheme = "default" }: ThemeSwitcherProps) {
  const [theme, setTheme] = useState<ThemeId>(cmsDefaultTheme);
  const [mode, setMode] = useState<ModeId>("light");
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = readStoredTheme(cmsDefaultTheme);
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
        applyTheme(readStoredTheme(cmsDefaultTheme), next);
      }
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [cmsDefaultTheme]);

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

  if (!mounted) {
    return null;
  }

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          type="button"
          className={cn(
            "fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full",
            "border border-strong bg-surface text-foreground-primary shadow-lg",
            "hover:bg-surface-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
            "transition-colors duration-300",
          )}
          aria-label="Open appearance settings"
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
          className={cn(
            "z-50 w-72 rounded-lg border border-default bg-surface p-4 shadow-xl",
            "max-sm:mb-2",
          )}
          aria-label="Appearance settings"
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-foreground-muted">
            Mode
          </p>
          <div className="mb-4 grid grid-cols-3 gap-2" role="group" aria-label="Color mode">
            {MODES.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setModeAndStore(m.id)}
                className={cn(
                  "flex min-h-[44px] flex-col items-center justify-center gap-1 rounded-md border px-2 py-2 text-xs",
                  "transition-colors duration-300",
                  mode === m.id
                    ? "border-brand-primary bg-surface-2 text-brand-primary"
                    : "border-default bg-background text-foreground-secondary hover:bg-surface",
                )}
                aria-label={`${m.label} mode`}
                aria-pressed={mode === m.id}
              >
                <span aria-hidden>{m.icon}</span>
                <span>{m.label}</span>
              </button>
            ))}
          </div>

          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-foreground-muted">
            Theme
          </p>
          <div className="grid grid-cols-4 gap-2" role="group" aria-label="Seasonal theme">
            {THEMES.map((t) => (
              <button
                key={t.id}
                type="button"
                title={t.tooltip}
                onClick={() => setThemeAndStore(t.id)}
                className={cn(
                  "flex min-h-[44px] flex-col items-center justify-center gap-1 rounded-md border px-1 py-2 text-xs",
                  "transition-colors duration-300",
                  theme === t.id
                    ? "border-brand-primary bg-surface-2 text-brand-primary"
                    : "border-default bg-background text-foreground-secondary hover:bg-surface",
                )}
                aria-label={`${t.label} theme — ${t.tooltip}`}
                aria-pressed={theme === t.id}
              >
                <span
                  className="h-5 w-5 rounded-full border border-default"
                  style={{ backgroundColor: t.swatch }}
                  aria-hidden
                />
                <span>{t.label}</span>
              </button>
            ))}
          </div>

          <ul className="mt-3 space-y-1 border-t border-default pt-3 text-xs text-foreground-muted">
            {THEMES.map((t) => (
              <li key={t.id} className="flex gap-1.5">
                <span
                  className="mt-0.5 inline-block h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: t.swatch }}
                  aria-hidden
                />
                <span>{t.description}</span>
              </li>
            ))}
          </ul>

          <Popover.Arrow className="fill-surface" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
