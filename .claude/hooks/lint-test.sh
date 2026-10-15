#!/usr/bin/env bash
# Hook PostToolUse (Edit|Write|MultiEdit) de este repo: tras cada edición,
# corre el lint (y los tests, si el subproyecto los tiene) del subproyecto
# correspondiente (backend o frontend), detectado por la ruta del archivo
# editado. Recibe el JSON del hook por stdin (tool_input.file_path).
#
# Usa $CLAUDE_PROJECT_DIR (la raíz de este repo) en vez de una ruta
# absoluta, para que funcione igual en cualquier clon/fork y equipo.

set -uo pipefail

root="${CLAUDE_PROJECT_DIR:-$(pwd)}"

file_path="$(cat | jq -r '.tool_input.file_path // empty' 2>/dev/null)"
[ -z "$file_path" ] && exit 0

case "$file_path" in
  "$root"/backend/*) subdir="backend" ;;
  "$root"/frontend/*) subdir="frontend" ;;
  *) exit 0 ;;
esac

case "$file_path" in
  */node_modules/*|*/.adonisjs/*|*/tmp/*|*/build/*|*/dist/*) exit 0 ;;
esac

cd "$root/$subdir" || exit 0

status=0

echo "=== npm run lint ($subdir) ==="
npm run lint || status=1

if jq -e '.scripts.test' package.json >/dev/null 2>&1; then
  echo "=== npm test ($subdir) ==="
  npm test || status=1
fi

if [ "$status" != "0" ]; then
  exit 2
fi
exit 0
