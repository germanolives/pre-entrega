import { SourceProvider } from "./SourceContext";
import { CartProvider } from "./CartContext";
import { FavoriteProvider } from "./FavoriteContext";
import { SearchProvider } from "./SearchContext";
import { OrderProvider } from "./OrderContext";
import { ProductsProvider } from "./ProductsContext";

export const AppProviders = ({ children }) => {
  return (
    <SourceProvider>
      <ProductsProvider>
        <SearchProvider>
          <OrderProvider>
            <CartProvider>
              <FavoriteProvider>{children}</FavoriteProvider>
            </CartProvider>
          </OrderProvider>
        </SearchProvider>
      </ProductsProvider>
    </SourceProvider>
  );
};