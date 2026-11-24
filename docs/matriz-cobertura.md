# Matriz de cobertura (Fase 0)

`diseño → página → requisito → responsable → estado`

Estados: **LISTO PARA INTEGRAR** (código entregado utilizable), **POR IMPLEMENTAR** (hay diseño, falta código), **INCOMPLETO** (código/diseño con huecos frente al requisito), **SIN DISEÑO**, **POR DECIDIR**.

## Frente Persona 4 — páginas principales y administración

| Diseño (fuente) | Página destino | Requisito (distribución) | Responsable | Estado |
|---|---|---|---|---|
| P2 `...PM (1).jpeg` | `index.html` | Nombre, imagen de Chichén Itzá, descripción, login/registro, info de recorridos | Frente P4 | POR IMPLEMENTAR |
| P2 `...PM (2).jpeg` | `login.html` | Correo, contraseña, ingresar, enlace a registro | Frente P4 | POR IMPLEMENTAR |
| P2 `...PM (3).jpeg` | `registro.html` | Nombre, correo, contraseña, confirmación, botón | Frente P4 | POR IMPLEMENTAR |
| P2 `...PM.jpeg` | `dashboard.html` | Info del participante, avatar, recorridos disponibles y activos, perfil, menú | Frente P4 | POR IMPLEMENTAR |
| — | Navegación global | Cómo se desplaza el usuario entre páginas | Frente P4 | SIN DISEÑO |
| — | Recorridos / Mi avatar / Mi perfil / Cómo funciona / Acerca de | Enlaces del menú de P2 | Frente P4 | POR DECIDIR |
| P1 `participantes.html` | `participantes.html` | Nombre, correo, fecha, rol asignado, avatar; CRUD; tabla | Frente P4 | LISTO PARA INTEGRAR |
| P1 `avatares.html` | `avatares.html` | Nombre, participante, posición, estado, rol; CRUD; tabla | Frente P4 | LISTO PARA INTEGRAR (falta `apariencia`) |
| P1 `roles.html` | `roles.html` | Nombre, descripción, permisos, zonas; CRUD; tabla | Frente P4 | LISTO PARA INTEGRAR |
| — | `zonas.html` | Consigna: «participantes, avatares, zonas, etc.» | Frente P4 | POR DECIDIR |
| — | Acceso a la administración | Entrada a los módulos de P1 | Frente P4 | POR DECIDIR |

## Frente Persona 5 — recorrido virtual

| Requisito (distribución P3/P5) | Fuente en P3 | Página | Estado |
|---|---|---|---|
| Imagen del sitio arqueológico | Bienvenida + mapa SVG | `recorrido.html` | LISTO PARA INTEGRAR |
| Avatar propio | — | `recorrido.html` | INCOMPLETO |
| Zona actual e indicador de ubicación | «Tu ubicación» en mapa | `recorrido.html` | INCOMPLETO |
| Botones de navegación entre zonas | Tarjetas «Explorar lugar» (`alert`) | `recorrido.html` | INCOMPLETO |
| Ficha de zona: nombre, descripción histórica, imagen, info relevante | Tarjetas breves | `recorrido.html` | INCOMPLETO |
| Restricciones de acceso / zona bloqueada | — | `recorrido.html` | INCOMPLETO |
| Panel de participantes con nombres y avatares | Panel derecho (3 participantes) | `recorrido.html` | LISTO PARA INTEGRAR (datos a reconciliar) |
| Guía identificado en el panel | Sección de guía separada | `recorrido.html` | INCOMPLETO |
| Reputación del guía (gráfico) | Estrellas 4.9/5 | `recorrido.html` | INCOMPLETO |
| Número de participantes | «12 en línea» | `recorrido.html` | LISTO PARA INTEGRAR (datos a reconciliar) |
| Zonas visitadas y progreso | Círculo 35 %, «3 de 8» | `recorrido.html` | LISTO PARA INTEGRAR (datos a reconciliar) |
| Tiempo transcurrido | Solo «tiempo estimado» | `recorrido.html` | INCOMPLETO |
| Datos de sesión (modalidad, estado) | — | `recorrido.html` | INCOMPLETO |
| Consultar información | Tarjetas / dato curioso | `recorrido.html` | LISTO PARA INTEGRAR |
| Interactuar con participantes | «Ver participantes» (`alert`) | `recorrido.html` | INCOMPLETO |
| Solicitar ayuda al guía | «Contactar guía» (`alert`) | `recorrido.html` | INCOMPLETO |
| Salir del recorrido | — | `recorrido.html` | INCOMPLETO |

## Integración (Personas 4 + 5)

| Requisito | Estado |
|---|---|
| Sistema visual común (paleta, tipografía, componentes) | POR DECIDIR |
| Datos demo coherentes entre páginas | POR DECIDIR |
| Dashboard → recorrido («Continuar recorrido») | POR IMPLEMENTAR |
| Recorrido → dashboard (salir) | POR IMPLEMENTAR |
| Responsive en todas las páginas | POR IMPLEMENTAR |
| Pruebas T01–T12 y evidencias | POR IMPLEMENTAR |
