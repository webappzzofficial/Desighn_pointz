import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="section grid min-h-[60vh] place-items-center text-center">
      <div>
        <p className="text-sm font-black uppercase tracking-[0.18em] text-champagne">404</p>
        <h1 className="mt-3 text-4xl font-black text-ink">Page not found</h1>
        <p className="mt-3 text-slate-600">The page you are looking for is unavailable.</p>
        <Link to="/" className="primary-button mt-8 justify-center">
          Return Home
        </Link>
      </div>
    </section>
  );
}
