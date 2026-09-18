/* ==========================================================================
   PASTA FORMA — Main Orchestrator, Scroll Reveals & Form Validation
   ========================================================================== */

(function () {
  'use strict';

  // IntersectionObserver Scroll Reveals
  function initScrollReveals() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
  }

  // Form Validation & Local Demo Submission Handler
  function initContactForm() {
    const contactForm = document.getElementById('mainContactForm');
    const successPanel = document.getElementById('contactSuccessPanel');

    if (!contactForm) return;

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      let isValid = true;
      const requiredInputs = contactForm.querySelectorAll('[required]');

      requiredInputs.forEach(input => {
        if (!input.value.trim()) {
          input.classList.add('is-invalid');
          isValid = false;
        } else {
          input.classList.remove('is-invalid');
        }

        if (input.type === 'email' && input.value.trim()) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(input.value.trim())) {
            input.classList.add('is-invalid');
            isValid = false;
          }
        }
      });

      if (isValid) {
        if (successPanel) {
          contactForm.style.display = 'none';
          successPanel.style.display = 'block';
        }
      }
    });

    // Clear invalid state on typing
    contactForm.querySelectorAll('.form-input, .form-textarea').forEach(input => {
      input.addEventListener('input', function () {
        this.classList.remove('is-invalid');
      });
    });
  }

  // Sommelier Pasta & Wine Pairing Matrix Handler
  function initPairingMatrix() {
    const matrix = document.querySelector('.pairing-matrix-wrapper');
    if (!matrix) return;

    const pairingData = {
      ragu: {
        title: "Chianti Classico Riserva DOCG 2019",
        subtitle: "Paired with: Tagliatelle al Ragù di Cinghiale",
        desc: "The vibrant acidity and firm, rustic tannins of wild Sangiovese grapes cut effortlessly through the rich, slow-simmered fats of Tuscan wild boar ragù.",
        notes: "Ripe sour cherry, crushed violets, dried thyme, and toasted oak with a long, savory mineral finish.",
        region: "Tuscany",
        temp: "16° – 18°C",
        grape: "Sangiovese",
        img: "assets/images/6.png"
      },
      ricotta: {
        title: "Vermentino di Sardegna DOC 2021",
        subtitle: "Paired with: Ravioli Ricotta e Limone",
        desc: "Bright Mediterranean citrus, sea-salt minerality, and crisp acidity complement the delicate sweet creaminess of fresh sheep milk ricotta.",
        notes: "Meyer lemon peel, white peach, green apple, wild rosemary, and a subtle saline sea breeze tone.",
        region: "Sardinia",
        temp: "8° – 10°C",
        grape: "Vermentino",
        img: "assets/images/23.png"
      },
      gnocchi: {
        title: "Nebbiolo d'Alba Superiore 2020",
        subtitle: "Paired with: Gnocchi al Gorgonzola & Walnuts",
        desc: "An elegant, structured red with vibrant fruit and silky tannins that balance the intense pungent richness of Gorgonzola fondue.",
        notes: "Wild raspberry, rose petals, black truffle, leather, and dried spice with long elegant persistence.",
        region: "Piedmont",
        temp: "16° – 18°C",
        grape: "Nebbiolo",
        img: "assets/images/24.png"
      },
      sage: {
        title: "Soave Classico Superiore 2022",
        subtitle: "Paired with: Pappardelle Aglio e Crema",
        desc: "Silky texture with notes of toasted almond and white blossom that embrace roasted garlic cream and crispy mountain sage.",
        notes: "Crisp yellow pear, chamomile flower, crushed limestone, and subtle toasted hazelnut richness.",
        region: "Veneto",
        temp: "10° – 12°C",
        grape: "Garganega",
        img: "assets/images/25.png"
      }
    };

    const tabs = matrix.querySelectorAll('.pairing-tab-btn');
    const titleEl = matrix.querySelector('.pairing-wine-title');
    const subtitleEl = matrix.querySelector('.pairing-dish-subtitle');
    const descEl = matrix.querySelector('.pairing-desc');
    const notesEl = matrix.querySelector('.pairing-tasting-notes');
    const regionEl = matrix.querySelector('.pairing-stat-region');
    const tempEl = matrix.querySelector('.pairing-stat-temp');
    const grapeEl = matrix.querySelector('.pairing-stat-grape');
    const imgEl = matrix.querySelector('.pairing-img');

    tabs.forEach(tab => {
      tab.addEventListener('click', function () {
        const key = this.dataset.pair;
        if (!pairingData[key]) return;

        tabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        this.classList.add('active');
        this.setAttribute('aria-selected', 'true');

        const item = pairingData[key];
        if (titleEl) titleEl.textContent = item.title;
        if (subtitleEl) subtitleEl.textContent = item.subtitle;
        if (descEl) descEl.textContent = item.desc;
        if (notesEl) notesEl.textContent = item.notes;
        if (regionEl) regionEl.textContent = item.region;
        if (tempEl) tempEl.textContent = item.temp;
        if (grapeEl) grapeEl.textContent = item.grape;
        if (imgEl) {
          imgEl.src = item.img;
          imgEl.alt = item.subtitle;
        }
      });
    });
  }

  // Floating Back To Top Button Handler
  function initBackToTop() {
    let btn = document.getElementById('backToTopBtn');
    if (!btn) {
      btn = document.createElement('button');
      btn.id = 'backToTopBtn';
      btn.className = 'back-to-top-btn';
      btn.setAttribute('aria-label', 'Back to top');
      btn.setAttribute('title', 'Back to top');
      btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6"/></svg>`;
      document.body.appendChild(btn);
    }

    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        btn.classList.add('is-visible');
      } else {
        btn.classList.remove('is-visible');
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility();

    btn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initScrollReveals();
    initContactForm();
    initPairingMatrix();
    initBackToTop();
  });
})();
