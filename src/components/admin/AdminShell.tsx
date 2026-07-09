import { BarChart3, Boxes, FolderKanban, LogOut, Settings, UserCircle } from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Logo from "../Logo";

const adminLinks = [
  { to: "/admin", label: "Dashboard", icon: BarChart3 },
  { to: "/admin/categories", label: "Categories", icon: FolderKanban },
  { to: "/admin/products", label: "Products", icon: Boxes },
  { to: "/admin/settings", label: "Settings", icon: Settings },
  { to: "/admin/profile", label: "Profile", icon: UserCircle }
];

export default function AdminShell() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-slate-200 bg-white p-5 lg:block">
        <div className="rounded-lg border border-slate-200 p-3">
          <Logo />
        </div>
        <nav className="mt-8 grid gap-2">
          {adminLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                end={link.to === "/admin"}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-bold transition ${
                    isActive ? "bg-ocean text-white" : "text-slate-700 hover:bg-slate-100"
                  }`
                }
              >
                <Icon size={19} />
                {link.label}
              </NavLink>
            );
          })}
        </nav>
        <button
          className="secondary-button absolute bottom-5 left-5 right-5 justify-center"
          onClick={() => {
            localStorage.removeItem("design-point-admin");
            navigate("/admin/login");
          }}
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>
      <main className="lg:pl-72">
        <div className="border-b border-slate-200 bg-white px-4 py-4 lg:hidden">
          <Logo />
        </div>
        <Outlet />
      </main>
    </div>
  );
}
