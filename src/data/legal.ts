/* ─────────────────────────────────────────────────────────────
   Datos legales del Responsable del Tratamiento (Ley 1581 de 2012)
   ─────────────────────────────────────────────────────────────
   Todo valor entre «comillas angulares» es un dato pendiente.
   Mientras quede alguno, /politica-de-privacidad responde 404 en
   producción (ver isLegalDataComplete) para no publicar una
   política incompleta.
   ───────────────────────────────────────────────────────────── */

export const LEGAL = {
  razonSocial: "NOVA MEASUREMENT S.A.S.",
  nit: "901.359.489-8",
  domicilio: "Barranquilla, Atlántico, Colombia",
  direccion: "Calle 78B # 41D-29, Edificio Gaia, oficina 1607, barrio Ciudad Jardín, Barranquilla, Atlántico",
  /* Buzón exclusivo para habeas data (debe existir en Microsoft 365) */
  correoDatos: "datospersonales@novam.com.co",
  telefono: "+57 321 535 4908",
  areaResponsable: "Gerencia General",
  sitio: "https://www.novam.com.co",
  version: "1.0",
  fechaVigencia: "19 de octubre de 2026",
} as const;

export function isLegalDataComplete(): boolean {
  return !Object.values(LEGAL).some((v) => v.includes("«"));
}
