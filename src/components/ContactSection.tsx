import { useState } from "react";
import { ArrowRight, Download, Github, Linkedin, Mail, MapPin, MessageSquareText, Phone } from "lucide-react";
import ContactModal from "./ContactModal";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/lib/translations";

export default function ContactSection() {
  const [contactOpen, setContactOpen] = useState(false);
  const { lang } = useLanguage();
  const t = translations[lang];
  const ct = t.contact;

  const socials = [
    { name: "Email", href: "mailto:andromixm@gmail.com", icon: Mail },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/hernan-josé-mendoza-ibáñez-229332212/", icon: Linkedin },
    { name: "GitHub", href: "https://github.com/ImNacho", icon: Github },
  ];

  return (
    <>
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />

      <section id="contact" className="relative py-16 md:py-20">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-6xl rounded-[28px] border border-border/60 bg-card/80 p-6 shadow-[0_0_60px_rgba(239,68,68,0.08)] backdrop-blur-sm md:p-10">
            <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-5">
                <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
                  {ct.sectionTitle}
                </span>
                <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
                  {lang === "es" ? "Hablemos de tu próximo proyecto" : "Let’s talk about your next project"}
                </h2>
                <p className="max-w-xl text-base text-muted-foreground md:text-lg">
                  {lang === "es"
                    ? "Estoy disponible para trabajos freelance, productos digitales y desarrollo full stack con enfoque en rendimiento y experiencia de usuario."
                    : "I’m available for freelance work, digital products, and full-stack development focused on performance and user experience."}
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={() => setContactOpen(true)}
                    className="inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:opacity-90"
                  >
                    {lang === "es" ? "Enviar mensaje" : "Send message"}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <a
                    href="/Hoja%20de%20VIDA%20(ESP)%20ING.pdf"
                    download
                    className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-medium transition hover:border-primary/50 hover:text-primary"
                  >
                    <Download className="h-4 w-4" />
                    {lang === "es" ? "Descargar CV" : "Download CV"}
                  </a>
                </div>
              </div>

              <div className="space-y-4 rounded-2xl border border-border/60 bg-background/70 p-5 md:p-6">
                <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-card/60 p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Email</p>
                    <a href="mailto:andromixm@gmail.com" className="text-sm font-medium text-foreground hover:text-primary">
                      andromixm@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-card/60 p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">WhatsApp</p>
                    <a
                      href="https://api.whatsapp.com/send/?phone=573113845246&text=Hola%20Hern%C3%A1n%2C%20me%20interesa%20hablar%20contigo&type=phone_number&app_absent=0"
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-medium text-foreground hover:text-primary"
                    >
                      +57 311 384 5246
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-card/60 p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{lang === "es" ? "Ubicación" : "Location"}</p>
                    <p className="text-sm font-medium text-foreground">Montería, Córdoba, Colombia 🇨🇴</p>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="mb-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">{lang === "es" ? "Redes" : "Socials"}</p>
                  <div className="flex flex-wrap gap-2">
                    {socials.map(({ name, href, icon: Icon }) => (
                      <a
                        key={name}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card px-3 py-2 text-xs font-medium text-muted-foreground transition hover:border-primary/50 hover:text-primary"
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {name}
                      </a>
                    ))}
                    <button
                      onClick={() => setContactOpen(true)}
                      className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card px-3 py-2 text-xs font-medium text-muted-foreground transition hover:border-primary/50 hover:text-primary"
                    >
                      <MessageSquareText className="h-3.5 w-3.5" />
                      {lang === "es" ? "Formulario" : "Form"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
