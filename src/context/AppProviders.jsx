import { SourceProvider } from "./SourceContext";
import { CartProvider } from "./CartContext";
import { FavoriteProvider } from "./FavoriteContext";
import { SearchProvider } from "./SearchContext";
import { ProductsProvider } from "./ProductsContext";
import { AuthProvider } from "./AuthContext";
import { ModalProvider } from "./ModalContext";

export const AppProviders = ({ children }) => {
  return (
    <SourceProvider>
      <AuthProvider>
        <ProductsProvider>
          <SearchProvider>
            <CartProvider>
              <FavoriteProvider>
                <ModalProvider>{children}</ModalProvider>
              </FavoriteProvider>
            </CartProvider>
          </SearchProvider>
        </ProductsProvider>
      </AuthProvider>
    </SourceProvider>
  );
};
