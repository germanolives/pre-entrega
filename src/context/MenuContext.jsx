import { useState, useContext, createContext } from "react";

const MenuContext = createContext();

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu debe ser usado dentro de un MenuProvider");
  }
  return context;
};

export const MenuProvider = ({ children }) => {
  const [menu, setMenu] = useState(false);
  const menuChange = () => setMenu((prev) => !prev);
  const closeMenu = () => setMenu(false);

  return (
    <MenuContext.Provider value={{ menu, menuChange, closeMenu }}>
      {children}
    </MenuContext.Provider>
  );
};
