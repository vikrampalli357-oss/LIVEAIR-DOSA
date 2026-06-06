# AI Agent Guidelines: Air Dosa Landing Page

This repository contains the codebase for **Air Dosa** — a high-tech, futuristic landing page for an autonomous drone-delivered hot dosa product. 

As an AI agent working in this workspace, you MUST adhere to the following rules, architecture constraints, and styling guidelines.

---

## 🚀 Architectural Rules & Constraints

1. **Single-File Delivery**: 
   - All code (HTML structure, CSS styles, JavaScript behavior, and SVG graphics) must reside within a single file: `index.html`.
   - Do NOT create separate `.css` or `.js` files.

2. **No Frameworks or Build Steps**:
   - Use only plain HTML5, vanilla CSS, and modern vanilla JavaScript.
   - Do NOT use npm, Node.js, Webpack, Vite, Tailwind CLI, or any other preprocessors/bundlers.
   - External libraries (e.g., Font Awesome for icons, Google Fonts) should be loaded strictly via CDN links.

3. **CSS Animations Only**:
   - All motion effects, hover animations, scroll reveals, and keyframe animations must be built using **Vanilla CSS**.
   - Do NOT use JavaScript animation libraries (like GSAP, Framer Motion, or anime.js). JavaScript should only be used for state management, DOM triggers, and browser events (e.g., Intersection Observer class toggling).

4. **Zero-Setup Local Running**:
   - The webpage must be fully functional and run correctly just by double-clicking the `index.html` file or opening it directly in a web browser.

5. **Deploy Ready**:
   - Maintain the code such that it is ready for immediate deployment to GitHub Pages. All links must be relative.

---

## 🎨 Design System & Visual Style

To maintain a premium, state-of-the-art visual aesthetic, implement a sleek dark mode with warm golden highlights and glowing cybernetic accents.

### Color Palette Tokens (CSS Variables)
- **Background Deep**: `#0A0A0C` (Main background)
- **Background Card**: `#121216` (Card and panel backgrounds)
- **Primary Gold**: `#FF9F1C` (Crispy golden dosa accent)
- **Secondary Orange**: `#FF5722` (Sambar/Chutney warm pop)
- **Tech Cyan**: `#00E5FF` (Drone hover glow, laser alignment)
- **Tech Blue**: `#0052FF` (Future tech branding element)
- **Text Primary**: `#F8F9FA`
- **Text Secondary**: `#A0AEC0`

### Typography
- Header Fonts: `'Rajdhani', sans-serif` (tech, angular, clean)
- Body Fonts: `'Outfit', sans-serif` (modern, geometric, highly readable)

---

## 🛠️ Required Page Sections & Features

1. **Header / Navigation**:
   - Sleek responsive nav bar with drone logo and hover links.
   - Pulsing "Kitchen Hive Status" label (e.g., "Hive-01 Status: ONLINE").

2. **Hero Section**:
   - Catchy futuristic headline ("Crispy Dosas. Delivered from the Clouds.").
   - An animated visual representation of a drone carrying a golden crispy dosa using an interactive, CSS-animated SVG.
   - Call-To-Action buttons with glowing hover effects.

3. **Tech Features (3 Cards)**:
   - 3 columns with responsive grids.
   - Grid cards must have scale-up, border-glow, and translate-up hover animations.
   - Features: "On-the-fly Griddling", "Lidar Plate Landing", "Triple-Chutney Pods".

4. **Interactive Dosa Builder**:
   - A client-side visual configurator.
   - Allows users to select stuffings (Classic Masala, Chilli Cheese, Gunpowder Podi) and chutney choices.
   - Visually updates the dosa design (SVG layers showing/hiding with smooth CSS transitions) and updates the dynamic price tags.

5. **How It Works Timeline**:
   - Vertical or horizontal high-tech timeline.
   - Steps: 1. Configure order, 2. Mid-air kitchen baking, 3. Precision balcony drop.

6. **Subscription/Pricing plans (2 Cards)**:
   - "Dosa Casual" (Limited drop count) vs. "Dosa Infinite" (Unlimited drops, priority airspace).
   - Must visually highlight the PRO tier with a subtle glowing border animation.

7. **Floating Action Button (FAB)**:
   - A bouncing floating action button on the bottom right corner with a drone icon that triggers the order drawer or scrolls directly to the checkout section.

8. **Footer**:
   - Copyright, contact links, and drone airspace disclaimer.

---

## 🔍 Verification Standards
- Validate HTML markup for tags nesting and semantic correctness.
- Ensure all interactive elements have unique, descriptive IDs for browser automation testing.
- Check mobile responsiveness on views down to `320px` width.
