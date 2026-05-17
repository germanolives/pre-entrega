import { HeroContainer } from "../components/Hero/HeroContainer";
import { Offers } from "../components/Offers/Offers";

export const Home = () => {
  return (
    <div className="flex flex-col gap-4">
      <HeroContainer />
      <Offers />
    </div>
  );
};
