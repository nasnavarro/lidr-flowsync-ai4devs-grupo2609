# Prompts

Aquí van **todos los prompts que lanzaste** para hacer el ejercicio, en el orden en que los
lanzaste, con el modelo y la herramienta de cada uno.

Esto no es papeleo. Lo que se revisa es **cómo pediste las cosas**, no solo lo que salió: un
resultado flojo con un prompt bueno y un resultado flojo con un prompt vago necesitan feedback
distinto, y sin este archivo no se distinguen.

## Cómo rellenarlo

- Un apartado `## Prompt N` por cada prompt.
- **Pega el prompt tal cual lo lanzaste**, dentro del bloque de código, aunque ocupe diez líneas
  y aunque tenga faltas. No lo reescribas para que quede bien: el que arreglaste mentalmente
  después no es el que lanzaste.
- Incluye también los que **no funcionaron**. Suelen ser los más útiles de leer.
- `Modelo` y `Herramienta` en todos. Si cambiaste de una a otra a mitad, se nota aquí.

Borra el ejemplo de abajo cuando escribas el primero.

---

## Prompt 1

**Modelo:** Opus 5.5
**Mode:** Plan
**Herramienta:** Claude Code

```
Antes de nada, léete el repo y devuélveme el estado real del proyecto: qué capabilities ya existen (auth…) y un diagrama rápido del modelo de datos actual (entidades y relaciones, en Mermaid). No propongas  cambios todavía; solo quiero el mapa de lo que hay.
```

**Qué salió:** Me muestra un resumen de los descubrimientos de lo que tiene ahora mismo el proyecto, así como indica que el FLOW-1 por el que le pregunté antes, está en Listo, pero que no cumple lo que hay con lo que pedía (tiene sentido, porque era de mi ejercicio inicial, que no coincide con el de la rama con que empezamos del profesor).

## Prompt 2

**Modelo:** Opus 5.5
**Mode:** Plan
**Herramienta:** Claude Code

```
Actúa como product partner escéptico. Aquí tienes una idea difusa para FlowSync: «Quiero que FlowSync sea una herramienta para que los equipos remotos sepan en qué está trabajando cada uno sin tener que hacer reuniones de sincronización. Algo tipo tareas compartidas pero más en tiempo real y menos rollo que Jira.» Antes de proponer nada, hazme las 5 preguntas que más reducirían la incertidumbre sobre el problema, los usuarios y el alcance. No asumas; pregunta. Ten en cuenta el estado del repo que acabas de mapear (auth; las tareas aún no existen). Una sola ronda: con mis respuestas, continúa sin abrir otra tanda de preguntas. Quédate a nivel de producto: nada de modelo de datos, esquema, estados internos, endpoints ni latencias, eso se decide más adelante.
```

**Qué salió:** No se sale del guión preestablecido, da 5 preguntas, indica que responda lo que pueda y que sigue sin abrir otra ronda.

## Prompt 3

**Modelo:** Opus 5.5
**Mode:** Plan
**Herramienta:** Claude Code

