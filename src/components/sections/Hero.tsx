"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const PARTNERS = [
  { name: "Flexim", label: "DIST. AUTORIZADO" },
  { name: "Smar", label: "PARTNER EXCLUSIVO" },
  { name: "UWT", label: "ALIANZA ESTRATÉGICA" },
];

const HERO_STATS = [
  { value: "50+", label: "Instalaciones en Colombia" },
  { value: "0", label: "Paradas de planta en instalación" },
  { value: "3", label: "Tecnologías líderes mundiales" },
];

/* Variantes de animación framer-motion */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center bg-nova-navy pattern-iso overflow-hidden"
      aria-label="Sección principal"
    >
      {/* Imagen de fondo real — foto de campo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hero-main.jpg"
          alt="Instalación de caudalímetro Flexim clamp-on en tubería industrial"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-20"
          priority
          quality={85}
        />
        {/* Overlay gradiente */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(10,25,47,0.92) 0%, rgba(0,86,179,0.55) 60%, rgba(0,168,232,0.25) 100%)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Contenido */}
      <div className="relative z-10 container mx-auto max-w-[1280px] px-6 lg:px-8 pt-28 pb-20">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={mounted ? "visible" : "hidden"}
          className="max-w-2xl"
        >
          {/* Badge distribuidor */}
          <motion.div variants={itemVariants}>
            <Badge variant="brand" className="mb-6">
              Distribuidor Autorizado Flexim & Smar en Colombia
            </Badge>
          </motion.div>

          {/* H1 */}
          <motion.h1
            variants={itemVariants}
            className="heading-hero text-white mb-6"
          >
            Medición Industrial
            <br />
            <span className="text-nova-cyan">Sin Parar.</span>
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            variants={itemVariants}
            className="text-lg lg:text-xl text-white/75 leading-relaxed mb-10 max-w-xl font-sans"
          >
            Distribuidor técnico especializado de Flexim, Smar y UWT en Colombia.
            Medición no intrusiva clamp-on para Oil&nbsp;&amp;&nbsp;Gas,
            generación de energía y procesos críticos.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4"
          >
            <Button href="/contacto" size="lg" variant="primary" icon={<ArrowRight className="w-5 h-5" />}>
              Solicitar Consultoría
            </Button>
            <Button href="/casos-de-exito" size="lg" variant="white">
              Ver Casos de Éxito
            </Button>
          </motion.div>

          {/* Logos de partners */}
          <motion.div
            variants={itemVariants}
            className="mt-14 flex flex-wrap gap-6"
          >
            {PARTNERS.map((partner) => (
              <div
                key={partner.name}
                className="flex flex-col items-start gap-0.5"
              >
                <span className="label-tech text-white/35">{partner.label}</span>
                <span className="text-white font-display font-bold text-lg leading-none">
                  {partner.name}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

          {/* KPI cards — desktop right panel */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={mounted ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex flex-col gap-3 shrink-0 w-56"
          >
            {HERO_STATS.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-xl p-4"
              >
                <p className="font-display font-black text-3xl text-nova-cyan leading-none mb-1">
                  {stat.value}
                </p>
                <p className="text-white/60 text-xs font-sans leading-tight">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#valor"
        initial={{ opacity: 0 }}
        animate={{ opacity: mounted ? 1 : 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors"
        aria-label="Desplazarse hacia abajo"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6" aria-hidden="true" />
        </motion.div>
      </motion.a>
    </section>
  );
}
