import React, { useState, useRef, useEffect } from 'react';

interface VideoProps {
  src: string;
  alt: string;
  title?: string;
  description?: string;
  width?: number | string;
  height?: number | string;
  className?: string
}

const Video: React.FC<VideoProps> = ({ src, alt, title, width, height, className }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showPreview, setShowPreview] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setShowPreview(true);
        }
      });
    }, {
      root: null,
      threshold: 0,
    });

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [videoRef]);

  return (
    <div className="w-full h-full relative flex items-center justify-center">
      {showPreview && (
        <video
          ref={videoRef}
          src={src}
          width={width}
          height={height}
          className={`w-full h-full outline-none ${className}`}
          controls
          autoPlay
          playsInline
          muted
          title={title}
          aria-label={alt}
          role="img"
          tabIndex={0}
          onLoadedMetadata={() => setLoaded(true)}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default Video;