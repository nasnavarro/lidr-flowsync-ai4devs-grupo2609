# Definition of Done por tipo de ticket

Cada ticket cumple los criterios de aceptación de su historia. Esta lista no añade criterios: describe **cómo se entrega** un ticket según su tipo. Todo ticket cumple la checklist de su tipo, además de lo que su propia ficha indique.

## Migración/DB

- [ ] La migración se aplica y se revierte sin errores.
- [ ] Después de `node ace migration:run`, el `database/schema.ts` regenerado va en el commit y no se ha editado a mano.
- [ ] Las tareas que ya existían siguen siendo válidas después de migrar.
- [ ] `npm run lint` y `npm run typecheck` del backend pasan.

## Modelo/Dominio

- [ ] El modelo no declara columnas; solo añade lógica.
- [ ] El validador usa `vine.create` y reutiliza los builders compartidos en lugar de repetir reglas.
- [ ] Hay tests en la suite `unit`.
- [ ] Los mensajes de error están en castellano.
- [ ] `npm run lint` y `npm run typecheck` pasan.

## Endpoint/API

- [ ] La entrada se valida con `request.validateUsing`.
- [ ] La respuesta pasa por `serialize()` con un transformer, nunca devuelve el modelo tal cual.
- [ ] La ruta está protegida con `middleware.auth()`.
- [ ] Hay tests en la suite `functional`, con la BD aislada mediante `testUtils.db()`. Es obligatorio porque la BD de tests comparte fichero con la de desarrollo.
- [ ] El registro regenerado en `.adonisjs/` va en el commit.
- [ ] `npm run lint` y `npm run typecheck` pasan.

## Frontend

- [ ] Toda llamada nueva al backend está en `lib/api.ts`, no en los componentes.
- [ ] Los errores se muestran a partir de `ApiError` y `fieldErrors`, en castellano.
- [ ] Los componentes de shadcn se añaden con su CLI y no se editan a mano.
- [ ] Se puede usar con teclado y cada campo o control tiene una etiqueta visible.
- [ ] `npm run build` y `npm run lint` (oxlint) pasan.
- [ ] El frontend no tiene runner de tests: cada criterio heredado se comprueba a mano y el resultado se anota en el PR.

## Test

- [ ] Cubre los criterios que indica su ficha.
- [ ] Da el mismo resultado sea cual sea el día de ejecución y la zona horaria de la máquina.
- [ ] Se ejecuta con `node ace test`, con la BD aislada.
