# Matriz de cobertura (estado final, ticket #11)

`diseño → página → requisito → responsable → estado`

Actualizada el 2026-11-24 tras las pruebas de `docs/pruebas.md`. La matriz de la Fase 0 (2026-11-23) está en el historial de git.

Estados (plan §12): **IMPLEMENTADO** (funciona en el navegador), **SIMULADO** (la interfaz lo muestra pero no ocurre nada real), **PENDIENTE** (falta o tiene una incidencia abierta), **FUERA DE ALCANCE**. El detalle de cada funcionalidad está en `docs/funcionalidades.md`.

## Frente Persona 4 — páginas principales y administración

| Diseño (fuente) | Página destino | Requisito (distribución) | Responsable | Estado |
|---|---|---|---|---|
| P2 `...PM (1).jpeg` | `index.html` | Nombre, imagen de Chichén Itzá, descripción, login/registro, info de recorridos | Frente P4 | IMPLEMENTADO |
| P2 `...PM (2).jpeg` | `login.html` | Correo, contraseña, ingresar, enlace a registro | Frente P4 | IMPLEMENTADO (sesión SIMULADA, D25; sin «Mostrar» contraseña, D23) |
| P2 `...PM (3).jpeg` | `registro.html` | Nombre, correo, contraseña, confirmación, botón | Frente P4 | IMPLEMENTADO (error de confirmación SIMULADO, D24) |
| P2 `...PM.jpeg` | `dashboard.html` | Info del participante, avatar, recorridos disponibles y activos, perfil, menú | Frente P4 | IMPLEMENTADO («Iniciar visita» y «Unirme» PENDIENTE, I-02) |
| — | Navegación global | Cómo se desplaza el usuario entre páginas | Frente P4 | IMPLEMENTADO (D20; menú repetido en cada HTML, ADR-0001) |
| — | `recorridos.html`, `mi-avatar.html`, `mi-perfil.html`, `como-funciona.html`, `acerca.html` | Enlaces del menú de P2 | Frente P4 | IMPLEMENTADO (guardado de perfil y avatar SIMULADO; botón de Mil Columnas PENDIENTE, I-03) |
| P1 `participantes.html` | `admin/participantes.html` | Nombre, correo, fecha, rol asignado, avatar; CRUD; tabla | Frente P4 | IMPLEMENTADO (operaciones SIMULADAS) |
| P1 `avatares.html` | `admin/avatares.html` | Nombre, participante, posición, estado, rol; CRUD; tabla | Frente P4 | IMPLEMENTADO con apariencia (D10; operaciones SIMULADAS) |
| P1 `roles.html` | `admin/roles.html` | Nombre, descripción, permisos, zonas; CRUD; tabla | Frente P4 | IMPLEMENTADO (permisos de D27; operaciones SIMULADAS) |
| — | `admin/zonas.html` | Consigna: «participantes, avatares, zonas, etc.» | Frente P4 | IMPLEMENTADO (12 zonas de D28; operaciones SIMULADAS) |
| — | `admin/recorridos.html` | CRUD del catálogo de recorridos | Frente P4 | FUERA DE ALCANCE |
| — | Acceso a la administración | Entrada a los módulos de P1 | Frente P4 | IMPLEMENTADO («Administración (demo)» en el pie, D4a) |

## Frente Persona 5 — recorrido virtual

| Requisito (distribución P3/P5) | Fuente en P3 | Página | Estado |
|---|---|---|---|
| Imagen del sitio arqueológico | Bienvenida + mapa SVG | `recorrido.html` | IMPLEMENTADO (camino de zonas y vista general, D33) |
| Avatar propio | — | `recorrido.html` | IMPLEMENTADO (Balam sobre la zona actual) |
| Zona actual e indicador de ubicación | «Tu ubicación» en mapa | `recorrido.html` | IMPLEMENTADO |
| Botones de navegación entre zonas | Tarjetas «Explorar lugar» (`alert`) | `recorrido.html` | IMPLEMENTADO para abrir fichas; el cambio de zona es SIMULADO |
| Ficha de zona: nombre, descripción histórica, imagen, info relevante | Tarjetas breves | `recorrido.html` | IMPLEMENTADO |
| Restricciones de acceso / zona bloqueada | — | `recorrido.html` | IMPLEMENTADO (Mil Columnas, D29) |
| Panel de participantes con nombres y avatares | Panel derecho (3 participantes) | `recorrido.html` | IMPLEMENTADO (6 participantes de D30; presencia SIMULADA) |
| Guía identificado en el panel | Sección de guía separada | `recorrido.html` | IMPLEMENTADO |
| Reputación del guía (gráfico) | Estrellas 4.9/5 | `recorrido.html` | SIMULADO (campo de interfaz, D33) |
| Número de participantes | «12 en línea» | `recorrido.html` | SIMULADO (6, coherente con el resto del sitio) |
| Zonas visitadas y progreso | Círculo 35 %, «3 de 8» | `recorrido.html` | IMPLEMENTADO el conteo de zonas (contadores CSS, D34); 50 % SIMULADO |
| Tiempo transcurrido | Solo «tiempo estimado» | `recorrido.html` | SIMULADO (22 de 45 min) |
| Datos de sesión (modalidad, estado) | — | `recorrido.html` | IMPLEMENTADO (grupal con guía, en curso, servidor) |
| Consultar información | Tarjetas / dato curioso | `recorrido.html` | IMPLEMENTADO |
| Interactuar con participantes | «Ver participantes» (`alert`) | `recorrido.html` | SIMULADO (saludos al grupo y a un participante) |
| Solicitar ayuda al guía | «Contactar guía» (`alert`) | `recorrido.html` | SIMULADO |
| Salir del recorrido | — | `recorrido.html` | IMPLEMENTADO («Salir» → dashboard) |

## Integración (Personas 4 + 5)

| Requisito | Estado |
|---|---|
| Sistema visual común (paleta, tipografía, componentes) | IMPLEMENTADO (D1, D18, D21) |
| Datos demo coherentes entre páginas | IMPLEMENTADO (D2, D27, D28, D30; verificado en T06) |
| Dashboard → recorrido («Continuar visita») | IMPLEMENTADO (abre en la zona actual, D34) |
| Recorrido → dashboard (salir) | IMPLEMENTADO |
| Responsive en todas las páginas | IMPLEMENTADO (T09: 375, 768 y 1280 px) |
| Pruebas T01–T12 y evidencias | IMPLEMENTADO: 10 aprobadas, 1 con observación (T07), 1 falla (T04, I-02). Ver `docs/pruebas.md` |
