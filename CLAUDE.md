# CLAUDE.md

Instrucciones para Claude Code en este repo. Para stack, comandos de
dev/test/lint/build y convenciones de código (migrations, modelos,
validators, transformers, alias de imports), ver el archivo importado
abajo — no se repiten aquí.

@AGENTS.md

## Contexto del repo

FlowSync es el proyecto del ejercicio "Monta el harness y mide la
diferencia" (Módulo 1, AI4Devs). Se trabaja sobre un fork propio, en la
rama `s1/start`, con entrega por pull request contra el repo del curso
— ver `README.md` para el enunciado completo.

## Reglas de proceso (qué no hacer)

- **No toques `backend/` en este ejercicio.** El backend ya existe y
  está resuelto; la tarea es de frontend. Si necesitas saber cómo
  responde un endpoint o qué exige un validador, léelo — no lo edites.
- **No edites `database/schema.ts` a mano** ni ninguna tabla existente
  sin pasar por una migration nueva (detalle en `AGENTS.md`).
- **No reestructures `prompts.md` ni `README.md`.** `prompts.md` es la
  plantilla de entrega (se rellena, no se reescribe su formato);
  `README.md` es el enunciado tal cual lo dio el curso.
- **No hagas `git push` contra `upstream`.** Solo contra `origin` (tu
  fork) — el pull request se abre desde ahí contra el repo del curso,
  nunca empujando directo a upstream.
- **No guíes a mano la copia "sin harness"** si en algún momento
  convive con este repo durante el ejercicio de comparación — es la
  copia de control, y guiarla anula la comparación.
- **No saltees ni desactives el hook de lint/test** (`.claude/settings.json` →
  `.claude/hooks/lint-test.sh`) para que un cambio "pase". Si falla,
  arregla el motivo, no el aviso.
