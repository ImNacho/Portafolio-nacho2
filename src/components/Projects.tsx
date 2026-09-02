import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/lib/translations";
import { projectsStaticData } from "@/config/projects";
import { renderBold } from "@/lib/renderBold";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  // Keep the refresh entry point used by Layout's after-swap scroll restoration.
  (window as any).ScrollTrigger = ScrollTrigger;
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const { lang } = useLanguage();
  const t = translations[lang];
  const pr = t.projects;

  const projects = pr.projects.map((proj, i) => ({
    ...projectsStaticData[i],
    ...proj,
  }));

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (sessionStorage.getItem('skip-reveal')) {
        gsap.set(".projects-heading", { opacity: 1, y: 0 });
        gsap.set(".project-card", { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        ".projects-heading",
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ".projects-heading", start: "top 88%" },
        }
      );

      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 34 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: index * 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%" },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="py-16 md:py-20 relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="projects-heading opacity-0 text-center mb-10 md:mb-12 flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-1 md:mb-1 leading-tight text-balance">
            {pr.title}<span className="text-primary">{pr.titleHighlight}</span>
          </h2>
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-foreground to-red-500 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            {pr.subtitle}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <a
              key={project.slug}
              data-project-slug={project.slug}
              href={`/projects/${project.slug}`}
              className="project-card group block opacity-0"
              aria-label={`${pr.viewDetails} - ${project.title}`}
            >
              <article className="relative flex h-full min-h-[360px] flex-col overflow-hidden rounded-[28px] border border-border/70 bg-card/80 p-5 shadow-[0_18px_60px_rgba(17,17,17,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-[0_24px_70px_rgba(17,17,17,0.12)]">
                <div className={`absolute inset-x-0 top-0 h-28 bg-gradient-to-br ${project.gradient}`} />

                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <span className="font-mono text-4xl font-black leading-none text-foreground/10 select-none">
                      {project.number}
                    </span>
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em] ${project.accent}`}>
                      {project.highlight}
                    </span>
                  </div>

                  <div className="mt-auto space-y-4">
                    <div>
                      <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground/80">
                        {project.year}
                      </p>
                      <h3 className="text-2xl font-black leading-tight text-foreground">
                        {project.title}
                      </h3>
                    </div>

                    <p className="text-sm font-mono text-muted-foreground">
                      {project.role}
                    </p>

                    <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground/90">
                      {renderBold(project.description)}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={`${project.slug}-${tag}`}
                          className="rounded-full border border-border/70 bg-foreground/5 px-2.5 py-1 text-[10px] font-semibold text-foreground/80"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="rounded-full border border-border/70 bg-foreground/5 px-2.5 py-1 text-[10px] font-semibold text-muted-foreground">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between border-t border-border/70 pt-4 text-sm font-semibold text-foreground">
                      <span>{pr.viewDetails}</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </article>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}