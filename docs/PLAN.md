# CRM + Motor de "10 emails al día" — CreArtBox

> Documento de diseño. Aún **no se ha escrito código de la aplicación**: esto es el plan
> acordado para construirlo. Última actualización: 2026-06-02.

## 1. Objetivo

Crear un sistema que **cada día sugiera 10 emails para enviar** a la red de
**teatros / venues / presentadores / festivales** de CreArtBox, mezclando:

- **~5 respuestas** a correos pendientes (hilos sin contestar o que necesitan seguimiento), y
- **~5 nuevos** (prospección / seguimiento proactivo) repartidos entre los proyectos activos.

Claude redacta los 10 borradores; **Guillermo revisa, edita y aprueba** antes de enviar.
Idioma de los borradores: **español** (revisable por contacto más adelante).

## 2. Contexto real (descubierto en la sesión)

- **Quién:** Guillermo Laporta — **CreArtBox** (música de cámara + arte visual; NYC, giras
  por España, festivales como ADAR, conciertos en DiMenna Center, residencias, etc.).
- **Qué son los "teatros":** venues, salas, presentadores, programadores y festivales a los
  que se les ofrece (pitch) proyectos para tocar y con los que se da seguimiento.
- **Cuenta de correo:** Gmail / Google Workspace (`guillermo@creartbox.nyc`).

### Estado de los datos (importante)

| Fuente | Hallazgo |
|---|---|
| **HubSpot** | 7.322 contactos, **pero contaminados**: spam de formularios + datos de una tienda (deals tipo `#1522`, etapa `shipped`, números de orden). 5.629 empresas y 900 deals con el mismo ruido. **No es una lista limpia de teatros.** |
| **Google Drive** | Tiene la temporada (`MASTER: Performance and Repertoire.xlsx`) y una plantilla `Venue Letter.pdf`, pero **no** se encontró una hoja limpia de contactos de teatros. |
| **Gmail** | Conectado (leer hilos, crear borradores, etiquetas). El **historial de correos con venues es probablemente la mejor fuente real** de contactos. |

**Conclusión:** antes de automatizar emails hay que construir una **lista limpia y
etiquetada de teatros**. Si no, el motor escribiría a spam.

## 3. Decisiones de arquitectura

| Tema | Decisión |
|---|---|
| **CRM base** | Reutilizar HubSpot como almacén (ya es el CRM); **no** construir uno desde cero. |
| **Base limpia** | **HubSpot como fuente única**, depurado a fondo (quitar spam y datos de tienda). Decisión de Guillermo (2026-06-02). |
| **Origen de contactos buenos** | Filtrar y rescatar los contactos reales que ya están **dentro de HubSpot**. |
| **Enfoque** | **Ligero** sobre HubSpot + Gmail. El motor corre como tarea de Claude usando los MCP de HubSpot y Gmail. Sin servidor propio al inicio. |
| **Salida diaria** | Borradores creados directamente en **Gmail** + Tarea/Nota en HubSpot por contacto. |
| **Aprobación** | Manual: Guillermo revisa en Gmail y envía. Nada se envía solo. |
| **Disparo** | **Programado en la nube** (sesión de Claude Code on the web agendada). Requiere setup inicial de credenciales/entorno. |
| **Proyectos** | Aún sin organizar → se estructuran en el Paso 0 (ver abajo). |

## 4. Cómo funciona el motor (cada mañana)

1. **Lee Gmail** → detecta hilos de teatros sin responder o que tocan seguimiento.
2. **Consulta HubSpot** → por proyecto: a quién no se contacta hace X días, deals abiertos,
   último contacto, notas previas.
3. **Claude prioriza y redacta los 10** (mitad respuestas, mitad nuevos; repartidos por proyecto).
4. **Crea los 10 borradores en Gmail** + una Tarea/Nota en HubSpot por contacto.
5. **Guillermo revisa, edita y envía.** Al enviar, queda registrado en HubSpot.

## 5. Plan por fases

### Fase 0 — Limpiar HubSpot a fondo (bloqueante)
Decisión: HubSpot es la base única; hay que depurarlo. Enfoque **seguro y reversible** (nada
se borra sin respaldo y confirmación):

1. **Diagnóstico** (solo lectura): cuantificar spam vs. real. Señales de spam detectadas:
   nombres aleatorios (`QcvPbYXDvQDNKDGzP`), correos con patrones raros, dominios no-venue,
   contactos de la tienda/Shopify (deals `#1521`, etapa `shipped`), sin engagement.
2. **Respaldo**: exportar todos los contactos/empresas/deals antes de tocar nada.
3. **Etiquetar lo bueno** (aditivo, no destructivo): crear propiedad `Tipo = Teatro/Venue` y
   listas/segmentos; marcar los contactos reales de teatros.
4. **Aislar el ruido**: lista "Revisar/Spam" y lista "Tienda/E-commerce" para separarlos.
5. **Borrar/archivar** solo tras revisión y **confirmación explícita** de Guillermo.
6. **Definir los proyectos** (campañas) y etiquetar cada contacto con sus proyectos.

> Regla: el borrado es difícil de revertir → primero respaldo + etiquetado, y se confirma
> antes de eliminar.

### Fase 1 — Motor diario (MVP)
- Lógica de selección de candidatos (pendientes + nuevos) y de reparto entre proyectos.
- Generación de los 10 borradores con Claude (tono CreArtBox, plantillas por tipo de email).
- Creación de borradores en Gmail + tareas/notas en HubSpot.

### Fase 2 — Disparo programado en la nube
- Configurar la sesión agendada (Claude Code on the web) que corre el motor cada mañana.
- Resolver credenciales/conexiones persistentes de HubSpot y Gmail.

### Fase 3 (opcional) — Panel web a medida
- Solo si el flujo Gmail + HubSpot se queda corto: dashboard propio reutilizando la lógica.

## 6. Riesgos / consideraciones
- **Calidad de datos:** sin Fase 0, todo lo demás falla.
- **Deliverabilidad / reputación:** escribir a contactos basura daña el dominio de envío.
- **Persistencia de credenciales** para el disparo automático en la nube (Fase 2).
- **Revisión humana** obligatoria al inicio para cuidar la relación con presentadores reales.

## 7. Preguntas abiertas
1. ~~¿Dónde vive la lista limpia?~~ **Resuelto:** HubSpot como base única, depurado a fondo.
2. ¿Cuáles son los **proyectos/campañas activos** ahora mismo (p. ej. temporada NYC 26/27,
   gira España, festival ADAR, residencias)?
3. ¿Cómo reconocemos un **teatro/venue real** frente al spam? (¿Por dominio, por haber tenido
   conversación en Gmail, por etiqueta manual previa?)
4. ¿Reglas de prioridad: cada cuántos días re-contactar, cuántos emails máx. por proyecto/día?
