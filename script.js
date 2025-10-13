document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     CLIENTES - Scroll Lateral 2 logos por clique
  ========================= */
  const clientSections = document.querySelectorAll('.clients-wrapper');

  clientSections.forEach(wrapper => {
    const container = wrapper.querySelector('.clients-container');
    const logosContainer = wrapper.querySelector('.clients-logos');
    const prevBtn = wrapper.querySelector('.client-nav.prev');
    const nextBtn = wrapper.querySelector('.client-nav.next');
    let scrollAmount = 0;

    if (container && logosContainer && prevBtn && nextBtn) {
      // Calcula a largura de um logo incluindo gap
      const firstLogo = logosContainer.children[0];
      const logoStyle = window.getComputedStyle(firstLogo);
      const logoGap = parseInt(window.getComputedStyle(logosContainer).gap) || 50;
      const logoWidth = firstLogo.offsetWidth + logoGap;

      // Scroll de 2 logos por clique
      const scrollStep = logoWidth * 2;
      const maxScroll = logosContainer.scrollWidth - container.clientWidth;

      nextBtn.addEventListener("click", () => {
        scrollAmount += scrollStep;
        if(scrollAmount > maxScroll) scrollAmount = maxScroll;
        container.scrollTo({ left: scrollAmount, behavior: "smooth" });
      });

      prevBtn.addEventListener("click", () => {
        scrollAmount -= scrollStep;
        if(scrollAmount < 0) scrollAmount = 0;
        container.scrollTo({ left: scrollAmount, behavior: "smooth" });
      });
    } else {
      console.warn("⚠️ Navegação de clientes não encontrada neste wrapper.");
    }
  });

  /* =========================
     BOTÃO SUBIR AO TOPO
  ========================= */
  const scrollBtn = document.getElementById("scrollTopBtn");

  if (scrollBtn) {
    const toggleScrollBtn = () => {
      if (window.scrollY > 50) scrollBtn.classList.add("show");
      else scrollBtn.classList.remove("show");
    };

    toggleScrollBtn();
    window.addEventListener("scroll", toggleScrollBtn);

    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* =========================
     Lazy Load de Imagens
  ========================= */
  const lazyImages = document.querySelectorAll('img[data-src]');
  const lazyObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  }, { rootMargin: "0px 0px 200px 0px", threshold: 0.1 });

  lazyImages.forEach(img => lazyObserver.observe(img));

  /* =========================
     Scroll Suave para Âncoras
  ========================= */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* =========================
     Debounce/Throttle Helper
  ========================= */
  const throttle = (func, limit) => {
    let lastFunc;
    let lastRan;
    return function() {
      const context = this;
      const args = arguments;
      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(function() {
          if ((Date.now() - lastRan) >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  };

  /* =========================
     Otimização de Scroll Events
  ========================= */
  const scrollHandler = () => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
        el.classList.add('animated');
      }
    });
  };
  window.addEventListener('scroll', throttle(scrollHandler, 100));

  /* =========================
     Acessibilidade e SEO Simples
  ========================= */
  document.querySelectorAll('img').forEach(img => {
    if (!img.alt) img.alt = 'Imagem do site';
  });

  /* =========================
     Pré-carregamento de fontes críticas
  ========================= */
  const preloadFonts = () => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.href = '/fonts/SegoeUI.woff2'; // ajustar caminho
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  };
  preloadFonts();

  /* =========================
     Fade-In de Elementos
  ========================= */
  const faders = document.querySelectorAll('.fade-in');
  const appearOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
  };
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, appearOptions);
  faders.forEach(fader => appearOnScroll.observe(fader));
});
