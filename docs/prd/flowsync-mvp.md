# PRD: FlowSync MVP

Este PRD parte del alcance acordado en [alcance-mvp-inv.md](alcance-mvp-inv.md). Lo que aquí aparece marcado como **[SUPUESTO]** es una decisión tomada sin datos que la respalden; hay que validarla o corregirla.

## 1. Problema y contexto

En los equipos remotos pequeños nadie puede ver el estado del equipo sin interrumpir a alguien. Hoy eso se cubre de dos maneras:

- con la ronda de "¿en qué estás?" de la daily, que se come la mitad de sus 15 minutos;
- con preguntas sueltas por Slack o por chat.

Cuando esto falla, se duplica trabajo. En el caso de estudio, dos personas tocaron el mismo módulo la misma semana porque una empezó sin que la otra lo supiera. Se perdieron dos días.

La daily no desaparece entera. Se va la ronda de estado, pero se queda la parte de bloqueos, y este MVP no resuelve los bloqueos.

Hoy el producto tiene cuentas de usuario (registro, login, perfil y logout) y nada más. No existen las tareas.

## 2. Usuarios y jobs-to-be-done

**A quién va dirigido:** equipos remotos de 3 a 10 personas, repartidos en varios husos horarios, con roles planos. El valor lo reciben los propios compañeros, no un lead. No hay reporte hacia arriba.

**Primer usuario:** un equipo de 6 personas de producto SaaS, en 3 husos horarios. Hoy usa un gestor de tareas pesado y una daily de 15 minutos por videollamada. **Es un caso de estudio, no un cliente real.**

**A quién no va dirigido:** a equipos que necesiten sprints, estimaciones, épicas o informes.

Jobs-to-be-done:

- **JTBD-1.** Cuando voy a empezar algo, quiero saber si otra persona ya lo está tocando, para no duplicar trabajo.
- **JTBD-2.** Cuando termino una tarea, quiero ver qué está libre, para elegir la siguiente sin preguntar a nadie.
- **JTBD-3.** Cuando cambio de tarea, quiero dejarlo reflejado en segundos, para que nadie tenga que interrumpirme para preguntar cómo voy.
- **JTBD-4.** Cuando llego por la mañana o vuelvo de una reunión, quiero ver quién está en qué sin tener que convocar una reunión.

## 3. Propuesta de valor

FlowSync es una lista de tareas compartida que hace dos cosas a la vez: es la cola de trabajo de cada persona y muestra el estado del equipo.

- Quien escribe en ella también gana algo: es la lista donde decide qué coger, y actualizarla le cuesta dos clics.
- Quien la lee se entera de quién está en qué y de qué está libre sin interrumpir a nadie.
- Se consulta al ir a elegir tarea. No avisa ni se actualiza en vivo.
- Sustituye al gestor de tareas actual, no convive con él.

## 4. Alcance / Fuera de alcance

### Dentro

1. Un único espacio de tareas compartido. Todas las personas ven y editan todo. En la lista se ven el responsable, el estado y la fecha de vencimiento de cada tarea.
2. Crear una tarea en segundos. Solo el título es obligatorio; responsable, estado y fecha de vencimiento son opcionales.
3. Cambiar el estado de una tarea, o asignársela, con dos clics desde la propia lista.
4. Filtrar la lista por estado.
5. Seguir usando el acceso que ya existe: registro, login y logout.

### Fuera

Cada exclusión está justificada en el documento de alcance.

- Ver los cambios de los demás sin recargar.
- Marcar de forma especial las tareas libres o vencidas.
- Varios equipos, o una misma persona en más de un equipo.
- Indicadores de presencia o de actividad ("quién está conectado").
- Notificaciones push, email o integración con Slack.
- Comentarios en las tareas y chat.
- Obtener el estado a partir de Git, PRs, CI o el calendario.
- Importar tareas de otro gestor o convivir con él.
- Sprints, estimaciones, épicas y backlog priorizado.
- Analítica e informes.
- Roles y permisos avanzados.
- Subtareas, etiquetas, prioridades, adjuntos y búsqueda.
- Historial o resumen de "qué ha cambiado".
- Login por NIF, contraseñas robustas, sesión única y recuperación de contraseña.

## 5. Épicas del MVP

- **E1 «Cuentas y acceso».** Registro, login y logout con lo que ya existe, más la regla de que no se ve nada sin haber iniciado sesión y la forma de identificar a cada persona como responsable de tareas.
- **E2 «Gestión de tareas».** Crear, editar, asignar, cambiar de estado y borrar tareas, con su fecha de vencimiento, y filtrar la lista por estado.
- **E3 «Actividad del equipo».** La vista compartida del estado del equipo: la lista con el responsable, el estado y la fecha de cada tarea. *No incluye historial, feed de cambios ni presencia, que quedan fuera de alcance.*

