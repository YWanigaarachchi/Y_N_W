/* =====================================================
   ANTI-GRAVITY & ZERO-G JAVASCRIPT INTERACTION ENGINE
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initCustomCursor();
  initBackgroundParticles();
  initThreeJsAiCore();
  init3DTiltEffect();
  initNavbarScroll();
  initMobileMenu();
  initAutoScrollBtn();
  initSmoothScroll();
  initServiceCategoryTabs();
  initProjectCategoryTabs();
  initPackageOrderModal();
  initBackgroundMusic();
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

  // Hide custom cursor dot inside pop-out modal windows and form input fields
  const hideCursorInputs = document.querySelectorAll('.order-modal-pane, .glass-form-pane, input, select, textarea');
  hideCursorInputs.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.opacity = '0';
      cursorFollower.style.opacity = '0';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.opacity = '1';
      cursorFollower.style.opacity = '1';
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
   3. THREE.JS 3D AI CORE HERO CANVAS
   ===================================================== */
function initThreeJsAiCore() {
  const container = document.getElementById('hero-3d-canvas');
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
   5. SERVICE & PROJECT CATEGORY TABS FILTERING
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

  // Project Category Filtering on project.html
  initProjectCategoryTabs();
}

function initProjectCategoryTabs() {
  const projectBtns = document.querySelectorAll('.project-tab-btn');
  const projectCards = document.querySelectorAll('.portfolio-card-work');

  if (!projectBtns.length || !projectCards.length) return;

  function filterProjectCategory(cat) {
    projectCards.forEach(card => {
      const cardCat = card.getAttribute('data-project-category');
      if (cat === 'all' || cardCat === cat) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // Initial filtering based on active tab on page load
  const activeBtn = document.querySelector('.project-tab-btn.active');
  if (activeBtn) {
    const initCat = activeBtn.getAttribute('data-project-category');
    filterProjectCategory(initCat);
  }

  projectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      projectBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.getAttribute('data-project-category');
      filterProjectCategory(cat);
    });
  });
}

/* =====================================================
   6. PACKAGE ORDER POP-OUT MODAL & DYNAMIC WHATSAPP LINK
   ===================================================== */
let currentSelectedPackage = { name: 'Custom Package Inquiry', price: 'Contact Us' };
let currentTargetWhatsAppLine = '94765855570';

function initPackageOrderModal() {
  // Ensure modal HTML structure exists on all pages
  ensureModalExists();

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
      currentTargetWhatsAppLine = '94765855570';

      openModal(packageName, packagePrice);
    });
  });

  // Trigger links on footer WhatsApp phone numbers
  const footerModalLinks = document.querySelectorAll('.trigger-footer-modal');
  footerModalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetLine = link.getAttribute('data-whatsapp-line') || '94765855570';
      const lineLabel = link.getAttribute('data-line-label') || 'Direct Line Inquiry';

      currentSelectedPackage = { name: `Direct Inquiry (${lineLabel})`, price: 'Free Consultation' };
      currentTargetWhatsAppLine = targetLine;

      openModal(currentSelectedPackage.name, currentSelectedPackage.price);
    });
  });

  closeBtn?.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  function openModal(title, price) {
    const nameEl = document.getElementById('modal-package-title');
    const priceEl = document.getElementById('modal-package-price');
    if (nameEl) nameEl.innerText = title;
    if (priceEl) priceEl.innerText = price;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

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

    const text = `Hi YNW Software Solutions!%0A%0A*Package Inquiry %26 Order*%0A------------------------------%0A*Target / Package:* ${encodeURIComponent(currentSelectedPackage.name)} (${encodeURIComponent(currentSelectedPackage.price)})%0A*Your Full Name:* ${encodeURIComponent(name)}%0A*Your Email Address:* ${encodeURIComponent(email)}%0A*Company / Business Type:* ${encodeURIComponent(businessType)}%0A*Company Name:* ${encodeURIComponent(companyName)}%0A*City Location:* ${encodeURIComponent(cityLocation)}%0A*Contact Number:* ${encodeURIComponent(contactNumber)}%0A------------------------------%0APlease get in touch with me to proceed.`;

    const whatsappUrl = `https://wa.me/${currentTargetWhatsAppLine}?text=${text}`;
    window.open(whatsappUrl, '_blank');
    closeModal();
  });
}

