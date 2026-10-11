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

  function open(a) {
    var thumb = a.querySelector("img");
    lastFocus = a;
    img.src = a.getAttribute("href");
    img.alt = thumb ? thumb.alt : "";
    overlay.hidden = false;
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

  // Click fuera de la imagen (o en la X) cierra.
  overlay.addEventListener("click", function (e) {
    if (e.target !== img) close();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !overlay.hidden) close();
  });
})();
