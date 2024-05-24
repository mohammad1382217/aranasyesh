import React from "react";

const Image: React.FC<Image> = ({
  src,
  alt,
  className,
  loading,
  width,
  height,
  onClick,
}) => {
  const ref = React.useRef<HTMLImageElement>(null);
  const [inView, setInView] = React.useState(false);
  let callback = (entries: any[], observer: any) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setInView(true);
      }
    });
  };

  React.useEffect(() => {
    let observer = new IntersectionObserver(callback);

    if (ref?.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return inView ? (
    <picture>
      <source
        type="image/webp"
        srcSet={`${src} 480w, ${src} 800w, ${src} 1200w`}
      />
      <img
        onClick={onClick}
        ref={ref}
        loading={loading}
        className={`${className} object-cover`}
        src={src}
        srcSet={`${src} 480w, ${src} 800w, ${src} 1200w`}
        sizes="(max-width: 600px) 480px, (max-width: 1200px) 800px, 1200px"
        decoding="async"
        fetchPriority="high"
        width={width}
        height={height}
        alt={alt}
      />
    </picture>
  ) : (
    <img
      ref={ref}
      style={{
        backgroundColor: "gray",
      }}
      className="object-cover"
      sizes="(max-width: 600px) 480px, (max-width: 1200px) 800px, 1200px"
      width={width}
      height={height}
      alt="empty"
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