```
- Qué duele hoy: la daily de sincronización y el "¿en qué estás?" constante por
Slack/chat. Nadie ve el estado del equipo sin interrumpir a alguien.
- Quién cobra el valor: los pares, no un lead. No hay reporte hacia arriba y a un
manager le daría igual. Duele a los dos devs que descubren tarde que iban a lo mismo, y
al que interrumpe a otro para preguntar.
- Episodio concreto: dos personas del equipo tocaron el mismo módulo la misma semana
porque una empezó sin que la otra lo supiera. Dos días perdidos.
- Qué reunión desaparece (respuesta honesta, no la vendas de más): la daily NO
desaparece entera. Desaparece la ronda de "¿en qué estás?", que hoy se come la mitad de
los 15 minutos. La parte de bloqueos sigue, y este MVP no la resuelve.
- Usuarios / equipo: equipos remotos pequeños, 3–10 personas. Roles planos: en el MVP
todos ven y editan lo mismo, sin jerarquía de permisos.
- Primer usuario concreto: equipo de 6 personas de producto SaaS, en 3 husos horarios,
que hoy usa un gestor de tareas pesado y una daily de 15 minutos por videollamada. Es un CASO DE ESTUDIO, no un cliente real: dilo en voz alta en vez de fingir lo contrario.
- Fronteras: un espacio único compartido, sin entidad "equipo". Varios equipos
separados, o gente en más de uno, queda FUERA del MVP: se anota como supuesto en el PRD, no se construye.
- "Tiempo real" = ver los cambios de estado de las tareas sin refrescar ni preguntar. NO es chat, NO es videollamada, NO es colaboración simultánea sobre el mismo documento.
- Es frescura, no presencia: el estado es de la TAREA, no de la persona. Nada de "quién
está conectado ahora" ni indicadores de actividad; eso es vigilancia y lo rechazamos a
propósito.
- Forma de la señal: resumen que espera, no aviso que interrumpe. El caso es "llego por
la mañana o vuelvo de una reunión y veo qué se ha movido". Sin notificaciones push.
- Qué decisión cambia: no empezar algo que otra persona ya está tocando, y elegir lo
siguiente sabiendo qué está libre. Si la única respuesta fuera "sentirse informado", el
tiempo real no valdría lo que cuesta.
- De dónde sale el estado: lo teclea la persona que hace la tarea, en segundos.
Derivarlo de señales externas (Git/PRs, CI, calendario) está FUERA del MVP: es otro
producto, con integraciones y OAuth de terceros.
- Por qué se sostiene: no porque sea más agradable, sino porque son dos clics sobre una
lista ya abierta, sin campos obligatorios, sin decidir sprint ni estimación. Y quien lo
escribe cobra en el momento: esa misma lista es su cola de trabajo, la mira para decidir qué coge, y de paso deja de recibir interrupciones preguntándole cómo va. Si el
beneficio fuera solo para los demás, no lo escribiría.
- Si la información se queda vieja: el producto pierde el sentido, y lo asumo. Es el
riesgo #1 a validar, no un detalle. La mitigación es que actualizar cueste dos clics, no obligar a nadie.
- Es donde se hace el trabajo, no donde se cuenta: sustituye al gestor de tareas, no
convive con él. FlowSync crea las tareas, no lee las de otro sitio. Convivir exigiría
doble actualización, que es como muere esta categoría.
- Renuncia explícita a sprints, estimaciones, épicas, backlog priorizado e informes. Un
equipo que necesite eso no es nuestro usuario.
- "Menos rollo que Jira" = crear una tarea y cambiarle el estado en segundos, sin flujos de configuración ni campos obligatorios. Lo mínimo para saber quién está en qué.
- Qué necesita una tarea en el MVP: título, responsable, estado y fecha de vencimiento.
La fecha, para ver de un vistazo qué se ha pasado de plazo.
- Cómo se consume la lista: filtrando por estado, para centrarse en lo pendiente.
- Éxito para el usuario: dejar de hacer la ronda de "¿en qué estás?" de la daily porque
el estado del equipo se ve de un vistazo.
- Criterio a una semana de uso real: que el equipo cancele esa ronda y nadie pida que
vuelva. Si la siguen haciendo igual, no funcionó.
- Cuánto construir: una vertical fina y usable de punta a punta, no el andamiaje amplio
de un producto. Prefiero una capability terminada a tres a medias.
```

**Qué salió:** Tomó la ficha tal cual y propuso el alcance en 5 bloques (7 puntos de alcance), diciendo explícitamente que el primer usuario es un caso de estudio y no un cliente.

## Prompt 4

**Modelo:** Opus 5.5
**Mode:** Plan
**Herramienta:** Claude Code

```
De lo incluido en el alcance recortaría lo siguiente ( y por qué):
4.Una tarea sin responsable se ve como libre, de un vistazo. Del alcance 1, si es un espacio donde todos ya lo ven todo  a simple vista, no necesita una segunda entrada para el alcance que ya se cumple en 1.
5.Los cambios de estado de otros aparecen sin recargar. En las premisas se comentaba que el modo de funcionar es que el propio trabajador mira cuando va a ponerse con algo, con lo que no es necesario añadir esto. Mantenemos la simplicidad predefinida.
7.Las tareas vencidas se distinguen a simple vista. Misma explicación que en 4.
Con respecto a los supuestos, ok a todos.
Con mis respuestas, propón el alcance de un MVP: problema, usuarios, propuesta de valor,
alcance (in) y NO-alcance (out). Sé agresivo recortando: es un MVP, no el producto
final. Justifica cada exclusión.
```

