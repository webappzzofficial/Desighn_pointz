import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { siteSettings } from "../data/seed";
import { generalWhatsAppUrl } from "../lib/whatsapp";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <div className="rounded-lg bg-white p-3 inline-flex">
            <Logo compact />
          </div>
          <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">
            Premium advertising and printing solutions for gifting, identity, awards, and invitations.
          </p>
          <div className="mt-5 flex gap-3">
            <a className="footer-icon" href={siteSettings.facebook} aria-label="Facebook">
              <Facebook size={18} />
            </a>
            <a className="footer-icon" href={siteSettings.instagram} aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a className="footer-icon" href={siteSettings.youtube} aria-label="YouTube">
              <Youtube size={18} />
            </a>
          </div>
        </div>
        <div>
          <h2 className="footer-heading">Explore</h2>
          <div className="mt-4 grid gap-3 text-sm text-slate-300">
            <a href="/categories">Categories</a>
            <a href="/products">Products</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
          </div>
        </div>
        <div>
          <h2 className="footer-heading">Contact</h2>
          <div className="mt-4 grid gap-3 text-sm text-slate-300">
            <span className="flex items-start gap-2">
              <MapPin size={18} className="mt-0.5 text-champagne" />
              {siteSettings.address}
            </span>
            <a className="flex items-center gap-2" href={`tel:${siteSettings.phone}`}>
              <Phone size={18} className="text-champagne" />
              {siteSettings.phone}
            </a>
            <a className="flex items-center gap-2" href={`mailto:${siteSettings.email}`}>
              <Mail size={18} className="text-champagne" />
              {siteSettings.email}
            </a>
            <a href={generalWhatsAppUrl(siteSettings)} className="primary-button mt-2 justify-center bg-sage hover:bg-emerald-700">
              WhatsApp Enquiry
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-slate-400">
        {siteSettings.footerCopyright}
      </div>
    </footer>
  );
}
