/**
 * Yasas Nirmitha Portfolio — Smart Features Script
 */

document.addEventListener('DOMContentLoaded', () => {

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

});