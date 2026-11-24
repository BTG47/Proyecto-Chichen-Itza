# AGENTS.md

## Agent skills

### Issue tracker

Los issues viven en GitHub Issues de este repo (vía `gh` CLI). Ver `docs/agents/issue-tracker.md`.

### Triage labels

Etiquetas canónicas por defecto (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). Ver `docs/agents/triage-labels.md`.

### Domain docs

Contexto único: un `GLOSSARY.md` + `docs/adr/` en la raíz. Ver `docs/agents/domain.md`.

### Convenciones del proyecto

- **Solo HTML y CSS, sin JavaScript** ([ADR-0001](docs/adr/0001-solo-html-y-css.md)). Consecuencia: no hay fragmentos compartidos; encabezados, menús y pies **se repiten en cada HTML**. Al cambiar uno, replica el cambio en todas las páginas que lo usan y mantén ese marcado mínimo; el aspecto vive en el CSS compartido.
- **Archivos separables y de tamaño razonable**: una página por archivo; nada de condensar varias páginas en un `index.html`.
- **CSS**: `css/tokens.css` (variables), `css/base.css`, `css/componentes.css` y un archivo por área (`publico`, `panel`, `admin`, `recorrido`).
- **`persona_1/`, `persona_2/`, `persona_3/` son fuentes de referencia**: no se editan.
- Decisiones de diseño en `docs/decisiones-pendientes.md`; vocabulario en `GLOSSARY.md`.

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

### Revisión tras merges con conflictos

Resolver conflictos en CSS ya rompió `main` dos veces sin que se notara: se perdieron llaves de cierre y el navegador descartó secciones enteras (tokens, apariencias, zonas). Después de **cualquier** merge o resolución de conflictos, y antes de abrir un PR, ejecuta:

```bash
for f in css/*.css; do python3 -I -c "
import sys,re
s=re.sub(r'/\*.*?\*/','',open(sys.argv[1]).read(),flags=re.S)
d=s.count('{')-s.count('}')
print(sys.argv[1], 'OK' if d==0 else f'{d:+d} llaves sin cerrar')" "$f"; done
git grep -nE '^(<<<<<<<|=======|>>>>>>>)' -- '*.html' '*.css'
```

Todo debe salir `OK` y la segunda orden no debe imprimir nada. Si una llave falta, compara la sección afectada con la versión original de cada rama (`git show <commit>:css/<archivo>`) para confirmar que no se perdió nada más.

Al trabajar en paralelo con agentes, cada uno añade su CSS al final de los archivos compartidos en una sección `/* ---------- Ticket #N … */`; el conflicto se resuelve conservando ambas secciones completas. Nunca reescribas historia publicada (`push --force`).
