import { useMemo } from "react";
import { IntroItemList } from "./IntroItemList";
import { RenderContent } from "../common/RenderContent";
import { useQuery } from "../../hooks/useQuery";
import { introProds } from "../../data/config/introProds";

export const Intro = () => {
  
  // 🚀 Guardamos los 10 IDs aleatorios en memoria para que no cambien en cada render
  const { introList } = useMemo(() => {
    // 1. Clonamos de forma segura
    const shuffled = JSON.parse(JSON.stringify(introProds));

    // 2. Algoritmo puro Fisher-Yates (Se ejecuta SOLO una vez al montar)
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // 3. Tomamos los primeros 10 elementos ya desordenados
    const selected = shuffled.slice(0, 10);
    const listIds = selected.map((item) => String(item.id));

    return {
      introList: listIds,
    };
  }, []); // 🔒 Array vacío = Solo calcula al nacer el componente

  // 🎯 Ahora useQuery recibe una referencia fija de IDs y no entra en bucle
  const { data, loading, error } = useQuery(
    null,
    null,
    null,
    introList
  );

  return (
    <section
      className={`mx-4 border-2 border-gray-300 rounded-xl p-8 ${
        loading ? "flex justify-center items-center" : ""
      }`}
    >
      {/* Pasamos 'data' (la de Firebase) para que RenderContent evalúe correctamente el estado */}
      <RenderContent loading={loading} error={error} data={data}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-5 w-full">
          <IntroItemList data={data} />
        </div>
      </RenderContent>
    </section>
  );
};