function ensureModalExists() {
  if (document.getElementById('package-order-modal')) return;

  const modalHtml = `
  <div class="modal-overlay" id="package-order-modal">
      <div class="order-modal-pane">
          <button class="modal-close-btn"><i class="fa-solid fa-xmark"></i></button>
          <div class="badge-glow" style="margin-bottom:16px;">
              <span class="badge-glow-dot"></span> Welcome to YNW Software Solutions
          </div>
          <h2 style="font-size:1.8rem; margin-bottom:16px;">Package <span class="text-gradient">Inquiry & Order</span></h2>
          
          <div class="order-summary-box">
              <div>
                  <p style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.05em;">Selected Package / Line</p>
                  <h4 id="modal-package-title">Direct Line Inquiry</h4>
              </div>
              <span id="modal-package-price">Free Consultation</span>
          </div>

          <form id="package-order-form">
              <div class="form-row-2col">
                  <div class="form-group">
                      <label for="order-name">Your Full Name</label>
                      <input type="text" id="order-name" class="form-input" placeholder="e.g. John Doe" required>
                  </div>
                  <div class="form-group">
                      <label for="order-email">Your Email Address</label>
                      <input type="email" id="order-email" class="form-input" placeholder="john@example.com" required>
                  </div>
              </div>

              <div class="form-row-2col">
                  <div class="form-group">
                      <label for="order-business-type">Company / Business Type</label>
                      <select id="order-business-type" class="form-input" required style="background:#0A1128;">
                          <option value="Startup Business">Startup Business</option>
                          <option value="Small / Medium Business">Small / Medium Business</option>
                          <option value="Enterprise Brand">Enterprise Brand</option>
                          <option value="Individual / Personal">Individual / Personal</option>
                      </select>
                  </div>
                  <div class="form-group">
                      <label for="order-company-name">Company Name</label>
                      <input type="text" id="order-company-name" class="form-input" placeholder="e.g. YNW Solutions" required>
                  </div>
              </div>

              <div class="form-row-2col">
                  <div class="form-group">
                      <label for="order-city-location">City Location</label>
                      <input type="text" id="order-city-location" class="form-input" placeholder="e.g. Colombo, Sri Lanka" required>
                  </div>
                  <div class="form-group">
                      <label for="order-contact-number">Contact Number</label>
                      <input type="tel" id="order-contact-number" class="form-input" placeholder="e.g. +94 76 585 5570" required>
                  </div>
              </div>
              <button type="submit" class="btn btn-whatsapp" style="width:100%; margin-top:12px; font-size:1.05rem;"><i class="fa-brands fa-whatsapp"></i> Transmit Order via WhatsApp</button>
          </form>
      </div>
  </div>`;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
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
   9. RIGHT-SIDE AUTO-SCROLL BUTTON (ULTRA-SMOOTH SCROLL UP)
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

  scrollBtn.addEventListener('click', (e) => {
    e.preventDefault();
    smoothScrollToTop(900);
  });
}

