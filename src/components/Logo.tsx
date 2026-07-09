import { siteSettings } from "../data/seed";

type LogoProps = {
  compact?: boolean;
  light?: boolean;
};

export default function Logo({ compact = false, light = false }: LogoProps) {
  return (
    <a href="/" className="flex items-center gap-3" aria-label="Design Point home">
      <img
        src={siteSettings.logoUrl}
        alt="Design Point Advertising & Printing"
        className={compact ? "h-9 w-auto" : "h-11 w-auto"}
      />
      {!compact && (
        <span className={light ? "sr-only" : "sr-only"}>Design Point Advertising & Printing</span>
      )}
    </a>
  );
}
