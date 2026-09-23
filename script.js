/* ==========================================================================
   PORTOFOLIO ONLINE - IRFAN PRIYADI NURFAUZI
   Interactive JavaScript for Minimalist Editorial Theme
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. THEME SWITCHER (STONE / DARK CHARCOAL) ---
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeLabel = document.getElementById('theme-label');
  const savedTheme = localStorage.getItem('ipn-theme-style') || 'stone';

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (themeLabel) themeLabel.textContent = 'DARK';
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (themeLabel) themeLabel.textContent = 'STONE';
    }
    localStorage.setItem('ipn-theme-style', theme);
  }

  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const nextTheme = isDark ? 'stone' : 'dark';
      applyTheme(nextTheme);
      showToast(nextTheme === 'dark' ? 'Mode Dark Charcoal aktif' : 'Mode Warm Stone aktif');
    });
  }

  // --- 2. DRAWER MENU NAVIGATION ---
  const menuBtn = document.getElementById('menu-btn');
  const menuCloseBtn = document.getElementById('menu-close-btn');
  const menuDrawer = document.getElementById('menu-drawer');
  const menuBackdrop = document.getElementById('menu-backdrop');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openMenu() {
    if (menuDrawer && menuBackdrop) {
      menuDrawer.classList.add('open');
      menuBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMenu() {
    if (menuDrawer && menuBackdrop) {
      menuDrawer.classList.remove('open');
      menuBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (menuBtn) menuBtn.addEventListener('click', openMenu);
  if (menuCloseBtn) menuCloseBtn.addEventListener('click', closeMenu);
  if (menuBackdrop) menuBackdrop.addEventListener('click', closeMenu);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // --- 3. TOAST NOTIFICATION & COPY PHONE ---
  const toast = document.getElementById('toast');
  const copyPhoneBtn = document.getElementById('copy-phone-btn');
  let toastTimer;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', () => {
      const phone = '085694118211';
      navigator.clipboard.writeText(phone).then(() => {
        showToast('Nomor WhatsApp disalin: 085694118211');
      }).catch(() => {
        const input = document.createElement('input');
        input.value = phone;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        showToast('Nomor WhatsApp disalin: 085694118211');
      });
    });
  }

  // --- 4. SMOOTH SCROLL FOR IN-PAGE ANCHORS ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    });
  });
});
