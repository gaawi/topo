# topo — CRM + Motor de "10 emails al día" (CreArtBox)

Sistema para que cada día Claude sugiera **10 emails** (mitad respuestas a pendientes,
mitad nuevos) a la red de teatros / venues / presentadores de CreArtBox, con revisión
y aprobación humana antes de enviar.

- **Enfoque:** ligero sobre HubSpot (CRM) + Gmail. Sin servidor propio al inicio.
- **Estado:** prototipo de la interfaz navegable. Plan completo en [`docs/PLAN.md`](docs/PLAN.md).

## 🌐 Demo en vivo (GitHub Pages)
Una vez activado Pages (ver abajo), el panel estará en:
**https://gaawi.github.io/topo/**

El prototipo (`/site`) muestra el flujo "10 emails de hoy" con datos de ejemplo:
cola de revisión, proyectos, contactos y aprobación de borradores.

### Activar Pages (una sola vez)
1. En GitHub: **Settings → Pages**.
2. En **Build and deployment → Source**, elige **GitHub Actions**.
3. Listo: cada push despliega el sitio (workflow en `.github/workflows/deploy-pages.yml`).

## Próximo paso
Fase 0: construir una **lista limpia y etiquetada de teatros** (hoy HubSpot está
mezclado con spam/datos de tienda). Ver preguntas abiertas en el plan.
