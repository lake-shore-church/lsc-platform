const APP_URL = process.env.EXPO_PUBLIC_APP_URL ?? "http://localhost:3000";

export async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${APP_URL}${path}`);
  if (!res.ok) throw new Error(`API ${path} failed: ${res.status}`);
  return res.json() as Promise<T>;
}
