/**
 * Single Page Initialization Script
 * Handles initialization, loading states, and smooth transitions
 */

(function() {
    'use strict';
    
    // Wait for DOM to be ready
    function initSinglePage() {
        // Initialize smooth scroll prevention
        preventDefaultScrolling();
        
        // Add keyboard shortcuts
        setupKeyboardShortcuts();
        
        // Setup performance optimizations
        setupPerformanceOptimizations();
        
        // Add touch gestures for mobile
        setupTouchGestures();
        
        // Initialize cursor effects (optional)
        // setupCursorEffects();

        // Add event listener for the info modal button
        const openInfoModalBtn = document.getElementById('openInfoModalBtn');
        if (openInfoModalBtn) {
            openInfoModalBtn.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent default link behavior
                showInfoModal();
            });
        }
        
        console.log('✅ Single Page Layout Initialized');
    }
    
    function preventDefaultScrolling() {
        // Prevent scroll with touch
        let touchStartY = 0;
        document.addEventListener('touchstart', function(e) {
            touchStartY = e.touches[0].clientY;
        }, { passive: true });
        
        document.addEventListener('touchmove', function(e) {
            const slideContent = e.target.closest('.ppt-slide-content');

            // Prevent scrolling on anything that is not the scrollable content of a slide.
            if (!slideContent) {
                e.preventDefault();
            }
        }, { passive: false });
        
        // Prevent spacebar and arrow key scrolling
        window.addEventListener('keydown', function(e) {
            const keys = [32, 33, 34, 35, 36, 37, 38, 39, 40];
            const modalOpen = document.querySelector('.modal-overlay.active');
            
            if (!modalOpen && keys.includes(e.keyCode)) {
                e.preventDefault();
            }
        });
    }
    
    function setupKeyboardShortcuts() {
        document.addEventListener('keydown', function(e) {
            const modalOpen = document.querySelector('.modal-overlay.active');
            
            // ESC to close modal (handled in content-manager.js)
            
            // Number keys for quick navigation (when modal is closed)
            if (!modalOpen && !e.ctrlKey && !e.altKey && !e.metaKey) {
                const keyMap = {
                    '49': 'home',      // Key 1
                    '50': 'about',     // Key 2
                    '51': 'schedule',  // Key 3
                    '52': 'sponsor',   // Key 4
                    '53': 'galeri'     // Key 5
                };
                
                if (keyMap[e.keyCode]) {
                    e.preventDefault();
                    if (window.floatingDock) {
                        window.floatingDock.navigateTo(keyMap[e.keyCode]);
                    }
                }
            }
        });
    }
    
    function setupPerformanceOptimizations() {
        // Lazy load images in modals
        const lazyLoadObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    lazyLoadObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });
        
        // Observe images with data-src attribute
        document.addEventListener('modalContentLoaded', () => {
            setTimeout(() => {
                const lazyImages = document.querySelectorAll('img[data-src]');
                lazyImages.forEach(img => lazyLoadObserver.observe(img));
            }, 100);
        });
        
        // Debounce resize events
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                document.dispatchEvent(new Event('optimizedResize'));
            }, 250);
        });
    }
    
    function setupTouchGestures() {
        let touchStartX = 0;
        let touchStartY = 0;
        let touchEndX = 0;
        let touchEndY = 0;
        
        document.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });
        
        document.addEventListener('touchend', function(e) {
            const modalOverlay = document.querySelector('.modal-overlay.active');
            if (!modalOverlay) return;
            
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            
            handleSwipeGesture();
        }, { passive: true });
        
        function handleSwipeGesture() {
            const diffX = touchStartX - touchEndX;
            const diffY = touchStartY - touchEndY;
            
            // Swipe down to close modal
            if (Math.abs(diffY) > Math.abs(diffX) && diffY < -100) {
                const modalBody = document.querySelector('.modal-body');
                if (modalBody && modalBody.scrollTop === 0) {
                    if (window.contentManager) {
                        window.contentManager.closeModal();
                    }
                }
            }
        }
    }
    
    function setupCursorEffects() {
        // Optional: Add cursor trail effect
        let cursorTrails = [];
        
        document.addEventListener('mousemove', function(e) {
            if (cursorTrails.length > 5) {
                const oldTrail = cursorTrails.shift();
                oldTrail.remove();
            }
            
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            trail.style.left = e.clientX + 'px';
            trail.style.top = e.clientY + 'px';
            document.body.appendChild(trail);
            cursorTrails.push(trail);
            
            setTimeout(() => {
                trail.remove();
                cursorTrails = cursorTrails.filter(t => t !== trail);
            }, 500);
        });
    }

    function setupMailSystem() {
        const openInfoModalBtn = document.getElementById('openInfoModalBtn');
        const mailNotification = document.getElementById('mailNotificationPopup');
        const closeNotificationBtn = mailNotification.querySelector('.mail-notification-close');
        const infoModal = document.getElementById('infoModal');
        const infoModalCard = infoModal.querySelector('.info-modal-card');
        const closeInfoModalBtn = infoModal.querySelector('.modal-close');
        let modalTimeline; // GSAP timeline

        // Function to close the notification with animation
        function closeNotification() {
            mailNotification.classList.remove('active');
        }

        // Event to open the mail notification
        openInfoModalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (mailNotification.classList.contains('active')) {
                closeNotification();
            } else {
                if (window.innerWidth > 768) {
                    mailNotification.style.top = `150px`;
                    mailNotification.style.right = `30px`;
                    mailNotification.style.left = 'auto';
                }
                mailNotification.classList.add('active');
            }
        });

        // Event to close the mail notification via its own close button
        closeNotificationBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeNotification();
        });

        // Event to open the full mail reader from the notification
        mailNotification.addEventListener('click', () => {
            closeNotification();
            showFullMail();
        });

        function showFullMail() {
            // Prevent opening if animation is running
            if (modalTimeline && modalTimeline.isActive()) return;

            document.body.classList.add('modal-open');
            infoModal.classList.add('active'); // Show overlay

            // GSAP Animation for opening
            modalTimeline = gsap.fromTo(infoModalCard, 
                { yPercent: -60, autoAlpha: 0 }, // from: start from above and invisible
                { 
                    duration: 0.4, 
                    xPercent: -50, yPercent: -50, 
                    autoAlpha: 1, 
                    ease: "power2.out" 
                }
            );
        }

        function closeFullMail() {
            // Prevent closing if animation is running
            if (modalTimeline && modalTimeline.isActive()) return;

            // GSAP Animation for closing
            modalTimeline = gsap.to(infoModalCard, {
                duration: 0.4,
                yPercent: -40,
                autoAlpha: 0,
                ease: "power2.in",
                onComplete: () => {
                    document.body.classList.remove('modal-open');
                    infoModal.classList.remove('active'); // Hide overlay
                }
            });
        }

        // Events to close the full mail reader
        closeInfoModalBtn.addEventListener('click', closeFullMail);
        infoModal.addEventListener('click', (e) => {
            if (e.target === infoModal) {
                closeFullMail();
            }
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initSinglePage();
            setupMailSystem();
        });
    } else {
        initSinglePage();
        setupMailSystem();
    }
    
    // Add welcome message
    console.log('%c🎯 ITO Single Page Experience', 'color: #0d5aa5; font-size: 20px; font-weight: bold;');
    console.log('%cKeyboard Shortcuts:', 'color: #1e73be; font-size: 14px; font-weight: bold;');
    console.log('%c1-5: Quick navigation\nESC: Close modal', 'color: #666; font-size: 12px;');
    
})();
