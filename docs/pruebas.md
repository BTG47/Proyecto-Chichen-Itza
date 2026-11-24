# Pruebas T01–T12 (ticket #11)

**Fecha de ejecución:** 2026-11-24 · **Rama:** `bruno/feature/integracion_pruebas` · **Navegador:** Chromium 153 sin interfaz (Playwright), páginas abiertas con `file://`.

Resultados: **APROBADA**, **FALLA** o **PENDIENTE** (no ejecutada). Una prueba no ejecutada nunca se marca como aprobada (plan §10).

## Cómo repetirlas

Desde la raíz del repositorio:

```bash
# Enlaces, anclas y recursos locales; lista enlaces externos (T01, T08, T11)
python3 -I docs/evidencia/revisar_enlaces.py

# Navegador: desbordamiento a 375/768/1280 px, imágenes, labels, encabezados,
# recorrido con Tab y capturas (T05, T08, T09, T10, T12).
# playwright-core se instala fuera del proyecto; no es dependencia del sitio.
npm i --prefix /tmp/pw playwright-core && npx --prefix /tmp/pw playwright-core install chromium
NODE_PATH=/tmp/pw/node_modules node docs/evidencia/pruebas_navegador.cjs
```

El segundo script escribe las capturas en `docs/evidencia/capturas/` y las mediciones en `docs/evidencia/resultados.json`. Si ya hay un Chromium descargado, se puede usar con `CHROME=/ruta/al/chrome`.

Lo que necesita juicio (coincidencia con el diseño, coherencia de datos, mensajes engañosos) se revisó a mano sobre las capturas y el código; cada fila dice cómo.

## Resultados

| ID | Prueba | Resultado | Evidencia |
|---|---|---|---|
| T01 | Abrir inicio, login, registro y dashboard | **APROBADA** | `revisar_enlaces.py`: 14 páginas, 646 referencias (`href`/`src` y anclas `#id`), 0 problemas. Sin errores de página ni recursos fallidos en el navegador. Capturas 01, 06, 07, 09 |
| T02 | Navegar a los tres módulos administrativos | **APROBADA** | `admin/participantes.html`, `avatares.html` y `roles.html` (más `zonas.html`, D5) existen y se enlazan entre sí y desde el pie «Administración (demo)». Siguen el patrón de `persona_1/` (tabla + panel lateral con `:target`). Diferencias con P1, todas documentadas: nombre y correo en una columna «Participante»; rol del participante derivado del avatar; posición y estado agrupados en «Participación» (D9); columna y campo «Apariencia» (D10); datos de D27/D30 en lugar de los de P1. Capturas 16, 20, 22, 24 |
| T03 | Revisar los formularios CRUD | **APROBADA** | Alta, ver, editar y eliminar abren su panel en los cuatro módulos; campos con label y obligatorios marcados con `*`; las bajas bloqueadas explican el motivo; los campos fuera del UML se marcan «campo de interfaz» o explican de dónde vienen (la posición del avatar viene de la participación). Capturas 17, 18, 19, 21, 23, 25 |
| T04 | Abrir un recorrido desde el dashboard/catálogo | **FALLA** | «Continuar visita» abre `recorrido.html#zona-actual` con el recorrido «El Castillo y la Gran Plaza» y la misma zona, progreso y participantes que el dashboard (correcto). Pero **«Iniciar visita» (Cenote Sagrado) y «Unirme» (El Caracol y Las Monjas) también llevan a `recorrido.html`**, que muestra la visita de El Castillo: se confunden recorridos. Ver I-02 |
| T05 | Visualizar zona actual, avatar, participantes y guía | **APROBADA** | Zona actual (nodo «Estás aquí» y barra inferior), avatar propio Balam sobre el nodo, 6 participantes en «Grupo» y en los nodos («3 aquí», «1 aquí»), guía Kan / Carlos KarKerKar con reputación. Capturas 12 (tres anchos) y 13 |
| T06 | Revisar progreso y estadísticas | **APROBADA** | Coinciden en dashboard, visita y `admin/avatares.html`: Juego de Pelota, zona 4 de 4, 2 de 4 visitadas, 50 %, 6 participantes, inicio 17:20. Las zonas de cada participante coinciden con la tabla de D30 (Muan en Gran Plaza, Ixchel en El Castillo, Kuk en Plataforma de Venus; Ana, Kan e Itzel en Juego de Pelota). Sin restos de los datos de P3 («3 de 8», «12 en línea», «Carlos Ek») |
| T07 | Probar restricciones visuales por rol | **FALLA** | Visita: Mil Columnas con candado y «Requiere rol Guía»; su ficha se consulta sin acción de entrar (D29, captura 14). Dashboard: «Acceso restringido» sin botón. Pero en el catálogo la ficha de Mil Columnas, aunque marca sus zonas como restringidas, ofrece «Regístrate para visitarlo», y un registro nuevo recibe el rol Visitante, que no puede entrar: acceso engañoso. Ver I-03 |
| T08 | Revisar CSS y recursos en varias páginas | **APROBADA** | 0 imágenes rotas y 0 recursos fallidos en las 14 páginas × 3 anchos. Llaves de los 9 CSS balanceadas; sin marcadores de conflicto. Revisión visual de las 31 capturas: texto legible, sin estilos de P1/P2/P3 mezclados |
| T09 | Probar diseño en móvil y escritorio | **APROBADA** | 0 px de desbordamiento horizontal en las 14 páginas a 375, 768 y 1280 px. Las tablas de administración se desplazan dentro de su contenedor (D17). En cada ancho, todo elemento que recibe el foco con Tab ocupa espacio en pantalla (ningún control inalcanzable u oculto). Se corrigió I-01 (ficha tapada por el guía en escritorio). Capturas `*-375.png`, `12-…-768.png` |
| T10 | Probar navegación por teclado y formularios | **APROBADA** | Recorrido con Tab en las 14 páginas a 375, 768 y 1280 px (7 a 57 elementos): todos cambian de aspecto al recibir el foco (se compara con el mismo elemento sin foco, incluido su `<label>` y la tarjeta que lo contiene). Control negativo: al quitar contornos y sombras del sitio, el detector marca 14 de 14 elementos del dashboard. A 375 px el menú plegado se abre con Tab + Espacio y sus enlaces reciben el foco. 0 campos sin label. Un solo `<h1>` por página y sin saltos de nivel de encabezado. Todas las páginas empiezan con un enlace para saltar al contenido («Saltar al camino de zonas» en la visita) |
| T11 | Auditar dependencias y alcance | **APROBADA** | 0 enlaces o recursos externos, 0 `<script>`, 0 `@import`, sin fuentes web. Sitio estático abrible con `file://`. Las herramientas de prueba (Python estándar y `playwright-core`) viven en `docs/evidencia/` y no las carga ninguna página |
| T12 | Verificar salida documental | **APROBADA** | Capturas en `docs/evidencia/capturas/` (índice abajo), resultados en este archivo y en `resultados.json`, funcionalidades clasificadas en `docs/funcionalidades.md`, matriz en `docs/matriz-cobertura.md`, instrucciones en `README.md` |

