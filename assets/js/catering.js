/* ==========================================================================
   PASTA FORMA — Catering Occasion Selector & Form Handling
   ========================================================================== */

(function () {
  'use strict';

  const CATERING_OCCASIONS = {
    'private-dinner': {
      title: "Intimate Private Dinner",
      desc: "Designed for small gatherings of 4 to 12 guests. Includes 2 hand-shaped pasta varieties, artisanal house sauce, antipasti board, and finishing parmigiano.",
      menu: "Tagliatelle with Wild Boar Ragù • Delicate Sage Butter Ravioli • Aged Parmigiano & Marinated Olives",
      cta: "Enquire About Private Dining",
      image: "assets/images/21.png"
    },
    'family-celebration': {
      title: "Family Pasta Table",
      desc: "Warm family-style platters served for groups of 10 to 30. Generous portions meant for sharing around a crowded, happy table.",
      menu: "Pappardelle Bolognese • Orecchiette Basil Pesto • Garlic Cream Gnocchi • Artisan Bread & Antipasti",
      cta: "Enquire for Family Gathering",
      image: "assets/images/22.png"
    },
    'office-lunch': {
      title: "Atelier Office Lunch",
      desc: "Easy-to-serve pasta lunches packaged in eco-friendly warm containers for team celebrations and boardroom meetings.",
      menu: "Individual Tagliatelle & Sauce Bowls • Marinated Artichoke Salad • House Rosemary Focaccia",
      cta: "Enquire for Corporate Lunch",
      image: "assets/images/17.png"
    },
    'special-event': {
      title: "Custom Event Atelier",
      desc: "Custom pasta stations, live fresh pasta rolling demonstrations, and tailored deli spreads for weddings and landmark occasions.",
      menu: "Custom Multi-Course Pasta Atelier • Sommelier Wine Pairings • Artisan Cheese & Charcuterie Spread",
      cta: "Discuss Custom Celebration",
      image: "assets/images/20.png"
    }
  };

  function initCateringOccasions() {
    const btns = document.querySelectorAll('.occasion-tab-btn');
    const titleEl = document.getElementById('occasionTitle');
    const descEl = document.getElementById('occasionDesc');
    const menuEl = document.getElementById('occasionMenu');
    const ctaBtn = document.getElementById('occasionCtaBtn');
    const imgEl = document.getElementById('occasionImage');

    if (!btns.length || !titleEl) return;

    function selectOccasion(key) {
      const data = CATERING_OCCASIONS[key];
      if (!data) return;

      btns.forEach(btn => {
        if (btn.getAttribute('data-occasion') === key) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });

      titleEl.textContent = data.title;
      if (descEl) descEl.textContent = data.desc;
      if (menuEl) menuEl.textContent = data.menu;
      if (ctaBtn) ctaBtn.textContent = `${data.cta} →`;
      if (imgEl) {
        imgEl.style.opacity = '0';
        setTimeout(() => {
          imgEl.src = data.image;
          imgEl.style.opacity = '1';
        }, 150);
      }
    }

    btns.forEach(btn => {
      btn.addEventListener('click', function () {
        const key = this.getAttribute('data-occasion');
        selectOccasion(key);
      });
    });
  }

  function initFaqAccordion() {
    const questions = document.querySelectorAll('.faq-question');
    if (!questions.length) return;

    questions.forEach(btn => {
      btn.addEventListener('click', function () {
        const item = this.closest('.faq-item');
        const isActive = item.classList.contains('active');

        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  }

  function initEstimatorTool() {
    const slider = document.getElementById('estimatorGuests');
    const guestVal = document.getElementById('estimatorGuestVal');
    const styleSelect = document.getElementById('estimatorStyle');
    const pastaSelect = document.getElementById('estimatorPrimaryPasta');
    const sauceSelect = document.getElementById('estimatorSecondarySauce');

    const pastaQtyEl = document.getElementById('estPastaQty');
    const sauceQtyEl = document.getElementById('estSauceQty');
    const deliQtyEl = document.getElementById('estDeliQty');
    const focacciaQtyEl = document.getElementById('estFocacciaQty');
    const wineQtyEl = document.getElementById('estWineQty');

    if (!slider || !guestVal || !pastaQtyEl) return;

    function calculateEstimates() {
      const guests = parseInt(slider.value, 10);
      const style = styleSelect ? styleSelect.value : 'family';
      const pastaName = pastaSelect ? pastaSelect.options[pastaSelect.selectedIndex].text : 'Fresh Pasta';
      const sauceName = sauceSelect ? sauceSelect.options[sauceSelect.selectedIndex].text : 'House Sauce';

      guestVal.textContent = `${guests} Guests`;

      let gramsPerGuest = 150;
      let sauceRatio = 0.2;
      let wineFactor = 0.25;

      if (style === 'cocktail') {
        gramsPerGuest = 100;
        sauceRatio = 0.15;
        wineFactor = 0.35;
      } else if (style === 'banquet') {
        gramsPerGuest = 180;
        sauceRatio = 0.25;
        wineFactor = 0.3;
      }

      const totalKg = ((guests * gramsPerGuest) / 1000).toFixed(1);
      const totalJars = Math.ceil(guests * sauceRatio);
      const totalBoards = Math.ceil(guests / 8);
      const totalLoaves = Math.ceil(guests / 7);
      const totalBottles = Math.ceil(guests * wineFactor);

      pastaQtyEl.textContent = `${totalKg} kg ${pastaName}`;
      sauceQtyEl.textContent = `${totalJars} Jars ${sauceName}`;
      deliQtyEl.textContent = `${totalBoards} Grand Antipasti Board${totalBoards > 1 ? 's' : ''}`;
      focacciaQtyEl.textContent = `${totalLoaves} Whole Rosemary Loaf${totalLoaves > 1 ? 'ves' : ''}`;
      wineQtyEl.textContent = `${totalBottles} Bottle${totalBottles > 1 ? 's' : ''} DOCG Wine`;
    }

    slider.addEventListener('input', calculateEstimates);
    if (styleSelect) styleSelect.addEventListener('change', calculateEstimates);
    if (pastaSelect) pastaSelect.addEventListener('change', calculateEstimates);
    if (sauceSelect) sauceSelect.addEventListener('change', calculateEstimates);

    calculateEstimates();
  }


  document.addEventListener('DOMContentLoaded', function () {
    initCateringOccasions();
    initFaqAccordion();
    initEstimatorTool();
  });
})();


