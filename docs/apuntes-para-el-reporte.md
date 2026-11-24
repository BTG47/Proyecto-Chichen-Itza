# Apuntes para el reporte técnico

**Fecha:** 2026-11-24. Material para quien redacte el reporte: datos verificados del prototipo, ordenados según las secciones de la consigna y la rúbrica SO2. No es el reporte; cada dato remite a su evidencia en el repositorio.

## 1. Sostenibilidad (sección 5 de la consigna, criterio de la rúbrica)

### Cómo la incorpora el diseño

| Dimensión | Decisión de diseño | Evidencia |
|---|---|---|
| Ambiental | Sitio estático, sin JavaScript, sin servidor para la maqueta y sin recursos externos (fuentes, CDN, analítica) | ADR-0001; T11 en `docs/pruebas.md` |
| Ambiental | Páginas ligeras: 49 KB el inicio, 58 KB el panel, 114 KB la administración de avatares y 127 KB la visita (sin comprimir, con su CSS y SVG) | Medido el 2026-11-24 |
| Ambiental | Ilustraciones vectoriales (SVG) en lugar de fotografías; la visita usa íconos esquemáticos, no arte pesado por zona | `img/apariencias/`, D33 |
| Ambiental | Las animaciones se apagan con `prefers-reduced-motion` (menos trabajo de dibujo y respeto a la configuración del usuario) | `css/base.css` |
| Ambiental | Visitar el sitio sin viajar evita las emisiones de un traslado (beneficio potencial; no se midió) | — |
| Social | Acceso remoto a un patrimonio que mucha gente no puede visitar en persona (distancia, costo, movilidad) | Propósito en `acerca.html` |
| Social | Accesibilidad verificada: teclado, foco visible, labels, contraste y diseño adaptable a móvil (ver §2) | `docs/pruebas.md` |
| Social | Contenido histórico con fuentes (INAH, UNESCO) y cifras corregidas cuando no había respaldo | `docs/fuentes-historicas.md` |
| Económica | Hospedaje estático de costo casi nulo y mantenimiento simple: tokens de diseño en un archivo, sin dependencias que actualizar | `css/tokens.css`, D18 |
| Económica | El turismo digital es una fuente de ingreso adicional para la agencia, que no compite con la visita presencial | Consigna |

### Alineación con los ODS de la ONU

| ODS y meta | Relación con el proyecto |
|---|---|
| **4.7** Educación para el desarrollo sostenible y valoración de la diversidad cultural | Fichas históricas de cada zona, explicaciones del guía |
| **8.9** Turismo sostenible que promueva la cultura local | Recorridos virtuales de un sitio maya |
| **10.2** Inclusión de todas las personas, sin importar su edad o discapacidad | Accesibilidad y acceso remoto |
| **11.4** Proteger y salvaguardar el patrimonio cultural | Difusión del sitio sin desgaste físico del monumento |
| **12.b** Herramientas para gestionar el turismo sostenible | La agencia administra recorridos, zonas y accesos por rol |
| **13** Acción por el clima | Visitas sin traslado (beneficio potencial, no medido) |

## 2. Usabilidad y accesibilidad (sección 3: «cómo las interfaces cumplen con los estándares»)

Estándar de referencia sugerido: **WCAG 2.1 nivel AA** (W3C) más las heurísticas de usabilidad de Nielsen.

**Resultados medidos el 2026-11-24 en las 14 páginas** (detalle y método en `docs/pruebas.md`):

| Comprobación | Resultado |
|---|---|
| Contraste de color (axe-core 4.14, reglas WCAG 2 A/AA) | 0 problemas |
| Campos de formulario sin label | 0 |
| Navegación con teclado a 375, 768 y 1280 px | Todo elemento enfocable cambia de aspecto y se ve en pantalla |
| Estructura | Un `<h1>` por página, sin saltos de nivel; enlace para saltar al contenido; `lang="es"` |
| Diseño adaptable | 0 px de desbordamiento horizontal a 375, 768 y 1280 px |
| Validez del HTML (html-validate 11) | 0 errores de estructura; solo avisos de estilo |
| Problemas pendientes de axe | 1 serio: la gráfica de reputación es un `<ul role="img">` (se corrige en el PR de reputación). 1 menor: contenido fuera de regiones (landmarks) |

**Heurísticas de Nielsen con ejemplos del sitio:**

