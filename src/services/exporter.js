import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

export const exportCatalogToJson = async () => {
  console.log("🚀 Iniciando la descarga del catálogo desde Firestore...");

  try {
    // 1. Apuntamos a la colección de productos
    const productsCollectionRef = collection(db, "products");
    
    // 2. Traemos todos los documentos de golpe
    const querySnapshot = await getDocs(productsCollectionRef);

    if (querySnapshot.empty) {
      alert("La colección de productos está vacía en Firestore.");
      return;
    }

    // 3. Mapeamos los documentos para armar el array con la estructura limpia
    const productsList = querySnapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: data.id || doc.id, // Usamos el id interno o el de la dirección por las dudas
        code: data.code || "",  // Tu código de negocio original (el ID viejo del JSON)
        title: data.title || "",
        titleSlug: data.titleSlug || "",
        price: Number(data.price || 0),
        description: data.description || "",
        category: data.category || "",
        categorySlug: data.categorySlug || "",
        image: data.image || "",
        rating: {
          rate: Number(data.rating?.rate || 0),
          count: Number(data.rating?.count || 0),
        },
        offers: data.offers || [],
        stock: Number(data.stock || 0),
      };
    });

    // 4. 🛠️ TRUCO MAGISTRAL: Convertimos el array a un string de JSON formateado e identado
    // El 'null, 2' hace que el JSON se guarde con saltos de línea y espacios limpios (fácil de leer)
    const jsonString = JSON.stringify(productsList, null, 2);

    // 5. Creamos un archivo en la memoria del navegador (Blob) de tipo JSON
    const blob = new Blob([jsonString], { type: "application/json" });

    // 6. Generamos un enlace oculto en el DOM para forzar la descarga en la computadora
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    
    link.href = downloadUrl;
    link.download = "products_backup.json"; // El nombre que va a tener tu archivo descargado
    
    // Añadimos el link al documento, lo clickeamos programáticamente y lo removemos al toque
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Liberamos la memoria del navegador revocando la URL temporal
    URL.revokeObjectURL(downloadUrl);

    console.log(`🎉 ¡Exportación exitosa! Se descargaron ${productsList.length} productos.`);
    alert(`Se generó correctamente "products_backup.json" con ${productsList.length} repuestos.`);

  } catch (error) {
    console.error("❌ Error al exportar el catálogo de Firestore:", error);
    alert("Hubo un error al exportar los datos. Revisá la consola.");
  }
};