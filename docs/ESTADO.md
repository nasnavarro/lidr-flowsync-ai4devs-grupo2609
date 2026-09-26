# Estado del trabajo de producto

**Empieza por aquí cada sesión nueva.** Este archivo resume dónde está cada cosa y qué falta, para no depender de una conversación anterior. Actualízalo al cerrar cada sesión.

*Última actualización: 2026-09-26.*

## Mapa de artefactos

| Qué | Dónde |
|---|---|
| Alcance consensuado del MVP | [prd/alcance-mvp-inv.md](prd/alcance-mvp-inv.md) |
| PRD del MVP (épicas, RF, RNF, métricas, puntos abiertos) | [prd/flowsync-mvp.md](prd/flowsync-mvp.md) |
| Definition of Done por tipo de ticket | [backlog/definition-of-done.md](backlog/definition-of-done.md) |
| Matriz impacto/complejidad y orden de backlog de E2 | [backlog/priorizacion-E2.md](backlog/priorizacion-E2.md) |
| Listado completo de historias de E2 y equivalencia de IDs | [backlog/E2-gestion-tareas/historias-E2.md](backlog/E2-gestion-tareas/historias-E2.md) |
| FS-118: criterios y tickets | [historia](backlog/E2-gestion-tareas/us-fechas-vencimiento.md), [tickets](backlog/E2-gestion-tareas/tickets-FS-118.md) |
| FS-142: criterios y tickets | [historia](backlog/E2-gestion-tareas/us-filtrar-por-estado.md), [tickets](backlog/E2-gestion-tareas/tickets-FS-142.md) |
| Registro de prompts del ejercicio | [../prompts.md](../prompts.md) |

## Estado por épica

| Épica | Requisitos | Historias | Estado |
|---|---|---|---|
| E1 «Cuentas y acceso» | RF-1 a RF-5 | Sin descomponer | RF-1, RF-2 y RF-3 ya existen en el código. Falta de verdad RF-5: mostrar a cada persona como responsable. |
| E2 «Gestión de tareas» | RF-6 a RF-17 | 11 dentro del alcance y 7 fuera | FS-118 y FS-142 tienen criterios y tickets; el resto de historias no tiene criterios. |
| E3 «Actividad del equipo» | RF-18 a RF-21 | **Sin descomponer** | **Bloquea a E2.** Varios tickets de FS-118 y FS-142 necesitan la lista (RF-18) y el estado vacío (RF-21). |

## Tablero Jira (proyecto FLOW)

| Clave | Qué es |
|---|---|
| FLOW-3 | Historia FS-118. Sus subtareas son FLOW-4 a FLOW-11 (FS-118.1 a FS-118.8). |
| FLOW-12 | Historia FS-142. Sus subtareas son FLOW-13 a FLOW-17 (FS-142.1 a FS-142.5). |
| FLOW-18 | Historia E2-1, sin criterios ni subtareas. |
| FLOW-1 | Ticket de un ejercicio anterior, ajeno a este PRD. Está en "Listo", pero el código no cumple lo que pide. |

En Jira no hay issues de tipo Epic: la épica solo aparece como la etiqueta "E2".

## Pendiente de decidir

- **Puntos abiertos PA-1 a PA-12** del PRD (sección 10). Los que bloquean historias:
  - PA-4 bloquea HU-E2-11 (borrar).
  - PA-5 bloquea HU-E2-8 (asignar a otra persona).
  - PA-7 afecta a FS-142 (vista por defecto y tareas hechas).
- **Criterios [PROPUESTO] sin revisar:**
  - FS-118: CA-8, CA-9, CA-11, CA-12, CA-13 y CA-17.
  - FS-142: CA-5, CA-7, CA-9, CA-10, CA-11, CA-12 y CA-14.
- **CA-9 y CA-11 de FS-118 no tienen ticket**, porque nada en el MVP muestra si una tarea está vencida (CA-10).
- **El filtro de FS-142 es de un solo estado:** no se puede ver "todo lo no hecho" de una vez. Entra en PA-7.
- **"Mis tareas" (filtrar por responsable)** es candidato a PA-13, pero no se ha añadido al PRD.

## Siguientes pasos sugeridos

1. Descomponer **E3**, empezando por la historia de la lista (RF-18), porque bloquea los tickets de E2.
2. Escribir los criterios de **HU-E2-1 / E2-1 (FLOW-18)**, que es la primera del orden de backlog.
3. Revisar los criterios [PROPUESTO] de FS-118 y FS-142.
4. Descomponer **E1**. Casi todo existe ya; lo nuevo es RF-5.
5. Abrir el PR del ejercicio. Ver la nota de abajo.

## Git

- **Rama:** `docs/prd-backlog-v2-inv`. Todo lo de `docs/` está commiteado, igual que la regla de `CLAUDE.md` que obliga a mantener este archivo.
- **Sin commitear, ajeno a `docs/`:** `prompts.md`, `.claude/settings.json`, `.claude/hooks/`, `backend/database/schema.ts` y los dos `package-lock.json`.
- **PR sin abrir.** La lección pide un PR que solo contenga el archivo de alcance y `prompts.md`, pero esta rama lleva también el PRD y el backlog. Hay que decidir cómo se monta.
