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
        gsap.utils.toArray<HTMLElement>(".project-row").forEach((row) => {
          const imgWrap = row.querySelector<HTMLElement>(".project-img-wrap");
          const content = row.querySelector<HTMLElement>(".project-content");
          if (imgWrap) gsap.set(imgWrap, { opacity: 1, x: 0 });
          if (content) gsap.set(content, { opacity: 1, x: 0 });
        });
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

      gsap.utils.toArray<HTMLElement>(".project-row").forEach((row, i) => {
        const isEven = i % 2 !== 0;
        const imgWrap = row.querySelector<HTMLElement>(".project-img-wrap");
        const content = row.querySelector<HTMLElement>(".project-content");

        const tl = gsap.timeline({
          scrollTrigger: { trigger: row, start: "top 82%" },
        });

        tl.fromTo(imgWrap,
          { opacity: 0, x: isEven ? 70 : -70 },
          { opacity: 1, x: 0, duration: 1.1, ease: "power3.out" }
        ).fromTo(content,
          { opacity: 0, x: isEven ? -70 : 70 },
          { opacity: 1, x: 0, duration: 1.1, ease: "power3.out" },
          "-=0.85"
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

        <div className="relative">
          <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-pl-6 pb-4 [&::-webkit-scrollbar]:hidden xl:flex-col xl:gap-20 2xl:gap-40 xl:overflow-visible xl:snap-none xl:scroll-pl-0 xl:pb-0">
          {projects.map((project, index) => {
            const isEven = index % 2 !== 0;
            return (
              <div key={project.slug} data-project-slug={project.slug} className="project-row min-w-[85vw] snap-start flex flex-col xl:flex-row gap-6 xl:gap-16 items-center group xl:min-w-0 xl:snap-none">

                <div className={`project-content opacity-0 w-full xl:w-full flex flex-col justify-center ${isEven ? "xl:order-1 xl:pl-4" : "xl:order-2 xl:pr-4"}`}>
                  <div className="flex flex-wrap items-center gap-3 mb-3 md:mb-6">
                    <span className="font-mono text-5xl font-black text-foreground/8 select-none leading-none">{project.number}</span>
                    <span className={`text-xs uppercase tracking-widest font-black px-4 py-1.5 rounded-full border ${project.accent}`}>
                      {project.highlight}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground mb-1 md:mb-2 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-mono text-muted-foreground mb-2 md:mb-6">{project.role}</p>

                  <p className="text-muted-foreground text-xs sm:text-base leading-relaxed mb-3 md:mb-7 font-light line-clamp-3 md:line-clamp-none">
                    {renderBold(project.description)}
                  </p>

                  <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-8">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[10px] sm:text-xs font-semibold text-foreground/80 bg-foreground/5 border border-border/50 px-2 py-1 sm:px-3 sm:py-1.5 rounded-xl">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-[10px] sm:text-xs font-semibold text-muted-foreground bg-foreground/5 border border-border/50 px-2 py-1 sm:px-3 sm:py-1.5 rounded-xl">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-row items-center gap-2">
                    <a
                      href={`/projects/${project.slug}`}
                      className="flex-1 flex items-center justify-center gap-2 bg-foreground text-background hover:bg-foreground/90 px-4 py-2.5 sm:px-6 sm:py-3.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 shadow-xl shadow-foreground/10 group/btn cursor-pointer"
                      aria-label={`${pr.viewDetails} - ${project.title}`}
                    >
                      {pr.viewDetails}
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 glass hover:bg-foreground/5 text-foreground border border-border/50 hover:border-foreground/30 px-4 py-2.5 sm:px-6 sm:py-3.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer"
                      aria-label={`${pr.visitSite} - ${project.title}`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      {pr.visitSite}
                    </a>
                  </div>
                </div>

              </div>
            );
          })}
          </div>

          

          {/* Mobile fade hint at edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-background to-transparent xl:hidden" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background to-transparent xl:hidden" />
        </div>
      </div>
    </section>
  );
}