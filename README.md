# Chichén Itzá Virtual

Prototipo de interfaz de un sistema de recorridos virtuales por Chichén Itzá (Sistemas Distribuidos, UDLAP). Sitio estático **solo HTML y CSS**, sin JavaScript, servidor ni dependencias ([ADR-0001](docs/adr/0001-solo-html-y-css.md)).

## Abrirlo

No hay nada que instalar ni compilar.

1. Descarga o clona el repositorio.
2. Abre `index.html` en el navegador (doble clic, o arrástralo a una ventana).

Funciona directamente con `file://`. Si prefieres un servidor local:

```bash
python3 -m http.server 8000   # y abre http://localhost:8000
```

Probado en Chromium 153. Usa el selector `:has()`, así que necesita un navegador que lo soporte (desde Chrome/Edge 105, Firefox 121 y Safari 15.4); en esos otros navegadores no se ha probado.

## Recorrido sugerido

| Paso | Página | Qué muestra |
|---|---|---|
| 1 | `index.html` | Inicio público y recorridos disponibles |
| 2 | `recorridos.html` | Catálogo con filtros y ficha de cada recorrido |
| 3 | `login.html` → «Ingresar» | Sesión simulada como Ana López Martínez |
| 4 | `dashboard.html` | Panel de la participante: avatar, visita en curso, recorridos |
| 5 | «Continuar visita» → `recorrido.html` | Visita en curso: camino de zonas, guía, actividad y grupo |
| 6 | Pie → «Administración (demo)» | CRUD de participantes, avatares, roles y zonas (`admin/`) |

Los datos son de ejemplo y nada se guarda. Qué es real y qué es simulado: [`docs/funcionalidades.md`](docs/funcionalidades.md).

## Estructura

| Ruta | Contenido |
|---|---|
| `*.html` (raíz) | Páginas públicas, panel del participante y visita |
| `admin/` | Administración (CRUD) |
| `css/` | `tokens.css` (variables), `base.css`, `componentes.css` y un archivo por área |
| `img/apariencias/` | Ilustraciones SVG de los avatares |
| `docs/` | Decisiones, ADR, matriz de cobertura, pruebas y evidencias |
| `persona_1/`, `persona_2/`, `persona_3/` | Diseños originales del equipo (solo referencia) |
| `prototipos/recorrido/` | Prototipos desechables de la visita (D3, D33) |

## Pruebas y evidencias

- Resultados T01–T12 e incidencias: [`docs/pruebas.md`](docs/pruebas.md), con las órdenes para repetirlas.
- Capturas de las pantallas principales: `docs/evidencia/capturas/`.
- Estado por requisito: [`docs/matriz-cobertura.md`](docs/matriz-cobertura.md).
