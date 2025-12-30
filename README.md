# AuctionWorx Template Tester

A development tool for testing AuctionWorx CMS templates without a live installation.

## Live Demo

**Production:** https://auctionworx-template-tester.vercel.app

## Features

- **Preview Pages**: Homepage, Browse, Events, Listing Details, Event Details, Account pages
- **Admin Panel**: Edit CMS content, manage custom pages, configure settings
- **Bootstrap 3**: Matches real AuctionWorx platform styling
- **SignalR Mock**: Simulates real-time bid updates
- **localStorage**: Persists CMS content between sessions

## Quick Start

```bash
npm install
npm run dev
```

- Preview site: http://localhost:3000/
- Admin panel: http://localhost:3000/admin

## Project Structure

```
app/
├── (preview)/          # Preview pages (Bootstrap 3)
│   ├── page.tsx        # Homepage
│   ├── Browse/         # Browse listings
│   ├── Events/         # Event listings
│   ├── Listing/Details/[id]/
│   ├── Event/Details/[id]/
│   ├── Account/        # LogOn, Register
│   └── Home/Information/[slug]/  # Custom content pages
├── admin/              # Admin panel (Tailwind)
│   ├── cms/content/    # CMS editors
│   └── settings/       # Mock settings
components/
├── admin/              # Admin components
└── preview/            # Shared preview components
lib/
├── store.ts            # localStorage state management
├── format.ts           # Formatting utilities
└── mock/               # Mock data (listings, events)
public/
├── css/                # Bootstrap 3, base styles
└── js/                 # jQuery, Bootstrap, SignalR mock
```

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Bootstrap 3.4.1 (preview pages)
- Tailwind CSS (admin UI)
- localStorage for persistence

## Development

```bash
npm run dev    # Start dev server
npm run build  # Build for production
npm run lint   # Run ESLint
```

## Deployment

Deployed automatically to Vercel on push to main.

```bash
vercel --prod  # Manual deploy
```

## Documentation

See [CLAUDE.md](./CLAUDE.md) for development constraints and guidelines.
