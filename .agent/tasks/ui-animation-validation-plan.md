# UI & Animation Validation Plan

## Objective
Ensure a flawlessly smooth user experience with zero graphical glitches, high frame rates (60fps+), and synchronized animations across all sections of the portfolio.

## 1. Scroll Performance Verification
- [ ] **FPS Check**: Monitor frame rate during rapid scrolling on Desktop (Chrome/Edge) and Mobile devices. Target: consistently above 55fps.
- [ ] **Jank Detection**: Identify any specific section transitions that cause "stutter" or layout shifts.
- [ ] **Passive Event Listeners**: Ensure scroll event listeners are passive (handled by Lenis/React, verified).
- [ ] **Layer Promotion**: Verify complex animations (cards, hero) uses `transform` and `opacity` only to trigger GPU compositing.

## 2. Animation Synchronization
- [ ] **Project Cards**: 
  - Verify Staggered entry animations (`delay: index * 0.1`) play smoothly.
  - Ensure `whileHover` limits expensive repaints (shadows/transforms only).
  - Verify `viewport={{ once: true }}` prevents re-triggering animations during up/down scrolling (reducing visual noise).
- [ ] **Text Staggers**: Check "Architecting" and other text split animations for synchronization.
- [ ] **Hero Parallax**: Confirm mouse movement parallax is smooth and doesn't lag the Vanta background.

## 3. Loading Sequence (Crucial)
- [ ] **Vanta Readiness**: Verify the Preloader **waits** for the Vanta background to fully initialize before fading out.
- [ ] **Translucency**: Confirm the semi-transparent black overlay (`bg-black/20`) allows the user to see the initialized waves *before* interaction begins.
- [ ] **Transition**: Ensure the `exit={{ opacity: 0 }}` transition is seamless with no "pop" or "flash".

## 4. Glitch Hunting
- [ ] **Layout Thrashing**: Check for elements changing `width`/`height` during animation (replaced `height` with `scaleY` in Tech Stack).
- [ ] **Flickering**: Watch for elements flickering on iOS/Safari (often z-index or 3d-transform related).
- [ ] **Overflow**: Ensure no horizontal scrollbar appears during animations.

## 5. Optimization Checklist (Code Review)
- [x] **ProjectCard**: Memoized (`React.memo`) to prevent re-renders.
- [x] **VantaWaves**: Dynamic import + `@ts-ignore` fix + `onLoaded` callback.
- [x] **Images**: Next.js `<Image>` should use `priority` for Hero, `lazy` for others.
- [ ] **Will-Change**: Check if `will-change: transform` is needed on heavy elements (Project Cards).

## Next Actions
- Manually verify the "Selected Works" scroll interaction.
- If stutters persist, add `will-change: transform` to `ProjectCard` CSS.
