# Angela M. Oñate — Web Portfolio & Interactive CV

An interactive, elegant, and mobile-responsive web portfolio for **Angela M. Oñate**, an aspiring Information Systems professional skilled in project documentation, research papers, and basic UI/UX design.

Live Preview / Local Setup: `http://localhost:3000/`

---

## 🎨 Design System & Color Palette

Designed using an elegant floral palette inspired by Anthurium flowers:

| Color Name | Hex Code | RGB | Usage |
| :--- | :--- | :--- | :--- |
| **Sorbet Stem** | `#C2DC80` | `194, 220, 128` | Vitality accents, verified badges, active indicator pills, button glow |
| **Petal Glaze** | `#EA9CAF` | `234, 156, 175` | Romantic blush highlights, card borders, subtle tags |
| **Dusty Orchid** | `#D56989` | `213, 105, 137` | Primary brand accent, headings, CTA gradient, active nav indicator |
| **Powdered Lilac Grey** | `#F3EEF1` | `243, 238, 241` | Soft light-mode surface and subtle canvas gradient |

### Complementary Typography
- **Headings & Display**: `Plus Jakarta Sans` (Google Fonts) — modern geometric clarity and elegance.
- **Body & Content**: `Outfit` (Google Fonts) — clean, highly readable interface typography.
- **Code & Metadata**: `JetBrains Mono` — for IDs, dates, and query snippets.

---

## 🌟 Multi-Page Structure & Key Features

The portfolio is structured into 6 dedicated, cleanly separated HTML pages:

1. **`index.html` (Home)**:
   - High-impact hero section with Angela's actual professional portrait photo.
   - Interactive 3D perspective tilt effect on mouse movement.
   - Live availability badge and quick metric counters (CHMSU BSIS, 5x Certifications, OJT experience).
   - Fast exploration highlights leading to all other pages.
2. **`about.html` (About)**:
   - Comprehensive narrative background detailing Information Systems and UI/UX focus.
   - The 4 core pillars: *Systems Analysis*, *UI/UX Design*, *Business Analytics*, *Project Coordination*.
   - Educational & OJT timeline spanning Elementary to Carlos Hilado Memorial State University (BSIS 2023–2027).
3. **`skills.html` (Skills)**:
   - Real-time instant search input to filter competencies.
   - Categorized cards for Documentation, UI/UX Tools, and Project Coordination.
4. **`certificates.html` (Certificates)**:
   - Verified credentials showcase with interactive verification modals:
     - *Introduction to Business Analysis* (IBM / Coursera)
     - *Business Analytics with Excel* (Microsoft / Simplilearn SkillUp)
     - *SQL Analytics and BI on Databricks* (Databricks / Simplilearn SkillUp)
     - *Introduction to Cybersecurity* (Cisco Networking Academy / DICT-ITU)
     - *Introduction to Modern AI* (Cisco Networking Academy / DICT-ITU)
5. **`resume.html` (Resume)**:
   - Full pixel-perfect curriculum vitae layout.
   - Dedicated print stylesheet (`@media print`) enabling clean, full-bleed single-page A4 PDF export via the "Print / Save as PDF" button.
6. **`contact.html` (Contact)**:
   - Direct communication channels: Email (`amonate.chmsu@gmail.com`), Phone (`(+63) 993 386-4528`), and Location (`Talisay City, Negros Occidental`).
   - One-click copy-to-clipboard buttons with toast feedback notifications.
   - Interactive direct message form with real-time field validation.

---

## 🌓 Dark & Light Mode Theme Engine

- Includes a one-click theme switcher button in the floating header.
- Automatically detects the user's system preference (`prefers-color-scheme`).
- Persists user choice in `localStorage`.
- Smooth transition between crisp **Powdered Lilac** (Light) and luxurious **Orchid Night** (Dark).

---

## 🚀 Running Locally

```bash
# Clone the repository
git clone https://github.com/fasase13/angela-webportfolio.git
cd angela-webportfolio

# Start the local server
node server.js
```

Open `http://localhost:3000` in your web browser.
