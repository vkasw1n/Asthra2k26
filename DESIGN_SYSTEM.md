# 🎨 Visual Design System - Marvel Multiverse

## Color Gradients

### Primary Gradients
```
Portal Energy: #ff8c1a → #ffd27a
Reality Blue: #2a6fff → #00d4ff  
Cosmic Purple: #5a2a82 → #8a2be2
Quantum Teal: #00ffd5 → #2affff
```

### Text Gradients
```
Hero Title (Blue): #00d4ff → #00ffd5 → #2a6fff
Hero Title (Gold): #ffd27a → #ff8c1a → #ffd27a
Energy Line: transparent → #ff8c1a → #00ffd5 → #ff8c1a → transparent
```

## Typography Scale

```
Hero Title: 40px - 90px (clamp, responsive)
Section Title: 48px (32px mobile)
Hero Subtitle: 18px - 28px
Body Text: 14px - 18px
Button Text: 20px (16px mobile)
Nav Links: 14px (12px mobile)
```

## Spacing System

```
Section Padding: 100px vertical, 20px horizontal
Card Padding: 30px
Button Padding: 22px 70px
Grid Gap: 25px - 30px
Feature Gap: 15px
```

## Border Radius

```
Cards: 18px
Buttons: 12px
Navigation: 10px
Forms: 8px
Energy Effects: 50% (circular)
```

## Shadow Layers

### Button Shadows
```css
box-shadow: 
  0 0 50px rgba(255, 140, 26, 0.6),    /* Inner glow */
  0 0 80px rgba(255, 210, 122, 0.4),    /* Mid glow */
  0 10px 40px rgba(255, 140, 26, 0.3), /* Drop shadow */
  inset 0 0 50px rgba(255, 255, 255, 0.2); /* Highlight */
```

### Card Shadows
```css
box-shadow: 
  0 10px 40px rgba(0, 0, 0, 0.5),      /* Depth */
  0 0 30px rgba(42, 111, 255, 0.15),   /* Glow */
  inset 0 0 40px rgba(42, 111, 255, 0.05); /* Inner light */
```

### Navigation Shadows
```css
box-shadow: 
  0 4px 30px rgba(0, 0, 0, 0.7),       /* Drop */
  0 0 40px rgba(42, 111, 255, 0.15),   /* Aura */
  inset 0 -2px 20px rgba(255, 140, 26, 0.1); /* Bottom glow */
```

## Animation Timings

```
Fast: 0.3s - 0.4s (hover states, clicks)
Medium: 0.6s - 1s (transitions, fades)
Slow: 2s - 4s (ambient animations)
Very Slow: 30s - 120s (background movement)

Easing: cubic-bezier(0.4, 0, 0.2, 1) (primary)
```

## Particle Systems

### Portal Sparks
```
Count: 14,000
Size: 0.07
Lifetime: 0.8 - 2.4s
Speed: 0.9 - 2.0
Colors: white → yellow → orange → red → dark
```

### Portal Embers
```
Count: 9,000
Size: 0.05
Lifetime: 0.7 - 1.6s
Speed: 0.35 - 1.0
Colors: Same gradient as sparks
```

### Background Stars (Layer 1)
```
Count: 160,000
Size: 0.04 - 0.39
Colors: 70% white, 15% blue, 15% gold
Twinkle: Sine wave animation
```

### Background Stars (Layer 2)
```
Count: 120,000
Size: 0.06 - 0.51
Colors: Same distribution
Twinkle: Offset sine wave
```

## Backdrop Filters

```
Navigation: blur(25px) saturate(180%)
Cards: blur(25px) saturate(180%)
Overlays: blur(5px) saturate(120%)
```

## Z-Index Layers

```
1000: Navigation (top UI)
100: Modals & Overlays
10: Content sections
5: Section overlays
4: Energy streaks
3: Lightning flashes
2: Dimension debris
1: Canvas container (3D)
0: Cosmic backdrop
```

## Responsive Breakpoints

```
Desktop: 1024px+
Tablet: 768px - 1023px
Mobile Large: 481px - 767px
Mobile Small: 320px - 480px
```

## Grid Systems

### Events Grid
```
Desktop: repeat(auto-fit, minmax(260px, 1fr))
Tablet: repeat(auto-fit, minmax(250px, 1fr))
Mobile: 1 column
```

### Speakers Grid
```
Desktop: repeat(auto-fit, minmax(250px, 1fr))
Tablet: repeat(auto-fit, minmax(200px, 1fr))
Mobile: 1 column
```

## Icon Sizes

```
Hero Icons: 60px (40px mobile)
Feature Icons: 52px
Nav Logo: 32px (24px mobile)
Button Icons: 24px
Status Icons: 16px
```

## Glow Effects

### Text Glow (Pulsing)
```css
text-shadow: 
  0 0 10px currentColor,
  0 0 20px currentColor,
  0 0 40px currentColor,
  0 0 80px rgba(42, 111, 255, 0.3);
```

### Element Glow (Static)
```css
box-shadow: 
  0 0 20px currentColor,
  0 0 40px currentColor;
```

### Energy Glow (Intense)
```css
box-shadow: 
  0 0 50px currentColor,
  0 0 100px currentColor,
  0 0 150px currentColor;
```

## Blur Intensities

```
Heavy Blur: 100px (nebula fog)
Medium Blur: 40-50px (light flares)
Light Blur: 25px (glass panels)
Subtle Blur: 10px (overlays)
```

## Opacity Scales

```
Full: 1.0 (main content)
High: 0.8-0.9 (active elements)
Medium: 0.5-0.7 (secondary elements)
Low: 0.3-0.4 (background elements)
Very Low: 0.1-0.2 (subtle effects)
Trace: 0.02-0.08 (ambient layers)
```

## Transition Curves

```
Smooth: ease-in-out
Entrance: cubic-bezier(0.4, 0, 0.2, 1)
Exit: cubic-bezier(0.4, 0, 1, 1)
Bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55)
```

## Performance Targets

```
Desktop FPS: 60
Tablet FPS: 45
Mobile FPS: 30
Load Time: < 3s
Time to Interactive: < 5s
```

## Accessibility

```
Min Contrast Ratio: 4.5:1
Focus Indicators: 2px solid glow
Keyboard Navigation: Full support
Screen Reader: ARIA labels
Motion: Respects prefers-reduced-motion
```

## Asset Optimization

```
Images: WebP format preferred
Textures: Canvas-generated (no external files)
Fonts: Google Fonts CDN
Icons: Unicode/Emoji (no icon library needed)
```

---

**Quick Reference Card**

```
🎨 Primary: #ff8c1a (Portal Orange)
💙 Secondary: #2a6fff (Reality Blue)  
💜 Accent: #8a2be2 (Cosmic Purple)
🌊 Highlight: #00ffd5 (Quantum Teal)

📏 Base Unit: 8px
🔤 Font: Orbitron (headings), Space Mono (body)
⏱️ Transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1)
🌟 Glow: box-shadow with 3-4 layers
```
