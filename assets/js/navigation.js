/* ==========================================================================
   PASTA FORMA — Navigation & RTL System
   ========================================================================== */

(function () {
  'use strict';

  const RTL_KEY = 'pasta_forma_rtl';

  // RTL System
  function getStoredRTL() {
    return localStorage.getItem(RTL_KEY) === 'true';
  }

  function setRTL(isRTL) {
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    localStorage.setItem(RTL_KEY, isRTL ? 'true' : 'false');
    updateRTLButtons(isRTL);
  }

  function updateRTLButtons(isRTL) {
    const labelText = isRTL ? 'LTR' : 'RTL';
    document.querySelectorAll('.rtl-toggle-btn').forEach(btn => {
      btn.setAttribute('aria-label', `Switch layout to ${labelText}`);
      btn.textContent = labelText;
    });
  }

  function initRTL() {
    const isRTL = getStoredRTL();
    setRTL(isRTL);

    document.addEventListener('click', function (e) {
      const toggleBtn = e.target.closest('.rtl-toggle-btn');
      if (toggleBtn) {
        const currentRTL = document.documentElement.getAttribute('dir') === 'rtl';
        setRTL(!currentRTL);
      }
    });
  }

  // Mobile Drawer Navigation System
  function initMobileDrawer() {
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const mobileDrawer = document.querySelector('.mobile-drawer');
    if (!hamburgerBtn || !mobileDrawer) return;

    let overlay = document.querySelector('.mobile-drawer-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'mobile-drawer-overlay';
      document.body.appendChild(overlay);
    }

    function openDrawer() {
      hamburgerBtn.classList.add('is-active');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
      mobileDrawer.classList.add('is-open');
      overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      hamburgerBtn.classList.remove('is-active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      mobileDrawer.classList.remove('is-open');
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    hamburgerBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      const isOpen = mobileDrawer.classList.contains('is-open');
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    overlay.addEventListener('click', closeDrawer);

    // Close button (X) click listener
    const closeBtn = mobileDrawer.querySelector('.mobile-drawer-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        closeDrawer();
      });
    }

    // Close on navigation link click
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeDrawer);
    });

    // Close on ESC key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('is-open')) {
        closeDrawer();
      }
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (mobileDrawer.classList.contains('is-open') &&
          !mobileDrawer.contains(e.target) &&
          !hamburgerBtn.contains(e.target)) {
        closeDrawer();
      }
    });
  }

  // Highlight Active Page Link
  function highlightActiveLink() {
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href && (currentPath.endsWith(href) || (href === 'index.html' && (currentPath === '/' || currentPath.endsWith('/'))))) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  }

  // Always-Fixed Sticky Header Handler
  function initStickyHeader() {
    const navbar = document.querySelector('.site-navbar');
    if (!navbar) return;

    function onScroll() {
      if (window.scrollY > 20) {
        navbar.classList.add('is-scrolled');
      } else {
        navbar.classList.remove('is-scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  document.addEventListener('DOMContentLoaded', function () {
    initRTL();
    initMobileDrawer();
    highlightActiveLink();
    initStickyHeader();
  });
})();
