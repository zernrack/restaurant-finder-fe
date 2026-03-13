# Restaurant Finder Frontend

This is the frontend client for the Restaurant Finder AI application.
It provides a modern search interface where users can submit natural-language restaurant requests, view structured results, and see validation/error feedback from the backend.

The frontend is built using Next.js, React, and TypeScript with a component-driven UI architecture focused on clarity, responsiveness, and safe API integration.

---

# Tech Stack

Core Technologies

* Next.js (App Router)
* React
* TypeScript

Libraries

* Zod — runtime API response validation
* lucide-react — icon system
* class-variance-authority / clsx / tailwind-merge — UI class composition
* Tailwind CSS — styling and design tokens

Integration

* Backend API (`/api/execute`) for restaurant search

---

# Project Structure

```text
app
├── layout.tsx
├── page.tsx
└── globals.css

components
├── search-form.tsx
├── restaurant-card.tsx
└── ui/
	├── alert.tsx
	├── button.tsx
	├── input.tsx
	├── item.tsx
	└── separator.tsx

lib
├── api.ts
├── schema.ts
└── utils.ts
```

UI flow:

```
Page → SearchForm → API Client → Backend /api/execute → RestaurantCard list
```

Responsibilities are separated so that:

* `page.tsx` manages high-level page layout and results state
* `search-form.tsx` handles user input, loading state, and error rendering
* `restaurant-card.tsx` renders normalized restaurant fields
* `lib/api.ts` handles backend communication and error extraction
* `lib/schema.ts` validates response shape before UI rendering

---

# Setup Instructions

## 1. Clone the repository

```bash
git clone <repository-url>
cd restaurant-finder-fe
```

## 2. Install dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in the project root.

Example:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Notes:

* `NEXT_PUBLIC_API_URL` must point to the running backend service
* frontend env vars must be prefixed with `NEXT_PUBLIC_` to be available in the browser
* after editing env variables, restart the Next.js dev server

---

# Running the Application

Start the development server:

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:3000
```

Build for production:

```bash
npm run build
```

Start production build:

```bash
npm run start
```

Lint checks:

```bash
npm run lint
```

---

# API Integration

The frontend sends search requests to backend endpoint:

```
GET {NEXT_PUBLIC_API_URL}/api/execute
```

Query parameters:

| Parameter | Description                       |
| --------- | --------------------------------- |
| `message` | Natural language search query     |
| `code`    | Access gate value (`pioneerdevai`) |

Example request URL from frontend client:

```
http://localhost:3001/api/execute?message=sushi%20in%20los%20angeles&code=pioneerdevai
```

---

# Data Validation and Error Handling

The frontend validates backend responses with Zod before rendering.

Handled error categories:

* empty user query
* backend HTTP errors (`400`, `401`, `500`, etc.)
* backend structured error messages (`{ error: string }`)
* invalid API response shape

Errors are displayed in an in-page alert component to provide clear user feedback without crashing the UI.

---

# UI Behavior

Search experience includes:

* disabled submit button while loading
* loading state while request is in progress
* empty state before first search
* no-result state when backend returns an empty list
* card-based result rendering with optional fields (`rating`, `priceLevel`, `hours`, `website`, `openNow`)

---

# Security and Robustness

Frontend safeguards include:

* schema-based response validation before rendering
* controlled error propagation from API layer to UI
* explicit handling of optional data fields
* strict TypeScript types for request/response structures

---

# Technical Design Decisions

### Thin API Client + Validation

`lib/api.ts` remains focused on transport/error extraction, while `lib/schema.ts` guarantees the UI receives a trusted shape.

### Component-Driven UI

Search form, result cards, and primitives are split into focused components for maintainability and reuse.

### Backend-First Data Contract

Frontend presentation is based on normalized backend fields, allowing stable rendering even when optional attributes are missing.

---

# Assumptions

* Backend is running and reachable through `NEXT_PUBLIC_API_URL`
* Backend returns payload compatible with `ExecuteResponseSchema`
* User enters natural-language restaurant requests

---

# Tradeoffs

* Uses backend query-parameter auth gate (`code=pioneerdevai`) for assignment simplicity
* Focuses on single-page search flow rather than multi-page navigation
* Depends on backend normalization for restaurant attributes

---

# Limitations

* No frontend unit/integration test suite is currently configured
* User-facing error details depend on backend error message quality
* Search results quality depends on backend LLM interpretation and external API availability

---

# Future Improvements

Potential enhancements include:

* add frontend unit/component tests
* add retry action in error alert
* add pagination or incremental loading for results
* add loading skeletons for improved perceived performance
* add analytics/telemetry for search success and failures

---

# Deployment

Deployed frontend URL

```
<your-frontend-url>
```

Expected environment variable in deployment:

```
NEXT_PUBLIC_API_URL=<your-backend-url>
```
