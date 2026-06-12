import { SourceProvider } from "./SourceContext";
import { CartProvider } from "./CartContext";
import { FavoriteProvider } from "./FavoriteContext";
import { SearchProvider } from "./SearchContext";
import { ProductsProvider } from "./ProductsContext";
import { AuthProvider } from "./AuthContext";

export const AppProviders = ({ children }) => {
  return (
    <SourceProvider>
      <AuthProvider>
        <ProductsProvider>
          <SearchProvider>
            <CartProvider>
              <FavoriteProvider>{children}</FavoriteProvider>
            </CartProvider>
          </SearchProvider>
        </ProductsProvider>
      </AuthProvider>
    </SourceProvider>
  );
};
