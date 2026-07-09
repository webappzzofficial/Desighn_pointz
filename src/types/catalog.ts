export type Category = {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  isActive: boolean;
  sortOrder: number;
  description: string;
};

export type ProductImage = {
  id: string;
  productId: string;
  imageUrl: string;
  isPrimary: boolean;
  sortOrder: number;
};

export type Product = {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
  images: ProductImage[];
};

export type SiteSettings = {
  businessName: string;
  tagline: string;
  logoUrl: string;
  whatsappNumber: string;
  phone: string;
  email: string;
  address: string;
  facebook: string;
  instagram: string;
  youtube: string;
  footerCopyright: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  canonicalUrl: string;
  robots: string;
  favicon: string;
};
