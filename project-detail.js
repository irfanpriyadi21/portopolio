/* ==========================================================================
   PROJECT DETAIL PAGE INTERACTIVE LOGIC
   Handles Theme Switching & Interactive Phone Showcase Screen Tabs
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
    });
  }

  // --- 2. INTERACTIVE SCREEN TAB SWITCHING ---
  const phoneScreenImg = document.getElementById('phone-screen-img');
  const phoneScreenCaption = document.getElementById('phone-screen-caption');
  const tabBtns = document.querySelectorAll('.detail-tab-btn');
  const detailPanels = document.querySelectorAll('.detail-screen-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetPanelId = btn.getAttribute('data-target-panel');
      const imgSrc = btn.getAttribute('data-img');
      const imgAlt = btn.getAttribute('data-alt');
      const captionText = btn.getAttribute('data-caption');

      // Update active tab button
      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Update active content panel
      detailPanels.forEach(panel => panel.classList.remove('active'));
      if (targetPanelId) {
        const activePanel = document.getElementById(targetPanelId);
        if (activePanel) activePanel.classList.add('active');
      }

      // Update phone mockup image with smooth cross-fade animation
      if (phoneScreenImg && imgSrc) {
        phoneScreenImg.style.opacity = '0';
        phoneScreenImg.style.transform = 'scale(0.97)';
        setTimeout(() => {
          phoneScreenImg.src = imgSrc;
          if (imgAlt) phoneScreenImg.alt = imgAlt;
          phoneScreenImg.style.opacity = '1';
          phoneScreenImg.style.transform = 'scale(1)';
        }, 180);
      }

      // Update phone caption
      if (phoneScreenCaption && captionText) {
        phoneScreenCaption.innerHTML = captionText;
      }
    });
  });

  // --- 3. TOAST NOTIFICATION & COPY WHATSAPP ---
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
});
