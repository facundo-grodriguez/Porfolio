# Plan: Portfolio web de Facundo Rodriguez

> Instrucción para Claude: este archivo es el plan base. Trabajá **un paso por vez**, en el orden de la sección 7. Al terminar cada paso, mostrá el resultado, decí qué quedó listo y esperá mi OK antes de seguir. No inventes datos: lo marcado como [FALTA] se pregunta, no se completa.

## 1. Objetivo

Web personal de una sola página para mostrar 3 proyectos propios y linkearla desde LinkedIn (linkedin.com/in/facundo-grodriguez). GitHub: facundo-grodriguez.

Perfil: Backend / Full Stack Developer (JS, Node.js, SQL Server) con foco en IA aplicada. Técnico en Sistemas (último año). Objetivo: roles backend / full stack / IA aplicada.

## 2. Decisiones ya tomadas

- Web estática, una sola página, en español.
- Publicación con GitHub Pages desde el repo `portfolio`.
- Tecnología: HTML + CSS (JS solo si hace falta algo mínimo). Sin frameworks salvo que se justifique.
- Estilo alineado al banner de LinkedIn: fondo oscuro casi negro, texto blanco, un solo color de acento (rojo/naranja del código de la foto del banner). Nombre en tipografía manuscrita (como el banner), resto en sans-serif sobria. Sin relleno.
- Contacto público: solo mail, LinkedIn y GitHub. Sin teléfono.
- Tono: directo, honesto sobre el estado de cada proyecto, sin frases genéricas de IA ("apasionado", "soluciones innovadoras", etc.).

## 3. Estructura del repo

```
portfolio/
├── index.html
├── css/
│   └── styles.css
├── img/
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
- [FALTA] Link al repo: github.com/facundo-grodriguez/whatsapp-bot (confirmar que sea público y esté limpio).
- [FALTA] Capturas del dashboard y del chat sin datos reales.

### 5.2 Recibos de sueldo (Anexo III)
- **Problema**: un cambio normativo exige un nuevo formato de recibo (Anexo III).
- **Solución**: el sistema NO recalcula sueldos ni compite con Bejerman o Tango. Toma la liquidación ya calculada por la empresa (importada desde Excel), valida la estructura, mapea columnas y conceptos, identifica empleados y períodos, genera vista previa con validaciones de consistencia y emite el PDF final en formato Anexo III.
- **Modelo de datos propio**: empresas, empleados, períodos, importaciones, conceptos y snapshot del recibo emitido (trazabilidad).
- **Stack**: TypeScript / Node.js, PostgreSQL con Prisma ORM (en producción corre en un contenedor Docker propio; en desarrollo local usa un Postgres embebido, sin Docker, para no depender de tenerlo instalado). PDF con Puppeteer: el recibo se renderiza como HTML/CSS y se convierte a PDF con Chromium headless, con un pool acotado de instancias para no consumir toda la RAM al emitir en lote.
- **Roadmap**: comparación entre períodos, detección de anomalías con IA (descuentos inusuales, duplicados), asistente conversacional sobre variaciones salariales.
- **Estado**: proyecto propio en piloto real con un estudio contable (un cliente concreto, usándolo con datos reales de empresas y empleados, no solo demos). Pasó una etapa de QA funcional completa con veredicto favorable. Sigue en validación de producto/mercado: un solo cliente piloto por ahora, todavía no es un producto con múltiples clientes pagando. No presentarlo como producto comercial consolidado.
- [FALTA] Link al repo: github.com/facundo-grodriguez/recibos-de-sueldo (confirmar público y limpio).
- **Regla crítica**: nada de recibos ni nombres reales. Solo datos de ejemplo.

### 5.3 Bot de Telegram para administrar alquileres
- **Problema**: reemplaza planillas, mensajes sueltos y memoria. Lo usa una sola persona, el administrador.
- **Qué centraliza**: personas (inquilinos, propietarios, garantes), propiedades, contratos (con Seguro Finaer y frecuencia de actualización mensual/trimestral/semestral/anual), pagos, gastos (expensas, ABL, ARBA, servicios, seguros) y un balance que se arma solo.
- **Extras**: resumen diario por cron de qué cobrar y qué vence; actualización por IPC calculada siempre sobre el monto y la fecha originales del contrato.
- **Diseño en dos caminos**: flujos guiados con botones (máquina de estados, sin IA) y texto libre interpretado por IA. Así se gasta poca IA.
- **IA**: OpenAI con function calling, 19 herramientas (buscar persona, registrar pago, consultar contrato, etc.). El modelo solo interpreta lenguaje natural; la lógica y los datos viven en el código y en Postgres. Hay reglas para que no se filtren IDs internos ni errores de SQL.
- **Stack**: TypeScript sobre Node 22+, grammY (webhook en Render, 24/7, ping con GitHub Actions), Postgres en Supabase con Drizzle y drizzle-kit, node-cron, zod, Vitest, Biome. Servicio externo para IPC: API de RapidAPI.
- **Estado**: en producción, con datos reales. Pendiente cargar la clave de la API de IPC. Roadmap: interfaz web de solo lectura y WhatsApp como canal.
- [VERIFICAR contra el repo antes de publicar]: versión (9.1.0), modelo de IA por defecto, cantidad de herramientas. El resumen es de hace ~85 días.
- [FALTA] Subir el repo a GitHub (hoy no está).
- **Regla crítica**: la base tiene datos reales de personas. Capturas solo con datos de ejemplo.

## 6. Reglas para todo el trabajo

- No inventar datos, métricas, resultados ni anécdotas.
- No mostrar como reales números que vienen de pruebas.
- Nada de datos reales de personas en capturas.
- Ningún token, `.env` ni credencial en ningún repo. Revisar `.gitignore` y el historial de commits; si un token se subió alguna vez, regenerarlo.
- Textos breves y honestos sobre el estado de cada proyecto.
- Cuidar que no digan "producción con clientes" si no los hay.

## 7. Pasos (uno por vez, cada uno con criterio de "listo")

| # | Paso | Listo cuando |
|---|------|--------------|
| 1 | Crear el repo `portfolio` con el esqueleto de carpetas, `.gitignore` y README | Repo clonado en el server y primer commit subido |
| 2 | Escribir los textos de las secciones y los 3 casos de estudio | Facundo aprobó cada texto, sin ningún [FALTA] resuelto con datos inventados |
| 3 | Maquetar `index.html` + `styles.css` con el estilo definido (sin capturas todavía) | La página se ve bien en escritorio y celular |
| 4 | Preparar capturas con datos de ejemplo e insertarlas | Cada proyecto tiene 1 a 2 imágenes sin datos reales |
| 5 | Auditoría de seguridad de los repos que se linkean (tokens, `.env`, datos personales) | Checklist sin pendientes |
| 6 | Publicar en GitHub Pages | URL pública funcionando |
| 7 | Actualizar LinkedIn: link del portfolio en Información de contacto y en Destacados, con los 3 repos | Perfil enlazado al portfolio |

## 8. Lo que tiene que aportar Facundo

- Mail público a mostrar.
- Repos de GitHub públicos y limpios (el de alquileres todavía hay que subirlo).
- Capturas con datos de ejemplo de los 3 proyectos.
- Verificar los datos del bot de alquileres contra el repo (versión, modelo, herramientas).
