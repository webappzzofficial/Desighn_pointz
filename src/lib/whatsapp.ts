import type { Category, Product, SiteSettings } from "../types/catalog";

export function formatPrice(price: number | null) {
  if (!price) return "Price on request";
  return `INR ${price.toLocaleString("en-IN")}`;
}

export function productWhatsAppUrl(product: Product, category: Category, settings: SiteSettings) {
  const whatsappNumber = settings.whatsappNumber.replace(/\D/g, "");
  const message = [
    "Hi,",
    "",
    "I am interested in this product.",
    "",
    `Product: ${product.name}`,
    `Category: ${category.name}`,
    `Price: ${formatPrice(product.price)}`,
    "",
    "Please share more details."
  ].join("\n");

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function generalWhatsAppUrl(settings: SiteSettings) {
  const whatsappNumber = settings.whatsappNumber.replace(/\D/g, "");
  const message = `Hi, I would like to know more about ${settings.businessName} products.`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