## 6. Requisitos funcionales

### E1: Cuentas y acceso

- **RF-1.** Una persona puede registrarse con un email, una contraseña de al menos 8 caracteres y, si quiere, un nombre. Si el email ya está registrado, el registro se rechaza. *(Ya existe.)*
- **RF-2.** Una persona registrada puede iniciar sesión con su email y su contraseña. Si las credenciales son incorrectas, ve un mensaje de error que no dice si el fallo está en el email o en la contraseña. *(Ya existe.)*
- **RF-3.** Una persona puede cerrar sesión. Después de hacerlo, ese dispositivo ya no puede ver ni modificar tareas hasta que vuelva a iniciar sesión. *(Ya existe.)*
- **RF-4.** Sin sesión iniciada no se puede ver, crear, modificar ni borrar ninguna tarea. Si alguien intenta entrar en la lista sin sesión, se le lleva al login.
- **RF-5.** En cualquier sitio donde aparezca una persona como responsable, se muestra su nombre. Si no tiene nombre, se muestra su email.

### E2: Gestión de tareas

- **RF-6.** Cualquier persona con sesión puede crear una tarea escribiendo solo el título. Si el título está vacío o solo tiene espacios, la tarea no se crea y se muestra el motivo.
- **RF-7.** Al crear una tarea también se pueden indicar el responsable (cualquier persona registrada), el estado y la fecha de vencimiento. Ninguno de los tres es obligatorio.
- **RF-8.** Una tarea siempre está en uno de estos tres estados: **Pendiente**, **En curso** o **Hecha** **[SUPUESTO]**. El equipo no puede añadir, renombrar ni quitar estados.
- **RF-9.** Si se crea una tarea sin indicar estado, queda en **Pendiente** **[SUPUESTO]**.
- **RF-10.** Desde la lista, sin salir de ella, se puede cambiar el estado de una tarea con dos clics como máximo.
- **RF-11.** Desde la lista, con dos clics como máximo, una persona puede asignarse una tarea a sí misma.
- **RF-12.** Una tarea se puede asignar a otra persona o dejar sin responsable. Una tarea sin responsable se considera libre. Cada tarea tiene como mucho un responsable.
- **RF-13.** Se pueden editar el título y la fecha de vencimiento de una tarea, y también quitarle la fecha. Al editar el título se aplican las mismas reglas que en RF-6.
- **RF-14.** Se puede borrar una tarea. Antes de borrarla se pide confirmación **[SUPUESTO]**. Una tarea borrada deja de aparecer para todo el equipo y no se puede recuperar **[SUPUESTO]**.
- **RF-15.** Cualquier persona con sesión puede editar, reasignar, cambiar de estado y borrar cualquier tarea, sea o no la responsable.
- **RF-16.** Se permite poner una fecha de vencimiento que ya ha pasado **[SUPUESTO]**.
- **RF-17.** La lista se puede filtrar por un estado concreto o ver entera ("Todas"). Al entrar se muestran todas **[SUPUESTO]**.

### E3: Actividad del equipo

- **RF-18.** Hay una única lista con todas las tareas del espacio. Cada fila muestra el título, el responsable (o "Sin responsable"), el estado y la fecha de vencimiento (o ninguna, si no la tiene).
- **RF-19.** Por defecto, la lista se ordena por fecha de vencimiento, de la más próxima a la más lejana. Las tareas sin fecha van al final, de la más reciente a la más antigua según cuándo se crearon **[SUPUESTO]**.
- **RF-20.** Al abrir o recargar la lista se ven todos los cambios que cualquier persona haya confirmado hasta ese momento. Los cambios que haga uno mismo aparecen al momento en su propia lista, sin recargar.
- **RF-21.** Si no hay tareas, o ninguna cumple el filtro, la lista lo dice claramente y deja crear una tarea desde ahí.

## 7. Requisitos no funcionales

