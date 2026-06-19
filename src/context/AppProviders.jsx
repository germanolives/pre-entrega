import { SourceProvider } from "./SourceContext";
import { CartProvider } from "./CartContext";
import { FavoriteProvider } from "./FavoriteContext";
import { SearchProvider } from "./SearchContext";
import { ProductsProvider } from "./ProductsContext";
import { AuthProvider } from "./AuthContext";
import { ModalProvider } from "./ModalContext";
import { MenuProvider } from "./MenuContext";
import { AlertProvider } from "./AlertContext";
import { HelmetProvider } from "react-helmet-async";

export const AppProviders = ({ children }) => {
  return (
    <HelmetProvider>
      <SourceProvider>
        <AuthProvider>
          <ProductsProvider>
            <SearchProvider>
              <CartProvider>
                <FavoriteProvider>
                  <MenuProvider>
                    <AlertProvider>
                      <ModalProvider>{children}</ModalProvider>
                    </AlertProvider>
                  </MenuProvider>
                </FavoriteProvider>
              </CartProvider>
            </SearchProvider>
          </ProductsProvider>
        </AuthProvider>
      </SourceProvider>
    </HelmetProvider>
  );
};
