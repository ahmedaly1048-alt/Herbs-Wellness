# Herbs & Wellness

Next.js storefront and Express/MongoDB API in one deployable project.

## Deployment

### Backend on Render

Create a Render Web Service for this repository with root directory `my-app`.
Use `npm install` as the build command and `npm run start:backend` as the start
command. Set `MONGO_URI`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, and
`CLIENT_URL` in Render. `CLIENT_URL` may contain comma-separated frontend URLs.

### Frontend on Vercel or Netlify

Deploy the same `my-app` directory as a Next.js project. Set `BACKEND_URL` to
the Render service URL, for example `https://herbs-wellness-api.onrender.com`.
The Next.js rewrites forward `/api/auth`, `/api/admin`, `/api/products`, and
`/api/health` to Render. `NEXT_PUBLIC_API_URL` can be used instead when server
components need a different API origin.

Admin product images are compressed in the browser and stored with the product
in MongoDB. No Cloudinary account or persistent Render disk is required.# Herbs & Wellness — Herbs & Wellness Storefront + REST API

A single-package project that combines:

- **Frontend:** Next.js 16 app (App Router, React 19, Tailwind CSS v4, Zustand, GSAP)
- **Backend:** Express 5 REST API + MongoDB (Mongoose) with JWT auth

## Quick Start

### 1. Prerequisites

- Node.js 20+
- MongoDB running locally (`mongodb://127.0.0.1:27017`) — or edit `MONGO_URI` in `.env`

### 2. Environment

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

The default `.env` points at a local MongoDB and runs the backend on port **5000**.
Change `MONGO_URI` if you use Atlas or another host, and change the JWT secrets to
long random strings.

### 3. Install

```bash
npm install
```

### 4. Seed the database (first run only)

```bash
npm run seed:admin     # creates/updates the admin user (username: admin / password: admin)
npm run seed:products  # seeds the initial product catalog
```

### 5. Run

```bash
npm run dev
```

This starts **both** servers with `concurrently`:

- 🎨 Frontend: http://localhost:3000 (`next dev`)
- 🚀 Backend: http://localhost:5000 (`node --watch index.js`)

If you prefer separate terminals:

```bash
npm run dev:backend   # terminal 1
npm run dev:frontend  # terminal 2
```

## How the frontend talks to the backend

The Next.js server **proxies** API traffic to Express via `rewrites()` in
`next.config.ts`:

| API                  | Server                    |
| -------------------- | ------------------------- |
| `/api/auth/*`        | Express (port 5000)       |
| `/api/admin/*`       | Express (port 5000)       |
| `/api/products/*`    | Express (port 5000)       |
| `/api/health`        | Express (port 5000)       |
| `/api/checkout`      | Next.js route handler     |

So browser code just calls relative `/api/...` URLs (no CORS concerns).
The shop pages fetch products from the API via `src/lib/api.ts` and gracefully
fall back to the static catalog in `src/data/product.ts` if the backend is down.

Override the backend host for staging/production with `NEXT_PUBLIC_API_URL` or
`BACKEND_URL` in `.env` (Default: `http://localhost:5000`).

## Admin panel

The admin panel lives at **http://localhost:3000/admin** and is also linked from the site footer.

- **Sign in:** username `admin` / password `admin` (created by `npm run seed:admin`)
- Only accounts with the `admin` role can sign in — regular users are rejected.
- On the dashboard you can **add new products** (title, category, price, stock, variants, etc.) and **delete** existing ones. Product images are uploaded with the built-in **Cloudinary upload button** (no more pasting URLs).
- All product mutation endpoints are protected on the backend (`protect` + `authorize("admin")`), so the admin panel is the only way to upload products.

> ⚠️ Change the default credentials in production. Re-run `npm run seed:admin` after editing `ADMIN_PASSWORD` in `scripts/seedAdmin.js`.

## Cloudinary image upload

The admin panel's image upload button requires Cloudinary credentials in `.env`:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_FOLDER=herbs-wellness        # optional
CLOUDINARY_SIGNATURE_ALGORITHM=sha1     # optional (sha1 or sha256)
```

Uploads are signed **server-side** with your API secret, so the secret never reaches the browser.
The backend proxies the image to Cloudinary at `POST /api/admin/upload` (admin JWT required) and
stores the returned `secure_url` on the product. Restart the backend (`npm run dev`) after adding the keys.

## API Endpoints

- `GET  /api/health`
- `POST /api/auth/register` · `POST /api/auth/login` · `POST /api/auth/refresh` · `POST /api/auth/logout` · `GET /api/auth/me`
- `POST /api/admin/login` (admin username/email + password → tokens)
- `POST /api/admin/upload` (admin JWT + base64 image → Cloudinary URL)
- `GET  /api/products` (filters: `category`, `search`, `featured`, `sort`)
- `GET  /api/products/:slug`
- `POST/PATCH/DELETE /api/products...` (admin JWT required)
- `GET/PATCH/DELETE /api/admin/users...` (admin JWT required)
- `GET  /api/admin/dashboard` (admin JWT required)

## Common scripts

| Command                | Purpose                          |
| ---------------------- | -------------------------------- |
| `npm run dev`          | Run frontend + backend together  |
| `npm run dev:frontend` | Next.js dev server only          |
| `npm run dev:backend`  | Express API only                 |
| `npm run build`        | Production build (Next.js)       |
| `npm start`            | Run the production build         |
| `npm run lint`         | ESLint                           |
| `npm run seed:admin`   | Create the admin user            |
| `npm run seed:products`| Seed the product catalog         |
