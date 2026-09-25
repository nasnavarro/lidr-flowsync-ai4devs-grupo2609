# FlowSync: alcance del MVP

Este alcance es la base del PRD. **No es el PRD.** Recoge lo que se acordó en la sesión de descubrimiento.

## 1. Problema

En los equipos remotos pequeños nadie ve el estado del equipo sin interrumpir a alguien. Eso provoca dos cosas:

- La ronda de "¿en qué estás?", que ocupa la mitad de una daily de 15 minutos.
- Preguntas constantes por Slack o por chat.

El coste se ve en un caso concreto: dos personas tocaron el mismo módulo la misma semana porque una empezó sin que la otra lo supiera, y se perdieron dos días de trabajo.

La daily no desaparece entera. Desaparece la ronda de "¿en qué estás?". La parte de bloqueos se mantiene, y este MVP no la resuelve.

## 2. Usuarios

- Equipos remotos pequeños, de 3 a 10 personas, en varios husos horarios.
- Todos tienen el mismo rol: ven y editan lo mismo.
- El valor lo reciben los propios compañeros, no un lead. No hay que reportar a nadie por encima, y a un manager este producto no le aporta nada.
- Primer usuario: un equipo de 6 personas de un producto SaaS, repartido en 3 husos horarios. Hoy usa un gestor de tareas pesado y hace una daily de 15 minutos por videollamada. **Es un caso de estudio, no un cliente real.**
- No es para equipos que necesiten sprints, estimaciones o informes.

## 3. Propuesta de valor

Una lista compartida de tareas que hace dos cosas a la vez: es la cola de trabajo de cada persona y muestra el estado del equipo.

Actualizar una tarea cuesta dos clics, y quien la actualiza también saca algo. Es la misma lista que mira para decidir qué coge, y le ahorra que le pregunten cómo va.

La lista ayuda a tomar dos decisiones:

- No empezar algo que otra persona ya tiene entre manos.
- Elegir la siguiente tarea sabiendo qué está libre.

**Se consulta en el momento de elegir tarea. No avisa ni se actualiza en vivo.**

Sustituye al gestor de tareas actual, no convive con él. Las tareas se crean en FlowSync.

## 4. Alcance

1. **Un único espacio de tareas compartido.** Todos ven y editan todo. En la lista se ve el responsable, el estado y la fecha de vencimiento de cada tarea.
2. **Crear una tarea en segundos.** Solo el título es obligatorio. El responsable, el estado y la fecha de vencimiento son opcionales.
3. **Cambiar el estado de una tarea o asignársela en dos clics**, desde la misma lista.
4. **Filtrar la lista por estado**, para centrarse en lo pendiente.

Se reutiliza el acceso que ya existe (registro, login y logout). No forma parte del alcance nuevo.

## 5. NO-alcance

- **Ver los cambios de los demás sin recargar.** La decisión se toma al abrir la lista para elegir tarea, y en ese momento lo que se ve ya está al día. El solapamiento que se quiere evitar dura días, no segundos. No ayuda a validar la hipótesis central, que es si la gente escribe su estado. *Esto se aparta a propósito de la ficha de hechos, que definía "tiempo real" como ver los cambios sin refrescar.*
- **Marcar de forma especial las tareas libres o vencidas.** El punto 1 ya lo cubre: un responsable vacío o una fecha pasada se ven directamente en la lista. Destacarlas sería pulir, no validar.
- **Varios equipos, o personas en más de un equipo.** La hipótesis se valida con un solo equipo. Queda como supuesto.
- **Presencia e indicadores de actividad** ("quién está conectado"). El estado es de la tarea, no de la persona. Es vigilancia, y se rechaza por principio.
- **Notificaciones push, email o integración con Slack.** La información espera a que la consultes, no te interrumpe. Avisar reintroduce justo la interrupción que se quiere quitar.
- **Comentarios en las tareas y chat.** Convierten la lista en un canal de conversación. La hipótesis es ver quién está en qué, no hablar de ello.
- **Sacar el estado de Git, PRs, CI o el calendario.** Eso es otro producto, con integraciones y OAuth de terceros. Además, si el estado se deriva solo, deja de comprobarse la hipótesis de que la gente lo escribe.
- **Importar desde otro gestor o convivir con él.** Tener que actualizar dos sitios es lo que mata a esta categoría de herramientas.
- **Sprints, estimaciones, épicas y backlog priorizado.** Es justo la complejidad de Jira que se quiere evitar. Un equipo que la necesite no es nuestro usuario.
- **Analítica e informes.** No hay nadie por encima a quien reportar.
- **Roles y permisos avanzados.** Todos tienen el mismo rol y no hay jerarquía que proteger.
- **Subtareas, etiquetas, prioridades, adjuntos y búsqueda.** Cada campo añadido es una decisión más al crear una tarea, y el producto depende de que crearla cueste segundos. Con 10 personas como mucho, basta con filtrar por estado.
- **Historial o resumen de "qué ha cambiado".** La lista actual ya responde a quién está en qué. El historial responde a qué ha pasado, que es otra pregunta.
- **Login por NIF, contraseña robusta, sesión única y recuperación de contraseña** (lo que pedía FLOW-1). No ayudan a validar esta idea, y el acceso actual es suficiente para un equipo pequeño.

## Supuestos

- Cada tarea tiene como mucho un responsable. Si no tiene ninguno, está libre.
- Cualquier persona puede editar o borrar cualquier tarea.
- Los estados son pocos y fijos, y el equipo no puede configurarlos.
- Cada despliegue sirve a un solo equipo. El acceso de quién puede registrarse se controla fuera del producto.

## Riesgo principal y criterio de éxito

- **Riesgo n.º 1:** que la información se quede desactualizada. Si nadie actualiza, la lista miente y el producto pierde el sentido. La mitigación es que actualizar cueste dos clics, no obligar a nadie.
- **Criterio a una semana de uso real:** el equipo deja de hacer la ronda de "¿en qué estás?" en la daily y nadie pide que vuelva. Si la siguen haciendo igual, no ha funcionado. Como el primer usuario es un caso de estudio, este criterio no se puede comprobar hasta que lo use un equipo real.
