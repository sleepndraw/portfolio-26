'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ProjectCard from './ProjectCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const SimpleProjectsCarousel = ({ limit = 6 }) => {
  const [projects, setProjects] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // start at first card
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [loading, setLoading] = useState(true);

  const trackRef = useRef(null);

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/mock/works.json');
        const data = await response.json();

        const allProjects = data.categories
          .flatMap(cat => cat.projects)
          .slice(0, limit);

        setProjects(allProjects);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [limit]);

  // Responsive slides
  useEffect(() => {
    const updateSlides = () => {
      if (window.innerWidth < 768) setSlidesToShow(1);
      else if (window.innerWidth < 1024) setSlidesToShow(2);
      else setSlidesToShow(3);
    };

    updateSlides();
    window.addEventListener('resize', updateSlides);
    return () => window.removeEventListener('resize', updateSlides);
  }, []);

  useEffect(() => {
    if (!trackRef.current || projects.length === 0) return;

    // Compute width of one slide in px
    const slide = trackRef.current.children[0];
    const slideWidth = slide.offsetWidth;

    // Move track so that currentIndex card is aligned left
    const x = -(currentIndex * slideWidth);

    gsap.to(trackRef.current, {
      x,
      duration: 0.7,
      ease: 'power3.inOut',
    });
  }, [currentIndex, slidesToShow, projects.length]);

  if (loading) return <div>Loading…</div>;

  // Max index ensures last slide fully visible
  const maxIndex = Math.max(projects.length - slidesToShow, 0);

  const nextSlide = () => {
    setCurrentIndex(i => Math.min(i + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(i => Math.max(i - 1, 0));
  };

  return (
    <div className="simple-carousel">
      <button
        className="nav-btn prev"
        onClick={prevSlide}
        disabled={currentIndex === 0}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      <div className="carousel-viewport">
        <div className="carousel-track" ref={trackRef}>
          {projects.map(project => (
            <div
              key={project.id}
              className="slide-item"
              style={{ width: `${100 / slidesToShow}%` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>

      <button
        className="nav-btn next"
        onClick={nextSlide}
        disabled={currentIndex === maxIndex}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};

export default SimpleProjectsCarousel;
