import { MessageCircle } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import ImageGallery from "../../components/ImageGallery";
import ProductCard from "../../components/ProductCard";
import { categories, products, siteSettings } from "../../data/seed";
import { formatPrice, productWhatsAppUrl } from "../../lib/whatsapp";

export default function ProductDetailsPage() {
  const { slug } = useParams();
  const product = products.find((item) => item.slug === slug);

  if (!product) return <Navigate to="/404" replace />;

  const category = categories.find((item) => item.id === product.categoryId)!;
  const related = products.filter((item) => item.categoryId === product.categoryId && item.id !== product.id).slice(0, 3);

  return (
    <section className="section">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
        <ImageGallery images={product.images} name={product.name} />
        <div>
          <Link to={`/categories/${category.slug}`} className="text-sm font-black uppercase tracking-[0.18em] text-champagne">
            {category.name}
          </Link>
          <h1 className="mt-4 text-4xl font-black text-ink">{product.name}</h1>
          <p className="mt-5 text-3xl font-black text-ocean-deep">{formatPrice(product.price)}</p>
          <p className="mt-6 text-lg leading-8 text-slate-600">{product.description}</p>
          <a href={productWhatsAppUrl(product, category, siteSettings)} className="primary-button mt-8 w-full justify-center bg-sage py-4 text-base hover:bg-emerald-700 sm:w-auto">
            <MessageCircle size={20} />
            Order on WhatsApp
          </a>
          <div className="mt-8 rounded-lg bg-porcelain p-5">
            <h2 className="font-bold text-ink">Product enquiry includes</h2>
            <ul className="mt-3 grid gap-2 text-sm text-slate-600">
              <li>Product name, category, and price in the WhatsApp message.</li>
              <li>Admin-editable WhatsApp number from website settings.</li>
              <li>No online payment flow or customer login required.</li>
            </ul>
          </div>
        </div>
      </div>
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-black text-ink">Related Products</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} category={category} settings={siteSettings} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
