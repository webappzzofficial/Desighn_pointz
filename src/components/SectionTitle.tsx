type SectionTitleProps = {
  eyebrow: string;
  title: string;
  text?: string;
  align?: "left" | "center";
};

export default function SectionTitle({ eyebrow, title, text, align = "left" }: SectionTitleProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="text-sm font-black uppercase tracking-[0.18em] text-champagne">{eyebrow}</p>
      <h2 className="mt-3 text-balance text-3xl font-black text-ink sm:text-4xl">{title}</h2>
      {text && <p className="mt-4 text-pretty text-base leading-7 text-slate-600">{text}</p>}
    </div>
  );
}
