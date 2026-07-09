import { ImagePlus, Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { getLocalCategories, getLocalProducts, saveLocalProducts } from "../../lib/localCms";

export default function ProductsAdminPage() {
  const [items, setItems] = useState(getLocalProducts);
  const categories = useMemo(getLocalCategories, []);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const visible = items.filter((product) => {
    const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === "all" || product.categoryId === filter;
    return matchesQuery && matchesFilter;
  });

  const updateProduct = (id: string, key: string, value: string | number | boolean | null) => {
    const next = items.map((item) => (item.id === id ? { ...item, [key]: value } : item));
    setItems(next);
    saveLocalProducts(next);
  };

  return (
    <section className="admin-section">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="admin-title">Products</h1>
        <button
          className="primary-button justify-center"
          onClick={() => {
            const now = Date.now();
            const product = {
              id: `product-${now}`,
              categoryId: categories[0].id,
              name: "New Product",
              slug: `new-product-${now}`,
              description: "Add product description.",
              shortDescription: "Short product description.",
              price: null,
              isActive: true,
              isFeatured: false,
              createdAt: new Date().toISOString().slice(0, 10),
              images: [
                {
                  id: `image-${now}`,
                  productId: `product-${now}`,
                  imageUrl: categories[0].imageUrl,
                  isPrimary: true,
                  sortOrder: 1
                }
              ]
            };
            const next = [product, ...items];
            setItems(next);
            saveLocalProducts(next);
          }}
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>
      <div className="mt-6 flex flex-col gap-3 rounded-lg bg-white p-4 shadow-sm md:flex-row">
        <input className="field" placeholder="Search products" value={query} onChange={(event) => setQuery(event.target.value)} />
        <select className="field md:max-w-xs" value={filter} onChange={(event) => setFilter(event.target.value)}>
          <option value="all">All categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-6 grid gap-4">
        {visible.map((product) => (
          <div key={product.id} className="rounded-lg bg-white p-4 shadow-sm">
            <div className="grid gap-4 xl:grid-cols-[180px_1fr_auto]">
              <div>
                <img src={product.images[0]?.imageUrl} alt={product.name} className="aspect-[4/3] w-full rounded-lg object-cover" />
                <button className="secondary-button mt-3 w-full justify-center">
                  <ImagePlus size={17} />
                  Upload
                </button>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <label className="label">
                  Name
                  <input className="field mt-2" value={product.name} onChange={(event) => updateProduct(product.id, "name", event.target.value)} />
                </label>
                <label className="label">
                  Price
                  <input
                    className="field mt-2"
                    type="number"
                    value={product.price ?? ""}
                    onChange={(event) => updateProduct(product.id, "price", event.target.value === "" ? null : Number(event.target.value))}
                  />
                </label>
                <label className="label">
                  Category
                  <select className="field mt-2" value={product.categoryId} onChange={(event) => updateProduct(product.id, "categoryId", event.target.value)}>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="label">
                  Status
                  <select className="field mt-2" value={String(product.isActive)} onChange={(event) => updateProduct(product.id, "isActive", event.target.value === "true")}>
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </label>
                <label className="label md:col-span-2">
                  Description
                  <textarea className="field mt-2 min-h-28" value={product.description} onChange={(event) => updateProduct(product.id, "description", event.target.value)} />
                </label>
              </div>
              <button
                className="icon-button text-red-600"
                aria-label="Delete product"
                onClick={() => {
                  if (!confirm("Delete this product?")) return;
                  const next = items.filter((item) => item.id !== product.id);
                  setItems(next);
                  saveLocalProducts(next);
                }}
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
