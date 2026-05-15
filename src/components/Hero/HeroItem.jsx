import { Button } from "../common/Button";

export const HeroItem = ({ image, title, description, priority = false }) => {
  return (
    <div className="relative w-full h-70 md:h-80 overflow-hidden bg-black">
      <img
        src={image}
        alt={title}
        className="hidden md:block w-full h-full object-cover opacity-80"
        fetchpriority={priority ? "high" : "low"}
        loading={priority ? "eager" : "lazy"}
      />

      <div className="absolute inset-0 flex flex-col justify-between p-10 text-white">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold mb-2 uppercase tracking-tighter text-right">
            {title}
          </h2>
          <p className="text-lg md:text-xl opacity-90 text-right">
            {description}
          </p>
        </div>

        <Button variant="tertiary" className="text-white font-bold py-3 px-8 rounded-full w-fit">
          VER OFERTA
        </Button>
      </div>
    </div>
  );
};
