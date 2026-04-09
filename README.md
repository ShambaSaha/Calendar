# 📅 Calendar-App

A high-fidelity, glassmorphic calendar application designed with a "Physical Notebook" aesthetic. Built with Next.js and Tailwind CSS, it balances tactile design with modern web performance.

---

## 🚀 Quick Start

### Prerequisites

* **Node.js**: 18.x or later
* **Package Manager**: npm or bun

---

### Installation

1. **Clone the repo:**

```bash
git clone https://github.com/YourUsername/YourRepoName.git
cd YourRepoName
```

2. **Install dependencies:**

```bash
npm install
```

3. **Run the development server:**

```bash
npm run dev
```

👉 Open http://localhost:3000 to see the result.

---

## ✨ Key Features

* 📖 **Notebook UI**
  
  A unique layout featuring spiral wire elements and textured backgrounds that shift dynamically based on the current month.

* 💾 **Smart Note Persistence**
  
  Integrated with localStorage to ensure your notes stay saved even after a hard refresh or browser restart.

* 🌙 **Context-Aware Dark Mode**
  
  A deep, high-contrast dark mode engineered to maintain glassmorphic transparency and readability.

* 🔄 **Fluid Views**
  
  Seamlessly switch between Month, Week, and Day views with smooth transitions.

* 📱 **Mobile-First Engineering**
  
  Responsive layout that stacks vertically on mobile while maintaining a spacious desktop experience.

---

## 🛠 Tech Stack

* **Framework**: Next.js 15 (App Router)
* **Styling**: Tailwind CSS
* **Animation**: Framer Motion
* **Icons**: Lucide React
* **State Management**: React Hooks
* **Storage**: localStorage API

---

## 🏗 Project Architecture

```plaintext
src/
├── app/             # Next.js App Router, layouts, metadata
├── components/     
│   └── calendar/    # Core components (Sidebar, Header, Views)
├── hooks/           # Custom hooks (useCalendar)
└── constants/       # Themes, configs, static data
```

---

## 💡 Technical Highlights

* **Responsive Stacking**
  Uses a mobile-first approach to separate desktop notebook layout and mobile usability.

* **Theme Synchronization**
  Light/Dark mode switching while preserving image readability using overlays and filters.

* **Persistent Storage**
  Custom logic to safely use localStorage without hydration issues in Next.js.

---

## 📌 Author

Shamba Saha

---