- *Visibilidad del estado del sistema:* la barra inferior de la visita muestra la zona actual, el progreso y el tiempo; el nodo «Estás aquí».
- *Prevención de errores:* validación nativa de correo y contraseña, y bajas bloqueadas con su motivo en la administración.
- *Reconocimiento antes que recuerdo:* íconos siempre acompañados de texto; leyenda del camino (visitada, actual, pendiente, solo Guía).
- *Consistencia:* un solo sistema visual (tokens y componentes compartidos, D1, D18).
- *Honestidad del prototipo:* toda acción simulada lo dice en pantalla («Demostración: no se envía nada»).

## 3. Datos útiles para el evaluador

- **Cifras:** 14 páginas, 4 módulos de administración (participantes, avatares, roles, zonas), 4 recorridos, 12 zonas, 2 roles, 6 participantes en la visita de ejemplo.
- **Pruebas:** T01–T12 ejecutadas, 31 capturas en `docs/evidencia/capturas/`. Las pruebas se repiten con dos scripts (`docs/evidencia/`).
- **Funcionalidades:** separadas en IMPLEMENTADO, SIMULADO, PENDIENTE y FUERA DE ALCANCE en `docs/funcionalidades.md`.
- **Alternativas analizadas (sección 2):** cinco prototipos de la visita (A mapa, B ruta, C escena, D combinación, E camino) con la decisión y sus motivos en D33 de `docs/decisiones-pendientes.md`. Las capturas de `prototipos/recorrido/` sirven como figura.
- **Decisiones registradas:** 34 decisiones (D1–D34) y 2 ADR en `docs/adr/`.

### Del UML a la interfaz

| Clase y método del UML | Dónde se ve |
|---|---|
| `Participante` (id, nombre, correo) | Registro, Mi perfil, `admin/participantes.html` |
| `Avatar.cambiarApariencia()` | `mi-avatar.html`, `admin/avatares.html` |
| `Rol.puedeAcceder(zona)` | Candado y «Requiere rol Guía» en Mil Columnas; `admin/roles.html` |
| `GuiaTurista.explicarZona()`, `coordinarGrupo()` | Bloque del guía en la visita; respuesta a la solicitud de ayuda |
| `RecorridoVirtual.consultarZonas()` | Ficha de cada recorrido en `recorridos.html` |
| `SesionRecorrido` (modalidad, fechaInicio, estado) | Cabecera de la visita («En curso · Grupal con guía», inicio 17:20) |
| `Participacion.cambiarZona()`, `calcularProgreso()` | «Ir a esta zona», nodo actual, 50 % y «2 de 4 zonas» |
| `Accion.registrar()` (tipo, fechaHora) | Panel «Actividad» |
| `ZonaGeografica.consultarInformacion()` | Ficha de cada zona |
| `Conexion` (fechaConexion), `cerrar()` | «Conectado desde 17:20» en el panel Grupo; «Salir» |
| `Servidor` (region), `sincronizarEstado()` | «Región Sureste» en la visita y el panel |

### Desviaciones que conviene justificar en el reporte

- **Formulario de participantes:** la distribución pide «rol asignado», pero en el UML el rol pertenece al avatar. La interfaz muestra el rol del avatar asociado.
- **Formulario de avatares:** la distribución pide posición y estado. Se muestran, pero como datos de la participación en la visita (D9).
- **Solo HTML y CSS:** sin botón «Mostrar contraseña» ni comparación real de contraseñas (ADR-0001).
- **Una sola visita demostrada:** «El Castillo y la Gran Plaza».
- **`admin/recorridos.html`:** fuera de alcance.

## 4. Hallazgos de la revisión general (2026-11-24)

Para tenerlos en cuenta al redactar:

1. **Sostenibilidad y referencias** eran las secciones sin material; este documento y `docs/fuentes-historicas.md` las cubren.
2. **Incidencias abiertas:** I-02 («Iniciar visita» y «Unirme» abren otra visita) e I-03 (botón engañoso en Mil Columnas). Ver `docs/pruebas.md`.
3. **Alcance mayor al pedido:** seis páginas extra y una visita con mucha interacción solo-CSS. Conviene presentarlo como mejora de la experiencia, no como requisito.
4. **El reporte tiene un tope de 10 páginas:** hay mucha documentación (plan, decisiones, pruebas); hay que resumir, no trasladar.
