#!/usr/bin/env bash
# UserPromptSubmit hook: auto-registra cada prompt en prompts.md tal cual llega.
# Solo observa — nunca bloquea el turno (siempre exit 0), nunca modifica el prompt.
set -euo pipefail

PROMPTS_FILE="${CLAUDE_PROJECT_DIR}/prompts.md"
MODEL_DEFAULT="Sonnet 5"
TOOL_DEFAULT="Claude Code"

input="$(cat)"

prompt_text="$(node -e '
  let data = "";
  process.stdin.on("data", c => data += c);
  process.stdin.on("end", () => {
    try {
      const j = JSON.parse(data);
      let p = j.prompt || "";
      // Quita bloques de contexto que Claude Code inyecta solo (no lo tecleó
      // el usuario): ide_opened_file, ide_selection, system-reminder, etc.
      // "tal cual lo lanzaste" es tal cual TU lo escribiste, no lo que el
      // cliente añade por su cuenta.
      p = p.replace(/<(ide_opened_file|ide_selection|ide_diagnostics|system-reminder)>[\s\S]*?<\/\1>\n?/g, "");
      process.stdout.write(p.trim());
    } catch (e) {
      process.exit(0);
    }
  });
' <<< "$input")"

# Sin prompt (input inesperado) o sin prompts.md en este proyecto: no hacer nada.
if [ -z "$prompt_text" ] || [ ! -f "$PROMPTS_FILE" ]; then
  exit 0
fi

count=$(grep -c '^## Prompt ' "$PROMPTS_FILE" 2>/dev/null) || count=0
next_n=$((count + 1))

{
  echo ""
  echo "## Prompt ${next_n}"
  echo ""
  echo "**Modelo:** ${MODEL_DEFAULT}"
  echo "**Herramienta:** ${TOOL_DEFAULT}"
  echo ""
  echo '```'
  printf '%s\n' "$prompt_text"
  echo '```'
  echo ""
  echo "**Qué salió:** _(completar)_"
} >> "$PROMPTS_FILE"

exit 0
