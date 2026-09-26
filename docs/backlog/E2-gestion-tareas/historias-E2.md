# Historias de E2 «Gestión de tareas»

Este es el listado completo de historias de la épica, tal como salió al descomponerla y validado contra el alcance del PRD ([flowsync-mvp.md](../../prd/flowsync-mvp.md)). En todas, el rol es *miembro del equipo*, porque el MVP tiene roles planos. RF-15 (cualquiera puede tocar cualquier tarea) no es una historia: es una regla que se aplica a todas.

## Dentro del alcance

| ID | Historia | RF | Estado |
|---|---|---|---|
| HU-E2-1 | Como miembro del equipo, quiero crear una tarea escribiendo solo su título, para registrar trabajo nuevo en segundos sin rellenar nada más. | RF-6 | En Jira como **E2-1 (FLOW-18)**. Sin criterios. |
| HU-E2-2 | Como miembro del equipo, quiero indicar el responsable al crear una tarea, para que se vea desde el principio quién la lleva. | RF-7 | Sin criterios. |
| HU-E2-3 | *Fusionada en FS-118.* | RF-7, RF-16 | Ver FS-118. |
| HU-E2-4 | Como miembro del equipo, quiero elegir el estado inicial al crear una tarea, o que quede en Pendiente si no lo elijo, para registrar también trabajo que ya está en curso. | RF-7, RF-8, RF-9 | Sin criterios. |
| HU-E2-5 | Como miembro del equipo, quiero cambiar el estado de una tarea desde la lista, para que mi avance quede reflejado sin que nadie tenga que preguntarme. | RF-8, RF-10 | Sin criterios. ⭐ Quick win. |
| HU-E2-6 | Como miembro del equipo, quiero asignarme una tarea libre desde la lista, para que los demás sepan que ya la he cogido y no la empiecen. | RF-11 | Sin criterios. ⭐ Quick win. |
| HU-E2-7 | Como miembro del equipo, quiero soltar una tarea que tengo asignada, para que vuelva a verse libre si no voy a hacerla. | RF-12 | Sin criterios. |
| HU-E2-8 | Como miembro del equipo, quiero asignar una tarea a otra persona, para reflejar quién la va a hacer. | RF-12 | Sin criterios. **Pendiente de PA-5.** |
| HU-E2-9 | Como miembro del equipo, quiero editar el título de una tarea, para corregirlo o aclararlo cuando no se entiende. | RF-13 | Sin criterios. Pendiente de PA-12. |
| HU-E2-10 | *Fusionada en FS-118.* | RF-13, RF-16 | Ver FS-118. |
| HU-E2-11 | Como miembro del equipo, quiero borrar una tarea, confirmándolo antes, para quitar de la lista las que se crearon por error o ya no tienen sentido. | RF-14 | Sin criterios. **Pendiente de PA-4** y de PA-12. |
| **FS-118** | Como miembro del equipo, quiero poner, cambiar o quitar la fecha de vencimiento de una tarea y verla en la lista, para saber de un vistazo para cuándo es y cuáles ya se han pasado de plazo. | RF-7, RF-13, RF-16 | Tiene criterios y tickets. En Jira: **FLOW-3**. [Historia](us-fechas-vencimiento.md) · [Tickets](tickets-FS-118.md) |
| **FS-142** (antes HU-E2-12) | Como miembro del equipo, quiero filtrar la lista por un estado y volver a verla entera, para centrarme en lo pendiente. | RF-17 | Tiene criterios y tickets. En Jira: **FLOW-12**. [Historia](us-filtrar-por-estado.md) · [Tickets](tickets-FS-142.md) |

## Fuera de alcance del MVP

Estas historias no entran en el backlog. Se dejan anotadas para que no vuelvan a colarse.

| Historia | Por qué queda fuera |
|---|---|
| Recuperar una tarea borrada | RF-14 dice expresamente que una tarea borrada no se puede recuperar. |
| Añadir o renombrar estados | RF-8 fija los estados. |
| Asignar una tarea a varias personas | RF-12 permite como mucho un responsable. |
| Avisar al responsable cuando le asignan una tarea | Las notificaciones están excluidas del MVP. |
| Ver el historial de cambios de una tarea | El historial está excluido del MVP. |
| Prioridad, etiquetas o subtareas | Están excluidas del MVP. |
| Filtrar por responsable ("mis tareas") o buscar por texto | El PRD solo permite filtrar por estado y excluye la búsqueda. **Hay tensión:** la propuesta de valor habla de "la cola de trabajo de cada persona", y sin este filtro no hay forma de ver solo la tuya. Es candidato a punto abierto (PA-13), pero todavía no está añadido al PRD. |

## Equivalencia de identificadores

| En el chat o en la priorización | En el backlog | En Jira |
|---|---|---|
| HU-E2-1 | E2-1 | FLOW-18 |
| HU-E2-3 + HU-E2-10 | FS-118 | FLOW-3 (subtareas FLOW-4 a FLOW-11) |
| HU-E2-12 | FS-142 | FLOW-12 (subtareas FLOW-13 a FLOW-17) |
