/* ==========================================================================
   PASTA FORMA — Global Modal System
   ========================================================================== */

(function () {
  'use strict';

  function initModals() {
    const backdrop = document.querySelector('.modal-backdrop');
    if (!backdrop) return;

    const modalTitle = backdrop.querySelector('.modal-title');
    const modalBody = backdrop.querySelector('.modal-body-content');
    const closeBtn = backdrop.querySelector('.modal-close-btn');

    const modalTemplates = {
      order: {
        title: "Tell Us What You're Looking For",
        content: `
          <form class="modal-form" id="orderModalForm">
            <div class="form-group">
              <label class="form-label" for="modalName">Full Name *</label>
              <input type="text" id="modalName" class="form-input" required placeholder="e.g. Marco Rossi">
              <span class="error-msg">Please enter your name</span>
            </div>
            <div class="form-group">
              <label class="form-label" for="modalEmail">Email Address *</label>
              <input type="email" id="modalEmail" class="form-input" required placeholder="e.g. marco@example.com">
              <span class="error-msg">Please enter a valid email</span>
            </div>
            <div class="form-group">
              <label class="form-label" for="modalType">Enquiry Type</label>
              <select id="modalType" class="form-select">
                <option value="fresh-pasta">Fresh Handmade Pasta</option>
                <option value="house-sauce">House Sauces</option>
                <option value="deli-items">Deli Specialties</option>
                <option value="general">General Enquiry</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label" for="modalMsg">Message or Request Notes *</label>
              <textarea id="modalMsg" class="form-textarea" rows="3" required placeholder="Tell us about the shapes or quantities you are looking for..."></textarea>
              <span class="error-msg">Please enter your message</span>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%;">Send Enquiry →</button>
          </form>
        `
      },
      catering: {
        title: "Plan Your Pasta Table",
        content: `
          <form class="modal-form" id="cateringModalForm">
            <div class="form-group">
              <label class="form-label" for="catName">Full Name *</label>
              <input type="text" id="catName" class="form-input" required placeholder="e.g. Elena Vance">
            </div>
            <div class="form-group">
              <label class="form-label" for="catEmail">Email Address *</label>
              <input type="email" id="catEmail" class="form-input" required placeholder="e.g. elena@example.com">
            </div>
            <div class="form-group">
              <label class="form-label" for="catEvent">Event Type</label>
              <select id="catEvent" class="form-select">
                <option value="private-dinner">Private Dinner</option>
                <option value="family-gathering">Family Celebration</option>
                <option value="office-lunch">Office Lunch</option>
                <option value="special-event">Special Celebration</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label" for="catGuests">Estimated Guest Count</label>
              <input type="number" id="catGuests" class="form-input" min="2" max="200" value="12">
            </div>
            <div class="form-group">
              <label class="form-label" for="catDate">Preferred Date</label>
              <input type="date" id="catDate" class="form-input">
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%;">Continue →</button>
          </form>
        `
      },
      deli: {
        title: "Ask What's Fresh",
        content: `
          <form class="modal-form" id="deliModalForm">
            <div class="form-group">
              <label class="form-label" for="deliName">Full Name *</label>
              <input type="text" id="deliName" class="form-input" required placeholder="e.g. Antonio Conti">
            </div>
            <div class="form-group">
              <label class="form-label" for="deliEmail">Email Address *</label>
              <input type="email" id="deliEmail" class="form-input" required placeholder="e.g. antonio@example.com">
            </div>
            <div class="form-group">
              <label class="form-label" for="deliQuestion">Question or Counter Reserve Request *</label>
              <textarea id="deliQuestion" class="form-textarea" rows="3" required placeholder="Ask about today's fresh pasta shapes, aged cheeses, or antipasti availability..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%;">Send Enquiry →</button>
          </form>
        `
      }
    };

    function openModal(type) {
      const config = modalTemplates[type] || modalTemplates.order;
      if (modalTitle) modalTitle.textContent = config.title;
      if (modalBody) {
        modalBody.innerHTML = config.content;
        attachModalFormSubmit(modalBody.querySelector('form'));
      }
      backdrop.classList.add('is-open');
      backdrop.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      backdrop.classList.remove('is-open');
      backdrop.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    function attachModalFormSubmit(form) {
      if (!form) return;
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        modalBody.innerHTML = `
          <div style="text-align: center; padding: 24px 12px;">
            <div style="font-size: 2.5rem; margin-bottom: 12px;">🍝</div>
            <h3 style="font-family: var(--font-serif); font-size: 1.8rem; margin-bottom: 8px;">Grazie — Enquiry Received</h3>
            <p style="font-size: 0.95rem; opacity: 0.85; margin-bottom: 20px;">
              Your demonstration enquiry has been received locally. A production website would connect this form to the deli's secure enquiry system.
            </p>
            <button class="btn btn-primary modal-done-btn">Close Window</button>
          </div>
        `;
        const doneBtn = modalBody.querySelector('.modal-done-btn');
        if (doneBtn) doneBtn.addEventListener('click', closeModal);
      });
    }

    // Trigger buttons
    document.addEventListener('click', function (e) {
      const trigger = e.target.closest('[data-modal]');
      if (trigger) {
        e.preventDefault();
        const modalType = trigger.getAttribute('data-modal');
        openModal(modalType);
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    backdrop.addEventListener('click', function (e) {
      if (e.target === backdrop) {
        closeModal();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && backdrop.classList.contains('is-open')) {
        closeModal();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', initModals);
})();
