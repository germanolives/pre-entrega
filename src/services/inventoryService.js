/* 
  📂 src/services/inventoryService.js
  Lógica pura de conexión con la base de datos para Inventario y Stock.
*/
import { writeBatch, doc, increment } from "firebase/firestore";
import { db } from "../config/firebase";

/**
 * Actualiza el stock de un listado de productos en un solo lote atómico (Batch).
 * @param {Array} cartItems - Lista de productos del carrito con id y quantity.
 * @returns {Promise<{success: boolean, error?: any}>}
 */
export const updateCartInventory = async (cartItems) => {
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return { success: false, error: "El carrito está vacío." };
  }

  const batch = writeBatch(db);

  cartItems.forEach((item) => {
    const productRef = doc(db, "products", item.id);
    
    // 🔒 Sanitización preventiva con Number por el tipado de strings
    const qtyToReduce = Number(item.quantity || 0);

    batch.update(productRef, {
      stock: increment(-qtyToReduce)
    });
  });

  try {
    await batch.commit();
    return { success: true };
  } catch (error) {
    console.error("Error en el Batch de inventario:", error);
    return { success: false, error };
  }
};