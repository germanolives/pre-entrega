import { doc, runTransaction } from "firebase/firestore";
import { db } from "../config/firebase";

export const checkoutSecureInventory = async (cartItems) => {
  try {
    await runTransaction(db, async (transaction) => {
      
      // 1. PRIMER PASO OBLIGATORIO: Leer TODOS los productos frescos
      const reads = cartItems.map(async (item) => {
        const productRef = doc(db, "products", item.id);
        const docSnap = await transaction.get(productRef);
        
        if (!docSnap.exists()) {
          throw new Error(`El producto con ID ${item.id} no existe.`);
        }
        
        return {
          ref: productRef,
          title: docSnap.data().title,
          dbStock: Number(docSnap.data().stock || 0),
          cartQty: Number(item.quantity)
        };
      });

      const productRecords = await Promise.all(reads);

      // 2. SEGUNDO PASO: Validar el stock de todo el listado en caliente
      for (const record of productRecords) {
        if (record.dbStock < record.cartQty) {
          throw new Error(`Disculpas, nos quedamos sin stock de: ${record.title}`);
        }
      }

      // 3. TERCER PASO: Si todo está OK, aplicamos las escrituras en lote
      productRecords.forEach((record) => {
        transaction.update(record.ref, {
          stock: record.dbStock - record.cartQty
        });
      });
    });

    return { success: true };
  } catch (error) {
    console.error("La compra se detuvo por control de inventario:", error);
    return { success: false, error: error.message };
  }
};