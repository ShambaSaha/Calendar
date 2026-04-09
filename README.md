# 📅 Calendar-App

A high-fidelity, glassmorphic calendar application designed with a "Physical Notebook" aesthetic. Built with Next.js and Tailwind CSS, it balances tactile design with modern web performance.

---

## 🚀 Quick Start

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

## 💡 Key Features

* 🗓️**Multi-Granularity Calendar**
  * Implemented Month, Week, and Day views with distinct UI logic
  * Month view focuses on date-level interaction
  * Week & Day views provide hourly scheduling grids for precise planning

* 📝**Advanced Notes & Event System**
  * Notes can be added for a single date
  * Notes can also be added across a selected date range
  * Week & Day views support time-based notes mapped to specific hours

* 💾**Persistent Local Storage Architecture**
  * Uses localStorage to store notes/events
  * Data persists across reloads and browser sessions
  * Notes remain saved unless explicitly deleted by the user
  * Handles hydration safely to avoid Next.js rendering issues

* 🎨**Dynamic Monthly Theme System**
  * Each month has a unique theme-based hero image
  * Enhances visual appeal and contextual UI experience
 
* 🎯 **Event Marking System**
  * 🔴 Red → Notes marked
  * 🔵 Blue → Public holidays
  * 🟡 Yellow → Present day


---

## 📌 Author

Shamba Saha

You can visit the project at, https://calendar-snowy-psi.vercel.app/

---
