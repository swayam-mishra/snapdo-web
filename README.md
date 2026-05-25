# Snapdo — Web Frontend

Turn WhatsApp order chaos into structured orders and GST invoices. Built for kiranas, distributors, and tiffin services across India.

🏆 **1st prize — Build for India track, Devfolio (Feb 2026)**

---

## What it does

Indian businesses take hundreds of orders a day over WhatsApp — in Hinglish, voice notes, informal shorthand. Snapdo reads those messages, pulls out the order, and generates a GST-compliant invoice in under 30 seconds.

No workflow changes. No training. Just paste the chat.

---

## Running locally

**1. Clone and install**
```bash
git clone <repo-url>
cd snapdo-web
npm install
```

**2. Add your keys**

Create a `.env.local` file:
```
VITE_API_BASE_URL=http://localhost:3000/api
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
```

Get your Clerk key from [dashboard.clerk.com](https://dashboard.clerk.com).

**3. Start**
```bash
npm run dev
```

App runs at `http://localhost:5173`.

---

## Stack

- **React + Vite** — frontend framework
- **Tailwind CSS 4** — styling
- **Clerk** — auth
- **React Router 7** — routing
- **Sonner** — toast notifications
- **Framer Motion** — animations

---

## Project structure

```
src/
  components/     Shared UI (Button, Input, layouts, etc.)
  hooks/          useApi — authenticated API calls with Clerk token
  lib/            apiFetch, types
  pages/
    public/       Marketing site (landing, features, pricing, about…)
    auth/         Clerk sign-in / sign-up wrappers
    onboarding/   First-login setup
    app/          Dashboard, Extract, Orders, Order detail
    legal/        Privacy, Terms, Cookies, etc.
    errors/       404, 500, Maintenance
```

---

## Contact

Built solo by [Swayam Mishra](https://swayam.codes)  
[swayammishra1504@gmail.com](mailto:swayammishra1504@gmail.com)  
Product email: [hello.almostperfect@gmail.com](mailto:hello.almostperfect@gmail.com)
