import type { Category, Product, SiteSettings } from "../types/catalog";
import { importedProducts } from "./importedProducts";

export const categories: Category[] = [
  {
    id: "gift-items",
    name: "Gift Items",
    slug: "gift-items",
    imageUrl: "/assets/categories/gift-items.jpg",
    isActive: true,
    sortOrder: 1,
    description: "Corporate gifts, custom mugs, apparel, frames, and branded keepsakes."
  },
  {
    id: "id-cards",
    name: "ID Cards",
    slug: "id-cards",
    imageUrl: "/assets/categories/id-cards.jpg",
    isActive: true,
    sortOrder: 2,
    description: "ID cards, lanyards, holders, hooks, and access-ready card accessories."
  },
  {
    id: "mementos-trophies",
    name: "Mementos & Trophies",
    slug: "mementos-trophies",
    imageUrl: "/assets/categories/mementos-trophy.jpg",
    isActive: true,
    sortOrder: 3,
    description: "Elegant trophies, plaques, shields, and award mementos for every event."
  },
  {
    id: "wedding-cards",
    name: "Wedding Cards",
    slug: "wedding-cards",
    imageUrl: "/assets/categories/wedding-cards.jpg",
    isActive: true,
    sortOrder: 4,
    description: "Premium and standard invitations with floral, classic, luxury, and custom print finishes."
  }
];

const productImage = (productId: string, category: string, primary = true, order = 1) => ({
  id: `${productId}-${order}`,
  productId,
  imageUrl: `/assets/categories/${category}.jpg`,
  isPrimary: primary,
  sortOrder: order
});

const productGallery = (productId: string, paths: string[]) =>
  paths.slice(0, 5).map((imageUrl, index) => ({
    id: `${productId}-${index + 1}`,
    productId,
    imageUrl,
    isPrimary: index === 0,
    sortOrder: index + 1
  }));

const starterProducts: Product[] = [
  {
    id: "custom-corporate-gifts",
    categoryId: "gift-items",
    name: "Custom Corporate Gift Set",
    slug: "custom-corporate-gifts",
    description:
      "A premium and standard branded gift bundle for teams, launches, conferences, and client appreciation. Includes print-ready personalization and finish consultation.",
    shortDescription: "Branded mugs, pens, apparel, and keepsakes for corporate gifting.",
    price: 799,
    isActive: true,
    isFeatured: true,
    createdAt: "2026-07-01",
    images: [productImage("custom-corporate-gifts", "gift-items")]
  },
  {
    id: "event-id-card-kit",
    categoryId: "id-cards",
    name: "Event ID Card Kit",
    slug: "event-id-card-kit",
    description:
      "Complete ID solution with card design, lamination, holder selection, lanyard color options, and QR-ready layout support.",
    shortDescription: "Cards, lanyards, hooks, and holders for events or offices.",
    price: 120,
    isActive: true,
    isFeatured: true,
    createdAt: "2026-07-02",
    images: [productImage("event-id-card-kit", "id-cards")]
  },
  {
    id: "executive-award-plaque",
    categoryId: "mementos-trophies",
    name: "Executive Award Plaque",
    slug: "executive-award-plaque",
    description:
      "A polished trophy and plaque range for schools, businesses, tournaments, and recognition programs with custom name plate printing.",
    shortDescription: "Premium and standard plaques, trophies, shields, and acrylic awards.",
    price: 1499,
    isActive: true,
    isFeatured: true,
    createdAt: "2026-07-03",
    images: productGallery("executive-award-plaque", [
      "/assets/products/mementos/dpm-01.jpg",
      "/assets/products/mementos/dpm-02.jpg",
      "/assets/products/mementos/dpm-03.jpg",
      "/assets/products/mementos/dpm-04.jpg",
      "/assets/products/mementos/dpm-05.jpg"
    ])
  },
  {
    id: "floral-wedding-invite",
    categoryId: "wedding-cards",
    name: "Floral Wedding Invitation Suite",
    slug: "floral-wedding-invite",
    description:
      "A refined invitation suite with envelope, insert card, floral theme, and optional premium and standard print finish.",
    shortDescription: "Elegant wedding cards with envelopes, inserts, and custom text.",
    price: 65,
    isActive: true,
    isFeatured: false,
    createdAt: "2026-07-04",
    images: productGallery("floral-wedding-invite", [
      "/assets/products/wedding-cards/dpw-119.jpg",
      "/assets/products/wedding-cards/dpw-13.jpg",
      "/assets/products/wedding-cards/dpw-26.jpg",
      "/assets/products/wedding-cards/dpw-57.jpg",
      "/assets/products/wedding-cards/dpw-64.jpg"
    ])
  },
  {
    id: "branded-apparel-printing",
    categoryId: "gift-items",
    name: "Branded Apparel Printing",
    slug: "branded-apparel-printing",
    description:
      "Custom T-shirts, caps, and team apparel with logo placement, color consultation, and print-ready proofing.",
    shortDescription: "Custom apparel and caps for teams, events, and promotions.",
    price: 399,
    isActive: true,
    isFeatured: false,
    createdAt: "2026-07-05",
    images: [productImage("branded-apparel-printing", "gift-items")]
  },
  {
    id: "luxury-invitation-box",
    categoryId: "wedding-cards",
    name: "Luxury Invitation Box",
    slug: "luxury-invitation-box",
    description:
      "A premium and standard invitation presentation format for special events, with layered inserts and custom packaging choices.",
    shortDescription: "High-end invitation box concepts for premium and standard ceremonies.",
    price: 220,
    isActive: true,
    isFeatured: true,
    createdAt: "2026-07-06",
    images: productGallery("luxury-invitation-box", [
      "/assets/products/wedding-cards/dpw-64.jpg",
      "/assets/products/wedding-cards/dpw-57.jpg",
      "/assets/products/wedding-cards/dpw-26.jpg",
      "/assets/products/wedding-cards/dpw-13.jpg",
      "/assets/products/wedding-cards/dpw-119.jpg"
    ])
  }
];

const importedSlugs = new Set(importedProducts.map((product) => product.slug));

export const products: Product[] = [
  ...starterProducts.filter((product) => !importedSlugs.has(product.slug)),
  ...importedProducts
];

export const siteSettings: SiteSettings = {
  businessName: "Design Point",
  tagline: "Advertising & Printing",
  logoUrl: "/assets/brand/logo.png",
  whatsappNumber: "+91 9567094491",
  phone: "+91 9567094491",
  email: "shibilmulakkal@gmail.com",
  address: "Design Point Studio, Kerala, India",
  facebook: "https://facebook.com/",
  instagram: "https://instagram.com/",
  youtube: "https://youtube.com/",
  footerCopyright: "© 2026 Design Point Advertising & Printing. All rights reserved.",
  metaTitle: "Design Point Advertising & Printing",
  metaDescription: "Premium and standard printing, gifting, ID cards, mementos, trophies, and wedding cards.",
  metaKeywords: "printing, gifts, id cards, trophies, wedding cards",
  ogTitle: "Design Point Product Showcase",
  ogDescription: "Explore premium and standard print and gifting products and enquire on WhatsApp.",
  ogImage: "/assets/brand/logo.png",
  canonicalUrl: "https://designpoint.example",
  robots: "index, follow",
  favicon: "/favicon.png"
};
