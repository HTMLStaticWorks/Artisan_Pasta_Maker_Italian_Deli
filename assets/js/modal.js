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
        title: "Fresh Pasta Order & Reservation",
        content: `
          <div style="background: rgba(46, 117, 89, 0.1); border: 1px solid rgba(46, 117, 89, 0.3); padding: 10px 14px; border-radius: var(--radius-sm); margin-bottom: var(--space-md); font-size: 0.82rem; display: flex; align-items: center; justify-content: space-between;">
            <span style="display: inline-flex; align-items: center; gap: 6px; font-weight: 700; color: #2e7559;">
              <span style="width: 8px; height: 8px; background: #2e7559; border-radius: 50%; display: inline-block;"></span>
              Fresh Batches Ready Today
            </span>
            <span style="opacity: 0.85;">Pickup: 11:00 AM – 7:30 PM</span>
          </div>

          <form class="modal-form" id="orderModalForm">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-sm);">
              <div class="form-group">
                <label class="form-label" for="modalName">Full Name *</label>
                <input type="text" id="modalName" class="form-input" required placeholder="e.g. Marco Rossi">
                <span class="error-msg">Please enter your name</span>
              </div>
              <div class="form-group">
                <label class="form-label" for="modalPhone">Phone Number *</label>
                <input type="tel" id="modalPhone" class="form-input" required placeholder="e.g. +1 (555) 019-2834">
                <span class="error-msg">Please enter your phone number</span>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="modalEmail">Email Address *</label>
              <input type="email" id="modalEmail" class="form-input" required placeholder="e.g. marco@example.com">
              <span class="error-msg">Please enter a valid email</span>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-sm);">
              <div class="form-group">
                <label class="form-label" for="fulfillmentType">Fulfilment Option *</label>
                <select id="fulfillmentType" class="form-select">
                  <option value="pickup">🛍️ Atelier Counter Pickup (Free)</option>
                  <option value="delivery">🚚 Local Delivery (€4.50 / Free > €35)</option>
                  <option value="reservation">🍝 Pasta Bar Counter Seat</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label" for="timeSlot">Collection / Delivery Time *</label>
                <select id="timeSlot" class="form-select">
                  <option value="11:30">11:30 AM – 12:30 PM</option>
                  <option value="13:00">1:00 PM – 2:30 PM</option>
                  <option value="17:00">5:00 PM – 6:30 PM</option>
                  <option value="19:00">7:00 PM – 8:00 PM</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="modalProduct">Select Fresh Item / Menu Selection</label>
              <select id="modalProduct" class="form-select">
                <option value="tagliatelle">Tagliatelle Ribbon Cut (€14.50 / kg)</option>
                <option value="pappardelle">Pappardelle Wide Ribbons (€15.00 / kg)</option>
                <option value="ravioli">Wild Mushroom & Ricotta Ravioli (€18.50 / kg)</option>
                <option value="gnocchi">Potato Gnocchi (€13.00 / kg)</option>
                <option value="pomodoro">Classic Tomato & Basil Sauce (€7.50 / 500g)</option>
                <option value="truffle">Truffle & Butter Spread (€9.50 / 200g)</option>
                <option value="custom">Custom Order / Mixed Deli Box</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" for="modalMsg">Quantity or Special Instructions</label>
              <textarea id="modalMsg" class="form-textarea" rows="2" placeholder="Specify quantities (e.g. 500g Tagliatelle + 1 jar sauce) or dietary requirements..."></textarea>
            </div>

            <div style="background: var(--bg-card); border: 1px solid var(--border-color); padding: 12px; border-radius: var(--radius-sm); margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center; font-size: 0.9rem;">
              <span>Estimated Order Status:</span>
              <strong style="color: var(--tomato-red);">In Stock & Ready for Order</strong>
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%;">Confirm Order & Check Schedule →</button>
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
              <div class="date-input-wrapper">
                <input type="date" id="catDate" class="form-input">
                <svg class="calendar-icon-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              </div>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%;">Submit Catering Request →</button>
          </form>
        `
      },
      deli: {
        title: "Ask What's Fresh at the Counter",
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
            <button type="submit" class="btn btn-primary" style="width: 100%;">Send Counter Enquiry →</button>
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
        const timeSlotSelect = form.querySelector('#timeSlot');
        const fulfillmentSelect = form.querySelector('#fulfillmentType');
        const selectedTime = timeSlotSelect ? timeSlotSelect.options[timeSlotSelect.selectedIndex].text : 'Today';
        const selectedFulfillment = fulfillmentSelect ? fulfillmentSelect.options[fulfillmentSelect.selectedIndex].text : 'Atelier Counter Pickup';

        modalBody.innerHTML = `
          <div style="text-align: center; padding: 24px 12px;">
            <div style="font-size: 2.8rem; margin-bottom: 12px;">🍝</div>
            <h3 style="font-family: var(--font-serif); font-size: 1.8rem; margin-bottom: 8px;">Grazie — Order & Schedule Confirmed!</h3>
            <p style="font-size: 0.95rem; opacity: 0.85; margin-bottom: 16px; line-height: 1.5;">
              Your request for <strong>${selectedFulfillment}</strong> scheduled for <strong>${selectedTime}</strong> has been logged.
            </p>
            <div style="background: var(--bg-secondary); padding: 12px; border-radius: var(--radius-sm); border: 1px solid var(--border-color); font-size: 0.85rem; margin-bottom: 20px; text-align: left;">
              <div>📍 <strong>Location:</strong> 142 Via Roma, Pasta District, NY 10012</div>
              <div>📞 <strong>Phone:</strong> +1 (555) 342-7278</div>
              <div>⏰ <strong>Preparation Status:</strong> Preparing fresh batch in atelier</div>
            </div>
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
