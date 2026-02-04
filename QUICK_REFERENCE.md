# ⚡ Quick Reference Guide - Marvel Multiverse

## 🎮 Essential Commands

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Deploy to GitHub Pages
npm run deploy
```

---

## 🎨 Quick Customization

### Change Portal Color
**File:** `src/components/3D/MysticPortal.js`
```javascript
const COLOR_ORANGE = new THREE.Color("#YOUR_COLOR");
```

### Adjust Star Count
**File:** `src/components/3D/SpaceBackground.js`
```javascript
const count = 80000; // Reduce for better performance
```

### Modify Button Text
**File:** `src/sections/LandingSection.js`
```javascript
<span className="button-text">YOUR TEXT HERE</span>
```

### Change Nebula Colors
**File:** `src/components/3D/SpaceBackground.js`
```javascript
gradient1.addColorStop(0, 'rgba(YOUR, RGB, HERE, 0.4)');
```

---

## 🔊 Sound Controls

```javascript
import soundManager from './utils/soundManager';

// Enable/disable sounds
soundManager.enable();
soundManager.disable();
soundManager.toggle();

// Play specific sounds
soundManager.playPortalSwirl();
soundManager.playEnergyBurst();
soundManager.playButtonHover();

// Adjust volume
soundManager.setVolume(0.5); // 0.0 to 1.0
```

---

## 🎯 Component Quick Access

### Main Components
```
App.js                  - Main orchestrator
Navigation.js           - Top UI bar
LandingSection.js       - Hero section with portal
SpaceBackground.js      - Star field + nebula
MysticPortal.js         - Doctor Strange portal
VolumetricLightRays.js  - Cinematic lighting
```

### Section Components
```
EventsGalaxySection.js         - Tech Universe
SpeakersConstellationSection.js - Genius Universe
RegistrationPortalSection.js    - Portal Chamber
GalleryUniverseSection.js       - Memory Zone
```

---

## 📐 Important CSS Classes

```css
/* Text Effects */
.glow-text              /* Pulsing glowing text */
.hero-title             /* Main hero title with gradient */
.title-word             /* Individual animated words */

/* UI Components */
.hologram-card          /* Glass panel container */
.nav-link               /* Navigation button */
.enter-button           /* Main CTA button */

/* Background Effects */
.cosmic-backdrop        /* Nebula layers container */
.energy-streaks         /* Multiversal tears */
.nebula-lightning       /* Lightning flashes */
.dimension-debris       /* Floating rocks */
```

---

## 🎨 Color Variables

```css
:root {
  --portal-orange: #ff8c1a;
  --energy-gold: #ffd27a;
  --cosmic-purple: #5a2a82;
  --reality-blue: #2a6fff;
  --quantum-teal: #00ffd5;
  --dark-bg-primary: #050914;
}
```

---

## 🔧 Performance Tuning

### Reduce Particles (Low-End Devices)
```javascript
// SpaceBackground.js
const count = 40000; // Instead of 160000

// MysticPortal.js
createParticles(5000, ...) // Instead of 14000
```

### Disable Heavy Effects
```javascript
// App.js - Remove volumetric rays
// Comment out: <VolumetricLightRays />
```

### Simplify Animations
```css
/* Set to prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
  }
}
```

---

## 🐛 Quick Fixes

### Portal Not Showing
```javascript
// Increase portal scale
<MysticPortal scale={2.0} />
```

### Too Dark
```javascript
// Increase ambient light
<ambientLight intensity={0.8} />
```

### Laggy Animations
```javascript
// Reduce update frequency in useFrame
if (Math.floor(timeRef.current * 60) % 5 === 0) {
  // Update logic
}
```

---

## 📱 Responsive Breakpoints

```css
/* Desktop */
@media (min-width: 1024px) { }

/* Tablet */
@media (max-width: 1023px) { }

/* Mobile */
@media (max-width: 768px) { }

/* Small Mobile */
@media (max-width: 480px) { }
```

---

## 🎬 Animation Speed Reference

```css
/* Ultra Fast */
0.1s - 0.3s   /* Click feedback */

