// Bilingual toggle (EN/ID) with persistence + browser-language default.
(function () {
  var KEY = "xecurinc-lang";
  var root = document.documentElement;

  function apply(lang) {
    root.classList.remove("lang-en", "lang-id");
    root.classList.add(lang === "id" ? "lang-id" : "lang-en");
    root.setAttribute("lang", lang === "id" ? "id" : "en");
    var btns = document.querySelectorAll("[data-lang-toggle]");
    for (var i = 0; i < btns.length; i++) {
      btns[i].textContent = lang === "id" ? "EN" : "ID";
      btns[i].setAttribute("aria-label", lang === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia");
    }
  }

  var saved;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  var initial = saved || ((navigator.language || "en").toLowerCase().indexOf("id") === 0 ? "id" : "en");
  apply(initial);

  document.addEventListener("click", function (e) {
    var t = e.target.closest ? e.target.closest("[data-lang-toggle]") : null;
    if (!t) return;
    var next = root.classList.contains("lang-id") ? "en" : "id";
    apply(next);
    try { localStorage.setItem(KEY, next); } catch (e2) {}
  });
})();