**Qué salió:** Aceptó los tres recortes, pero avisó de que quitar el 5 choca con el «tiempo real» de la ficha y que esa renuncia tiene que aparecer en el NO-alcance. Absorbió el 4 y el 7 en el punto 1 (se ven responsable y fecha).

## Prompt 5

**Modelo:** Opus 5.5
**Mode:** Plan
**Herramienta:** Claude Code

```
Indicas que "El recorte del 7 obliga a algo parecido: si nada marca las vencidas, la fecha solo sirve si se ve en la lista.", y en el punto 1 dice que se ven esos datos en la lista, con lo que no es una suposición, ya sabemos que sí se ve la fecha.
```

**Qué salió:** Observa que efectivamente se había incluido en el 1 al quitar los otros, con lo que lo tenía en cuenta.

## Prompt 6

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Consolida lo anterior en un alcance final en 5 bloques (problema, usuarios, propuesta de
valor, alcance, NO-alcance), listo para ser la base de un PRD. Guarda ese alcance
consensuado en docs/prd/alcance-mvp.md, para que no dependa de la conversación. Todavía
no escribas el PRD.
```

**Qué salió:** Guardó el alcance consensuado en docs/prd/alcance-mvp.md con los 5 bloques más supuestos y riesgo principal; avisó de que la lección pide el sufijo con iniciales (lo renombré a alcance-mvp-inv.md).

## Prompt 7

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Lee @docs/prd/alcance-mvp-inv.md.
Redacta un PRD de MVP para FlowSync en docs/prd/flowsync-mvp.md. Estructura: 1) Problema
y contexto, 2) Usuarios y jobs-to-be-done, 3) Propuesta de valor, 4) Alcance / Fuera de
alcance, 5) Épicas del MVP: exactamente estas tres y en este orden, E1 «Cuentas y
acceso», E2 «Gestión de tareas», E3 «Actividad del equipo» (una línea cada una: nombre +
qué agrupa), 6) Requisitos funcionales a nivel producto (numerados, RF-1…; el qué debe
hacer el sistema, NO endpoints ni tablas ni modelo de datos), 7) Requisitos no
funcionales, 8) Restricciones (stack actual: AdonisJS 7 + React 19; auth ya existe), 9)
Métricas de éxito. Sé concreto y testable. No incluyas diseño técnico (ER, arquitectura,
diagramas C4): esto es producto. No inventes cifras de mercado; si algo es supuesto,
márcalo como [SUPUESTO].
```

**Qué salió:** PRD con los 9 apartados y las 3 épicas. Avisó de que E3 «Actividad del equipo» choca con el NO-alcance (la definió como la vista compartida, sin historial ni feed) y marcó como [SUPUESTO] estados, umbrales, orden por defecto, etc.

## Prompt 8

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Revisa el PRD y saca cualquier detalle técnico que se haya colado (nombres de tabla,
endpoints, tipos de campo). Súbelo a lenguaje de producto: qué necesita el usuario, no
cómo se implementa.
```

**Qué salió:** No había tablas ni endpoints; subió a lenguaje de producto 4 frases (contraseñas en claro, SQLite, tokens, OAuth). Dejó AdonisJS/React porque los pedí yo como restricción.

## Prompt 9

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Ahora cambia de sombrero: sé un revisor de producto adversarial. Lee el PRD que acabas
de escribir y atácalo. ¿Qué requisitos son ambiguos o no testables? ¿Qué supuesto, si es
falso, tumba el MVP entero? ¿Dónde hay scope creep escondido? ¿Qué métrica de éxito no
se puede medir de verdad? Prioriza por riesgo.
```

**Qué salió:** Ataque priorizado por riesgo: los supuestos más frágiles son que el equipo abandone su gestor actual y que la lista detecte el solapamiento del episodio (mismo módulo, no misma tarea). Dos métricas no podían fallar.

