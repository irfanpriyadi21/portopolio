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
    },
    'earthquake': {
      img: 'assets/images/project-weather-dashboard.jpg',
      alt: 'Preview Pantauan Gempa Bumi & Bencana BMKG',
      caption: '<strong>Deteksi Gempa Bumi &amp; Bencana</strong> &mdash; Monitoring gempa M ≥ 5.0, potensi tsunami, titik panas karhutla, dan peringatan darurat.'
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

  // --- 7. PROJECT DETAIL MODAL: IMAGE PARALLAX EXPLORER ---
  const openParallaxModalBtn = document.getElementById('open-parallax-modal-btn');
  const parallaxModal = document.getElementById('parallax-modal');
  const parallaxModalBackdrop = document.getElementById('parallax-modal-backdrop');
  const parallaxModalCloseBtn = document.getElementById('parallax-modal-close-btn');
  const parallaxModalCloseFooterBtn = document.getElementById('parallax-modal-close-footer-btn');

  const parallaxPhoneScreenImg = document.getElementById('parallax-modal-phone-screen-img');
  const parallaxPhoneScreenCaption = document.getElementById('parallax-modal-screen-caption');
  const parallaxTabBtns = document.querySelectorAll('.parallax-tab-btn');
  const parallaxPanels = document.querySelectorAll('.parallax-detail-panel');

  const parallaxScreenMetadata = {
    'home': {
      img: 'assets/images/project-parallax-home.jpg',
      alt: 'Preview Layar Image Parallax Beranda',
      caption: '<strong>Beranda &amp; Featured Parallax 3D</strong> &mdash; Carousel swipe gambar 3D berkedalaman tinggi, chip kategori tematik, dan pencarian instan.'
    },
    'grid': {
      img: 'assets/images/project-parallax-grid.jpg',
      alt: 'Preview Galeri Masonry Grid Parallax',
      caption: '<strong>Galeri Masonry Grid</strong> &mdash; Tampilan kisi 2-kolom dinamis, kartu info cerdas, dan parallax offset halus.'
    },
    'detail': {
      img: 'assets/images/project-parallax-detail.jpg',
      alt: 'Preview Detail Wallpaper Ultra-HD',
      caption: '<strong>Pratinjau Wallpaper Ultra-HD</strong> &mdash; Resolusi asli 4500 × 3000 px, narasi foto, kurasi tag, dan tombol favorit.'
    },
    'feed': {
      img: 'assets/images/project-parallax-feed.jpg',
      alt: 'Preview Feed Parallax List',
      caption: '<strong>Feed Parallax &amp; List</strong> &mdash; Mode scroll vertikal berukuran penuh, lencana Parallax interaktif, dan reset filter.'
    }
  };

  function openParallaxModal() {
    if (parallaxModal && parallaxModalBackdrop) {
      parallaxModal.classList.add('open');
      parallaxModalBackdrop.classList.add('open');
      parallaxModal.setAttribute('aria-hidden', 'false');
      parallaxModalBackdrop.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeParallaxModal() {
    if (parallaxModal && parallaxModalBackdrop) {
      parallaxModal.classList.remove('open');
      parallaxModalBackdrop.classList.remove('open');
      parallaxModal.setAttribute('aria-hidden', 'true');
      parallaxModalBackdrop.setAttribute('aria-hidden', 'true');
      if (!menuDrawer || !menuDrawer.classList.contains('open')) {
        document.body.style.overflow = '';
      }
    }
  }

  if (openParallaxModalBtn) openParallaxModalBtn.addEventListener('click', openParallaxModal);
  if (parallaxModalCloseBtn) parallaxModalCloseBtn.addEventListener('click', closeParallaxModal);
  if (parallaxModalCloseFooterBtn) parallaxModalCloseFooterBtn.addEventListener('click', closeParallaxModal);
  if (parallaxModalBackdrop) parallaxModalBackdrop.addEventListener('click', closeParallaxModal);

  // Extend keyboard accessibility for Parallax Modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (parallaxModal && parallaxModal.classList.contains('open')) {
        closeParallaxModal();
      }
    }
  });

  // Parallax Screen Tab Switching
  parallaxTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const screenKey = btn.getAttribute('data-parallax-screen');
      if (!screenKey || !parallaxScreenMetadata[screenKey]) return;

      // Update active button
      parallaxTabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Update active panel
      parallaxPanels.forEach(panel => panel.classList.remove('active'));
      const activePanel = document.getElementById(`parallax-panel-${screenKey}`);
      if (activePanel) activePanel.classList.add('active');

      // Update phone screen with smooth transition
      if (parallaxPhoneScreenImg) {
        parallaxPhoneScreenImg.style.opacity = '0';
        parallaxPhoneScreenImg.style.transform = 'scale(0.97)';
        setTimeout(() => {
          parallaxPhoneScreenImg.src = parallaxScreenMetadata[screenKey].img;
          parallaxPhoneScreenImg.alt = parallaxScreenMetadata[screenKey].alt;
          parallaxPhoneScreenImg.style.opacity = '1';
          parallaxPhoneScreenImg.style.transform = 'scale(1)';
        }, 180);
      }

      // Update caption
      if (parallaxPhoneScreenCaption) {
        parallaxPhoneScreenCaption.innerHTML = parallaxScreenMetadata[screenKey].caption;
      }
    });
  });

  // --- 8. PROJECT DETAIL MODAL: WANDA FLP MOBILE (HONDA SALES FORCE SUITE) ---
  const openWandaModalBtn = document.getElementById('open-wanda-modal-btn');
  const wandaModal = document.getElementById('wanda-modal');
  const wandaModalBackdrop = document.getElementById('wanda-modal-backdrop');
  const wandaModalCloseBtn = document.getElementById('wanda-modal-close-btn');
  const wandaModalCloseFooterBtn = document.getElementById('wanda-modal-close-footer-btn');

  const wandaPhoneScreenImg = document.getElementById('wanda-modal-phone-screen-img');
  const wandaPhoneScreenCaption = document.getElementById('wanda-modal-screen-caption');
  const wandaTabBtns = document.querySelectorAll('.wanda-tab-btn');
  const wandaPanels = document.querySelectorAll('.wanda-detail-panel');

  const wandaScreenMetadata = {
    'home': {
      img: 'assets/images/project-wanda-home.jpg',
      alt: 'Preview Beranda Wanda FLP Mobile & Points',
      caption: '<strong>Beranda FLP &amp; Gamifikasi Poin</strong> &mdash; Dashboard kinerja sales harian, status pipeline prospek (Suspect, Cold, Hot, SPK), perolehan poin reward Silver, dan presensi check-in dealer.'
    },
    'catalog': {
      img: 'assets/images/project-wanda-catalog.jpg',
      alt: 'Preview E-Catalog Motor Honda CB150X',
      caption: '<strong>E-Catalog Motor Honda</strong> &mdash; Galeri warna motor (Amazon Matte Green, Mandala Red), spesifikasi suspensi, dan fitur unggulan unit.'
    },
    'prospect': {
      img: 'assets/images/project-wanda-prospect.jpg',
      alt: 'Preview CRM Todo List & Prospek Sales',
      caption: '<strong>Todo List &amp; CRM Prospek</strong> &mdash; Manajemen prospek harian (Today, Pending, Workload, Not Contacted), SLA follow up, dan status lead.'
    },
    'price': {
      img: 'assets/images/project-wanda-price.jpg',
      alt: 'Preview Simulasi Harga OTR Honda JKT & TGR',
      caption: '<strong>Simulasi Harga OTR Resmi</strong> &mdash; Rincian harga On The Road Jakarta &amp; Tangerang (CB150R, BeAT Sporty, PCX 150 ABS, CBR 250 R) terupdate.'
    }
  };

  function openWandaModal() {
    if (wandaModal && wandaModalBackdrop) {
      wandaModal.classList.add('open');
      wandaModalBackdrop.classList.add('open');
      wandaModal.setAttribute('aria-hidden', 'false');
      wandaModalBackdrop.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeWandaModal() {
    if (wandaModal && wandaModalBackdrop) {
      wandaModal.classList.remove('open');
      wandaModalBackdrop.classList.remove('open');
      wandaModal.setAttribute('aria-hidden', 'true');
      wandaModalBackdrop.setAttribute('aria-hidden', 'true');
      if (!menuDrawer || !menuDrawer.classList.contains('open')) {
        document.body.style.overflow = '';
      }
    }
  }

  if (openWandaModalBtn) openWandaModalBtn.addEventListener('click', openWandaModal);
  if (wandaModalCloseBtn) wandaModalCloseBtn.addEventListener('click', closeWandaModal);
  if (wandaModalCloseFooterBtn) wandaModalCloseFooterBtn.addEventListener('click', closeWandaModal);
  if (wandaModalBackdrop) wandaModalBackdrop.addEventListener('click', closeWandaModal);

  // Extend keyboard accessibility for Wanda Modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (wandaModal && wandaModal.classList.contains('open')) {
        closeWandaModal();
      }
    }
  });

  // Wanda Screen Tab Switching
  wandaTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const screenKey = btn.getAttribute('data-wanda-screen');
      if (!screenKey || !wandaScreenMetadata[screenKey]) return;

      // Update active button
      wandaTabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Update active panel
      wandaPanels.forEach(panel => panel.classList.remove('active'));
      const activePanel = document.getElementById(`wanda-panel-${screenKey}`);
      if (activePanel) activePanel.classList.add('active');

      // Update phone screen with smooth transition
      if (wandaPhoneScreenImg) {
        wandaPhoneScreenImg.style.opacity = '0';
        wandaPhoneScreenImg.style.transform = 'scale(0.97)';
        setTimeout(() => {
          wandaPhoneScreenImg.src = wandaScreenMetadata[screenKey].img;
          wandaPhoneScreenImg.alt = wandaScreenMetadata[screenKey].alt;
          wandaPhoneScreenImg.style.opacity = '1';
          wandaPhoneScreenImg.style.transform = 'scale(1)';
        }, 180);
      }

      // Update caption
      if (wandaPhoneScreenCaption) {
        wandaPhoneScreenCaption.innerHTML = wandaScreenMetadata[screenKey].caption;
      }
    });
  });
});


