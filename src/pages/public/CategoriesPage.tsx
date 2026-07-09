import CategoryCard from "../../components/CategoryCard";
import SectionTitle from "../../components/SectionTitle";
import { categories } from "../../data/seed";

export default function CategoriesPage() {
  return (
    <section className="section">
      <SectionTitle
        eyebrow="Categories"
        title="Explore products by business line."
        text="Each category image, title, active state, and display order is prepared for admin management."
      />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}
