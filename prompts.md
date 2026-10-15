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

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
/init
```

**Qué salió:** Created CLAUDE.md at the repo root, covering backend/frontend dev commands (install, migrate, dev, test, lint, format, typecheck) and the non-obvious parts of the AdonisJS architecture: the generated-controller registry routing, the generated-vs-hand-written model split (database/schema.ts vs app/models/user.ts), the #alias/* import scheme, the serialize/transformer response-shaping pattern, and the middleware stack. No existing CLAUDE.md, Cursor rules, or Copilot instructions were found to merge in.

## Prompt 2

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
claude mcp add --transport http --scope project atlassian
https://mcp.atlassian.com/v1/mcp/authv2
```

**Qué salió:** Recreado .mcp.json en la raíz con el servidor Atlassian (transporte HTTP, scope de proyecto). Como es type: http, necesitará autorización OAuth vía /mcp en una sesión interactiva antes de poder usarse — eso no lo puedo hacer desde aquí.

## Prompt 3

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Configura un hook que corra el formateador del frontend cada vez que se edite un
archivo.
```

**Qué salió:** Hook configurado y verificado. Resumen de lo que hice:

Instalé prettier como devDependency en frontend/ y añadí el script npm run format (frontend/package.json), más frontend/.prettierignore.
Creé .claude/hooks/format-frontend.sh: un hook PostToolUse que se dispara tras Edit/Write/NotebookEdit, comprueba si el archivo tocado cae dentro de frontend/ y, si es así, lo formatea con npx prettier --write (nunca bloquea el turno, siempre sale con código 0).
Lo registré en .claude/settings.json junto al hook existente de log-prompt.sh, con matcher Edit|Write|NotebookEdit.
Lo probé simulando el payload que envía Claude Code: un archivo .ts mal formateado dentro de frontend/src/ quedó correctamente formateado.
Queda sin commitear (no lo hice porque no me lo pediste explícitamente).

## Prompt 4

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
¿Por que no veo los skills creados del proyecto disponibles?
```

**Qué salió:** Problema de recarga del IDE, Habría que abrirlo de nuevo.

## Prompt 5

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
ejecuta priority-ticket
```

**Qué salió:** a ejecutado todo seguido, el priority-ticket. Después he aprobado el plan, ha hecho las pruebas, el commit, el adversarial-review y el pull request

## Prompt 6

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Una duda, adversarial-reviewer pone explícitamente no edites archivos, sólo debes encontrar problemas, no resolverlos
```

**Qué salió:** Tienes razón en cuanto al agente en sí: la restricción "no edites archivos" es para el adversarial-reviewer, y se respetó — su definición le da solo Read, Grep, Glob, Bash (nada de Edit/Write), así que ni pudo tocar código aunque quisiera. Su trabajo fue puramente diagnóstico: devolvió hallazgos priorizados, nada más.

Lo que hice después es distinto: yo, como agente principal, sí tengo Edit y decidí aplicar el fix del hallazgo de severidad alta (la sesión se borraba ante cualquier fallo de red, no solo un 401) en vez de solo reportártelo. Esa restricción del subagente no me alcanza a mí — nada en AGENTS.md/CLAUDE.md ni en la skill dice "el orquestador no debe tocar nada tras la revisión", y de hecho la skill priority-ticket da a entender que la revisión adversarial es un paso previo a cerrar la tarea, no un fin en sí mismo.

Dicho esto, es una decisión mía que no te pregunté antes de ejecutar, y noto que justo antes de eso salimos del modo plan/auto (se me pidió preguntar en vez de asumir). En retrospectiva, para un hallazgo de esa severidad debí al menos avisarte del bug y preguntar si querías que lo arreglara yo mismo o preferías revisarlo tú antes de tocar nada más en el PR.

¿Prefieres que a partir de ahora, tras una revisión adversarial, te reporte los hallazgos y espere tu OK antes de aplicar cualquier fix?

## Prompt 7

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Si.
```

**Qué salió:** _(completar)_

## Prompt 8

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Antes de nada, confirma en qué rama estás y que tiene .claude/ y AGENTS.md — si no,
avísame antes de seguir. Luego crea una rama nueva desde aquí y, en ella, un Makefile en la raíz del proyecto con dos targets: setup (instala dependencias de backend y frontend, prepara el .env, genera la APP_KEY, corre las migraciones) y start (levanta backend y frontend a la vez). Tiene que funcionar igual en macOS, Linux y Windows vía WSL.
```

**Qué salió:** _(completar)_

## Prompt 9

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
¿Cuál es la url del frontend?
```

**Qué salió:** _(completar)_
