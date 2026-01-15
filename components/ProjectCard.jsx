// components/ProjectCard.jsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const ProjectCard = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getProjectLink = () => {
    if (!project.link) return "/works";

    if (project.link.startsWith("/works#")) {
      return project.link;
    }

    if (project.link.startsWith("#")) {
      return `/works${project.link}`;
    }

    return project.link;
  };

  return (
    <Link
      href={getProjectLink()}
      className="project-card-link"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="project-card">
        {/* Image Container */}
        <div className="project-image-container">
          {project.thumbnail && (
            <Image
              src={project.thumbnail}
              alt={project.title}
              width={400}
              height={300}
              className="project-image"
              priority={project.id === 1}
            />
          )}

          {/* Overlay */}
          <div className={`image-overlay ${isHovered ? "visible" : ""}`} />

          {/* Content that appears on hover */}
          <div className={`hover-content ${isHovered ? "visible" : ""}`}>
            <h3 className="project-title">{project.title}</h3>
            <p className="project-subtitle">{project.subtitle}</p>

            {/* Tags */}
            <div className="project-tags">
              {project.tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))}
            </div>


          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
