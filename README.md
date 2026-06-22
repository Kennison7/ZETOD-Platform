# ZeToD — Zero To Deploy

> Know exactly where you stand. Beginner, Intermediate, or Job Ready.

ZeToD is an open source Python skill assessment platform built for African developers. It measures a developer's accuracy, speed, and knowledge depth against an expert benchmark — giving them a live skill score and a clear picture of where they stand.

---

## The Problem

Thousands of African developers are learning Python but have no honest way to know if they are job ready. Certificates mean nothing. Self-assessment is unreliable. ZeToD fixes that.

---

## Live URLs

| Resource | URL |
|---|---|
| Frontend | https://zetod-platform.vercel.app |
| Backend API | https://zetod-backend.onrender.com |
| Health Check | https://zetod-backend.onrender.com/health |

---

## What It Does

- Assesses Python knowledge across Beginner, Intermediate, and Expert levels
- Combines theoretical questions and practical coding challenges
- Measures accuracy, speed, and knowledge depth
- Assigns a clear level — Beginner, Intermediate, or Job Ready
- Recommends specific topics to study if not yet job ready
- Provides a live skill score visible on the dashboard

---

## Tech Stack

| Layer | Tool | Hosting |
|---|---|---|
| Frontend | React + Tailwind CSS + Vite | Vercel |
| Backend | Node.js + Express | Render |
| Database | PostgreSQL | Supabase |
| Auth | Supabase Auth (Email + Google + GitHub OAuth) | Supabase |
| Analytics | PostHog | EU Cloud |
| Error Tracking | Sentry | Cloud |
| CI/CD | GitHub Actions | GitHub |
| Code Execution | Judge0 (planned) | Self-hosted |

---

## Getting Started (Local Development)

### Prerequisites
- Node.js 18+
- npm

### Frontend

```bash
git clone https://github.com/Kennison7/ZETOD-Platform.git
cd ZETOD-Platform
npm install
```

Create a `.env` file in the root:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_POSTHOG_HOST=https://eu.posthog.com
VITE_API_URL=https://zetod-backend.onrender.com
```

```bash
npm run dev
```

### Backend

```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:

```
PORT=5000
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key
JWT_SECRET=your_jwt_secret
```

```bash
npm start
```

### Run Tests

```bash
cd backend
npm test
```

---

## Architecture

```
User Browser
     │
     ▼
React + Vite (Vercel)
     │
     ├── Supabase Auth (Google / GitHub / Email OAuth)
     │
     ├── PostHog (Analytics)
     │
     └── Node.js + Express API (Render)
               │
               ├── Supabase PostgreSQL (Database)
               │
               └── Sentry (Error Tracking)
```

---

## CI/CD Pipeline

GitHub Actions runs on every push to `main`:
- Installs dependencies
- Runs 10 Jest/Supertest tests
- All tests must pass before merge

**Current test status: 10/10 passing**

---

## Build Progress

| Week | Focus | Status |
|---|---|---|
| Week 1 | Problem definition, architecture, repo setup | ✅ Done |
| Week 2 | Backend deployment, Jest tests, CI/CD pipeline | ✅ Done |
| Week 3 | Supabase auth, JWT middleware, PostHog, Sentry, rate limiting | ✅ Done |
| Week 4 | Google + GitHub OAuth, Vercel env vars, Lighthouse scores, 20 user signups | ✅ Done |
| Week 5 | OAuth bug fix, security hardening, OWASP pass, JWT rotation | ✅ Done |
| Week 6 | Production-grade build, demo video, final submission | 🔄 In Progress |

---

## Security

- HTTPS enforced on all endpoints (Vercel + Render)
- JWT secret stored in GitHub Secrets only
- No hardcoded credentials in repository
- Rate limiting on all auth endpoints
- Input validation on register and login
- Debug routes removed from production
- OWASP basic checklist completed (Week 5)

---

## Team

| Name | Role | GitHub |
|---|---|---|
| Kenneth Omoregie | Project Lead + Backend | [@Kennison7](https://github.com/Kennison7) |
| Joseph (Brayden) | Frontend | [@Brayden-Code-4](https://github.com/Brayden-Code-4) |
| Emmanuel Gbafore | CI/CD + QA | [@EmmanuelGbafore](https://github.com/EmmanuelGbafore) |

---

## License

MIT License — open source and free forever.

---

*Built as part of the Build In Africa program by NSK AI × The Udara Project, 2026.*
