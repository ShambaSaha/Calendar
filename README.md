📅 Calendar App
A high-fidelity calendar application designed with a "Physical Notebook" aesthetic.

🛠 Tech Stack
Framework: Next.js (App Router)

Styling: Tailwind CSS (Custom utility classes for perspective & glassmorphism)

Animation: Framer Motion (Layout transitions & modal physics)

State & Persistence: React Hooks + LocalStorage

Icons: Lucide React

✨ Key Features
Notebook UI: A unique layout featuring spiral wire elements and textured backgrounds that shift based on the month.

Smart Note Persistence: Integrated with localStorage so your notes stick around even after a hard refresh.

Context-Aware Dark Mode: A deep, high-contrast dark mode that respects glassmorphic transparency.

Fluid Views: Seamlessly switch between Month, Week, and Day views with animated transitions.

Mobile-First Engineering: On desktop, it’s a sleek horizontal notebook; on mobile, it gracefully collapses into a stacked, touch-optimized interface without losing any functionality.

🚀 Getting Started
Prerequisites
Node.js 18.x or later

npm or bun

Installation
Clone the repo:

Bash
git clone https://github.com/[YourUsername]/[YourRepoName].git
cd [YourRepoName]
Install dependencies:

Bash
npm install
Run the development server:

Bash
npm run dev
Open http://localhost:3000 to see the result.

🏗 Project Architecture
Plaintext
src/
├── app/            # Next.js App Router & Metadata
├── components/     
│   └── calendar/   # Core Calendar logic & UI components
├── hooks/          # Custom hooks for date math and state
└── constants/      # Month themes, holidays, and configuration
