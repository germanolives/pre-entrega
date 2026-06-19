import { Helmet } from "react-helmet-async";

export const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact | Tienda S.A.U.</title>
        <meta
          name="description"
          content="Need help? Contact the Tienda S.A.U. support team. We are here to assist you with your orders, inquiries, or any feedback you may have."
        />
      </Helmet>
      <h2 className="text-center">CONTACT</h2>;
    </>
  );
};
