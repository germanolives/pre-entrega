import { useParams } from "react-router-dom";
import { DashboardItemContainer } from "../components/Dashboard/DashboardItemContainer";
import { RenderContent } from "../components/common/RenderContent";
import { useInventory } from "../context/InventoryContext";
import { useMemo } from "react";

export const DashboardDetail = () => {
  // 1. Capturamos el ID del repuesto desde la URL
  const { categorySlug, titleSlug, id } = useParams();
  
  // 2. Traemos el catálogo completo (en memoria) y los estados de carga
  const { data: allProducts, loading, error } = useInventory();

  // 3. 🚀 Buscamos el producto específico de forma local usando su ID
  const singleProduct = useMemo(() => {
    if (loading || error || !Array.isArray(allProducts)) return null;
    
    // Buscamos quirúrgicamente la pieza en el array en memoria
    return allProducts.find((item) => item.id === id) || null;
  }, [allProducts, loading, error, id]);

  // Manejo de error manual por si el ID escrito en la URL no existe en el catálogo
  const customError = !loading && !error && !singleProduct 
    ? "El repuesto solicitado no existe en el inventario." 
    : error;

  return (
    <section
      className={`mx-4 md:mx-15 border-2 border-gray-300 rounded-xl p-8 flex justify-center items-center`}
    >
      {/* 4. Le pasamos singleProduct al renderizador y al formulario */}
      <RenderContent loading={loading} error={customError} data={singleProduct}>
        <DashboardItemContainer data={singleProduct} />
      </RenderContent>
    </section>
  );
};