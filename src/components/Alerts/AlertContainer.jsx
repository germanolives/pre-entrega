import { useAlert } from "../../context/AlertContext";
import { AlertList } from "./AlertList";

export const AlertContainer = () => {
  const { alerts } = useAlert();

  return (
    // Contenedor posicionado fijo para que flote sobre todo lo demás
    <div className="fixed top-4 right-4 z-200 flex flex-col gap-2 pointer-events-none">
      <AlertList data={alerts} />
    </div>
  );
};
