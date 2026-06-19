import { HeroContainer } from "../components/Hero/HeroContainer";
import { Intro } from "../components/Intro/Intro";
import { Helmet } from "react-helmet-async";

export const Home = () => {
  return (
    <div className="flex flex-col gap-4">
      <Helmet>
        <title>Tienda S.A.U. | Clothing and electronics store</title>
        <meta
          name="description"
          content="Specialists in top-brand clothing and electronics. Shipping nationwide.."
        />
      </Helmet>
      <HeroContainer />
      <Intro />
    </div>
  );
};
