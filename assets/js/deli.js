/* ==========================================================================
   PASTA FORMA — Deli Counter Meal Builder
   ========================================================================== */

(function () {
  'use strict';

  function initDeliBuilder() {
    const builderForm = id('deliMealBuilderForm');
    const summaryOutput = id('builderSummaryOutput');
    if (!builderForm || !summaryOutput) return;

    function id(str) { return document.getElementById(str); }

    function updateSummary() {
      const pastaEl = id('stepPasta');
      const sauceEl = id('stepSauce');
      const finishEl = id('stepFinish');

      if (!pastaEl || !sauceEl || !finishEl) return;

      const pasta = pastaEl.options[pastaEl.selectedIndex].text;
      const sauce = sauceEl.options[sauceEl.selectedIndex].text;
      const finish = finishEl.options[finishEl.selectedIndex].text;

      summaryOutput.innerHTML = `
        <div style="font-family: var(--font-serif); font-size: 1.4rem; color: var(--tomato-red); margin-bottom: 6px;">
          ${pasta}
        </div>
        <div style="font-weight: 600; font-size: 1rem; color: var(--text-primary); margin-bottom: 4px;">
          + ${sauce}
        </div>
        <div style="font-size: 0.9rem; color: var(--text-muted);">
          Finished with: ${finish}
        </div>
      `;
    }

    ['stepPasta', 'stepSauce', 'stepFinish'].forEach(stepId => {
      const select = id(stepId);
      if (select) select.addEventListener('change', updateSummary);
    });

    updateSummary();
  }

  function initDeliCardPopups() {
    const cards = document.querySelectorAll('.deli-card-interactive');
    const backdrop = document.querySelector('.modal-backdrop');
    if (!cards.length || !backdrop) return;

    const modalTitle = backdrop.querySelector('.modal-title');
    const modalBody = backdrop.querySelector('.modal-body-content');

    cards.forEach(card => {
      card.addEventListener('click', function (e) {
        // Prevent trigger if clicking an inner link or button
        if (e.target.closest('a') || e.target.closest('button')) return;

        const popupData = card.querySelector('.deli-popup-overlay');
        if (!popupData) return;

        const title = card.querySelector('h4')?.textContent || 'Deli Specialty';
        const img = popupData.querySelector('.deli-popup-img')?.src || '';
        const bodyContent = popupData.querySelector('.deli-popup-body')?.innerHTML || '';
        const eyebrow = popupData.querySelector('.eyebrow')?.textContent || 'SPECIALTY ITEM';

        if (modalTitle) {
          modalTitle.textContent = title;
        }

        if (modalBody) {
          modalBody.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <span class="eyebrow" style="margin-bottom: 0;">${eyebrow}</span>
              ${img ? `<div class="deli-popup-img-wrapper" style="margin-block: 2px 4px; max-height: 150px; overflow: hidden; border-radius: var(--radius-sm);"><img src="${img}" alt="${title}" class="deli-popup-img" style="width: 100%; height: 150px; object-fit: cover;"></div>` : ''}
              <div class="deli-popup-body" style="gap: 6px;">
                ${bodyContent}
              </div>
              <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--border-color);">
                <button class="btn btn-primary" data-modal="deli" style="width: 100%; padding: 10px 16px;">Inquire About Availability →</button>
              </div>
            </div>
          `;
        }

        backdrop.classList.add('is-open');
        backdrop.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      });

      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.click();
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initDeliBuilder();
    initDeliCardPopups();
  });
})();

