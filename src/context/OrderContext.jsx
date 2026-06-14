// import { useState, useContext, createContext, useEffect } from "react";

// export const OrderContext = createContext();

// export const useOrder = () => {
//   const context = useContext(OrderContext);
//   if (!context) {
//     throw new Error("useOrder debe ser usado dentro de un OrderProvider");
//   }
//   return context;
// };

// export const OrderProvider = ({ children }) => {
//   const [order, setOrder] = useState(() => {
//     const localData = localStorage.getItem("order");

//     if (!localData) {
//       return [
//         { field: "code", asc: true },
//         { field: "title", asc: true },
//         { field: "category", asc: true },
//         { field: "price", asc: true },
//         { field: "stock", asc: true },
//       ];
//     }

//     try {
//       return JSON.parse(localData);
//     } catch (error) {
//       console.warn(
//         "Se detectó un almacenamiento de búsqueda corrupto. Limpiando...",
//       );
//       localStorage.removeItem("order");
//       return [
//         { field: "code", asc: true },
//         { field: "title", asc: true },
//         { field: "category", asc: true },
//         { field: "price", asc: true },
//         { field: "stock", asc: true },
//       ];
//     }
//   });

//   useEffect(() => {
//     localStorage.setItem("order", JSON.stringify(order));
//   }, [order]);

//   const changeOrder = (option) => {
//     const newOrder = order.map((item) =>
//       item.field === String(option) ? { ...item, asc: !item.asc } : { ...item },
//     );
//     setOrder(newOrder);
//   };


//   return (
//     <OrderContext.Provider
//       value={{
//         order,
//         changeOrder,
//       }}
//     >
//       {children}
//     </OrderContext.Provider>
//   );
// };
