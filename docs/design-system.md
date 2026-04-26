# Design System: Otzmah Shketah (עוצמה שקטה)

This document outlines the current design language for the Otzmah Shketah landing page. Any new screens (like Terms, Privacy Policy, Dashboard, etc.) MUST align with this design system closely.

## 1. Core Principles
- **Minimal & Premium**: Clean interfaces, generous spacing, and a focus on content without clutter.
- **RTL Support**: The entire application uses `direction: rtl` (via the `.rtl` class in `index.css`). All layouts must account for Hebrew reading direction.

## 2. Color Palette
Defined in CSS variables and Tailwind config (`index.css` / Tailwind v4):
- **Primary** (`--color-primary` / `#0b3c5d` / `text-primary`, `bg-primary`): Deep navy blue used for major headings, important text, and primary dark backgrounds.
- **Accent** (`--color-accent` / `#17b7ae` / `text-accent`, `bg-accent`): Vibrant teal used for buttons, icons, highlights, and subtle background glows.
- **Premium** (`--color-premium` / `#d4a373` / `text-premium`): Warm beige/gold used for stars, badges, and premium indicators.
- **Light Background** (`--color-bg-light` / `#F7F9FB` / `bg-bg-light`): Soft off-white for alternating section backgrounds.

## 3. Typography
- **Font Family**: 'Assistant', sans-serif.
- **Visual Hierarchy**:
  - Main Titles (H1, H2): `font-black text-primary`, usually `text-3xl md:text-4xl` for sections.
  - Subtitles/Paragraphs: `text-lg text-slate-600 leading-relaxed font-light/medium`.
  - Small Elements (Badges, Overlays): `font-bold text-xs/sm`.

## 4. Spacing Rhythm & Layouts
- **Sections**: Use generous vertical padding. Typical section uses `py-16 md:py-24 px-6`.
- **Containers**: Usually restricted to `max-w-5xl` to ensure optimal reading width.
- **Gaps**: Use `gap-6` to `gap-12` in grids for breathing room.

## 5. UI Elements
- **Cards**: Background `bg-white`, borders `border border-slate-100`, rounded corners `rounded-2xl` or `rounded-3xl` (`rounded-xl` minimum), subtle shadows `shadow-sm hover:shadow-md`.
- **Buttons**:
  - Primary button: `bg-primary text-white hover:bg-opacity-90 shadow-xl rounded-full px-8 py-4 font-bold text-lg`.
  - Secondary/Accent button: `bg-accent text-white ...`.
- **Icons**: Utilize `lucide-react` icons (usually colored with `text-accent`).

## 6. Animations (motion/react)
- Subtle fades (`opacity: 0` to `opacity: 1`)
- Small translates (`y: 20` to `y: 0`)
- Use `transition-all duration-300` for hover effects.

When building new static pages (like Terms), use the existing `Section` wrappers and ensure the container uses `rtl` logic. Include the standard global `Footer`.
