# StudyNotion

A learning platform where users can browse courses, sign up, log in, and access course content. Built with React on the frontend and Node.js (Express) on the backend.

## Tech stack

- **Frontend:** React, Redux Toolkit, React Router, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT auth
- **Services:** Stripe (payments), Cloudinary (images), Resend (email via Nodemailer), Google Gemini (chatbot)

## Prerequisites

Before you clone and run the project, make sure you have:

- **Node.js** (v18 or higher; the repo includes an `.nvmrc` if you use nvm)
- **MongoDB** – [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free tier) or a local MongoDB instance
- **Accounts / API keys** for:
  - [Stripe](https://stripe.com) (test keys for payments)
  - [Cloudinary](https://cloudinary.com) (image uploads)
  - [Resend](https://resend.com) (transactional email; free tier available)
  - [Google AI (Gemini)](https://ai.google.dev) (optional; for the chatbot)

## Clone and setup

**1. Clone the repo**

```bash
git clone https://github.com/YOUR_USERNAME/StudyNotion.git
cd StudyNotion
```

**2. Backend environment**

Create a `.env` file inside the `Server` folder with your own values (do not commit real secrets):

```env
PORT=4000
MONGODB_URL=mongodb+srv://YOUR_USER:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/?retryWrites=true&w=majority

JWT_SECRET=your-long-random-secret

# Cloudinary (use CLOUDINARY_URL or separate vars)
CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME
CLOUD_NAME=your_cloud_name
API_KEY=your_api_key
API_SECRET=your_api_secret
FOLDER_NAME=studynotion

STRIPE_SECRET_KEY=sk_test_...

# Resend (Nodemailer SMTP – host: smtp.resend.com, user: resend, pass: API key)
RESEND_API_KEY=re_your_resend_api_key
MAIL_FROM=StudyNotion <onboarding@resend.dev>

# Optional; for chatbot
GEMINI_API_KEY=your-gemini-api-key

# CORS – comma-separated frontend origins (localhost:3000 is added automatically)
FRONTEND_URL=https://your-frontend.vercel.app
```

- **MONGODB_URL:** From MongoDB Atlas: Database → Connect → “Connect your application”, or local: `mongodb://localhost:27017/studynotion`.
- **JWT_SECRET:** Any long random string for signing auth tokens.
- **Cloudinary:** Create a cloud at [cloudinary.com](https://cloudinary.com); use the dashboard URL or the separate vars.
- **Stripe:** Dashboard → Developers → API keys; use test keys while developing.
- **Resend:** Sign up at [resend.com](https://resend.com), create an API key, and add a verified sender in the dashboard. Set `MAIL_FROM` to that sender (e.g. `StudyNotion <your@email.com>`).
- **GEMINI_API_KEY:** From [Google AI Studio](https://aistudio.google.com/app/apikey); omit if not using the chatbot.
- **FRONTEND_URL:** Your deployed frontend URL for CORS (e.g. Vercel app URL). Required when frontend and backend are on different domains.

**3. Frontend environment**

Create a `.env` file in the **project root** (same level as `package.json`):

```env
REACT_APP_BASE_URL=http://localhost:4000
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

- **REACT_APP_BASE_URL:** Backend URL. Use `http://localhost:4000` for local dev, or your deployed API URL in production.
- **REACT_APP_STRIPE_PUBLISHABLE_KEY:** Stripe publishable key (`pk_test_...` or `pk_live_...`).

**4. Install and run**

Backend (from project root):

```bash
cd Server
npm install
npm run dev
```

Keep this running. The API will be at http://localhost:4000.

In a **new terminal**, from the project root:

```bash
npm install
npm start
```

The app will open at http://localhost:3000.

**Run frontend and backend together** (from project root):

```bash
npm run dev
```

## Project structure

```
StudyNotion/
├── public/              # Static assets for the React app
├── src/                 # Frontend source
│   ├── components/      # Reusable UI and page components
│   ├── pages/           # Route-level pages
│   ├── services/        # API calls and Redux operations
│   ├── slices/          # Redux state
│   └── ...
├── Server/              # Backend
│   ├── config/         # DB, Cloudinary, Stripe
│   ├── controllers/    # Route handlers
│   ├── mail/           # Email templates
│   ├── models/         # Mongoose models
│   ├── routes/         # Express routes
│   ├── utils/          # Helpers (e.g. mailSender)
│   ├── index.js        # Express app entry
│   └── ...
├── .env                 # Frontend env (not committed)
├── Server/.env         # Backend env (not committed)
├── DEPLOYMENT_CHECKLIST.md   # Vercel + Render deploy steps
├── vercel.json         # SPA routing for frontend deployment
└── package.json
```

## Scripts

| Command | Description |
|--------|-------------|
| `npm start` | Run the frontend dev server (port 3000). |
| `npm run build` | Build the frontend for production (output in `build/`). |
| `npm run dev` | Run frontend and backend together from the root. |
| `npm run server` | Run only the backend (from root; runs `Server` with nodemon). |

From inside `Server/`:

| Command | Description |
|--------|-------------|
| `npm run dev` | Run backend with nodemon (port 4000). |
| `npm start` | Run backend with node. |

## Build and deploy

- **Frontend:** Build with `npm run build`, then deploy the `build` folder to a static host (e.g. Vercel). Set `REACT_APP_BASE_URL` and `REACT_APP_STRIPE_PUBLISHABLE_KEY` in the host’s environment variables.
- **Backend:** Deploy the `Server` folder as a Node service (e.g. Render, Railway). Set all Server env vars on the host; include `FRONTEND_URL` with your frontend URL for CORS.

See **DEPLOYMENT_CHECKLIST.md** for step-by-step Vercel + Render deployment and required env vars.

## Troubleshooting

- **“DB Connection Failed”** – Check `MONGODB_URL` in `Server/.env`, IP allowlist in MongoDB Atlas if applicable, and that the cluster is running.
- **CORS errors** – Ensure `FRONTEND_URL` in `Server/.env` (or on Render) includes your frontend origin with no trailing slash (e.g. `https://your-app.vercel.app`). Localhost is allowed by default.
- **Emails not sending** – Verify `RESEND_API_KEY` and that `MAIL_FROM` is a verified sender in the Resend dashboard.
- **Stripe or Cloudinary errors** – Confirm keys in `Server/.env` and frontend `.env` match the same account and environment (test vs live).
