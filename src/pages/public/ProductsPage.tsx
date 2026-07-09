import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import SectionTitle from "../../components/SectionTitle";
import { categories, products, siteSettings } from "../../data/seed";

export default function ProductsPage() {
  const { slug } = useParams();
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(slug ?? "all");

  const visibleProducts = useMemo(() => {
    return products.filter((product) => {
      const category = categories.find((item) => item.id === product.categoryId);
      const matchesCategory = categoryFilter === "all" || category?.slug === categoryFilter;
      const matchesQuery = `${product.name} ${product.shortDescription}`.toLowerCase().includes(query.toLowerCase());
      return product.isActive && matchesCategory && matchesQuery;
    });
  }, [categoryFilter, query]);

  return (
    <section className="section">
      <SectionTitle
        eyebrow="Products"
        title="Browse products and enquire through WhatsApp."
        text="No payment gateway is included. Every product routes to a WhatsApp enquiry message with its details."
      />
      <div className="mt-8 flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm md:flex-row">
        <label className="relative flex-1">
          <span className="sr-only">Search products</span>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="field pl-10"
            placeholder="Search products"
          />
        </label>
        <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)} className="field md:max-w-xs">
          <option value="all">All categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      {visibleProducts.length === 0 ? (
        <div className="mt-10 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
          <h2 className="text-xl font-bold text-ink">No products found</h2>
          <p className="mt-2 text-slate-600">Try another search or category.</p>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProducts.map((product) => {
            const category = categories.find((item) => item.id === product.categoryId)!;
            return <ProductCard key={product.id} product={product} category={category} settings={siteSettings} />;
          })}
        </div>
      )}
    </section>
  );
}
