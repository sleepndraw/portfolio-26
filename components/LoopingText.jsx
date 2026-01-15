import React, { useRef, useEffect, useState } from 'react';

const LoopingTextSlider = ({ speed = 160 }) => {
  const textItems = [
    'ui', 'ux', 'branding', 'digital',
    'on', 'off', 'web', 'diseño', 'ilustración'
  ];

  const containerRef = useRef(null);
  const baseRef = useRef(null);
  const trackRef = useRef(null);
  const [trackItems, setTrackItems] = useState([]);
  const [ready, setReady] = useState(false);

  // px por sec
  const SPEED = speed;

  const buildTrack = () => {
    const containerWidth = containerRef.current?.offsetWidth || window.innerWidth;
    const baseWidth = baseRef.current?.offsetWidth || 1;

    const minRepeats = Math.max(1, Math.ceil(containerWidth / baseWidth));

    const block = [];
    for (let i = 0; i < minRepeats; i++) block.push(...textItems);

    const items = [...block, ...block];

    setTrackItems(items);

    requestAnimationFrame(() => {
      const fullTrackWidth = trackRef.current?.scrollWidth || (baseWidth * minRepeats * 2);
      const measuredBlockWidth = fullTrackWidth / 2;
      const duration = Math.max(1, measuredBlockWidth / SPEED);
      if (containerRef.current) containerRef.current.style.setProperty('--scroll-duration', `${duration}s`);
      setReady(true);
    });
  };

  useEffect(() => {
    const onResize = () => {
      setReady(false);
      requestAnimationFrame(buildTrack);
    };

    
    requestAnimationFrame(buildTrack);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speed]);

  return (
    <div className="slider-container" ref={containerRef}>
      <div
        className="slider-track"
        ref={trackRef}
        style={{ animationPlayState: ready ? 'running' : 'paused' }}
      >
        {trackItems.map((item, index) => (
          <div key={index} className="slider-item">* {item}</div>
        ))}
      </div>

      {/* offscreen measurement block */}
      <div ref={baseRef} className="slider-measure" aria-hidden="true">
        {textItems.map((item, i) => (
          <span key={i} className="slider-item">* {item}</span>
        ))}
      </div>
    </div>
  );
};

export default LoopingTextSlider;
