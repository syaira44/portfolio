/* =========================================================
   CIKO.DEV — script.js
   Semua interaksi ditulis dengan Vanilla JavaScript.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initHamburgerMenu();
  initActiveNavOnScroll();
  initScrollReveal();
  initTypingEffect();
  initCertificateModal();
  initFooterYear();
});

/* ---------------------------------------------------------
   1. Navbar berubah tampilan saat halaman di-scroll
   --------------------------------------------------------- */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const toggle = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  toggle();
  window.addEventListener('scroll', toggle, { passive: true });
}

/* ---------------------------------------------------------
   2. Hamburger menu untuk tampilan mobile
   --------------------------------------------------------- */
function initHamburgerMenu() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  if (!hamburger || !navMenu) return;

  const closeMenu = () => {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  };

  hamburger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  // Tutup menu ketika salah satu link diklik
  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
}

/* ---------------------------------------------------------
   3. Highlight menu navbar sesuai section yang aktif
   --------------------------------------------------------- */
function initActiveNavOnScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const setActive = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.dataset.section === id);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ---------------------------------------------------------
   4. Scroll reveal animation (fade + slide up sederhana)
   --------------------------------------------------------- */
function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.section__eyebrow, .section__title, .section__subtitle, ' +
    '.about__photo, .about__content, .stat-card, .tech-card, ' +
    '.timeline__item, .project-card, .cert-card, .contact-card'
  );

  targets.forEach((el) => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  targets.forEach((el) => observer.observe(el));
}

/* ---------------------------------------------------------
   5. Efek typing sederhana pada hero
   --------------------------------------------------------- */
function initTypingEffect() {
  const el = document.getElementById('typingText');
  if (!el) return;

  const phrases = [
    'Software Engineering Student',
    'Web Developer',
    'Creative Programmer',
  ];

  let phraseIndex = 0;
  let charIndex = phrases[0].length;
  let isDeleting = false;

  const TYPE_SPEED = 70;
  const DELETE_SPEED = 40;
  const PAUSE_AFTER_TYPE = 1600;
  const PAUSE_AFTER_DELETE = 400;

  function tick() {
    const current = phrases[phraseIndex];

    if (!isDeleting) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);

      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(tick, PAUSE_AFTER_TYPE);
        return;
      }
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);

      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(tick, PAUSE_AFTER_DELETE);
        return;
      }
    }

    setTimeout(tick, isDeleting ? DELETE_SPEED : TYPE_SPEED);
  }

  // Mulai dari kalimat pertama yang sudah penuh (sesuai HTML awal),
  // lalu lanjut ke siklus hapus-ketik.
  setTimeout(() => {
    isDeleting = true;
    tick();
  }, PAUSE_AFTER_TYPE);
}

/* ---------------------------------------------------------
   6. Modal sertifikat
   --------------------------------------------------------- */
function initCertificateModal() {
  const modal = document.getElementById('certModal');
  const backdrop = document.getElementById('modalBackdrop');
  const closeBtn = document.getElementById('modalClose');
  const modalTitle = document.getElementById('modalTitle');
  const modalMeta = document.getElementById('modalMeta');
  const modalImage = document.getElementById('modalImage');
  const certButtons = document.querySelectorAll('.cert-view-btn');

  if (!modal || !certButtons.length) return;

  function openModal(card) {
    const title = card.dataset.certTitle || 'Certificate';
    const issuer = card.dataset.certIssuer || '';
    const year = card.dataset.certYear || '';
    const img = card.dataset.certImg || '';

    modalTitle.textContent = title;
    modalMeta.textContent = [issuer, year].filter(Boolean).join(' · ');

    if (img) {
      modalImage.innerHTML = `<img src="${img}" alt="${title}" style="width:100%;height:100%;object-fit:cover;border-radius:6px;">`;
    } else {
      modalImage.innerHTML = '<span>[CERTIFICATE PREVIEW]</span>';
    }

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  certButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.cert-card');
      if (card) openModal(card);
    });
  });

  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ---------------------------------------------------------
   7. Tahun otomatis di footer
   --------------------------------------------------------- */
function initFooterYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
