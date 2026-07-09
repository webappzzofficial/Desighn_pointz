import { Save } from "lucide-react";
import { useState } from "react";
import { getLocalSettings, saveLocalSettings } from "../../lib/localCms";

export default function SettingsAdminPage() {
  const [settings, setSettings] = useState(getLocalSettings);

  const update = (key: string, value: string) => {
    const next = { ...settings, [key]: value };
    setSettings(next);
    saveLocalSettings(next);
  };

  return (
    <section className="admin-section">
      <h1 className="admin-title">Website Settings</h1>
      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <div className="rounded-lg bg-white p-5 shadow-sm">
          <h2 className="text-lg font-black text-ink">Business Details</h2>
          <div className="mt-5 grid gap-4">
            {["businessName", "logoUrl", "whatsappNumber", "phone", "email", "address", "facebook", "instagram", "youtube", "footerCopyright"].map((key) => (
              <label key={key} className="label">
                {key}
                <input className="field mt-2" value={String(settings[key as keyof typeof settings])} onChange={(event) => update(key, event.target.value)} />
              </label>
            ))}
          </div>
        </div>
        <div className="rounded-lg bg-white p-5 shadow-sm">
          <h2 className="text-lg font-black text-ink">SEO Settings</h2>
          <div className="mt-5 grid gap-4">
            {["metaTitle", "metaDescription", "metaKeywords", "ogTitle", "ogDescription", "ogImage", "canonicalUrl", "robots", "favicon"].map((key) => (
              <label key={key} className="label">
                {key}
                <input className="field mt-2" value={String(settings[key as keyof typeof settings])} onChange={(event) => update(key, event.target.value)} />
              </label>
            ))}
          </div>
        </div>
      </div>
      <button className="primary-button mt-6">
        <Save size={18} />
        Saved Locally
      </button>
    </section>
  );
}
