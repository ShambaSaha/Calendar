# 📅 BentoCalendar

A high-fidelity, glassmorphic calendar application designed with a "Physical Notebook" aesthetic. Built with Next.js and Tailwind CSS, it balances tactile design with modern web performance.

---

## 🚀 Quick Start

### Prerequisites
* **Node.js**: 18.x or later
* **Package Manager**: npm or bun

### Installation
1. **Clone the repo:**
   ```bash
   git clone [https://github.com/](https://github.com/)[YourUsername]/[YourRepoName].git
   cd [YourRepoName]
Install dependencies:

Bash
npm install
Run the development server:

Bash
npm run dev
Open http://localhost:3000 to see the result.

✨ Key Features
📖 Notebook UI: A unique layout featuring spiral wire elements and textured backgrounds that shift dynamically based on the current month.

💾 Smart Note Persistence: Integrated with localStorage to ensure your notes stay saved even after a hard refresh or browser restart.

🌙 Context-Aware Dark Mode: A deep, high-contrast dark mode specifically engineered to maintain glassmorphic transparency and depth.

🔄 Fluid Views: Seamlessly switch between Month, Week, and Day views with polished animated transitions.

📱 Mobile-First Engineering: A dual-state interface that stacks vertically on mobile with touch-optimized buttons, while maintaining a spacious "Notebook" layout on desktop.

🛠 Tech Stack
Framework: Next.js 15 (App Router)

Styling: Tailwind CSS

Animation: Framer Motion

Icons: Lucide React

State: React Hooks + LocalStorage API

🏗 Project Architecture
Plaintext
src/
├── app/             # Next.js App Router, Layouts, & Metadata
├── components/     
│   └── calendar/    # Core components (Sidebar, Header, Wires, Views)
├── hooks/           # Custom hooks for date calculations (useCalendar)
└── constants/       # Month themes, holiday data, and configurations
💡 Technical Highlights
Responsive Stacking: Implemented a max-md strategy to strictly separate desktop "notebook" constraints from mobile "full-bleed" usability.

Theme Synchronization: Developed a system to toggle light/dark modes while preserving background image legibility through CSS filters.

Persistent Storage: Created a custom mounting logic to prevent hydration mismatches when pulling data from localStorage.
