# Inventario de entradas (Fase 0)

**Fecha:** 2026-11-23
**Fuentes revisadas:** `docs/Uml.jpeg`, `persona_1/`, `persona_2/`, `persona_3/`, consigna (`docs/Actividad 6 - Chichen Itza (diseño)(1).docx`), distribución (`docs/Distribucion_Actividad_Chichen_Itza_5_Personas.pdf`) y rúbrica (`docs/SO2-1.pdf`).

Los materiales de cada persona llegaron como ZIP y se extrajeron directamente en `persona_N/`; están versionados en git, por lo que no se guarda copia aparte en `inputs/originales/`. Ningún archivo contiene instrucciones dirigidas a agentes ni scripts externos.

---

## UML de referencia — `docs/Uml.jpeg`

Coincide con el §3 de `PLAN_INTEGRACION_CHICHEN_ITZA.md`. Relaciones y cardinalidades:

| Relación | Cardinalidad | Implicación para la UI |
|---|---|---|
| Participante **controla** Avatar | 1 : 1 | Un avatar por participante |
| Participante **establece** Conexion | 1 : 0..* | Historial/estado de conexión |
| Avatar **tiene** Rol | 0..* : 1 | El rol es del avatar, no del participante |
| GuiaTurista **es un** Rol (generalización) | — | El guía es un rol, no un tipo de usuario |
| Rol **autoriza acceso** ZonaGeografica | 0..* : 0..* | Zonas bloqueadas según rol |
| RecorridoVirtual **incluye** ZonaGeografica | 0..* : 1..* | Un recorrido tiene ≥ 1 zona |
| RecorridoVirtual **se realiza en** SesionRecorrido | 1 : 0..* | Catálogo ≠ visita |
| Avatar **registra** Participacion | 1 : 0..* | Estado del avatar por visita |
| SesionRecorrido **reúne** Participacion | 1 : 0..* | Participantes de la sesión |
| Participacion **realiza** Accion | 1 : 0..* | Historial de acciones |
| Accion **ocurre en** ZonaGeografica | 0..* : 1 | Acciones por zona |
| Conexion **usa** Servidor | 0..* : 1 | Servidor de la conexión |
| SesionRecorrido **coordinada por** Servidor | 0..* : 1 | Servidor de la sesión |

---

## Persona 1 — `persona_1/`

| Campo | Registro |
|---|---|
| Formato original | HTML + CSS estáticos, sin JavaScript. `LEEME.txt` con reglas de negocio |
| Pantallas y formularios | `participantes.html`, `avatares.html`, `roles.html`. `index.html` es **idéntico** a `participantes.html` (el LEEME indica conservar el `index.html` general del sitio) |
| CRUD | Nuevo / Ver / Editar / Eliminar / Buscar mediante anclas y `:target` (paneles en `<aside>`). Bajas bloqueadas con motivo. Guardado y búsqueda muestran estados de demostración |
| Recursos reutilizables | `css/administracion.css` (≈ 200 líneas) |
| Estilos | Fondo crema `#f6f1e7`, jade `#195447` / `#1f6f5c`, acento `#a14b14`. Títulos Georgia, cuerpo `system-ui`. Áreas táctiles de 44 px, foco visible, responsive en 56rem y 34rem |
| Navegación | Menú propio entre los tres módulos; no enlaza al resto del sitio |
| Datos demo | P-01 Ana López Martínez · avatar Balam · Participante · 14/11/26. P-02 Carlos Ek · avatar Jaguar · Guía · 19/11/26. Roles R-01 Participante, R-02 Guía. Zonas: Gran Plaza, Juego de Pelota. Avatar «Itzamná» aparece en selectores pero no en la tabla |
| Campos fuera del UML | `fechaRegistro`, nombre del avatar, posición X/Y, estado del avatar, descripción del rol, permisos. Posición/estado se presentan como lectura «del recorrido activo» (equivalen a `Participacion.zonaActual/estado`) |
| Ausencias | `Avatar.apariencia` (sí está en UML). CRUD de zonas (la consigna menciona «zonas», la distribución no lo asignó) |
| Accesibilidad | Labels asociadas, `aria-current`, `role="search"`, tabla con región desplazable y `scope` |

## Persona 2 — `persona_2/`

