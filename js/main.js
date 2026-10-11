// Botón para volver arriba: aparece al bajar un rato.
(function () {
  var btn = document.querySelector(".to-top");
  if (!btn) return;
  function toggle() {
    btn.hidden = window.scrollY < 600;
  }
  window.addEventListener("scroll", toggle, { passive: true });
  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0 });
  });
  toggle();
})();

// Visor de imágenes: abre las capturas encima de la página, con el fondo borroso.
// Sin JS los enlaces siguen abriendo la imagen directamente.
(function () {
  var links = document.querySelectorAll(".shots a");
  if (!links.length) return;

  var overlay = document.createElement("div");
  overlay.className = "lightbox";
  overlay.hidden = true;
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", "Imagen ampliada");
  overlay.innerHTML =
    '<button type="button" class="lightbox-close" aria-label="Cerrar">&times;</button>' +
    '<img class="lightbox-img" alt="">';
  document.body.appendChild(overlay);

  var img = overlay.querySelector(".lightbox-img");
  var closeBtn = overlay.querySelector(".lightbox-close");
  var lastFocus = null;

  function setZoom(on) {
    overlay.classList.toggle("zoomed", on);
    if (on) {
      // Tamaño real de la captura: un zoom suave, sin pixelar.
      img.style.width = img.naturalWidth + "px";
      overlay.scrollLeft = (overlay.scrollWidth - overlay.clientWidth) / 2;
      overlay.scrollTop = 0;
    } else {
      img.style.width = "";
    }
  }

  function open(a) {
    var thumb = a.querySelector("img");
    lastFocus = a;
    img.src = a.getAttribute("href");
    img.alt = thumb ? thumb.alt : "";
    setZoom(false);
    overlay.hidden = false;
    overlay.scrollTop = 0;
    document.body.classList.add("no-scroll");
    closeBtn.focus();
  }

  function close() {
    overlay.hidden = true;
    img.removeAttribute("src");
    document.body.classList.remove("no-scroll");
    if (lastFocus) lastFocus.focus();
  }

  links.forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      open(a);
    });
  });

  // Click en la imagen: zoom. Click fuera de la imagen o en la X: cierra.
  overlay.addEventListener("click", function (e) {
    if (e.target === img) setZoom(!overlay.classList.contains("zoomed"));
    else close();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !overlay.hidden) close();
  });
})();

// Solapas de proyectos: teclado (flechas, Inicio, Fin) y clic.
(function () {
  var tabs = Array.prototype.slice.call(document.querySelectorAll(".tab"));
  if (!tabs.length) return;

  function select(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute("aria-selected", on ? "true" : "false");
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute("aria-controls")).classList.toggle("is-active", on);
    });
    if (focus) tab.focus();
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener("click", function () { select(tab, false); });
    tab.addEventListener("keydown", function (e) {
      var next = null;
      if (e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
      else if (e.key === "ArrowLeft") next = tabs[(i - 1 + tabs.length) % tabs.length];
      else if (e.key === "Home") next = tabs[0];
      else if (e.key === "End") next = tabs[tabs.length - 1];
      if (next) { e.preventDefault(); select(next, true); }
    });
  });
})();

// Luz de pileta: se queda quieta si el visitante prefiere menos movimiento.
(function () {
  var svg = document.querySelector(".caustics");
  if (svg && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches && svg.pauseAnimations) {
    svg.pauseAnimations();
  }
})();
