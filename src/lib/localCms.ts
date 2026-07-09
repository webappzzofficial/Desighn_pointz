import { categories, products, siteSettings } from "../data/seed";
import type { Category, Product, SiteSettings } from "../types/catalog";

const keys = {
  categories: "design-point-categories",
  products: "design-point-products",
  settings: "design-point-settings"
};

const read = <T,>(key: string, fallback: T): T => {
  const value = localStorage.getItem(key);
  return value ? (JSON.parse(value) as T) : fallback;
};

const write = <T,>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export function getLocalCategories() {
  return read<Category[]>(keys.categories, categories);
}

export function saveLocalCategories(value: Category[]) {
  write(keys.categories, value);
}

export function getLocalProducts() {
  return read<Product[]>(keys.products, products);
}

export function saveLocalProducts(value: Product[]) {
  write(keys.products, value);
}

export function getLocalSettings() {
  return read<SiteSettings>(keys.settings, siteSettings);
}

export function saveLocalSettings(value: SiteSettings) {
  write(keys.settings, value);
}
