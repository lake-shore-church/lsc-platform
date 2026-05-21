"use client";

import { useEffect, useRef, useState } from "react";

export type LanguageOption = {
  code: string;
  label: string;
  flag: string;
};

export function LanguageSwitcher({
  locale,
  options,
  onSelect,
  className,
}: {
  locale: string;
  options: LanguageOption[];
  onSelect: (code: string) => void;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = options.find((o) => o.code === locale) ?? options[0];

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div ref={ref} className={`relative ${className ?? ""}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex min-h-[40px] items-center gap-2 rounded-md border border-default bg-surface px-3 text-sm font-semibold text-brand-primary"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span aria-hidden>{current?.flag}</span>
        <span className="hidden sm:inline">{current?.label}</span>
        <span className="sm:hidden">{locale.toUpperCase()}</span>
      </button>
      {open ? (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-50 mt-1 min-w-[11rem] rounded-card border border-default bg-surface py-1 shadow-card"
        >
          {options.map((opt) => (
            <li key={opt.code} role="option" aria-selected={opt.code === locale}>
              <button
                type="button"
                className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm hover:bg-surface-2"
                onClick={() => {
                  setOpen(false);
                  onSelect(opt.code);
                }}
              >
                <span aria-hidden>{opt.flag}</span>
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