- **RNF-1. Poco esfuerzo por acción.** Crear una tarea solo con título, cambiarle el estado o asignársela se hace desde la lista, sin abrir otra pantalla. En una prueba con usuarios del caso de estudio, cada una de esas acciones debe completarse en menos de 10 segundos **[SUPUESTO]**.
- **RNF-2. Privacidad.** El producto no guarda ni muestra cuándo está conectada una persona, cuándo fue su última actividad ni ninguna otra métrica sobre personas. Lo único que se ve es el estado de las tareas.
- **RNF-3. Durabilidad.** Si la aplicación confirma un cambio, ese cambio no se pierde al recargar ni al volver a iniciar sesión.
- **RNF-4. Ediciones simultáneas.** Si dos personas modifican a la vez la misma tarea, se queda el último cambio confirmado. No se avisa del conflicto **[SUPUESTO]**.
- **RNF-5. Volumen.** Con 10 personas y hasta 500 tareas, la lista sigue cargando y filtrando sin una espera perceptible **[SUPUESTO]**.
- **RNF-6. Plataforma.** Tiene que funcionar en las versiones actuales de los navegadores de escritorio más usados. No se exige un diseño optimizado para móvil **[SUPUESTO]**.
- **RNF-7. Idioma.** Toda la interfaz y todos los mensajes de error están en castellano.
- **RNF-8. Accesibilidad básica.** Las acciones de la lista se pueden hacer con el teclado y cada campo del formulario tiene una etiqueta visible.
- **RNF-9. Seguridad.** Nadie puede ver la contraseña de otra persona, ni siquiera quien administra la instalación. Y ninguna tarea se puede consultar sin haber iniciado sesión.

## 8. Restricciones

- **Stack:** el MVP se construye sobre el stack actual del proyecto (AdonisJS 7 y React 19). No se cambia para el MVP.
- **El acceso ya existe:** registro, login, perfil y logout ya funcionan. El MVP los reutiliza tal cual y no los rehace. Lo que pedía FLOW-1 (NIF, contraseña robusta, sesión única, recuperación de contraseña) queda fuera.
- **Un despliegue por equipo** **[SUPUESTO]**. No existe la entidad "equipo": el espacio es único y quién puede registrarse se controla fuera del producto.
- **Sin servicios de terceros:** ni integraciones ni inicio de sesión con cuentas de otras plataformas.
- **Solo web.** No hay app nativa.

## 9. Métricas de éxito

Como el primer usuario es un caso de estudio, estas métricas solo se pueden medir cuando lo use un equipo real. Se recogen observando al equipo y preguntándole, no con analítica dentro del producto (la analítica está fuera de alcance).

- **M1 (principal).** Después de una semana de uso real, el equipo ha quitado la ronda de "¿en qué estás?" de la daily y nadie ha pedido recuperarla. Se da por cumplida con un sí o un no, sin términos medios: si la siguen haciendo igual, no ha funcionado.
- **M2.** Durante esa semana, cero casos de dos personas trabajando en lo mismo sin saberlo. Se pregunta en la retro.
- **M3.** Las preguntas de "¿en qué estás?" o "¿cómo va X?" por chat bajan respecto a la semana anterior a usar FlowSync, según lo que cuente el propio equipo **[SUPUESTO: no hay línea base medida]**.
- **Riesgo n.º 1 (que el estado se quede desactualizado): no se puede medir en este MVP.** Para comprobar si la lista coincide con lo que la gente hace de verdad habría que preguntárselo a cada persona. Esa es justo la interrupción que el producto promete eliminar (JTBD-3). Y el propio producto no puede detectarlo, porque no registra actividad (RNF-2) y la analítica está fuera de alcance. Si la lista deja de ser fiable, lo más probable es que la ronda de estado vuelva y M1 falle, pero M1 no distingue esa causa de otras. Se asume el riesgo sin medirlo.

## 10. Puntos abiertos

Son hallazgos de la revisión adversarial que no se deciden en este documento. Cada uno recoge el argumento en resumen y qué haría falta para decidirlo.

### Decisiones de producto

