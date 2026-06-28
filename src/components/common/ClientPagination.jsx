// src/components/common/Pagination.jsx
import { useSearchParams } from "react-router-dom";
import { Button } from "./Button";
import { useEffect } from "react";

export const ClientPagination = ({ searchedProds, itemsPerPage = 3, children }) => {
  // 🌟 1. Control de Query Parameters (?page=1)
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  // 🌟 2. Matemática de la paginación en el cliente
  const totalItems = searchedProds.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Segmentamos el array plano en memoria para extraer solo los de la página activa
  const paginatedProds = searchedProds.slice(startIndex, endIndex);

  // 🌟 3. Función para cambiar de página modificando la URL
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setSearchParams({ page: newPage });
    }
  };

  // 🌟 4. Efecto de seguridad por si eliminás el último elemento de una página
  useEffect(() => {
    if (paginatedProds.length === 0 && currentPage > 1) {
      setSearchParams({ page: (currentPage - 1).toString() });
    }
  }, [paginatedProds.length, currentPage, setSearchParams]);

  return (
    <>
      {/* Retorna la render-prop inyectando el pedazo de array recortado */}
      <div>{children(paginatedProds)}</div>
      
      {totalItems > itemsPerPage && (
        <div className="flex flex-row justify-center items-center gap-4 mt-6">
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 text-xs w-18"
          >
            ◀ Prev
          </Button>

          <span className="text-xs font-medium text-gray-600">
            Page {currentPage} of {totalPages}
          </span>

          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-xs w-18"
          >
            Next ▶
          </Button>
        </div>
      )}
    </>
  );
};