import { useEffect } from "react";

export const Modal = ({ isOpen, onClose, title, children }) => {
  // Bloquear el scroll de la página de fondo cuando el modal esté abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={onClose} // Cierra al hacer clic en el fondo oscuro
    >
      {/* Caja del Modal */}
      <div
        className="bg-white rounded-sm border border-gray-300 shadow-2xl w-full max-w-md flex flex-col overflow-hidden animate-scale-up"
        onClick={(e) => e.stopPropagation()} // Evita que se cierre al hacer clic adentro
      >
        {/* Cabecera del Modal */}
        <div className="flex items-center justify-between p-3 bg-gray-100 border-b border-gray-200">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors text-sm font-mono leading-none p-1"
          >
            ❎
          </button>
        </div>

        {/* Cuerpo del Modal */}
        <div className="p-4 text-xs text-blue-700 grow bg-gray-50/50">
          {children}
        </div>
      </div>
    </div>
  );
};
