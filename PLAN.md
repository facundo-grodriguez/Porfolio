# Plan: Portfolio web de Facundo Rodriguez

> **Estado (11/10/2026):** pasos 1 a 6 hechos. La web está publicada en https://facundo-grodriguez.github.io/portfolio/. Falta el paso 7 (LinkedIn), que hace Facundo. Las decisiones de la sección 2 se actualizaron donde cambiaron durante el trabajo.

> Instrucción para Claude: este archivo es el plan base. Trabajá **un paso por vez**, en el orden de la sección 7. Al terminar cada paso, mostrá el resultado, decí qué quedó listo y esperá mi OK antes de seguir. No inventes datos: lo marcado como [FALTA] se pregunta, no se completa.

## 1. Objetivo

Web personal de una sola página para mostrar 3 proyectos propios y linkearla desde LinkedIn (linkedin.com/in/facundo-grodriguez). GitHub: facundo-grodriguez.

Perfil: Backend / Full Stack Developer (JS, Node.js, SQL Server) con foco en IA aplicada. Técnico en Sistemas (último año). Objetivo: roles backend / full stack / IA aplicada.

## 2. Decisiones ya tomadas

- Web estática, una sola página, en español.
- Publicación con GitHub Pages desde el repo `portfolio` (rama `main`, raíz). URL: https://facundo-grodriguez.github.io/portfolio/
- Tecnología: HTML + CSS + un `js/main.js` mínimo (solapas de proyectos, visor de imágenes, botón de volver arriba). Sin frameworks ni dependencias.
- Estilo (cambió respecto del plan original): fondo casi negro azulado, texto claro y escala pastel en vez del naranja del banner, porque el naranja sobre oscuro se parecía demasiado a la interfaz de Claude. Lavanda como color base; por estado de proyecto: menta (en producción), durazno (en piloto), lavanda (en pruebas). Nombre en Caveat (manuscrita), texto en Space Grotesk, etiquetas y código en JetBrains Mono. Esquinas casi rectas. Sin adornos de natación (se probaron olas, carril, luz de agua y boya y se descartaron).
- Contacto público: mail, LinkedIn, GitHub y CV descargable. Sin teléfono.
- Proyectos en solapas (Alquileres, Recibos, WhatsApp) con panel de alto fijo; cada tarjeta tiene un estilo propio (terminal, plano, laboratorio). Las capturas se abren en un visor con fondo borroso y zoom.
- Orden de la página: Presentación, Proyectos, Experiencia, Stack y formación, Contacto.
- La foto es la del perfil de GitHub (`img/foto.png`).
- Tono: directo, honesto sobre el estado de cada proyecto, sin frases genéricas de IA ("apasionado", "soluciones innovadoras", etc.).

## 3. Estructura del repo

```
portfolio/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── cv/
│   └── Facundo_Rodriguez_CV.pdf
├── img/
│   ├── foto.png
│   ├── whatsapp-bot/      (capturas con datos de ejemplo)
│   ├── recibos/
│   └── alquileres/
├── .gitignore
├── PLAN.md
└── README.md
```

## 4. Secciones de la página

1. **Cabecera**: nombre, línea de perfil, botones a LinkedIn y GitHub.
2. **Presentación**: 3 o 4 líneas, escaneables.
3. **Proyectos**: 3 casos de estudio (ver sección 5).
4. **Stack**: lista corta y real (sin React como principal; no lo usa a diario).
5. **Contacto**: mail, LinkedIn, GitHub.

Cada caso de estudio: título, una línea de contexto, problema, solución, stack, estado, link al repo, 1 a 2 capturas.

## 5. Fichas de proyectos (datos confirmados por mí)

### 5.1 Bot de WhatsApp
- **Qué es**: asistente de WhatsApp para un negocio. Responde FAQs y, al detectar intención de compra, deriva la conversación a un vendedor humano.
- **Integración**: API oficial de WhatsApp Business de Meta, usando la función Coexistence (que resuelve Meta, no yo). Migré desde WAHA a la API oficial.
- **Stack**: Node.js + TypeScript, Fastify, SQLite con Drizzle ORM, cola en memoria con p-queue.
- **Arquitectura**: interfaces (`ResponseEngine`, `MessagingProvider`) que permiten cambiar el motor de respuestas o el canal sin reescribir el resto.
- **Dashboard**: conversaciones pendientes (priorizadas arriba), métricas generales de uso y vista de chat.
- **Estado**: proyecto personal en pruebas, sin cliente real todavía. Hoy responde con las FAQs cargadas; la arquitectura está preparada para sumar una IA como fallback (restringida a esas FAQs).
- **Regla**: las métricas del dashboard son de pruebas. No presentarlas como resultados reales. Si se muestran, rotularlas "datos de prueba".
- Repo: github.com/facundo-grodriguez/whatsapp-bot (público, historial auditado; queda visible un número de teléfono del propio Facundo en commits viejos, decisión suya de dejarlo).
- Capturas: solo el dashboard con datos de prueba. Se descartó la maqueta del chat porque no era una captura real.

