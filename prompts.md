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
Quiero que leas el jira FLOW-1 y que lo resuelvas dentro de este proyecto.
```

**Qué salió:** Me dice que la cuenta de jira conectada no tiene esos tickets. Ha cogido mi cuenta de empresa en lugar de la que creé.

## Prompt 2

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Te paso el titulo y descripción del jira directamente para que generes el plan: Crear en el frontend login y registro de usuario - Necesito crear un login donde el username sea el nif y la contraseña de al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial. Que no permita que un usuario esté logueado 2 veces en distintas sesiones. Que pueda regenerar la contraseña.
```

**Qué salió:** Me ha generado un plan

## Prompt 3

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Guárdame el plan del proyecto que has creado en un archivo md para revisarlo tranquilamente
```

**Qué salió:** Me ha generado el archivo en docs/plan-flow-1-sin-harness.md