import { HeroContainer } from "../components/Hero/HeroContainer";
import { Products } from "./Products";

export const Home = () => {
  return (
    <div className="flex flex-col gap-4">
      <HeroContainer />
      <Products />
    </div>
  );
};