/* Fast */
0.4s - 0.6s   /* Hover states */

/* Medium */
1s - 2s       /* Transitions */

/* Slow */
3s - 8s       /* Ambient effects */

/* Very Slow */
30s - 120s    /* Background drift */
```

---

## 🔍 Debug Tips

### Check 3D Scene
```javascript
// Add to useFrame
console.log('Camera:', camera.position);
console.log('Portal:', portalRef.current?.position);
```

### Monitor Performance
```javascript
// Add to useFrame
console.log('FPS:', 1 / delta);
```

### View Particle Count
```javascript
console.log('Stars:', starsRef.current?.geometry.attributes.position.count);
```

---

## 🌟 Common Tasks

### Add New Section
1. Create `src/sections/NewSection.js`
2. Import in `App.js`
3. Add to `sections` array
4. Style in `NewSection.css`

### Add Sound Effect
```javascript
// In soundManager.js
playCustomSound() {
  const osc = this.audioContext.createOscillator();
  // Configure oscillator
  osc.start();
}
```

### Change Font
```css
/* In index.css */
@import url('https://fonts.googleapis.com/css2?family=YourFont');
:root {
  --font-futuristic: 'YourFont', sans-serif;
}
```

---

## 📊 Performance Monitoring

### Chrome DevTools
1. Press F12
2. Go to Performance tab
3. Record while scrolling
4. Check FPS and CPU usage

### React DevTools
1. Install React DevTools extension
2. Check component render times
3. Identify unnecessary re-renders

---

## 🚀 Production Build

```bash
# Create optimized build
npm run build

# Build folder will contain:
build/
├── static/
│   ├── js/
│   ├── css/
│   └── media/
└── index.html
```

### Deploy Options
- **Vercel**: Connect GitHub repo
- **Netlify**: Drag & drop build folder
- **GitHub Pages**: `npm run deploy`

---

## 📝 Content Update Guide

### Change Event Info
**File:** `src/sections/EventsGalaxySection.js`
```javascript
const EVENTS = [
  {
    id: 1,
    name: 'Your Event',
    description: 'Your description',
    // ...
  }
];
```

### Update Speakers
**File:** `src/sections/SpeakersConstellationSection.js`
```javascript
const SPEAKERS = [
  {
    id: 1,
    name: 'Speaker Name',
    role: 'Title',
    // ...
  }
];
```

---

## 🎯 Key Metrics

```
Stars: 280,000
Particles: 23,000+
Animations: 30+
Components: 15+
Sections: 9
Files Modified: 20+
New Files: 3
```

---

## 🔗 Important Links

- **React Three Fiber Docs**: https://docs.pmnd.rs/react-three-fiber
- **Three.js Docs**: https://threejs.org/docs
- **Web Audio API**: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API

---

## 💡 Pro Tips

1. **Use Memoization**: Wrap expensive calculations in `useMemo()`
2. **Optimize Images**: Use WebP format when possible
3. **Lazy Load**: Load heavy assets only when needed
4. **Test on Real Devices**: Don't rely only on browser dev tools
5. **Monitor Bundle Size**: Keep build under 500KB for fast load

---

## ✅ Pre-Launch Checklist

- [ ] Test all interactions
- [ ] Verify mobile responsiveness
- [ ] Check all sections load correctly
- [ ] Test sound system
- [ ] Validate form submissions
- [ ] Check SEO meta tags
- [ ] Test on multiple browsers
- [ ] Optimize images
- [ ] Run Lighthouse audit
- [ ] Set up analytics

---

**Need More Help?**
- Read: `MARVEL_TRANSFORMATION.md`
- Check: `DESIGN_SYSTEM.md`
- Review: `TRANSFORMATION_SUMMARY.md`

---

**Quick Hotkeys:**
- `Ctrl+Shift+I` - Open DevTools
- `Ctrl+Shift+M` - Toggle device toolbar
- `Ctrl+Shift+P` - Command palette
- `F5` - Refresh page
- `Ctrl+Shift+R` - Hard refresh

---

*Last Updated: February 4, 2026*
