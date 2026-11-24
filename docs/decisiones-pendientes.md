# Decisiones pendientes (Fase 0)

Cada decisión registra: contexto, opciones, recomendación y resolución. Al resolverse se anota la decisión y la fecha; las relevantes a largo plazo se promueven a un ADR en `docs/adr/`.

| # | Decisión | Contexto | Recomendación inicial | Resolución |
|---|---|---|---|---|
| D1 | Sistema visual común | P1 y P2 comparten crema/jade/naranja; P3 usa verde más oscuro y Aptos; P1 títulos en Georgia, P2 sin serifa | Adoptar paleta y componentes de P1/P2; adaptar los SVG de P3 | PENDIENTE |
| D2 | Datos demo canónicos | P1/P2: Ana, Balam, Carlos Ek guía, «El Castillo y la Gran Plaza», 4 zonas, 50 %. P3: Andrés Gómez, 12 en línea, 35 %, 3 de 8 | Adoptar la historia de P2 y ajustar P3 | PENDIENTE |
| D3 | Huecos del recorrido de P3 | Faltan avatar propio, zona actual explícita, ficha histórica, zona bloqueada, sesión, tiempo transcurrido, interactuar, salir | Completarlos sobre la estructura de P3 registrando cada adición | PENDIENTE |
| D4 | Navegación global | P2 no entregó propuesta de navegación; menú con páginas sin diseño; administración sin acceso | Definir mapa de navegación y alcance de páginas sin diseño | PENDIENTE |
| D5 | CRUD de zonas | La consigna menciona zonas; la distribución solo asignó participantes, avatares y roles | Por definir | PENDIENTE |
| D6 | Interactividad / JavaScript | P1 sin JS (`:target`); P3 usa `alert()` | Por definir | PENDIENTE |
| D7 | Leyenda de marcadores de P2 | Las maquetas tienen marcadores 1–6 sin explicación | Solicitar texto a Persona 2 si existe | PENDIENTE |
| D8 | `index.html` de P1 | Duplicado de `participantes.html` | Descartarlo; `index.html` será la página de inicio de P2 | PENDIENTE |
| D9 | Campos fuera del UML | `fechaRegistro`, nombre de avatar, posición, estado, descripción y permisos de rol, contraseña | Marcarlos como campo de interfaz / dato de demostración | PENDIENTE |
| D10 | `Avatar.apariencia` | Está en UML y en dashboard de P2, ausente en formulario de avatares de P1 | Añadir el campo al formulario de avatares | PENDIENTE |
| D11 | Estructura de archivos | El plan sugiere `admin/`, `css/` por módulo, `assets/`; los materiales están en `persona_N/` | Por definir | PENDIENTE |
