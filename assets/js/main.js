/* Ariana's Little Star — interactions */
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Sticky header shadow ---------- */
  var header = document.getElementById('siteHeader');
  var onScrollHeader = function () {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---------- Mobile nav ---------- */
  var navToggle = document.getElementById('navToggle');
  var navMenu = document.getElementById('navMenu');
  navToggle.addEventListener('click', function () {
    var open = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  navMenu.addEventListener('click', function (e) {
    if (e.target.closest('a')) {
      navMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- Animated counters ---------- */
  var counters = document.querySelectorAll('.count');
  var animateCount = function (el) {
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    if (prefersReducedMotion || target === 0) { el.textContent = String(target); return; }
    var duration = 1200;
    var start = null;
    var step = function (ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = String(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window) {
    var countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { countObserver.observe(el); });
  } else {
    counters.forEach(function (el) { el.textContent = el.getAttribute('data-count'); });
  }

  /* ---------- Timeline accordion ---------- */
  document.querySelectorAll('.tl-head').forEach(function (head) {
    head.addEventListener('click', function () {
      var expanded = head.getAttribute('aria-expanded') === 'true';
      var body = head.nextElementSibling;
      head.setAttribute('aria-expanded', String(!expanded));
      body.style.maxHeight = expanded ? '0' : body.scrollHeight + 'px';
    });
  });

  /* ---------- Gallery filter ---------- */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var galleryItems = document.querySelectorAll('.g-item');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) {
        b.classList.toggle('is-active', b === btn);
        b.setAttribute('aria-pressed', String(b === btn));
      });
      var filter = btn.getAttribute('data-filter');
      galleryItems.forEach(function (item) {
        var show = filter === 'all' || item.getAttribute('data-cat') === filter;
        item.classList.toggle('is-hidden', !show);
      });
    });
  });

  /* ---------- Lightbox ---------- */
  var lightbox = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');
  var lbClose = document.getElementById('lbClose');
  var lastFocused = null;

  var openLightbox = function (src, alt) {
    lastFocused = document.activeElement;
    lbImg.src = src;
    lbImg.alt = alt;
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  };
  var closeLightbox = function () {
    lightbox.hidden = true;
    lbImg.src = '';
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  };

  document.querySelectorAll('.g-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      openLightbox(btn.getAttribute('data-full'), btn.getAttribute('data-alt'));
    });
  });
  lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !lightbox.hidden) closeLightbox();
  });

  /* ---------- Testimonial carousel ---------- */
  var track = document.getElementById('carouselTrack');
  var cards = track.children;
  var dotsWrap = document.getElementById('cDots');
  var current = 0;
  var autoTimer = null;

  for (var i = 0; i < cards.length; i++) {
    var dot = document.createElement('button');
    dot.className = 'c-dot' + (i === 0 ? ' is-active' : '');
    dot.setAttribute('aria-label', 'Testimonial ' + (i + 1));
    dot.setAttribute('data-index', String(i));
    dotsWrap.appendChild(dot);
  }
  var dots = dotsWrap.children;

  var goTo = function (index) {
    current = (index + cards.length) % cards.length;
    track.style.transform = 'translateX(-' + current * 100 + '%)';
    for (var j = 0; j < dots.length; j++) {
      dots[j].classList.toggle('is-active', j === current);
    }
  };
  var restartAuto = function () {
    if (prefersReducedMotion) return;
    clearInterval(autoTimer);
    autoTimer = setInterval(function () { goTo(current + 1); }, 7000);
  };

  document.getElementById('cPrev').addEventListener('click', function () { goTo(current - 1); restartAuto(); });
  document.getElementById('cNext').addEventListener('click', function () { goTo(current + 1); restartAuto(); });
  dotsWrap.addEventListener('click', function (e) {
    var d = e.target.closest('.c-dot');
    if (d) { goTo(parseInt(d.getAttribute('data-index'), 10)); restartAuto(); }
  });

  /* pause auto-advance while hovered or focused */
  var carousel = document.getElementById('carousel');
  carousel.addEventListener('mouseenter', function () { clearInterval(autoTimer); });
  carousel.addEventListener('mouseleave', restartAuto);
  carousel.addEventListener('focusin', function () { clearInterval(autoTimer); });
  carousel.addEventListener('focusout', restartAuto);

  /* touch swipe */
  var touchStartX = 0;
  track.addEventListener('touchstart', function (e) { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 48) { goTo(dx < 0 ? current + 1 : current - 1); restartAuto(); }
  }, { passive: true });

  restartAuto();

  /* ---------- Floating mobile CTA ---------- */
  var floatingCta = document.getElementById('floatingCta');
  var contactSection = document.getElementById('contact');
  var updateCta = function () {
    var pastHero = window.scrollY > window.innerHeight * 0.7;
    var contactRect = contactSection.getBoundingClientRect();
    var atContact = contactRect.top < window.innerHeight && contactRect.bottom > 0;
    var show = pastHero && !atContact;
    floatingCta.classList.toggle('is-visible', show);
    floatingCta.setAttribute('aria-hidden', String(!show));
    floatingCta.tabIndex = show ? 0 : -1;
  };
  window.addEventListener('scroll', updateCta, { passive: true });
  updateCta();

  /* ---------- Forms ----------
     These forms show a friendly confirmation locally. To receive real
     submissions, point them at a form service (e.g. Formspree):
     1. Create a form at formspree.io and copy its endpoint URL.
     2. Replace FORM_ENDPOINT below with that URL.                    */
  var FORM_ENDPOINT = ''; // e.g. 'https://formspree.io/f/yourFormId'

  var handleForm = function (form, successMsg) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = form.querySelector('.form-msg');
      var required = form.querySelectorAll('[required]');
      var valid = true;
      required.forEach(function (input) {
        if (!input.value.trim() || (input.type === 'email' && !/^\S+@\S+\.\S+$/.test(input.value))) {
          valid = false;
          input.focus();
        }
      });
      if (!valid) {
        msg.textContent = 'Please fill in the highlighted fields so we can reach you.';
        msg.classList.add('is-error');
        return;
      }
      msg.classList.remove('is-error');

      if (FORM_ENDPOINT) {
        var data = new FormData(form);
        fetch(FORM_ENDPOINT, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
          .then(function (res) {
            msg.textContent = res.ok ? successMsg : 'Something went wrong — please call or email us instead.';
            if (res.ok) form.reset();
          })
          .catch(function () {
            msg.textContent = 'Something went wrong — please call or email us instead.';
          });
      } else {
        msg.textContent = successMsg;
        form.reset();
      }
    });
  };

  handleForm(document.getElementById('tourForm'), "Thank you! We'll confirm your tour within one business day. ★");
  handleForm(document.getElementById('waitlistForm'), "You're on the list! We'll reach out the moment a spot opens. ★");
  handleForm(document.getElementById('magnetForm'), 'The guide is on its way to your inbox. ★');
})();
