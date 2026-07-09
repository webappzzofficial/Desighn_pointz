import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import SectionTitle from "../../components/SectionTitle";
import { siteSettings } from "../../data/seed";
import { generalWhatsAppUrl } from "../../lib/whatsapp";

export default function ContactPage() {
  return (
    <section className="section">
      <SectionTitle
        eyebrow="Contact"
        title="Send a product enquiry or request a quote."
        text="The WhatsApp number, email, phone, address, and social links are editable in the admin settings."
      />
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <a href={generalWhatsAppUrl(siteSettings)} className="contact-tile">
          <MessageCircle size={24} />
          <span>WhatsApp</span>
          <strong>{siteSettings.whatsappNumber}</strong>
        </a>
        <a href={`tel:${siteSettings.phone}`} className="contact-tile">
          <Phone size={24} />
          <span>Phone</span>
          <strong>{siteSettings.phone}</strong>
        </a>
        <a href={`mailto:${siteSettings.email}`} className="contact-tile">
          <Mail size={24} />
          <span>Email</span>
          <strong>{siteSettings.email}</strong>
        </a>
      </div>
      <div className="mt-6 rounded-lg bg-porcelain p-6">
        <div className="flex items-start gap-3 text-slate-700">
          <MapPin className="mt-1 text-ocean" />
          <p>{siteSettings.address}</p>
        </div>
      </div>
    </section>
  );
}
