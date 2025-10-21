/**
 * Floating Dock Navigation Component
 * Vertical navigation dock with smooth animations
 */

class FloatingDock {
    constructor() {
        this.dockItems = [
            {
                id: 'home',
                icon: 'fa-home',
                title: 'Home',
                action: 'slide'
            },
            {
                id: 'about',
                icon: 'fa-info-circle',
                title: 'Tentang ITO',
                action: 'modal'
            },
            {
                id: 'schedule',
                icon: 'fa-calendar-alt',
                title: 'Timeline',
                action: 'modal'
            },
            {
                id: 'sponsor',
                icon: 'fa-handshake',
                title: 'Sponsor',
                action: 'modal'
            },
            {
                id: 'galeri',
                icon: 'fa-images',
                title: 'Galeri',
                action: 'modal'
            }
        ];
        
        this.currentActive = 'home';
        this.isMobile = window.innerWidth <= 768;
        this.mobileOpen = false;
        
        this.init();
    }
    
    init() {
        this.createDock();
        this.createMobileToggle();
        this.attachEventListeners();
        this.handleResize();
        
        // Animate dock on load
        setTimeout(() => {
            const dock = document.querySelector('.floating-dock');
            if (dock) {
                dock.classList.add('animate-in');
            }
        }, 500);
    }
    
    createDock() {
        const dockHTML = `
            <div class="floating-dock ${this.isMobile ? 'mobile-view' : ''}">
                ${this.dockItems.map(item => this.createDockItem(item)).join('')}
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', dockHTML);
        
        // Set home as active by default
        this.setActive('home');
    }
    
    createDockItem(item) {
        return `
            <div class="dock-item ${item.id === 'home' ? 'active' : ''}" 
                 data-id="${item.id}" 
                 data-action="${item.action}">
                <i class="dock-icon fas ${item.icon}"></i>
                <div class="dock-tooltip">${item.title}</div>
            </div>
        `;
    }
    
    createMobileToggle() {
        if (this.isMobile) {
            const toggleHTML = `
                <button class="mobile-dock-toggle">
                    <i class="fas fa-bars"></i>
                </button>
            `;
            document.body.insertAdjacentHTML('beforeend', toggleHTML);
        }
    }
    
    attachEventListeners() {
        // Dock item clicks
        document.addEventListener('click', (e) => {
            const dockItem = e.target.closest('.dock-item');
            if (dockItem) {
                const itemId = dockItem.dataset.id;
                const action = dockItem.dataset.action;
                
                this.handleDockClick(itemId, action);
                
                if (this.isMobile && this.mobileOpen) {
                    this.toggleMobileDock();
                }
            }
            
            // Mobile toggle click
            const mobileToggle = e.target.closest('.mobile-dock-toggle');
            if (mobileToggle) {
                this.toggleMobileDock();
            }
        });
        
        // Window resize handler
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }
    
    handleDockClick(itemId, action) {
        this.setActive(itemId);
        
        // Dispatch custom event for content manager
        const event = new CustomEvent('dockItemClick', {
            detail: {
                itemId: itemId,
                action: action
            }
        });
        document.dispatchEvent(event);
    }
    
    setActive(itemId) {
        this.currentActive = itemId;
        
        // Update active state in DOM
        const allItems = document.querySelectorAll('.dock-item');
        allItems.forEach(item => {
            if (item.dataset.id === itemId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
    
    toggleMobileDock() {
        const dock = document.querySelector('.floating-dock');
        const toggle = document.querySelector('.mobile-dock-toggle');
        
        if (dock && toggle) {
            this.mobileOpen = !this.mobileOpen;
            
            if (this.mobileOpen) {
                dock.classList.add('mobile-open');
                toggle.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                dock.classList.remove('mobile-open');
                toggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    }
    
    handleResize() {
        const wasMobile = this.isMobile;
        this.isMobile = window.innerWidth <= 768;
        
        // If switching between mobile and desktop
        if (wasMobile !== this.isMobile) {
            // Remove old dock and toggle
            const oldDock = document.querySelector('.floating-dock');
            const oldToggle = document.querySelector('.mobile-dock-toggle');
            
            if (oldDock) oldDock.remove();
            if (oldToggle) oldToggle.remove();
            
            // Recreate with new layout
            this.createDock();
            this.createMobileToggle();
            this.setActive(this.currentActive);
        }
    }
    
    // Public method to programmatically set active item
    navigateTo(itemId) {
        const item = this.dockItems.find(i => i.id === itemId);
        if (item) {
            this.handleDockClick(itemId, item.action);
        }
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.floatingDock = new FloatingDock();
    });
} else {
    window.floatingDock = new FloatingDock();
}
