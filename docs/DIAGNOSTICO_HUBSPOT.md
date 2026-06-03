# Diagnóstico de HubSpot — base de datos (2026-06-03)

Diagnóstico **de solo lectura** del portal HubSpot de CreArtBox (cuenta `21849962`).
Objetivo: medir cuánto es spam / tienda / teatro real, para planificar la limpieza de la Fase 0.

## 1. Totales globales

| Objeto | Total |
|--------|------:|
| 👤 Contactos | **7.322** |
| 🏢 Empresas | **5.629** |
| 💰 Deals | **900** |

## 2. Los 900 deals son TODOS de la tienda online (Shopify)

- Un **único pipeline** (`75e28846-…`).
- Nombres = números de pedido (`#1521`, `#1522`, `#39674168115359`).
- Etapas `shipped` o vacías; importes de **$0–$128 USD**.
- **Ningún deal es de teatros/booking.** Son pedidos de e-commerce.

## 3. Reparto de contactos por año de creación

| Periodo | Contactos |
|---------|----------:|
| 2026 (ene–jun) | 2.288 |
| 2025 | 542 |
| 2024 y antes | 4.492 |

## 4. Calidad de los contactos (señales)

| Señal | Nº | Lectura |
|-------|---:|---------|
| Origen **Shopify** (tienda) | **1.788** | compradores de la tienda, no venues |
| Email **gmail.com** | **1.817** | individuos/compradores/bots, no dominios de organización |
| Ligados a un deal (pedido) | 352 | compradores |
| `lifecyclestage = customer` | 331 | clientes de la tienda |
| Recibieron alguna **email de marketing** | **1.706** | audiencia realmente alcanzable |

> ~5.600 contactos **nunca** recibieron un email de marketing (nunca segmentados, o inválidos/bounce).
> Spam confirmado: altas de bots con nombres aleatorios, p. ej. `QcvPbYXDvQDNKDGzP OqkwJaEGgOtQcbwkISvP`
> (`ulu.z.e.r.o.j.2.2.4@gmail.com`).

## 5. 🎯 Los teatros reales YA están segmentados en listas

| Lista (`hs_list_id`) | Tamaño | Qué es | Activa |
|------|------:|--------|:------:|
| All contacts (10) | 7.322 | todo | sí |
| **Musical America** (2) | 1.585 | directorio del sector (import Mailchimp) | no |
| **Redescena Import** (50) | 1.221 | 🎯 Red de Teatros de España (venues públicos) | no |
| **Presenter + Chamber Music (auto)** (24) | 235 | 🎯 presentadores/venues | **sí** |
| Germany Musical America (1) | 182 | import alemán | no |
| 04 Booking Invite (11) | 6 | booking | no |
| 03 Fundraising Invite (40) | 4 | fundaciones a invitar | no |
| 03 Send VIP Package (41) | 1 | fundraising | no |
| Magazine Subscriber (13) | 0 | vacía | no |

**Universo "bueno" de venues/presentadores** = unión de las 4 listas
(Redescena + Presenter+Chamber + Musical America + Germany), confirmado por Guillermo:

| Métrica | Nº |
|---------|---:|
| **Venues únicos (deduplicado)** | **2.962** |
| — de ellos, con email de marketing recibido | 1.501 |

Es decir: de 7.322 contactos, **~2.962 son la base real de teatros**; los otros ~4.360 son
tienda + spam + imports sin clasificar.

## 6. Conclusión

La base es una **mezcla de tres mundos**:
1. **Tienda / e-commerce** (~1.788 Shopify + 900 pedidos) → NO son objetivos de booking.
2. **Spam / bots** (altas con nombre aleatorio, gmail, sin engagement) → ruido a eliminar.
3. **Teatros / presentadores reales** → ya curados en listas (Redescena, Presenter+Chamber,
   Musical America, Germany), ~1.000–2.500 tras deduplicar.

## 7. Plan de limpieza propuesto (seguro y reversible)

1. **Respaldo**: exportar contactos/empresas/deals antes de tocar nada.
2. **Propiedad nueva** `tipo_contacto` con valores: `Teatro/Venue`, `Presentador`,
   `Tienda/Cliente`, `Spam/Bot`, `Sin clasificar`.
3. **Etiquetar lo bueno**: marcar como venues los contactos de Redescena + Presenter+Chamber
   (+ revisar Musical America / Germany).
4. **Etiquetar la tienda**: marcar los 1.788 de origen Shopify como `Tienda/Cliente`.
5. **Aislar spam**: lista de revisión con altas de bot (nombre aleatorio + gmail + 0 marketing).
6. **Borrar/archivar** spam y tienda **solo tras confirmación explícita de Guillermo**.

> Nada se borra sin respaldo + confirmación. El etiquetado (pasos 2–5) es aditivo y reversible.
