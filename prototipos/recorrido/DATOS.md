# PROTOTIPO · Datos comunes de la visita

Prototipos desechables del ticket #9 (D3). **Pregunta que responden:** ¿cómo debe verse e interactuarse la pantalla de la visita (`recorrido.html`) para que sea creativa, clara y solo HTML/CSS? Los tres variantes usan exactamente estos datos; ninguno es código de producción.

## Visita en curso

- Recorrido: **El Castillo y la Gran Plaza** · grupal con guía · 45 min · inicio 17:20 · tiempo transcurrido **22 min**.
- Servidor: Región Sureste · estado: Conectada.
- Ruta (orden del catálogo, D28), recorrido libre:
  1. **Gran Plaza** — visitada
  2. **El Castillo** — visitada
  3. **Plataforma de Venus** — pendiente
  4. **Juego de Pelota** — **zona actual de Ana**
- Progreso de Ana: **2 de 4 zonas visitadas · 50 %** (la actual cuenta al terminarla).
- Zona vecina fuera del recorrido (D29): **Grupo de las Mil Columnas**, junto a la Gran Plaza, con candado y «Requiere rol Guía». Su ficha se consulta, pero no tiene acción de entrar.

## Participantes (D30)

| Participante | Avatar | Rol | Apariencia (`img/apariencias/`) | Zona actual | Estado |
|---|---|---|---|---|---|
| Ana López Martínez (tú) | Balam | Visitante | `jaguar-jade.svg` | Juego de Pelota | Explorando |
| Carlos KarKerKar | Kan | **Guía** | `serpiente-emplumada.svg` | Juego de Pelota | Explicando la zona |
| María López | Ixchel | Visitante | `quetzal.svg` | El Castillo | Explorando |
| Juan Ramírez | Muan | Visitante | `buho.svg` | Gran Plaza | Inactivo 3 min |
| Carla Pérez | Itzel | Visitante | `jaguar-jade.svg` | Juego de Pelota | Explorando |
| Jose Jose | Kuk | Visitante | `quetzal.svg` | Plataforma de Venus | Solicitó ayuda |

## Estadísticas

- Reputación del guía: **4.8 / 5** (126 visitas guiadas)
- Participantes: **6** (5 conectados, 1 inactivo)
- Zonas visitadas: **2 de 4**
- Progreso: **50 %**
- Tiempo transcurrido: **22 min de 45**

## Fichas de zona

Usa las descripciones históricas de `recorridos.html` (ficha `#castillo-gran-plaza`) para las 4 zonas, y la de `#mil-columnas` para el Grupo de las Mil Columnas.

## Acciones (todas SIMULADAS, sin JS)

- Cambiar de zona · Consultar información · Interactuar (p. ej., «Saludar al grupo», «Tomar fotografía») · Solicitar ayuda al guía · Salir de la visita (→ `../../dashboard.html`).
- Mostrar el resultado de una acción con `:target` o radios/checkbox (D15), con un aviso de que es una demostración.

## Recursos

- SVG de monumentos de la Persona 3: símbolos `#monument-kukulkan`, `#monument-ballcourt`, `#monument-caracol` en `persona_3/recorrido.html` (copiar, no editar el original).
- Apariencias: `../../img/apariencias/*.svg` con las clases `.apariencia`, `--mini`, `--grande` (guía en `docs/apariencias.html`).
- Sistema visual: `../../css/tokens.css`, `base.css`, `componentes.css`.
