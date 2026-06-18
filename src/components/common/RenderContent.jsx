import { useState, useEffect } from "react";
import { Spinner } from "./Spinner";
import { ErrorMessage } from "./ErrorMessage";

export const RenderContent = ({ loading, error, data, children, time = 0 }) => {
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    let timer;
    if (loading) {
      setShowSpinner(true);
    } else {
      // Si la carga finaliza, esperamos el valor de time (ms) antes de ocultar el spinner
      // para evitar parpadeos visuales en cargas muy rápidas.
      timer = setTimeout(() => {
        setShowSpinner(false);
      }, time);
    }
    return () => clearTimeout(timer);
  }, [loading]);

  if (error) return <ErrorMessage message={error} />;

  // Si estamos cargando o en el periodo de espera del spinner, mostramos el Spinner
  if (showSpinner) return <Spinner />;

  const hasData = Array.isArray(data)
    ? data.length > 0
    : data !== null && data !== undefined;

  return hasData ? children : null;
};
