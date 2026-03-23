/**
 * Yasas Nirmitha Portfolio - Main Script
 * Handle animations and navigation effects
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Scroll Reveal Animation Logic
    // Meken thamai pages scroll karaddi content eka lassanata fade-in wenne
    const revealElements = () => {
        const reveals = document.querySelectorAll(".reveal");
        
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 100; // Pixel kiyak scroll kalamaද trigger wenne kiyala

            if (elementTop < windowHeight - elementVisible) {
                element.classList.add("active");
            }
        });
    };

    // 2. Navbar Scroll Effect
    // Scroll karaddi navbar eke background eka glass effect ekata wenas karanawa
    const handleNavbar = () => {
        const nav = document.querySelector("nav");
        if (window.scrollY > 50) {
            nav.style.padding = "12px 0";
            nav.style.background = "rgba(7, 9, 14, 0.95)";
            nav.style.backdropFilter = "blur(15px)";
            nav.style.boxShadow = "0 4px 30px rgba(0,0,0,0.5)";
        } else {
            nav.style.padding = "20px 0";
            nav.style.background = "rgba(7, 9, 14, 0.8)";
            nav.style.backdropFilter = "blur(10px)";
            nav.style.boxShadow = "none";
        }
    };

    // 3. Active Link Highlighter
    // Dan inna page ekata anuwa nav link eka highlite karanna (Multi-page nisa)
    const highlightActiveLink = () => {
        const currentPath = window.location.pathname.split("/").pop();
        const navLinks = document.querySelectorAll(".nav-links a");

        navLinks.forEach(link => {
            if (link.getAttribute("href") === currentPath) {
                link.style.color = "var(--accent-cyan)";
                link.style.fontWeight = "700";
            }
        });
    };

    // Event Listeners
    window.addEventListener("scroll", revealElements);
    window.addEventListener("scroll", handleNavbar);
    
    // Initial Calls
    revealElements();
    handleNavbar();
    highlightActiveLink();
});