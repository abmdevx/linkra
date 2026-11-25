# Linkra

Linkra is a full-stack URL shortener with a React dashboard, user authentication, and MongoDB-backed link history.

## Features

- Create short links anonymously or while signed in
- Register and sign in with a username and password
- View and copy your previously shortened links
- Responsive Tailwind CSS interface
- JWT-protected dashboard APIs

## Project structure

```text
linkra/
├── client/   # React + Vite frontend
└── server/   # Express + MongoDB API
```

## Requirements

- Node.js 18+
- MongoDB connection string

## Installation

```bash
git clone https://github.com/abmdevx/linkra.git
cd linkra
npm install
```

`npm install` in the root installs everything: the root tooling, the server dependencies, and the client dependencies.

Create the environment files from the examples:

```bash
# macOS / Linux / Git Bash
cp server/.env.example server/.env
cp client/.env.example client/.env

# Windows (PowerShell)
copy server\.env.example server\.env
copy client\.env.example client\.env
```

Then fill in `server/.env`:

```env
PORT=8000
MONGODB_URI_CONNECTION=your_mongodb_connection_string
FRONT_END_ORIGIN=http://localhost:5173
JWT_SECRET=your_long_random_secret
```

And `client/.env`:

```env
VITE_BACKEND_END_ORIGIN=http://localhost:8000
```

## Run locally

Start both applications from the project root:

```bash
npm run dev
```

Or run them separately:

```bash
npm run dev --prefix server
npm run dev --prefix client
```

- Frontend: http://localhost:5173
- Backend: http://localhost:8000

## Scripts (root)

| Command         | What it does                                      |
| --------------- | ------------------------------------------------- |
| `npm install`   | Installs root, server, and client dependencies    |
| `npm run dev`   | Starts backend and frontend together              |
| `npm run build` | Builds the frontend for production                |
| `npm start`     | Starts the backend with Node (no auto-reload)     |

See the [frontend README](./client/README.md) and [backend README](./server/README.md) for detailed module documentation.