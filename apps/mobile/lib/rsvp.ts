const APP_URL = process.env.EXPO_PUBLIC_APP_URL ?? "http://localhost:3000";

export async function submitEventRsvp(input: {
  event_id: string;
  name: string;
  email: string;
}): Promise<void> {
  const res = await fetch(`${APP_URL}/api/rsvp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const data = (await res.json().catch(() => null)) as { error?: string } | null;
    throw new Error(data?.error ?? "Unable to complete RSVP.");
  }
}
