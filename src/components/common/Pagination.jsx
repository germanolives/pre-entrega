import { useSearchParams } from "react-router-dom";
import { Button } from "./Button";
import { useEffect } from "react";

export const Pagination = ({ searchedProds, itemsPerPage = 3, children }) => {
  // 🌟 1. Control de Query Parameters (?page=1)
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  // 🌟 2. Matemática de la paginación en el cliente
  const totalItems = searchedProds.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Segmentamos el array original para extraer solo los de la página activa
  const paginatedProds = searchedProds.slice(startIndex, endIndex);

  // 🌟 3. Función para cambiar de página modificando la URL
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setSearchParams({ page: newPage });
    }
  };

useEffect(()=>{
  if (paginatedProds.length === 0 && currentPage > 1){
    setSearchParams( {page: (currentPage-1)})
  }
}, [paginatedProds.length, currentPage, setSearchParams]);

  return (
    <>
      <div>{children(paginatedProds)}</div>
      {totalItems > itemsPerPage && (
        <div className="flex flex-row justify-center items-center gap-4 mt-6">
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 text-xs"
          >
            ◀ Previous
          </Button>

          <span className="text-xs font-medium text-gray-600">
            Page {currentPage} of {totalPages}
          </span>

          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-xs"
          >
            Next ▶
          </Button>
        </div>
      )}
    </>
  );
};
