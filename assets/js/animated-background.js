/**
 * Animated Background Script
 * Menginisialisasi background dengan geometric shapes dan parallax effects
 * Sesuai dengan referensi gambar yang diberikan
 */

(function() {
    'use strict';
    
    // Initialize Animated Background
    function initAnimatedBackground() {
        // Check if background already exists
        if (document.querySelector('.animated-background')) {
            return;
        }
        
        // Create main background container
        const bgContainer = document.createElement('div');
        bgContainer.className = 'animated-background';
        
        // Add parallax dot layers
        const parallaxLayer1 = document.createElement('div');
        parallaxLayer1.className = 'parallax-layer parallax-dots-1';
        
        const parallaxLayer2 = document.createElement('div');
        parallaxLayer2.className = 'parallax-layer parallax-dots-2';
        
        // Create floating shapes container
        const shapesContainer = document.createElement('div');
        shapesContainer.className = 'floating-shapes';
        
        // Define shapes configuration sesuai dengan gambar
        const shapes = [
            // White Triangle - Kiri Bawah (besar dengan border tebal)
            { class: 'shape shape-triangle-white' },
            
            // Gold Triangle - Kanan Bawah (besar dengan border tebal)
            { class: 'shape shape-triangle-gold' },
            
            // Small blue triangle - Tengah kiri
            { class: 'shape shape-triangle-blue-small-1' },
            
            // Small blue triangle - Tengah kanan
            { class: 'shape shape-triangle-blue-small-2' },
            
            // Gold rectangle - Kiri atas (miring)
            { class: 'shape shape-rect-gold-left' },
            
            // Gold rectangle - Kanan atas (miring)
            { class: 'shape shape-rect-gold-right' },
            
            // White circle - Tengah kanan atas
            { class: 'shape shape-circle-white' },
            
            // Cyan circle - Kiri bawah
            { class: 'shape shape-circle-cyan' }
        ];
        
        // Create and append shapes
        shapes.forEach(shapeConfig => {
            const shape = document.createElement('div');
            shape.className = shapeConfig.class;
            shapesContainer.appendChild(shape);
        });
        
        // Create glow effects
        const glowEffect1 = document.createElement('div');
        glowEffect1.className = 'glow-effect glow-1';
        
        const glowEffect2 = document.createElement('div');
        glowEffect2.className = 'glow-effect glow-2';
        
        // Append all elements to background container
        bgContainer.appendChild(parallaxLayer1);
        bgContainer.appendChild(parallaxLayer2);
        bgContainer.appendChild(shapesContainer);
        bgContainer.appendChild(glowEffect1);
        bgContainer.appendChild(glowEffect2);
        
        // Insert background at the beginning of body
        document.body.insertBefore(bgContainer, document.body.firstChild);
        
        // Add class to body
        document.body.classList.add('with-animated-bg');
    }
    
    // Parallax scroll effect
    function initParallaxScroll() {
        let ticking = false;
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    const scrolled = window.pageYOffset;
                    const parallaxLayers = document.querySelectorAll('.parallax-layer');
                    
                    parallaxLayers.forEach((layer, index) => {
                        const speed = index === 0 ? 0.3 : 0.2;
                        if (layer) {
                            layer.style.transform = `translateY(${scrolled * speed}px)`;
                        }
                    });
                    
                    ticking = false;
                });
                
                ticking = true;
            }
        });
    }
    
    // Mouse parallax effect for shapes
    function initMouseParallax() {
        let ticking = false;
        
        document.addEventListener('mousemove', function(e) {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    const mouseX = e.clientX / window.innerWidth;
                    const mouseY = e.clientY / window.innerHeight;
                    
                    const shapes = document.querySelectorAll('.shape');
                    shapes.forEach((shape, index) => {
                        const speed = (index + 1) * 0.3;
                        const xPos = (mouseX - 0.5) * speed * 20;
                        const yPos = (mouseY - 0.5) * speed * 20;
                        
                        if (shape) {
                            const computedStyle = window.getComputedStyle(shape);
                            const currentTransform = computedStyle.transform;
                            
                            // Preserve existing transforms
                            if (currentTransform && currentTransform !== 'none') {
                                const matrix = new DOMMatrixReadOnly(currentTransform);
                                // const baseTranslate = matrix.translateSelf(0, 0);
                                shape.style.transform = currentTransform.replace(/translate\([^)]*\)/g, '').trim() + ` translate(${xPos}px, ${yPos}px)`;
                            } else {
                                shape.style.transform = `translate(${xPos}px, ${yPos}px)`;
                            }
                        }
                    });
                    
                    ticking = false;
                });
                
                ticking = true;
            }
        });
    }
    
    // Initialize glow effects
    function initGlowEffects() {
        const glows = document.querySelectorAll('.glow-effect');
        
        glows.forEach(glow => {
            glow.addEventListener('mouseenter', function() {
                this.style.animationDuration = '3s';
            });
            
            glow.addEventListener('mouseleave', function() {
                this.style.animationDuration = '6s';
            });
        });
    }
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initAnimatedBackground();
            setTimeout(function() {
                initParallaxScroll();
                initMouseParallax();
                initGlowEffects();
            }, 100);
        });
    } else {
        initAnimatedBackground();
        setTimeout(function() {
            initParallaxScroll();
            initMouseParallax();
            initGlowEffects();
        }, 100);
    }
    
    console.log('%c✅ Animated Background Loaded', 'color: #ffd700; font-size: 14px; font-weight: bold;');
    
})();


