import { Button } from "../common/Button";
import { useNavigate } from "react-router-dom";

export const HeroItem = ({ id, image, title, description, priority = false }) => {
  const navigate = useNavigate();


  return (
    <div className="relative w-full h-72 md:h-80 overflow-hidden bg-black">
      <img
        src={image}
        alt={title}
        className="hidden md:block w-full h-full opacity-80"
        fetchPriority={priority ? "high" : "low"}
        loading={priority ? "eager" : "lazy"}
      />

      <div className="absolute inset-0 flex flex-col justify-between p-10 text-white">
        <div>
          <h2 className="font-bold mb-2 uppercase tracking-tighter text-right">
            <span className="text-3xl md:hidden">{`Black Friday ${title}`}</span>
            <span className="hidden md:block text-5xl">{title}</span>
          </h2>
          <p className="text-lg md:text-xl opacity-90 text-right md:hidden">
            {description}
          </p>
        </div>

        <Button
          variant="tertiary"
          className="text-white font-bold py-3 px-8 rounded-full w-fit"
          onClick={()=>navigate(`/promos/black-friday/${id}`)}

        >
          VIEW OFFER
        </Button>
      </div>
    </div>
  );
};
