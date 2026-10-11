# Textos del portfolio (borrador, paso 2)

Solo usa datos confirmados en PLAN.md y verificados contra los repos.

## Cabecera

**Facundo Rodriguez**
Backend / Full Stack Developer · Node.js, TypeScript, SQL · IA aplicada

[LinkedIn] [GitHub]

## Presentación

Soy Técnico en Sistemas (último año) y desarrollo software backend y full stack con JavaScript, Node.js y SQL Server.
Me interesa la IA aplicada: usar un modelo donde aporta y dejar la lógica y los datos en código propio.
Los tres proyectos de abajo son míos, tienen código público y cada uno indica en qué estado está de verdad.
Busco roles backend, full stack o IA aplicada.

## Proyectos

### Bot de WhatsApp para atención de primer contacto

Asistente que responde preguntas frecuentes de un negocio y deriva a un vendedor cuando detecta intención de compra.

**Qué hace.** Recibe los mensajes por la API oficial de WhatsApp Business de Meta (migré desde WAHA). Un motor de reglas responde las FAQs cargadas. Si detecta intención de compra, deja de autoresponder y pasa la conversación a una persona. Un dashboard muestra las conversaciones pendientes (las derivadas arriba), métricas de uso y el chat.

**Cómo está armado.** Dos interfaces, `ResponseEngine` y `MessagingProvider`, permiten cambiar el motor de respuestas o el canal sin reescribir el resto. Hay una IA implementada como fallback, restringida a las FAQs, apagada por defecto.

**Stack.** Node.js, TypeScript, Fastify, SQLite con Drizzle ORM, p-queue.

**Estado.** Proyecto personal en pruebas, sin cliente real todavía. Las métricas del dashboard son de prueba.

[Ver código]

### Recibos de sueldo — Anexo III

Sistema que genera el recibo de sueldo en el nuevo formato Anexo III a partir de liquidaciones ya calculadas.

**Problema.** Un cambio normativo exige un nuevo formato de recibo.

**Solución.** No recalcula sueldos ni reemplaza a un sistema de liquidación. Toma la liquidación que la empresa ya calculó (Excel), valida la estructura, mapea columnas y conceptos, identifica empleados y períodos, muestra una vista previa con validaciones de consistencia y emite el PDF final. Guarda un snapshot de cada recibo emitido para tener trazabilidad.

**Detalle técnico.** El recibo se renderiza como HTML/CSS y se convierte a PDF con Chromium headless (Puppeteer), con un pool acotado de instancias para no agotar la RAM al emitir en lote.

**Stack.** TypeScript, Node.js, PostgreSQL con Prisma, Puppeteer, Docker.

**Estado.** En piloto real con un estudio contable: un solo cliente, con datos reales de empresas y empleados. Pasó una etapa de QA funcional con veredicto favorable. Todavía no es un producto con varios clientes.

**Próximos pasos.** Comparación entre períodos, detección de anomalías con IA y un asistente sobre variaciones salariales.

[Ver código]

### Bot de Telegram para administrar alquileres

Bot que reemplaza planillas, mensajes sueltos y memoria en la administración de alquileres. Lo usa una sola persona, el administrador.

**Qué centraliza.** Personas (inquilinos, propietarios, garantes), propiedades, contratos, pagos, gastos (expensas, ABL, ARBA, servicios, seguros) y un balance que se arma solo. Manda un resumen diario de qué cobrar y qué vence, y calcula la actualización por IPC siempre sobre el monto y la fecha originales del contrato.

**Dos caminos.** Los flujos guiados con botones son una máquina de estados, sin IA. El texto libre lo interpreta OpenAI con function calling y 19 herramientas. El modelo solo interpreta el lenguaje; la lógica y los datos viven en el código y en Postgres, y hay reglas para que no se filtren IDs internos ni errores de SQL.

**Stack.** TypeScript (Node 22+), grammY, PostgreSQL en Supabase con Drizzle, node-cron, zod, Vitest, Biome. Desplegado en Render.

**Estado.** En producción, con datos reales. Falta cargar la clave de la API de IPC para la actualización automática. Próximos pasos: interfaz web de solo lectura y WhatsApp como canal.

[Ver código]

## Stack

**Lenguajes:** JavaScript, TypeScript, SQL
**Backend:** Node.js, Fastify, grammY
**Datos:** PostgreSQL, SQL Server, SQLite, Prisma, Drizzle ORM
**IA:** OpenAI (function calling)
**Herramientas:** Docker, Git, GitHub Actions, Vitest

## Contacto

facundo-grodriguez@hotmail.com · [LinkedIn](https://linkedin.com/in/facundo-grodriguez) · [GitHub](https://github.com/facundo-grodriguez)