## Incidencias

| ID | Prueba | Descripción | Estado |
|---|---|---|---|
| I-01 | T09 | En escritorio (≥ 77rem), al abrir las fichas de Mil Columnas, Gran Plaza o El Castillo, el título quedaba detrás del guía fijo: el `scroll-margin-top` de 8rem era menor que la altura del guía (~11rem) | **Corregida** en `css/recorrido-camino.css` (13rem en la columna de fichas). Evidencia: captura 14. También se midió a 1500 y 1920 px con una prueba puntual que no forma parte del script |
| I-02 | T04 | «Iniciar visita» de Cenote Sagrado y «Unirme» de El Caracol y Las Monjas (`dashboard.html`) abren la visita de El Castillo y la Gran Plaza | **Abierta.** Decisión de diseño pendiente: quitar esos enlaces, marcarlos como demostración que abre la única visita implementada o crear la visita de esos recorridos |
| I-03 | T07 | La ficha de Mil Columnas en `recorridos.html` ofrece «Regístrate para visitarlo», pero registrarse da el rol Visitante, que no puede entrar. Viene de D22, que pide ese botón en todas las fichas | **Abierta.** Cambiar el texto en las fichas restringidas (p. ej. «Solo para guías») o quitar el botón; requiere ajustar D22 |
| — | — | Con `prefers-reduced-motion`, las tarjetas del dashboard conservan el retraso de su animación de entrada (hasta 160 ms) aunque la animación dure 0 | Observación, sin efecto visible. Explica por qué el script espera las animaciones antes de capturar |

## Capturas

`docs/evidencia/capturas/<nombre>-<ancho>.png`. Las de la visita y los paneles con `#` son de la ventana visible (alto 900 px, 812 en móvil); el resto, de página completa.

| Captura | Pantalla | Anchos |
|---|---|---|
| 01-inicio | `index.html` | 1280, 375 |
| 02-recorridos | `recorridos.html` | 1280 |
| 03-recorridos-detalle | `recorridos.html#castillo-gran-plaza` | 1280 |
| 04-como-funciona | `como-funciona.html` | 1280 |
| 05-acerca | `acerca.html` | 1280 |
| 06-login | `login.html` | 1280, 375 |
| 07-registro | `registro.html` | 1280 |
| 08-registro-error-simulado | `registro.html#error` (SIMULADO, D24) | 1280 |
| 09-dashboard | `dashboard.html` | 1280, 375 |
| 10-mi-avatar | `mi-avatar.html` | 1280 |
| 11-mi-perfil | `mi-perfil.html` | 1280 |
| 12-visita-zona-actual | `recorrido.html#zona-actual` | 1280, 768, 375 |
| 13-visita-ficha-pelota | `recorrido.html#ficha-pelota` | 1280 |
| 14-visita-zona-bloqueada | `recorrido.html#ficha-columnas` | 1280 |
| 15-visita-vista-general | `recorrido.html` tras pulsar «Vista general» | 1280 |
| 16-admin-participantes | `admin/participantes.html` | 1280, 375 |
| 17 / 18 / 19 | Participantes: `#nuevo`, `#ver-p-01`, `#eliminar-p-01` | 1280 |
| 20 / 21 | Avatares y `#nuevo` | 1280 |
| 22 / 23 | Roles y `#nuevo` | 1280 |
| 24 / 25 | Zonas y `#nuevo` | 1280 |
