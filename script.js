/* =====================================================
   ANTI-GRAVITY & ZERO-G JAVASCRIPT INTERACTION ENGINE
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initBackgroundParticles();
  initThreeJsAiCore();
  init3DTiltEffect();
  initNavbarScroll();
  initMobileMenu();
  initAutoScrollBtn();
  initSmoothScroll();
  initServiceCategoryTabs();
  initPackageOrderModal();
});

/* =====================================================
   1. CUSTOM NEON CYAN CURSOR
   ===================================================== */
function initCustomCursor() {
  const cursor = document.querySelector('.cursor');
  const cursorFollower = document.querySelector('.cursor-follower');

  if (!cursor || !cursorFollower) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  const hoverTargets = document.querySelectorAll('a, button, .btn, .glass-card, .pricing-card-5, .portfolio-card-work, .whatsapp-float-btn, .tab-btn');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('active');
      cursorFollower.classList.add('active');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('active');
      cursorFollower.classList.remove('active');
    });
  });
}

/* =====================================================
   2. BACKGROUND DRIFTING PARTICLES CANVAS
   ===================================================== */
function initBackgroundParticles() {
  let canvas = document.getElementById('particles-canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'particles-canvas';
    document.body.prepend(canvas);
  }

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const numParticles = 65;
  const particles = [];

  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.5 + 0.5,
      alpha: Math.random() * 0.6 + 0.2,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      color: Math.random() > 0.4 ? '#00E5FF' : '#5C67DE'
    });
  }

  function drawParticles() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.shadowBlur = 12;
      ctx.shadowColor = p.color;
      ctx.fill();
    });

    requestAnimationFrame(drawParticles);
  }
  drawParticles();
}

/* =====================================================
   3. THREE.JS 3D ANIMATED AI CORE SPHERE
   ===================================================== */
function initThreeJsAiCore() {
  const container = document.getElementById('ai-core-canvas');
  if (!container || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.z = 7;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  const coreGroup = new THREE.Group();
  scene.add(coreGroup);

  const outerGeo = new THREE.IcosahedronGeometry(2, 2);
  const outerMat = new THREE.MeshBasicMaterial({ color: 0x00E5FF, wireframe: true, transparent: true, opacity: 0.55 });
  const outerSphere = new THREE.Mesh(outerGeo, outerMat);
  coreGroup.add(outerSphere);

  const innerGeo = new THREE.OctahedronGeometry(1.2, 3);
  const innerMat = new THREE.MeshBasicMaterial({ color: 0x5C67DE, wireframe: true, transparent: true, opacity: 0.75 });
  const innerSphere = new THREE.Mesh(innerGeo, innerMat);
  coreGroup.add(innerSphere);

  const particlesCount = 300;
  const posArray = new Float32Array(particlesCount * 3);
  for (let i = 0; i < particlesCount * 3; i += 3) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 2.8 + Math.random() * 0.8;
    posArray[i] = Math.cos(angle) * radius;
    posArray[i + 1] = (Math.random() - 0.5) * 0.6;
    posArray[i + 2] = Math.sin(angle) * radius;
  }
  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  const particleMat = new THREE.PointsMaterial({ size: 0.05, color: 0x00E5FF, transparent: true, opacity: 0.8 });
  const particleRing = new THREE.Points(particleGeo, particleMat);
  coreGroup.add(particleRing);

  let targetX = 0, targetY = 0;
  window.addEventListener('mousemove', (e) => {
    targetX = (e.clientX / window.innerWidth - 0.5) * 1.5;
    targetY = (e.clientY / window.innerHeight - 0.5) * 1.5;
  });

  window.addEventListener('resize', () => {
    if (!container) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });

  let clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    outerSphere.rotation.x = elapsedTime * 0.2;
    outerSphere.rotation.y = elapsedTime * 0.3;
    innerSphere.rotation.x = -elapsedTime * 0.4;
    innerSphere.rotation.y = -elapsedTime * 0.25;
    particleRing.rotation.y = elapsedTime * 0.15;
    coreGroup.position.y = Math.sin(elapsedTime * 1.8) * 0.25;

    coreGroup.rotation.y += (targetX - coreGroup.rotation.y) * 0.05;
    coreGroup.rotation.x += (targetY - coreGroup.rotation.x) * 0.05;

    renderer.render(scene, camera);
  }
  animate();
}