| Campo | Registro |
|---|---|
| Formato original | 4 imágenes JPEG (≈ 1600 px de ancho) exportadas por WhatsApp. Sin fuentes de Figma/Canva |
| Pantallas | `...PM (1).jpeg` → inicio; `...PM (2).jpeg` → login; `...PM (3).jpeg` → registro; `...PM.jpeg` → dashboard |
| Inicio | Barra superior (logo «Chichén Itzá Virtual», Inicio, Recorridos, Cómo funciona, Acerca de, Iniciar sesión, Registrarse). Hero con etiqueta «Recorridos virtuales · Patrimonio de la Humanidad», CTA «Crear cuenta gratis» y «Ver recorridos», ilustración de la pirámide. Tarjetas: El Castillo y la Gran Plaza (grupal con guía, 4 zonas, 45 min), Cenote Sagrado (individual, 2 zonas, 25 min), El Caracol y Las Monjas (grupal con guía, 3 zonas, 35 min) |
| Login | Pantalla dividida: ilustración + «Bienvenido de vuelta»; correo, contraseña con «Mostrar», botón Ingresar, enlace a registro, «Volver al inicio» |
| Registro | Nombre completo, correo (ayuda «Lo usarás para iniciar sesión»), contraseña (mín. 8), confirmación con error «Las contraseñas no coinciden», botón Registrarme. Nota: se asigna rol Participante y avatar inicial |
| Dashboard | Sidebar: Mi panel, Recorridos, Mi avatar, Mi perfil, Cerrar sesión. Saludo «Hola, Ana». Estado «Conectada · Servidor Región Sureste». Tarjetas: Mi información; Mi avatar (Balam, apariencia jaguar de jade, En recorrido, Cambiar apariencia); Recorrido activo (El Castillo y la Gran Plaza, grupal, guía Carlos Ek, 6 participantes, zona actual Juego de Pelota, 2 de 4 zonas, 50 %, Continuar recorrido). Tabla de recorridos disponibles: Cenote Sagrado (Disponible → Iniciar), El Caracol y Las Monjas (Programado hoy 18:00 → Unirme), Grupo de las Mil Columnas (Acceso restringido · Requiere rol Guía) |
| Estilos | Misma familia que Persona 1: crema, jade, acento naranja. Tipografía sin serifa en títulos (difiere de Georgia en Persona 1) |
| Recursos | Ilustración de pirámide y logo: hay que recrearlos (SVG/CSS) |
| Ausencias | Leyenda de los marcadores numerados (1–6); propuesta de navegación; vistas móviles; páginas Recorridos, Mi avatar, Mi perfil, Cómo funciona, Acerca de; acceso a la administración |

## Persona 3 — `persona_3/`

| Campo | Registro |
|---|---|
| Formato original | `recorrido.html` + `styles.css` (≈ 2 000 líneas). JavaScript inline mínimo |
| Pantalla | 3 columnas: sidebar (Explorar sitio, Zonas, Participantes, Guía, Mi progreso, Ayuda), contenido central, panel derecho |
| Secciones | Bienvenida con pirámide; mapa con 3 monumentos, puntos 1–3, «Tu ubicación» y leyenda; tarjetas de puntos de interés (Templo de Kukulcán, Gran Juego de Pelota, El Caracol); guía Andrés Gómez ★ 4.9/5; progreso circular 35 % («3 de 8», 45 min estimado); participantes «12 en línea» (María López, Juan Ramírez, Carla Pérez); «¿Sabías que?»; ayuda |
| Recursos reutilizables | Biblioteca SVG inline de monumentos (`#monument-kukulkan`, `#monument-ballcourt`, `#monument-caracol`) e iconos de navegación |
| Estilos | Verde oscuro `#19382f`, crema, acento naranja `#bd7447`. Aptos/Segoe + Georgia. `:root` redefinido 4 veces en capas sucesivas. Responsive en 1150/750/480 px y `prefers-reduced-motion` |
| Interactividad | `alert()` en «Explorar lugar», «Contactar guía», «Ver participantes»; resaltado del menú activo |
| Defectos técnicos | `href="#"` sin destino, botones sin `type`, CSS con reglas sobrescritas |
| Ausencias frente a la distribución | Avatar propio y zona actual explícita; ficha de zona con descripción histórica y restricciones; zona bloqueada; datos de sesión (modalidad, estado); tiempo transcurrido; gráfico de reputación; interactuar con participantes; salir del recorrido; guía dentro del panel de participantes |
| Contradicciones de datos | Guía Andrés Gómez (≠ Carlos Ek); 12 en línea (≠ 6); 35 % / 3 de 8 (≠ 50 % / 2 de 4); zonas Kukulcán/Juego de Pelota/Caracol (≠ recorrido de 4 zonas «El Castillo y la Gran Plaza»); grafía «Kukulcán» vs «Kukulkán» |

---

## Dependencias entre entregas

- Persona 2 (dashboard) enlaza a Persona 3 («Continuar recorrido») y comparte datos con Persona 1 (Ana, Balam, Carlos Ek).
- Persona 3 debe reflejar la sesión y la participación que muestra el dashboard.
- La administración de Persona 1 no tiene punto de entrada en los diseños de Persona 2.
