# AGENTS.md

Guía para agentes de IA (Claude Code y similares) que trabajen en este
repo. FlowSync es un monorepo de práctica: API en AdonisJS (`backend/`) +
SPA en React/Vite (`frontend/`), sin build system compartido — cada
carpeta se instala, testea y builda por separado.

Claude Code importa este archivo automáticamente desde `CLAUDE.md`
(`@AGENTS.md`) — las reglas de proceso y prohibiciones específicas del
ejercicio viven allí, no aquí.

## Estructura del proyecto

```
backend/    API AdonisJS 7 + Lucid (SQLite) — ver AGENTS.md propio si se añade
frontend/   SPA React 19 + Vite 8
prompts.md  Registro de prompts del ejercicio del curso (no tocar su formato)
```

No hay `package.json` en la raíz: todos los comandos se ejecutan dentro de
`backend/` o `frontend/`.

## Comandos de desarrollo

### Backend (`cd backend`)

```bash
npm install
cp .env.example .env        # primera vez
node ace generate:key       # primera vez
node ace migration:run      # primera vez y tras cada migration nueva
npm run dev                 # http://localhost:3333, con HMR
```

### Frontend (`cd frontend`)

```bash
npm install
npm run dev                 # http://localhost:5173
```

Arranca el backend antes que el frontend si vas a probar llamadas a la
API — el frontend no levanta la API por su cuenta.

## Comandos de test, lint y build

| | backend | frontend |
|---|---|---|
| test | `npm test` (`node ace test`) | — (no hay suite configurada) |
| lint | `npm run lint` (eslint) | `npm run lint` (oxlint) |
| typecheck | `npm run typecheck` (`tsc --noEmit`) | incluido en `build` |
| format | `npm run format` (prettier --write .) | — |
| build | `npm run build` (`node ace build`) | `npm run build` (`tsc -b && vite build`) |

Antes de dar por cerrado un cambio en `backend/`, corre `npm run lint`,
`npm run typecheck` y `npm test` ahí dentro. En `frontend/`, `npm run
lint` y `npm run build` (el build ya tipa con `tsc -b`).

## Convenciones del backend (AdonisJS + Lucid)

Estas son las reglas que un cambio debe respetar para encajar con el
resto del código — no son opcionales por estilo, rompen el flujo de
generación de Adonis si se saltan:

1. **`database/schema.ts` es generado, nunca se edita a mano.** Lleva
   cabecera "DO NOT EDIT" y se regenera con `node ace migration:run`
   (`schemaGeneration.enabled: true` en `config/database.ts`). Cualquier
   cambio de columnas se hace con una **migration nueva** en
   `database/migrations/`, nunca tocando el schema directamente. Si el
   generador infiere mal un tipo, se ajusta en `database/schema_rules.ts`,
   no parcheando el `schema.ts` generado ni el modelo.

2. **Los modelos componen la clase de schema generada + mixins**, no
   extienden `BaseModel` directamente ni declaran columnas a mano. Patrón:
   `compose(XSchema, withAuthFinder(hash))` importando `XSchema` desde
   `#database/schema` (ver `app/models/user.ts`).

3. **La serialización de salida va siempre por un Transformer**, nunca
   se devuelve el modelo tal cual desde un controller. Un transformer por
   entidad en `app/transformers/*_transformer.ts`, extendiendo
   `BaseTransformer<T>` con `toObject()` + `this.pick(...)`. En el
   controller: `serialize(XTransformer.transform(recurso))`.

   **Toda respuesta que pasa por `ctx.serialize(...)` llega al cliente
   envuelta en `{ "data": ... }`** (ver `providers/api_provider.ts`,
   `ApiSerializer`/`wrap: 'data'`) — así lo devuelven hoy `signup`,
   `login` y `profile`. Un controller que devuelve un objeto plano sin
   pasar por `serialize()` (como `AccessTokensController#destroy`,
   logout) **no** lleva ese envoltorio. El cliente debe desenvolver
   `.data` explícitamente por endpoint, no asumir un único formato de
   respuesta para toda la API.

4. **La validación de input va siempre por Vine**, en
   `app/validators/*.ts`, con reglas compartidas factorizadas en
   funciones (p. ej. `email()`, `password()` en `validators/user.ts`) en
   vez de repetidas entre validators. Se invoca con
   `request.validateUsing(...)` en el controller — nunca validando a mano.

5. **Imports internos siempre por alias `#carpeta/*`**, nunca rutas
   relativas largas (`../../..`). Los alias están declarados en
   `package.json` → `imports` (uno por capa: `#models`, `#validators`,
   `#transformers`, `#controllers`, `#database`, `#middleware`, etc.).

6. **Rutas agrupadas con `router.group().prefix().as()`** bajo
   `/api/v1` (ver `start/routes.ts`), no rutas sueltas en la raíz del
   router. Los controllers se referencian vía el registry generado por
   Tuyau (`#generated/controllers`), no importándolos directamente.

## Convenciones del frontend

- Linter es **oxlint**, no ESLint — no añadir `.eslintrc` ni esperar que
  reglas de ESLint apliquen aquí (`frontend/.oxlintrc.json`).
- `npm run build` tipa con `tsc -b` antes de invocar Vite: un error de
  tipos rompe el build aunque Vite pueda servir el `dev` igual.

## Hook de lint/test automático

Este repo trae un hook de Claude Code (`.claude/settings.json` +
`.claude/hooks/lint-test.sh`): tras cada edición de un archivo (Edit,
Write o MultiEdit), corre `npm run lint` — y `npm test` si el
subproyecto tiene ese script — del subproyecto correspondiente
(`backend/` o `frontend/`, detectado por la ruta del archivo tocado). Un
fallo se reporta como error bloqueante en la conversación. Solo se
activa en una sesión de Claude Code abierta con este repo como raíz
(no en la carpeta superior del bootcamp que lo contiene).

## Notas de proceso específicas de este repo

- Este es el repo de un **ejercicio del bootcamp AI4Devs**: el trabajo
  real se hace en un fork, en la rama `s1/start`, y se entrega por pull
  request contra el repo del curso — ver `README.md` para el enunciado
  completo antes de asumir que un cambio se sube directo a `main`.
- `prompts.md` en la raíz es la plantilla de entrega del ejercicio
  (registro de prompts lanzados) — no es documentación técnica del
  proyecto, no reescribir su estructura.
- No hay CI configurado en este repo — "verde" significa lint +
  typecheck + test locales, no un check remoto.
