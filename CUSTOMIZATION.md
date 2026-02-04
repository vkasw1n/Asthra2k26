# Quick Customization Guide

## 🎨 Essential Changes to Make

### 1. Update College Name
**File**: `src/sections/AboutSection.js`
```javascript
// Line ~45 - Update college info card
<div className="about-card glass-panel">
  <div className="card-number">04</div>
  <h3 className="card-title">College Pride</h3>
  <p>
    Championing innovation in [YOUR COLLEGE NAME], we showcase student talent...
  </p>
</div>
```

**File**: `src/sections/ContactStationSection.js`
```javascript
// Line ~60 - Update location
<div className="info-card glass-panel">
  <div className="info-icon">📍</div>
  <h4 className="info-title">Location</h4>
  <p>[YOUR COLLEGE NAME]</p>
  <p>[City, State - Pin Code]</p>
</div>
```

**File**: `public/index.html`
```html
<!-- Line 7 -->
<title>[YOUR COLLEGE NAME] - Multiverse Symposium 2026</title>

<!-- Line 10 -->
<meta name="description" content="[YOUR COLLEGE NAME] Multiverse Symposium 2026 - Step Into Infinite Dimensions of Innovation" />
```

---

### 2. Add Your Events
**File**: `src/sections/EventsGalaxySection.js`
```javascript
// Add to EVENTS array (lines 7-60)
{
  id: 3,
  name: 'Your Event Name',
  category: 'Technical',  // or 'Non-Technical', 'Workshop', etc.
  icon: '💻',            // Use any emoji
  color: '#00d4ff',      // Use: #00d4ff, #b026ff, #00ff88, #ffaa00
  description: 'What is this event about?',
  rules: 'How to participate, time limits, tools allowed',
  teamSize: '2-3 people',
  prizes: '₹25,000 | ₹15,000 | ₹10,000'
}
```

---

### 3. Update Countdown Date
**File**: `src/sections/DateAnnouncementSection.js`
```javascript
// Line ~30 - Change the date
const eventDate = new Date('2026-03-15').getTime();
// Change '2026-03-15' to your actual event date (YYYY-MM-DD)
```

---

### 4. Add Speakers
**File**: `src/sections/SpeakersConstellationSection.js`
```javascript
// Add to SPEAKERS array (lines 5-25)
{
  id: 3,
  name: 'Dr. Jane Smith',
  title: 'Software Engineer',
  company: 'Tech Company',
  bio: 'Brief description of their achievements',
  expertise: 'AI/ML',  // or 'Security', 'Web3', etc.
  image: '🚀'        // Use any emoji
}
```

---

### 5. Update Venue Information
**File**: `src/sections/VenueDimensionSection.js`
```javascript
// Lines 25-90 - Update building details and access info
<div className="venue-card glass-panel">
  <div className="card-icon">🏛️</div>
  <h3 className="card-title">Your Building Name</h3>
  <p className="card-desc">What happens here?</p>
  <p className="card-meta">Capacity: XX | Location: Building XYZ</p>
</div>
```

---

### 6. Customize Gallery Items
**File**: `src/sections/GalleryUniverseSection.js`
```javascript
// Add to GALLERY_ITEMS array (lines 3-12)
{ id: 1, title: 'Your Event Title', emoji: '🎤', color: '#00d4ff' },
{ id: 2, title: 'Another Event', emoji: '💻', color: '#b026ff' },
```

---

### 7. Update Contact Details
**File**: `src/sections/ContactStationSection.js`
```javascript
// Lines 57-85 - Update all contact information
<p>your-email@college.edu</p>
<p>+91 XXXXXXXXXX</p>
<a href="https://twitter.com/yourhandle">Twitter</a>
<a href="https://instagram.com/yourhandle">Instagram</a>
```

Also update the footer:
```javascript
// Lines 160-170
<p>&copy; 2026 [YOUR COLLEGE NAME] Symposium. All rights reserved.</p>
<p>Designed with ❤️ from the [YOUR DEPARTMENT] Dept</p>
```

---

