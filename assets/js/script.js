/* ==========================================================================
   ENSIKLOPEDIA TANAMAN HERBAL — SCRIPT UTAMA
   Semua fitur interaktif ditulis dengan Vanilla JavaScript (tanpa library).
   Struktur:
   1. Navbar sticky + shadow saat scroll
   2. Menu hamburger (mobile)
   3. Pencarian & filter kartu tanaman (khusus index.html)
   4. Scroll reveal (animasi ringan saat elemen masuk viewport)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- 1. NAVBAR: efek bayangan saat halaman discroll ---------- */
  const navbar = document.querySelector('.navbar');

  function handleNavbarShadow() {
    if (!navbar) return;
    if (window.scrollY > 10) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
  }
  handleNavbarShadow();
  window.addEventListener('scroll', handleNavbarShadow, { passive: true });

  /* ---------- 2. MENU HAMBURGER (tampilan mobile) ---------- */
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('is-open');
      navLinks.classList.toggle('is-open');
      const isOpen = navLinks.classList.contains('is-open');
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Tutup menu otomatis saat salah satu tautan diklik
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('is-open');
        navLinks.classList.remove('is-open');
      });
    });
  }

  /* ---------- 3. PENCARIAN & FILTER KARTU TANAMAN ---------- */
  const searchInput = document.getElementById('searchInput');
  const plantCards = document.querySelectorAll('.plant-card');
  const noResult = document.querySelector('.no-result');
  const chips = document.querySelectorAll('.chip');

  function filterCards(keyword, category) {
    let visibleCount = 0;
    const key = keyword.trim().toLowerCase();

    plantCards.forEach(function (card) {
      const name = (card.dataset.name || '').toLowerCase();
      const latin = (card.dataset.latin || '').toLowerCase();
      const cardCategory = card.dataset.category || 'semua';

      const matchesKeyword = name.includes(key) || latin.includes(key);
      const matchesCategory = (category === 'semua') || (cardCategory === category);

      if (matchesKeyword && matchesCategory) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (noResult) {
      noResult.classList.toggle('show', visibleCount === 0);
    }
  }

  let activeCategory = 'semua';

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      filterCards(searchInput.value, activeCategory);
    });
  }

  if (chips.length) {
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');
        activeCategory = chip.dataset.category || 'semua';
        filterCards(searchInput ? searchInput.value : '', activeCategory);
      });
    });
  }

  /* ---------- 4. SCROLL REVEAL ---------- */
  const revealTargets = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealTargets.length) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealTargets.forEach(function (el) { observer.observe(el); });
  } else {
    // Fallback jika IntersectionObserver tidak tersedia
    revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
  }

});
