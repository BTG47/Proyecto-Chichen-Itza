# Issue tracker: GitHub

Los issues y specs de este repo viven como issues de GitHub. Usa la CLI `gh` para todas las operaciones. Escribe títulos y cuerpos de issues en español.

## Convenciones

- **Crear un issue**: `gh issue create --title "..." --body "..."`. Usa un heredoc para cuerpos de varias líneas.
- **Leer un issue**: `gh issue view <número> --json number,title,body,labels,comments`.
- **Listar issues**: `gh issue list --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'` con los filtros `--label` y `--state` que correspondan.
- **Hacer un issue sub-issue de un padre**: `gh issue create --parent <padre> ...`, o `gh issue edit <padre> --add-sub-issue <hijo>` después (`gh` 2.94+). Con `gh` más antiguo: `gh api --method POST repos/<owner>/<repo>/issues/<padre>/sub_issues -F sub_issue_id=<id-db-del-hijo>` (id de base de datos, como en **Bloqueos** abajo). Sin sub-issues, pon `Parte de #<padre>` al inicio del cuerpo del hijo.
- **Comentar un issue**: `gh issue comment <número> --body "..."`
- **Aplicar / quitar etiquetas**: `gh issue edit <número> --add-label "..."` / `--remove-label "..."`
- **Cerrar**: `gh issue close <número> --comment "..."`

El repo se infiere de `git remote -v`; `gh` lo hace automáticamente dentro de un clon.

## Trabajar un ticket

Cada ticket se implementa en su propia rama `bruno/feature/<nombre_de_la_rama>` (en `snake_case`), con todos sus commits ahí, y se termina abriendo un PR hacia `main` que explique los cambios e incluya `Closes #<número>`. El detalle está en la sección **Flujo de trabajo por ticket** de `AGENTS.md`. No se hace merge del PR; lo revisa y fusiona Bruno.

## Pull requests como superficie de triage

**PRs como superficie de solicitudes: no.** _(Cámbialo a `sí` si este repo trata los PRs externos como solicitudes de funcionalidad; `/triage` lee esta opción.)_

Cuando está en `sí`, los PRs pasan por las mismas etiquetas y estados que los issues, usando los equivalentes de `gh pr`:

- **Leer un PR**: `gh pr view <número> --comments` y `gh pr diff <número>` para el diff.
- **Listar PRs externos para triage**: `gh api --paginate 'repos/{owner}/{repo}/pulls?state=open' --jq '.[] | select(.author_association | IN("OWNER","MEMBER","COLLABORATOR") | not) | {number, title, author: .user.login, author_association, labels: [.labels[].name]}'`.
- **Comentar / etiquetar / cerrar**: `gh pr comment`, `gh pr edit --add-label`/`--remove-label`, `gh pr close`.

GitHub comparte una sola numeración entre issues y PRs, así que un `#42` puede ser cualquiera de los dos: resuélvelo con `gh pr view 42` y, si falla, `gh issue view 42`.

## Cuando un skill diga "publicar en el issue tracker"

Crea un issue de GitHub.

## Cuando un skill diga "obtener el ticket relevante"

Léelo como en **Leer un issue** arriba.

## Operaciones de wayfinding

Las usa `/wayfinder`. El **mapa** es un único issue con issues **hijos** como tickets.

- **Mapa**: un único issue con la etiqueta `wayfinder:map`, cuyo cuerpo contiene Notas / Decisiones hasta ahora / Niebla. `gh issue create --label wayfinder:map`.
- **Ticket hijo**: un issue vinculado al mapa como sub-issue de GitHub (ver **Hacer un issue sub-issue de un padre**). Donde no haya sub-issues, agrega el hijo a una lista de tareas en el cuerpo del mapa y pon `Parte de #<mapa>` al inicio del cuerpo del hijo. Etiquetas: `wayfinder:<tipo>` (`research`/`prototype`/`grilling`/`task`). Una vez reclamado, el ticket se asigna al dev que lo trabaja.
- **Bloqueos**: las **dependencias nativas de issues** de GitHub, la representación canónica y visible en la UI. Agrega una arista con `gh api --method POST repos/<owner>/<repo>/issues/<hijo>/dependencies/blocked_by -F issue_id=<id-db-del-bloqueador>`, donde `<id-db-del-bloqueador>` es el **id de base de datos** numérico del bloqueador (`gh api repos/<owner>/<repo>/issues/<n> --jq .id`, _no_ el `#número` ni el `node_id`). GitHub reporta `issue_dependencies_summary.blocked_by` (solo bloqueadores abiertos, la condición vigente). Donde no haya dependencias, usa una línea `Bloqueado por: #<n>, #<n>` al inicio del cuerpo del hijo. Un ticket está desbloqueado cuando todos sus bloqueadores están cerrados.
- **Consulta de frontera**: lista los hijos abiertos del mapa (`gh issue list --state open`, limitado a los sub-issues / lista de tareas del mapa), descarta los que tengan un bloqueador abierto (`issue_dependencies_summary.blocked_by > 0`, o un issue abierto en la línea `Bloqueado por`) o un asignado; gana el primero en el orden del mapa.
- **Reclamar**: `gh issue edit <n> --add-assignee @me`, la primera escritura de la sesión.
- **Resolver**: `gh issue comment <n> --body "<respuesta>"`, luego `gh issue close <n>`, y después agrega un puntero de contexto (resumen + enlace) a Decisiones hasta ahora del mapa.
