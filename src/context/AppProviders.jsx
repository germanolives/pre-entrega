import { SourceProvider } from "./SourceContext";
import { CartProvider } from "./CartContext";
import { FavoriteProvider } from "./FavoriteContext";
import { SearchProvider } from "./SearchContext";
import { ProductsProvider } from "./ProductsContext";

export const AppProviders = ({ children }) => {
  return (
    <SourceProvider>
      <ProductsProvider>
        <SearchProvider>
          <CartProvider>
            <FavoriteProvider>{children}</FavoriteProvider>
          </CartProvider>
        </SearchProvider>
      </ProductsProvider>
    </SourceProvider>
  );
};
