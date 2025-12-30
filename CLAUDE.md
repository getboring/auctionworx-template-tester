# AuctionWorx Template Tester

A development tool for testing AuctionWorx CMS templates without a live installation.

## Important Constraints

### Bootstrap 3 Framework (Hard Constraint)
The preview pages use **Bootstrap 3.4.1** - NOT Bootstrap 4 or 5. This matches the real AuctionWorx platform.

| Bootstrap 3 ✓ | Bootstrap 4/5 ✗ | Notes |
|---------------|-----------------|-------|
| `col-xs-*`, `col-sm-*`, `col-md-*` | `col-*` (no xs prefix) | Grid system |
| `panel`, `panel-default` | `card` | Content boxes |
| `btn-default` | `btn-secondary` | Button styles |
| `pull-left`, `pull-right` | `float-start`, `float-end` | Floats |
| `img-responsive` | `img-fluid` | Responsive images |
| `hidden-xs`, `visible-sm` | `d-none`, `d-sm-block` | Visibility |
| `text-left`, `text-right` | `text-start`, `text-end` | Alignment |
| Glyphicons | No default icons | Icons |

Use `!important` to override Bootstrap styles when needed. No flexbox utilities (Bootstrap 3 predates them).

### Protected SignalR Elements
**NEVER remove, rename, or hide these** - they enable live bid updates:

| Selector | Purpose | If Removed |
|----------|---------|------------|
| `.awe-rt-*` (all) | Real-time data binding | Bids won't update live |
| `.awe-hidden` | SignalR visibility control | UI state breaks |
| `#SignalRStatus` | Connection indicator | No connection feedback |
| `#Time` | Server time sync | Auction timing issues |

**Safe:** Colors, fonts, backgrounds, positioning. **Unsafe:** `display:none`, `visibility:hidden`, removing from DOM.

### AuctionWorx-Specific Rules
- Custom page URLs follow pattern: `/Home/Information/PageName`
- Homepage announcement wrapper: `<div class="hp-announce header-splash">`

### CSS/JS Injection Points
Templates inject content at these points:
- **Header Scripts**: CSS, fonts, meta tags (inside `<head>`)
- **Footer Scripts**: JavaScript (before `</body>`)
- **Site Header**: HTML above navigation
- **Site Footer**: HTML in footer area
- **Homepage Announcement**: Hero section above listings
- **Sub-Navigation**: `<li>` items in navbar

## Tech Stack
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS (admin UI only)
- localStorage for state persistence

## Development
```bash
npm run dev    # Start dev server
npm run build  # Build for production
npm run lint   # Run ESLint
```

Preview site: http://localhost:3000/
Admin panel: http://localhost:3000/admin
