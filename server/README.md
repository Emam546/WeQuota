# NetQuota API Server

Express server that provides REST API endpoints for the NetQuota utility functions and serves the React frontend.

## Installation

```bash
cd server
npm install
```

## Development

### API only (development mode)
```bash
npm run dev
```

### Full development (frontend + API)
```bash
npm run dev:full
```

This will build the React frontend and start the server.

## Build

```bash
npm run build
```

## Production

First build the frontend:
```bash
npm run build:frontend
```

Then start the server:
```bash
npm start
```

## Frontend Access

The React frontend from `src/renderer/main` is served at the root URL:
- `http://localhost:3000` - React application

## API Endpoints

### Login Routes (`/api/login`)

- `POST /api/login/captcha` - Get captcha for login
  - Body: `{ number: string }`
  
- `POST /api/login` - Login with credentials
  - Body: `{ number: string, password: string, imgCode?: string, token?: string }`

### Data Routes (`/api/data`)

- `POST /api/data/quota` - Get quota data
  - Body: `{ mainOfferId: string, subscriberId: string, token: string }`
  
- `POST /api/data/balance` - Get balance data
  - Body: `{ acctId: string, token: string }`
  
- `POST /api/data/billing-usage` - Get billing usage data
  - Body: `{ subscriberId: string, token: string }`
  
- `POST /api/data/info` - Get user info
  - Body: `{ custId: string, token: string }`
  
- `POST /api/data/subscriber` - Get subscriber data
  - Body: `{ subscriberId: string, token: string }`

### Health Check

- `GET /health` - Server health check

## Default Port

The server runs on port 3000 by default. You can change this by setting the `PORT` environment variable.

## Architecture

- The server serves static files from the React build (`../dist`)
- API routes are prefixed with `/api`
- All non-API routes fall back to `index.html` for SPA client-side routing
