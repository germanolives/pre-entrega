import { useState, useEffect } from "react";

export const ImgWithSkeleton = ({
  title,
  image,
  className,
  size,
  isPriority,
}) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(false);
  }, [image]);

  return (
    <div className={`relative ${size}`}>
      {!isReady && (
        <div className="absolute inset-0 bg-gray-300 animate-pulse" />
      )}
      <img
        className={`${className} ${size} object-contain transition-opacity duration-500 ${isReady ? "opacity-100" : "opacity-0"}`}
        src={image}
        alt={title}
        onLoad={() => setIsReady(true)}
        fetchPriority={isPriority ? "high" : "auto"}
        loading={isPriority ? "eager" : "lazy"}
      />
    </div>
  );
};
