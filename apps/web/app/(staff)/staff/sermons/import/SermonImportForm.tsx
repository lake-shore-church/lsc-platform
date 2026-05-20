"use client";

import { useActionState, useState } from "react";
import { importSermonFromYouTube, type ImportSermonState } from "./actions";

function parseYouTubeTitle(url: string): string {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu")) return "";
  } catch {
    return "";
  }
  return "";
}

export function SermonImportForm() {
  const [state, formAction, pending] = useActionState<ImportSermonState, FormData>(
    importSermonFromYouTube,
    null,
  );
  const [title, setTitle] = useState("");

  return (
    <form action={formAction} className="mt-8 max-w-xl space-y-5">
      <div>
        <label htmlFor="youtubeUrl" className="block text-sm font-semibold">
          YouTube URL
        </label>
        <input
          id="youtubeUrl"
          name="youtubeUrl"
          type="url"
          required
          placeholder="https://www.youtube.com/watch?v=..."
          className="mt-1 w-full rounded-md border border-default px-3 py-2"
          onBlur={(e) => {
            if (!title && e.target.value) {
              setTitle(parseYouTubeTitle(e.target.value));
            }
          }}
        />
      </div>
      <div>
        <label htmlFor="title" className="block text-sm font-semibold">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 w-full rounded-md border border-default px-3 py-2"
        />
      </div>
      <div>
        <label htmlFor="scripture" className="block text-sm font-semibold">
          Scripture reference
        </label>
        <input
          id="scripture"
          name="scripture"
          type="text"
          required
          placeholder="Luke 24:36–53"
          className="mt-1 w-full rounded-md border border-default px-3 py-2"
        />
      </div>
      <div>
        <label htmlFor="seriesSlug" className="block text-sm font-semibold">
          Series
        </label>
        <select
          id="seriesSlug"
          name="seriesSlug"
          className="mt-1 w-full rounded-md border border-default px-3 py-2"
        >
          <option value="sunday-sermons">Sunday Sermons</option>
          <option value="sheer-goodness-of-jesus">The Sheer Goodness of Jesus</option>
        </select>
      </div>
      <div>
        <label htmlFor="excerpt" className="block text-sm font-semibold">
          Excerpt (2–3 sentences)
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          required
          rows={4}
          className="mt-1 w-full rounded-md border border-default px-3 py-2"
        />
      </div>
      <div>
        <label htmlFor="publishedAt" className="block text-sm font-semibold">
          Date preached (optional)
        </label>
        <input
          id="publishedAt"
          name="publishedAt"
          type="date"
          className="mt-1 w-full rounded-md border border-default px-3 py-2"
        />
      </div>
      {state?.error ? <p className="text-sm text-red-600">{state.error}</p> : null}
      {state?.success ? <p className="text-sm text-green-700">{state.success}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="min-h-[44px] rounded-md bg-brand-primary px-6 font-semibold text-white disabled:opacity-60"
      >
        {pending ? "Saving…" : "Publish to Sanity"}
      </button>
    </form>
  );
}
