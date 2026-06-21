/* ============================================================================
   JC Escapamentos — front-end behavior
   Vanilla JS, no dependencies. Every DOM lookup is guarded.
   ========================================================================== */
(function () {
  "use strict";

  /* ---- sticky nav: add .scrolled past a threshold ---- */
  var nav = document.querySelector(".nav");
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle("scrolled", window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- mobile menu toggle ---- */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  if (toggle && links) {
    var setMenu = function (open) {
      toggle.classList.toggle("open", open);
      links.classList.toggle("open", open);
      document.body.classList.toggle("menu-open", open); // lock background scroll
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    };
    toggle.addEventListener("click", function () {
      setMenu(!links.classList.contains("open"));
    });
    // close when a link is tapped
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    // close when tapping anywhere outside the nav
    document.addEventListener("click", function (e) {
      if (links.classList.contains("open") && !e.target.closest(".nav")) setMenu(false);
    });
    // close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setMenu(false);
    });
    // never leave the mobile menu stuck open when resizing up to desktop
    window.addEventListener("resize", function () {
      if (window.innerWidth > 760 && links.classList.contains("open")) setMenu(false);
    });
  }

  /* ---- scroll-reveal ---- */
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add("visible"); });
    }
  }

  /* ---- hero video playlist: cycle through drone clips ---- */
  var heroVideo = document.querySelector(".hero__video");
  if (heroVideo) {
    var playlist = [
      "videos/drone-2.mp4",
      "videos/drone-3.mp4",
      "videos/drone-1.mp4",
      "videos/hero-2.mp4",
      "videos/hero-1.mp4"
    ];
    var currentIdx = 0;
    heroVideo.addEventListener("ended", function () {
      currentIdx = (currentIdx + 1) % playlist.length;
      heroVideo.src = playlist[currentIdx];
      heroVideo.play().catch(function () {});
    });
  }

  /* ---- dynamic footer year ---- */
  var year = document.getElementById("ano");
  if (year) year.textContent = String(new Date().getFullYear());

})();
