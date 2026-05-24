# Allo Store

Real-time inventory reservation dashboard built with Next.js, Prisma, and PostgreSQL.

---

## Features

- Multi-warehouse inventory tracking
- Product reservation system
- Reservation expiry countdown
- Confirm / release reservation flow
- PostgreSQL database integration
- Responsive dashboard UI

---

## Tech Stack

- Next.js
- TypeScript
- Prisma
- PostgreSQL
- Tailwind CSS
- Vercel

---

## Setup

```bash
npm install
npx prisma db push
npx prisma db seed
npm run dev
```

---

## Environment Variables

Create `.env` file:

```env
DATABASE_URL="postgresql://neondb_owner:npg_p2bwIGnS4dkV@ep-billowing-scene-aorv14cd-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
```

---

## Deployment

Deployed using:

- Vercel
- Neon PostgreSQL
