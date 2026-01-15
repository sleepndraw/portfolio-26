import Image from 'next/image';

export default function Project({ title, subtitle, tags, body, images }) {
  return (
    <article className="project">
      <div className="project-text">
        <div className="project-text_title">
          <h3>{title}</h3>
          <h4>{subtitle}</h4>
          <div className="tags">
            {tags.map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </div>
        <p className="project-text_body" dangerouslySetInnerHTML={{ __html: body }} />
      </div>
      <div className="project-images">
        <div className="large-image">
          {images[0] && (
            <Image
              src={images[0]}
              alt={`${title} main`}
              width={600}
              height={400}
              style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
            />
          )}
        </div>
        <div className="small-images">
          {images.slice(1).map((src, i) => (
            <Image
              key={i}
              src={src}
              alt={`${title} ${i + 2}`}
              width={300}
              height={200}
              style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
            />
          ))}
        </div>
      </div>
    </article>
  );
}
