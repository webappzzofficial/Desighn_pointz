import { Award, Clock, MessageCircle, PackageCheck, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { categories, products, siteSettings } from "../../data/seed";
import { generalWhatsAppUrl } from "../../lib/whatsapp";
import CategoryCard from "../../components/CategoryCard";
import ProductCard from "../../components/ProductCard";
import SectionTitle from "../../components/SectionTitle";

export default function HomePage() {
  const featured = products.filter((product) => product.isFeatured).slice(0, 4);
  const latest = [...products].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="absolute inset-0 opacity-20">
          <img src="/assets/categories/mementos-trophy.jpg" alt="" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/92 to-ocean-deep/82" />
        <div className="relative mx-auto grid min-h-[calc(100vh-76px)] max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white/88 backdrop-blur">
              <Sparkles size={17} />
              Premium Advertising & Printing
            </p>
            <h1 className="mt-6 text-balance text-4xl font-black leading-tight sm:text-6xl">
              Design Point
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-200">
              Explore curated gifts, ID cards, trophies, mementos, and wedding invitations. Choose a product and enquire instantly on WhatsApp.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/products" className="primary-button justify-center bg-white text-ink hover:bg-slate-100">
                View Products
              </Link>
              <a href={generalWhatsAppUrl(siteSettings)} className="primary-button justify-center bg-sage hover:bg-emerald-700">
                <MessageCircle size={18} />
                WhatsApp Enquiry
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 self-end pb-3">
            {categories.slice(0, 4).map((category) => (
              <Link key={category.id} to={`/categories/${category.slug}`} className="group overflow-hidden rounded-lg bg-white/10 p-2 backdrop-blur">
                <img src={category.imageUrl} alt={category.name} className="aspect-[4/3] w-full rounded-md object-cover transition duration-500 group-hover:scale-[1.03]" />
                <p className="px-2 py-3 text-sm font-bold">{category.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <SectionTitle
          eyebrow="Main categories"
          title="Four focused product lines, managed from the CMS."
          text="The storefront starts with fixed business categories and keeps every name, image, status, and order editable for the admin."
          align="center"
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      <section className="section bg-porcelain">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionTitle eyebrow="Featured products" title="Ready-to-enquire product highlights." />
          <Link to="/products" className="secondary-button self-start md:self-auto">
            Browse All Products
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => {
            const category = categories.find((item) => item.id === product.categoryId)!;
            return <ProductCard key={product.id} product={product} category={category} settings={siteSettings} />;
          })}
        </div>
      </section>

      <section className="section">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionTitle
            eyebrow="Why choose us"
            title="Premium print consultation with fast WhatsApp response."
            text="Every enquiry can move from product selection to design proof, quote, and production details through WhatsApp without adding checkout friction."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: PackageCheck, title: "Custom product support", text: "Category and product content can be extended without changing code." },
              { icon: Award, title: "Premium finishing", text: "Built for gifting, awards, invitations, and identity print workflows." },
              { icon: Clock, title: "Fast enquiries", text: "Every product opens WhatsApp with pre-filled product context." },
              { icon: ShieldCheck, title: "Secure admin", text: "Supabase Auth and RLS policies protect CMS updates." }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <Icon className="text-ocean" size={26} />
                  <h3 className="mt-4 font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section bg-ink text-white">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-champagne">Latest additions</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">Fresh product ideas for your next print order.</h2>
          </div>
          <div className="grid gap-3">
            {latest.map((product) => (
              <Link key={product.id} to={`/products/${product.slug}`} className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/8 p-4 transition hover:bg-white/14">
                <div>
                  <p className="font-bold">{product.name}</p>
                  <p className="mt-1 text-sm text-slate-300">{product.shortDescription}</p>
                </div>
                <Truck className="shrink-0 text-champagne" size={22} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