### 8. Change Color Scheme
**File**: `src/index.css` (lines 18-24)
```css
:root {
  --primary-color: #00d4ff;      /* Main color - change this */
  --secondary-color: #b026ff;    /* Secondary - change this */
  --accent-color: #00ff88;       /* Accent - change this */
  --dark-bg: #0a0e27;            /* Dark background */
  --glow-color: #00d4ff;         /* Glow effect color */
  /* ... */
}
```

**Popular Color Combinations**:
- Cyan-Purple-Green (current): `#00d4ff`, `#b026ff`, `#00ff88`
- Blue-Pink-Cyan: `#0099ff`, `#ff0099`, `#00ffff`
- Red-Orange-Yellow: `#ff3366`, `#ff9900`, `#ffcc00`
- Neon Green-Blue-Purple: `#39ff14`, `#0080ff`, `#be0aff`

---

## ⚡ Advanced Customization

### Add More Navigation Sections
**File**: `src/App.js`
```javascript
// In the sections array (around line 20)
const sections = [
  { id: 'landing', label: 'Universe', component: LandingSection },
  { id: 'about', label: 'About', component: AboutSection },
  // Add new section here
  { id: 'newpage', label: 'New Page', component: NewPageSection },
];
```

Then create a new section file: `src/sections/NewPageSection.js`

### Change Font
**File**: `public/index.html`
```html
<!-- Change the font imports (line 9) -->
<link href='https://fonts.googleapis.com/css2?family=YOUR-FONT:wght@400;700&display=swap' rel='stylesheet'>
```

Then in `src/index.css`, update the font-family:
```css
--font-futuristic: 'YOUR-FONT', sans-serif;
```

### Add Music
**File**: `src/App.js`
```javascript
useEffect(() => {
  if (musicEnabled) {
    // Create audio element
    const audio = new Audio('/ambient-music.mp3');
    audio.loop = true;
    audio.volume = 0.3;
    audio.play();
  }
}, [musicEnabled]);
```

Then add an audio file to `public/ambient-music.mp3`

### Disable 3D Background
**File**: `src/App.js`
```javascript
// Comment out or remove the Canvas component (lines 39-48)
{/* <div className="canvas-container">
  <Canvas camera={{ position: [0, 0, 50], fov: 75 }} className="space-canvas">
    {/* ... */}
  </Canvas>
</div> */}
```

---

## 🔍 Common Values Reference

### Emoji Icons
**Events**: `💻` `🤖` `🌐` `🎨` `🚀` `⛓️` `☁️` `🎤`
**Speakers**: `🧠` `☁️` `🎨` `⛓️` `🔐` `🚀`
**Gallery**: `🎤` `💻` `🏆` `🤝` `🎯` `👥` `💡` `🎉`

### Colors (Hex)
- Cyan: `#00d4ff`
- Purple: `#b026ff`
- Green: `#00ff88`
- Orange: `#ffaa00`
- Red: `#ff3366`
- Blue: `#0080ff`

### Font Sizes
- Section Title: `48px` (desktop), `32px` (mobile)
- Subtitle: `28px` (desktop), `18px` (mobile)
- Card Title: `18px`
- Body Text: `14px`
- Label: `12px` or `13px`

---

## ✅ Pre-Launch Checklist

- [ ] Updated college name everywhere
- [ ] Added all events with details
- [ ] Listed all speakers
- [ ] Updated venue/building information
- [ ] Changed contact email and phone
- [ ] Updated social media links
- [ ] Set correct event countdown date
- [ ] Changed color scheme if desired
- [ ] Updated footer copyright
- [ ] Tested on mobile devices
- [ ] Checked all links work
- [ ] Updated page title in HTML
- [ ] Added college logo (optional)
- [ ] Tested form submissions

---

## 🚀 Deployment

### Deploy to Vercel
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import project
4. Click Deploy
5. Share the link!

### Deploy to Netlify
1. Build: `npm run build`
2. Go to [netlify.com](https://netlify.com)
3. Drag and drop the `build/` folder
4. Done!

### Deploy to Custom Server
1. Build: `npm run build`
2. Upload `build/` folder via FTP
3. Configure web server to serve `index.html` for all routes
4. Done!

---

**Need help? Check README.md and COMPONENTS.md for more info!** 🎓✨
