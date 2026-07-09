import { Eye, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { productWhatsAppUrl, formatPrice } from "../lib/whatsapp";
import type { Category, Product, SiteSettings } from "../types/catalog";

type ProductCardProps = {
  product: Product;
  category: Category;
  settings: SiteSettings;
};

export default function ProductCard({ product, category, settings }: ProductCardProps) {
  const primary = product.images.find((image) => image.isPrimary) ?? product.images[0];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-premium">
      <Link to={`/products/${product.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={primary.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-ocean shadow">
          {category.name}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-ink">{product.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{product.shortDescription}</p>
        <div className="mt-4 text-xl font-black text-ocean-deep">{formatPrice(product.price)}</div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <Link to={`/products/${product.slug}`} className="secondary-button justify-center">
            <Eye size={17} />
            Details
          </Link>
          <a href={productWhatsAppUrl(product, category, settings)} className="primary-button justify-center bg-sage hover:bg-emerald-700">
            <MessageCircle size={17} />
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
