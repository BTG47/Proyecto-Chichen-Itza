# Funcionalidades del prototipo (estado final, ticket #11)

Para quienes redactan el reporte. El sitio es **solo HTML y CSS** ([ADR-0001](adr/0001-solo-html-y-css.md)): no hay servidor, base de datos ni JavaScript, y ningún estado pasa de una página a otra (D15).

- **IMPLEMENTADO**: funciona de verdad en el navegador tal como se describe.
- **SIMULADO**: la interfaz muestra el resultado, pero no ocurre nada real (no se guarda, no se envía, no hay servidor). La propia interfaz lo indica («demostración», «no se envía nada»).
- **PENDIENTE**: debería funcionar y aún no lo hace (incidencias abiertas de `docs/pruebas.md`).
- **FUERA DE ALCANCE**: no se hará en esta entrega, por decisión documentada.

## IMPLEMENTADO

| Funcionalidad | Dónde |
|---|---|
| Navegación entre todas las páginas: públicas, panel del participante, visita y administración | Todas |
| Menú adaptable: en móvil se pliega en un botón que lo despliega (checkbox) | Páginas públicas, panel y administración |
| Diseño adaptable a 375, 768 y 1280 px sin desbordamiento horizontal (D17) | Todas |
| Navegación con teclado, foco visible y enlace «Saltar al contenido» | Todas |
| Catálogo de recorridos con filtro por modalidad (todos / individual / grupal / con guía) | `recorridos.html` |
| Ficha de detalle de cada recorrido: descripción, modalidad, duración, zonas y zonas restringidas (D22) | `recorridos.html#…` |
| Preguntas frecuentes desplegables | `como-funciona.html` |
| Validación nativa de formularios: obligatorios, formato de correo, contraseña de 8+ caracteres (D24) | `login.html`, `registro.html`, `mi-perfil.html` |
| Selector de apariencia del avatar con vista previa (jaguar de jade, quetzal, serpiente emplumada, búho; D16) | `mi-avatar.html`, `admin/avatares.html` |
| Visita: camino de zonas con zona actual, visitadas, pendiente/saltada y zona bloqueada | `recorrido.html` |
| Visita: ficha de cada zona con descripción histórica y datos curiosos | `recorrido.html#ficha-…` |
| Visita: cambio entre «Camino» y «Vista general» (mapa esquemático) | `recorrido.html` |
| Visita: guía arriba, en la esquina o minimizado; «ver más» y explicaciones anteriores | `recorrido.html` |
| Visita: panel lateral con pestañas «Actividad» y «Grupo»; en móvil, cajón | `recorrido.html` |
| Visita: «Zona N de M» y «N de M zonas visitadas» se calculan con contadores CSS a partir del marcado del camino (D34) | `recorrido.html` |
| Visita: la zona de otro rol (Mil Columnas) se consulta pero no ofrece «entrar» (D29) | `recorrido.html#ficha-columnas` |
| Administración: abrir los paneles Nuevo / Ver / Editar / Eliminar de cada registro (anclas `:target`) | `admin/*.html` |
| Administración: bajas bloqueadas con su motivo (p. ej. avatar vinculado a un participante) | `admin/*.html` |

## SIMULADO

| Funcionalidad | Cómo se simula | Dónde |
|---|---|---|
| Inicio de sesión y registro | Ambos formularios llevan a `dashboard.html` como Ana López Martínez, sin comprobar credenciales (D25) | `login.html`, `registro.html` |
| Cerrar sesión | Enlace a `index.html` (D25) | Panel |
| Error «Las contraseñas no coinciden» | Estado de ejemplo en `registro.html#error`; no se comparan las contraseñas (D24) | `registro.html` |
| Guardar perfil y apariencia | Mensaje «guardado» (`#guardado`); nada se guarda | `mi-perfil.html`, `mi-avatar.html` |
| Altas, ediciones y bajas del CRUD | Mensaje de confirmación; los 4 catálogos tienen datos fijos de ejemplo (D27, D28, D30) | `admin/*.html` |
| Búsqueda en administración | Muestra un estado de ejemplo (`#buscar`), no filtra | `admin/*.html` |
| Conexión al servidor «Región Sureste» y estado «Conectada» | Texto fijo (`Conexion`, `Servidor` del UML) | Dashboard, visita |
| Participantes en línea y su zona actual | Datos fijos de D30 | Dashboard, visita, `admin/avatares.html` |
| Progreso (50 %), tiempo transcurrido (22 de 45 min) e inicio (17:20) | Valores fijos marcados con «ESTADO» en el HTML (D34) | Visita; el progreso también en el dashboard |
| Reputación del guía (4.8 / 5, gráfica por estrellas) | Datos fijos; campo de interfaz, no está en el UML (D33) | `recorrido.html` |
| Acciones del grupo: saludar al grupo o a un participante, pedir ayuda al guía, tomar fotografía | Aviso en pantalla; no se envía nada (`Accion` del UML) | `recorrido.html` |
| Ir a otra zona | Aviso «Cambio de zona simulado»; la zona actual no cambia | `recorrido.html#aviso-viaje` |
| Historial de actividad del grupo y explicaciones del guía | Lista fija de ejemplo | `recorrido.html` |

## PENDIENTE

| Funcionalidad | Motivo | Referencia |
|---|---|---|
| «Iniciar visita» (Cenote Sagrado) y «Unirme» (El Caracol y Las Monjas) abren la visita de El Castillo y la Gran Plaza | Solo existe una visita implementada; falta decidir cómo presentarlos | I-02 en `docs/pruebas.md` |
| Botón de la ficha de Mil Columnas en el catálogo («Regístrate para visitarlo») | Registrarse da rol Visitante, que no puede entrar | I-03 en `docs/pruebas.md` |

## FUERA DE ALCANCE

| Funcionalidad | Motivo |
|---|---|
| `admin/recorridos.html` (CRUD del catálogo de recorridos y sus zonas) | Pospuesto; se retomará si hay tiempo (`docs/decisiones-pendientes.md`) |
| Servidor, base de datos, autenticación real, persistencia y comunicación en tiempo real entre participantes | Prototipo de interfaz de un sistema distribuido; no se construye el sistema |
| Visitas de los demás recorridos (Cenote Sagrado, El Caracol y Las Monjas, Mil Columnas) | Se demuestra una sola visita (D2) |
| Botón «Mostrar» contraseña y comparación real de contraseñas | Requieren JavaScript (ADR-0001, D23, D24) |
| Arrastrar el bloque del guía | Requiere JavaScript; se sustituye por posiciones fijas (D33) |
| Redacción del reporte académico | La hacen las personas responsables con esta evidencia (plan §9, hito E) |
