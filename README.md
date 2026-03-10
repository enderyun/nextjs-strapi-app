# Next.js + Strapi Application

A full-stack web application built with Next.js on the frontend and Strapi as the headless CMS backend. The project follows a monorepo structure with two independent packages: `frontend` and `backend`.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Frontend](#frontend)
- [Backend](#backend)

---

## Overview

This application consists of:

- A **Next.js** frontend that fetches content from Strapi using the REST API, handles user authentication with server actions, and renders pages dynamically.
- A **Strapi** backend that manages content types (such as the home page with a hero section), exposes a REST API, and handles user authentication through the built-in Users & Permissions plugin.

---

## Tech Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 16.1.6 | React framework with App Router |
| React | 19.2.3 | UI library |
| TypeScript | ^5 | Type safety |
| Tailwind CSS | ^4 | Utility-first styling |
| shadcn/ui | ^3.8.5 | Component library (Radix UI based) |
| Zod | ^4.3.6 | Schema validation |
| qs | ^6.15.0 | Query string serialization for Strapi API calls |
| lucide-react | ^0.576.0 | Icon library |

### Backend

| Technology | Version | Purpose |
|---|---|---|
| Strapi | 5.37.1 | Headless CMS |
| TypeScript | ^5 | Type safety |
| SQLite (better-sqlite3) | 12.4.1 | Default development database |
| @strapi/plugin-users-permissions | 5.37.1 | Authentication and authorization |

---

## Project Structure

```
next-js-strapi-app/
├── frontend/                      # Next.js application
│   ├── app/                       # App Router directory
│   │   ├── (auth)/                # Route group for authentication pages
│   │   │   ├── signin/            # Sign-in page
│   │   │   └── signup/            # Sign-up page
│   │   ├── layout.tsx             # Root layout (Geist fonts, global CSS)
│   │   ├── page.tsx               # Home page (fetches data from Strapi)
│   │   └── globals.css            # Global styles
│   ├── actions/                   # Next.js Server Actions
│   │   ├── index.ts               # Barrel export for all actions
│   │   └── auth.ts                # registerUserAction (sign-up logic)
│   ├── components/                # UI components
│   │   ├── hero-section.tsx       # Hero section (renders Strapi dynamic zone data)
│   │   ├── sign-up-form.tsx       # Sign-up form with useActionState
│   │   ├── sign-in-form.tsx       # Sign-in form
│   │   ├── form-error.tsx         # Inline field error display
│   │   └── ui/                    # shadcn/ui primitives (Button, Card, Input, Label...)
│   ├── lib/
│   │   ├── strapi.ts              # Strapi API client (fetch helpers, STRAPI_BASE_URL)
│   │   └── utils.ts               # Shared utility functions
│   ├── validations/
│   │   └── auth.ts                # Zod schemas (SignupFormSchema, SigninFormSchema, FormState type)
│   ├── next.config.ts             # Next.js configuration
│   ├── tsconfig.json              # TypeScript configuration
│   └── package.json
│
└── backend/                       # Strapi application
    ├── src/
    │   ├── api/
    │   │   └── home-page/         # Home page content type
    │   │       ├── content-types/ # JSON schema definition
    │   │       ├── controllers/
    │   │       ├── routes/
    │   │       └── services/
    │   ├── components/            # Strapi components (e.g. layout.hero-section)
    │   ├── extensions/            # Plugin extensions
    │   └── index.ts               # Strapi lifecycle hooks
    ├── config/
    │   ├── database.ts            # Database configuration (SQLite / MySQL / PostgreSQL)
    │   ├── server.ts              # Server configuration (host, port)
    │   ├── admin.ts               # Admin panel configuration
    │   ├── api.ts                 # API configuration
    │   ├── middlewares.ts         # Middleware configuration
    │   └── plugins.ts             # Plugin configuration
    ├── database/                  # SQLite data directory
    ├── .env.example               # Example environment file
    └── package.json
```

---

## Prerequisites

- **Node.js** >= 20.0.0
- **pnpm** (recommended, both packages use pnpm workspaces)

---

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd next-js-strapi-app
```

### 2. Set up the backend

```bash
cd backend
cp .env.example .env
# Fill in the required values in .env (see Environment Variables section)
pnpm install
pnpm dev
```

Strapi will be available at `http://localhost:1337`. On first run, you will be prompted to create an administrator account.

### 3. Set up the frontend

Open a new terminal:

```bash
cd frontend
pnpm install
pnpm dev
```

The Next.js application will be available at `http://localhost:3000`.

---

## Environment Variables

### Backend (`backend/.env`)

Copy `backend/.env.example` and fill in the values:

```env
HOST=0.0.0.0
PORT=1337
APP_KEYS="your-app-key-1,your-app-key-2"
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
TRANSFER_TOKEN_SALT=your-transfer-token-salt
JWT_SECRET=your-jwt-secret
ENCRYPTION_KEY=your-encryption-key
```

### Frontend

The frontend reads the Strapi base URL from an environment variable. Create a `frontend/.env.local` file:

```env
STRAPI_API_URL=http://localhost:1337
```

If this variable is not set, the frontend defaults to `http://localhost:1337`.

