# La administración queda fuera del modelo de roles

Los módulos de `admin/` (participantes, avatares, roles, zonas) se presentan como herramienta interna de la agencia, accesible desde un enlace «Administración» en el pie del inicio y del dashboard, marcado como demostración. No se crea un rol «Administrador»: en el UML los roles pertenecen al avatar y gobiernan acciones y zonas dentro de los recorridos, y añadir uno para la gestión del sistema obligaría a modificar el UML aprobado y mezclaría la experiencia del recorrido con la operación de la agencia.

## Considered Options

- **Login separado de administración**: añade una pantalla sin diseño y sin respaldo en el modelo.
- **Rol «Administrador» del avatar**: rechazado porque altera el UML y confunde permisos de recorrido con permisos de gestión.
