import { CartProvider } from "./CartContext";
import { FavoriteProvider } from "./FavoriteContext";
import { SearchFieldsProvider } from "./SearchFieldsContext";
import { AuthProvider } from "./AuthContext";
import { ModalProvider } from "./ModalContext";
import { MenuProvider } from "./MenuContext";
import { AlertProvider } from "./AlertContext";
import { HelmetProvider } from "react-helmet-async";
import { SearchMatchesProvider } from "./SearchMatchesContext";

export const AppProviders = ({ children }) => {
  return (
    <HelmetProvider>
      <AuthProvider>
          <SearchFieldsProvider>
            <SearchMatchesProvider>
              <CartProvider>
                <FavoriteProvider>
                  <MenuProvider>
                    <AlertProvider>
                      <ModalProvider>{children}</ModalProvider>
                    </AlertProvider>
                  </MenuProvider>
                </FavoriteProvider>
              </CartProvider>
            </SearchMatchesProvider>
          </SearchFieldsProvider>
      </AuthProvider>
    </HelmetProvider>
  );
};
