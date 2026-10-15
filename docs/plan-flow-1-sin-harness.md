# Plan — FLOW-1 (copia sin harness)

> Nota: este archivo es un apunte de trabajo para revisar y comparar con la
> copia con harness. No forma parte de la entrega del ejercicio (que según
> el README es solo `docs/harness/comparacion.md` + `prompts.md`), así que
> no lo incluyas en el PR salvo que decidas lo contrario.

## Ticket

**Título:** Crear en el frontend login y registro de usuario

**Descripción:** Necesito crear un login donde el username sea el nif y la
contraseña de al menos 8 caracteres, una mayúscula, una minúscula, un
número y un carácter especial. Que no permita que un usuario esté logueado
2 veces en distintas sesiones. Que pueda regenerar la contraseña.

## Estado actual relevante

- **Backend** (AdonisJS 7 + Lucid + SQLite): ya existen `POST
  /api/v1/auth/signup`, `POST /api/v1/auth/login`, `GET
  /api/v1/account/profile`, `POST /api/v1/account/logout`. Auth por
  **email** + password (8-32 caracteres, sin regla de complejidad), tokens
  opacos guardados en `auth_access_tokens` (no JWT), sin límite de
  sesiones concurrentes por usuario. Validación con VineJS, respuestas
  envueltas en `{ data: ... }`.
- **Frontend** (React 19 + Vite): scaffold vacío. No hay router, no hay
  cliente API, no hay formularios, no hay estado de auth, no hay página de
  login. Todo se crea desde cero. Existe un cliente tipado
  (`@tuyau/client`) generado por el backend pero sin instalar/usar en el
  frontend.

## Decisiones que asumo

El ticket no las especifica — en un ticket real las marcaría como
preguntas abiertas antes de empezar:

1. **"Regenerar contraseña"** lo interpreto como *cambiar contraseña
   estando autenticado* (contraseña actual + nueva), no como flujo de
   "olvidé mi contraseña" por email — no hay infraestructura de correo en
   el proyecto y el ticket no pide email de recuperación.
2. **NIF sustituye a email** como identificador de login. No sé si hace
   falta validar el formato real de NIF/NIE español (letra de control) o
   basta un formato alfanumérico; empezaría por lo segundo y lo ajustaría
   con el equipo.
3. **"No permitir logueado 2 veces"**: al hacer login en una sesión nueva,
   invalido el token de la sesión anterior (en vez de bloquear el login
   nuevo con un error). Es la opción más simple y la UX más común; la
   alternativa (rechazar el login nuevo con 409 si ya hay una sesión
   activa) es igual de válida si el negocio lo prefiere así.

## Cambios de backend (~9 archivos)

1. `backend/database/migrations/xxxx_add_nif_to_users.ts` **(nuevo)** —
   añade columna `nif` (unique, not null); decidir si `email` se elimina o
   queda opcional.
2. `backend/app/models/user.ts` **(editar)** — reflejar el nuevo campo (el
   `schema.ts` se regenera con `node ace migration:run`).
3. `backend/app/validators/user.ts` **(editar)** — `nif` en vez de `email`
   en signup/login; regex de complejidad de password (mayúscula,
   minúscula, número, carácter especial, min 8).
4. `backend/app/controllers/access_tokens_controller.ts` **(editar)** —
   login por `nif`; antes de emitir token nuevo, revocar tokens previos
   del usuario (sesión única).
5. `backend/app/controllers/new_account_controller.ts` **(editar)** —
   registro por `nif`.
6. `backend/app/transformers/user_transformer.ts` **(editar)** — whitelist
   con `nif`.
7. `backend/app/validators/password.ts` **(nuevo)** — validador para
   cambio de contraseña.
8. `backend/app/controllers/passwords_controller.ts` **(nuevo)** —
   `store()`: verifica password actual, aplica nueva.
9. `backend/start/routes.ts` **(editar)** — `POST /api/v1/account/password`,
   auth-protegida.

## Cambios de frontend (~11 archivos, todo nuevo)

1. `frontend/package.json` — añadir `react-router-dom`, `react-hook-form`
   + `zod` (o `@tuyau/client` para el cliente API tipado).
2. `frontend/.env.example` — `VITE_API_URL`.
3. `frontend/src/lib/api.ts` — cliente API (fetch/Tuyau) contra los 5
   endpoints.
4. `frontend/src/contexts/AuthContext.tsx` — token + usuario actual,
   `login/register/logout/changePassword`; si una llamada devuelve 401
   (sesión invalidada por login en otro sitio), limpia estado y redirige a
   `/login`.
5. `frontend/src/routes/RequireAuth.tsx` — wrapper de rutas protegidas.
6. `frontend/src/main.tsx` **(editar)** — envolver con router +
   `AuthProvider`.
7. `frontend/src/App.tsx` **(editar)** — definir rutas `/login`,
   `/register`, `/account/password`, resto protegido.
8. `frontend/src/pages/LoginPage.tsx` **(nuevo)**.
9. `frontend/src/pages/RegisterPage.tsx` **(nuevo)**.
10. `frontend/src/pages/ChangePasswordPage.tsx` **(nuevo)**.
11. Estilos: reutilizar las custom properties ya definidas en
    `frontend/src/index.css` (`--accent`, `--border`, `--text`) — no hace
    falta nuevo sistema de diseño.

## Orden sugerido

Backend (migración → validadores → login/registro → sesión única →
cambio de password) primero, porque el frontend depende de los contratos
finales; luego frontend (scaffolding de router/cliente API → AuthContext
→ páginas).
