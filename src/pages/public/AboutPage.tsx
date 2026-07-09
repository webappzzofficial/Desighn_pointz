import SectionTitle from "../../components/SectionTitle";

export default function AboutPage() {
  return (
    <section className="section">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <SectionTitle
          eyebrow="About"
          title="Design Point Advertising & Printing"
          text="A premium product showcase for print, gifting, identity, awards, and invitations. The public site is designed for discovery and WhatsApp-first enquiries while the admin dashboard keeps content editable."
        />
        <img src="/assets/brand/logo.png" alt="Design Point Advertising & Printing" className="w-full rounded-lg border border-slate-200 bg-white p-8 shadow-premium" />
      </div>
    </section>
  );
}
