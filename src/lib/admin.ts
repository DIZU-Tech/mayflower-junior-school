// Admin gate.
//
// The site owner unlocks the admin surface at /admin by entering the key
// below. To make discovery harder there is no visible link anywhere on the
// public site — only someone who knows the URL AND the key can access it.
//
// KEY: 2026MJSAbuild
// LOCATION: src/lib/admin.ts (this file — this constant)
//
// To change the key later, replace the string below.
// Once unlocked the browser stores an "mjs.admin" flag in localStorage; the
// user can lock again from the admin page.
export const ADMIN_KEY = "2026MJSAbuild";
export const ADMIN_FLAG = "mjs.admin.unlocked";

export function isAdmin(): boolean {
  if (typeof window === "undefined") return false;
  try { return window.localStorage.getItem(ADMIN_FLAG) === "1"; }
  catch { return false; }
}

export function unlockAdmin(key: string): boolean {
  if (key !== ADMIN_KEY) return false;
  try { window.localStorage.setItem(ADMIN_FLAG, "1"); } catch {}
  return true;
}

export function lockAdmin() {
  try { window.localStorage.removeItem(ADMIN_FLAG); } catch {}
}
