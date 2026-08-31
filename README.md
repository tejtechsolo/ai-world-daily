# AI & World Daily

A source-backed digital publication for AI, technology, India, world affairs, business and science.

## Current stage

Step 2 foundation. The public homepage shell and initial PostgreSQL/Prisma schema are committed. Automated publishing is intentionally disabled.

## Local setup

Requirements: Node.js 20+, pnpm 10+, PostgreSQL 16+.

1. Copy `.env.example` to `.env.local`.
2. Set `DATABASE_URL` and `AUTH_SECRET`.
3. Install dependencies with `pnpm install`.
4. Generate Prisma client: `pnpm --filter web exec prisma generate`.
5. Create/apply migrations: `pnpm --filter web exec prisma migrate dev --name init`.
6. Start the site: `pnpm dev`.

Open `http://localhost:3000`.

## Publishing safety

`AUTO_PUBLISH_ENABLED=false` is the default. Current-affairs, political, conflict, legal, death/disaster and financial-market stories should require human review before publication.

## Roadmap

- CMS/admin panel
- Source discovery and research pipeline
- AI drafting and verification
- SEO scoring and internal linking
- Scheduled publishing
- Newsletter
- Search Console and Analytics
- Distribution and monetization