## Prompt 10

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
De tus hallazgos acepto uno y el resto van a puntos abiertos.
Acepto el que sea una CONTRADICCIÓN INTERNA del documento: donde el PRD se pide a sí
mismo algo que él mismo prohíbe, o promete algo que su propio alcance impide cumplir.
Eso es un fallo mío, no una opinión discutible, y se arregla en un párrafo. Aplícalo, y
resuélvelo por el lado honesto: si algo no se puede medir o no se puede cumplir, se
declara así, sin maquillarlo ni inventarle una mitigación de adorno.
Los que sean decisiones de producto —qué se ve, en qué orden, con qué lente, cuánto de
algo— no se deciden en treinta segundos delante de una clase. Pásalos a la sección de
puntos abiertos, cada uno con tu argumento resumido y con lo que haría falta para
decidirlo.
Los que tú mismo marcas como subsanables durante la construcción, a puntos abiertos
también.
Dos cosas NO se tocan, aunque las hayas cuestionado bien: la fecha de vencimiento y el
filtrado por estado se quedan DENTRO del alcance y bajo la épica E2. Si algún hallazgo
tuyo los ataca, va a puntos abiertos, nunca al NO-alcance.
Actualiza docs/prd/flowsync-mvp.md con eso y nada más. No reescribas secciones que
ningún hallazgo toque.
```

**Qué salió:** Arregló como contradicción interna M4 (medir el riesgo #1 exigía preguntar a cada uno, justo la interrupción que se elimina): quitada y declarada no medible. Resto a PA-1…PA-12; movió el filtro de E3 a E2 (renumeró RF-17/RF-18).

## Prompt 11

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
git add docs/
```

**Qué salió:** Staging de los dos archivos de docs/prd/.

## Prompt 12

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
/commit
```

**Qué salió:** Commit e4b62bf «docs(prd): alcance del MVP y PRD de FlowSync». No abrió PR y avisó del conflicto entre la regla del CLAUDE.md y lo que pide la lección para el PR.

## Prompt 13

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Lee @docs/prd/flowsync-mvp.md.
Descompón la épica E2 "Gestión de tareas" en historias de usuario.
Cada historia en formato "Como <rol>, quiero <acción> para <beneficio>".
Aplica INVEST: pequeñas, testables. NO escribas criterios todavía, solo el listado.
Valida cada historia contra el alcance del PRD: si alguna se sale del MVP, márcala
explícitamente como "fuera de alcance MVP" en vez de colarla.
```

**Qué salió:** 11 historias de E2 dentro del alcance (HU-E2-1…12) y 7 marcadas fuera del MVP; avisó de que 4 dependen de puntos abiertos del PRD.

