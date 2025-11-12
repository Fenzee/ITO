/**
 * Slide Navigation with Up/Down Buttons
 * PowerPoint-style slide navigation
 */

class SlideNavigation {
  constructor() {
    this.sections = [
      "home",
      "about",
      "schedule",
      "sponsor",
      "galeri",
      "registration",
    ];
    this.currentIndex = 0;
    this.isTransitioning = false;
    this.touchStartY = 0; // Added for touch handling
    this.touchEndY = 0;   // Added for touch handling

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

    document.body.insertAdjacentHTML("beforeend", navHTML);
  }

  createDotsIndicator() {
    const dotsHTML = `
            <div class="slide-dots-indicator">
                ${this.sections
                  .map(
                    (section, index) => `
                    <div class="slide-dot ${index === 0 ? "active" : ""}" 
                         data-index="${index}" 
                         title="${this.getSectionTitle(section)}">
                    </div>
                `
                  )
                  .join("")}
            </div>
        `;

    document.body.insertAdjacentHTML("beforeend", dotsHTML);
  }

  attachEventListeners() {
    // Up button
    document.querySelector(".slide-nav-up").addEventListener("click", () => {
      this.navigateUp();
    });

    // Down button
    document.querySelector(".slide-nav-down").addEventListener("click", () => {
      this.navigateDown();
    });

    // Dot indicators
    document.querySelectorAll(".slide-dot").forEach((dot, index) => {
      dot.addEventListener("click", () => {
        this.navigateToIndex(index);
      });
    });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (this.isTransitioning) return;

      if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        this.navigateUp();
      } else if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        this.navigateDown();
      } else if (e.key === "Home" || e.key === "Escape") {
        e.preventDefault();
        this.navigateToIndex(0);
      } else if (e.key === "End") {
        e.preventDefault();
        this.navigateToIndex(this.sections.length - 1);
      }
    });

    
    // Listen for dock navigation to sync
    document.addEventListener("dockItemClick", (e) => {
      const sectionId = e.detail.itemId;
      const index = this.sections.indexOf(sectionId);
      if (index !== -1) {
        this.currentIndex = index;
        this.updateButtons();
        this.updateDots();
      }
    });
  }

  // Added for touch handling
  handleTouchStart(e) {
    // Only track touches on the main content area, not inside interactive elements of slides
    const slideContent = e.target.closest('.ppt-slide-content');
    const isHome = this.sections[this.currentIndex] === 'home';

    if (isHome || slideContent) {
        this.touchStartY = e.changedTouches[0].screenY;
    }
  }

  // Added for touch handling
  handleTouchEnd(e) {
    const slideContent = e.target.closest('.ppt-slide-content');
    const isHome = this.sections[this.currentIndex] === 'home';

    if (!isHome && !slideContent) {
        // If touch ends outside of a slide content area (and not on home), do nothing.
        return;
    }
      
    this.touchEndY = e.changedTouches[0].screenY;
    this.handleSwipeGesture();
  }

  // Added for touch handling
  handleSwipeGesture() {
    if (this.isTransitioning) return;

    const swipeThreshold = 50; // Minimum pixels for a swipe
    const deltaY = this.touchStartY - this.touchEndY;

    // Only trigger if a significant swipe occurred
    if (Math.abs(deltaY) < swipeThreshold) return;

    const activeSlide = document.querySelector(".ppt-slide.active");
    const content = activeSlide ? activeSlide.querySelector(".ppt-slide-content") : null;

    let allowNavigation = false;

    if (content) {
        // Logic for slides with content
        const isAtTop = content.scrollTop === 0;
        const isAtBottom = Math.abs(content.scrollHeight - content.clientHeight - content.scrollTop) < 1;

        if (deltaY > 0 && (isAtBottom || content.scrollHeight <= content.clientHeight)) { // Swiped Up at bottom or not scrollable
            allowNavigation = true;
        } else if (deltaY < 0 && isAtTop) { // Swiped Down at top
            allowNavigation = true;
        }
    } else {
        // Logic for home section (no scrollable content)
        allowNavigation = true;
    }

    if (allowNavigation) {
        if (deltaY > 0) { // Swiped Up
            this.navigateDown();
        } else { // Swiped Down
            this.navigateUp();
        }
    }
  }

  navigateUp() {
    if (this.isTransitioning || this.currentIndex === 0) return;

    this.currentIndex--;
    this.navigate();
  }

  navigateDown() {
    if (this.isTransitioning || this.currentIndex === this.sections.length - 1)
      return;

    this.currentIndex++;
    this.navigate();
  }

  navigateToIndex(index) {
    if (
      this.isTransitioning ||
      index === this.currentIndex ||
      index < 0 ||
      index >= this.sections.length
    )
      return;

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
    const upBtn = document.querySelector(".slide-nav-up");
    const downBtn = document.querySelector(".slide-nav-down");

    if (upBtn) {
      if (this.currentIndex === 0) {
        upBtn.classList.add("disabled");
      } else {
        upBtn.classList.remove("disabled");
      }
    }

    if (downBtn) {
      if (this.currentIndex === this.sections.length - 1) {
        downBtn.classList.add("disabled");
      } else {
        downBtn.classList.remove("disabled");
      }
    }
  }

  updateDots() {
    const dots = document.querySelectorAll(".slide-dot");
    dots.forEach((dot, index) => {
      if (index === this.currentIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  showIndicator(sectionId) {
    const indicator = document.querySelector(".slide-nav-indicator");
    if (indicator) {
      indicator.textContent = this.getSectionTitle(sectionId);
      indicator.classList.add("show");

      setTimeout(() => {
        indicator.classList.remove("show");
      }, 2000);
    }
  }

  getSectionTitle(sectionId) {
    const titles = {
      home: "Home",
      about: "Tentang ITO",
      schedule: "Timeline",
      sponsor: "Sponsor",
      galeri: "Galeri",
      registration: "Registrasi",
    };
    return titles[sectionId] || sectionId;
  }
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    window.slideNavigation = new SlideNavigation();
  });
} else {
  window.slideNavigation = new SlideNavigation();
}