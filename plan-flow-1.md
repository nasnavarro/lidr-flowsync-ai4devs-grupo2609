# Plan de implementación — FLOW-1

**Ticket:** [FLOW-1](https://websoluzion.atlassian.net/browse/FLOW-1) · "Crear en el frontend login y registro de usuario" · Proyecto FlowSync (Jira) · Estado: Por hacer

**Descripción original (texto de producto, tal cual):**
> Necesito crear un login donde el username sea el nif y la contraseña de al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial. Que no permita que un usuario esté logueado 2 veces en distintas sesiones. Que pueda regenerar la contraseña.

## 0. Restricción de partida

Por `CLAUDE.md` de este repo: **no se toca `backend/` en este ejercicio.** Todo lo de abajo se implementa contra los endpoints que ya existen hoy, sin migrations ni cambios de validators/modelos.

## 1. Huecos entre el ticket y el backend real

El ticket está escrito en lenguaje de producto y dijo más de lo que el backend soporta hoy. Localizado leyendo `backend/app/validators/user.ts`, `backend/app/models/user.ts`, `backend/database/migrations/` y `backend/start/routes.ts`:

| Pide el ticket | Qué hay hoy en el backend | Se puede cubrir sin tocar backend/ |
|---|---|---|
| Username = NIF | Tabla `users` solo tiene `email` (único), no hay columna `nif` | ❌ No — requiere migration + validator nuevos. Se usa `email` como identificador. |
| Password: 8+ car., mayúscula, minúscula, número, especial | `signupValidator`/`loginValidator` (Vine) solo exigen `minLength(8).maxLength(32)`, sin regla de complejidad | ⚠️ Parcial — se puede validar la complejidad en el cliente (UX), pero el servidor seguiría aceptando una contraseña que solo cumpla longitud. No es una garantía real de seguridad hasta que se valide también en el backend. |
| No permitir 2 sesiones simultáneas | `DbAccessTokensProvider` (access tokens) no revoca tokens anteriores al crear uno nuevo — permite múltiples tokens activos por usuario a propósito | ❌ No — exigiría lógica de servidor (revocar tokens previos en login, o guardar un token "activo" único). |
| Regenerar contraseña | No existe ningún endpoint de reseteo/regeneración (`routes.ts` solo tiene `signup`, `login`, `profile`, `logout`) | ❌ No — no hay endpoint que llamar. |

**Conclusión:** de los 4 requisitos del ticket, 1 se cubre completo (login/registro en sí) y otro parcialmente vía UX (política de contraseña, solo del lado cliente). Los otros dos (NIF, sesión única) y la mitad de "regenerar contraseña" necesitan trabajo de backend que hoy está fuera de alcance. Se documentan como seguimiento, no se implementan a medias ni se simulan.

## 2. Endpoints reales contra los que se implementa

| Acción | Método y ruta | Devuelve |
|---|---|---|
| Registro | `POST /api/v1/auth/signup` | `{ user, token }` |
| Login | `POST /api/v1/auth/login` | `{ user, token }` |
| Perfil (autenticado) | `GET /api/v1/account/profile` | `user` (vía `UserTransformer`) |
| Logout (autenticado) | `POST /api/v1/account/logout` | `{ message }` |

`user` serializado trae: `id`, `fullName`, `email`, `createdAt`, `updatedAt`, `initials` (ver `UserTransformer`).

## 3. Alcance de la implementación (solo `frontend/`)

Nuevos archivos:

- `frontend/src/lib/api.ts` — cliente `fetch` mínimo hacia `${VITE_API_URL}/api/v1`, con manejo de errores de validación de Vine (`{errors: [{field, message}]}`) vía una clase `ApiError`.
- `frontend/src/lib/auth.ts` — `signup()`, `login()`, `fetchProfile()`, `logout()`, tipados sobre los 4 endpoints de arriba.
- `frontend/src/lib/passwordPolicy.ts` — checklist de complejidad (8+, mayúscula, minúscula, número, especial) para la UI del registro. Comentario explícito de que es solo cliente, no sustituye validación de servidor.
- `frontend/src/features/auth/useAuth.ts` — hook con el estado de sesión (`user`, `token`, `loading`), persistido en `localStorage`, y las acciones `login`/`signup`/`logout`.
- `frontend/src/features/auth/LoginForm.tsx`, `RegisterForm.tsx`, `Dashboard.tsx` — los tres pantallas/formularios.

Modificados:

- `frontend/src/App.tsx` — sustituye el scaffold de Vite por el flujo login → registro → dashboard, usando `useAuth`.
- `frontend/src/App.css` — estilos de formulario reutilizando los tokens de color ya definidos en `index.css` (`--accent`, `--border`, `--text`, etc.), en vez de las reglas del scaffold (`.hero`, `#next-steps`, `#docs`, `#social`…) que dejan de tener elemento que estilar.
- `frontend/.env.example` (nuevo) — `VITE_API_URL=http://localhost:3333`, siguiendo el mismo patrón que `backend/.env.example`.

No se toca ningún archivo de `backend/`.

## 4. Nota de transparencia en la UI

En el formulario de registro, un texto pequeño bajo el campo de email: *"El acceso es por email: el backend todavía no tiene un campo de NIF."* — para que el hueco del punto 1 quede visible a quien use el formulario, no escondido.

## 5. Verificación antes de dar por cerrado

1. `cd frontend && npm run lint` (oxlint) — debe salir limpio.
2. `cd frontend && npm run build` (`tsc -b && vite build`) — el proyecto usa `verbatimModuleSyntax` y `noUnusedLocals`/`noUnusedParameters`, así que los imports de tipos deben ir marcados con `type` y no puede quedar nada sin usar.
3. El hook `PostToolUse` de este repo (`.claude/hooks/lint-test.sh`) ya corre `npm run lint` en `frontend/` tras cada edición — sirve de red adicional durante la implementación.
4. Prueba manual: backend (`npm run dev` en `backend/`, puerto 3333) + frontend (`npm run dev` en `frontend/`, puerto 5173) levantados a la vez, flujo completo registro → logout → login.

## 6. Seguimiento fuera de alcance (para un ticket aparte)

- Añadir campo `nif` a `users` (migration + validator + login por NIF en vez de/además de email).
- Enforzar complejidad de contraseña también en el backend (regla Vine adicional en `signupValidator`).
- Sesión única: revocar tokens de acceso anteriores del usuario al hacer login (cambio en `AccessTokensController` / `DbAccessTokensProvider`).
- Endpoint de regeneración/reseteo de contraseña (nueva ruta + controller + validator).