/* =====================================================
   4. 3D MOUSE TILT EFFECT ON CARDS
   ===================================================== */
function init3DTiltEffect() {
  const tiltCards = document.querySelectorAll('.tilt-card, .pricing-card-5, .glass-card, .portfolio-card-work, .milestone-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    });
  });
}

/* =====================================================
   5. SERVICE CATEGORY TABS FILTERING
   ===================================================== */
function initServiceCategoryTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const cards = document.querySelectorAll('.pricing-card-5');

  if (!tabBtns.length || !cards.length) return;

  function filterCategory(category) {
    cards.forEach(card => {
      const cardCat = card.getAttribute('data-category');
      if (category === 'all' || cardCat === category) {
        card.classList.remove('hidden-category');
      } else {
        card.classList.add('hidden-category');
      }
    });
  }

  // Filter based on initial active tab on page load
  const initialActiveBtn = document.querySelector('.tab-btn.active');
  if (initialActiveBtn) {
    const initCat = initialActiveBtn.getAttribute('data-category');
    filterCategory(initCat);
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');
      filterCategory(category);
    });
  });
}

/* =====================================================
   6. PACKAGE ORDER POP-OUT MODAL & DYNAMIC WHATSAPP LINK
   ===================================================== */
let currentSelectedPackage = { name: 'Custom Package', price: 'Contact Us' };

function initPackageOrderModal() {
  const modalOverlay = document.getElementById('package-order-modal');
  if (!modalOverlay) return;

  const closeBtn = modalOverlay.querySelector('.modal-close-btn');
  const orderForm = document.getElementById('package-order-form');

  // Trigger buttons on pricing cards
  const orderBtns = document.querySelectorAll('.trigger-order-modal');
  orderBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const packageName = btn.getAttribute('data-package-name') || 'Custom Package';
      const packagePrice = btn.getAttribute('data-package-price') || 'Contact Us';

      currentSelectedPackage = { name: packageName, price: packagePrice };

      const nameEl = document.getElementById('modal-package-title');
      const priceEl = document.getElementById('modal-package-price');
      if (nameEl) nameEl.innerText = packageName;
      if (priceEl) priceEl.innerText = packagePrice;

      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  closeBtn?.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Handle Order Form Submit -> Build Encoded WhatsApp URL
  orderForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('order-name')?.value || 'Client';
    const email = document.getElementById('order-email')?.value || 'Not provided';
    const businessType = document.getElementById('order-business-type')?.value || 'Startup';
    const companyName = document.getElementById('order-company-name')?.value || 'Not provided';
    const cityLocation = document.getElementById('order-city-location')?.value || 'Not provided';
    const contactNumber = document.getElementById('order-contact-number')?.value || 'Not provided';

    const text = `Hi YNW Software Solutions!%0A%0A*New Package Order %26 Inquiry*%0A------------------------------%0A*Package:* ${encodeURIComponent(currentSelectedPackage.name)} (${encodeURIComponent(currentSelectedPackage.price)})%0A*Full Name:* ${encodeURIComponent(name)}%0A*Email Address:* ${encodeURIComponent(email)}%0A*Business Type:* ${encodeURIComponent(businessType)}%0A*Company Name:* ${encodeURIComponent(companyName)}%0A*City Location:* ${encodeURIComponent(cityLocation)}%0A*Contact Number:* ${encodeURIComponent(contactNumber)}%0A------------------------------%0APlease get in touch with me to proceed.`;

    const whatsappUrl = `https://wa.me/94765855570?text=${text}`;
    window.open(whatsappUrl, '_blank');
    closeModal();
  });
}

/* =====================================================
   7. NAVBAR SCROLL & STICKY GLASS
   ===================================================== */
function initNavbarScroll() {
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav?.classList.add('scrolled');
    } else {
      nav?.classList.remove('scrolled');
    }
  });
}

/* =====================================================
   8. MOBILE NAVIGATION MENU
   ===================================================== */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu?.classList.toggle('open');
  });

  mobileMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('active');
      mobileMenu.classList.remove('open');
    });
  });
}

/* =====================================================
   9. RIGHT-SIDE AUTO-SCROLL BUTTON (SCROLLS UP ONLY)
   ===================================================== */
function initAutoScrollBtn() {
  const scrollBtn = document.querySelector('.auto-scroll-btn');
  if (!scrollBtn) return;

  scrollBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* =====================================================
   10. SMOOTH SCROLLING
   ===================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}