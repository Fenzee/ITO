/**
 * Section Components
 * Enhanced rendering and interaction for different content sections
 */

class SectionComponents {
    constructor() {
        this.glightboxInstances = [];
        this.init();
    }
    
    init() {
        // Listen for slide content loaded events to initialize components
        document.addEventListener('slideContentLoaded', (e) => {
            this.initializeComponents(e.detail.sectionId);
        });
        
        // Also listen to old modal events for backward compatibility
        document.addEventListener('modalContentLoaded', (e) => {
            this.initializeComponents(e.detail.sectionId);
        });
    }
    
    initializeComponents(sectionId) {
        switch(sectionId) {
            case 'galeri':
                this.initGalleryLightbox();
                break;
            case 'timeline':
                this.initTimelineAnimations();
                break;
            case 'sponsor':
                this.initSponsorHover();
                break;
            case 'about':
                this.initAboutAnimations();
                break;
        }
    }
    
    initGalleryLightbox() {
        // Destroy existing instances
        this.destroyGlightbox();
        
        // Initialize GLightbox for slide gallery
        setTimeout(() => {
            const galleryItems = document.querySelectorAll('.ppt-slide.active .glightbox, .modal-body .glightbox');
            if (galleryItems.length > 0 && typeof GLightbox !== 'undefined') {
                const lightbox = GLightbox({
                    selector: '.ppt-slide.active .glightbox, .modal-body .glightbox',
                    touchNavigation: true,
                    loop: true,
                    autoplayVideos: true,
                    closeButton: true,
                    closeOnOutsideClick: true
                });
                this.glightboxInstances.push(lightbox);
            }
        }, 100);
    }
    
    destroyGlightbox() {
        this.glightboxInstances.forEach(instance => {
            if (instance && typeof instance.destroy === 'function') {
                instance.destroy();
            }
        });
        this.glightboxInstances = [];
    }
    
    initTimelineAnimations() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        // Add intersection observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }
            });
        }, { threshold: 0.1 });
        
        timelineItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-30px)';
            item.style.transition = `all 0.5s ease ${index * 0.1}s`;
            observer.observe(item);
            
            // Trigger animation after short delay
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 100);
        });
    }
    
    initSponsorHover() {
        const sponsorItems = document.querySelectorAll('.sponsor-item');
        
        sponsorItems.forEach((item, index) => {
            // Stagger animation on load
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.4s ease';
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, index * 80);
            
            // Add hover sound effect (optional)
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'scale(1.05) translateY(-5px)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'scale(1) translateY(0)';
            });
        });
    }
    
    initAboutAnimations() {
        const contentSection = document.querySelector('.content-section');
        if (contentSection) {
            // Add typewriter effect to title
            const titles = contentSection.querySelectorAll('h3');
            titles.forEach((title, index) => {
                title.style.opacity = '0';
                title.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    title.style.transition = 'all 0.5s ease';
                    title.style.opacity = '1';
                    title.style.transform = 'translateY(0)';
                }, index * 200);
            });
            
            // Fade in paragraphs
            const paragraphs = contentSection.querySelectorAll('p');
            paragraphs.forEach((p, index) => {
                p.style.opacity = '0';
                p.style.transform = 'translateY(15px)';
                
                setTimeout(() => {
                    p.style.transition = 'all 0.5s ease';
                    p.style.opacity = '1';
                    p.style.transform = 'translateY(0)';
                }, (index + titles.length) * 150);
            });
        }
    }
    
    // Utility method to add parallax effect to modal content
    addParallaxEffect(element) {
        if (!element) return;
        
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            element.style.transform = `perspective(1000px) rotateY(${deltaX * 2}deg) rotateX(${-deltaY * 2}deg)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
        });
    }
    
    // Cleanup method
    cleanup() {
        this.destroyGlightbox();
    }
}

// Initialize section components
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.sectionComponents = new SectionComponents();
    });
} else {
    window.sectionComponents = new SectionComponents();
}
