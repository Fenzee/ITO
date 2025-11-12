# ITO Single Page Layout - Documentation

## Overview

The ITO landing page has been transformed into a single-section, no-scroll interface with a vertical floating navigation dock. Content is displayed through modal cards with PowerPoint-style animations, creating an immersive and modern user experience.

## Features

### 🎯 Core Features
- **Single Viewport Layout**: No page scrolling, all content in one view
- **Vertical Floating Dock**: Left-side navigation with smooth animations
- **Modal Card System**: Content displayed in beautiful modal cards
- **PowerPoint-style Transitions**: Smooth slide and fade animations
- **Mobile Responsive**: Optimized dock and modal experience for mobile devices
- **Keyboard Shortcuts**: Quick navigation with number keys
- **Touch Gestures**: Swipe down to close modals on mobile

### 🎨 Design Elements
- Color scheme synchronized with ITO branding (#0d5aa5, #1e73be)
- Smooth animations and transitions
- Glassmorphism effects on top bar and footer
- Stagger animations for list items
- Hover effects with scale transformations

## File Structure

```
assets/
  css/
    ├── floating-dock.css          # Vertical navigation dock styles
    ├── modal-cards.css            # Modal and card system styles
    ├── animations.css             # PowerPoint-style animations
    └── single-page-layout.css     # Single page specific styles
  
  js/
    ├── floating-dock.js           # Dock navigation logic
    ├── content-manager.js         # Modal and content switching
    ├── section-components.js      # Section-specific enhancements
    └── single-page-init.js        # Initialization and utilities
```

## Navigation Structure

### Floating Dock Items
1. **Home** (🏠) - Display hero slider
2. **Tentang ITO** (ℹ️) - About ITO modal
3. **Timeline** (📅) - Event timeline modal
4. **Sponsor** (🤝) - Sponsors grid modal
5. **Galeri** (🖼️) - Photo gallery modal

## Keyboard Shortcuts

- `1` - Navigate to Home
- `2` - Open Tentang ITO
- `3` - Open Timeline
- `4` - Open Sponsor
- `5` - Open Galeri
- `ESC` - Close any open modal

## Mobile Experience

### Mobile Dock
- Appears as a bottom floating bar
- Toggle button to show/hide navigation
- Touch-friendly icon sizes
- Swipe down gesture to close modals

### Mobile Optimizations
- Full-screen modals on mobile
- Simplified animations for better performance
- Larger touch targets
- Hidden footer to maximize space

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Technical Implementation

### Modal System
Modals are created dynamically with:
- Fade-in animations (300ms)
- Scale transform effects
- Backdrop blur
- Smooth content loading
- Stagger animations for list items

### Content Management
Each section is rendered from JavaScript with:
- Timeline data structures
- Gallery image arrays
- Sponsor logos grid
- About content HTML

### Performance Features
- Lazy loading for images
- Debounced resize events
- Intersection Observer for animations
- Cleanup on modal close
- Optimized CSS animations

## Customization

### Colors
Edit these CSS variables in your styles:
```css
Primary: #0d5aa5
Secondary: #1e73be
Overlay: rgba(0, 0, 0, 0.85)
```

### Animations
Modify animation durations in:
- `floating-dock.css` - Dock animations
- `modal-cards.css` - Modal transitions
- `animations.css` - Content animations

### Content
Update content in `content-manager.js`:
- `getAboutContent()` - About section
- `getTimelineContent()` - Timeline events
- `getSponsorContent()` - Sponsor logos
- `getGalleryContent()` - Gallery images

## Events System

### Custom Events
```javascript
// Dock item clicked
document.addEventListener('dockItemClick', (e) => {
  console.log(e.detail.itemId, e.detail.action);
});

// Modal content loaded
document.addEventListener('modalContentLoaded', (e) => {
  console.log(e.detail.sectionId);
});
```

## Troubleshooting

### Issue: Dock not appearing
- Check if CSS files are loaded
- Verify JavaScript execution order
- Check browser console for errors

### Issue: Modals not opening
- Ensure content-manager.js is loaded
- Check for JavaScript conflicts
- Verify event listeners are attached

### Issue: Animations not smooth
- Check if hardware acceleration is enabled
- Reduce animation complexity on low-end devices
- Verify CSS transform properties

### Issue: Mobile dock not working
- Test responsive breakpoints (768px)
- Check touch event listeners
- Verify mobile-specific CSS is applied

## Future Enhancements

Potential improvements:
- [ ] Add more animation variations
- [ ] Implement section transitions (horizontal slides)
- [ ] Add sound effects for interactions
- [ ] Create admin panel for content editing
- [ ] Add analytics tracking
- [ ] Implement preloader with progress
- [ ] Add more keyboard shortcuts
- [ ] Create accessibility improvements

## Credits

- Original ITO Website by SMK Telekomunikasi Darul Ulum
- Single Page Layout Enhancement
- FontAwesome Icons
- GLightbox for gallery
- Slick Slider for hero carousel

## Support

For issues or questions:
- Email: Ito.smktelkomdu.du@gmail.com
- Instagram: @ito.smktelkomdu

---

**© 2024 SMK Telekomunikasi Darul Ulum - All Rights Reserved**
