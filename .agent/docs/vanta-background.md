# Vanta.js Waves Background

## Overview
Optional animated 3D waves background using Vanta.js - fully optimized for performance with zero impact when disabled.

## Features
✅ **Performance Optimized**:
- Lazy loaded (only loads when enabled)
- Client-side only rendering
- Respects `prefers-reduced-motion`
- Dynamic imports
- No SSR overhead

✅ **Theme Integration**:
- Matches portfolio color scheme
- Dark background (#0a0a0c)
- Subtle wave animations
- Works with existing gradients

## Usage

### Enable Vanta Waves
In `src/app/page.tsx`, set the constant:
```tsx
const USE_VANTA_BACKGROUND = true;
```

### Disable (Use iOS Flux Mesh Gradients - Default)
```tsx
const USE_VANTA_BACKGROUND = false;
```

## Configuration
Edit `src/components/VantaWaves.tsx` to customize:

```tsx
VANTA({
  el: vantaRef.current,
  THREE: THREE,
  mouseControls: true,      // Mouse interaction
  touchControls: true,      // Touch interaction
  gyroControls: false,      // Mobile gyro (keep false)
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.00,
  scaleMobile: 1.00,
  
  // THEME COLORS
  color: 0x0a0a0c,          // Wave color (dark)
  shininess: 40.00,         // Wave shine
  waveHeight: 15.00,        // Wave amplitude
  waveSpeed: 0.75,          // Animation speed
  zoom: 0.85,               // Camera zoom
});
```

## Performance Tips

1. **Reduced Motion**: Automatically disabled for users who prefer reduce motion
2. **Lazy Loading**: Component only loads when needed
3. **Mobile**: Optimized settings for mobile devices
4. **Cleanup**: Properly destroys effect on unmount

## Comparison

| Feature | iOS Flux Mesh | Vanta Waves |
|---------|---------------|-------------|
| Performance | ⭐⭐⭐⭐⭐ Excellent | ⭐⭐⭐⭐ Good |
| Visual Impact | Modern, Premium | Dynamic, Interactive |
| Mobile Friendly | ✅ Yes | ✅ Yes (optimized) |
| Bundle Size | 0KB | ~200KB |
| Customization | High | Medium |

## Recommendation
**Current Setup (iOS Flux Mesh)** is recommended for:
- Best performance
- Modern aesthetic
- Smallest bundle size
- Perfect theme match

**Vanta Waves** is great for:
- Interactive backgrounds
- 3D depth effect
- Mouse-responsive animations
- Different visual style

## Files
- `src/components/VantaWaves.tsx` - React component
- `src/app/page.tsx` - Integration point
- Toggle: `USE_VANTA_BACKGROUND` constant
