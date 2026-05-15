import { useState, useEffect } from "react";
import { HeroItem } from "./HeroItem";

export const HeroList = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // Si no hay datos o está pausado, no hacemos nada
    if (isPaused || data.length === 0) return; 

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === data.length - 1 ? 0 : prev + 1));
    }, 5000);

    // Limpieza única y vital
    return () => clearInterval(interval);
  }, [isPaused, data.length]); // Solo depende de estos dos

  return (
    <div 
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}   // <--- Activamos la pausa
      onMouseLeave={() => setIsPaused(false)}  // <--- Quitamos la pausa
    >
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {data.map((promo) => (
          <div key={promo.id} className="min-w-full">
            <HeroItem {...promo} />
          </div>
        ))}
      </div>

      {/* Indicadores */}
      <div className="absolute bottom-4 flex gap-2 justify-center w-full">
        {data.map((_, index) => (
          <button // Mejor usar button por accesibilidad
            key={index}
            onClick={() => setActiveIndex(index)} // Permite saltar a una promo
            className={`h-2 w-2 rounded-full transition-all ${
              index === activeIndex ? "bg-white scale-125" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};