import { useState, useEffect } from "react";
import { IntroItemList } from "./IntroItemList";
import { RenderContent } from "../common/RenderContent";
import { useProducts } from "../../context/ProductsContext";

export const Intro = () => {
  const { data, loading, error } = useProducts();
  const [selectedProds, setSelectedProds] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      // 1. Clonamos de forma segura usando JSON parse/stringify o estructuración profunda
      const shuffled = JSON.parse(JSON.stringify(data));
      
      // 2. Algoritmo puro Fisher-Yates (Sin sesgos, mezcla total)
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }

      // 3. Tomamos los primeros 10 elementos ya desordenados
      setSelectedProds(shuffled.slice(0, 10));
    }
  }, [data]);

  return (
    <section
      className={`mx-4 border-2 border-gray-300 rounded-xl p-8 ${
        loading ? "flex justify-center items-center" : ""
      }`}
    >
      <RenderContent loading={loading} error={error} data={selectedProds}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-5 w-full">
          <IntroItemList data={selectedProds} />
        </div>
      </RenderContent>
    </section>
  );
};