# Linkra Frontend

The frontend is a React 19 and Vite application styled entirely with Tailwind CSS v4. It provides the public URL shortener, authentication screens, and signed-in dashboard.

## Features

- Responsive Linkra home page
- URL shortening form with modal results
- Login and registration screens
- Dashboard with user-owned short links
- Clipboard copy actions
- Lucide React icons

## Structure

```text
src/
├── api/          # HTTP clients for auth and links
├── components/   # Reusable UI components
├── context/      # Auth and link state providers
├── hooks/        # Shared React hooks
├── layout/       # Application shell and navigation
├── pages/        # Home, auth, dashboard, and prompt screens
└── routes/       # Client-side screen routing
```

## Development

```bash
npm install
npm run dev
```

The Vite proxy forwards `/api/v1` requests to `http://localhost:8000`.

## Scripts

```bash
npm run dev       # Start Vite
npm run lint      # Run ESLint
npm run build     # Create a production build
npm run preview   # Preview the production build
```

Set `VITE_BACKEND_END_ORIGIN` when the frontend needs to generate short links against a deployed backend. If it is not set, the current origin is used.