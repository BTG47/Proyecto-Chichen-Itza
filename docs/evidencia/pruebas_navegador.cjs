// Pruebas en navegador y capturas para el reporte (T05, T08, T09, T10, T12).
// Herramienta de prueba, no del sitio: el sitio sigue sin JavaScript (ADR-0001).
//
// Abre cada página con file:// en Chromium sin interfaz (Playwright) a 375, 768 y 1280 px y mide:
//   - desbordamiento horizontal de la página,
//   - imágenes rotas,
//   - campos de formulario sin label,
//   - un solo <h1> y niveles de encabezado sin saltos,
//   - recorrido con Tab: cada elemento que recibe el foco debe tener contorno o sombra visible.
// Guarda capturas en docs/evidencia/capturas/ y el resumen en docs/evidencia/resultados.json.
//
// Uso (desde la raíz del repo; playwright-core se instala fuera del proyecto):
//   npm i --prefix /tmp/pw playwright-core && npx --prefix /tmp/pw playwright-core install chromium
//   NODE_PATH=/tmp/pw/node_modules node docs/evidencia/pruebas_navegador.cjs
// Con CHROME=/ruta/al/chrome se usa ese ejecutable.

const { chromium } = require("playwright-core");
const fs = require("fs");
const path = require("path");

const RAIZ = process.cwd();
const SALIDA = path.join(RAIZ, "docs/evidencia");
const CAPTURAS = path.join(SALIDA, "capturas");
const ANCHOS = [375, 768, 1280];
const PAGINAS = [
  "index.html", "recorridos.html", "como-funciona.html", "acerca.html", "login.html", "registro.html",
  "dashboard.html", "mi-avatar.html", "mi-perfil.html", "recorrido.html",
  "admin/participantes.html", "admin/avatares.html", "admin/roles.html", "admin/zonas.html",
];
// Pantallas principales y estados :target que se capturan. ancho 375 = móvil.
// Un cuarto elemento opcional es el <label> que se pulsa antes (estados con radios, D15).
const CAPTURAS_LISTA = [
  ["01-inicio", "index.html", [1280, 375]],
  ["02-recorridos", "recorridos.html", [1280]],
  ["03-recorridos-detalle", "recorridos.html#castillo-gran-plaza", [1280]],
  ["04-como-funciona", "como-funciona.html", [1280]],
  ["05-acerca", "acerca.html", [1280]],
  ["06-login", "login.html", [1280, 375]],
  ["07-registro", "registro.html", [1280]],
  ["08-registro-error-simulado", "registro.html#error", [1280]],
  ["09-dashboard", "dashboard.html", [1280, 375]],
  ["10-mi-avatar", "mi-avatar.html", [1280]],
  ["11-mi-perfil", "mi-perfil.html", [1280]],
  ["12-visita-zona-actual", "recorrido.html#zona-actual", [1280, 768, 375]],
  ["13-visita-ficha-pelota", "recorrido.html#ficha-pelota", [1280]],
  ["14-visita-zona-bloqueada", "recorrido.html#ficha-columnas", [1280]],
  ["15-visita-vista-general", "recorrido.html", [1280], "label[for=vista-mapa]"],
  ["16-admin-participantes", "admin/participantes.html", [1280, 375]],
  ["17-admin-participantes-nuevo", "admin/participantes.html#nuevo", [1280]],
  ["18-admin-participantes-ver", "admin/participantes.html#ver-p-01", [1280]],
  ["19-admin-participantes-eliminar", "admin/participantes.html#eliminar-p-01", [1280]],
  ["20-admin-avatares", "admin/avatares.html", [1280]],
  ["21-admin-avatares-nuevo", "admin/avatares.html#nuevo", [1280]],
  ["22-admin-roles", "admin/roles.html", [1280]],
  ["23-admin-roles-nuevo", "admin/roles.html#nuevo", [1280]],
  ["24-admin-zonas", "admin/zonas.html", [1280]],
  ["25-admin-zonas-nuevo", "admin/zonas.html#nuevo", [1280]],
];

// Espera a que terminen las animaciones de entrada; las infinitas o largas (aviso de 6 s) no se esperan: tope de 1.5 s.
const esperarAnimaciones = (tab) => tab.evaluate(() => Promise.race([
  Promise.all(document.getAnimations()
    .filter((a) => a.effect.getTiming().iterations !== Infinity).map((a) => a.finished.catch(() => {}))),
  new Promise((listo) => setTimeout(listo, 1500)),
]));

const url = (p) => "file://" + path.join(RAIZ, p.split("#")[0]) + (p.includes("#") ? "#" + p.split("#")[1] : "");

// Se ejecuta dentro de la página.
function medir() {
  const visible = (el) => {
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && s.visibility !== "hidden" && s.display !== "none";
  };
  const doc = document.documentElement;
  const desborde = doc.scrollWidth - doc.clientWidth;
  const culpables = desborde > 0
    ? [...document.querySelectorAll("body *")].filter((el) => visible(el) && el.getBoundingClientRect().right > doc.clientWidth + 1)
        .slice(0, 5).map((el) => el.tagName.toLowerCase() + (el.className ? "." + String(el.className).split(" ")[0] : ""))
    : [];
  const imagenesRotas = [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.getAttribute("src"));
  const sinLabel = [...document.querySelectorAll("input, select, textarea")]
    .filter((c) => c.type !== "hidden" && !c.labels.length && !c.getAttribute("aria-label") && !c.getAttribute("aria-labelledby"))
    .map((c) => c.id || c.name || c.outerHTML.slice(0, 60));
  const niveles = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) => +h.tagName[1]);
  const saltos = niveles.filter((n, i) => i > 0 && n > niveles[i - 1] + 1).length;
  return { desborde, culpables, imagenesRotas, sinLabel, h1: niveles.filter((n) => n === 1).length, saltos };
}

