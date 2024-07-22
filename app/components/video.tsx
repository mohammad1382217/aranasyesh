import React, { useState, useRef, useEffect } from 'react';

interface VideoProps {
  src: string;
  alt: string;
  title?: string;
  description?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  poster?: string;
  captions?: string;
}

const Video: React.FC<VideoProps> = ({
  src,
  alt,
  title,
  width,
  height,
  className = "",
  poster,
  captions,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
          } else {
            setInView(false);
          }
        });
      },
      {
        root: null, // Use the viewport as the root
        threshold: 0.1, // Callback triggered when 10% of the container is visible
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
      observer.disconnect();
    };
  }, [containerRef]);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full relative flex items-center justify-center`}
      style={{ width, height }}
    >
      {inView ? (
        <video
          src={src}
          width={width}
          height={height}
          className={`w-full h-full outline-none ${className}`}
          controls
          muted
          title={title}
          aria-label={alt}
          role="img"
          tabIndex={0}
          onLoadedMetadata={() => setLoaded(true)}
          poster={poster || ""}
          preload="metadata"
        >
          <source src={src} type="video/mp4" />
          <source src={src.replace('.mp4', '.webm')} type="video/webm" />
          <source src={src.replace('.mp4', '.ogg')} type="video/ogg" />
          {captions && (
            <track
              kind="captions"
              src={captions}
              srcLang="en"
              label="English captions"
            />
          )}
          مرورگر شما از تگ ویدیو پشتیبانی نمی‌کند.
        </video>
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: "#000", // یا هر رنگ یا تصویری که می‌خواهید
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {poster && <img src={poster} alt="Poster" className="w-full h-full object-cover" />}
        </div>
      )}
    </div>
  );
};

export default Video;