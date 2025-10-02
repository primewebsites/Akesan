document.addEventListener("DOMContentLoaded", function() {
  /* =========================
     CLIENTES - Scroll Lateral
     ========================= */
  const clientContainer = document.querySelector('.clients-logos');
  const prevBtn = document.querySelector('.client-nav.prev');
  const nextBtn = document.querySelector('.client-nav.next');
  const scrollStep = 200; // pixels por clique

  if (nextBtn && prevBtn && clientContainer) {
    nextBtn.addEventListener('click', () => {
      clientContainer.scrollBy({ left: scrollStep, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
      clientContainer.scrollBy({ left: -scrollStep, behavior: 'smooth' });
    });
  }

  /* =========================
     BOTÃO SUBIR AO TOPO
     ========================= */
  const scrollBtn = document.getElementById("scrollTopBtn");

  if (scrollBtn) {
    const toggleScrollBtn = () => {
      if (window.scrollY > 50) { // mais sensível que antes
        scrollBtn.classList.add("show");
      } else {
        scrollBtn.classList.remove("show");
      }
    };

    // Checa visibilidade ao carregar e ao rolar
    toggleScrollBtn();
    window.addEventListener("scroll", toggleScrollBtn);

    // Scroll suave ao topo
    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
document.addEventListener("DOMContentLoaded", function() {
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
    // Exemplo: lazy animations, header sticky, etc.
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
    if (!img.alt) img.alt = 'Imagem do site'; // alt padrão
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
     Outras otimizações futuras
     ========================= */
  // Aqui você pode adicionar funções para:
  // - Minificar CSS/JS inline (runtime)
  // - Compressão de imagens em base64 apenas sob demanda
  // - Tracking de performance (LCP, FID, CLS)
});
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

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});
