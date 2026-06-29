import { useMemo } from "react";
import { IntroItemList } from "./IntroItemList";
import { RenderContent } from "../common/RenderContent";
import { useQuery } from "../../hooks/useQuery";
import { introProds } from "../../data/config/introProds";

export const Intro = () => {
  
  // 🔒 Guardamos los 10 IDs aleatorios en memoria para que no cambien en cada render
  const { introList } = useMemo(() => {
    const shuffled = JSON.parse(JSON.stringify(introProds));

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const selected = shuffled.slice(0, 10);
    const listIds = selected.map((item) => String(item.id));

    return {
      introList: listIds,
    };
  }, []);

  // 🎯useQuery recibe la lista fija de IDs aleatorios y descarga el bloque masivo de Firestore
  const { data, loading, error } = useQuery(
    null,
    null,
    null,
    introList
  );

  return (
    <section className="mx-4 border-2 border-gray-300 rounded-xl p-8 min-h-112.5 flex flex-col justify-center">
      
      <RenderContent loading={loading} error={error} data={data} time={150}>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-5 w-full">
          <IntroItemList data={data} />
        </div>
        
      </RenderContent>
    </section>
  );
};