## Pcube‑Portfolio

A polished, animation‑rich developer portfolio built with **Next.js 15**, **Framer Motion**, **Tailwind CSS**, and **tsParticles**, featuring:

- **Interactive particle background**
- **Dark/Light** theme toggle
- **Server‑side contact form** delivering submissions via a Discord webhook
- **Rate limiting** (5 requests / 15 min per IP), input validation, and XSS/CSRF protection
- **SEO** optimizations, image lazy‑loading, and code‑splitting

---

## 📖 Table of Contents

1. [Live Demo](#live-demo)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Folder Structure](#folder-structure)
5. [Quick Start](#quick-start)
6. [Scripts](#scripts)
7. [Deployment](#deployment)
8. [Configuration & Customization](#configuration--customization)
9. [Contact Form API](#contact-form-api)
10. [Performance & SEO](#performance--seo)
11. [Security](#security)
12. [License](#license)
13. [Acknowledgments](#acknowledgments)

---

## 🚀 Live Demo

[![Netlify Demp](https://www.netlify.com/img/deploy/button.svg)](https://pcube-portfolio.netlify.app)

[![Netlify Status](https://api.netlify.com/api/v1/badges/a3ccc0f2-7795-421f-91d8-bb04c3712c7f/deploy-status)](https://app.netlify.com/projects/pcube-portfolio/deploys)

---

## ✨ Features

- **Next.js 15** App Router (SSR & SSG)
- **Framer Motion** transitions & hover animations
- **tsParticles** via `<UnifiedParticleSystem />` component
- **Responsive**, mobile‑first design
- **Dark/Light** theme toggle (persisted to `localStorage`)
- **Contact form** → Discord webhook
- **Rate limiting** (5 submissions / 15 min per IP)
- **Input validation** & **XSS sanitization**
- **Built‑in CSRF** protection (Next.js)
- **Image optimization** & **lazy‑loading** (`next/image`)
- **Code‑splitting** & **dynamic imports**

---

## 🛠 Tech Stack

| Layer         | Technology                                           |
| ------------- | ---------------------------------------------------- |
| Framework     | Next.js 15 (App Router)                              |
| Styling       | Tailwind CSS                                         |
| Animations    | Framer Motion                                        |
| Particles     | tsParticles (`components/UnifiedParticleSystem.tsx`) |
| Class Helpers | `lib/utils.ts` (cn: clsx + twMerge)                  |
| API Handler   | `app/api/contact/route.ts`                           |
| Lint & Format | ESLint, Prettier                                     |
| Type Checking | TypeScript                                           |
| Hosting       | Netlify                                              |

---

## 📂 Folder Structure

```

Pcube-Portfolio/
├── .env.example                  # Sample env vars
├── .gitignore
├── DISCORD\_SETUP.md             # How to create your webhook
├── next.config.ts                # Next.js config
├── postcss.config.mjs            # Tailwind/PostCSS setup
├── tailwind.config.ts            # Theme & plugin config
├── tsconfig.json                 # TypeScript settings
├── eslint.config.mjs             # ESLint rules
├── package.json                  # Scripts & dependencies
├── README.md                     # This file
├── app/
│   ├── api/contact/route.ts      # Contact form handler → Discord
│   ├── globals.css               # Tailwind base + custom globals
│   ├── layout.tsx                # HTML wrapper + ThemeProviderClient
│   └── page.tsx                  # Head tags, Navbar, sections
├── components/                   # UI components & page sections
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx
│   ├── ProjectsSection.tsx
│   ├── SkillsSection.tsx
│   ├── CertificationsSection.tsx
│   ├── ContactSection.tsx        # Renders ContactForm
│   ├── ContactForm.tsx           # Form UI & client‑side validation
│   ├── ThemeToggle.tsx
│   ├── ThemeProviderClient.tsx
│   ├── UnifiedParticleSystem.tsx
│   └── … (other animation / layout components)
├── lib/
│   └── utils.ts                  # cn(...): clsx + twMerge
└── public/
    ├── images/                   # Logos, icons
    └── favicon.ico               # Website favicon

```

---

## ⚡ Quick Start

### Prerequisites

- **Node.js** v18+
- **npm** (v8+) or **Yarn**

### Installation

```bash
git clone https://github.com/icyxonyx/Pcube-Portfolio.git
cd Pcube-Portfolio
npm install
# or
yarn install
```

---

### Environment Variables

```bash
cp .env.example .env
```

Edit `.env`:

```env
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_ID/YOUR_TOKEN
```

> **Note:** `.env` is in `.gitignore`. Do not commit real secrets.

---

### Running Locally

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000). Hot‑reload enabled.

---

## 🖥️ Scripts

| Command      | Description                              |
| ------------ | ---------------------------------------- |
| `dev`        | `next dev` — start development server    |
| `build`      | `next build` — compile for production    |
| `start`      | `next start` — serve production build    |
| `lint`       | `eslint . --ext .ts,.tsx`                |
| `format`     | `prettier --write .`                     |
| `type-check` | `tsc --noEmit` — run TypeScript compiler |

---

## 🚢 Deployment

### Netlify

1. Install plugin:

   ```bash
   npm install @netlify/plugin-nextjs --save-dev
   ```

2. Create `netlify.toml`:

   ```toml
   [build]
     command = "npm run build"
     publish = ".next"

   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

3. Set `DISCORD_WEBHOOK_URL` in Netlify UI → **Site Settings → Build & deploy → Environment**
4. Push & auto‑deploy

### Vercel

1. Push to GitHub
2. Import at [vercel.com/new](https://vercel.com/new)
3. Add `DISCORD_WEBHOOK_URL` under **Settings → Environment Variables**
4. Deploy

---

## ⚙ Configuration & Customization

### Theme

- **Provider**: `app/layout.tsx` imports and wraps with `ThemeProviderClient.tsx`.
- **Toggle**: `components/ThemeToggle.tsx` — adjust icon/positions.
- **Tailwind**: Modify colors/fonts in `tailwind.config.ts` under `theme.extend`.

### Particles

- **File**: `components/UnifiedParticleSystem.tsx`
- **Options**: At top of file, adjust `particles.number.value`, `shape.type`, `color.value`, and interactivity modes.

### Sections & Content

- **Hero** (`components/HeroSection.tsx`): Update title, subtitle, and background settings.
- **About** (`components/AboutSection.tsx`): Swap bio text, skills list, and image.
- **Projects** (`components/ProjectsSection.tsx`): Edit local `projects` array (title, description, image, links).
- **Skills** (`components/SkillsSection.tsx`): Modify skill nodes in `InteractiveSkillTree.tsx`.
- **Certifications** (`components/CertificationsSection.tsx`): Add or remove entries in its array.
- **Contact** (`components/ContactSection.tsx` & `ContactForm.tsx`): Change field labels, placeholders, validation rules.

### Utility Helpers

- **Classnames**: `lib/utils.ts`—`cn(...inputs: ClassValue[])` merges Tailwind classes.
- No other utility modules; all API logic lives in `app/api/contact/route.ts`.

### Next.js Config

- **next.config.ts**: Add image domains, rewrites, or custom headers.
- **postcss.config.mj** and **tailwind.config.ts**: Tweak Tailwind plugins or PostCSS options.

---

## 📬 Contact Form API

- **Endpoint:** `POST /api/contact`
- **File:** `app/api/contact/route.ts`
- **Payload:**

  ```json
  {
    "name": "Name",
    "email": "email@example.com",
    "message": "Hello!"
  }
  ```

- **Flow:**

  1. Validate required fields & email format
  2. Rate‑limit by IP (in‑memory; swap to Redis for production)
  3. Sanitize inputs
  4. Send Discord embed
  5. Return `200` or `429`

---

## 📈 Performance & SEO

- **Image optimization** with `next/image`.
- **Dynamic imports** for heavy components (Particles).
- **Meta tags** in `app/page.tsx` via `<Head>`.
- Optionally add `robots.txt` and `sitemap.xml` to `public/`.

---

## 🔒 Security

- **\.env** ignored—contains webhook URL.
- **Rate limiting** prevents spam—consider persistent store in prod.
- **Input sanitization** guards XSS.
- **CSRF** auto‑handled by Next.js API routes.
- Enforce **HTTPS** in production.

---

## 📄 License

MIT License. See [LICENSE](LICENSE).

---

## 🙏 Acknowledgments

Next.js, Framer Motion, Tailwind CSS, tsParticles, Discord Webhooks