- **PA-1. "Sustituye al gestor, no convive" no está marcado como supuesto, y es el más frágil.** El equipo tendría que dejar su gestor por una lista sin comentarios, búsqueda, prioridades, historial ni importación. Si alguien sigue usando la herramienta vieja "para lo importante", vuelve la doble actualización. Además, el primer día hay que pasar a mano todo el trabajo en curso. *Para decidirlo:* averiguar con un equipo real qué campos y funciones de su gestor usan de verdad, y cuánto trabajo en curso tendrían que migrar.
- **PA-2. El solapamiento que motivó el producto era de módulo, no de tarea (JTBD-1).** Dos tareas con títulos distintos pueden tocar la misma zona del código, y la lista solo lo deja ver si alguien lee los títulos y relaciona las dos. *Para decidirlo:* comprobar si en los solapamientos reales las dos personas tenían la misma tarea o solo compartían zona, y según eso aceptarlo como limitación declarada o replantear JTBD-1.
- **PA-3. Nada dentro del producto indica que una tarea lleva tiempo sin actualizarse.** Una tarea en "En curso" desde hace semanas se ve igual que una actualizada hace una hora. *Para decidirlo:* decidir si mostrar cuándo cambió por última vez cada tarea es compatible con RNF-2, porque sería un dato de la tarea y no de la persona, y si merece entrar.
- **PA-4. Acceso, borrado y bajas.** El registro es abierto y "se controla fuera del producto" no dice cómo. Cualquiera puede borrar cualquier tarea sin marcha atrás y sin que quede constancia de quién lo hizo (RF-14, RF-15). No hay forma de dar de baja a alguien que deja el equipo, que seguirá apareciendo como responsable posible (RF-7). *Para decidirlo:* definir quién da acceso en cada despliegue, si borrar debe poder deshacerse y qué pasa con una persona que se va.
- **PA-5. Asignar tareas a otra persona (RF-12) choca con la premisa de que el estado lo escribe quien hace la tarea.** Permite volver a un reparto de tipo lead, y la lista reflejaría decisiones de otros en lugar de trabajo real. *Para decidirlo:* observar si en el equipo se asignan tareas entre compañeros o cada uno coge las suyas, y según eso quedarse solo con "asignármela / soltarla".
- **PA-6. JTBD-4 frente a la falta de historial.** La ficha hablaba de "ver qué se ha movido" al volver. La lista enseña cómo está todo ahora, no qué ha cambiado desde la última vez. *Para decidirlo:* confirmar si al usuario le basta con el estado actual o necesita ver los cambios, y reescribir JTBD-4 en consecuencia.
- **PA-7. Las tareas hechas se acumulan en la vista por defecto (RF-17, RF-19).** La vista "Todas" ordenada por fecha de vencimiento pone arriba las tareas hechas con fechas antiguas, y no hay archivo. Esto choca con "centrarse en lo pendiente". *El filtro por estado y la fecha de vencimiento siguen dentro del alcance; lo abierto es cómo se presentan.* *Para decidirlo:* probar con usuarios qué vista y qué orden por defecto necesitan, y qué hacer con las tareas ya hechas.

### Métricas

- **PA-8. M1 se puede cumplir por decreto.** Un equipo que acepta probar puede cancelar la ronda el primer día porque se lo han pedido, y una semana es poco plazo. *Para decidirlo:* definir en qué semana se mide y cuál es la señal de que la ronda vuelve por necesidad y no por costumbre.
- **PA-9. M2 no distingue nada.** El solapamiento pasó una vez y no se sabe con qué frecuencia ocurre. Tener cero casos en una semana es lo esperable con o sin FlowSync. *Para decidirlo:* conocer la frecuencia real de solapamientos antes de fijar la métrica, o quitarla.
- **PA-10. M3 no tiene línea base.** Sin medir antes de empezar, "bajan" es solo una impresión. *Para decidirlo:* medir una semana antes de usar FlowSync, o quitar la métrica.

### Ambigüedades que se pueden resolver durante la construcción

- **PA-11. Requisitos que no se pueden probar tal como están escritos.**
  - RNF-1 exige una prueba con usuarios del caso de estudio, que no existen, y no aclara si los 10 segundos incluyen escribir el título.
  - RNF-5 no da un umbral para "sin una espera perceptible".
  - RNF-6 no dice qué navegadores.
  - RNF-9 promete algo sobre quien administra la instalación que no se puede comprobar.
  - RF-5 no distingue a dos personas con el mismo nombre.
  - RF-10 y RF-11 no dicen si "dos clics" incluye llegar hasta la tarea.
  - RF-18 no dice qué se muestra cuando una tarea no tiene fecha.
  - "Un despliegue por equipo" (sección 8) no se puede comprobar.

  *Para decidirlo:* en cada caso, fijar un criterio comprobable al escribir las historias.
- **PA-12. Funcionalidad que entró sin estar en el alcance.** El alcance tenía 4 puntos y el PRD tiene 21 RF. Editar y borrar (RF-13, RF-14) entraron por un supuesto que hablaba de permisos, no de funcionalidades. La confirmación al borrar, la lista vacía con botón de crear, el orden por defecto, las fechas pasadas y la accesibilidad (RF-14, RF-21, RF-19, RF-16, RNF-8) son pulido que no valida la hipótesis. Identificar a cada persona como responsable (E1, RF-5) obliga a mostrar la lista de personas registradas. *Para decidirlo:* en el refinamiento del backlog, preguntarse para cada uno qué hipótesis ayuda a validar, y quitar los que no ayuden a ninguna.
