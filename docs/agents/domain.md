# Documentación de dominio

Cómo deben consumir los skills de ingeniería la documentación de dominio de este repo al explorar el código.

## Antes de explorar, lee esto

- **`GLOSSARY.md`** en la raíz del repo.
- **`docs/adr/`**: lee los ADRs que toquen el área en la que vas a trabajar.

Si alguno de estos archivos no existe, **continúa sin avisar**. No señales su ausencia ni sugieras crearlos de antemano. El skill `/domain-modeling` (al que se llega vía `/grill-with-docs` y `/improve-codebase-architecture`) los crea sobre la marcha cuando realmente se resuelven términos o decisiones.

Escribe el glosario y los ADRs en español.

## Estructura de archivos

Repo de contexto único:

```
/
├── GLOSSARY.md
├── docs/adr/
│   ├── 0001-ejemplo-de-decision.md
│   └── 0002-otra-decision.md
└── ...
```

## Usa el vocabulario del glosario

Cuando tu salida nombre un concepto del dominio (en el título de un issue, una propuesta de refactor, una hipótesis, el nombre de un test), usa el término tal como está definido en `GLOSSARY.md`. No derives hacia sinónimos que el glosario evita explícitamente.

Si el concepto que necesitas aún no está en el glosario, es una señal: o estás inventando lenguaje que el proyecto no usa (reconsidéralo), o hay un hueco real (anótalo para `/domain-modeling`).

## Señala conflictos con ADRs

Si tu salida contradice un ADR existente, dilo explícitamente en lugar de ignorarlo en silencio:

> _Contradice el ADR-0007 (pedidos con event sourcing), pero vale la pena reabrirlo porque…_
