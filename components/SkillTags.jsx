// components/SkillTags.jsx
import { useEffect, useRef } from 'react';

export default function SkillTags({ items = [] }) { // Add default value
  const containerRef = useRef(null);
  
  // Early return if no items
  if (!items || !Array.isArray(items)) {
    return <div className="skills-container">No items to display</div>;
  }
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!containerRef.current) return; // Add check for container ref
    
    let draggables = [];
    let gsapInstance = null;

    (async () => {
      try {
        // Import GSAP
        const gsap = (await import('gsap')).default;
        gsapInstance = gsap;
        
        // Draggable is part of GSAP 3+
        const Draggable = gsap.utils.Draggable;
        
        const tags = containerRef.current.querySelectorAll('.tag');
        if (tags.length === 0) return; // No tags, nothing to animate
        
        // Entrance animation
        gsap.from(tags, {
          y: -80,
          opacity: 0,
          stagger: 0.08,
          duration: 0.7,
          ease: 'power3.out'
        });

        // Make each tag draggable
        draggables = Array.from(tags).map(el =>
          Draggable.create(el, {
            type: 'x,y',
            bounds: containerRef.current,
            edgeResistance: 0.6,
            inertia: false,
            onPress() { 
              el.style.zIndex = 1000; 
              el.classList.add('dragging'); 
            },
            onRelease() { 
              el.style.zIndex = ''; 
              el.classList.remove('dragging'); 
            }
          })[0]
        );
      } catch (error) {
        console.error('Error loading GSAP or Draggable:', error);
      }
    })();

    return () => {
      // Cleanup
      draggables.forEach(d => d && d.kill && d.kill());
    };
  }, [items]); // Add items to dependency array if you want animations to re-run when items change

  return (
    <div ref={containerRef} className="skills-container">
      {items.map((t, i) => (
        <div key={i} className="tag">{t}</div>
      ))}
    </div>
  );
}

// Add default props for better TypeScript/IDE support
SkillTags.defaultProps = {
  items: []
};