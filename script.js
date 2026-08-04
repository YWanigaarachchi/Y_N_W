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
     FORM SUBMISSION → WhatsApp
     ===================================================== */
  const contactForm = document.querySelector('#contact-form');
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;

    // Collect field values
    const name    = (document.getElementById('contact-name')?.value    || '').trim();
    const email   = (document.getElementById('contact-email')?.value   || '').trim();
    const phone   = (document.getElementById('contact-phone')?.value   || '').trim();
    const budget  = (document.getElementById('contact-budget')?.value  || '').trim();
    const service = (document.getElementById('contact-service')?.value || '').trim();
    const message = (document.getElementById('contact-message')?.value || '').trim();

    // Basic required-field guard
    if (!name || !email || !service || !message) {
      // Shake the button to signal validation failure
      btn.style.animation = 'shake 0.4s ease';
      setTimeout(() => btn.style.animation = '', 500);
      return;
    }

    // Pretty labels for select values
    const serviceLabels = {
      web:          'Web Development',
      mobile:       'Mobile Development',
      other:        'Other',
    };
    const budgetLabels = {
      'under-150k': 'Under Rs. 150,000',
      '150k-500k':  'Rs. 150,000 – Rs. 500,000',
      '500k-1500k': 'Rs. 500,000 – Rs. 1,500,000',
      '1500k-plus': 'Rs. 1,500,000+',
      custom:       'Let\'s discuss',
    };

    // Build structured WhatsApp message
    const lines = [
      '👋 *New Enquiry via YNW Website*',
      '',
      `👤 *Name:* ${name}`,
      `📧 *Email:* ${email}`,
      phone   ? `📞 *Phone:* ${phone}`                                      : null,
      budget  ? `💰 *Budget:* ${budgetLabels[budget] || budget}`             : null,
      `🛠️ *Service:* ${serviceLabels[service] || service}`,
      '',
      `📝 *Message:*\n${message}`,
    ].filter(l => l !== null).join('\n');

    const waNumber = '94765855570';
    const waURL    = `https://wa.me/${waNumber}?text=${encodeURIComponent(lines)}`;

    // Animate button → open WhatsApp
    btn.innerHTML  = '<i class="fa-solid fa-spinner fa-spin"></i> Opening WhatsApp…';
    btn.disabled   = true;

    setTimeout(() => {
      window.open(waURL, '_blank');

      btn.innerHTML = '<i class="fa-brands fa-whatsapp"></i> Sent via WhatsApp!';
      btn.style.background = 'linear-gradient(135deg, #25D366, #128C7E)';

      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.style.background = '';
        btn.disabled = false;
        contactForm.reset();
      }, 3500);
    }, 800);
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
  /* =====================================================
     YNW AI 3D EFFECT (THREE.JS)
     ===================================================== */
  const canvas = document.getElementById('ynw-ai-3d-canvas');
  if (canvas && typeof THREE !== 'undefined') {
    let width = canvas.parentElement.clientWidth;
    let height = canvas.parentElement.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 12; // slightly closer for detail

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Groups
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Deep Inner Brain Glow Core
    const coreGeo = new THREE.SphereGeometry(0.8, 16, 16);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xE040FB,
      transparent: true,
      opacity: 0.35,
      wireframe: true
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    core.position.y = 0.4;
    mainGroup.add(core);

    const innerCoreGeo = new THREE.SphereGeometry(0.4, 8, 8);
    const innerCoreMat = new THREE.MeshBasicMaterial({
      color: 0x00E5FF,
      transparent: true,
      opacity: 0.7
    });
    const innerCore = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    innerCore.position.y = 0.4;
    mainGroup.add(innerCore);

    // Procedurally Generate Glowing 3D Human Brain Network
    const positions = [];
    const initialPositions = [];

    // 1. Cerebrum (Main hemispheres)
    const cerebrumPoints = 220;
    for (let i = 0; i < cerebrumPoints; i++) {
      const hemisphere = Math.random() > 0.5 ? 1 : -1;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      // Brain dimensions: wider than tall, longer front-to-back
      const rx = 1.9;
      const ry = 1.6;
      const rz = 2.4;

      let x = rx * Math.sin(phi) * Math.cos(theta);
      let y = ry * Math.sin(phi) * Math.sin(theta);
      let z = rz * Math.cos(phi);

      // Hemisphere gap & structural separation
      x = x + hemisphere * 0.25;
      if (Math.abs(x) < 0.12) {
        x += Math.sign(x) * 0.12;
      }

      // Brain surface folds (gyri/sulci) using trig frequencies
      const foldFreq = 5.0;
      const foldAmp = 0.25;
      const fold = Math.sin(x * foldFreq) * Math.cos(y * foldFreq) * Math.sin(z * foldFreq) * foldAmp;

      const len = Math.sqrt(x*x + y*y + z*z);
      x += (x / len) * fold;
      y += (y / len) * fold;
      z += (z / len) * fold;

      // Offset cerebrum upwards
      y += 0.5;

      positions.push(x, y, z);
      initialPositions.push({ x, y, z, speed: 0.6 + Math.random() * 0.8, offset: Math.random() * 50, type: 'cerebrum', hemisphere });
    }

    // 2. Cerebellum (Lower back portion)
    const cerebellumPoints = 70;
    for (let i = 0; i < cerebellumPoints; i++) {
      const hemisphere = Math.random() > 0.5 ? 1 : -1;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      const rx = 1.1;
      const ry = 0.7;
      const rz = 1.0;

      let x = rx * Math.sin(phi) * Math.cos(theta) + hemisphere * 0.18;
      let y = ry * Math.sin(phi) * Math.sin(theta) - 0.9;
      let z = rz * Math.cos(phi) - 1.0; // position at back-bottom

      // Fine cerebellum ripples
      const fold = Math.sin(x * 10) * Math.cos(y * 10) * 0.06;
      const len = Math.sqrt(x*x + y*y + z*z);
      x += (x / len) * fold;
      y += (y / len) * fold;
      z += (z / len) * fold;

      positions.push(x, y, z);
      initialPositions.push({ x, y, z, speed: 1.0 + Math.random(), offset: Math.random() * 50, type: 'cerebellum', hemisphere });
    }

    // 3. Brain Stem (Bottom center spinal connector)
    const stemPoints = 30;
    for (let i = 0; i < stemPoints; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.28 + Math.random() * 0.12;
      const height = -0.9 - (Math.random() * 1.0);

      const x = Math.cos(angle) * radius;
      const y = height;
      const z = Math.sin(angle) * radius - 0.25;

      positions.push(x, y, z);
      initialPositions.push({ x, y, z, speed: 0.4 + Math.random() * 0.4, offset: Math.random() * 50, type: 'stem', hemisphere: 0 });
    }

    const totalPoints = positions.length / 3;
    const nodeGeometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(positions);
    nodeGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Custom Canvas Texture for glowing circular points
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 16;
    pCanvas.height = 16;
    const pCtx = pCanvas.getContext('2d');
    const grad = pCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, 'rgba(0, 225, 255, 1)');
    grad.addColorStop(0.3, 'rgba(0, 225, 255, 0.8)');
    grad.addColorStop(1, 'rgba(0, 225, 255, 0)');
    pCtx.fillStyle = grad;
    pCtx.fillRect(0, 0, 16, 16);
    const pTexture = new THREE.CanvasTexture(pCanvas);

    // Glowing Cyan point material
    const nodeMaterial = new THREE.PointsMaterial({
      color: 0x00E5FF,
      size: 0.26,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      map: pTexture
    });

    const pointCloud = new THREE.Points(nodeGeometry, nodeMaterial);
    mainGroup.add(pointCloud);

    // Network connection lines (Vivid Violet)
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x7C3AED,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending
    });

    const lineGeo = new THREE.BufferGeometry();
    const lineIndices = [];

    // Calculate neural connection lines dynamically
    for (let i = 0; i < totalPoints; i++) {
      const nodeI = initialPositions[i];
      const ix = posArray[i * 3];
      const iy = posArray[i * 3 + 1];
      const iz = posArray[i * 3 + 2];

      for (let j = i + 1; j < totalPoints; j++) {
        const nodeJ = initialPositions[j];
        
        // Prevent lines crossing the central hemisphere fissure to preserve brain shape
        if (nodeI.hemisphere !== 0 && nodeJ.hemisphere !== 0 && nodeI.hemisphere !== nodeJ.hemisphere) {
          continue;
        }

        const jx = posArray[j * 3];
        const jy = posArray[j * 3 + 1];
        const jz = posArray[j * 3 + 2];

        const dx = ix - jx;
        const dy = iy - jy;
        const dz = iz - jz;
        const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);

        // Distance thresholds depending on brain section
        let maxDist = 0.65;
        if (nodeI.type === 'stem' && nodeJ.type === 'stem') {
          maxDist = 0.45;
        } else if (nodeI.type === 'cerebellum' && nodeJ.type === 'cerebellum') {
          maxDist = 0.55;
        }

        if (dist < maxDist) {
          lineIndices.push(i, j);
        }
      }
    }

    lineGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    lineGeo.setIndex(lineIndices);
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    mainGroup.add(lines);

    // Ambient floating backdrop code dust (Magenta)
    const particleCount = 40;
    const partGeo = new THREE.BufferGeometry();
    const partPositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      partPositions[i * 3] = (Math.random() - 0.5) * 10;
      partPositions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      partPositions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }

    partGeo.setAttribute('position', new THREE.BufferAttribute(partPositions, 3));
    const partMaterial = new THREE.PointsMaterial({
      color: 0xE040FB,
      size: 0.08,
      transparent: true,
      opacity: 0.4
    });
    const backgroundParticles = new THREE.Points(partGeo, partMaterial);
    scene.add(backgroundParticles);

    // Mouse tilt & rotation offsets
    let targetX = 0;
    let targetY = 0;
    let mouse = { x: 0, y: 0 };

    window.addEventListener('mousemove', (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      targetX = mouse.x * 0.5;
      targetY = mouse.y * 0.4;
    });

    let clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);

      const time = clock.getElapsedTime();

      // Brain automatic slow rotate
      mainGroup.rotation.y = time * 0.15;
      
      // Core glow pulsation
      const pulseVal = 1.0 + Math.sin(time * 2.5) * 0.1;
      innerCore.scale.set(pulseVal, pulseVal, pulseVal);
      core.scale.set(1.0 + Math.cos(time * 1.5) * 0.06, 1.0 + Math.cos(time * 1.5) * 0.06, 1.0 + Math.cos(time * 1.5) * 0.06);

      // Organic dynamic brain pulsation (nodes vibrate/pulse)
      const currentPos = nodeGeometry.attributes.position.array;
      for (let i = 0; i < totalPoints; i++) {
        const init = initialPositions[i];
        const wave = Math.sin(time * init.speed + init.offset) * 0.06;

        // Vibrate outwards along normal
        const len = Math.sqrt(init.x*init.x + init.y*init.y + init.z*init.z);
        const nx = init.x / len;
        const ny = init.y / len;
        const nz = init.z / len;

        currentPos[i * 3] = init.x + nx * wave;
        currentPos[i * 3 + 1] = init.y + ny * wave;
        currentPos[i * 3 + 2] = init.z + nz * wave;
      }
      nodeGeometry.attributes.position.needsUpdate = true;
      lineGeo.attributes.position.needsUpdate = true;

      // Slow drift particles
      backgroundParticles.rotation.y = -time * 0.02;

      // Smooth lag target rotation towards mouse position
      mainGroup.rotation.y += (targetX - mainGroup.rotation.y) * 0.05;
      mainGroup.rotation.x += (-targetY - mainGroup.rotation.x) * 0.05;

      renderer.render(scene, camera);
    }

    animate();

    // Resize Handler
    window.addEventListener('resize', () => {
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
  }

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