import { useSearchParams } from "react-router-dom";
import { Button } from "./Button";

export const Pagination = ({ totalPages, hasMoreServer }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const handlePageChange = (newPage) => {
    if (newPage >= 1) {
      setSearchParams({ page: newPage });
    }
  };

  // Si es la página 1 y el servidor te dice que tampoco hay más páginas adelante, ocultamos los controles
  if (currentPage === 1 && !hasMoreServer) return null;

  // 🔒 CONTROL DE SEGURIDAD: Si por un error de redondeo la página actual supera el total,
  // mostramos el total real para que el usuario nunca vea un "6 de 5".
  const displayedTotalPages = currentPage > totalPages ? currentPage : totalPages;

  return (
    <div className="flex flex-row justify-center items-center gap-4 mt-6 w-full">
      <Button
        variant="outline"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 text-xs rounded-sm w-18"
      >
        ◀ Prev
      </Button>

      <span className="text-xs font-medium text-gray-600">
        Page {currentPage} of {displayedTotalPages}
      </span>

      <Button
        variant="outline"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!hasMoreServer || currentPage >= displayedTotalPages} // 🚀 Bloquea el "Next" si ya llegamos al tope real
        className="px-3 py-1 text-xs rounded-sm w-18"
      >
        Next ▶
      </Button>
    </div>
  );
};



















// // src/components/common/Pagination.jsx
// import { useSearchParams } from "react-router-dom";
// import { Button } from "./Button";

// export const Pagination = ({ totalPages, hasMoreServer }) => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const currentPage = parseInt(searchParams.get("page") || "1", 10);

//   const handlePageChange = (newPage) => {
//     if (newPage >= 1) {
//       setSearchParams({ page: newPage });
//     }
//   };

//   // Si es la página 1 y el servidor te dice que tampoco hay más páginas adelante, ocultamos los controles
//   if (currentPage === 1 && !hasMoreServer) return null;

//   return (
//     <div className="flex flex-row justify-center items-center gap-4 mt-6 w-full">
//       <Button
//         variant="outline"
//         onClick={() => handlePageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//         className="px-3 py-1 text-xs rounded-sm"
//       >
//         ◀ Previous
//       </Button>

//       <span className="text-xs font-medium text-gray-600">
//         Page {currentPage} {hasMoreServer ? "" : "(Last)"}
//       </span>

//       <Button
//         variant="outline"
//         onClick={() => handlePageChange(currentPage + 1)}
//         disabled={!hasMoreServer}
//         className="px-3 py-1 text-xs rounded-sm"
//       >
//         Next ▶
//       </Button>
//     </div>
//   );
// };

