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
**Herramienta:** Claude Code
**Mode:** Plan

```
Quiero escribir la spec de lo que el sistema hace hoy. Las dos capas, y solo ese vertical. Lo que pasa por la API y lo que se ve en pantalla, y nada que no sea cuentas y acceso (registro, inicio de sesión, sesión y perfil, cierre de sesión), en sus dos capas: API y pantallas.
Usa un subagente Explore para inventariarlo. Solo lectura: no escribas ni modifiques ningún archivo.
Devuélveme solo comportamiento observable y no obtenido a partir del código:
- API: cada endpoint del vertical con método, qué acepta, qué responde en éxito y en cada error (código HTTP y forma del cuerpo), y qué exige estar autenticado.
- Pantallas: qué ve y puede hacer una persona en cada pantalla de acceso, a dónde la lleva cada acción, qué pasa al recargar, y qué pasa si entra en una pantalla protegida sin sesión (o con sesión en una solo para no autenticados).
```

**Qué salió:** Una propuesta de plan. Sobre la misma propuesta le lancé otros 3 prompts que no me ha recogido el sistema de logueo de los prompts que he montado, que son:
1. ¿Todo es del vertical y observable?
2. ¿Hay registros redactados como implementación?
3. ¿Falta algún grupo de los que hemos definido o sobra alguno?
De las 2 primeras hizo ajustes en lo que tenía. De la tercera comprobó que no faltaba ni sobraba nada.

## Prompt 2

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Con ese inventario, antes de escribir la spec, propón la lista de  requisitos candidatos del modo siguiente: una línea por requisito (qué SHALL hacer el sistema) y cuántos scenarios tendría cada uno. Agrúpalos por registro / login / sesión / perfil / logout / protección de pantallas.
Marca los que dependen de una "duda" del inventario. No escribas nada aún.
```

**Qué salió:** Muestra por pantalla un listado de requisitos candidatos agrupados. Un total de 36 requisitos y 60 escenarios de los que 2 dependen de una duda relaltiva a la caducidad del token, que no está clara.

## Prompt 3

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Escribe la spec en docs/spec-viva/inv.md (la carpeta no existe, créala) con este formato NO NEGOCIABLE:
- "## Purpose" de una o dos frases: para qué existe esta capability.
- "## Requirements" y debajo "### Requirement: <nombre>" con el texto usando SHALL/MUST.
- Bajo cada requisito, al menos un "#### Scenario: <nombre>" (cuatro almohadillas) con dos
  viñetas: "- **WHEN** ..." y "- **THEN** ...". Sin GIVEN: la precondición va dentro del WHEN.
- En castellano, salvo las palabras RFC en mayúsculas.
Reglas duras: es la verdad actual del sistema, no un delta (nada de ADDED/MODIFIED/REMOVED);
solo comportamiento observable (petición/respuesta en la API; lo que se ve y se puede hacer
en pantalla), sin nombres de archivo, clase, función ni rutas de código; y no toques ningún
archivo de código. Donde no esté claro si algo es contrato o casualidad, no lo decidas:
escribe el requisito con lo que se observa y añade debajo una línea "> ⚠️ Duda: ...".
```

**Qué salió:** He escrito la spec en docs/spec-viva/inv.md y he creado la carpeta. Tiene 36 requisitos y 70 scenarios, y hay 14 líneas "> ⚠️ Duda".   He comprobado el formato: cada requisito tiene al menos un scenario y todos llevan su WHEN y su THEN. No aparecen GIVEN, ADDED/MODIFIED/REMOVED ni nombres de ficheros, clases o funciones. No he tocado ningún archivo de código.   Los requisitos siguen la lista que aprobaste, con estos cambios:   • Nuevo requisito: "Formato de los errores de validación", para describir una sola vez la forma del cuerpo 422.
• Regla de la contraseña: longitud y confirmación forman ahora un solo requisito.
• Scenarios añadidos: varios requisitos tienen más de los que estimé, por eso hay 70 y no unos 60.
• Dudas nuevas: el 200 en vez de 201 del registro, el logout sin envoltorio data , los emails que distinguen mayúsculas, el recorte de espacios en las contraseñas, la clave fullName obligatoria y otras en la misma línea.

## Prompt 4

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Dame una tabla en el chat: requisito → dónde tengo que mirar en el código para comprobarlo (archivo y líneas), en ambas capas si aplica.
```

**Qué salió:** Una tabla estructurada en donde en una columna de backend y ptra de frontend, con pulsar me abre la parte de código en que resuelve esa especificación para revisarla.

## Prompt 5

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Revisa docs/spec-viva/inv.md contra las reglas: ¿aparece algún nombre de archivo, clase, función o ruta de código? ¿algún ADDED/MODIFIED/REMOVED? ¿algún scenario sin WHEN o sin THEN,o con tres almohadillas? ¿algo fuera de cuentas y acceso? Corrige SOLO el formato; no cambies el contenido de los requisitos.
```

**Qué salió:** Ha revisado todo y no ha encontrado nada que corregir de nombres de código, apariciones de ADDED/MODIFIED/REMOVED/GIVEN, ningún escenario que no tenga WHEN/THEN, ni ninguno fuera del alcance. Indica que hay una palabra en el límite: "backend", que aparece en varios escenarios.

## Prompt 6

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Sin modificar la spec, añade debajo de ella en docs/spec-viva/inv.md una sección con tres listas, usando SOLO lo que te dicto:
1. Requisitos escritos por el agente: cuéntalos en el archivo. Comprobados por mí: 6.
2. Incoherencias: <pego mis notas>. Una línea cada una, con dónde se ve.
+ No veo que el backend formatee el error, cosa que el frontend sí hace
+  El email en backend tiene una restricción de 254 caracteres que el frontend no parece considerar
+ El email es único tanto en front como en backend, pero no tengo claro si distingue entre mayúsculas y minúsculas
3. Bug o contrato: Hay un requerimiento que dice: "### Requirement: Sin límite de longitud de contraseña en el login
El login no SHALL aplicar límites de longitud a la `password`. Una contraseña de cualquier longitud que no coincida SHALL tratarse como credenciales incorrectas." Pero otro requerimiento dice que:"### Requirement: Pantalla de registro
La pantalla `/register` SHALL mostrar:
- el título "Crea tu cuenta" y el texto "Regístrate para empezar a organizar el trabajo del equipo.";
- los campos "Nombre completo (opcional)", "Email", "Contraseña" (con la ayuda "Entre 8 y 32 caracteres.") y "Repite la contraseña";
- el botón "Crear cuenta";
- el enlace "¿Ya tienes cuenta? Inicia sesión", que lleva a `/login`.".
No añadas elementos que no te haya dado ni redondees los números.
```

**Qué salió:** Añadió lo que se esperaba en el archivo. En una revisión posterior, he hecho alguna modificación en el propio fichero en los apartados 2 y 3.
