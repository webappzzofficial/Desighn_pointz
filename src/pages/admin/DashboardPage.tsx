import { Boxes, EyeOff, FolderKanban, PackageCheck } from "lucide-react";
import StatCard from "../../components/admin/StatCard";
import { categories, products } from "../../data/seed";
import { formatPrice } from "../../lib/whatsapp";

export default function DashboardPage() {
  const activeProducts = products.filter((product) => product.isActive);
  const inactiveProducts = products.filter((product) => !product.isActive);

  return (
    <section className="admin-section">
      <h1 className="admin-title">Dashboard</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Categories" value={categories.length} icon={FolderKanban} />
        <StatCard label="Total Products" value={products.length} icon={Boxes} tone="gold" />
        <StatCard label="Active Products" value={activeProducts.length} icon={PackageCheck} tone="green" />
        <StatCard label="Inactive Products" value={inactiveProducts.length} icon={EyeOff} />
      </div>
      <div className="mt-8 rounded-lg bg-white p-5 shadow-sm">
        <h2 className="text-lg font-black text-ink">Recent Products</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Status</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {products.slice(0, 5).map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{formatPrice(product.price)}</td>
                  <td>{product.isActive ? "Active" : "Inactive"}</td>
                  <td>{product.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
