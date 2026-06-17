import { SourceProvider } from "./SourceContext";
import { CartProvider } from "./CartContext";
import { FavoriteProvider } from "./FavoriteContext";
import { SearchProvider } from "./SearchContext";
import { ProductsProvider } from "./ProductsContext";
import { AuthProvider } from "./AuthContext";
import { ModalProvider } from "./ModalContext";
import { MenuProvider } from "./MenuContext";

export const AppProviders = ({ children }) => {
  return (
    <SourceProvider>
      <AuthProvider>
        <ProductsProvider>
          <SearchProvider>
            <CartProvider>
              <FavoriteProvider>
                <MenuProvider>
                  <ModalProvider>{children}</ModalProvider>
                </MenuProvider>
              </FavoriteProvider>
            </CartProvider>
          </SearchProvider>
        </ProductsProvider>
      </AuthProvider>
    </SourceProvider>
  );
};
