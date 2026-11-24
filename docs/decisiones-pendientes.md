# Decisiones de diseño

Cada decisión registra contexto, resolución y fecha. Las difíciles de revertir y no evidentes se promueven a un ADR en `docs/adr/`. Vocabulario en `GLOSSARY.md`.

## Resueltas (2026-11-23)

| # | Decisión | Resolución |
|---|---|---|
| D1 | Sistema visual común | Un solo sistema basado en la paleta y componentes de P1/P2 (crema, jade, naranja). Títulos en Georgia, cuerpo en fuente del sistema. Los SVG de P3 se conservan con colores adaptados. Más adelante se probarán variantes cambiando valores CSS |
| D2 | Datos demo canónicos | Historia de P2: Ana López Martínez (avatar Balam, Visitante) y Carlos KarKerKar (avatar Kan, Guía; antes «Jaguar», ver D30). Visita en curso del recorrido «El Castillo y la Gran Plaza», grupal, guía Carlos KarKerKar, 6 participantes. Zonas: Gran Plaza, El Castillo, Plataforma de Venus, Juego de Pelota. Zona actual Juego de Pelota, 2 de 4, 50 %. P3 se ajusta (María, Juan y Carla quedan como compañeros de visita). Grafía «Kukulcán». **Carlos Ek se renombra a Carlos KarKerKar** |
| D5 | CRUD de zonas | Se agrega `admin/zonas.html` con el patrón de P1 |
| D6 | Interactividad | **Solo HTML y CSS, sin JavaScript.** Acciones mediante anclas y paneles como en P1 |
| D7 | Leyenda de marcadores de P2 | No existe; P2 entregó solo imágenes. Los marcadores se interpretan por su contenido |
| D8 | `index.html` de P1 | Se descarta; `index.html` será la página de inicio de P2 |
| D9 | Campos fuera del UML | Se conservan en la UI y se documentan como «campo de interfaz». Posición y estado del avatar se presentan como datos de la participación de la visita activa |
| D10 | `Avatar.apariencia` | Se agrega «Apariencia» al formulario y tabla de avatares (jaguar de jade, quetzal, serpiente emplumada) |
| D11 | Estructura de archivos | Sitio único en la raíz: páginas públicas en raíz, `admin/` para CRUD, `css/` (base, público, admin, recorrido), `img/` para SVG. `persona_N/` se conservan intactas como referencia |
| D12 | Rol «Participante» | Se renombra el rol a **Visitante**; «Participante» queda solo para la entidad persona |
| D13 | Recorrido vs. visita | En la UI, «Recorrido» = catálogo (`RecorridoVirtual`) y «Visita» = `SesionRecorrido`. El dashboard muestra «Visita en curso», «Recorridos disponibles» y «Visitas programadas» |
| D14 | Nombre del rol de guía | En la UI se usa **Guía**; `GuiaTurista` solo como nombre de clase UML |
| D3 | Diseño de la visita (`recorrido.html`) | Antes de implementarla se hacen 2–3 prototipos desechables en `prototipos/recorrido/` (mapa protagonista, ruta/línea de tiempo, escena inmersiva tipo juego), solo HTML/CSS y con los datos de D2. Se elige o combina y después se implementa. P3 sirve de base y fuente de SVG |
| D4a | Acceso a la administración | Enlace «Administración» en el pie del inicio y del dashboard, marcado como demostración. La administración es herramienta de la agencia, fuera del modelo de roles de avatares; no se modifica el UML |
| D4b | Páginas sin diseño | Se cubren sin abultar archivos: preferir archivos separados y de tamaño razonable a un `index.html` que condense varias páginas (ver D19) |
| D15 | Interactividad sin JS | Permitidos `:target`, radios/checkbox ocultos con `<label>`, `<details>`, `:hover`/`:focus`/`:has()`, transiciones y animaciones CSS (respetando `prefers-reduced-motion`). Ningún estado persiste entre páginas |
| D16 | Selector de apariencia | «Cambiar apariencia» abre un selector de 3–4 ilustraciones SVG propias (jaguar de jade, quetzal, serpiente emplumada…) con radios ocultos y vista previa CSS. Las mismas ilustraciones se reutilizan en admin, panel de participantes y visita |
| D17 | Responsive | Diseño móvil propio: sidebar → barra superior/desplegable, tarjetas apiladas, tablas con scroll, login sin ilustración. Verificar a 375, 768 y 1280 px |
| D18 | Tokens de diseño | Colores, tipografías, radios y sombras en `css/tokens.css`; las variantes de diseño se prueban cambiando ese archivo o una clase de tema |
| D19 | Tamaño de archivos | Código separable y fácil de cambiar; evitar archivos excesivamente grandes, aunque las páginas no estén pedidas expresamente en la consigna |

