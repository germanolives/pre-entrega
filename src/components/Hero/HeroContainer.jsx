import { HeroList } from "./HeroList";
import { blackFridayPromos } from "../../data/offers/blackFridayPromos";

export const HeroContainer = () => {
  return (
    <section className="mx-4 border-2 border-gray-400 rounded-xl p-4 flex justify-center items-center">
      <HeroList data={blackFridayPromos} />
    </section>
  );
};
