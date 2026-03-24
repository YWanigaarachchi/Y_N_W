/**
 * Yasas Nirmitha Portfolio — Smart Features Script
 */

document.addEventListener('DOMContentLoaded', () => {

    // ── 0. PRE-LOADER (Dynamic Logo) ──────────────────
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    const isGithubPage = window.location.pathname.includes('github.html');
    const isContactPage = window.location.pathname.includes('contact.html');
    
    // Choose logo content
    let logoHtml = '';
    if (isGithubPage) {
        logoHtml = `
            <svg height="40" viewBox="0 0 16 16" version="1.1" width="40" aria-hidden="true" style="fill: var(--accent-blue);">
                <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9 1.4 1.11.21.07.47.11.75.11.51 0 .97-.15 1.3-.43 0 .69.01 1.33.01 1.57 0 .21-.15.46-.55.38A8.013 8.013 0 0 1 0 8c0-4.42 3.58-8 8-8z"></path>
            </svg>
        `;
    } else if (isContactPage) {
        logoHtml = `<i class="fa-solid fa-paper-plane" style="font-size: 1.8rem; color: var(--accent-blue);"></i>`;
    } else {
        logoHtml = `<span style="font-size: 1.8rem; font-weight: 800; color: var(--accent-blue); letter-spacing: -1px;">YNW</span>`;
    }

    const loaderLabel = isGithubPage ? 'Initializing' : (isContactPage ? 'Connecting' : 'Loading');

    preloader.innerHTML = `
        <div class="loader-content">
            <div class="loader-ring">
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;">
                    ${logoHtml}
                </div>
            </div>
            <div class="loader-text">${loaderLabel} Portfolio</div>
        </div>
    `;

    document.body.prepend(preloader);
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('fade-out');
        }, 500); 
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

    // ── 13. ROCKET LAUNCH EFFECT (Centered & Blur) ───────
    const createRocket = () => {
        // Create blur overlay
        const overlay = document.createElement('div');
        overlay.id = 'rocket-overlay';
        document.body.appendChild(overlay);

        const rocket = document.createElement('div');
        rocket.className = 'rocket-container';
        rocket.innerHTML = `✈️<div class="rocket-trail"></div>`;
        document.body.appendChild(rocket);

        const launchRocket = () => {
            overlay.classList.add('active');
            rocket.style.display = 'block';
            rocket.classList.remove('launch');
            void rocket.offsetWidth; 
            rocket.classList.add('launch');
        };

        const triggerButtons = document.querySelectorAll('.contact-float-btn, .contact-form button');
        
        triggerButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const isFormBtn = btn.closest('.contact-form');
                const href = btn.getAttribute('href');

                if (isFormBtn) {
                    // It's the "Send Message" button
                    e.preventDefault(); // For demo/launch effect
                    launchRocket();
                    // Optional: Submit form after delay
                    // setTimeout(() => btn.closest('form').submit(), 2000);
                } else if (href && href !== '#' && !btn.hasAttribute('target')) {
                    e.preventDefault();
                    launchRocket();
                    
                    setTimeout(() => {
                        window.location.href = href;
                    }, 1200);
                } else {
                    launchRocket();
                    setTimeout(() => {
                        overlay.classList.remove('active');
                    }, 2000);
                }
            });
        });
    };

    // ── 14. STAR FIELD GENERATOR (Dark Mode Only) ────────
    const createStarField = () => {
        const starField = document.createElement('div');
        starField.id = 'star-field';
        document.body.prepend(starField);

        const starCount = 150;
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            // Random styling
            const size = Math.random() * 3 + 'px';
            star.style.width = size;
            star.style.height = size;
            
            star.style.left = Math.random() * 100 + 'vw';
            star.style.top = Math.random() * 100 + 'vh';
            
            // Random animation params using CSS variables
            const duration = Math.random() * 3 + 2 + 's';
            const delay = Math.random() * 5 + 's';
            const opacity = Math.random() * 0.7 + 0.3;
            
            star.style.setProperty('--duration', duration);
            star.style.setProperty('--max-opacity', opacity);
            star.style.animationDelay = delay;
            
            starField.appendChild(star);
        }
    };

    createStarField();

    // ── 15. SUN GENERATOR (Light Mode Only) ───────────────
    const createSun = () => {
        const sun = document.createElement('div');
        sun.id = 'sun-container';
        sun.innerHTML = `<div class="sun-core"></div>`;
        document.body.prepend(sun);
    };

    createSun();

    // ── 16. MOON GENERATOR (Dark Mode Only) ──────────────
    const createMoon = () => {
        const moon = document.createElement('div');
        moon.id = 'moon-container';
        document.body.prepend(moon);
    };

    createMoon();

    // ── 17. BIRD GENERATOR (Light Mode Only) ──────────────
    const createBirds = () => {
        const birdContainer = document.createElement('div');
        birdContainer.id = 'bird-container';
        document.body.prepend(birdContainer);

        const count = 8;
        for (let i = 0; i < count; i++) {
            const bird = document.createElement('div');
            bird.className = 'bird';
            
            // Random properties
            const duration = Math.random() * 10 + 15 + 's';
            const flapSpeed = Math.random() * 0.4 + 0.3 + 's';
            const topStart = Math.random() * 70 + 5 + '%';
            const topEnd = Math.random() * 70 + 5 + '%';
            const delay = Math.random() * 20 + 's';

            bird.style.setProperty('--duration', duration);
            bird.style.setProperty('--flap-speed', flapSpeed);
            bird.style.setProperty('--top-start', topStart);
            bird.style.setProperty('--top-end', topEnd);
            bird.style.animationDelay = delay;

            bird.innerHTML = `
                <svg viewBox="0 0 32 32">
                    <path class="bird-body" d="M2,16 Q8,8 16,16 Q24,8 30,16"></path>
                </svg>
            `;
            
            birdContainer.appendChild(bird);
        }
    };

    createBirds();

    // ── 18. AI CHATBOT LOGIC ────────────────────────────
    const createChatbot = () => {
        const trigger = document.createElement('div');
        trigger.className = 'chatbot-trigger';
        trigger.innerHTML = `<i class="fa-solid fa-robot"></i>`;
        document.body.appendChild(trigger);
        const win = document.createElement('div');
        win.className = 'chat-window';
        win.innerHTML = `
            <div class="chat-header">
                <h3><i class="fa-solid fa-robot"></i> Assistant</h3>
                <i class="fa-solid fa-xmark close-chat" style="cursor: pointer;"></i>
            </div>
            <div class="chat-messages" id="chat-messages"><div class="message bot">Hello! How can I help? ✨</div></div>
            <div class="chat-input-area">
                <input type="text" id="chat-input" placeholder="Ask me...">
                <button class="chat-send-btn" id="send-btn"><i class="fa-solid fa-paper-plane"></i></button>
            </div>`;
        document.body.appendChild(win);
        const input = win.querySelector('#chat-input'), sendBtn = win.querySelector('#send-btn'), box = win.querySelector('#chat-messages');
        const closeBtn = win.querySelector('.close-chat');
        trigger.onclick = () => win.classList.toggle('active');
        closeBtn.onclick = () => win.classList.remove('active');
        const add = (t, s) => {
            const m = document.createElement('div'); m.className = `message ${s}`; m.innerText = t;
            box.appendChild(m); box.scrollTop = box.scrollHeight;
        };
        const handle = () => {
            const v = input.value.trim(); if (!v) return;
            add(v, 'user'); input.value = '';
            setTimeout(() => {
                let r = "I'm the YNW Assistant! How can I help? Ask about 'projects' or 'contact'!";
                const t = v.toLowerCase();
                if (t.includes('hi') || t.includes('hello')) r = "Hi there! I'm Yasas's personal AI! ✨";
                else if (t.includes('project')) r = "Check out the Projects page for some amazing work! 🚀";
                else if (t.includes('contact')) r = "Contact Yasas via the Contact page or WhatsApp button! 📩";
                add(r, 'bot');
            }, 600);
        };
        sendBtn.onclick = handle;
        input.onkeypress = (e) => (e.key === 'Enter') && handle();
    };
    createChatbot();

});