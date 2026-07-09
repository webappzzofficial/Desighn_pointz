# Design Point WhatsApp Ecommerce Showcase

Premium responsive product showcase for Design Point Advertising & Printing. The public website presents four main categories and product detail pages, while enquiries open WhatsApp with product context. There is no payment gateway.

## Stack

- Vite + React + TypeScript
- Tailwind CSS
- Supabase PostgreSQL, Auth, Storage, and RLS
- Vercel-ready static deployment

## Local Setup

```bash
pnpm install
pnpm dev
```

Create `.env.local` from `.env.example`:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
VITE_SITE_URL=https://your-domain.com
```

Without Supabase environment variables, the admin UI runs in local demo mode using `localStorage`.

## Supabase Setup

1. Create a Supabase project.
2. Open SQL Editor and run `supabase/schema.sql`.
3. Create one admin user in Supabase Auth.
4. Upload the logo to the `logo` bucket.
5. Upload category images to `categories`.
6. Upload product images to `products`.

The schema includes:

- `categories`
- `products`
- `product_images`
- `site_settings`
- Storage buckets: `logo`, `categories`, `products`
- RLS policies for public read and authenticated admin writes

Never expose the Supabase service role key in the frontend.

## Admin CMS

Admin routes are under `/admin`.

CMS sections:

- Dashboard
- Categories
- Products
- Website Settings
- Profile
- Logout

Category CMS supports editing name, image URL, status, and display order. Product CMS supports add, edit, delete, category, price, status, description, and image placeholders. Production upload flows should write images to Supabase Storage and save URLs in `product_images`.

## WhatsApp Number

The WhatsApp number is stored in website settings. Product buttons generate this message:

```text
Hi,

I am interested in this product.

Product: [Product Name]
Category: [Category]
Price: INR [Price]

Please share more details.
```

## Assets

Provided assets are copied into:

- `public/assets/brand/logo.png`
- `public/assets/brand/new-logo.pdf`
- `public/favicon.png`
- `public/assets/categories/gift-items.jpg`
- `public/assets/categories/id-cards.jpg`
- `public/assets/categories/mementos-trophy.jpg`
- `public/assets/categories/wedding-cards.jpg`
- `public/assets/products/mementos/*`
- `public/assets/products/wedding-cards/*`

To change the logo, upload a new file in the admin settings or replace `public/assets/brand/logo.png`.

## Deployment

### GitHub

```bash
git init
git add .
git commit -m "Initial Design Point storefront"
git branch -M main
git remote add origin https://github.com/your-user/your-repo.git
git push -u origin main
```

### Vercel

1. Import the GitHub repository in Vercel.
2. Add the environment variables from `.env.example`.
3. Build command: `pnpm build`
4. Output directory: `dist`

## Production Notes

- Connect admin CRUD actions to Supabase mutations for live persistence.
- Upload category and product images to Supabase Storage.
- Enforce a maximum of 5 product images in the product form and database workflow.
- Keep only one admin account unless the business needs roles later.
- Update SEO fields in `site_settings` before launch.
