# Accessibility (A11y) & Readability Validation Plan

## Objective
Ensure the portfolio is accessible to all users (screen readers, keyboard navigators) and readable across devices, adhering to WCAG 2.1 AA standards where possible given the high-design aesthetic.

## 1. Readability & Contrast
- [ ] **Text Contrast**: Verify that `text-gray-400` and `text-cyan-400` have sufficient contrast against the `#0a0a0c` background.
    - *Action*: Use lighter gray (`text-gray-300`) for body text if needed.
    - *Action*: Ensure Vanta background has an overlay (`bg-black/40`) to maintain text legibility.
- [ ] **Typography**: 
    - Verify `font-mono` text size is at least 12px on mobile.
    - Ensure line-height (`leading-relaxed`) is sufficient for long paragraphs (Project descriptions).

## 2. Semantic HTML & Structure
- [ ] **Landmarks**: Ensure the page has `<main>`, `<nav>`, `<footer`, and unique `<h1>`.
- [ ] **Headings**: Verify heading hierarchy (`h1` -> `h2` -> `h3`).
    - *Current*: Hero uses `h1`, Sections use `h2`, Project Cards use `h3`. (To be verified).

## 3. Keyboard Navigation & Focus
- [ ] **Focus Rings**: Custom focus styles for interactive elements (Buttons, Links).
    - *Action*: Add `focus-visible:ring-2 focus-visible:ring-cyan-400` to all interactive elements.
- [ ] **Tab Order**: Ensure logical tab flow (Nav -> Hero -> Projects -> Contact).
- [ ] **Skip Link**: Consider adding a "Skip to Content" link for screen readers.

## 4. Images & Media
- [ ] **Alt Text**: Ensure all `<Image>` components have descriptive `alt` props.
- [ ] **Project Images**: Ensure background images in Project Cards have generic alt text on the container or title description.
- [ ] **Icons**: Ensure `lucide-react` icons and `Si...` icons have `aria-hidden="true"` or `aria-label` wrapper.

## 5. Mobile Accessibility
- [ ] **Touch Targets**: Ensure buttons (Email, Socials) are at least 44x44px.
- [ ] **No Horizontal Scroll**: Ensure content fits within viewport width.

## Execution Plan
1.  Review `src/app/page.tsx` for Semantic tags and Headings.
2.  Review `src/components/ProjectCard.tsx` for Contrast and Alt text.
3.  Add `aria-label` to Social Links in Footer.
4.  Enhance Focus styles globally in `globals.css` or via Tailwind classes.
