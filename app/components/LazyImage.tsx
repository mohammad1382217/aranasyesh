import React from "react";

const Image: React.FC<Image> = ({
  src,
  alt,
  className = "",
  loading = "lazy",
  width,
  height,
  onClick,
}) => {
  const ref = React.useRef<HTMLImageElement>(null);
  const [inView, setInView] = React.useState(false);

  const callback: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setInView(true);
      }
    });
  };

  React.useEffect(() => {
    const observer = new IntersectionObserver(callback, {
      rootMargin: "50px",
      threshold: 0.01,
    });

    if (ref?.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref?.current) {
        observer.unobserve(ref.current);
      }
      observer.disconnect();
    };
  }, []);

  return inView ? (
    <picture>
      <source
        type="image/webp"
        srcSet={`${src} 100vw`}
      />
      <img
        onClick={onClick}
        ref={ref}
        loading={loading}
        className={`w-full h-full object-cover transform transition duration-200 aspect-video overflow-hidden ${className}`}
        src={src}
        srcSet={`${src} 100vw`}
        sizes="100vw"
        decoding="async"
        fetchPriority="high"
        width={width}
        height={height}
        alt={alt}
        role="img"
        aria-label={alt}
      />
    </picture>
  ) : (
    <div
      ref={ref}
      className="object-fill"
      style={{
        backgroundColor: "gray",
        width,
        height,
      }}
    />
  );
};

export default Image;

export interface Image {
  src: string;
  alt: string;
  className?: string;
  width: string | number | undefined;
  height: string | number | undefined;
  loading?: "eager" | "lazy" | undefined;
  onClick?: React.MouseEventHandler<HTMLImageElement>;
}
