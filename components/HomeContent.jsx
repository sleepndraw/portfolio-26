import { useEffect, useRef } from "react";
import LoopingTextSlider from "./LoopingText";
import SkillTags from "./SkillTags";
import Image from "next/image";
import projectCard from "./ProjectCard";
import projectCarousel from "./ProjectCarousel";
import SimpleProjectsCarousel from "./ProjectCarousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
const HomeContent = () => {
  const containerRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroImageRef = useRef(null);


  useEffect(() => {
    if (typeof window === "undefined") return;

    let ctx;

    (async () => {
      const gsap = (await import("gsap")).default;

      ctx = gsap.context(() => {
        const tl = gsap.timeline();

        tl.fromTo(
          ".hero-image",
          {
            rotation: -180,
            scale: 0.8,
            opacity: 0,
            x: 600,
          },
          {
            rotation: 0,
            scale: 1,
            opacity: 1,
            x: 0,
            duration: 1.5,
            ease: "back.out(1.7)",
            clearProps: "all",
          }
        );

        tl.fromTo(
          ".hero-title",
          {
            y: 100,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            clearProps: "all",
          },
          "-=0.5"
        );
        tl.fromTo(
          ".about-section",
          {
            y: 50,

            opacity: 0,
            // x: 600,
          },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            // x: 0,
            duration: 0.3
            ,
            ease: "power3.out",
            clearProps: "all",
          }
        );
      }, containerRef);
    })();

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <div className="home-body" ref={containerRef}>
      <section id="start" className="hero-section">
        <article className="hero-container">
          <div className="hero">
            <div className="hero-title">
              <h1>Hola!</h1>
              <h2>
                soy Sicilia López, diseñadora
                <span className="accent"> gráfica</span> y
                <span className="accent"> web</span>
              </h2>
            </div>

            <div className="hero-image" ref={heroImageRef}>
              <svg
                viewBox="0 0 321 321"
                width="320"
                height="320"
                className="hero-img"
                role="img"
                aria-label="fotoretrato"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <clipPath id="heroClip">
                    <path d="M77.2016 298.038C80.7655 285.638 84.1821 273.09 87.4514 260.396C90.7208 247.701 94.1375 235.153 97.7014 222.753C85.3012 226.317 72.7537 229.734 60.059 233.003C47.3642 236.273 34.8168 239.689 22.4166 243.253C18.606 229.391 14.7961 215.234 10.9866 200.782C7.47278 186.034 3.81056 171.729 3.13925e-05 157.867C12.1046 154.599 24.5042 151.33 37.199 148.06C50.1893 144.495 62.7368 141.079 74.8414 137.811C65.7105 128.68 56.5797 119.549 47.4489 110.418C38.3181 101.287 29.1872 92.1565 20.0564 83.0256C30.4035 72.6785 40.8984 62.1836 51.5412 51.5409C62.1839 40.8981 72.6788 30.4032 83.0259 20.0561C92.1567 29.187 101.288 38.3178 110.418 47.4486C119.549 56.5794 128.68 65.7103 137.811 74.8411C141.079 62.7365 144.348 50.3369 147.617 37.6422C151.182 24.6518 154.599 12.1043 157.867 -0.000223684C171.729 3.81032 185.886 7.62032 200.339 11.4298C215.086 14.9436 229.391 18.6058 243.253 22.4164C239.689 34.8165 236.273 47.364 233.003 60.0587C229.734 72.7535 226.317 85.3009 222.753 97.7011C235.154 94.1372 247.701 90.7206 260.396 87.4512C273.091 84.1818 285.638 80.7652 298.038 77.2013C301.849 91.0633 305.511 105.368 309.025 120.116C312.834 134.568 316.644 148.725 320.455 162.587C308.35 165.856 295.803 169.272 282.812 172.837C270.118 176.107 257.718 179.375 245.613 182.644C254.744 191.775 263.875 200.905 273.006 210.036C282.137 219.167 291.268 228.298 300.398 237.429C290.051 247.776 279.556 258.271 268.914 268.913C258.271 279.556 247.776 290.051 237.429 300.398C228.298 291.267 219.167 282.137 210.036 273.006C200.906 263.875 191.775 254.744 182.644 245.613C179.376 257.718 175.959 270.265 172.394 283.256C169.125 295.95 165.856 308.35 162.588 320.455C148.726 316.644 134.421 312.982 119.673 309.468C105.221 305.659 91.0636 301.849 77.2016 298.038Z" />
                  </clipPath>
                </defs>

                <image
                  href="/mock/images/retrato.png"
                  xlinkHref="/mock/images/retrato.png"
                  x="0"
                  y="0"
                  width="321"
                  height="321"
                  preserveAspectRatio="xMidYMid slice"
                  clipPath="url(#heroClip)"
                />
              </svg>
            </div>
          </div>
          <div className="hero-text-slider">
            <LoopingTextSlider />
          </div>
        </article>
      </section>

      <section id="about" className="about-section">
        <div className="about-section__intro">
          <div className="about-image-wrapper">
            <Image
              src="/mock/images/pequeyo%201.png"
              alt="pequeño dibujo"
              fill
              sizes="(max-width: 767px) 100vw, 240px"
              className="about-image"
            />
          </div>
          <div className="about-text">
            <h2>Sobre mí</h2>
            <p>
              Empecé a dibujar con dos añitos, y desde entonces no he parado. El
              dibujo fue mi pasión durante mucho tiempo, por lo cual decidí
              estudiar Bellas Artes. Tras unos años, me di cuenta de que aquello{" "}
              <b>no era lo mío:</b> necesitaba encontrar otra manera de utilizar
              mi imaginación y mi experiencia con los lápices.
              <br />
              Así fue cómo descubrí una nueva profesión:
              <b> el diseño gráfico.</b>
            </p>
            <br />
            <p>
              {" "}
              Me considero una diseñadora versátil, con enfoque en el diseño web
              y de interfaces. Aunque mi principal interés es el mundo digital,
              disfruto cuando tengo la oportunidad de darle un ligero toque
              analógico a lo que hago.
            </p>
          </div>
        </div>
      </section>

      <section id="experience" className="experience-section">
        <div className="experience-section_text">
          <h2>Experiencia</h2>
          <div className="flex-cont">
            <div className="d2">
              <div className="info-container">
                <div className="date-pill">
                  <h3>2023-2024</h3>
                </div>
                <div className="text_content">
                  <h3>Diseñadora gráfica & web</h3>
                  <p>
                    Grupo de Internet de nueva Generación. (GING) Universidad
                    Politécnica de Madrid.
                  </p>
                </div>
              </div>
              <div className="info-container">
                <div className="date-pill">
                  <h3>2025</h3>
                </div>
                <div className="text_content">
                  <h3>Diseñadora web & wordpress</h3>
                  <p>Cofana Labs</p>
                </div>
               
              </div>
               <div className="download-button"><a href="/mock/docs/CV2025_es.pdf">Descargar CV</a> <FontAwesomeIcon icon={faArrowDown} /> </div>
            </div>
            <div className="d3">
              <div className="skills-container">
                <div className="skills">
                  <SkillTags />
                  <div className="skills-title">
                    <h3>hard skills</h3>
                  </div>
                  <div className="skill-tags">
                    <div className="tag">html</div>
                    <div className="tag">css</div>
                    <div className="tag">react</div>
                    <div className="tag">adobe CC</div>
                    <div className="tag">diseño gráfico</div>
                    <div className="tag">ilustración</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h2>Trabajos</h2>
        </div>
        <SimpleProjectsCarousel />
      </section>
      
    </div>
  );
};

export default HomeContent;
