This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Cloud passage

`CloudPassage` sits directly between `Ascent` and `Tours` in both languages.
The existing GSAP setup drives two independently moving cloud masks, a subtle
photo zoom, and a summit route illustration. Scroll backwards to reverse the
transition. Small screens use a shorter scroll distance. Reduced-motion users
and visitors without JavaScript get the photo and content without pinning.

The cloud silhouette in `public/images/cloud-bank.svg` is original, generated
with SVG turbulence and feathered edges. The local summit photo is the existing
Terra Volcano image from `src/lib/content.ts`; no iCapital assets are required.
Translations live under `clouds` in `src/lib/i18n.ts`, and the section's styles
are in `src/app/globals.css`. No new dependencies are needed.

Validation: `npm run build` (includes TypeScript and both `/es` and `/en`).

## Learn more about Next.js

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
