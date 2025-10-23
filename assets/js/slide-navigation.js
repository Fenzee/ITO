/**
 * Slide Navigation with Up/Down Buttons
 * PowerPoint-style slide navigation
 */

class SlideNavigation {
    constructor() {
        this.sections = ['home', 'about', 'schedule', 'sponsor', 'galeri'];
        this.currentIndex = 0;
        this.isTransitioning = false;
        
        this.init();
    }
    
    init() {
        this.createNavigationButtons();
        this.createDotsIndicator();
        this.attachEventListeners();
        this.updateButtons();
    }
    
    createNavigationButtons() {
        const navHTML = `
            <div class="slide-nav-buttons">
                <button class="slide-nav-btn slide-nav-up" title="Previous Section">
                    <i class="fas fa-chevron-up"></i>
                </button>
                <button class="slide-nav-btn slide-nav-down" title="Next Section">
                    <i class="fas fa-chevron-down"></i>
                </button>
            </div>
            <div class="slide-nav-indicator"></div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', navHTML);
    }
    
    createDotsIndicator() {
        const dotsHTML = `
            <div class="slide-dots-indicator">
                ${this.sections.map((section, index) => `
                    <div class="slide-dot ${index === 0 ? 'active' : ''}" 
                         data-index="${index}" 
                         title="${this.getSectionTitle(section)}">
                    </div>
                `).join('')}
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', dotsHTML);
    }
    
    attachEventListeners() {
        // Up button
        document.querySelector('.slide-nav-up').addEventListener('click', () => {
            this.navigateUp();
        });
        
        // Down button
        document.querySelector('.slide-nav-down').addEventListener('click', () => {
            this.navigateDown();
        });
        
        // Dot indicators
        document.querySelectorAll('.slide-dot').forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.navigateToIndex(index);
            });
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.isTransitioning) return;
            
            if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                e.preventDefault();
                this.navigateUp();
            } else if (e.key === 'ArrowDown' || e.key === 'PageDown') {
                e.preventDefault();
                this.navigateDown();
            } else if (e.key === 'Home') {
                e.preventDefault();
                this.navigateToIndex(0);
            } else if (e.key === 'End') {
                e.preventDefault();
                this.navigateToIndex(this.sections.length - 1);
            }
        });
        
        // Mouse wheel navigation (optional, smooth)
        let wheelTimeout;
        document.addEventListener('wheel', (e) => {
            // Only navigate if not scrolling inside a slide
            const activeSlide = document.querySelector('.ppt-slide.active');
            const isScrollable = activeSlide && activeSlide.querySelector('.ppt-slide-content');
            
            if (isScrollable) {
                const content = isScrollable.querySelector('.ppt-slide-content');
                if (!content) return; // Safety check
                
                const isAtTop = content.scrollTop === 0;
                const isAtBottom = content.scrollTop + content.clientHeight >= content.scrollHeight - 5;
                
                // Allow navigation only at scroll boundaries
                if ((e.deltaY < 0 && isAtTop) || (e.deltaY > 0 && isAtBottom)) {
                    clearTimeout(wheelTimeout);
                    wheelTimeout = setTimeout(() => {
                        if (e.deltaY > 0) {
                            this.navigateDown();
                        } else {
                            this.navigateUp();
                        }
                    }, 150);
                }
            } else {
                // Home section - always allow wheel navigation
                clearTimeout(wheelTimeout);
                wheelTimeout = setTimeout(() => {
                    if (e.deltaY > 0) {
                        this.navigateDown();
                    } else {
                        this.navigateUp();
                    }
                }, 150);
            }
        }, { passive: true });
        
        // Listen for dock navigation to sync
        document.addEventListener('dockItemClick', (e) => {
            const sectionId = e.detail.itemId;
            const index = this.sections.indexOf(sectionId);
            if (index !== -1) {
                this.currentIndex = index;
                this.updateButtons();
                this.updateDots();
            }
        });
    }
    
    navigateUp() {
        if (this.isTransitioning || this.currentIndex === 0) return;
        
        this.currentIndex--;
        this.navigate();
    }
    
    navigateDown() {
        if (this.isTransitioning || this.currentIndex === this.sections.length - 1) return;
        
        this.currentIndex++;
        this.navigate();
    }
    
    navigateToIndex(index) {
        if (this.isTransitioning || index === this.currentIndex || index < 0 || index >= this.sections.length) return;
        
        this.currentIndex = index;
        this.navigate();
    }
    
    navigate() {
        this.isTransitioning = true;
        
        const sectionId = this.sections[this.currentIndex];
        
        // Trigger dock navigation
        if (window.floatingDock) {
            window.floatingDock.navigateTo(sectionId);
        }
        
        // Update UI
        this.updateButtons();
        this.updateDots();
        this.showIndicator(sectionId);
        
        // Reset transitioning flag
        setTimeout(() => {
            this.isTransitioning = false;
        }, 600);
    }
    
    updateButtons() {
        const upBtn = document.querySelector('.slide-nav-up');
        const downBtn = document.querySelector('.slide-nav-down');
        
        if (upBtn) {
            if (this.currentIndex === 0) {
                upBtn.classList.add('disabled');
            } else {
                upBtn.classList.remove('disabled');
            }
        }
        
        if (downBtn) {
            if (this.currentIndex === this.sections.length - 1) {
                downBtn.classList.add('disabled');
            } else {
                downBtn.classList.remove('disabled');
            }
        }
    }
    
    updateDots() {
        const dots = document.querySelectorAll('.slide-dot');
        dots.forEach((dot, index) => {
            if (index === this.currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    showIndicator(sectionId) {
        const indicator = document.querySelector('.slide-nav-indicator');
        if (indicator) {
            indicator.textContent = this.getSectionTitle(sectionId);
            indicator.classList.add('show');
            
            setTimeout(() => {
                indicator.classList.remove('show');
            }, 2000);
        }
    }
    
    getSectionTitle(sectionId) {
        const titles = {
            'home': 'Home',
            'about': 'Tentang ITO',
            'schedule': 'Timeline',
            'sponsor': 'Sponsor',
            'galeri': 'Galeri'
        };
        return titles[sectionId] || sectionId;
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.slideNavigation = new SlideNavigation();
    });
} else {
    window.slideNavigation = new SlideNavigation();
}
