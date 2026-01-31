# StudyNotion

A learning platform where users can browse courses, sign up, log in, and access course content. Built with React on the frontend and Node.js (Express) on the backend.

## Tech stack

- **Frontend:** React, Redux Toolkit, React Router, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT auth
- **Services:** Stripe (payments), Cloudinary (images), Nodemailer (email), Google Gemini (chat)

## Prerequisites

Before you clone and run the project, make sure you have:

- **Node.js** (v16 or higher; the repo includes an `.nvmrc` if you use nvm)
- **MongoDB** – either [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free tier) or a local MongoDB instance
- **Accounts / API keys** for:
  - [Stripe](https://stripe.com) (test keys for payments)
  - [Cloudinary](https://cloudinary.com) (image uploads)
  - [Google AI (Gemini)](https://ai.google.dev) (optional; for the chatbot)
  - Gmail or another SMTP provider (for signup, password reset, and payment emails)

## Clone and setup

**1. Clone the repo**

```bash
git clone https://github.com/YOUR_USERNAME/StudyNotion.git
cd StudyNotion
```

**2. Backend environment**

Create a `.env` file inside the `Server` folder and add your own values (do not commit real secrets). Example:

```env
PORT=4000
MONGODB_URL=mongodb+srv://YOUR_USER:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/?retryWrites=true&w=majority

JWT_SECRET=your-long-random-secret

CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME
# Or use separate vars:
CLOUD_NAME=your_cloud_name
API_KEY=your_api_key
API_SECRET=your_api_secret
FOLDER_NAME=studynotion

STRIPE_SECRET_KEY=sk_test_...

MAIL_HOST=smtp.gmail.com
MAIL_USER=your-email@gmail.com
MAIL_PASS=your-app-password

GEMINI_API_KEY=your-gemini-api-key

# Optional; used for redirects after payment
FRONTEND_URL=http://localhost:3000
```

- **MONGODB_URL:** From MongoDB Atlas: Database > Connect > “Connect your application”, or use a local URL like `mongodb://localhost:27017/studynotion`.
- **JWT_SECRET:** Any long random string; used to sign auth tokens.
- **Cloudinary:** Create a cloud, then use the URL from the dashboard or the three separate vars.
- **Stripe:** Dashboard > Developers > API keys; use test keys while developing.
- **Mail:** For Gmail, use an [App Password](https://support.google.com/accounts/answer/185833), not your normal password.
- **GEMINI_API_KEY:** From [Google AI Studio](https://aistudio.google.com/app/apikey); omit if you are not using the chatbot.

**3. Frontend environment**

Create a `.env` file in the **project root** (same level as `package.json`):

```env
REACT_APP_BASE_URL=http://localhost:4000
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

- **REACT_APP_BASE_URL:** Backend URL. Use `http://localhost:4000` for local dev, or your deployed API URL in production.
- **REACT_APP_STRIPE_PUBLISHABLE_KEY:** Stripe publishable key (starts with `pk_test_` or `pk_live_`).

**4. Install dependencies and run**

Backend:

```bash
cd Server
npm install
npm run dev
```

Leave this running. The API will be at http://localhost:4000.

In a new terminal, from the project root:

```bash
npm install
npm start
```

The app will open at http://localhost:3000.

To run both frontend and backend from the root in one go:

```bash
npm run dev
```

## Project structure

```
StudyNotion/
├── public/           # Static assets for the React app
├── src/               # Frontend source
│   ├── components/   # Reusable UI and page-specific components
│   ├── pages/         # Route-level pages
│   ├── services/      # API calls and helpers
│   ├── slices/        # Redux state
│   └── ...
├── Server/            # Backend
│   ├── api/           # Vercel serverless entry (api/index.js)
│   ├── config/        # DB, Cloudinary, Stripe
│   ├── controllers/   # Route handlers
│   ├── models/        # Mongoose models
│   ├── routes/        # Express routes
│   ├── index.js       # Express app entry
│   └── ...
├── .env               # Frontend env (not committed)
├── Server/.env        # Backend env (not committed)
├── vercel.json        # SPA routing for frontend deployment
└── package.json
```

## Scripts

| Command | Description |
|--------|-------------|
| `npm start` | Run the frontend dev server (port 3000). |
| `npm run build` | Build the frontend for production (output in `build/`). |
| `npm run dev` | Run frontend and backend together from the root. |
| `npm run server` | Run only the backend (must be run from inside `Server/` or via the root script). |

## Build and deploy

- **Frontend:** Run `npm run build`, then deploy the `build` folder to any static host (e.g. Vercel with root directory `.`, build command `npm run build`, output directory `build`). Set `REACT_APP_BASE_URL` and `REACT_APP_STRIPE_PUBLISHABLE_KEY` in the host’s environment.
- **Backend:** Deploy the `Server` folder as a Node service (e.g. Vercel with root directory `Server`, or Render, Railway, etc.). Configure all Server env vars on the host. If you use Vercel, the repo already includes `Server/api/index.js` and the Express app is set up for serverless.

## Troubleshooting

- **“DB Connection Failed”** – Check `MONGODB_URL` in `Server/.env`, IP allowlist in MongoDB Atlas if applicable, and that the cluster is running.
- **CORS errors in the browser** – Ensure the backend CORS config (in `Server/index.js`) includes your frontend origin (e.g. `http://localhost:3000` for local, or your production frontend URL). For Vercel backend, `Server/vercel.json` also sets CORS headers.
- **Stripe or Cloudinary errors** – Confirm the keys in `Server/.env` and frontend `.env` match the same Stripe/Cloudinary account and environment (test vs live).
