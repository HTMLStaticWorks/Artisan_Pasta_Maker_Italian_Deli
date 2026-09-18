/* ==========================================================================
   PASTA FORMA — Theme System (Light / Dark Mode with localStorage)
   ========================================================================== */

(function () {
  'use strict';

  const THEME_KEY = 'pasta_forma_theme';

  function getStoredTheme() {
    return localStorage.getItem(THEME_KEY) || 'light';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    updateToggleButtons(theme);
  }

  function updateToggleButtons(theme) {
    const isDark = theme === 'dark';
    const labelText = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';

    document.querySelectorAll('.control-btn.theme-toggle-btn').forEach(btn => {
      btn.setAttribute('aria-label', labelText);
      btn.setAttribute('title', labelText);
      btn.innerHTML = isDark
        ? '<span aria-hidden="true">☀️</span>'
        : '<span aria-hidden="true">🌙</span>';
    });

    document.querySelectorAll('.mobile-toggle-btn.theme-toggle-btn').forEach(btn => {
      btn.setAttribute('aria-label', labelText);
      btn.innerHTML = isDark
        ? '<span aria-hidden="true">☀️ Switch Theme</span>'
        : '<span aria-hidden="true">🌙 Switch Theme</span>';
    });
  }

  function initTheme() {
    const savedTheme = getStoredTheme();
    setTheme(savedTheme);

    document.addEventListener('click', function (e) {
      const toggleBtn = e.target.closest('.theme-toggle-btn');
      if (toggleBtn) {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(nextTheme);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }
})();
