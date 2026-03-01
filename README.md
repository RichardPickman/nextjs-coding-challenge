# Next.js Coding Challenge

Hi 👋!

So, application is built using Next.JS, for styling I use default Tailwind choice and most of the additional components I've installed using Shadcn library. For multiplayer purposes I've decided to proceed with WebSockets using Socket.io.

On behalf of assumptions, simplifications that's it, I suppose. My latest commit before this one was made to fix the problem, but I am honestly just didn't commit it yesterday, which is a bummer, but overrall I've made everything in span of 30 minutes, but didn't finish the whole challenge.

**What was not done:**

1. Saving the user, so on reload you'll get your stats.
2. No sorting in table, because there is no table. Unfortunately Table from shadcn wasnt working correctly and the time was close to deadline, so I dropped it and move on to other more demanding attention tasks.
3. Updating url due to previous reason.

# Deployment

I've used Render to run this application, but it has 1 huge flaw. It has huge Cold Start which can by from 30 seconds up to a minute. So, don't get confused why app is not working, probably it is booting.

Link: https://nextjs-coding-challenge.onrender.com/

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Or for `production` use:

```bash
npm run start
# or
yarn start
# or
pnpm start
```
