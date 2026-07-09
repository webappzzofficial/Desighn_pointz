import { LockKeyhole } from "lucide-react";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo";
import { hasSupabaseConfig, supabase } from "../../lib/supabase";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@designpoint.example");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    if (hasSupabaseConfig && supabase) {
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (authError) {
        setError(authError.message);
        return;
      }
    } else {
      await new Promise((resolve) => setTimeout(resolve, 350));
      setLoading(false);
    }

    localStorage.setItem("design-point-admin", "true");
    navigate("/admin");
  };

  return (
    <section className="grid min-h-screen place-items-center bg-porcelain px-4 py-10">
      <form onSubmit={onSubmit} className="w-full max-w-md rounded-lg bg-white p-6 shadow-premium">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <div className="mb-6 text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-ocean/10 text-ocean">
            <LockKeyhole size={22} />
          </div>
          <h1 className="mt-4 text-2xl font-black text-ink">Admin Login</h1>
          <p className="mt-2 text-sm text-slate-600">Use Supabase Auth in production. Demo mode accepts any password.</p>
        </div>
        <label className="label">
          Email
          <input className="field mt-2" value={email} onChange={(event) => setEmail(event.target.value)} type="email" required />
        </label>
        <label className="label mt-4">
          Password
          <input className="field mt-2" value={password} onChange={(event) => setPassword(event.target.value)} type="password" required />
        </label>
        {error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}
        <button className="primary-button mt-6 w-full justify-center py-3" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
    </section>
  );
}
