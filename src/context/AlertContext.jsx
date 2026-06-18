import { createContext, useContext, useState } from "react";
import { ALERT_MESSAGES } from "../utils/alertMessages";
import { idGenerator } from "../utils/idGenerator";

const AlertContext = createContext();

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert debe ser usado dentro de un AlertProvider");
  }
  return context;
};

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const addAlert = (key) => {
    // 1. Aquí importarás tu ALERT_MESSAGES
    // 2. Creas el objeto de alerta con un ID único
    // 3. Lo agregas al estado 'alerts'
    // 4. Disparas el setTimeout para eliminarlo automáticamente
    const alertData = ALERT_MESSAGES[key];

    if (!alertData) {
      console.warn(`Alert key "${key}" not found in ALERT_MESSAGES`);
      return;
    }

    const id = idGenerator();
    const newAlert = { id, ...alertData };

    setAlerts((prev) => [...prev, newAlert]);

    // Auto-destrucción después de 3 segundos
    setTimeout(() => {
      removeAlert(id);
    }, 3000);
  };

  const removeAlert = (id) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  return (
    <AlertContext.Provider value={{ alerts, addAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
