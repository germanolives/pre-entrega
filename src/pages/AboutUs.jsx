import { Helmet } from "react-helmet-async";

export const AboutUs = () => {
  return (
    <>
      <Helmet>
        <title>About Us | Tienda S.A.U.</title>
        <meta
          name="description"
          content="Learn more about Tienda S.A.U. Our mission is to provide high-quality clothing and electronics with a focus on customer satisfaction and innovation."
        />
      </Helmet>
      <h2 className="text-center">ABOUT US</h2>;
    </>
  );
};
