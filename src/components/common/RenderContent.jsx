import { useState, useEffect } from "react";
import { Spinner } from "./Spinner";
import { ErrorMessage } from "./ErrorMessage";

export const RenderContent = ({ loading, error, data, children, time = 0 }) => {
  const [isDelayingActive, setIsDelayingActive] = useState(false);

  // 🔄 Controlamos el delay de apagado de forma limpia
  useEffect(() => {
    let timer;
    if (loading) {
      setIsDelayingActive(true);
    } else {
      // Al terminar la carga, esperamos los milisegundos indicados antes de liberar la pantalla
      timer = setTimeout(() => {
        setIsDelayingActive(false);
      }, time);
    }
    return () => clearTimeout(timer);
  }, [loading, time]);

  // 🛡️ CONTROL DE ERRORES: Si hay un fallo de red, se muestra de inmediato
  if (error) return <ErrorMessage message={error} />;

  // 🚨 DERIVACIÓN SÍNCRONA CRÍTICA:
  // Si la prop 'loading' viene en true en el segundo cero, mostramos el spinner EN EL ACTO.
  // No esperamos a que el useEffect cambie ningún estado local en el próximo frame.
  if (loading || isDelayingActive) {
    return (
      <div className="flex justify-center items-center min-h-100 w-full">
        <Spinner />
      </div>
    );
  }

  // 📦 Verificación final de datos consolidados
  const hasData = Array.isArray(data)
    ? data.length > 0
    : data !== null && data !== undefined;

  return hasData ? children : null;
};