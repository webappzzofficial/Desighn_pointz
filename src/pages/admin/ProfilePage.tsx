import { hasSupabaseConfig } from "../../lib/supabase";

export default function ProfilePage() {
  return (
    <section className="admin-section">
      <h1 className="admin-title">Profile</h1>
      <div className="mt-6 rounded-lg bg-white p-6 shadow-sm">
        <h2 className="text-lg font-black text-ink">Single Admin Account</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
          Production authentication is designed for one Supabase Auth admin account. Current mode: {hasSupabaseConfig ? "Supabase connected" : "local demo"}.
        </p>
      </div>
    </section>
  );
}
