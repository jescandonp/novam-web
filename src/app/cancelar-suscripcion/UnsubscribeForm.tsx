"use client";

import { useState } from "react";
import Link from "next/link";

type Status = "idle" | "sending" | "done" | "error";

export function UnsubscribeForm({ token }: { token?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [email, setEmail] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(token ? { token } : { email }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div role="status" className="rounded-lg border border-steel bg-steel/30 p-6">
        <p className="font-semibold text-text-primary mb-2">Listo, su solicitud quedó registrada.</p>
        <p className="text-text-muted leading-relaxed">
          No volveremos a enviarle correos comerciales. Aplicamos la baja en todo el equipo de Nova
          Measurement en un máximo de cinco (5) días hábiles. Si quiere además que suprimamos sus datos,
          consulte nuestra{" "}
          <Link href="/politica-de-privacidad" className="text-nova-blue hover:underline">
            Política de Tratamiento de Datos
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      {!token && (
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-text-primary mb-1.5">
            Correo electrónico en el que recibe nuestras comunicaciones
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-steel px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-nova-blue"
          />
        </div>
      )}

      {/* Confirmación con botón: evita bajas accidentales por escáneres de enlaces del correo */}
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center rounded-md bg-nova-blue px-6 py-3 font-semibold text-white hover:bg-nova-blue-dark disabled:opacity-60"
      >
        {status === "sending" ? "Procesando…" : "Confirmar cancelación"}
      </button>

      {status === "error" && (
        <p role="alert" className="text-sm text-red-700">
          No pudimos procesar la solicitud. Responda «NO» al correo que recibió o escríbanos y la aplicamos
          manualmente.
        </p>
      )}

      <p className="text-sm text-text-muted">
        Más información en nuestra{" "}
        <Link href="/politica-de-privacidad" className="text-nova-blue hover:underline">
          Política de Tratamiento de Datos
        </Link>
        .
      </p>
    </form>
  );
}