### 5.2 Recibos de sueldo (Anexo III)
- **Problema**: un cambio normativo exige un nuevo formato de recibo (Anexo III).
- **Solución**: el sistema NO recalcula sueldos ni compite con Bejerman o Tango. Toma la liquidación ya calculada por la empresa (importada desde Excel), valida la estructura, mapea columnas y conceptos, identifica empleados y períodos, genera vista previa con validaciones de consistencia y emite el PDF final en formato Anexo III.
- **Modelo de datos propio**: empresas, empleados, períodos, importaciones, conceptos y snapshot del recibo emitido (trazabilidad).
- **Stack**: TypeScript / Node.js, PostgreSQL con Prisma ORM (en producción corre en un contenedor Docker propio; en desarrollo local usa un Postgres embebido, sin Docker, para no depender de tenerlo instalado). PDF con Puppeteer: el recibo se renderiza como HTML/CSS y se convierte a PDF con Chromium headless, con un pool acotado de instancias para no consumir toda la RAM al emitir en lote.
- **Roadmap**: comparación entre períodos, detección de anomalías con IA (descuentos inusuales, duplicados), asistente conversacional sobre variaciones salariales.
- **Estado**: proyecto propio en piloto real con un estudio contable (un cliente concreto, usándolo con datos reales de empresas y empleados, no solo demos). Pasó una etapa de QA funcional completa con veredicto favorable. Sigue en validación de producto/mercado: un solo cliente piloto por ahora, todavía no es un producto con múltiples clientes pagando. No presentarlo como producto comercial consolidado.
- Repo: github.com/facundo-grodriguez/recibos-de-sueldo (público, historial auditado, sin credenciales ni datos reales). Capturas con datos de ejemplo (vista previa y PDF).
- **Regla crítica**: nada de recibos ni nombres reales. Solo datos de ejemplo.

### 5.3 Bot de Telegram para administrar alquileres
- **Problema**: reemplaza planillas, mensajes sueltos y memoria. Lo usa una sola persona, el administrador.
- **Qué centraliza**: personas (inquilinos, propietarios, garantes), propiedades, contratos (con Seguro Finaer y frecuencia de actualización mensual/trimestral/semestral/anual), pagos, gastos (expensas, ABL, ARBA, servicios, seguros) y un balance que se arma solo.
- **Extras**: resumen diario por cron de qué cobrar y qué vence; actualización por IPC calculada siempre sobre el monto y la fecha originales del contrato.
- **Diseño en dos caminos**: flujos guiados con botones (máquina de estados, sin IA) y texto libre interpretado por IA. Así se gasta poca IA.
- **IA**: OpenAI con function calling, 19 herramientas (buscar persona, registrar pago, consultar contrato, etc.). El modelo solo interpreta lenguaje natural; la lógica y los datos viven en el código y en Postgres. Hay reglas para que no se filtren IDs internos ni errores de SQL.
- **Stack**: TypeScript sobre Node 22+, grammY (webhook en Render, 24/7, ping con GitHub Actions), Postgres en Supabase con Drizzle y drizzle-kit, node-cron, zod, Vitest, Biome. Servicio externo para IPC: API de RapidAPI.
- **Estado**: en producción, con datos reales. Pendiente cargar la clave de la API de IPC. Roadmap: interfaz web de solo lectura y WhatsApp como canal.
- Verificado contra el repo `administracion-alquileres` (hoy público): versión 9.1.0, modelo de IA por defecto `gpt-5.4`, 19 herramientas registradas.
- **Regla crítica**: la base tiene datos reales de personas. Capturas solo con datos de ejemplo.

## 6. Reglas para todo el trabajo

- No inventar datos, métricas, resultados ni anécdotas.
- No mostrar como reales números que vienen de pruebas.
- Nada de datos reales de personas en capturas.
- Ningún token, `.env` ni credencial en ningún repo. Revisar `.gitignore` y el historial de commits; si un token se subió alguna vez, regenerarlo.
- Textos breves y honestos sobre el estado de cada proyecto.
- Cuidar que no digan "producción con clientes" si no los hay.

## 7. Pasos (uno por vez, cada uno con criterio de "listo")

| # | Paso | Listo cuando | Estado |
|---|------|--------------|--------|
| 1 | Crear el repo `portfolio` con el esqueleto de carpetas, `.gitignore` y README | Repo clonado en el server y primer commit subido | Hecho |
| 2 | Escribir los textos de las secciones y los 3 casos de estudio | Facundo aprobó cada texto, sin ningún [FALTA] resuelto con datos inventados | Hecho |
| 3 | Maquetar `index.html` + `styles.css` con el estilo definido (sin capturas todavía) | La página se ve bien en escritorio y celular | Hecho |
| 4 | Preparar capturas con datos de ejemplo e insertarlas | Cada proyecto tiene 1 a 2 imágenes sin datos reales | Hecho |
| 5 | Auditoría de seguridad de los repos que se linkean (tokens, `.env`, datos personales) | Checklist sin pendientes | Hecho |
| 6 | Publicar en GitHub Pages | URL pública funcionando | Hecho |
| 7 | Actualizar LinkedIn: link del portfolio en Información de contacto y en Destacados, con los 3 repos | Perfil enlazado al portfolio | Pendiente (lo hace Facundo) |

## 8. Lo que tiene que aportar Facundo (pendientes)

- Paso 7: poner el link de la web en LinkedIn (Información de contacto y Destacados, con los 3 repos).
- Opcional: actualizar el CV (no menciona el bot de alquileres) y reemplazar `cv/Facundo_Rodriguez_CV.pdf`.
- Opcional: recapturar el dashboard de WhatsApp a mayor resolución y las capturas de alquileres con montos coherentes.
