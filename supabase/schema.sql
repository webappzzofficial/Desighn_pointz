create extension if not exists pgcrypto;

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  image_url text not null,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.categories(id) on delete set null,
  name text not null,
  slug text not null unique,
  description text not null default '',
  short_description text not null default '',
  price numeric(12,2),
  is_active boolean not null default true,
  is_featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  image_url text not null,
  is_primary boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.products
  alter column description set default '',
  add column if not exists short_description text not null default '',
  alter column price drop not null,
  add column if not exists is_featured boolean not null default false;

create unique index if not exists product_images_product_id_image_url_key
on public.product_images(product_id, image_url);

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  business_name text not null,
  logo_url text not null,
  whatsapp_number text not null,
  phone text,
  email text,
  address text,
  facebook text,
  instagram text,
  youtube text,
  footer_copyright text,
  meta_title text,
  meta_description text,
  meta_keywords text,
  og_title text,
  og_description text,
  og_image text,
  canonical_url text,
  robots text default 'index, follow',
  favicon text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_categories_updated_at on public.categories;
create trigger set_categories_updated_at
before update on public.categories
for each row execute procedure public.set_updated_at();

drop trigger if exists set_products_updated_at on public.products;
create trigger set_products_updated_at
before update on public.products
for each row execute procedure public.set_updated_at();

drop trigger if exists set_site_settings_updated_at on public.site_settings;
create trigger set_site_settings_updated_at
before update on public.site_settings
for each row execute procedure public.set_updated_at();

alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.site_settings enable row level security;

create policy "Public read active categories"
on public.categories for select
using (is_active = true);

create policy "Public read active products"
on public.products for select
using (is_active = true);

create policy "Public read product images for active products"
on public.product_images for select
using (
  exists (
    select 1 from public.products
    where products.id = product_images.product_id
      and products.is_active = true
  )
);

create policy "Public read site settings"
on public.site_settings for select
using (true);

create policy "Admin manage categories"
on public.categories for all
to authenticated
using (true)
with check (true);

create policy "Admin manage products"
on public.products for all
to authenticated
using (true)
with check (true);

create policy "Admin manage product images"
on public.product_images for all
to authenticated
using (true)
with check (true);

create policy "Admin manage site settings"
on public.site_settings for all
to authenticated
using (true)
with check (true);

insert into storage.buckets (id, name, public)
values
  ('logo', 'logo', true),
  ('categories', 'categories', true),
  ('products', 'products', true)
on conflict (id) do nothing;

create policy "Public read logo storage"
on storage.objects for select
using (bucket_id in ('logo', 'categories', 'products'));

create policy "Admin manage product storage"
on storage.objects for all
to authenticated
using (bucket_id in ('logo', 'categories', 'products'))
with check (bucket_id in ('logo', 'categories', 'products'));
