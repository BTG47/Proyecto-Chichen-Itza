"""Revisa enlaces y recursos locales del sitio (prueba T01/T08).

Recorre las páginas del sitio (raíz y admin/) y comprueba que cada
href/src local apunte a un archivo existente y que cada ancla (#id)
exista en la página de destino. No usa red: los enlaces externos se
listan aparte para auditar dependencias (T11).

Uso, desde la raíz del repositorio:
    python3 -I docs/evidencia/revisar_enlaces.py
Sale con código 1 si encuentra algún problema.
"""
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

RAIZ = Path.cwd()
PAGINAS = sorted([*RAIZ.glob("*.html"), *RAIZ.glob("admin/*.html")])


class Lector(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids, self.refs = set(), []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if "id" in a:
            self.ids.add(a["id"])
        if tag == "a" and "name" in a:
            self.ids.add(a["name"])
        for attr in ("href", "src"):
            if a.get(attr) is not None:
                self.refs.append((tag, attr, a[attr], self.getpos()[0]))


def leer(ruta, cache={}):
    if ruta not in cache:
        lector = Lector()
        lector.feed(ruta.read_text(encoding="utf-8"))
        cache[ruta] = lector
    return cache[ruta]


problemas, externos, total = [], set(), 0
for pagina in PAGINAS:
    for tag, attr, valor, linea in leer(pagina).refs:
        total += 1
        partes = urlsplit(valor)
        donde = f"{pagina.relative_to(RAIZ)}:{linea}"
        if partes.scheme in ("http", "https") or valor.startswith("//"):
            externos.add(valor)
            continue
        if partes.scheme in ("mailto", "tel", "data"):
            continue
        if partes.scheme:
            problemas.append(f"{donde} esquema inesperado: {valor}")
            continue
        destino = (pagina.parent / unquote(partes.path)).resolve() if partes.path else pagina
        if not destino.exists():
            problemas.append(f"{donde} {attr}={valor!r}: no existe {destino.relative_to(RAIZ)}")
            continue
        if partes.fragment and destino.suffix == ".html":
            if partes.fragment not in leer(destino).ids:
                problemas.append(f"{donde} {attr}={valor!r}: no hay id={partes.fragment!r}")

print(f"{len(PAGINAS)} páginas, {total} referencias revisadas")
print("Externas:", ", ".join(sorted(externos)) if externos else "ninguna")
for p in problemas:
    print("ERROR", p)
print("Resultado:", "OK" if not problemas else f"{len(problemas)} problemas")
sys.exit(1 if problemas else 0)
