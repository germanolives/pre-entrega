import { useState, useEffect } from "react";
import { HeroItem } from "./HeroItem";

export const HeroList = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || data.length === 0) return; 

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === data.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, data.length]);

  return (
    <div 
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {data.map((promo, index) => (
          <div key={promo.id} className="min-w-full">
            <HeroItem {...promo} priority={index === 0}/>
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 flex gap-2 justify-center w-full">
        {data.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`h-2 w-2 rounded-full transition-all ${
              index === activeIndex ? "bg-white scale-125" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};