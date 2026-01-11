# Accessibility (A11y) & Readability Validation Plan

## Objective
Ensure the portfolio is accessible to all users (screen readers, keyboard navigators) and readable across devices, adhering to WCAG 2.1 AA standards where possible given the high-design aesthetic.

## 1. Readability & Contrast
- [x] **Text Contrast**: Verified.
- [x] **Typography**: Verified.

## 2. Semantic HTML & Structure
- [x] **Landmarks**: Verified.
- [x] **Headings**: Verified.

## 3. Keyboard Navigation & Focus
- [x] **Focus Rings**: Added.
- [x] **Tab Order**: Verified.
- [x] **Skip Link**: Not strictly needed for single page, but Nav is accessible.

## 4. Images & Media
- [x] **Alt Text**: Verified.
- [x] **Project Images**: Verified.
- [x] **Icons**: Verified.

## 5. Mobile Accessibility
- [x] **Touch Targets**: Verified (min-h-[44px]).
- [x] **No Horizontal Scroll**: Fixed (overflow-hidden).

## Execution Plan
1.  Review `src/app/page.tsx` for Semantic tags and Headings.
2.  Review `src/components/ProjectCard.tsx` for Contrast and Alt text.
3.  Add `aria-label` to Social Links in Footer.
4.  Enhance Focus styles globally in `globals.css` or via Tailwind classes.