function smoothScrollToTop(duration = 900) {
  const startPosition = window.scrollY || window.pageYOffset;
  const startTime = performance.now();

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function step(currentTime) {
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const easeProgress = easeInOutCubic(progress);

    window.scrollTo(0, startPosition * (1 - easeProgress));

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
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

/* =====================================================
   11. FUTURISTIC AMBIENT BACKGROUND MUSIC PLAYER
   ===================================================== */
function initBackgroundMusic() {
  if (document.getElementById('music-toggle-btn')) return;

  const audioHtml = `
  <audio id="bg-audio-player" loop preload="auto">
      <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg">
      <source src="https://actions.google.com/sounds/v1/ambiences/deep_space.ogg" type="audio/ogg">
  </audio>`;
  document.body.insertAdjacentHTML('beforeend', audioHtml);

  const toggleButtonHtml = `
  <div class="top-right-music-widget">
      <button id="music-toggle-btn" class="music-toggle-btn" title="Toggle Futuristic Ambient Music">
          <i class="fa-solid fa-music"></i>
          <span class="sound-wave">
              <span></span><span></span><span></span><span></span>
          </span>
      </button>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', toggleButtonHtml);

  const audio = document.getElementById('bg-audio-player');
  const toggleBtn = document.getElementById('music-toggle-btn');
  if (!audio || !toggleBtn) return;

  audio.volume = 0.35;
  let isPlaying = false;

  const playBackgroundMusic = () => {
    audio.muted = false;
    audio.volume = 0.35;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        toggleBtn.classList.add('playing');
        isPlaying = true;
        cleanUpListeners();
      }).catch(err => {
        // Keep interaction listeners ready to play unmuted on next click/touch
      });
    }
  };

  function toggleMusic() {
    if (isPlaying) {
      if (audio.muted) {
        playBackgroundMusic();
      } else {
        audio.pause();
        toggleBtn.classList.remove('playing');
        isPlaying = false;
      }
    } else {
      playBackgroundMusic();
    }
  }

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMusic();
  });

  const interactionEvents = ['click', 'keydown', 'touchstart'];

  const startAudioOnInteraction = (e) => {
    if (e && e.target && (toggleBtn === e.target || toggleBtn.contains(e.target))) {
      return;
    }
    playBackgroundMusic();
  };

  const cleanUpListeners = () => {
    interactionEvents.forEach(event => {
      document.removeEventListener(event, startAudioOnInteraction);
    });
  };

  // Register listeners immediately
  interactionEvents.forEach(event => {
    document.addEventListener(event, startAudioOnInteraction, { once: true, passive: true });
  });

  // Auto-play / unmute when preloader loading effect finishes
  window.addEventListener('ynwPreloaderFinished', () => {
    playBackgroundMusic();
  });

  // Attempt autoplay immediately on load
  playBackgroundMusic();
}

/* =====================================================
   12. FUTURISTIC 3D YNW LOGO PRELOADER ENGINE
   ===================================================== */
function initPreloader() {
  const preloaderHtml = `
  <div id="ynw-preloader">
    <div class="preloader-glow-bg"></div>
    <div class="preloader-3d-wrapper">
      <div id="preloader-3d-canvas"></div>
      <div class="preloader-branding">
        <h2 class="preloader-logo-title">YNW<span>.</span></h2>
      </div>
    </div>
    <div class="preloader-status-container">
      <div class="preloader-bar-outer">
        <div class="preloader-bar-fill" id="preloader-bar-fill"></div>
      </div>
      <div class="preloader-info-row">
        <span class="preloader-status-text" id="preloader-status-text">INITIALIZING YNW SYSTEM...</span>
        <span class="preloader-percent-counter" id="preloader-percent-counter">0%</span>
      </div>
      <button class="preloader-enter-btn" id="preloader-enter-btn" style="opacity: 0; pointer-events: none;">
        <i class="fa-solid fa-volume-high"></i> ENTER EXPERIENCE
      </button>
    </div>
  </div>`;
  document.body.insertAdjacentHTML('afterbegin', preloaderHtml);

  const preloaderEl = document.getElementById('ynw-preloader');
  const barFill = document.getElementById('preloader-bar-fill');
  const statusText = document.getElementById('preloader-status-text');
  const percentText = document.getElementById('preloader-percent-counter');
  const enterBtn = document.getElementById('preloader-enter-btn');
  const container = document.getElementById('preloader-3d-canvas');

  let animFrameId = null;

  // Initialize Three.js 3D YNW Logo Scene
  if (container && typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    const pointLight1 = new THREE.PointLight(0x00E5FF, 3, 20);
    pointLight1.position.set(3, 3, 4);
    const pointLight2 = new THREE.PointLight(0x7C3AED, 2, 20);
    pointLight2.position.set(-3, -2, 3);
    scene.add(ambientLight, pointLight1, pointLight2);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Material for 3D letters - High Gloss Metallic Cyan Glow
    const letterMat = new THREE.MeshStandardMaterial({
      color: 0x00E5FF,
      emissive: 0x00E5FF,
      emissiveIntensity: 0.4,
      metalness: 0.9,
      roughness: 0.15
    });

    // 3D Monogram - Letter Y
    const groupY = new THREE.Group();
    const stemY = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.8, 12), letterMat);
    stemY.position.set(0, -0.4, 0);
    const leftArmY = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.8, 12), letterMat);
    leftArmY.position.set(-0.28, 0.28, 0);
    leftArmY.rotation.z = Math.PI / 4;
    const rightArmY = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.8, 12), letterMat);
    rightArmY.position.set(0.28, 0.28, 0);
    rightArmY.rotation.z = -Math.PI / 4;
    groupY.add(stemY, leftArmY, rightArmY);
    groupY.position.x = -1.2;

    // 3D Monogram - Letter N
    const groupN = new THREE.Group();
    const leftStemN = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.3, 12), letterMat);
    leftStemN.position.set(-0.32, 0, 0);
    const rightStemN = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.3, 12), letterMat);
    rightStemN.position.set(0.32, 0, 0);
    const diagN = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.42, 12), letterMat);
    diagN.position.set(0, 0, 0);
    diagN.rotation.z = -Math.PI / 6.2;
    groupN.add(leftStemN, rightStemN, diagN);
    groupN.position.x = 0;

    // 3D Monogram - Letter W (Sharp 3D W Monogram)
    const groupW = new THREE.Group();
    const wRadius = 0.075;
    const s1W = new THREE.Mesh(new THREE.CylinderGeometry(wRadius, wRadius, 1.05, 12), letterMat);
    s1W.position.set(-0.36, 0.0, 0);
    s1W.rotation.z = -0.38;

    const s2W = new THREE.Mesh(new THREE.CylinderGeometry(wRadius, wRadius, 0.95, 12), letterMat);
    s2W.position.set(-0.12, -0.20, 0);
    s2W.rotation.z = 0.45;

    const s3W = new THREE.Mesh(new THREE.CylinderGeometry(wRadius, wRadius, 0.95, 12), letterMat);
    s3W.position.set(0.12, -0.20, 0);
    s3W.rotation.z = -0.45;

    const s4W = new THREE.Mesh(new THREE.CylinderGeometry(wRadius, wRadius, 1.05, 12), letterMat);
    s4W.position.set(0.36, 0.0, 0);
    s4W.rotation.z = 0.38;

    groupW.add(s1W, s2W, s3W, s4W);
    groupW.position.x = 1.25;

    // Glowing Dot for YNW. Monogram
    const dotMat = new THREE.MeshStandardMaterial({
      color: 0x00E5FF,
      emissive: 0x00E5FF,
      emissiveIntensity: 0.9,
      roughness: 0.1
    });
    const dotDot = new THREE.Mesh(new THREE.SphereGeometry(0.14, 16, 16), dotMat);
    dotDot.position.set(1.95, -0.4, 0);

    const logoLetters = new THREE.Group();
    logoLetters.add(groupY, groupN, groupW, dotDot);
    mainGroup.add(logoLetters);

    // 3 Cyber Orbital Telemetry Rings
    const ring1Geo = new THREE.TorusGeometry(2.2, 0.03, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x00E5FF, wireframe: true, transparent: true, opacity: 0.65 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    mainGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(2.5, 0.02, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x5C67DE, wireframe: true, transparent: true, opacity: 0.5 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 3;
    mainGroup.add(ring2);

    const ring3Geo = new THREE.TorusGeometry(2.8, 0.015, 16, 100);
    const ring3Mat = new THREE.MeshBasicMaterial({ color: 0x7C3AED, wireframe: true, transparent: true, opacity: 0.4 });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.y = Math.PI / 4;
    mainGroup.add(ring3);

    // Drifting Particles Field
    const pCount = 150;
    const pPositions = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i += 3) {
      const angle = Math.random() * Math.PI * 2;
      const rad = 2.0 + Math.random() * 1.8;
      pPositions[i] = Math.cos(angle) * rad;
      pPositions[i + 1] = (Math.random() - 0.5) * 2.5;
      pPositions[i + 2] = Math.sin(angle) * rad;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    const pMat = new THREE.PointsMaterial({ size: 0.045, color: 0x00E5FF, transparent: true, opacity: 0.85 });
    const particles = new THREE.Points(pGeo, pMat);
    mainGroup.add(particles);

    const clock = new THREE.Clock();
    const animatePreloader3D = () => {
      animFrameId = requestAnimationFrame(animatePreloader3D);
      const elapsedTime = clock.getElapsedTime();

      logoLetters.rotation.y = Math.sin(elapsedTime * 1.5) * 0.45;
      logoLetters.rotation.x = Math.cos(elapsedTime * 1.2) * 0.12;
      logoLetters.position.y = Math.sin(elapsedTime * 2.2) * 0.15;

      ring1.rotation.z = elapsedTime * 0.6;
      ring2.rotation.y = elapsedTime * 0.45;
      ring3.rotation.x = elapsedTime * 0.3;
      particles.rotation.y = elapsedTime * 0.25;

      renderer.render(scene, camera);
    };
    animatePreloader3D();
  }

  // Progress Bar & Counter logic
  let currentProgress = 0;
  let pageLoaded = false;
  let hasFinished = false;

  const updateStatusText = (progress) => {
    if (progress < 25) {
      statusText.textContent = "INITIALIZING YNW SYSTEM...";
    } else if (progress < 55) {
      statusText.textContent = "LOADING 3D WEBGL CORE...";
    } else if (progress < 85) {
      statusText.textContent = "STABILIZING ZERO-G ENVIRONMENT...";
    } else if (progress < 99) {
      statusText.textContent = "FINALIZING PROTOCOLS...";
    } else {
      statusText.textContent = "SYSTEM READY";
    }
  };

  const triggerEnter = (e) => {
    if (e) e.stopPropagation();
    if (hasFinished) return;
    hasFinished = true;
    currentProgress = 100;
    if (barFill) barFill.style.width = '100%';
    if (percentText) percentText.textContent = '100%';
    if (statusText) statusText.textContent = "SYSTEM READY";
    window.dispatchEvent(new CustomEvent('ynwPreloaderFinished'));

    if (preloaderEl) {
      preloaderEl.classList.add('preloader-hidden');
      setTimeout(() => {
        if (animFrameId) cancelAnimationFrame(animFrameId);
        preloaderEl.style.display = 'none';
      }, 800);
    }
  };

  const progressInterval = setInterval(() => {
    if (hasFinished) {
      clearInterval(progressInterval);
      return;
    }
    let increment = pageLoaded ? 8 : (currentProgress < 75 ? Math.random() * 4 + 2 : 0.5);
    currentProgress = Math.min(100, currentProgress + increment);

    if (barFill) barFill.style.width = `${currentProgress}%`;
    if (percentText) percentText.textContent = `${Math.floor(currentProgress)}%`;
    if (statusText) updateStatusText(currentProgress);

    if (currentProgress >= 100) {
      clearInterval(progressInterval);
      if (enterBtn) {
        enterBtn.style.opacity = '1';
        enterBtn.style.pointerEvents = 'auto';
      }
      window.dispatchEvent(new CustomEvent('ynwPreloaderFinished'));
      setTimeout(() => {
        triggerEnter();
      }, 1000);
    }
  }, 40);

  if (enterBtn) {
    enterBtn.addEventListener('click', triggerEnter);
  }
  if (preloaderEl) {
    preloaderEl.addEventListener('click', triggerEnter);
  }

  window.addEventListener('load', () => {
    pageLoaded = true;
  });

  if (document.readyState === 'complete') {
    pageLoaded = true;
  }
}