import { useEffect, useState, useLayoutEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Project from '../components/Project';
import projectsData from '../public/mock/works.json';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

const WorksPage = () => {
  const router = useRouter();
  const [works, setWorks] = useState([]);
  const lenisRef = useRef(null); // store Lenis instance
  const containerRef = useRef(null); // optional wrapper for Lenis scroll

  useEffect(() => {
    setWorks(projectsData.categories || []);
  }, []);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // ease out
      smooth: true,
      direction: 'vertical',
      gestureOrientation: 'vertical',
    });

    const lenis = lenisRef.current;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Scroll to hash after DOM renders
  useEffect(() => {
    if (router.asPath.includes('#')) {
      const id = router.asPath.split('#')[1];
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  }, [router.asPath]);

  // Animate projects with GSAP + ScrollTrigger + Lenis
  useLayoutEffect(() => {
    if (!works.length || !lenisRef.current) return;

    const projects = document.querySelectorAll('.project');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        projects,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.18, // each project animates independently
          scrollTrigger: {
            trigger: containerRef.current || document.body,
            start: 'top bottom',
            end: 'bottom top',
            scroller: lenisRef.current.scrollEl, // Lenis scroller
            markers: false,
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // Update ScrollTrigger on Lenis scroll
    lenisRef.current.on('scroll', ScrollTrigger.update);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [works]);

  return (
    <div
      ref={containerRef}
      className="works-page"
      style={{ paddingTop: '80px' }}
    >
      {works.map((category) => (
        <section
          key={category.id}
          id={category.id}
          className="category-section"
        >
          <h2>{category.name}</h2>

          <div className="works-grid">
            {category.projects.map((project) => (
              <Project key={project.id} {...project} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default WorksPage;
