# GoTiny Frontend

A modern URL shortener web application built with Remix, featuring a clean UI, real-time analytics, and seamless user experience.

## Features

- Clean, modern UI built with ShadCN/UI components
- Real-time URL shortening and management
- User authentication and URL management
- URL analytics and click tracking
- QR code generation for shortened URLs
- Light/dark theme support
- Mobile-responsive design

## Tech Stack

- [Remix Run](https://remix.run/) - Full-stack web framework
- [React](https://reactjs.org/) - UI library
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS
- [ShadcnUI](https://ui.shadcn.com/) - Component library
- [TanStack Table](https://tanstack.com/table) - Data tables
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## Quick Start

1. Clone the repository:

```bash
git clone https://github.com/RajNykDhulapkar/gotiny-app.git
cd gotiny-app
```

2. Install dependencies:

```bash
pnpm install
```

3. Configure environment variables:

```env
NODE_ENV=development
SESSION_SECRET=your-secret
SHORT_URL_SERVICE_URL=http://localhost:8080
```

4. Start development server:

```bash
pnpm run dev
```

## Project Structure

```
.
├── app/
│   ├── components/     # Reusable UI components
│   ├── lib/           # Utilities and helpers
│   ├── routes/        # Application routes
│   ├── sessions/      # Session management
│   └── tailwind.css   # Global styles
├── public/            # Static assets
└── components.json    # ShadcnUI configuration
```

## Features Overview

### URL Shortening

- Quick URL shortening with custom slug option
- QR code generation for shortened URLs
- Link history and management

### Analytics

- Click tracking and analytics
- Geographic distribution
- Browser and device statistics
- Referrer tracking

### User Features

- User authentication
- Personal dashboard
- URL management
- Analytics exports

## Docker Support

Build the image:

```bash
docker build -t gotiny-app .
```

Run the container:

```bash
docker run -d \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e SESSION_SECRET=your-secret \
  -e SHORT_URL_SERVICE_URL=http://api:8080 \
  gotiny-app
```

## Development

```bash
# Start development server
pnpm run dev

# Type checking
pnpm run typecheck

# Build for production
pnpm run build

# Start production server
pnpm start
```

## Styling

This project uses Tailwind CSS with ShadcnUI components. The theme can be customized in:

- `tailwind.config.ts` - Tailwind configuration
- `app/tailwind.css` - Global styles
- `components.json` - ShadcnUI theme configuration

## Contributing

1. Fork the repository
2. Create your feature branch
3. Install dependencies (`pnpm install`)
4. Make your changes
5. Run tests and type checking
6. Submit a pull request

## Related Projects

- [GoTiny Backend](https://github.com/RajNykDhulapkar/gotiny)
- [GoTiny Range Allocator](https://github.com/RajNykDhulapkar/gotiny-range-allocator)

## License

MIT License
