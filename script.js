/**
 * Yasas Nirmitha Portfolio — Smart Features Script
 */

document.addEventListener('DOMContentLoaded', () => {

    // ── 0. PRE-LOADER ──────────────────────────────────
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.innerHTML = `
        <div class="loader-content">
            <div class="loader-ring"></div>
            <div class="loader-text">Loading YNW</div>
        </div>
    `;
    document.body.prepend(preloader);

    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('fade-out');
        }, 500); // Small buffer for visual smoothness
    });

    // ── 1. PAGE PROGRESS BAR ──────────────────────────────
    const progressBar = document.createElement('div');
    progressBar.id = 'progress-bar';
    document.body.prepend(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = progress + '%';
    });


    // ── HIGH-SPEED CUSTOM CURSOR ──────────────────────────
    const cursor = document.querySelector('.custom-cursor');
    const cursorOutline = document.querySelector('.custom-cursor-outline');

    if (cursor && cursorOutline) {
        let mouseX = 0, mouseY = 0;
        let curX = 0, curY = 0;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // The dot stays 100% "Live"
            cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
            cursor.style.opacity = '1';
        });

        const animateCursor = () => {
            // Give the outline just a tiny, tiny bit of smooth following
            // Use 0.2 for "Very close" or 1.0 for "Instant"
            curX += (mouseX - curX) * 0.8; 
            curY += (mouseY - curY) * 0.8;

            cursorOutline.style.transform = `translate3d(${curX}px, ${curY}px, 0)`;
            cursorOutline.style.opacity = '1';

            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Speed-up hover responsiveness
        document.querySelectorAll('a, button, .clickable, .logo').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.width = '45px';
                cursorOutline.style.height = '45px';
                cursorOutline.style.marginLeft = '-20px';
                cursorOutline.style.marginTop = '-20px';
                cursorOutline.style.background = 'rgba(59, 130, 246, 0.1)';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.width = '32px';
                cursorOutline.style.height = '32px';
                cursorOutline.style.marginLeft = '-13px';
                cursorOutline.style.marginTop = '-13px';
                cursorOutline.style.background = 'transparent';
            });
        });
    }


    // ── 2. SCROLL REVEAL ANIMATION ────────────────────────
    const revealElements = () => {
        document.querySelectorAll('.reveal').forEach(el => {
            const top = el.getBoundingClientRect().top;
            if (top < window.innerHeight - 80) {
                el.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', revealElements);
    revealElements();


    // ── 3. SCROLL-TO-TOP BUTTON ───────────────────────────
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.id = 'scroll-top';
    scrollTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    scrollTopBtn.title = 'Back to Top';
    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', () => {
        scrollTopBtn.classList.toggle('visible', window.scrollY > 300);
    });
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


    // ── 4. SMART NAV: Compact on scroll + Blue glow ───────
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            nav.style.padding = '8px 20px';
            nav.style.boxShadow = '0 8px 30px rgba(59,130,246,0.25)';
        } else {
            nav.style.padding = '12px 24px';
            nav.style.boxShadow = '0 15px 35px -10px rgba(59,130,246,0.2)';
        }
    });


    // ── 5. ACTIVE LINK HIGHLIGHTER ────────────────────────
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });


    // ── 6. CURSOR GLOW EFFECT ─────────────────────────────
    const glow = document.createElement('div');
    glow.classList.add('cursor-glow');
    document.body.appendChild(glow);
    document.addEventListener('mousemove', e => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });


    // ── 7. TYPING ANIMATION on hero h1 (index only) ───────
    const heroTitle = document.querySelector('h1');
    if (heroTitle) {
        const roles = [
            'Full-Stack Developer',
            'Microservices Engineer',
            'AWS Cloud Architect',
            'Open Source Contributor',
        ];
        // Find or create the typed span
        let typedSpan = heroTitle.querySelector('.typed-role');
        if (!typedSpan) {
            typedSpan = document.createElement('span');
            typedSpan.classList.add('typed-role');
            typedSpan.style.color = 'var(--accent-cyan)';
            typedSpan.style.display = 'block';
            typedSpan.style.fontSize = '1.8rem';
            typedSpan.style.fontWeight = '600';
            typedSpan.style.marginTop = '8px';

            const cursor = document.createElement('span');
            cursor.classList.add('typing-cursor');
            heroTitle.appendChild(typedSpan);
            heroTitle.appendChild(cursor);
        }

        let rIdx = 0, cIdx = 0, deleting = false;
        const type = () => {
            const word = roles[rIdx];
            if (!deleting) {
                typedSpan.textContent = word.substring(0, cIdx + 1);
                cIdx++;
                if (cIdx === word.length) {
                    deleting = true;
                    setTimeout(type, 1800);
                    return;
                }
            } else {
                typedSpan.textContent = word.substring(0, cIdx - 1);
                cIdx--;
                if (cIdx === 0) {
                    deleting = false;
                    rIdx = (rIdx + 1) % roles.length;
                }
            }
            setTimeout(type, deleting ? 60 : 100);
        };
        type();
    }


    // ── 8. SMART GLASS CARD TILT on hover ─────────────────
    document.querySelectorAll('.glass').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
            card.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) translateY(-8px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ── 9. MOBILE RESPONSIVE HAMBURGER MENU ───────────────
    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links');
    
    if (hamburger && navLinksContainer) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinksContainer.classList.toggle('active');
            
            // Toggle hamburger icon (bars to x)
            const icon = hamburger.querySelector('i');
            if (navLinksContainer.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinksContainer.contains(e.target) && !hamburger.contains(e.target)) {
                navLinksContainer.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // ── 10. PROJECTS: SHOW MORE BUTTON ────────────────────
    const showMoreBtn = document.getElementById('showMoreBtn');
    const hiddenProjects = document.querySelectorAll('.hidden-project');
    
    if (showMoreBtn && hiddenProjects.length > 0) {
        let isShowingMore = false;
        
        showMoreBtn.addEventListener('click', () => {
            isShowingMore = !isShowingMore;
            
            if (isShowingMore) {
                // Show projects
                hiddenProjects.forEach((proj, idx) => {
                    proj.style.display = 'block';
                    // force reflow before adding opacity for smooth transition if needed
                    setTimeout(() => {
                        proj.style.opacity = '1';
                        proj.style.transform = 'translateY(0)';
                    }, idx * 100); 
                });
                showMoreBtn.innerHTML = 'Show Less Projects <i class="fa-solid fa-angle-up" style="margin-left: 8px;"></i>';
            } else {
                // Hide projects
                hiddenProjects.forEach(proj => {
                    proj.style.display = 'none';
                });
                showMoreBtn.innerHTML = 'Show More Projects <i class="fa-solid fa-angle-down" style="margin-left: 8px;"></i>';
                
                // Scroll back up to the grid lightly
                const grid = document.querySelector('.grid-3');
                if(grid){
                    const rect = grid.getBoundingClientRect();
                    window.scrollTo({
                        top: window.scrollY + rect.top - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }

    // ── 11. DARK / LIGHT MODE TOGGLE ──────────────────────
    const themeBtn = document.getElementById('theme-btn');
    if (themeBtn) {
        const themeIcon = themeBtn.querySelector('i');
        const themeTooltip = themeBtn.querySelector('.theme-float-tooltip');
        
        // Check localStorage for saved theme
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark') {
            document.body.classList.add('dark-mode');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            if(themeTooltip) themeTooltip.textContent = 'Light Mode';
        }

        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            // Swap icon and save state
            if (document.body.classList.contains('dark-mode')) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
                if(themeTooltip) themeTooltip.textContent = 'Light Mode';
                localStorage.setItem('theme', 'dark');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
                if(themeTooltip) themeTooltip.textContent = 'Dark Mode';
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // ── 12. NEW YEAR EFFECT (Erabadu Blossoms) ───────────
    const createNewYearEffect = () => {
        const blossomContainer = document.createElement('div');
        blossomContainer.classList.add('blossom-container');
        document.body.appendChild(blossomContainer);

        const badge = document.createElement('div');
        badge.classList.add('new-year-badge');
        badge.innerHTML = `<span>🌸 Happy Sinhala & Tamil New Year!</span>`;
        document.body.appendChild(badge);

        const createPetal = () => {
            const petal = document.createElement('div');
            petal.classList.add('petal');
            
            const size = Math.random() * 15 + 10 + 'px';
            petal.style.width = size;
            petal.style.height = size;
            
            petal.style.left = Math.random() * 100 + 'vw';
            
            const duration = Math.random() * 5 + 5 + 's';
            const delay = Math.random() * 5 + 's';
            petal.style.animation = `fall ${duration} linear forwards, sway ${Math.random() * 2 + 2}s ease-in-out infinite`;
            petal.style.animationDelay = `0s, ${delay}`;
            
            blossomContainer.appendChild(petal);
            
            // Clean up
            setTimeout(() => {
                petal.remove();
            }, 10000);
        };

        // Create initial petals
        for(let i=0; i<15; i++) {
            setTimeout(createPetal, Math.random() * 3000);
        }

        // Keep creating
        setInterval(createPetal, 600);
    };

    // Run if in New Year month (April) - or just run it now for the user
    createNewYearEffect();
    // ── 13. ROCKET LAUNCH EFFECT ─────────────────────────
    const createRocket = () => {
        const rocket = document.createElement('div');
        rocket.className = 'rocket-container';
        rocket.innerHTML = `🚀<div class="rocket-trail"></div>`;
        document.body.appendChild(rocket);

        const launchRocket = (e) => {
            rocket.style.display = 'block';
            rocket.classList.remove('launch');
            void rocket.offsetWidth; // Trigger reflow
            rocket.style.left = e.clientX + 'px';
            rocket.classList.add('launch');
        };

        const triggerButtons = document.querySelectorAll('.contact-float-btn, .btn-primary, .btn-outline');
        
        triggerButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const href = btn.getAttribute('href');
                if (href && href !== '#' && !btn.hasAttribute('target')) {
                    e.preventDefault();
                    launchRocket(e);
                    
                    setTimeout(() => {
                        window.location.href = href;
                    }, 800);
                } else {
                    launchRocket(e);
                }
            });
        });
    };

    createRocket();

});