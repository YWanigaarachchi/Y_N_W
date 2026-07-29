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
    camera.position.z = 15;

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

    // AI Core (Glowing Inner Sphere)
    const coreGeo = new THREE.SphereGeometry(1.2, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x00E5FF,
      transparent: true,
      opacity: 0.15,
      wireframe: true
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(core);

    // Solid inner core
    const innerCoreGeo = new THREE.SphereGeometry(0.6, 16, 16);
    const innerCoreMat = new THREE.MeshBasicMaterial({
      color: 0x7C3AED,
      transparent: true,
      opacity: 0.8
    });
    const innerCore = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    mainGroup.add(innerCore);

    // Outer Node Network
    const nodeCount = 50;
    const nodeGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(nodeCount * 3);
    const initialPositions = [];

    for (let i = 0; i < nodeCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 3.2 + Math.random() * 0.4;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      initialPositions.push({ x, y, z, speed: 0.5 + Math.random(), offset: Math.random() * 100 });
    }

    nodeGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Canvas-generated glow texture for nodes
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 16;
    pCanvas.height = 16;
    const pCtx = pCanvas.getContext('2d');
    const grad = pCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, 'rgba(0, 229, 255, 1)');
    grad.addColorStop(0.3, 'rgba(0, 229, 255, 0.8)');
    grad.addColorStop(1, 'rgba(0, 229, 255, 0)');
    pCtx.fillStyle = grad;
    pCtx.fillRect(0, 0, 16, 16);
    
    const pTexture = new THREE.CanvasTexture(pCanvas);

    const nodeMaterial = new THREE.PointsMaterial({
      color: 0x00E5FF,
      size: 0.4,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      map: pTexture
    });

    const pointCloud = new THREE.Points(nodeGeometry, nodeMaterial);
    mainGroup.add(pointCloud);

    // Connections (Lines)
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x7C3AED,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending
    });
    
    const lineGeo = new THREE.BufferGeometry();
    const lineIndices = [];

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);

        if (dist < 2.5) {
          lineIndices.push(i, j);
        }
      }
    }

    lineGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    lineGeo.setIndex(lineIndices);
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    mainGroup.add(lines);

    // Drifting dust particles
    const particleCount = 60;
    const partGeo = new THREE.BufferGeometry();
    const partPositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      partPositions[i * 3] = (Math.random() - 0.5) * 12;
      partPositions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      partPositions[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }

    partGeo.setAttribute('position', new THREE.BufferAttribute(partPositions, 3));
    const partMaterial = new THREE.PointsMaterial({
      color: 0xE040FB,
      size: 0.08,
      transparent: true,
      opacity: 0.5
    });
    const backgroundParticles = new THREE.Points(partGeo, partMaterial);
    scene.add(backgroundParticles);

    // Interactive mouse rotation tracking
    let targetX = 0;
    let targetY = 0;
    let mouse = { x: 0, y: 0 };
    
    window.addEventListener('mousemove', (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      
      targetX = mouse.x * 0.4;
      targetY = mouse.y * 0.4;
    });

    let clock = new THREE.Clock();
    
    function animate() {
      requestAnimationFrame(animate);

      const time = clock.getElapsedTime();

      // Rotation speeds
      mainGroup.rotation.y = time * 0.15;
      mainGroup.rotation.x = time * 0.08;

      // Pulse glows
      const pulse = 1 + Math.sin(time * 3) * 0.08;
      innerCore.scale.set(pulse, pulse, pulse);
      core.scale.set(1 + Math.cos(time * 2) * 0.05, 1 + Math.cos(time * 2) * 0.05, 1 + Math.cos(time * 2) * 0.05);

      // Node movements
      const posArr = nodeGeometry.attributes.position.array;
      for (let i = 0; i < nodeCount; i++) {
        const init = initialPositions[i];
        const wave = Math.sin(time * init.speed + init.offset) * 0.15;
        
        const len = Math.sqrt(init.x*init.x + init.y*init.y + init.z*init.z);
        const nx = init.x / len;
        const ny = init.y / len;
        const nz = init.z / len;

        posArr[i * 3] = init.x + nx * wave;
        posArr[i * 3 + 1] = init.y + ny * wave;
        posArr[i * 3 + 2] = init.z + nz * wave;
      }
      nodeGeometry.attributes.position.needsUpdate = true;
      lineGeo.attributes.position.needsUpdate = true;

      // Drift bg
      backgroundParticles.rotation.y = -time * 0.03;

      // Follow mouse smoothly
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