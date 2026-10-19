import { createHmac, timingSafeEqual } from "crypto";

/* ─────────────────────────────────────────────────────────────
   Token de baja (opt-out) sin datos personales en la URL.
   token = base64url(HMAC-SHA256(UNSUBSCRIBE_SECRET, email normalizado))[0..22]
   El mismo cálculo lo hace el motor de prospección (Python) para
   generar el enlace de cada correo. Nunca se pone el email en la URL.
   ───────────────────────────────────────────────────────────── */

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function unsubscribeToken(email: string, secret: string): string {
  return createHmac("sha256", secret)
    .update(normalizeEmail(email))
    .digest("base64url")
    .slice(0, 22);
}

export function tokenMatches(email: string, token: string, secret: string): boolean {
  const a = Buffer.from(unsubscribeToken(email, secret));
  const b = Buffer.from(token);
  return a.length === b.length && timingSafeEqual(a, b);
}
