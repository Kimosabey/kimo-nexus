# Master UI/UX Validation Plan

## Objective
A comprehensive validation of all UI/UX pillars: Performance, Accessibility, Aesthetics, Consistency, and Interactivity.

## 1. Aesthetics & Consistency (Ocean Theme)
- [ ] **Color Tokens**: Ensure `globals.css` reflects the Cyan/Teal ocean theme, removing legacy "Electric Blue" (`#6b7bff`).
    - *Action*: Update css variables `--color-primary`, `--color-primary-light` to match Tailwind `cyan-400` / `teal-400`.
- [ ] **Shadows**: Update `.glass-card` shadows to use cyan glow.
- [ ] **Scrollbar**: Update scrollbar thumb hover color to cyan.

## 2. Responsiveness
- [x] **Grid Systems**: Verified 1col -> 2col -> 3col scaling for Projects.
- [x] **Typography**: Verified `text-sm md:text-base` scaling.
- [x] **Touch Targets**: Verified 44px+ targets.

## 3. Interactivity & Feedback
- [x] **Focus State**: Implemented `focus-visible` rings.
- [ ] **Active State**: Ensure buttons have `active:scale-95` or similar tactile feedback.
    - *Action*: Check Hero button and Footer buttons.

## 4. Performance (Validated)
- [x] **Scroll**: `will-change-transform` added.
- [x] **Main Thread**: Preloader optimized to RAF.
- [x] **Asset Loading**: Vanta dynamic import + sync.

## Execution Plan
1.  **Update `globals.css`**: Replace blue hex codes with Ocean cyan (`#00d4ff`).
2.  **Verify Active States**: Add `active:scale-95` to key CTA buttons if missing.
