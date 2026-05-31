import { SourceProvider } from "./SourceContext";
import { CartProvider } from "./CartContext";
import { FavoriteProvider } from "./FavoriteContext";

export const AppProviders = ({ children }) => {
  return (
    <SourceProvider>
      <CartProvider>
        <FavoriteProvider>{children}</FavoriteProvider>
      </CartProvider>
    </SourceProvider>
  );
};