| D20 | Páginas separadas | Públicas: `index.html`, `recorridos.html`, `como-funciona.html`, `acerca.html`, `login.html`, `registro.html`. Panel: `dashboard.html`, `mi-avatar.html`, `mi-perfil.html`. Visita: `recorrido.html`. Encabezados y menús se repiten en cada HTML (limitación documentada en ADR-0001) |
| D21 | División del CSS | `tokens.css`, `base.css`, `componentes.css` en todas las páginas + uno por área: `publico.css`, `panel.css`, `admin.css`, `recorrido.css`. `acceso.css` es el área de login y registro (pantallas sin menú ni pie del sitio) |
| D22 | «Ver detalle» | En `recorridos.html`, ficha por recorrido con `:target`: descripción, modalidad, duración, zonas (marcando restringidas) y «Regístrate para visitarlo» |
| D23 | «Mostrar» contraseña | Se quita del login; diferencia con el diseño de P2 por ADR-0001 |
| D24 | Error de confirmación de contraseña | Validación nativa (`required`, `type=email`, `minlength=8`) + estado de error de ejemplo en `registro.html#error`, documentado como SIMULADO |
| D25 | Destino de login/registro | Ambos envían a `dashboard.html` como Ana (sesión SIMULADA); «Cerrar sesión» vuelve a `index.html` |
| D27 | Permisos de zona de ejemplo | Corrige la contradicción de P1 (Ana, Visitante, estaba en Juego de Pelota sin acceso). **Visitante**: todas las zonas de los recorridos abiertos. **Guía**: lo anterior + zonas del Grupo de las Mil Columnas. Las páginas de `admin/` usan estos datos, no los de `persona_1/` |
| D28 | Catálogo de zonas (12) | El Castillo y la Gran Plaza: Gran Plaza, El Castillo, Plataforma de Venus, Juego de Pelota. Cenote Sagrado: Sacbé ceremonial, Cenote Sagrado. El Caracol y Las Monjas: El Caracol, Las Monjas, La Iglesia. Grupo de las Mil Columnas (solo Guía): Templo de los Guerreros, Grupo de las Mil Columnas, Mercado. Cada zona con descripción histórica breve |
| D29 | Zona bloqueada en la visita | El mapa de la visita muestra zonas vecinas fuera del recorrido; el Grupo de las Mil Columnas aparece junto a la Gran Plaza con candado y «Requiere rol Guía»; su ficha se consulta pero sin acción de entrar |
| D30 | Participantes de la visita (6) | Ana López Martínez (Visitante, Juego de Pelota), Carlos KarKerKar (Guía), María López, Juan Ramírez, Carla Pérez y **Jose Jose** (Plataforma de Venus). Cada uno con una apariencia de D16 y zona actual propia. El nombre del avatar corresponde a su apariencia: **Balam** (jaguar) → jaguar de jade; **Kan** (serpiente) → serpiente emplumada; **Ixchel** → quetzal; **Muan** (búho) → búho; **Itzel** → jaguar de jade; **Kuk** (quetzal) → quetzal. Carlos deja el nombre «Jaguar» de P2 para no contradecir su apariencia ni repetir el jaguar de Ana. Avatar libre: **Itzamná** (Visitante). Todos los tickets usan esta tabla |
| D31 | Datos de Mil Columnas | Recorrido «Grupo de las Mil Columnas»: grupal con guía, 40 min, 3 zonas, solo rol Guía (dato de demostración) |
| D32 | Colores de apariencias | Los SVG de `img/apariencias/` se cargan con `<img>` (un `<use>` externo no funciona con `file://`), así que copian los colores de `tokens.css`: al cambiar la paleta hay que editarlos a mano. Aceptado |
| D33 | Diseño de la visita (resuelve D3) | Se elige la **variante E v4** de `prototipos/recorrido/e-camino.html` («camino de zonas»): camino vertical de zonas tipo Duolingo como pieza principal, ficha de zona como bocadillo compacto anclado al nodo, voz del guía como bloque protagonista fijo al desplazarse (arriba / esquina / minimizado con radios, alternativa solo-CSS a arrastrar), panel derecho «Actividad» (Acciones del grupo + saludos predeterminados) y «Grupo», barra inferior de zona actual con progreso y tiempo, y «Vista general» esquemática estilo P3 con Mil Columnas junto a la Gran Plaza (D29). **Motivos**: escala sin arte por zona (añadir una zona = un bloque de marcado + ícono), menos saturación, el guía es lo primero que se lee, datos alineados con el UML (`calcularProgreso()`, `fechaInicio`, `Accion`, `Conexion`). La reputación del guía no está en el UML; se muestra como campo de interfaz porque la consigna pide «gráficos de reputación». **Descartadas**: A (mapa ilustrado: geografía hecha a mano, poco escalable), B (ruta: zona actual fuera de vista, poco inmersiva), C (escena: una ilustración por zona, pesada con mucha gente), D (combinación: mismo costo de arte que A y C). Mejoras pendientes para #10 en su issue |
| D26 | ADRs | ADR-0001 (solo HTML y CSS) y ADR-0002 (administración fuera del modelo de roles) |

## Fuera de alcance por ahora

- **`admin/recorridos.html`** (CRUD del catálogo de recorridos y sus zonas). Se retomará si hay tiempo.
