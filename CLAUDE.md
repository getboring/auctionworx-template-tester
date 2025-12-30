# AuctionWorx Template Tester

A development tool for testing AuctionWorx CMS templates without a live installation.

## Important Constraints

### Bootstrap 3 Framework
The preview pages use **Bootstrap 3** - NOT Bootstrap 4 or 5. This matches the real AuctionWorx platform.

- Use `.col-xs-*`, `.col-sm-*`, `.col-md-*`, `.col-lg-*` grid classes
- Use `!important` to override Bootstrap styles when needed
- Bootstrap 3 components: `btn`, `panel`, `well`, `form-group`, `form-control`
- No flexbox utilities (Bootstrap 3 predates flexbox support)

### AuctionWorx-Specific Rules
- **Don't remove `.awe-rt-*` classes** - they're used by SignalR for real-time updates
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
