export function readLocalStorageValue<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;

  try {
    const stored = window.localStorage.getItem(key);
    return stored != null ? (JSON.parse(stored) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeLocalStorageValue<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}
