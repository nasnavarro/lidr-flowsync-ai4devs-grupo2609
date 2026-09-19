#!/usr/bin/env bash
# PostToolUse hook: tras editar un archivo, si cae dentro de frontend/,
# lo pasa por Prettier. Solo formatea — nunca bloquea el turno (exit 0 siempre).
set -euo pipefail

FRONTEND_DIR="${CLAUDE_PROJECT_DIR}/frontend"

input="$(cat)"

file_path="$(node -e '
  let data = "";
  process.stdin.on("data", c => data += c);
  process.stdin.on("end", () => {
    try {
      const j = JSON.parse(data);
      const p = j.tool_input && (j.tool_input.file_path || j.tool_input.path);
      process.stdout.write(p || "");
    } catch (e) {
      process.exit(0);
    }
  });
' <<< "$input")"

# Sin path, o path fuera de frontend/, o sin frontend/ instalado: no hacer nada.
if [ -z "$file_path" ] || [ ! -d "$FRONTEND_DIR" ]; then
  exit 0
fi

case "$file_path" in
  "$FRONTEND_DIR"/*) ;;
  *) exit 0 ;;
esac

if [ ! -f "$file_path" ]; then
  exit 0
fi

(cd "$FRONTEND_DIR" && npx --no-install prettier --write "$file_path") > /dev/null 2>&1 || true

exit 0
