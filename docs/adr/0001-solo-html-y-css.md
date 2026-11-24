# Solo HTML y CSS, sin JavaScript

El sitio se implementa exclusivamente con HTML y CSS. La consigna evalúa el diseño e implementación de interfaces HTML/CSS, la Persona 1 ya resolvió el CRUD sin JavaScript (paneles con `:target`), y así se evita que una simulación parezca funcionalidad real. La interactividad se logra con `:target`, radios/checkbox ocultos con `<label>`, `<details>`, `:hover`/`:focus`/`:has()` y transiciones/animaciones CSS que respetan `prefers-reduced-motion`.

## Considered Options

- **HTML + CSS + JS mínimo en la visita**: más interacción (cambiar zona, temporizador), pero se aleja de la consigna y difumina lo real y lo simulado.
- **JS para simular el CRUD**: rechazado por el mismo motivo.

## Consequences

- **No hay inclusión de fragmentos compartidos.** Encabezados, menús, barras laterales y pies se **repiten en cada archivo HTML**. Al cambiar uno, hay que replicar el cambio en todas las páginas que lo usan. Para reducir el costo, todo el aspecto vive en el CSS compartido (`css/tokens.css`, `css/base.css`, `css/componentes.css`) y el marcado repetido se mantiene mínimo y con la misma estructura en todas las páginas.
- **Ningún estado persiste entre páginas.** Login y registro siempre conducen a `dashboard.html` como la participante demo (sesión SIMULADA); una selección hecha con radios/checkbox se pierde al navegar.
- **Lo que CSS no puede hacer se omite o se muestra como ejemplo visual**: no hay botón «Mostrar» contraseña; el error «Las contraseñas no coinciden» se muestra en `registro.html#error` como estado SIMULADO; la validación real se limita a la nativa del navegador (`required`, `type=email`, `minlength`).
- Antes de agregar JavaScript en el futuro, se debe revisar este ADR.
