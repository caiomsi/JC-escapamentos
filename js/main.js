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

  /* ---- service panel ---- */
  var serviceData = {
    '1': { title: 'Limpeza de catalisadores',       desc: 'Especialistas em limpeza de catalisadores e filtros DPF para caminhões e veículos pesados a diesel. Processo com jato d\'água de alta pressão, sem desmontagem do motor.',        type: 'video', src: 'videos/servico-1.mp4' },
    '2': { title: 'Troca de Pedra/Cerâmica catalítica', desc: 'Substituição do substrato cerâmico do catalisador, restaurando o desempenho do sistema de pós-tratamento. Peças de qualidade e encaixe garantido.',                           type: 'image', src: 'images/troca-ceramica-catalitica.jpg' },
    '3': { title: 'Instalação e manutenção de escapamentos', desc: 'Atendemos toda a linha pesada: caminhões, carretas, ônibus e utilitários diesel. Do conserto emergencial à fabricação e instalação completa do sistema de escapamento.', type: 'image', src: 'images/caminhao-em-servico.jpg' },
    '4': { title: 'Adaptação de Ponteiras Cromadas', desc: 'Fabricação e adaptação de ponteiras cromadas sob medida, com acabamento caprichado e encaixe perfeito para qualquer modelo de caminhão.',                                           type: 'image', src: 'images/ponteiras-cromadas.jpg' }
  };
  var spPanel = document.getElementById('servicePanel');
  var spTitle = document.getElementById('spTitle');
  var spDesc  = document.getElementById('spDesc');
  var spMedia = document.getElementById('spMedia');
  var spClose = document.getElementById('spClose');
  var activeServiceCard = null;
  if (spPanel && spTitle && spMedia) {
    function openPanel(card, svc) {
      spTitle.textContent = svc.title;
      spDesc.textContent  = svc.desc;
      if (svc.type === 'video') {
        spMedia.innerHTML = '<video src="' + svc.src + '" autoplay muted playsinline loop></video>';
      } else {
        spMedia.innerHTML = '<img src="' + svc.src + '" alt="' + svc.title + '" loading="lazy">';
      }
      spPanel.classList.add('service-panel--open');
      setTimeout(function () { spPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, 60);
    }
    function closePanel() {
      spPanel.classList.remove('service-panel--open');
      if (activeServiceCard) { activeServiceCard.classList.remove('active'); activeServiceCard = null; }
      spMedia.innerHTML = '';
    }
    document.querySelectorAll('.service-card').forEach(function (card) {
      card.addEventListener('click', function () {
        var svc = serviceData[card.dataset.service];
        if (!svc) return;
        if (activeServiceCard === card) { closePanel(); return; }
        if (activeServiceCard) activeServiceCard.classList.remove('active');
        activeServiceCard = card;
        card.classList.add('active');
        openPanel(card, svc);
      });
    });
    if (spClose) spClose.addEventListener('click', closePanel);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closePanel(); });
  }

  /* ---- lightbox (gallery only) ---- */
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');
  var lbCap = document.getElementById('lbCap');
  var lbClose = document.getElementById('lbClose');
  if (lb && lbImg && lbClose) {
    function openLb(src, cap) {
      lbImg.src = src;
      lbImg.alt = cap || '';
      if (lbCap) lbCap.textContent = cap || '';
      lb.classList.add('lightbox--open');
      document.body.style.overflow = 'hidden';
    }
    function closeLb() {
      lb.classList.remove('lightbox--open');
      document.body.style.overflow = '';
      lbImg.src = '';
    }
    document.querySelectorAll('.ga').forEach(function (fig) {
      fig.addEventListener('click', function () {
        var img = fig.querySelector('img');
        var cap = fig.querySelector('figcaption');
        if (img) openLb(img.src, cap ? cap.textContent : '');
      });
    });
    lbClose.addEventListener('click', closeLb);
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && lb.classList.contains('lightbox--open')) closeLb(); });
  }

  /* ---- dynamic footer year ---- */
  var year = document.getElementById("ano");
  if (year) year.textContent = String(new Date().getFullYear());

})();
