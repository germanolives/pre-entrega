import { useEffect } from "react";
import { useModal } from "../../context/ModalContext";
import { Button } from "./Button";

export const Modal = () => {
  const { isOpen, closeModal, modalContent } = useModal();

  
  // Gestión profesional del scroll
  useEffect(() => {
    if (isOpen) {
      // Bloqueamos el scroll del body cuando el modal abre
      document.body.style.overflow = "hidden";
    } else {
      // Restauramos el scroll al cerrar
      document.body.style.overflow = "unset";
    }
    
    // Limpieza: aseguramos que el scroll se desbloquee al desmontar
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);
  
  if (!isOpen) return null;

  return (
    // Máscara oscura (Overlay) - Cierra el modal si se hace clic en el fondo
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-gray-900/80 p-4"
      onClick={closeModal}
    >
      {/* Contenedor del contenido - stopPropagation evita que se cierre al hacer clic adentro */}
      <div
        className="bg-gray-200 p-6 rounded-xl shadow-2xl w-full max-w-md relative animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón de cierre */}
        <Button
        variant="ghost"
          onClick={closeModal}
          className="absolute top-2 right-4 text-gray-500 hover:text-red-500 text-2xl pb-0.5 px-2  font-bold transition-colors"
          aria-label="Close modal"
        >
          &times;
        </Button>

        {/* Contenido dinámico */}
        <div className="mt-2">
          {modalContent}
        </div>
      </div>
    </div>
  );
};