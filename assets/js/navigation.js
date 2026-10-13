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

    // Accordion Toggle for Mobile Dropdowns (Home, Experience)
    mobileDrawer.addEventListener('click', function (e) {
      const toggleBtn = e.target.closest('.mobile-nav-toggle');
      if (toggleBtn) {
        e.preventDefault();
        e.stopPropagation();
        const dropdown = toggleBtn.closest('.mobile-nav-dropdown');
        if (!dropdown) return;

        const isOpen = dropdown.classList.contains('is-open');
        if (isOpen) {
          dropdown.classList.remove('is-open');
          toggleBtn.setAttribute('aria-expanded', 'false');
        } else {
          dropdown.classList.add('is-open');
          toggleBtn.setAttribute('aria-expanded', 'true');
        }
      }
    });

    // Close on navigation link click (regular navigation links only)
    mobileDrawer.querySelectorAll('.mobile-drawer-nav a, .mobile-submenu a').forEach(link => {
      link.addEventListener('click', function () {
        closeDrawer();
      });
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

  // Desktop Dropdown Support (touch and click on tablet landscape / desktop)
  function initDesktopDropdowns() {
    const desktopDropdowns = document.querySelectorAll('.nav-dropdown');
    desktopDropdowns.forEach(dropdown => {
      const toggle = dropdown.querySelector('.dropdown-toggle');
      if (!toggle) return;

      toggle.addEventListener('click', function (e) {
        if (window.innerWidth > 1024) {
          if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            if (!dropdown.classList.contains('is-open')) {
              e.preventDefault();
              desktopDropdowns.forEach(d => {
                if (d !== dropdown) d.classList.remove('is-open');
              });
              dropdown.classList.add('is-open');
              toggle.setAttribute('aria-expanded', 'true');
            }
          }
        }
      });
    });

    document.addEventListener('click', function (e) {
      if (!e.target.closest('.nav-dropdown')) {
        desktopDropdowns.forEach(d => {
          d.classList.remove('is-open');
          const toggle = d.querySelector('.dropdown-toggle');
          if (toggle) toggle.setAttribute('aria-expanded', 'false');
        });
      }
    });
  }

  // Highlight Active Page Link & Manage Dropdowns
  function highlightActiveLink() {
    const rawPath = window.location.pathname;
    const decodedPath = decodeURIComponent(rawPath).replace(/\\/g, '/');
    const pathFilename = decodedPath.substring(decodedPath.lastIndexOf('/') + 1) || 'index.html';

    const isHome1 = pathFilename === 'index.html' || pathFilename === '' || decodedPath.endsWith('/');
    const isHome2 = pathFilename === 'home2.html';
    const isHome = isHome1 || isHome2;

    const isCaseStudies = pathFilename === 'case-studies.html' || pathFilename === 'case studies.html';

    // Highlight desktop links & mobile drawer links
    document.querySelectorAll('.nav-link, .dropdown-link, .mobile-nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href) {
        let isActive = false;
        if (isHome1 && href === 'index.html') {
          isActive = true;
        } else if (isHome2 && href === 'home2.html') {
          isActive = true;
        } else if (isCaseStudies && (href === 'case-studies.html' || href === 'case studies.html')) {
          isActive = true;
        } else if (!isHome && !isCaseStudies && pathFilename === href) {
          isActive = true;
        }

        if (isActive) {
          link.classList.add('active');
          link.setAttribute('aria-current', 'page');
        } else {
          link.classList.remove('active');
          link.removeAttribute('aria-current');
        }
      }
    });

    // Parent dropdown triggers active state if any child link inside is active
    document.querySelectorAll('.nav-dropdown, .mobile-nav-dropdown').forEach(dropdown => {
      const toggle = dropdown.querySelector('.dropdown-toggle, .mobile-nav-toggle');
      const activeChild = dropdown.querySelector('.dropdown-link.active, .mobile-nav-link.active');
      if (toggle) {
        if (activeChild) {
          toggle.classList.add('active');
          if (dropdown.classList.contains('mobile-nav-dropdown')) {
            dropdown.classList.add('is-open');
            toggle.setAttribute('aria-expanded', 'true');
          }
        } else {
          toggle.classList.remove('active');
        }
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
    initDesktopDropdowns();
    highlightActiveLink();
    initStickyHeader();
  });
})();
