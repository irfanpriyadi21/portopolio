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

  // --- 5. PROJECT DETAIL MODAL: MY ALQURAN MOBILE APP ---
  const openMuslimModalBtn = document.getElementById('open-muslim-modal-btn');
  const muslimModal = document.getElementById('muslim-modal');
  const muslimModalBackdrop = document.getElementById('muslim-modal-backdrop');
  const muslimModalCloseBtn = document.getElementById('muslim-modal-close-btn');
  const muslimModalCloseFooterBtn = document.getElementById('muslim-modal-close-footer-btn');

  const phoneScreenImg = document.getElementById('modal-phone-screen-img');
  const phoneScreenCaption = document.getElementById('modal-screen-caption');
  const screenTabBtns = document.querySelectorAll('.screen-tab-btn');
  const screenPanels = document.querySelectorAll('.screen-detail-panel');

  const screenMetadata = {
    'dashboard': {
      img: 'assets/images/project-muslim-dashboard.jpg',
      alt: 'Preview Layar Beranda My Alquran App',
      caption: '<strong>Layar Beranda / Dashboard</strong> &mdash; Jam digital, penanggalan Hijriyah, 8 menu cepat, dan kutipan ayat harian.'
    },
    'quran-list': {
      img: 'assets/images/project-muslim-quran-list.jpg',
      alt: 'Preview Indeks 114 Surah Al-Qur\'an',
      caption: '<strong>Indeks &amp; Katalog 114 Surah</strong> &mdash; Live search, filter Makkiyyah/Madaniyyah, dan kaligrafi nama surat.'
    },
    'quran-detail': {
      img: 'assets/images/project-muslim-quran-detail.jpg',
      alt: 'Preview Pembaca Ayat & Audio Murottal',
      caption: '<strong>Baca Ayat &amp; Murottal</strong> &mdash; Teks Arab tajam, transliterasi Latin, terjemahan, audio player, dan bookmark.'
    },
    'profile': {
      img: 'assets/images/project-muslim-profile.jpg',
      alt: 'Preview Profil Pengguna & Dark Mode',
      caption: '<strong>Profil &amp; Pengaturan</strong> &mdash; Sakelar Dark Mode, pengaturan bahasa antarmuka, dan privasi.'
    }
  };

  function openMuslimModal() {
    if (muslimModal && muslimModalBackdrop) {
      muslimModal.classList.add('open');
      muslimModalBackdrop.classList.add('open');
      muslimModal.setAttribute('aria-hidden', 'false');
      muslimModalBackdrop.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMuslimModal() {
    if (muslimModal && muslimModalBackdrop) {
      muslimModal.classList.remove('open');
      muslimModalBackdrop.classList.remove('open');
      muslimModal.setAttribute('aria-hidden', 'true');
      muslimModalBackdrop.setAttribute('aria-hidden', 'true');
      // Only restore scroll if drawer menu is not open
      if (!menuDrawer || !menuDrawer.classList.contains('open')) {
        document.body.style.overflow = '';
      }
    }
  }

  if (openMuslimModalBtn) openMuslimModalBtn.addEventListener('click', openMuslimModal);
  if (muslimModalCloseBtn) muslimModalCloseBtn.addEventListener('click', closeMuslimModal);
  if (muslimModalCloseFooterBtn) muslimModalCloseFooterBtn.addEventListener('click', closeMuslimModal);
  if (muslimModalBackdrop) muslimModalBackdrop.addEventListener('click', closeMuslimModal);

  // Keyboard accessibility (Escape key to close modal)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (muslimModal && muslimModal.classList.contains('open')) {
        closeMuslimModal();
      } else if (menuDrawer && menuDrawer.classList.contains('open')) {
        closeMenu();
      }
    }
  });

  // Interactive Screen Tab Switching
  screenTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const screenKey = btn.getAttribute('data-screen');
      if (!screenKey || !screenMetadata[screenKey]) return;

      // Update button state
      screenTabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Update active panel
      screenPanels.forEach(panel => panel.classList.remove('active'));
      const activePanel = document.getElementById(`panel-${screenKey}`);
      if (activePanel) activePanel.classList.add('active');

      // Update phone screen with smooth transition
      if (phoneScreenImg) {
        phoneScreenImg.style.opacity = '0';
        phoneScreenImg.style.transform = 'scale(0.97)';
        setTimeout(() => {
          phoneScreenImg.src = screenMetadata[screenKey].img;
          phoneScreenImg.alt = screenMetadata[screenKey].alt;
          phoneScreenImg.style.opacity = '1';
          phoneScreenImg.style.transform = 'scale(1)';
        }, 180);
      }

      // Update caption
      if (phoneScreenCaption) {
        phoneScreenCaption.innerHTML = screenMetadata[screenKey].caption;
      }
    });
  });

  // --- 6. PROJECT DETAIL MODAL: WEATHER & DISASTER MONITORING APP ---
  const openWeatherModalBtn = document.getElementById('open-weather-modal-btn');
  const weatherModal = document.getElementById('weather-modal');
  const weatherModalBackdrop = document.getElementById('weather-modal-backdrop');
  const weatherModalCloseBtn = document.getElementById('weather-modal-close-btn');
  const weatherModalCloseFooterBtn = document.getElementById('weather-modal-close-footer-btn');

  const weatherPhoneScreenImg = document.getElementById('weather-modal-phone-screen-img');
  const weatherPhoneScreenCaption = document.getElementById('weather-modal-screen-caption');
  const weatherTabBtns = document.querySelectorAll('.weather-tab-btn');
  const weatherPanels = document.querySelectorAll('.weather-detail-panel');

  const weatherScreenMetadata = {
    'dashboard': {
      img: 'assets/images/project-weather-dashboard.jpg',
      alt: 'Preview Layar Cuaca & BMKG',
      caption: '<strong>Layar Perkiraan Cuaca &amp; BMKG</strong> &mdash; Suhu real-time 30°C, peringatan dini BMKG, kelembapan, angin, UV, dan radar kebencanaan.'
    },
    'airquality': {
      img: 'assets/images/project-weather-airquality.jpg',
      alt: 'Preview Indeks Kualitas Udara AQI',
      caption: '<strong>Kualitas Udara &amp; Polusi PM2.5</strong> &mdash; Skor AQI 96 Sedang, rekomendasi masker, ventilasi ruangan, dan peringkat polusi kota.'
    },
    'volcano': {
      img: 'assets/images/project-weather-volcano.jpg',
      alt: 'Preview Peta Satelit Gunung Berapi PVMBG',
      caption: '<strong>Pantauan 69+ Gunung Berapi PVMBG</strong> &mdash; 4 Level status resmi, peta satelit GIS, notifikasi VONA, koordinat, dan radius bahaya kawah.'
    }
  };

  function openWeatherModal() {
    if (weatherModal && weatherModalBackdrop) {
      weatherModal.classList.add('open');
      weatherModalBackdrop.classList.add('open');
      weatherModal.setAttribute('aria-hidden', 'false');
      weatherModalBackdrop.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeWeatherModal() {
    if (weatherModal && weatherModalBackdrop) {
      weatherModal.classList.remove('open');
      weatherModalBackdrop.classList.remove('open');
      weatherModal.setAttribute('aria-hidden', 'true');
      weatherModalBackdrop.setAttribute('aria-hidden', 'true');
      if (!menuDrawer || !menuDrawer.classList.contains('open')) {
        document.body.style.overflow = '';
      }
    }
  }

  if (openWeatherModalBtn) openWeatherModalBtn.addEventListener('click', openWeatherModal);
  if (weatherModalCloseBtn) weatherModalCloseBtn.addEventListener('click', closeWeatherModal);
  if (weatherModalCloseFooterBtn) weatherModalCloseFooterBtn.addEventListener('click', closeWeatherModal);
  if (weatherModalBackdrop) weatherModalBackdrop.addEventListener('click', closeWeatherModal);

  // Extend keyboard accessibility for Weather Modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (weatherModal && weatherModal.classList.contains('open')) {
        closeWeatherModal();
      }
    }
  });

  // Weather Screen Tab Switching
  weatherTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const screenKey = btn.getAttribute('data-weather-screen');
      if (!screenKey || !weatherScreenMetadata[screenKey]) return;

      // Update active button
      weatherTabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Update active panel
      weatherPanels.forEach(panel => panel.classList.remove('active'));
      const activePanel = document.getElementById(`weather-panel-${screenKey}`);
      if (activePanel) activePanel.classList.add('active');

      // Update phone screen with smooth transition
      if (weatherPhoneScreenImg) {
        weatherPhoneScreenImg.style.opacity = '0';
        weatherPhoneScreenImg.style.transform = 'scale(0.97)';
        setTimeout(() => {
          weatherPhoneScreenImg.src = weatherScreenMetadata[screenKey].img;
          weatherPhoneScreenImg.alt = weatherScreenMetadata[screenKey].alt;
          weatherPhoneScreenImg.style.opacity = '1';
          weatherPhoneScreenImg.style.transform = 'scale(1)';
        }, 180);
      }

      // Update caption
      if (weatherPhoneScreenCaption) {
        weatherPhoneScreenCaption.innerHTML = weatherScreenMetadata[screenKey].caption;
      }
    });
  });
});

