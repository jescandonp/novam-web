"use client";

import { useState, useMemo } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { CTABanner } from "@/components/sections/CTABanner";
import { TrendingUp, DollarSign, Clock, Wrench, Info } from "lucide-react";

/* ─── Tipos ─────────────────────────────────────────────────── */
interface CalcInputs {
  // Costos del escenario actual (caudalímetro invasivo / sin medición)
  annualDowntimeHours: number;    // horas de parada por mantenimiento/año
  hourlyProductionLoss: number;   // USD/hora perdida de producción
  annualMaintenanceCost: number;  // USD/año mantenimiento caudalímetro actual
  annualLeakRisk: number;         // USD/año en riesgo por fugas / reemplazos
  // Costos de instalación clamp-on
  clampOnCost: number;            // USD precio equipo + instalación
}

function formatCOP(usd: number): string {
  const cop = usd * 4200;
  if (cop >= 1_000_000_000) return `$${(cop / 1_000_000_000).toFixed(1)} mil millones COP`;
  if (cop >= 1_000_000) return `$${(cop / 1_000_000).toFixed(0)} M COP`;
  return `$${cop.toLocaleString("es-CO")} COP`;
}

function formatUSD(v: number): string {
  return `USD ${v.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

/* ─── Component ─────────────────────────────────────────────── */
export default function CalculadoraROIPage() {
  const [inputs, setInputs] = useState<CalcInputs>({
    annualDowntimeHours: 24,
    hourlyProductionLoss: 5000,
    annualMaintenanceCost: 8000,
    annualLeakRisk: 4000,
    clampOnCost: 18000,
  });

  const results = useMemo(() => {
    // Costo actual por año
    const currentAnnualCost =
      inputs.annualDowntimeHours * inputs.hourlyProductionLoss +
      inputs.annualMaintenanceCost +
      inputs.annualLeakRisk;

    // Con clamp-on: se elimina parada y se reduce mantenimiento ~90%, riesgo de fuga ~100%
    const newDowntimeCost = 0; // instalación sin parada
    const newMaintenanceCost = inputs.annualMaintenanceCost * 0.1; // ~90% reducción
    const newLeakRisk = 0; // sin partes húmedas
    const newAnnualCost = newDowntimeCost + newMaintenanceCost + newLeakRisk;

    const annualSavings = currentAnnualCost - newAnnualCost;
    const paybackMonths = annualSavings > 0 ? (inputs.clampOnCost / annualSavings) * 12 : 0;
    const roi5Years = annualSavings > 0 ? ((annualSavings * 5 - inputs.clampOnCost) / inputs.clampOnCost) * 100 : 0;
    const npv5Years = annualSavings * 5 - inputs.clampOnCost; // simplified, no discount rate for simplicity

    return {
      currentAnnualCost,
      newAnnualCost,
      annualSavings,
      paybackMonths,
      roi5Years,
      npv5Years,
    };
  }, [inputs]);

  function handleChange(key: keyof CalcInputs, value: string) {
    const num = parseFloat(value.replace(/,/g, "")) || 0;
    setInputs((prev) => ({ ...prev, [key]: num }));
  }

  const inputClass =
    "w-full px-4 py-2.5 border border-steel rounded-lg text-sm font-mono text-text-primary bg-white focus:outline-none focus:ring-2 focus:ring-nova-blue/30 focus:border-nova-blue transition-colors text-right";

  return (
    <>
      <PageHero
        breadcrumb={[
          { label: "Recursos", href: "/recursos" },
          { label: "Calculadora ROI" },
        ]}
        label="Herramienta técnica"
        title="Calculadora de retorno de inversión — Medición clamp-on"
        subtitle="Estime el ahorro real al reemplazar o complementar su sistema de medición actual con tecnología ultrasónica no intrusiva Flexim. Resultados en segundos."
      />

      <SectionWrapper bg="white">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

          {/* Formulario de entradas — 3/5 */}
          <div className="lg:col-span-3 space-y-8">
            <div>
              <SectionHeader
                label="Sus datos de operación"
                title="Situación actual"
              />
              <div className="bg-nova-cyan-light border border-nova-cyan/20 rounded-xl p-4 mb-6 flex items-start gap-3">
                <Info className="w-4 h-4 text-nova-blue shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-xs text-nova-blue/80 font-sans leading-relaxed">
                  Los valores por defecto representan un escenario típico para una planta mediana de Oil & Gas
                  en Colombia. Ajústelos a su realidad operativa para obtener una estimación precisa.
                </p>
              </div>

              <div className="space-y-5">
                {/* Horas de parada */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                  <label className="sm:col-span-2 text-sm font-sans text-text-primary">
                    Horas de parada por mantenimiento / año
                    <span className="block text-xs text-text-muted mt-0.5">
                      Incluya cambios de empaque, limpieza, reparaciones
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min={0}
                      value={inputs.annualDowntimeHours}
                      onChange={(e) => handleChange("annualDowntimeHours", e.target.value)}
                      className={inputClass}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-text-muted font-sans pointer-events-none">h</span>
                  </div>
                </div>

                {/* Costo por hora de parada */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                  <label className="sm:col-span-2 text-sm font-sans text-text-primary">
                    Pérdida de producción por hora de parada
                    <span className="block text-xs text-text-muted mt-0.5">
                      Incluya pérdida de margen + costos variables de parada
                    </span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-text-muted font-sans pointer-events-none">USD</span>
                    <input
                      type="number"
                      min={0}
                      value={inputs.hourlyProductionLoss}
                      onChange={(e) => handleChange("hourlyProductionLoss", e.target.value)}
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>

                {/* Mantenimiento actual */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                  <label className="sm:col-span-2 text-sm font-sans text-text-primary">
                    Costo de mantenimiento del caudalímetro / año
                    <span className="block text-xs text-text-muted mt-0.5">
                      Repuestos, mano de obra, calibración, piezas húmedas
                    </span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-text-muted font-sans pointer-events-none">USD</span>
                    <input
                      type="number"
                      min={0}
                      value={inputs.annualMaintenanceCost}
                      onChange={(e) => handleChange("annualMaintenanceCost", e.target.value)}
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>

                {/* Riesgo de fuga */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                  <label className="sm:col-span-2 text-sm font-sans text-text-primary">
                    Costo anual estimado por riesgo de fuga o reemplazo
                    <span className="block text-xs text-text-muted mt-0.5">
                      Fugas en empaque, corrosión interna, fallo de sensor en línea
                    </span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-text-muted font-sans pointer-events-none">USD</span>
                    <input
                      type="number"
                      min={0}
                      value={inputs.annualLeakRisk}
                      onChange={(e) => handleChange("annualLeakRisk", e.target.value)}
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <SectionHeader
                label="Inversión en clamp-on"
                title="Costo de la solución Flexim"
              />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                <label className="sm:col-span-2 text-sm font-sans text-text-primary">
                  Costo total del equipo + instalación
                  <span className="block text-xs text-text-muted mt-0.5">
                    Incluya transductores, transmisor, acoplante, mano de obra y puesta en marcha
                  </span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-text-muted font-sans pointer-events-none">USD</span>
                  <input
                    type="number"
                    min={0}
                    value={inputs.clampOnCost}
                    onChange={(e) => handleChange("clampOnCost", e.target.value)}
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </div>
              <p className="mt-3 text-xs text-text-muted font-sans">
                ¿No tiene el precio aún?{" "}
                <a href="/contacto" className="text-nova-blue hover:underline">
                  Solicite una cotización gratuita
                </a>{" "}
                y ajuste este valor.
              </p>
            </div>
          </div>

          {/* Resultados — 2/5 */}
          <aside className="lg:col-span-2">
            <div className="sticky top-24 space-y-5">
              {/* Panel de resultados principal */}
              <div className="bg-nova-navy rounded-2xl p-6 text-white">
                <h2 className="label-tech text-nova-cyan mb-5">Resultados estimados</h2>

                <dl className="space-y-4">
                  <div className="border-b border-white/10 pb-4">
                    <dt className="text-white/50 text-xs font-sans mb-1 flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5" aria-hidden="true" />
                      Costo actual por año
                    </dt>
                    <dd className="font-mono font-bold text-xl text-white">
                      {formatUSD(results.currentAnnualCost)}
                    </dd>
                    <dd className="text-white/40 text-xs font-sans mt-0.5">
                      ≈ {formatCOP(results.currentAnnualCost)}
                    </dd>
                  </div>

                  <div className="border-b border-white/10 pb-4">
                    <dt className="text-white/50 text-xs font-sans mb-1 flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5" aria-hidden="true" />
                      Ahorro anual con clamp-on
                    </dt>
                    <dd className="font-mono font-bold text-2xl text-nova-cyan">
                      {formatUSD(results.annualSavings)}
                    </dd>
                    <dd className="text-white/40 text-xs font-sans mt-0.5">
                      ≈ {formatCOP(results.annualSavings)} / año
                    </dd>
                  </div>

                  <div className="border-b border-white/10 pb-4">
                    <dt className="text-white/50 text-xs font-sans mb-1 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                      Recuperación de inversión
                    </dt>
                    <dd className="font-mono font-bold text-xl text-white">
                      {results.paybackMonths > 0
                        ? results.paybackMonths < 1
                          ? "< 1 mes"
                          : `${results.paybackMonths.toFixed(1)} meses`
                        : "N/A"}
                    </dd>
                  </div>

                  <div className="border-b border-white/10 pb-4">
                    <dt className="text-white/50 text-xs font-sans mb-1 flex items-center gap-1.5">
                      <Wrench className="w-3.5 h-3.5" aria-hidden="true" />
                      ROI a 5 años
                    </dt>
                    <dd className={`font-mono font-bold text-xl ${results.roi5Years >= 0 ? "text-green-400" : "text-red-400"}`}>
                      {results.roi5Years > 0 ? "+" : ""}{results.roi5Years.toFixed(0)}%
                    </dd>
                  </div>

                  <div>
                    <dt className="text-white/50 text-xs font-sans mb-1">Beneficio neto acumulado (5 años)</dt>
                    <dd className={`font-mono font-bold text-lg ${results.npv5Years >= 0 ? "text-green-400" : "text-red-400"}`}>
                      {formatUSD(results.npv5Years)}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Disclaimer */}
              <div className="p-4 bg-steel/40 border border-steel rounded-xl">
                <p className="text-xs text-text-muted font-sans leading-relaxed">
                  Esta calculadora es una estimación orientativa basada en promedios de la industria.
                  Los resultados reales dependerán de las condiciones específicas de su proceso, fluido
                  y configuración del equipo. Nova Measurement puede realizar un análisis TCO detallado
                  sin costo.
                </p>
              </div>

              {/* CTA */}
              <a
                href="/contacto"
                className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-nova-blue text-white font-display font-bold text-sm uppercase tracking-wide rounded hover:bg-nova-blue-dark transition-colors"
              >
                Solicitar análisis TCO detallado
              </a>
            </div>
          </aside>
        </div>
      </SectionWrapper>

      {/* Contexto / explicación */}
      <SectionWrapper bg="light">
        <SectionHeader
          label="¿Cómo funciona el cálculo?"
          title="Supuestos del modelo"
          subtitle="Transparencia total en la metodología utilizada para estimar el retorno de inversión."
          centered
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {[
            {
              icon: "🔧",
              title: "Cero paradas de mantenimiento",
              desc: "El caudalímetro clamp-on se instala sobre la tubería existente sin perforación. No requiere parar el proceso ni durante la instalación ni durante el mantenimiento (que es prácticamente nulo).",
            },
            {
              icon: "💧",
              title: "Sin partes húmedas que desgastar",
              desc: "Al no tener contacto con el fluido, se eliminan los costos asociados a corrosión, erosión de partes internas, empaques, válvulas de aislamiento y reparaciones por fuga.",
            },
            {
              icon: "📊",
              title: "Reducción de mantenimiento ~90%",
              desc: "Basado en datos de instalaciones Flexim en Colombia: el costo de mantenimiento anual de un clamp-on es aproximadamente el 10% del equivalente invasivo (solo verificación periódica).",
            },
          ].map((item) => (
            <div key={item.title} className="card-base p-6 text-center">
              <span className="text-3xl mb-3 block" aria-hidden="true">{item.icon}</span>
              <h3 className="font-display font-bold text-sm text-text-primary mb-2">{item.title}</h3>
              <p className="text-text-muted text-xs leading-relaxed font-sans">{item.desc}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <CTABanner
        title="¿Quiere un análisis TCO real para su proceso?"
        subtitle="Nuestros ingenieros elaboran el análisis de costo total de propiedad con sus datos reales, sin costo y en 48 horas."
        primaryLabel="Solicitar análisis gratuito"
      />
    </>
  );
}
