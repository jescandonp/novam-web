import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { LEGAL, isLegalDataComplete } from "@/data/legal";

export const metadata: Metadata = {
  title: "Política de Tratamiento de Datos Personales",
  description:
    "Política de tratamiento de datos personales de Nova Measurement S.A.S., conforme a la Ley 1581 de 2012 y sus decretos reglamentarios.",
  alternates: { canonical: "/politica-de-privacidad" },
};

/* ── Bloques de presentación ─────────────────────────────────── */
function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-28 font-display text-2xl font-bold text-text-primary mt-14 mb-4">
      {children}
    </h2>
  );
}
function P({ children }: { children: React.ReactNode }) {
  return <p className="text-text-muted leading-relaxed mb-4">{children}</p>;
}
function UL({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="list-disc pl-6 space-y-2 text-text-muted leading-relaxed mb-4">
      {items.map((it, i) => (
        <li key={i}>{it}</li>
      ))}
    </ul>
  );
}

const TOC = [
  ["responsable", "1. Responsable del tratamiento"],
  ["marco-legal", "2. Marco legal"],
  ["definiciones", "3. Definiciones"],
  ["principios", "4. Principios"],
  ["datos", "5. Datos que tratamos y cómo los obtenemos"],
  ["finalidades", "6. Finalidades"],
  ["autorizacion", "7. Autorización y datos de contacto profesional"],
  ["derechos", "8. Derechos de los titulares"],
  ["procedimiento", "9. Cómo ejercer sus derechos"],
  ["comunicaciones", "10. Cancelar comunicaciones comerciales"],
  ["terceros", "11. Encargados y transferencias internacionales"],
  ["seguridad", "12. Seguridad de la información"],
  ["conservacion", "13. Conservación de los datos"],
  ["cookies", "14. Cookies"],
  ["vigencia", "15. Cambios y vigencia"],
] as const;

