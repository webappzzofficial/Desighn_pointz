import { Plus, Save, Trash2 } from "lucide-react";
import { useState } from "react";
import { getLocalCategories, saveLocalCategories } from "../../lib/localCms";

export default function CategoriesAdminPage() {
  const [items, setItems] = useState(getLocalCategories);

  const update = (id: string, key: string, value: string | number | boolean) => {
    const next = items.map((item) => (item.id === id ? { ...item, [key]: value } : item));
    setItems(next);
    saveLocalCategories(next);
  };

  return (
    <section className="admin-section">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="admin-title">Categories</h1>
        <button
          className="primary-button justify-center"
          onClick={() => {
            const next = [
              ...items,
              {
                id: `category-${Date.now()}`,
                name: "New Category",
                slug: `new-category-${Date.now()}`,
                imageUrl: "/assets/categories/gift-items.jpg",
                isActive: true,
                sortOrder: items.length + 1,
                description: "New category description"
              }
            ];
            setItems(next);
            saveLocalCategories(next);
          }}
        >
          <Plus size={18} />
          Add Category
        </button>
      </div>
      <div className="mt-6 grid gap-4">
        {items.map((category) => (
          <div key={category.id} className="rounded-lg bg-white p-4 shadow-sm">
            <div className="grid gap-4 lg:grid-cols-[160px_1fr_auto] lg:items-center">
              <img src={category.imageUrl} alt={category.name} className="aspect-[4/3] w-full rounded-lg object-cover" />
              <div className="grid gap-3 md:grid-cols-2">
                <label className="label">
                  Name
                  <input className="field mt-2" value={category.name} onChange={(event) => update(category.id, "name", event.target.value)} />
                </label>
                <label className="label">
                  Display order
                  <input className="field mt-2" type="number" value={category.sortOrder} onChange={(event) => update(category.id, "sortOrder", Number(event.target.value))} />
                </label>
                <label className="label md:col-span-2">
                  Image URL
                  <input className="field mt-2" value={category.imageUrl} onChange={(event) => update(category.id, "imageUrl", event.target.value)} />
                </label>
                <label className="flex items-center gap-3 text-sm font-bold text-slate-700">
                  <input type="checkbox" checked={category.isActive} onChange={(event) => update(category.id, "isActive", event.target.checked)} />
                  Active
                </label>
              </div>
              <div className="flex gap-2">
                <button className="icon-button" aria-label="Save category">
                  <Save size={18} />
                </button>
                <button
                  className="icon-button text-red-600"
                  aria-label="Delete category"
                  onClick={() => {
                    if (!confirm("Delete this category?")) return;
                    const next = items.filter((item) => item.id !== category.id);
                    setItems(next);
                    saveLocalCategories(next);
                  }}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
