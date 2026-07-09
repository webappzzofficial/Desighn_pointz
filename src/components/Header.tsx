import { Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/categories", label: "Categories" },
  { to: "/products", label: "Products" },
  { to: "/contact", label: "Contact" }
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive ? "bg-ocean text-white" : "text-slate-700 hover:bg-slate-100"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <NavLink to="/products" className="icon-button" aria-label="Search products">
            <Search size={18} />
          </NavLink>
        </div>
        <button className="icon-button lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu size={22} />
        </button>
      </div>
      {open && (
        <div className="fixed inset-0 z-50 bg-ink/40 lg:hidden" onClick={() => setOpen(false)}>
          <div
            className="ml-auto h-full w-[min(360px,88vw)] bg-white p-5 shadow-premium"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <Logo compact />
              <button className="icon-button" onClick={() => setOpen(false)} aria-label="Close menu">
                <X size={20} />
              </button>
            </div>
            <nav className="mt-8 grid gap-2">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 font-semibold text-slate-800 hover:bg-slate-100"
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