export default function PoliticaPrivacidadPage() {
  /* No publicar una política con datos legales pendientes */
  if (process.env.NODE_ENV === "production" && !isLegalDataComplete()) notFound();

  const correo = (
    <a href={`mailto:${LEGAL.correoDatos}`} className="text-nova-blue hover:underline">
      {LEGAL.correoDatos}
    </a>
  );

  return (
    <>
      <PageHero
        size="compact"
        breadcrumb={[{ label: "Inicio", href: "/" }, { label: "Política de Tratamiento de Datos" }]}
        label="Ley 1581 de 2012"
        title="Política de Tratamiento de Datos Personales"
        subtitle={`Versión ${LEGAL.version} · Vigente desde ${LEGAL.fechaVigencia}`}
      />

      <SectionWrapper bg="white">
        <div className="grid lg:grid-cols-[260px_1fr] gap-12">
          {/* Índice */}
          <nav aria-label="Contenido" className="hidden lg:block">
            <ol className="sticky top-28 space-y-2 text-sm">
              {TOC.map(([id, label]) => (
                <li key={id}>
                  <a href={`#${id}`} className="text-text-muted hover:text-nova-blue">
                    {label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="max-w-3xl">
            <P>
              {LEGAL.razonSocial} (en adelante, «Nova Measurement») respeta la privacidad de las personas
              con las que se relaciona. Esta política explica qué datos personales tratamos, para qué, con
              quién los compartimos y cómo puede ejercer sus derechos como titular.
            </P>

            <H2 id="responsable">1. Responsable del tratamiento</H2>
            <UL
              items={[
                <>Razón social: {LEGAL.razonSocial}</>,
                <>NIT: {LEGAL.nit}</>,
                <>Domicilio: {LEGAL.domicilio}</>,
                <>Dirección de notificaciones: {LEGAL.direccion}</>,
                <>Correo para asuntos de datos personales: {correo}</>,
                <>Teléfono: {LEGAL.telefono}</>,
                <>Área responsable de atender consultas y reclamos: {LEGAL.areaResponsable}</>,
              ]}
            />

            <H2 id="marco-legal">2. Marco legal</H2>
            <P>
              Esta política se rige por el artículo 15 de la Constitución Política, la Ley Estatutaria 1581
              de 2012, el Decreto 1377 de 2013 (compilado en el Decreto Único 1074 de 2015) y las
              instrucciones de la Superintendencia de Industria y Comercio (SIC).
            </P>

            <H2 id="definiciones">3. Definiciones</H2>
            <UL
              items={[
                <><strong>Titular:</strong> persona natural cuyos datos personales son objeto de tratamiento.</>,
                <><strong>Dato personal:</strong> información vinculada o que puede asociarse a una persona natural determinada o determinable.</>,
                <><strong>Dato público:</strong> el que no es semiprivado, privado ni sensible, como el que consta en registros públicos.</>,
                <><strong>Tratamiento:</strong> cualquier operación sobre datos personales: recolección, almacenamiento, uso, circulación o supresión.</>,
                <><strong>Responsable:</strong> quien decide sobre la base de datos y el tratamiento. En esta política, Nova Measurement.</>,
                <><strong>Encargado:</strong> quien trata datos por cuenta del responsable.</>,
                <><strong>Autorización:</strong> consentimiento previo, expreso e informado del titular.</>,
                <><strong>Transferencia:</strong> envío de datos a otro responsable, dentro o fuera de Colombia.</>,
                <><strong>Transmisión:</strong> comunicación de datos a un encargado para que los trate por cuenta del responsable.</>,
              ]}
            />

            <H2 id="principios">4. Principios</H2>
            <P>
              Aplicamos los principios de legalidad, finalidad, libertad, veracidad o calidad, transparencia,
              acceso y circulación restringida, seguridad y confidencialidad previstos en el artículo 4 de la
              Ley 1581 de 2012.
            </P>

            <H2 id="datos">5. Datos que tratamos y cómo los obtenemos</H2>
            <UL
              items={[
                <><strong>Clientes y prospectos empresariales:</strong> nombre, cargo, empresa, área, ciudad, correo y teléfono corporativos. Los obtenemos directamente del titular, en reuniones, eventos y visitas técnicas, por referencia de otra persona de su organización, o de fuentes profesionales disponibles al público y de proveedores de datos empresariales.</>,
                <><strong>Visitantes del sitio web:</strong> los datos que usted escribe en los formularios de contacto o de descarga (nombre, empresa, cargo, correo, teléfono, ciudad y mensaje).</>,
                <><strong>Proveedores y aliados:</strong> datos de contacto de sus representantes y los necesarios para la relación comercial.</>,
              ]}
            />
            <P>
              No solicitamos datos sensibles ni datos de niñas, niños o adolescentes. Si por error los
              recibimos, los suprimimos.
            </P>

            <H2 id="finalidades">6. Finalidades</H2>
            <UL
              items={[
                "Responder solicitudes de información, cotizaciones y soporte técnico.",
                "Contactar a profesionales de empresas industriales, en razón de su cargo, para presentar soluciones de instrumentación y medición relacionadas con su actividad (comunicaciones comerciales entre empresas).",
                "Ejecutar contratos: ofertas, pedidos, facturación, entregas, garantías, calibraciones y servicio posventa.",
                "Enviar información técnica, invitaciones a eventos y novedades de productos a quienes no se hayan opuesto.",
                "Gestionar la relación con proveedores y aliados.",
                "Cumplir obligaciones legales, contables y tributarias, y atender requerimientos de autoridades.",
                "Elaborar estadísticas internas con datos agregados.",
              ]}
            />

            <H2 id="autorizacion">7. Autorización y datos de contacto profesional</H2>
            <P>
              Cuando usted nos entrega sus datos (por ejemplo, en un formulario del sitio), le pedimos su
              autorización en ese momento y guardamos prueba de ella.
            </P>
            <P>
              Cuando obtenemos datos de contacto profesional de fuentes públicas, de proveedores de datos
              empresariales o por referencia de su organización, los usamos solo para comunicaciones
              relacionadas con su cargo. En la primera comunicación le informamos quiénes somos, de dónde
              obtuvimos sus datos y para qué los usamos, y le ofrecemos un mecanismo sencillo para dejar de
              recibir correos y solicitar la supresión de sus datos. No suponemos su autorización por el
              silencio: si nos indica que no desea ser contactado, dejamos de hacerlo.
            </P>

            <H2 id="derechos">8. Derechos de los titulares</H2>
            <UL
              items={[
                "Conocer, actualizar y rectificar sus datos personales.",
                "Solicitar prueba de la autorización otorgada, salvo cuando la ley no la exija.",
                "Ser informado sobre el uso que se ha dado a sus datos.",
                "Presentar quejas ante la Superintendencia de Industria y Comercio, después de agotar el trámite de consulta o reclamo ante Nova Measurement.",
                "Revocar la autorización y solicitar la supresión de sus datos cuando no exista un deber legal o contractual de conservarlos.",
                "Acceder gratuitamente a sus datos personales.",
              ]}
            />

            <H2 id="procedimiento">9. Cómo ejercer sus derechos</H2>
            <P>
              Escríbanos a {correo} o envíe una comunicación a {LEGAL.direccion}. Incluya su nombre, un dato
              que permita identificarlo (por ejemplo, el correo en el que recibe nuestras comunicaciones), la
              descripción de lo que solicita y una dirección de respuesta. También pueden ejercer estos
              derechos sus causahabientes y representantes, acreditando esa calidad.
            </P>
            <UL
              items={[
                <><strong>Consultas:</strong> se responden en un máximo de diez (10) días hábiles desde su recibo. Si no es posible en ese plazo, le informaremos el motivo y responderemos dentro de los cinco (5) días hábiles siguientes.</>,
                <><strong>Reclamos</strong> (corrección, actualización, supresión o incumplimiento): se responden en un máximo de quince (15) días hábiles, prorrogables hasta por ocho (8) días hábiles más con aviso previo. Si el reclamo está incompleto, le pediremos la información faltante dentro de los cinco (5) días siguientes; si no la recibimos en dos (2) meses, entenderemos que desistió.</>,
              ]}
            />

            <H2 id="comunicaciones">10. Cancelar comunicaciones comerciales</H2>
            <P>
              Todos nuestros correos comerciales incluyen el enlace «cancele su suscripción». También puede
              hacerlo en{" "}
              <Link href="/cancelar-suscripcion" className="text-nova-blue hover:underline">
                {LEGAL.sitio.replace("https://", "")}/cancelar-suscripcion
              </Link>
              , respondiendo «NO» a cualquiera de nuestros correos o escribiendo a {correo}. Aplicamos la
              solicitud en un máximo de cinco (5) días hábiles y la extendemos a todas las personas de
              Nova Measurement que lo contactan. Para garantizar que no volvamos a escribirle, conservamos
              únicamente su correo y la fecha de la solicitud en una lista de exclusión.
            </P>

            <H2 id="terceros">11. Encargados y transferencias internacionales</H2>
            <P>
              Para operar usamos proveedores tecnológicos que tratan datos por nuestra cuenta: correo
              electrónico y productividad (Microsoft 365), gestión de información comercial y documental,
              plataformas de datos empresariales y de envío de correos, y alojamiento del sitio web. Algunos
              tienen servidores fuera de Colombia, principalmente en Estados Unidos. Solo trabajamos con
              proveedores que ofrecen garantías de seguridad y confidencialidad, en países con nivel adecuado
              de protección según la SIC o bajo contratos de transmisión de datos en los términos del
              Decreto 1377 de 2013.
            </P>
            <P>
              No vendemos ni alquilamos datos personales. Podemos compartirlos con los fabricantes que
              representamos (FLEXIM, SMAR, UWT) solo cuando sea necesario para atender su solicitud técnica o
              comercial, y con autoridades cuando la ley lo exija.
            </P>

            <H2 id="seguridad">12. Seguridad de la información</H2>
            <P>
              Aplicamos medidas técnicas, humanas y administrativas razonables para proteger los datos:
              acceso restringido por roles, autenticación reforzada en nuestras cuentas corporativas,
              cifrado en tránsito (HTTPS y TLS) y proveedores con certificaciones de seguridad reconocidas.
            </P>

            <H2 id="conservacion">13. Conservación de los datos</H2>
            <P>
              Conservamos los datos mientras sean necesarios para las finalidades descritas, mientras dure la
              relación comercial y durante los plazos que exijan las normas contables, tributarias y
              comerciales. Los datos de prospectos que no respondan ni establezcan una relación con nosotros
              se revisan periódicamente y se suprimen cuando dejan de ser útiles para la finalidad comercial.
            </P>

            <H2 id="cookies">14. Cookies</H2>
            <P>
              Nuestro sitio usa solo las cookies técnicas necesarias para funcionar. No usa cookies de
              publicidad ni de analítica de terceros. Si las incorporamos, actualizaremos esta política y
              solicitaremos su consentimiento cuando corresponda.
            </P>

            <H2 id="vigencia">15. Cambios y vigencia</H2>
            <P>
              Esta política está vigente desde el {LEGAL.fechaVigencia} (versión {LEGAL.version}). Los cambios
              sustanciales se publicarán en esta página antes de aplicarse. Las bases de datos se conservarán
              mientras se mantengan las finalidades descritas.
            </P>
          </article>
        </div>
      </SectionWrapper>
    </>
  );
}
