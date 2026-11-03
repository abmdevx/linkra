# Linkra Backend

The backend is an Express API backed by MongoDB and Mongoose. It creates short URLs, redirects visitors, authenticates users with JWTs, and returns each signed-in user's link history.

## API areas

### Authentication

```text
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/logout
GET  /api/v1/auth/me
```

### Short links

```text
POST /api/v1/short/receive-url
GET  /api/v1/short/my-links       # Bearer token required
GET  /api/v1/short/u/:id
GET  /u/:id
```

Authenticated short-link requests are associated with the signed-in user. Anonymous requests remain supported but are not added to a dashboard.

## Environment

Create `.env` from `.env.example`:

```env
PORT=8000
MONGODB_URI_CONNECTION=your_mongodb_connection_string
FRONT_END_ORIGIN=http://localhost:5173
JWT_SECRET=your_long_random_secret
```

Never commit real credentials or JWT secrets.

## Development

```bash
npm install
npm run dev
```

The server starts at http://localhost:8000 by default and prints the application URL and database connection status during startup.

## Scripts

```bash
npm run dev      # Start with Nodemon
npm start        # Start with Node
```