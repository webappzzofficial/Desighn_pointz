import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Category } from "../types/catalog";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link to={`/categories/${category.slug}`} className="group block overflow-hidden rounded-lg bg-white shadow-premium">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={category.imageUrl}
          alt={category.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/82 via-ink/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-xl font-bold">{category.name}</h3>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-white/18 backdrop-blur">
              <ArrowUpRight size={19} />
            </span>
          </div>
          <p className="mt-2 line-clamp-2 text-sm text-white/82">{category.description}</p>
        </div>
      </div>
    </Link>
  );
}
