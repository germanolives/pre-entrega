import { Button } from "./Button";
import * as Icons from "../Icons";
import { useLocation } from "react-router-dom";


export const ScrollControllsWithWhatsapp = () => {
  const location = useLocation();

  const scrollToUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const scrollToDown = () => {
    const height = document.documentElement.scrollHeight;
    window.scrollTo({ top: height, behavior: "smooth" });
  };

  const isDashboard = location.pathname.includes("/dashboard");

  return (
    // 🚀 El contenedor ahora se posiciona de manera fija, pero manejamos el layout interno de forma relativa
    <div className="fixed bottom-5 right-4.5 z-50 flex flex-col items-center">
      
      {/* 🟢 WhatsApp Flotante Independiente: 
          Si no es el dashboard, lo pintamos con absolute desplazado hacia arriba (bottom-full mb-2).
          De esta forma, cuando desaparece, los botones de abajo ni se enteran y no se mueven un milímetro. */}
      {!isDashboard && (
        <div className="absolute bottom-full mb-2 opacity-70 hover:opacity-100 transition-opacity">
          <a
            href="https://wa.me/5493575123456?text=Hello,%20I'm%20comming%20from%20the%20web"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <Icons.WhatsAppIcon className="bg-green-600 w-8 h-8 text-white p-1 rounded-sm shadow-md" />
          </a>
        </div>
      )}

      {/* 📦 Caja de control de Scroll: Su tamaño es rígido y constante */}
      <div className="flex flex-col border-2 border-gray-300 rounded-sm bg-white shadow-sm">
        <Button className="opacity-50 hover:opacity-100 transition-opacity p-1" variant="ghost" onClick={scrollToUp}>
          🔼
        </Button>
        <div className="border-t border-gray-200" /> {/* Opcional: una liñita divisoria sutil */}
        <Button className="opacity-50 hover:opacity-100 transition-opacity p-1" variant="ghost" onClick={scrollToDown}>
          🔽
        </Button>
      </div>
    </div>
  );
};