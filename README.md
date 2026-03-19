# Maison & Co — Luxury Furniture E-Commerce Website

A complete, production-ready furniture e-commerce website built with Next.js 14, Tailwind CSS, Framer Motion, and Supabase.

---

## What This Is

Maison & Co is a fully-featured online furniture store with:
- **Homepage** with hero, marquee strip, category cards, featured products, editorial banner, and brand pillars
- **Products page** with category filters, price range slider, material filters, and sorting
- **Product detail pages** with image gallery, add to cart, and related products
- **Cart** with quantity controls and order summary
- **Full SEO** — metadata, sitemap, robots.txt, Open Graph, Twitter cards, JSON-LD structured data
- **Responsive** — mobile-first, works on all screen sizes

---

## Step 1: Install Dependencies

Make sure you have **Node.js 18+** installed. Then open a terminal in this folder and run:

```bash
npm install
```

---

## Step 2: Set Up Supabase

### Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up for a free account
2. Click **"New Project"**
3. Give it a name (e.g. "maison-co"), choose a region close to you, set a database password, and click **Create Project**
4. Wait ~2 minutes for it to provision

### Run the Database Schema

1. In your Supabase dashboard, click **"SQL Editor"** in the left sidebar
2. Click **"New query"**
3. Open the file `supabase/schema.sql` from this project
4. Copy all the contents and paste them into the SQL editor
5. Click **"Run"** (the green button)
6. You should see "Success" — your 12 sample products are now in the database!

### Copy Your API Keys

1. In your Supabase dashboard, click **"Project Settings"** (gear icon) in the left sidebar
2. Click **"API"**
3. You'll see two values you need:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon public key** (a long string starting with `eyJ...`)

---

## Step 3: Configure Environment Variables

Open the `.env.local` file in this project and fill in your values:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace `your-project-id` and `your-anon-key-here` with the values you copied from Supabase.

---

## Step 4: Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You should see the full website with products loaded from Supabase.

---

## Step 5: Deploy to Vercel

### Option A: Deploy via Vercel Website (Recommended for Beginners)

1. Go to [vercel.com](https://vercel.com) and sign up (free)
2. Click **"Add New Project"**
3. Import your project:
   - If your code is on GitHub: connect your GitHub account and select the repo
   - If using local files: install the Vercel CLI (`npm i -g vercel`) and run `vercel` in the project folder
4. On the configuration screen:
   - Framework: **Next.js** (auto-detected)
   - Root directory: leave as is
5. **Add Environment Variables** — click "Environment Variables" and add:
   - `NEXT_PUBLIC_SUPABASE_URL` → your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` → your Supabase anon key
6. Click **"Deploy"**
7. Wait ~2 minutes — Vercel will give you a live URL like `https://maison-co-xyz.vercel.app`

### Option B: Deploy via CLI

```bash
npm install -g vercel
vercel
```

Follow the prompts. When asked about environment variables, enter your Supabase keys.

---

## How to Add or Edit Products

All products are managed directly in your **Supabase database** — no code changes needed.

### Add a New Product

1. Go to your Supabase dashboard
2. Click **"Table Editor"** in the left sidebar
3. Select the **"products"** table
4. Click **"Insert row"**
5. Fill in the fields:
   - `name`: Product name (e.g. "Milan Sofa")
   - `slug`: URL-friendly version with hyphens (e.g. "milan-sofa") — must be unique
   - `description`: Product description
   - `price`: Number (e.g. 1250.00)
   - `category`: One of `living-room`, `bedroom`, or `dining`
   - `material`: Material description (e.g. "Linen / Walnut")
   - `image_url`: URL of the product image (Unsplash works great)
   - `featured`: Check this to show the product on the homepage
   - `in_stock`: Uncheck if sold out
6. Click **"Save"**

The product will appear on your website immediately.

### Edit a Product

1. Go to **Table Editor → products**
2. Click on any cell to edit it
3. Press Enter to save

### Delete a Product

1. Go to **Table Editor → products**
2. Click the checkbox next to the product row
3. Click **"Delete"**

---

## Project Structure

```
/app              — Next.js pages
/components       — Reusable UI components and page sections
/lib              — Supabase client, TypeScript types, cart logic
/supabase         — Database schema SQL file
/public           — Static assets
```

---

## Tech Stack

- **Next.js 14** (App Router) — React framework
- **TypeScript** — Type safety
- **Tailwind CSS** — Styling
- **Framer Motion** — Animations
- **Supabase** — Database & backend
- **Vercel** — Deployment

---

## Need Help?

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
