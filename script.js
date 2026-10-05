/* =====================================================
   YNW SOFTWARE SOLUTIONS — INTERACTION & ANIMATION ENGINE
   Lead Architect: Yasas Wanigaarachchi
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCyberCursor();
  initCosmicParticles();
  initSpotlightHover();
  initTiltEffect();
  initHeaderScroll();
  initMobileDrawer();
  initProjectFilterTabs();
  initSoftGenixPreviewModal();
  initScrollTopProgress();
  initSmoothScroll();
  initScrollReveal();
  initMobileBottomDock();
});

/* =====================================================
   1. CYBER CURSOR & FOLLOWER
   ===================================================== */
function initCyberCursor() {
  const cursor = document.querySelector('.cursor');
  const follower = document.querySelector('.cursor-follower');

  if (!cursor || !follower) return;

  // Disable on touch devices
  if (window.matchMedia('(pointer: coarse)').matches) {
    cursor.style.display = 'none';
    follower.style.display = 'none';
    return;
  }

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.16;
    followerY += (mouseY - followerY) * 0.16;
    follower.style.transform = `translate(${followerX}px, ${followerY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  const hoverTargets = document.querySelectorAll('a, button, .btn, .bento-card, .filter-tab, .browser-frame, .pc-monitor-card');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('active');
      follower.classList.add('active');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('active');
      follower.classList.remove('active');
    });
  });

  // Hide cursor on inputs
  const inputs = document.querySelectorAll('input, select, textarea');
  inputs.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.opacity = '0';
      follower.style.opacity = '0';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.opacity = '1';
      follower.style.opacity = '1';
    });
  });
}

/* =====================================================
   2. COSMIC PARTICLES CANVAS
   ===================================================== */
function initCosmicParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = Math.min(width > 768 ? 60 : 30, 75);
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.6,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.6 + 0.2,
      color: Math.random() > 0.4 ? '0, 240, 255' : '168, 85, 247'
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
      ctx.shadowBlur = 10;
      ctx.shadowColor = `rgba(${p.color}, 0.5)`;
      ctx.fill();
    }

    requestAnimationFrame(render);
  }

  render();
}

/* =====================================================
   3. LUXURY SPOTLIGHT HOVER ENGINE
   ===================================================== */
function initSpotlightHover() {
  const spotlightCards = document.querySelectorAll('.spotlight-card');

  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* =====================================================
   4. 3D PERSPECTIVE TILT
   ===================================================== */
function initTiltEffect() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const tiltTargets = document.querySelectorAll('.tilt-target');

  tiltTargets.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}

/* =====================================================
   5. HEADER NAVIGATION & SCROLL OBSERVER
   ===================================================== */
function initHeaderScroll() {
  const header = document.querySelector('.header-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // Scroll Spy for Nav Links
    let currentId = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    if (currentId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

/* =====================================================
   6. MOBILE NAVIGATION DRAWER
   ===================================================== */
function initMobileDrawer() {
  const hamburger = document.getElementById('hamburgerBtn');
  const drawer = document.getElementById('mobileDrawer');
  const closeBtn = document.getElementById('drawerCloseBtn');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  if (!drawer) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  };

  hamburger?.addEventListener('click', openDrawer);
  closeBtn?.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* =====================================================
   7. PROJECT FILTER TABS
   ===================================================== */
function initProjectFilterTabs() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.project-hero-card, .pc-monitor-card');

  if (!filterTabs.length) return;

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = '';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* =====================================================
   8. SOFTGENIX LIVE PREVIEW MODAL
   ===================================================== */
function initSoftGenixPreviewModal() {
  const modalBackdrop = document.getElementById('softgenixModalBackdrop');
  const triggers = document.querySelectorAll('.preview-modal-trigger');
  const closeBtn = document.getElementById('modalCloseBtn');
  const closeDot = document.querySelector('.modal-close-dot');

  if (!modalBackdrop) return;

  const openModal = () => {
    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  closeBtn?.addEventListener('click', closeModal);
  closeDot?.addEventListener('click', closeModal);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });
}

/* =====================================================
   9. SCROLL TO TOP WITH PROGRESS RING
   ===================================================== */
function initScrollTopProgress() {
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const progressCircle = document.querySelector('.scroll-progress-circle');

  if (!scrollTopBtn || !progressCircle) return;

  const circleLength = 132; // 2 * PI * 21
  progressCircle.style.strokeDasharray = `${circleLength}`;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;

    const offset = circleLength - (scrollPercent * circleLength);
    progressCircle.style.strokeDashoffset = `${offset}`;

    if (scrollTop > 350) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* =====================================================
   10. SMOOTH SCROLLING
   ===================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 90;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* =====================================================
   11. SCROLL REVEAL ANIMATIONS
   ===================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.bento-card, .pc-monitor-card, .section-heading, .workflow-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
  });
}

/* =====================================================
   12. MOBILE BOTTOM DOCK SCROLL SPY
   ===================================================== */
function initMobileBottomDock() {
  const dockBtns = document.querySelectorAll('.mobile-dock-btn');
  const sections = document.querySelectorAll('section[id]');

  if (!dockBtns.length) return;

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 250;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    if (currentId) {
      dockBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('href') === `#${currentId}`) {
          btn.classList.add('active');
        }
      });
    }
  });
}