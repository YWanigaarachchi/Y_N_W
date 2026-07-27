/* ===================== script.js ===================== */
/* YNW Software Solutions - OKTO Creative Style         */
/* Enhanced interactions, animations, and effects       */
/* ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* =====================================================
     CUSTOM CURSOR
     ===================================================== */
  const cursor = document.querySelector('.cursor');
  const cursorFollower = document.querySelector('.cursor-follower');

  if (cursor && cursorFollower) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    // Smooth follower
    function animateFollower() {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Hover effects
    const hoverEls = document.querySelectorAll('a, button, .btn, .card, .service-card, .filter-btn, .portfolio-item, .tech-item, .pricing-card');
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => { cursor.classList.add('active'); cursorFollower.classList.add('active'); });
      el.addEventListener('mouseleave', () => { cursor.classList.remove('active'); cursorFollower.classList.remove('active'); });
    });
  }

  /* =====================================================
     NAVBAR SCROLL
     ===================================================== */
  const nav = document.querySelector('nav');
  const backTop = document.querySelector('.back-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      nav?.classList.add('scrolled');
      backTop?.classList.add('visible');
    } else {
      nav?.classList.remove('scrolled');
      backTop?.classList.remove('visible');
    }
  });

  backTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* =====================================================
     MOBILE MENU
     ===================================================== */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu?.classList.toggle('open');
    document.body.style.overflow = mobileMenu?.classList.contains('open') ? 'hidden' : '';
  });

  mobileMenu?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger?.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* =====================================================
     SCROLL REVEAL
     ===================================================== */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  /* =====================================================
     COUNTER ANIMATION
     ===================================================== */
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'));
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const value = Math.floor(eased * target);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

  /* =====================================================
     SKILL BARS ANIMATION
     ===================================================== */
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
          bar.style.width = bar.getAttribute('data-width');
        });
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.skill-section').forEach(section => skillObserver.observe(section));

  /* =====================================================
     PORTFOLIO FILTER
     ===================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
          item.style.display = 'block';
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.9)';
          setTimeout(() => {
            if (btn.getAttribute('data-filter') !== cat && filter !== 'all') {
              item.style.display = 'none';
            }
          }, 300);
        }
      });
    });
  });

  /* =====================================================
     TYPEWRITER HERO TEXT
     ===================================================== */
  const typewriterEl = document.querySelector('.typewriter');
  if (typewriterEl) {
    const words = typewriterEl.getAttribute('data-words').split(',');
    let wordIdx = 0, charIdx = 0, isDeleting = false;

    function type() {
      const word = words[wordIdx];
      typewriterEl.textContent = isDeleting
        ? word.substring(0, charIdx--)
        : word.substring(0, charIdx++);

      let delay = isDeleting ? 60 : 120;

      if (!isDeleting && charIdx === word.length + 1) {
        delay = 2000;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        delay = 400;
      }

      setTimeout(type, delay);
    }
    type();
  }

  /* =====================================================
     SMOOTH ACTIVE NAV LINK
     ===================================================== */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* =====================================================
     FORM SUBMISSION (contact)
     ===================================================== */
  const contactForm = document.querySelector('#contact-form');
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
      btn.style.background = 'linear-gradient(135deg, #2ed573, #00d4ff)';
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.disabled = false;
        contactForm.reset();
      }, 3000);
    }, 1800);
  });

  /* =====================================================
     MARQUEE PAUSE ON HOVER (already CSS, JS fallback)
     ===================================================== */

  /* =====================================================
     GLOWING ORB PARALLAX
     ===================================================== */
  const orbs = document.querySelectorAll('.hero-orb');
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    orbs.forEach((orb, i) => {
      const factor = (i + 1) * 0.4;
      orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });
  });

  /* =====================================================
     TILT EFFECT ON CARDS
     ===================================================== */
  document.querySelectorAll('.service-card, .pricing-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
      card.style.transform = `translateY(-6px) rotateX(${-y}deg) rotateY(${x}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* =====================================================
     PAGE LOADER
     ===================================================== */
  const loader = document.querySelector('.page-loader');
  if (loader) {
    window.addEventListener('load', () => {
      loader.classList.add('hide');
      setTimeout(() => loader.remove(), 600);
    });
  }

});