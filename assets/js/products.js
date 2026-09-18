/* ==========================================================================
   PASTA FORMA — Products & Pairing Interaction System
   ========================================================================== */

(function () {
  'use strict';

  // Interactive Pasta Selector Data
  const PASTA_SHAPES_DATA = {
    tagliatelle: {
      title: "Tagliatelle",
      eyebrow: "LONG EGG RIBBONS",
      desc: "Hand-rolled and cut into silky, golden ribbons. Made with 100% durum wheat semolina and rich pasture-raised egg yolks for a porous texture that holds rich sauces perfectly.",
      bestWith: "Slow-cooked wild boar ragù, traditional Bolognese, rich creamy mushroom reductions",
      image: "assets/images/6.png",
      tag: "Fresh Egg Pasta"
    },
    pappardelle: {
      title: "Pappardelle",
      eyebrow: "WIDE HANDMADE RIBBONS",
      desc: "Broad, generous ribbons of pasta with ruffled edges. Crafted to handle heavy, slow-simmered sauces and game meat ragùs with robust elegance.",
      bestWith: "Braised beef ragù, wild mushroom marsala cream, rich tomato soffritto",
      image: "assets/images/7.png",
      tag: "Artisan Wide Cut"
    },
    ravioli: {
      title: "Ravioli",
      eyebrow: "FILLED PASTA ATELIER",
      desc: "Delicate pasta pillows filled by hand in small batches using creamy sheep milk ricotta, fresh mountain herbs, or roasted pumpkin.",
      bestWith: "Brown butter with fresh sage, light lemon olive oil, delicate tomato passata",
      image: "assets/images/8.png",
      tag: "Hand-Stuffed Daily"
    },
    orecchiette: {
      title: "Orecchiette",
      eyebrow: "RUSTIC SMALL SHAPES",
      desc: "Small ear-shaped pasta hand-pressed with a thumb impression. Its cupped interior traps herb pesto, vegetables, and savory olive oil finishes.",
      bestWith: "Fresh basil pesto, sautéed broccoli rabe with garlic, braised cherry tomato sugo",
      image: "assets/images/9.png",
      tag: "Pugliese Craft"
    },
    gnocchi: {
      title: "Gnocchi",
      eyebrow: "SOFT POTATO DUMPLINGS",
      desc: "Feather-light dumplings crafted from roasted Yukon gold potatoes and minimal flour, hand-ridged across wooden gnocchi boards.",
      bestWith: "Gorgonzola cream, brown butter & crispy sage, fresh San Marzano tomato sauce",
      image: "assets/images/10.png",
      tag: "Hand-Rolled Daily"
    },
    rigatoni: {
      title: "Rigatoni",
      eyebrow: "BRONZE DIE EXTRUDED",
      desc: "Wide ridged tubes extruded through authentic bronze dies, creating a textured surface that catches and holds heavy sauces inside and out.",
      bestWith: "All'Amatriciana, spicy arrabbiata, slow-cooked pork ragù, or roasted garlic cream",
      image: "assets/images/fresh-pasta-shapes.webp",
      tag: "Bronze Extruded"
    }
  };

  // Pasta Selector Tabs Initialization
  function initPastaSelector() {
    const tabs = document.querySelectorAll('.pasta-tab-btn');
    const titleEl = document.querySelector('.pasta-display-title');
    const eyebrowEl = document.querySelector('.pasta-display-eyebrow');
    const descEl = document.querySelector('.pasta-display-desc');
    const bestEl = document.querySelector('.pasta-display-best');
    const imgEl = document.querySelector('.pasta-display-img');
    const tagEl = document.querySelector('.pasta-display-tag');

    if (!tabs.length || !titleEl) return;

    function selectShape(key) {
      const data = PASTA_SHAPES_DATA[key];
      if (!data) return;

      tabs.forEach(btn => {
        if (btn.getAttribute('data-shape') === key) {
          btn.classList.add('active');
          btn.setAttribute('aria-selected', 'true');
        } else {
          btn.classList.remove('active');
          btn.setAttribute('aria-selected', 'false');
        }
      });

      titleEl.textContent = data.title;
      if (eyebrowEl) eyebrowEl.textContent = data.eyebrow;
      if (descEl) descEl.textContent = data.desc;
      if (bestEl) bestEl.textContent = data.bestWith;
      if (tagEl) tagEl.textContent = data.tag;
      if (imgEl) {
        imgEl.style.opacity = '0';
        setTimeout(() => {
          imgEl.src = data.image;
          imgEl.alt = `${data.title} fresh pasta`;
          imgEl.style.opacity = '1';
        }, 150);
      }
    }

    tabs.forEach(btn => {
      btn.addEventListener('click', function () {
        const key = this.getAttribute('data-shape');
        selectShape(key);
      });
    });
  }

  // Interactive Pairing Tool
  function initPairingTool() {
    const pastaSelect = document.getElementById('pairingPasta');
    const sauceSelect = document.getElementById('pairingSauce');
    const resultBox = document.getElementById('pairingResult');

    if (!pastaSelect || !sauceSelect || !resultBox) return;

    const PAIRING_MATRIX = {
      'tagliatelle+tomato': "Classic & Comforting — The silky ribbons coat evenly with slow-simmered San Marzano tomato sauce.",
      'tagliatelle+pesto': "Bright & Fresh — Herbaceous basil pesto clings gracefully to golden tagliatelle strands.",
      'pappardelle+tomato': "Robust & Hearty — Wide ribbons stand up magnificently to rich tomato soffritto.",
      'pappardelle+cream': "Indulgent Atelier Classic — Generous pappardelle ribbons in roasted garlic herb cream sauce.",
      'orecchiette+pesto': "The Chef's Recommendation — The cupped orecchiette pockets trap aromatic basil pesto perfectly.",
      'ravioli+butter': "Pure Sophistication — Delicate stuffed ravioli finished in brown butter and sage.",
      'gnocchi+cream': "Rich & Velvet — Soft potato dumplings nestled in roasted garlic and herbs cream sauce.",
      'gnocchi+tomato': "Neapolitan Tradition — Light fluffy potato gnocchi tossed in slow-cooked San Marzano tomato passata.",
      'rigatoni+tomato': "Roman Classic — Bronze-cut rigatoni filled with hearty slow-simmered tomato soffritto.",
      'rigatoni+cream': "Savory & Coating — Ridged tubes capturing velvety roasted garlic cream sauce in every bite."
    };

    function updatePairing() {
      const pasta = pastaSelect.value;
      const sauce = sauceSelect.value;
      const key = `${pasta}+${sauce}`;
      const text = PAIRING_MATRIX[key] || `Harmonious Combination — ${pastaSelect.options[pastaSelect.selectedIndex].text} paired with ${sauceSelect.options[sauceSelect.selectedIndex].text}.`;

      resultBox.style.opacity = '0';
      setTimeout(() => {
        resultBox.textContent = text;
        resultBox.style.opacity = '1';
      }, 150);
    }

    pastaSelect.addEventListener('change', updatePairing);
    sauceSelect.addEventListener('change', updatePairing);
  }

  document.addEventListener('DOMContentLoaded', function () {
    initPastaSelector();
    initPairingTool();
  });
})();
