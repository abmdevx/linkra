<p align="center">
  <img src="client/public/linkra.svg" alt="Linkra logo" width="96" height="96" />
</p>

<h1 align="center">Linkra</h1>

<p align="center">
  A full-stack URL shortener built with React, Express and MongoDB.
</p>

<p align="center">
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-18+-339933?logo=nodedotjs&logoColor=white" />
  <img alt="React" src="https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-8-646cff?logo=vite&logoColor=white" />
  <img alt="Express" src="https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white" />
  <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-Mongoose-47a248?logo=mongodb&logoColor=white" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss&logoColor=white" />
</p>

---

Linkra turns long URLs into short, shareable links. Anyone can shorten a link straight from the home page, and people who
create an account get a personal dashboard that keeps every link they have made.

The backend is an Express 5 + MongoDB REST API and the frontend is a React 19 single-page app.

## What you can do

- Shorten a URL without signing in
- Create an account, sign in and sign out
- Get the short link in a result modal and copy it with one click
- Keep a dashboard of every link you have created, newest first
- Open any short link and be redirected to the original URL
- Use the app comfortably on phones, tablets and desktops

## Tech stack

| Part     | Technology                                                           |
| -------- | -------------------------------------------------------------------- |
| Frontend | React 19, Vite, Tailwind CSS v4, Axios, Lucide icons, React Hot Toast |
| Backend  | Node.js, Express 5, Mongoose, JWT, bcryptjs, nanoid                   |
| Database | MongoDB                                                              |

## Requirements

- Node.js 18 or newer
- A MongoDB database (local or Atlas)

## Getting started

```bash
git clone https://github.com/abmdevx/linkra.git
cd linkra
npm install                                  # installs root, server and client
cp server/.env.example server/.env           # fill in your values
cp client/.env.example client/.env           # fill in your values
npm run dev                                  # API on :8000, web app on :5173
```

On Windows PowerShell, use `copy server\.env.example server\.env` and `copy client\.env.example client\.env`.

Fill in `server/.env`:

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

Generate a strong `JWT_SECRET` with:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

## Commands

| Command                      | What it does                              |
| ---------------------------- | ----------------------------------------- |
| `npm install`                | Install root, server and client           |
| `npm run dev`                | Run the API and the web app together      |
| `npm run build`              | Production build of the web app           |
| `npm start`                  | Start the API with Node (no auto-reload)  |
| `npm run lint --prefix client` | Lint the web app                        |

## How it fits together

The web app talks to the API under `/api/v1`. Signing in returns a JWT that the web app stores in the browser and sends
as a `Bearer` token on protected requests. In development, Vite proxies `/api/v1` to the backend on port 8000.

Short links are served by the API at `/u/:id`, which looks up the code in MongoDB and redirects to the original URL.
Links created while signed in are tied to your account and show up on your dashboard. Links created anonymously still
work but are not listed anywhere.

```text
linkra/
├── client/   # React + Vite frontend
└── server/   # Express + MongoDB API
```

### API at a glance

| Method | Endpoint                       | Auth     | Purpose                         |
| ------ | ------------------------------ | -------- | ------------------------------- |
| POST   | `/api/v1/auth/register`        | -        | Create an account               |
| POST   | `/api/v1/auth/login`           | -        | Sign in                         |
| POST   | `/api/v1/auth/logout`          | -        | Sign out                        |
| GET    | `/api/v1/auth/me`              | Required | Current user                    |
| POST   | `/api/v1/short/receive-url`    | Optional | Create a short link             |
| GET    | `/api/v1/short/my-links`       | Required | List your links                 |
| GET    | `/u/:id`                       | -        | Redirect to the original URL    |

More detail is in [`server/README.md`](server/README.md) and [`client/README.md`](client/README.md).

## Deployment

- Build the web app with `npm run build` and serve `client/dist` as static files.
- Run the API with `npm start` and set `PORT`, `MONGODB_URI_CONNECTION`, `FRONT_END_ORIGIN` and `JWT_SECRET`.
- Set `FRONT_END_ORIGIN` to the web app's origin so CORS allows it.
- Set `VITE_BACKEND_END_ORIGIN` to the public API URL before building, so generated short links point to the right host.
- Never commit real credentials or JWT secrets.