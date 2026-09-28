# Deployment

## Required configuration

- Set `NEXT_PUBLIC_SITE_URL` to the canonical production URL. This drives canonical metadata, JSON-LD, robots, and sitemap URLs.
- Set `NEXT_PUBLIC_CALENDLY_URL` only after a real booking link is available. The scheduling action remains hidden when it is unset.

## Release checks

1. `pnpm install` (commit the generated `pnpm-lock.yaml`; use `--frozen-lockfile` in CI afterward)
2. `pnpm typecheck`
3. `pnpm lint`
4. `pnpm build`
5. Verify the contact mail-client flow, all project and insight routes, sitemap, robots, and social preview.

Deploy on Vercel after these checks pass. Vercel Analytics activates automatically in production; add other analytics credentials only through environment variables and consent-approved configuration.
