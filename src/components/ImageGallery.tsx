import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useMemo, useState } from "react";
import type { ProductImage } from "../types/catalog";

export default function ImageGallery({ images, name }: { images: ProductImage[]; name: string }) {
  const ordered = useMemo(() => [...images].sort((a, b) => a.sortOrder - b.sortOrder), [images]);
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const active = ordered[index] ?? ordered[0];
  const next = () => setIndex((value) => (value + 1) % ordered.length);
  const previous = () => setIndex((value) => (value - 1 + ordered.length) % ordered.length);

  return (
    <div>
      <div
        className="relative overflow-hidden rounded-lg bg-slate-100 shadow-premium"
        onTouchStart={(event) => setTouchStart(event.touches[0].clientX)}
        onTouchEnd={(event) => {
          if (touchStart === null) return;
          const diff = touchStart - event.changedTouches[0].clientX;
          if (Math.abs(diff) > 40) diff > 0 ? next() : previous();
          setTouchStart(null);
        }}
      >
        <img src={active.imageUrl} alt={name} className="h-full min-h-[360px] w-full object-cover transition duration-500 hover:scale-105" />
        <button className="gallery-control left-4" onClick={previous} aria-label="Previous image">
          <ChevronLeft size={22} />
        </button>
        <button className="gallery-control right-4" onClick={next} aria-label="Next image">
          <ChevronRight size={22} />
        </button>
        <button className="absolute right-4 top-4 icon-button bg-white/90" onClick={() => setLightbox(true)} aria-label="Open preview">
          <Expand size={19} />
        </button>
      </div>
      <div className="mt-4 grid grid-cols-5 gap-3">
        {ordered.map((image, imageIndex) => (
          <button
            key={image.id}
            className={`aspect-square overflow-hidden rounded-lg border-2 bg-slate-100 ${
              imageIndex === index ? "border-ocean" : "border-transparent"
            }`}
            onClick={() => setIndex(imageIndex)}
            aria-label={`Show image ${imageIndex + 1}`}
          >
            <img src={image.imageUrl} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
      {lightbox && (
        <div className="fixed inset-0 z-[70] grid place-items-center bg-ink/88 p-4">
          <button className="absolute right-5 top-5 icon-button bg-white" onClick={() => setLightbox(false)} aria-label="Close preview">
            <X size={20} />
          </button>
          <button className="gallery-control left-5" onClick={previous} aria-label="Previous image">
            <ChevronLeft size={24} />
          </button>
          <img src={active.imageUrl} alt={name} className="max-h-[84vh] max-w-[92vw] rounded-lg object-contain shadow-premium" />
          <button className="gallery-control right-5" onClick={next} aria-label="Next image">
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
}
