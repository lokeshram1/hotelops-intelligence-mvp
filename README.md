# HotelOps Intelligence MVP

Interview-ready Next.js prototype for evidence-backed hotel labor-cost analysis at **Grandview Hotel**. The interface uses six months of synthetic data and a deterministic local analysis engine, so it works without a database, paid API, or `OPENAI_API_KEY`.

## Features

- Demo authentication with the seeded manager account
- Responsive B2B operations dashboard
- Labor KPIs, actual-vs-budget trend, department variance, and occupancy signals
- AI analysis screen with suggested questions, loading state, evidence, confidence, and recommendations
- Server-side `POST /api/analyze` endpoint; arithmetic stays in `lib/analytics.ts`
- Visible `Synthetic Demo Data` and `Prototype / Demo` labels

## Architecture

User → Next.js Dashboard → Analytics Functions → Synthetic Hotel Data → Validation Layer → AI Explanation Layer → Evidence-backed Response

## Stack

Next.js 14, React, TypeScript, Recharts dependency (available for chart expansion), and Vercel-compatible API routes. The current MVP stores demo data in `data/demo.ts`; it intentionally does not require SQLite or Prisma at runtime.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Demo login:

- Email: `manager@grandviewhotel.com`
- Password: `Demo123!`

Example questions:

- Why did labor costs increase last month?
- Which department caused the largest variance?
- How can we reduce labor costs?
- Compare this month with the previous month.

## Deploying to Vercel

1. Push this repository to GitHub.
2. Import the repository into Vercel.
3. Select **Next.js** as the framework.
4. Use the default build command, `npm run build`.
5. Click **Deploy** and open the generated URL.

No production database is required. The demo data is bundled as TypeScript and the analysis route works without environment variables. If an OpenAI-compatible explanation layer is added later, keep `OPENAI_API_KEY` server-only in Vercel Project Settings; never expose it in client code. Copy `.env.example` as a reference.

## Testing and checks

```bash
npm run build
```

The deterministic calculations cover budget variance, percentage variance, labor cost per occupied room, largest department variance, and missing-data-safe behavior in `lib/analytics.ts`. The primary demo flow is: login → dashboard → assistant → suggested question → evidence-backed response.

## Screenshots

Add screenshots of the login screen, dashboard, and assistant response here for an interview submission.

## Current limitations

- Synthetic data only
- One hotel and one demo manager role
- Demo authentication, not enterprise identity
- No PMS, payroll, or accounting integrations
- No real-time updates
- AI integration is optional; local deterministic logic is the default
- Not intended for production use

## Future Production Roadmap

- Real hotel PMS and payroll integrations
- PostgreSQL and durable data pipelines
- Enterprise authentication and multi-property access control
- Scheduled data pipelines and forecasting
- Automated anomaly detection and alert notifications
- Audit logs, observability, and production deployment
