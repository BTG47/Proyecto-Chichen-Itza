# AGENTS.md

## Agent skills

### Issue tracker

Los issues viven en GitHub Issues de este repo (vía `gh` CLI). Ver `docs/agents/issue-tracker.md`.

### Triage labels

Etiquetas canónicas por defecto (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). Ver `docs/agents/triage-labels.md`.

### Domain docs

Contexto único: un `GLOSSARY.md` + `docs/adr/` en la raíz. Ver `docs/agents/domain.md`.

### Flujo de trabajo por ticket

Cada ticket (issue) se trabaja en su propia rama y se cierra con un PR:

1. **Crear la rama** desde la rama principal actualizada, con la nomenclatura `bruno/feature/<nombre_de_la_rama>`, donde `<nombre_de_la_rama>` es un nombre corto y descriptivo del ticket en `snake_case` (ej. `bruno/feature/mapa_interactivo`).
   ```bash
   git switch main && git pull
   git switch -c bruno/feature/<nombre_de_la_rama>
   ```
2. **Hacer todos los commits** del ticket en esa rama: commits pequeños y con mensajes claros en español. Nunca trabajar directamente sobre `main`.
3. **Terminar el ticket** subiendo la rama y abriendo un PR hacia `main` que explique los cambios:
   ```bash
   git push -u origin bruno/feature/<nombre_de_la_rama>
   gh pr create --base main --title "<título del ticket>" --body "<descripción>"
   ```
   El cuerpo del PR, en español, incluye: resumen de qué se cambió y por qué, lista de cambios principales, cómo probarlo y `Closes #<número>` para vincular y cerrar el issue al hacer merge.
4. **No hacer merge** del PR: lo revisa y lo fusiona Bruno.

Un ticket = una rama = un PR.
