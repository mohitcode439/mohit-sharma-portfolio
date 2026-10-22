# Mohit Sharma | Portfolio

Personal portfolio built as a small full-stack system: a **Spring Boot REST API** backed by **PostgreSQL**, and a **React + TypeScript** frontend.

| Layer | Stack |
|---|---|
| Backend | Java 25, Spring Boot 4.1 (Web MVC, Data JPA, Validation, Actuator, Mail), Flyway, springdoc-openapi |
| Database | PostgreSQL in production, H2 (PostgreSQL mode) for local runs and tests |
| Frontend | React 19, TypeScript 6, Vite 8, Tailwind CSS 4 |
| Testing | JUnit 5, Mockito, MockMvc (backend) · Vitest, Testing Library (frontend) |
| Delivery | GitHub Actions CI, Docker image on Render, static frontend on Netlify |

## How it works

```
Browser ──► Netlify (React app) ──fetch──► Render (Spring Boot API) ──JPA──► PostgreSQL
```

- `GET /api/v1/portfolio` returns all content (profile, experience, skills, projects, education, achievements) in display order. Content lives in the database and is managed with **Flyway migrations**, so every change is versioned and reviewable.
- `POST /api/v1/contact` validates the message (Bean Validation, RFC 9457 problem details with per-field errors), **stores it**, then emails a notification when SMTP is configured. A failed email never loses a message. A hidden honeypot field silently drops bot submissions.
- The frontend ships a **snapshot of the content** and renders it instantly, then swaps in live data when the API answers. Visitors never wait for a sleeping free-tier server to start.
- API docs: `/swagger-ui.html` · health checks: `/actuator/health/liveness` (app only, for uptime pings) and `/actuator/health` (includes the database).

## Run locally

Requirements: JDK 25, Maven 3.9+, Node.js 24.

```bash
# API on http://127.0.0.1:8080 (in-memory H2, seeded by Flyway; nothing to install)
cd backend
mvn spring-boot:run

# Frontend on http://localhost:5173, talking to the local API
cd frontend
npm install
npm run dev
```

Tests: `mvn verify` in `backend/`, `npm test` in `frontend/`.

## Configuration

All settings come from environment variables in production; no secrets are stored in this repository.

| Variable | Where | Purpose |
|---|---|---|
| `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, `SPRING_DATASOURCE_PASSWORD` | Render | PostgreSQL connection |
| `PORTFOLIO_CORS_ALLOWED_ORIGINS` | Render | Frontend URL allowed to call the API |
| `SPRING_MAIL_HOST`, `SPRING_MAIL_PORT`, `SPRING_MAIL_USERNAME`, `SPRING_MAIL_PASSWORD`, `PORTFOLIO_CONTACT_NOTIFY_EMAIL` | Render (optional) | Email notifications for contact messages |
| `VITE_API_URL` | Netlify | Base URL of the API |

## Updating content

Add a new migration in `backend/src/main/resources/db/migration` (for example `V3__add_new_project.sql`). After deploying, refresh the frontend's bundled snapshot from the running API:

```bash
curl https://<api-host>/api/v1/portfolio > frontend/src/data/snapshot.json
```
