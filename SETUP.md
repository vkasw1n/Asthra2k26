# Multiverse Symposium 2026 - Setup Instructions

## Quick Start Guide

### 1. Install Node Modules
```bash
npm install
```

This will install all required dependencies:
- react & react-dom
- three.js & react-three-fiber
- @react-three/drei
- zustand (state management)
- tailwindcss & postcss

### 2. Start Development Server
```bash
npm start
```

The application will open automatically at `http://localhost:3000`

### 3. File Structure Overview

```
src/
├── App.js (Main app component with routing)
├── index.js (Entry point)
├── components/
│   ├── 3D/ (Three.js components)
│   └── Navigation.js (Top navigation bar)
├── sections/ (Individual page sections)
│   ├── LandingSection.js
│   ├── AboutSection.js
│   ├── DateAnnouncementSection.js
│   ├── EventsGalaxySection.js
│   ├── RegistrationPortalSection.js
│   ├── SpeakersConstellationSection.js
│   ├── VenueDimensionSection.js
│   ├── GalleryUniverseSection.js
│   └── ContactStationSection.js
```

### 4. Customization Guide

#### Change College Name
- Open `src/sections/AboutSection.js` and update college info
- Open `src/sections/ContactStationSection.js` and update contact details
- Update window title in `public/index.html`

#### Update Event List
- Edit `src/sections/EventsGalaxySection.js`
- Modify the `EVENTS` array with your event details

#### Change Speaker Information
- Edit `src/sections/SpeakersConstellationSection.js`
- Update the `SPEAKERS` array

#### Modify Color Scheme
- Edit `src/index.css` `:root` variables:
  ```css
  --primary-color: #00d4ff;
  --secondary-color: #b026ff;
  --accent-color: #00ff88;
  ```

#### Update Venue Details
- Edit `src/sections/VenueDimensionSection.js`
- Update building names and details in the campus visualization

### 5. Add More Events
In `EventsGalaxySection.js`, add new event objects to the EVENTS array:
```javascript
{
  id: 9,
  name: 'New Event',
  category: 'Technical',
  icon: '🎯',
  color: '#00d4ff',
  description: 'Event description',
  rules: 'Event rules',
  teamSize: '2-3 people',
  prizes: '₹XX,XXX | ₹XX,XXX | ₹X,XXX'
}
```

### 6. Features by Section

**Landing** - Portal, logo, CTA, quick nav
**About** - College info, vision, highlights
**Date** - Countdown, email signup
**Events** - Event cards, filtering, modal details
**Registration** - Teleport gate, form, success animation
**Speakers** - Star constellation, speaker profiles
**Venue** - Campus map, building details, access info
**Gallery** - Floating frames, 3D effects
**Contact** - Space station, message form, footer

### 7. Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

### 8. Troubleshooting

**Port 3000 already in use**:
```bash
npm start -- --port 3001
```

**Module not found errors**:
```bash
rm -rf node_modules package-lock.json
npm install
```

**Three.js not rendering**:
- Check browser WebGL support
- Clear browser cache
- Try different browser

### 9. Production Build

```bash
npm run build
```

This creates an optimized `build/` folder ready for deployment.

### 10. Deployment Options

- **Vercel**: Connect GitHub repo, auto-deploy
- **Netlify**: Similar to Vercel, drag-and-drop build folder
- **GitHub Pages**: Create GitHub Pages branch
- **Traditional Hosting**: Upload `build/` folder via FTP

---

**Happy building! 🚀✨**
