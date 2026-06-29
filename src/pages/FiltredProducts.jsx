import { ItemList } from "../components/Item/ItemList";
import { Helmet } from "react-helmet-async";
import { ClientPagination } from "../components/common/ClientPagination";
import { useSearchMatches } from "../context/SearchMatchesContext";

export const FiltredProducts = () => {
  const { searchList } = useSearchMatches();

  return (
    <section className="mx-4 border-2 border-gray-300 rounded-xl p-8 min-h-130 flex flex-col justify-between">
      <Helmet>
        <title>Search Results | Tienda S.A.U.</title>
        <meta
          name="description"
          content={`Discover our products matching. Find the best deals at Tienda S.A.U.`}
        />
      </Helmet>
      {searchList && searchList.length > 0 ? (
        <ClientPagination searchedProds={searchList} itemsPerPage={5}>
          {(paginatedProds) => (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
              <ItemList data={paginatedProds} />
            </div>
          )}
        </ClientPagination>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full my-auto text-center">
          <p className="text-gray-500 font-medium">
            No se encontraron productos que coincidan con tu búsqueda.
          </p>
        </div>
      )}
    </section>
  );
};
