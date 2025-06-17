# 📊 Data Viz Platform

A responsive and interactive data visualization dashboard built with React + Vite, TypeScript, TailwindCSS v4, Redux Toolkit, Firebase Auth, and Chart.js. This project was created as part of the AnswersAi Frontend Engineer take-home assessment.

## 🚀 Features

- Interactive dashboard with line charts and data points
- Slide-over panel for editing visualization variables
- Hover-based data point insights with animated tooltip
- Variable selection with state indication and tooltips
- Firebase Authentication with Google OAuth
- Fully responsive layout using TailwindCSS v4
- Modern routing and navigation with React Router
- Global state management using Redux Toolkit

## 🧱 Tech Stack

- React 19 + TypeScript
- TailwindCSS v4
- Redux Toolkit
- Firebase Authentication
- React Router DOM
- Chart.js with date-fns adapter
- Vite as build tool
- ESLint + TypeScript config for code quality

## 📁 Project Structure

```
data-viz-platform/
├── public/
├── src/
│   ├── components/         # Shared UI components
│   ├── pages/              # Route-level views
│   ├── context/            # Authentication contexts
│   ├── store/              # Redux slices and setup
│   ├── hooks/              # Custom hooks
│   ├── routes/             # Page routes
│   ├── utils/              # Firebase and utility logic
│   └── main.tsx            # App bootstrap
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## ⚙️ Setup Instructions

1. **Clone the repository**:

```bash
git clone https://github.com/optistdev/data-viz-platform.git
cd data-viz-platform
```

2. **Install dependencies**:

```bash
npm install
```

3. **Configure environment variables**:

Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY='AIzaSyAwvq1Ya3KcKZFusVNZOm79fC9cZ3D9CAU'
VITE_FIREBASE_AUTH_DOMAIN=answerai-platform-6e373.firebaseapp.com
VITE_FIREBASE_PROJECT_ID='answerai-platform-6e373'
VITE_FIREBASE_STORAGE_BUCKET='answerai-platform-6e373.firebasestorage.app'
VITE_FIREBASE_MESSAGING_SENDER_ID='603614224478'
VITE_FIREBASE_APP_ID='1:603614224478:web:68f812e28e55182a3e14cf'
VITE_FIREBASE_MEASUREMENT_ID='G-JECVTTHPEE'
```

4. **Run the development server**:

```bash
npm run dev
```

Visit `http://localhost:5173` to view the application.

## 💡 Technical Decisions & Trade-offs

- **Redux Toolkit**: Chosen for centralized, scalable state management over simpler alternatives (e.g. Zustand) due to increased control and middleware support.
- **Chart.js**: Provides fine-grained control and date-scale support with `chartjs-adapter-date-fns`.
- **TailwindCSS v4**: Ensures consistent, mobile-first utility styling without custom configuration.
- **Firebase**: Simple and production-ready authentication provider for OAuth.

## ⚠️ Known Limitations

- Partial Dashboard Implementation: The dashboard UI includes three tab views, but only one tab is currently implemented. The other tabs are present in the design but not functional.
- Other Pages Unimplemented: Only the Dashboard page is developed. Other pages are not built yet.
- Mock Chart Data: All data displayed in charts is hardcoded mock data. There is no real-time or backend data integration.
- Button Actions Incomplete: Some of the buttons on the dashboard are non-functional — event handlers and side effects are not yet implemented.
- Firebase Limitations: Firebase Authentication is integrated with Google OAuth, but due to plan restrictions, some authentication features may not function fully unless upgraded to a paid tier.
- No Backend or Persistence: There is no backend API or database connection. Changes made to state are not saved across sessions.
- Accessibility (a11y): ARIA roles, keyboard navigation, and accessibility support have not been fully implemented.

## ⏱️ Time Spent

| Task                             | Duration |
|----------------------------------|----------|
| Initial Vite + Tailwind setup    | 1h       |
| Dashboard + Chart integration    | 5h       |
| Variable editing panel           | 2h       |
| Tooltip hover interaction        | 1h       |
| Firebase auth integration        | 2h       |
| Responsive layout tuning         | 2h       |
| Final polish + README            | 1h       |
| **Total**                        | **14h**  |

## 🖼️ Design Reference

[Figma Design Link](https://www.figma.com/design/K9CnC8b6RjzCWyhdMAIRg5/Untitled?node-id=0-1)

