import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Project from '../components/Project';
import projectsData from '../public/mock/works.json';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WorksPage = () => {
  const router = useRouter();
  const [works, setWorks] = useState([]);

  useEffect(() => {
    setWorks(projectsData.categories || []);
  }, []);

  // Animate projects on scroll
  useEffect(() => {
    if (!works.length) return;

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
          stagger: 0.18,
          scrollTrigger: {
            trigger: '.works-page',
            start: 'top bottom',
            end: 'bottom top',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [works]);

  // Scroll to hash if URL has #hash
  useEffect(() => {
    if (router.asPath.includes('#')) {
      const id = router.asPath.split('#')[1];
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  }, [router.asPath]);

  return (
    <div className="works-page" style={{ paddingTop: '80px' }}>
      {works.map((category) => (
        <section key={category.id} id={category.id} className="category-section">
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
