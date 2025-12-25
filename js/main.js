/**
 * PhD Researcher Portfolio - Main JavaScript
 * Professional academic website functionality
 */

(function() {
    'use strict';

    // DOM Elements
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const sections = document.querySelectorAll('section[id]');

    /**
     * Navbar scroll effect
     * Adds shadow and reduces padding on scroll
     */
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    /**
     * Active navigation highlighting
     * Highlights the current section in navigation
     */
    function highlightActiveSection() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    /**
     * Smooth scroll for navigation links
     */
    function initSmoothScroll() {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = targetSection.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        navbarCollapse.classList.remove('show');
                    }
                }
            });
        });
    }

    /**
     * Intersection Observer for scroll animations
     */
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll(
            '.info-card, .research-card, .publication-item, .timeline-item, .teaching-card'
        );

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    }

    /**
     * Form submission handler
     */
    function initContactForm() {
        const contactForm = document.querySelector('.contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(this);
                const formEntries = Object.fromEntries(formData);
                
                // Here you would typically send the data to a server
                // For now, we'll just show a success message
                console.log('Form submitted:', formEntries);
                
                // Show success message
                alert('Thank you for your message! I will get back to you soon.');
                
                // Reset form
                this.reset();
            });
        }
    }

    /**
     * Back to top button functionality
     */
    function initBackToTop() {
        // Create back to top button
        const backToTopBtn = document.createElement('button');
        backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.setAttribute('aria-label', 'Back to top');
        document.body.appendChild(backToTopBtn);

        // Add styles dynamically
        const style = document.createElement('style');
        style.textContent = 
            '.back-to-top {' +
            '    position: fixed;' +
            '    bottom: 30px;' +
            '    right: 30px;' +
            '    width: 45px;' +
            '    height: 45px;' +
            '    border-radius: 50%;' +
            '    background-color: #1a365d;' +
            '    color: #ffffff;' +
            '    border: none;' +
            '    cursor: pointer;' +
            '    opacity: 0;' +
            '    visibility: hidden;' +
            '    transition: all 0.3s ease;' +
            '    z-index: 1000;' +
            '    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);' +
            '}' +
            '.back-to-top:hover {' +
            '    background-color: #2c5282;' +
            '    transform: translateY(-3px);' +
            '}' +
            '.back-to-top.visible {' +
            '    opacity: 1;' +
            '    visibility: visible;' +
            '}';
        document.head.appendChild(style);

        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        // Scroll to top on click
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /**
     * Initialize all functionality
     */
    function init() {
        // Event listeners
        window.addEventListener('scroll', function() {
            handleNavbarScroll();
            highlightActiveSection();
        });

        // Initialize components
        initSmoothScroll();
        initScrollAnimations();
        initContactForm();
        initBackToTop();

        // Initial calls
        handleNavbarScroll();
        highlightActiveSection();
    }

    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
