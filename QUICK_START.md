# Quick Start Guide - ITO Single Page Layout

## 🚀 Getting Started

### 1. Open the Website
Simply open `index.html` in your browser. No server required!

```bash
# Option 1: Double-click index.html

# Option 2: Use a local server (recommended)
python -m http.server 8000
# Then visit: http://localhost:8000

# Option 3: Use Live Server (VS Code extension)
# Right-click index.html > Open with Live Server
```

### 2. Navigation

#### Desktop
- **Floating Dock** appears on the left side
- **Hover** over icons to see labels
- **Click** icons to open sections
- **ESC** to close modals

#### Mobile
- **Floating Button** at the bottom
- **Tap** to open navigation menu
- **Swipe Down** to close modals

### 3. Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `1` | Home |
| `2` | Tentang ITO |
| `3` | Timeline |
| `4` | Sponsor |
| `5` | Galeri |
| `ESC` | Close Modal |

## 🎨 Features at a Glance

### Home Section
- **Always visible** as background
- Parallax hero slider
- Animated text effects

### Modal Sections
- **Tentang ITO**: Mission and vision
- **Timeline**: Event schedule with animations
- **Sponsor**: Grid of sponsor logos
- **Galeri**: Photo gallery with lightbox

## 📱 Mobile Experience

### Optimizations
- ✅ Touch-friendly navigation
- ✅ Full-screen modals
- ✅ Swipe gestures
- ✅ Optimized animations
- ✅ Responsive images

### Tips
- Tap the floating button to access navigation
- Swipe down from top of modal to close
- Pinch to zoom on gallery images

## 🎯 Customization

### Change Colors
Edit `assets/css/floating-dock.css`:
```css
/* Line 14: Primary color */
background: #0d5aa5; /* Change this */

/* Line 23: Hover color */
background: #1e73be; /* Change this */
```

### Change Content
Edit `assets/js/content-manager.js`:
- `getAboutContent()` - About section text
- `getTimelineContent()` - Timeline events
- `getSponsorContent()` - Sponsor logos
- `getGalleryContent()` - Gallery images

### Change Navigation Items
Edit `assets/js/floating-dock.js` line 11-37:
```javascript
this.dockItems = [
    {
        id: 'home',
        icon: 'fa-home',
        title: 'Home',
        action: 'slide'
    },
    // Add more items here
];
```

## 🔧 Troubleshooting

### Dock Not Visible?
1. Check browser console (F12) for errors
2. Verify all CSS files are loaded
3. Clear browser cache (Ctrl+Shift+R)

### Modals Not Opening?
1. Check JavaScript files are loaded
2. Verify no JavaScript errors in console
3. Try disabling browser extensions

### Animations Laggy?
1. Close other browser tabs
2. Update graphics drivers
3. Try Chrome or Edge for better performance

### Mobile Issues?
1. Test on actual device (not just browser resize)
2. Check if touch events are working
3. Verify viewport meta tag is present

## 📊 Performance Tips

### For Best Performance
- ✅ Use modern browser (Chrome, Firefox, Edge)
- ✅ Close unnecessary tabs
- ✅ Enable hardware acceleration
- ✅ Update browser to latest version

### Optimize Images
```bash
# Compress images for web
# Use tools like:
- TinyPNG (https://tinypng.com)
- ImageOptim (https://imageoptim.com)
- Squoosh (https://squoosh.app)
```

## 🌐 Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Full Support |
| Firefox | 88+ | ✅ Full Support |
| Safari | 14+ | ✅ Full Support |
| Edge | 90+ | ✅ Full Support |
| Mobile Safari | iOS 14+ | ✅ Full Support |
| Chrome Mobile | Latest | ✅ Full Support |

## 📝 File Overview

```
index.html                    # Main HTML file
assets/
  css/
    ├── floating-dock.css           # Navigation dock
    ├── modal-cards.css             # Modal system
    ├── animations.css              # Animations
    ├── single-page-layout.css      # Layout
    └── cross-browser-fixes.css     # Compatibility
  js/
    ├── floating-dock.js            # Dock logic
    ├── content-manager.js          # Content system
    ├── section-components.js       # Enhancements
    └── single-page-init.js         # Initialization
```

## 🆘 Need Help?

### Contact
- 📧 Email: Ito.smktelkomdu.du@gmail.com
- 📱 Instagram: @ito.smktelkomdu
- 🌐 Website: [SMK Telkom Darul Ulum](https://smktelkomdu.sch.id)

### Resources
- [FontAwesome Icons](https://fontawesome.com/v5/search)
- [GLightbox Docs](https://biati-digital.github.io/glightbox/)
- [CSS Animations](https://animate.style/)

## ✨ Next Steps

1. **Test** the website on different devices
2. **Customize** colors and content
3. **Add** more sections if needed
4. **Optimize** images for faster loading
5. **Deploy** to your hosting

---

**Happy Building! 🎉**

Made with ❤️ for ITO 2024