// Foco visible del elemento activo: contorno, sombra o cambio de fondo/borde respecto a su estado sin foco.
function focoActual() {
  const el = document.activeElement;
  if (!el || el === document.body) return null;
  const s = getComputedStyle(el);
  const conContorno = s.outlineStyle !== "none" && parseFloat(s.outlineWidth) > 0;
  const conSombra = s.boxShadow !== "none";
  // Un radio/checkbox oculto muestra el foco en su <label> (D15).
  const label = el.labels && el.labels[0];
  const ls = label && getComputedStyle(label);
  const enLabel = !!ls && ((ls.outlineStyle !== "none" && parseFloat(ls.outlineWidth) > 0) || ls.boxShadow !== "none");
  // Las tarjetas clicables dibujan el anillo en la tarjeta con :has() (componentes.css).
  let enAncestro = false;
  for (let p = el.parentElement, i = 0; p && i < 4 && !enAncestro; p = p.parentElement, i++) {
    const ps = getComputedStyle(p);
    enAncestro = ps.outlineStyle !== "none" && parseFloat(ps.outlineWidth) > 0;
  }
  const desc = el.tagName.toLowerCase() + (el.id ? "#" + el.id : "") + (el.getAttribute("href") ? `[href=${el.getAttribute("href")}]` : "");
  return { desc, visible: conContorno || conSombra || enLabel || enAncestro };
}

(async () => {
  fs.mkdirSync(CAPTURAS, { recursive: true });
  const navegador = await chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME } : {});
  const resultados = { fecha: new Date().toISOString(), navegador: navegador.version(), paginas: {}, capturas: [] };

  for (const pagina of PAGINAS) {
    resultados.paginas[pagina] = {};
    for (const ancho of ANCHOS) {
      const ctx = await navegador.newContext({ viewport: { width: ancho, height: 900 } });
      const tab = await ctx.newPage();
      const errores = [];
      tab.on("pageerror", (e) => errores.push(String(e)));
      tab.on("requestfailed", (r) => errores.push("recurso: " + r.url()));
      await tab.goto(url(pagina));
      await esperarAnimaciones(tab);
      const m = await tab.evaluate(medir);
      m.errores = errores;
      if (ancho === 1280) {
        // Recorrido con Tab hasta volver al inicio o 200 pasos.
        const pasos = [];
        for (let i = 0; i < 200; i++) {
          await tab.keyboard.press("Tab");
          const f = await tab.evaluate(focoActual);
          if (!f || (pasos.length && f.desc === pasos[0].desc)) break;
          pasos.push(f);
        }
        m.tabulables = pasos.length;
        m.sinFocoVisible = [...new Set(pasos.filter((p) => !p.visible).map((p) => p.desc))];
      }
      resultados.paginas[pagina][ancho] = m;
      await ctx.close();
    }
  }

  for (const [nombre, destino, anchos, pulsar] of CAPTURAS_LISTA) {
    for (const ancho of anchos) {
      const ctx = await navegador.newContext({ viewport: { width: ancho, height: ancho === 375 ? 812 : 900 } });
      const tab = await ctx.newPage();
      await tab.emulateMedia({ reducedMotion: "reduce" });
      await tab.goto(url(destino));
      if (pulsar) await tab.click(pulsar);
      await esperarAnimaciones(tab);
      const archivo = `${nombre}-${ancho}.png`;
      // La visita y los paneles :target se capturan en la vista, el resto a página completa.
      await tab.screenshot({ path: path.join(CAPTURAS, archivo), fullPage: !destino.includes("#") && !destino.startsWith("recorrido.html") });
      resultados.capturas.push({ archivo, destino, ancho });
      await ctx.close();
    }
  }
  await navegador.close();

  fs.writeFileSync(path.join(SALIDA, "resultados.json"), JSON.stringify(resultados, null, 2) + "\n");
  for (const [p, porAncho] of Object.entries(resultados.paginas)) {
    for (const [a, m] of Object.entries(porAncho)) {
      const fallas = [
        m.desborde > 0 && `desborde ${m.desborde}px (${m.culpables.join(", ")})`,
        m.imagenesRotas.length && `imágenes rotas: ${m.imagenesRotas}`,
        m.sinLabel.length && `sin label: ${m.sinLabel}`,
        m.h1 !== 1 && `${m.h1} h1`,
        m.saltos && `${m.saltos} saltos de encabezado`,
        m.errores.length && `errores: ${m.errores}`,
        m.sinFocoVisible && m.sinFocoVisible.length && `sin foco visible: ${m.sinFocoVisible}`,
      ].filter(Boolean);
      console.log(`${p} @${a}: ${fallas.length ? fallas.join(" | ") : "OK"}${m.tabulables != null ? ` (${m.tabulables} tabulables)` : ""}`);
    }
  }
  console.log(`${resultados.capturas.length} capturas en docs/evidencia/capturas/`);
})();