## Prompt 14

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
De las historias que acabas de listar, coge la de la fecha de vencimiento y las tareas
vencidas. Si te salieron separadas (poner o quitar la fecha por un lado, ver si se ha
pasado de plazo por otro), consolídalas en UNA sola historia antes de seguir: para
nosotros es una única historia.
Escribe sus criterios de aceptación en formato Given/When/Then, redactados en español
(DADO / CUANDO / ENTONCES).
Reglas MUY importantes:
- Un criterio de historia es una REGLA DE NEGOCIO observable: qué es verdad para el
usuario. NO uses endpoints, status codes ni nombres de campo internos (nada de "PATCH
/tasks/:id", "422", "isOverdue"). Ese detalle técnico es de la fase de implementación,
no de aquí.
- Incluye el camino feliz Y los edge cases / errores que se me puedan olvidar.
- Marca los criterios que propongas tú para mi revisión.
```

**Qué salió:** Consolidó HU-E2-3 y HU-E2-10 en una sola historia con criterios DADO/CUANDO/ENTONCES y [PROPUESTO] marcados. Avisó de que «ver si se ha pasado de plazo» choca con el NO-alcance (no hay marca de vencida; solo se ve la fecha).

## Prompt 15

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Ahora la historia de filtrar las tareas por estado para centrarse en lo pendiente. Si no
apareció al descomponer E2 porque ese requisito quedó bajo otra épica, tómala
igualmente: para nosotros es una historia de E2.
Mismos criterios: reglas de negocio observables en Given/When/Then, en español (DADO /
CUANDO / ENTONCES), sin endpoints ni status codes. Incluye el caso de que se pida un
estado que no existe (el sistema debe avisar del error, no devolver una lista vacía en
silencio).
```

**Qué salió:** La historia ya estaba en E2 (HU-E2-12). Criterios incluido el estado inexistente, y un aviso: con un solo estado por filtro no se puede ver junto todo lo no terminado (Pendiente + En curso) → encaja en PA-7.

## Prompt 16

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Guarda en docs/backlog/E2-gestion-tareas/ SOLO las dos historias que acabamos de
enriquecer con criterios de aceptación, un archivo markdown por historia. Las demás
historias del listado no se guardan todavía. La de fechas de vencimiento va en
us-fechas-vencimiento.md. Cada archivo: el título de la historia, su identificador, su
formulación "Como <rol>, quiero <acción> para <beneficio>" y sus criterios de aceptación
en Given/When/Then, en español (DADO / CUANDO / ENTONCES), tal como los hemos aprobado y
con mis ediciones incluidas. Sin endpoints, status codes ni nombres de campo internos.
Los identificadores los fijo yo, no los inventes: la historia de fechas de vencimiento
es FS-118 y la de filtrar por estado es FS-142.
```

**Qué salió:** Guardó FS-118 (17 criterios) y FS-142 (14 criterios). Señaló que no le había pasado ediciones, así que los [PROPUESTO] quedaron tal cual; eligió él el nombre us-filtrar-por-estado.md.

## Prompt 17

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
git add docs/
```

**Qué salió:** Staging de las dos historias.

## Prompt 18

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
/commit
```

**Qué salió:** Commit cff9324 «docs(backlog): historias FS-118 y FS-142 de E2 con criterios de aceptación».

## Prompt 19

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Coge @docs/backlog/E2-gestion-tareas/us-fechas-vencimiento.md.
Descompón esta historia en TICKETS: cada ticket = una unidad de trabajo que una persona
termina en una sesión (media jornada máx).
Para cada ticket: ID derivado de la historia (la historia es FS-118, así que sus tickets
son FS-118.1, FS-118.2, FS-118.3…), título, tipo (uno de estos: Endpoint/API,
Migración/DB, Modelo/Dominio, Frontend, Bug o Test), Definition of Done según su tipo, y
dependencias (qué ticket lo bloquea).
El ticket HEREDA los criterios de la historia; su Definition of Done es una checklist de
"cómo lo entregamos" (tests, manejo de error, convenciones), NO criterios nuevos ni
estimación en horas.
El ticket NOMBRA la capa que toca (migración, modelo, endpoint, UI), pero NO diseña:
nada de tipos de columna, si admiten nulos, índices, nombres de ruta ni status codes.
Esa decisión es de la implementación.
```

**Qué salió:** 8 tickets para FS-118 con DoD por tipo. Avisó de que dependen de historias sin ticketizar (crear tarea, editar, la lista de E3) y de que CA-9/CA-11 (qué es «vencida») no tienen ticket porque nada en el MVP lo muestra.

## Prompt 20

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Ahora coge la historia FS-142 "Filtrar tareas por estado", de
@docs/backlog/E2-gestion-tareas/.
Descompón esta historia en TICKETS con la misma convención que la anterior: ID derivado
de la historia (la historia es FS-142, así que sus tickets son FS-142.1, FS-142.2…),
título, tipo (uno de estos: Endpoint/API, Migración/DB, Modelo/Dominio, Frontend, Bug o
Test), Definition of Done según su tipo, y dependencias (qué ticket lo bloquea).
El ticket HEREDA los criterios de la historia; su Definition of Done es una checklist de
"cómo lo entregamos" (tests, manejo de error, convenciones), NO criterios nuevos ni
estimación en horas.
El ticket NOMBRA la capa que toca (migración, modelo, endpoint, UI), pero NO diseña:
nada de tipos de columna, si admiten nulos, índices, nombres de ruta ni status codes.
Esa decisión es de la implementación.
```

**Qué salió:** 5 tickets para FS-142, sin migración ni ticket de test aparte. Detectó una contradicción entre CA-6 (filtro en un enlace) y CA-14 (al recargar vuelve a «Todas») y propuso que cediera CA-14.

## Prompt 21

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Si
```

**Qué salió:** Acepté su propuesta: corrigió CA-14 (recargar o abrir el enlace mantiene el filtro; entrar sin enlace muestra todas). Recordó que los tickets aún solo estaban en el chat.

## Prompt 22

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Muéstrame las dependencias entre los tickets de FS-118 como un grafo simple (qué bloquea
a qué) y el orden de implementación recomendado.
```

**Qué salió:** Grafo Mermaid de FS-118 con las historias externas que bloquean, y orden en dos cortes usables: crear con fecha y verla en la lista, después cambiar o quitar, y al final la prueba de husos horarios.

## Prompt 23

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Estima cada ticket en t-shirt sizing (S/M/L) y da una nota de riesgo. No inventes horas
exactas; explica en qué se basa cada talla.
```

**Qué salió:** 2 S, 6 M, ningún L, sin horas. El riesgo alto está en cómo se interpreta la fecha (118.2, 118.5), no en los tickets más grandes; señaló que no existe ningún test todavía y eso encarece los primeros.

## Prompt 24

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Coloca en una matriz impacto vs complejidad las historias de E2 "Gestión de tareas"
(incluidas las que quedaron fuera del MVP) y también el sync en tiempo real de E3
"Actividad del equipo", y propón un orden de backlog. Marca los "quick wins" (alto
impacto, baja complejidad).
```

**Qué salió:** Matriz de cuadrantes: quick wins HU-E2-6 (asignarme) y HU-E2-5 (cambiar estado); «mis tareas» como quick win fuera del MVP; el sync en tiempo real de E3 lo puso en la matriz pero no en el backlog porque está en el NO-alcance.

## Prompt 25

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Escribe en docs/backlog/ el backlog que acabamos de construir: los tickets de cada
historia (ID derivado FS-118.1…, título, tipo, Definition of Done y dependencias), el
grafo de dependencias y el orden de implementación, y la matriz impacto/complejidad de
las historias de E2 con el orden de backlog priorizado. Respeta lo que hemos decidido en
vivo; no añadas horas ni criterios nuevos.
```

**Qué salió:** Escribió 4 archivos: definition-of-done.md (común), tickets-FS-118.md, tickets-FS-142.md y priorizacion-E2.md. Avisó de que el orden de FS-142 lo dedujo del grafo porque no lo habíamos fijado.

## Prompt 26

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Materializa el backlog en el tablero FLOW de Jira usando el MCP de Atlassian. Hazlo
SECUENCIAL, en este orden, sin lanzar creaciones en paralelo:
1. Crea la HISTORIA FS-118 como issue de tipo "Historia". Título: «FS-118 — Fechas de
vencimiento y tareas vencidas». Descripción: sus criterios de aceptación en
Given/When/Then, en español (DADO / CUANDO / ENTONCES), tal como los aprobamos (reglas
de negocio, sin endpoints ni status codes). Etiquetas: "E2" y "FS-118".
2. Lee la clave que Jira devuelve para esa historia (tiene la forma FLOW-nnn) y úsala en
el paso 3.
3. Crea cada ticket de esa historia (FS-118.1, FS-118.2, FS-118.3…) como issue de tipo
"Subtarea", pasando el parámetro parent con la clave FLOW-nnn de la historia. En cada
subtarea: título con su ID derivado («FS-118.1 — …»), descripción con su tipo y su
Definition of Done, etiquetas "E2" y su ID.
4. Repite los pasos 1-3 con la HISTORIA FS-142 «Filtrar tareas por estado» y los tickets
que le hayan salido (FS-142.1, FS-142.2…, los que sean). Si esa historia no tiene ningún
ticket, créala igualmente como "Historia" y no le cuelgues subtareas.
5. Crea por último la HISTORIA que encabeza el orden priorizado, como issue de tipo
"Historia" y SIN subtareas. Título: «E2-1 — Crear tarea con solo el título».
Descripción: que es la primera del orden de backlog por ser prerrequisito de todo lo
demás; que junto con E2-2, E2-3 y E2-4 forma la base de la capability de tareas
(requisitos RF-5 a RF-9 del PRD: crear con solo el título, título obligatorio,
responsable por defecto, los tres estados fijos y cambiar el estado desde la lista); y
que sus criterios de aceptación viven en el backlog del repositorio, en docs/backlog/,
no en este tablero: hoy en directo hemos enriquecido solo las dos historias de arriba.
Etiquetas: "E2" y "E2-1".

Restricciones que debes respetar:
- Los tipos de issue de este proyecto están EN ESPAÑOL: usa literalmente "Historia" y
"Subtarea". "Story" o "Sub-task" no resuelven.
- Una subtarea NO se puede crear sin parent: la historia va siempre primero y su clave
se encadena a cada subtarea.
- No inventes claves de Jira: la clave real la asigna Jira (FLOW-nnn). FS-118 y FS-118.1
son nuestra convención y viven en el título y las etiquetas, nunca como clave.
```

**Qué salió:** Creó en Jira FLOW-3 (FS-118) con FLOW-4…11, FLOW-12 (FS-142) con FLOW-13…17 y FLOW-18 (E2-1), y lo verificó con una consulta. Me preguntó por la descripción de E2-1 porque citaba mal los RF del PRD (elegí la versión corregida). Reconoció que lanzó 2 subtareas en paralelo, aunque se crearon bien.

## Prompt 27

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
git add docs/
```

**Qué salió:** Staging de los 5 cambios de docs/backlog/ (tickets, DoD, priorización y la corrección de CA-14).

## Prompt 28

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
/commit
```

**Qué salió:** Commit 4671e77 «docs(backlog): tickets de FS-118 y FS-142, DoD por tipo y priorización de E2».

## Prompt 29

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Ok, una duda, que he seguido el guión de clase, y no sé si hay cosas que no se quedan duardadas en disco. Hemos creado el alcance consensuado y está en disco. Tmbién el prd del producto versionado. Descomponemos una épica en historias. Y dos de las historias tienen ya aplicadaos criterios de aceptación. Historias partidas en tickets. Todo versionado. Pero al mirar en backlog, sólo veo en la carpeta de prd el alcance y prd propiamente dicho, y en backlog sólo la E2 . ¿Dónde viven las historias que no hemos desarrollado aún?
```

**Qué salió:** Confirmó el hueco: las otras 9 historias de E2 y las de fuera del MVP solo existían en el chat, E1/E3 nunca se descompusieron y las equivalencias HU-E2-x / FS-xxx / FLOW-x no estaban escritas en ningún sitio.

## Prompt 30

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
¿Y además de la E2, tenemos una E1, o E3..? Me he perdido un poco en alguno de los pasos
```

**Qué salió:** Tabla de las 3 épicas: solo E2 está descompuesta. E1 está casi hecha en código (solo falta RF-5); E3 no tiene historias y bloquea a E2, porque la lista de tareas vive ahí.

## Prompt 31

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Mi duda es que esta se supone que es la resolución paso a paso del ejercicio de clase. Pero si cierro este hilo y abro un o nuevo la proxima vez que siga, todo lo que esté en esta memoria se pierde, y no tengo claro que tenga suficiente visibilidad del estado global del proyecto
```

**Qué salió:** Propuso sacar el estado del chat al repo: creó docs/ESTADO.md (punto de entrada de cada sesión) y historias-E2.md (listado completo con equivalencias), y ofreció añadir una regla a CLAUDE.md.

## Prompt 32

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Si, añadelo
```

**Qué salió:** Añadió a CLAUDE.md dos reglas: leer docs/ESTADO.md al empezar y actualizarlo al terminar cualquier tarea que toque docs/ o Jira.

## Prompt 33

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Haz el git add
```

**Qué salió:** Staging de CLAUDE.md, docs/ESTADO.md e historias-E2.md.

## Prompt 34

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
/commit
```

**Qué salió:** Commit 86b1d97 «docs: estado global del trabajo de producto e historias de E2». Luego vio que ESTADO.md seguía diciendo «sin commitear» y lo arregló con --amend (no había push).
