import { Linkedin, ArrowRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/lib/translations";

export default function Hero() {
  const { lang } = useLanguage();
  const t = translations[lang];

  const highlights =
    lang === "es"
      ? [
          { label: "Full Stack", value: "Apps + APIs" },
          { label: "E-commerce", value: "Shop + pagos" },
          { label: "Productos", value: "UX + estrategia" },
          { label: "IA & Cloud", value: "Automatización" },
        ]
      : [
          { label: "Full Stack", value: "Apps + APIs" },
          { label: "E-commerce", value: "Shop + payments" },
          { label: "Products", value: "UX + strategy" },
          { label: "AI & Cloud", value: "Automation" },
        ];

  return (
    <section id="top" className="relative min-h-screen flex items-center justify-center overflow-hidden w-full hero-tablet-short">
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="hero-mesh absolute inset-0" />
        <div className="hero-grid absolute inset-0" />
      </div>

      <div
        className="hero-noise-light dark:hidden absolute inset-0 pointer-events-none opacity-[0.7]"
        aria-hidden="true"
      />
      <div
        className="hero-noise-dark hidden dark:block absolute inset-0 pointer-events-none opacity-[0.5]"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 md:px-6 pt-20 relative z-30">
        <div className="max-w-5xl mx-auto hero-frame relative p-10 md:p-14 lg:p-16 text-center">
          <div className="hero-frame-corners absolute inset-2 rounded-[1.6rem] md:rounded-[2.1rem] pointer-events-none" aria-hidden="true" />

          <div className="mb-1 relative">
            <h1 className="scroll-m-20 text-5xl font-heading font-semibold lg:text-7xl text-balance max-w-screen-lg text-metallic inline-block leading-[1.05] tracking-wide">
              {t.hero.heading}
            </h1>
          </div>

          <div className="mb-8 relative flex items-center justify-center py-2">
            <div className="text-lg md:text-xl font-mono leading-relaxed tracking-wide">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-500 to-orange-600 dark:from-red-400 dark:via-rose-400 dark:to-orange-400 font-semibold">
                {t.hero.subtitle}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6 relative">
            <a
              href="#projects"
              className="group/btn bg-foreground text-background hover:opacity-85 font-bold px-6 py-3 rounded-2xl text-sm inline-flex items-center justify-center gap-2 transition-all duration-300 ease-out cursor-pointer"
            >
              {t.hero.viewProjects}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover/btn:translate-x-1" />
            </a>
            <a
              href="https://www.linkedin.com/in/hernan-josé-mendoza-ibáñez-229332212/"
              target="_blank"
              rel="noopener noreferrer"
              className="group/linkedin glass hover:bg-foreground/5 text-foreground font-bold px-6 py-3 rounded-2xl text-sm inline-flex items-center justify-center transition-all duration-300 ease-out gap-2 border border-border/50 hover:border-foreground/30 cursor-pointer"
            >
              <Linkedin className="w-4 h-4 transition-transform duration-300 ease-out group-hover/linkedin:scale-110" />
              {t.hero.connectLinkedIn}
            </a>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="rounded-[1.4rem] border border-border/50 bg-gradient-to-br from-foreground/[0.04] to-transparent px-4 py-3.5 text-left shadow-[0_10px_24px_rgba(15,23,42,0.04)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/20"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/80">
                  {item.label}
                </p>
                <p className="mt-2 text-sm font-semibold text-foreground/90">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/35 to-transparent pointer-events-none z-20" />
    </section>
  );
}