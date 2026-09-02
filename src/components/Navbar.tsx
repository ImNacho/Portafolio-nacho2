import { useState, useEffect, useRef } from "react";
import { Download, FileText, Moon, Sun, Menu, X, Github, Linkedin, Terminal, House, BriefcaseBusiness, Zap, UserRound, Mail } from "lucide-react";
import ContactModal from "./ContactModal";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/lib/translations";

export default function Navbar({ subPage = false }: { subPage?: boolean }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [theme, setTheme] = useState<"light" | "dark">("dark");
  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);

  const [contactOpen, setContactOpen] = useState(false);
  const { lang, toggleLang } = useLanguage();
  const t = translations[lang];
  const cvHrefEn = "/Hoja%20de%20VIDA%20(ENG)%20ING.pdf";

  const mobileNavLinks = [
    { href: subPage ? "/" : "#top",                sectionId: "top",           label: t.nav.home },
    { href: subPage ? "/#skills" : "#skills",     sectionId: "skills",        label: t.nav.trajectory },
    { href: subPage ? "/#projects" : "#projects", sectionId: "projects",      label: t.nav.projects },
    { href: subPage ? "/#optimizations" : "#optimizations", sectionId: "optimizations", label: t.nav.performance },
    { href: subPage ? "/#about" : "#about",       sectionId: "about",         label: t.nav.about },
    { href: subPage ? "/#comments" : "#comments", sectionId: "comments",      label: t.nav.comments },
    { href: subPage ? "/#contact" : "#contact",   sectionId: "contact",       label: t.nav.contact },
  ];

  const navigateHome = (sectionId: string) => {
    sessionStorage.setItem("skip-scroll-restore", "1");
    sessionStorage.setItem("scroll-to-section", sectionId);
    const a = document.createElement("a");
    a.href = sectionId === "top" ? "/" : "/#" + sectionId;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const scrollToSection = (sectionId: string) => {
    if (subPage) {
      navigateHome(sectionId);
    } else {
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(`#${sectionId}`, sectionId === "top" ? { immediate: true } : { duration: 1.2 });
      } else {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    }
    setMenuOpen(false);
  };

  const saveSectionAndClose = (sectionId: string) => {
    if (subPage) sessionStorage.setItem('scroll-to-section', sectionId);
    setMenuOpen(false);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    const root = document.documentElement;

    root.classList.add("theme-transitioning");

    if (newTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        root.classList.remove("theme-transitioning");
      });
    });

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>('.glass, .glow-card');
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--glow-x', `${((e.clientX - r.left) / r.width) * 100}%`);
      el.style.setProperty('--glow-y', `${((e.clientY - r.top) / r.height) * 100}%`);
    };
    document.addEventListener('mousemove', handler, { passive: true });
    return () => document.removeEventListener('mousemove', handler);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (menuOpen) return;
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen]);

  return (
    <>
      <header
        className="absolute left-0 right-0 top-0 z-50 transition-all duration-500 ease-out md:fixed"
      >
        <div className="w-full px-3 md:px-6 pt-0 md:pt-4">
          <div
            className={`mx-auto flex flex-row items-center justify-between px-3 md:px-5 py-2.5 md:py-3 rounded-2xl transition-all duration-300 ease-in-out ${
              isScrolled ? "max-w-6xl" : "max-w-full md:max-w-[88rem]"
            } ${
              menuOpen
                ? "bg-background/72 backdrop-blur-[4px] border border-border/45 shadow-sm"
                :
              isScrolled && !menuOpen
                ? "bg-background/80 backdrop-blur-md border border-border/50 shadow-sm"
                : "border border-transparent"
            }`}
          >

          <button className="flex items-center gap-3 group cursor-pointer" onClick={() => scrollToSection('top')}>
            <span className="hidden md:flex relative h-10 w-10 shrink-0 rounded-xl bg-foreground/10 items-center justify-center border border-foreground/[0.08]">
              <Terminal className="w-4 h-4 text-foreground" />
            </span>
            <div className="flex flex-col items-start">
              <span className="font-semibold text-base lg:text-xl text-foreground leading-tight whitespace-nowrap">Hernán Mendoza</span>
              <span className="text-xs text-muted-foreground font-medium leading-tight">Full Stack Software Engineer</span>
            </div>
          </button>

          <div className="inline-flex gap-2 items-center">
            <a
              href="/Hoja%20de%20VIDA%20(ENG)%20ING.pdf"
              download
              className="hidden md:flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all duration-300 ease-out border border-border/50 bg-transparent hover:bg-foreground/15 text-foreground h-9 rounded-md px-4"
            >
              <Download className="mr-2 w-4 h-4" />
              {t.nav.downloadCV}
            </a>
            <button
              type="button"
              onClick={() => { setMenuOpen(false); setContactOpen(true); }}
              className="hidden sm:inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all duration-300 ease-out bg-foreground text-background hover:opacity-90 hover:shadow-lg hover:shadow-foreground/25 h-8 rounded-md px-3 cursor-pointer"
            >
              {t.nav.contactBtn}
            </button>
            <button
              onClick={toggleLang}
              className="inline-flex items-center justify-center whitespace-nowrap text-xs font-bold transition-all duration-300 ease-out border border-border/50 bg-transparent hover:bg-foreground/15 text-foreground h-9 w-9 rounded-full cursor-pointer"
              type="button"
              aria-label="Toggle language"
              title={lang === "es" ? "Switch to English" : "Cambiar a Español"}
            >
              {t.nav.switchLang}
            </button>

            <button
              onClick={toggleTheme}
              className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all duration-300 ease-out border border-border/50 bg-transparent hover:bg-foreground/15 text-foreground h-9 w-9 rounded-full cursor-pointer group"
              type="button"
              aria-label="Toggle theme"
            >
              {theme === "dark"
                ? <Sun className="w-4 h-4 transition-transform duration-500 ease-out group-hover:rotate-45" />
                : <Moon className="w-4 h-4 transition-transform duration-500 ease-out group-hover:-rotate-12" />
              }
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all duration-300 ease-out border border-border/50 bg-transparent hover:bg-foreground/15 text-foreground h-9 w-9 rounded-md ml-1 relative z-50 cursor-pointer"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          </div>
        </div>
      </header>

      <nav
        aria-label={t.nav.navigation}
        className="fixed inset-x-3 bottom-3 z-50 flex items-center justify-around rounded-2xl border border-border/60 bg-background/85 px-2 py-2 shadow-[0_12px_35px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all duration-500 ease-out md:hidden"
      >
        {[
          { sectionId: "top", label: t.nav.home, Icon: House },
          { sectionId: "skills", label: t.nav.trajectory, Icon: Zap },
          { sectionId: "projects", label: t.nav.projects, Icon: BriefcaseBusiness },
          { sectionId: "about", label: t.nav.about, Icon: UserRound },
          { sectionId: "contact", label: t.nav.contact, Icon: Mail },
        ].map(({ sectionId, label, Icon }) => (
          <button
            key={sectionId}
            type="button"
            onClick={() => scrollToSection(sectionId)}
            className="group flex min-w-12 flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[10px] font-medium text-muted-foreground transition-all duration-300 hover:bg-foreground/10 hover:text-foreground active:scale-90"
            aria-label={label}
          >
            <Icon className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-[2px] z-[60] transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      <div
        className={`fixed inset-x-0 bottom-0 z-[70] mx-auto w-full max-w-none border-t border-border/60 bg-background/95 shadow-2xl backdrop-blur-md transition-transform duration-500 ease-in-out rounded-t-3xl lg:top-0 lg:right-0 lg:bottom-0 lg:left-auto lg:w-full lg:max-w-md lg:rounded-t-none lg:rounded-l-3xl lg:border-t-0 lg:border-l ${
          menuOpen ? "translate-y-0 lg:translate-x-0" : "translate-y-full lg:translate-y-0 lg:translate-x-full"
        }`}
      >
        <div className="flex h-auto max-h-[88vh] flex-col overflow-y-auto pl-7 pr-5 pb-6 pt-4 lg:h-full lg:max-h-none lg:pl-8 lg:pr-6 lg:pt-20 lg:pb-8">

          <div className="mx-auto mb-4 h-1.5 w-20 rounded-full bg-muted-foreground/35 lg:hidden" />

          <nav aria-label={t.nav.navigation} className="mb-8 flex flex-col gap-2.5 px-1 pt-1">
            <span className="mb-1 text-4xl font-semibold tracking-tight text-foreground">
              {t.nav.navigation}
            </span>
            {mobileNavLinks.map((link, i) =>
              link.sectionId === "contact" ? (
                <button
                  key={link.sectionId}
                  onClick={() => { setMenuOpen(false); setContactOpen(true); }}
                  className={`w-fit text-left text-[1.15rem] leading-snug font-medium tracking-tight transition-all duration-300 cursor-pointer ${
                    menuOpen ? `opacity-100 translate-x-0 nav-delay-${i}` : "opacity-0 translate-x-8 nav-delay-none"
                  }`}
                >
                  <span className="text-foreground/80 transition-colors duration-200 hover:text-foreground">
                    {link.label}
                  </span>
                </button>
              ) : subPage && link.sectionId !== "top" ? (
                <a
                  key={link.sectionId}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`w-fit text-left text-[1.15rem] leading-snug font-medium tracking-tight transition-all duration-300 cursor-pointer ${
                    menuOpen ? `opacity-100 translate-x-0 nav-delay-${i}` : "opacity-0 translate-x-8 nav-delay-none"
                  }`}
                >
                  <span className="text-foreground/80 transition-colors duration-200 hover:text-foreground">
                    {link.label}
                  </span>
                </a>
              ) : (
                <button
                  key={link.sectionId}
                  onClick={() => scrollToSection(link.sectionId)}
                  className={`w-fit text-left text-[1.15rem] leading-snug font-medium tracking-tight transition-all duration-300 cursor-pointer ${
                    menuOpen ? `opacity-100 translate-x-0 nav-delay-${i}` : "opacity-0 translate-x-8 nav-delay-none"
                  }`}
                >
                  <span className="text-foreground/80 transition-colors duration-200 hover:text-foreground">
                    {link.label}
                  </span>
                </button>
              )
            )}
          </nav>

          <div className="mb-6 flex items-center gap-2 px-1">
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/ImNacho"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub Profile"
                aria-label="GitHub Profile"
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border/45 bg-background/60 text-foreground/80 transition-all hover:bg-foreground/10 hover:text-foreground"
              >
                <Github className="h-4.5 w-4.5" />
              </a>
              <a
                href="https://www.linkedin.com/in/hernan-josé-mendoza-ibáñez-229332212/"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn Profile"
                aria-label="LinkedIn Profile"
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border/45 bg-background/60 text-foreground/80 transition-all hover:bg-foreground/10 hover:text-foreground"
              >
                <Linkedin className="h-4.5 w-4.5" />
              </a>
            </div>

            <div className="flex-1" />
          </div>

          <div className="mt-auto border-t border-border/40 px-1 pt-5">
            <div className="mb-6 flex flex-col items-start gap-1.5">
              <a
                href={cvHrefEn}
                download
                className="inline-flex items-center gap-1.5 text-[13px] leading-none font-light text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
              >
                <FileText className="h-3.5 w-3.5 shrink-0" />
                <span className="leading-none">{t.nav.downloadCV}</span>
              </a>
            </div>

            <p className="text-xs text-muted-foreground/70">
              © {new Date().getFullYear()} Hernán Mendoza. {t.nav.rightsReserved}
            </p>
          </div>

        </div>
      </div>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}