import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import jsonProducts from "../../public/data/products.json";

export const migrateCatalogToFirebase = async () => {
  console.log("🚀 Starting the migration (Injected Auto-IDs)...");
  let uploaded = 0;

  try {
    for (const product of jsonProducts) {
      // 1. Creamos una referencia de documento vacía. Firestore genera el ID al toque en memoria.
      const newDocRef = doc(collection(db, "products"));

      // 2. Ahora 'newDocRef.id' ya contiene el string alfanumérico aleatorio (ej: "8gKlds23a")
      await setDoc(newDocRef, {
        id: newDocRef.id, // 👈 ¡MAGIA! El ID de la base de datos queda guardado adentro del producto
        code: String(product.id),
        title: product.title,
        titleSlug: product.titleSlug,
        price: Number(product.price),
        description: product.description,
        category: product.category,
        categorySlug: product.categorySlug,
        image: product.image,
        rating: {
          rate: Number(product.rating?.rate || 0),
          count: Number(product.rating?.count || 0),
        },
        offers: product.offers || [],
        stock: Number(product.stock),
      });

      uploaded++;
      console.log(`✅ [${uploaded}/${jsonProducts.length}] Uploaded: ${product.title} -> ID: ${newDocRef.id}`);
    }
    console.log("🎉 Migration completed!");
  } catch (error) {
    console.error("❌ Error:", error);
  }
};





// import { doc, setDoc } from "firebase/firestore";
// import { db } from "../config/firebase";
// import jsonProducts from "../../public/data/products.json";

// export const migrateCatalogToFirebase = async () => {
//   console.log("🚀 Starting the migration of spare parts to Firestore...");

//   let uploaded = 0;

//   try {
//     for (const product of jsonProducts) {
//       // Usamos setDoc y doc() para forzar a Firebase a usar el ID de tu JSON
//       const referenceDoc = doc(db, "products", String(product.id));

//       // Subimos los datos estructurados igual que tu JSON
//       await setDoc(referenceDoc, {
//         title: product.title,
//         titleSlug: product.titleSlug,
//         price: Number(product.price),
//         description: product.description,
//         category: product.category,
//         categorySlug: product.categorySlug,
//         image: product.image,
//         rating: {
//           rate: Number(product.rating?.rate || 0),
//           count: Number(product.rating?.count || 0),
//         },
//         offers: product.offers || [],
//         stock: Number(product.stock),
//       });

//       uploaded++;

//       console.log(
//         `✅ [${uploaded}/${jsonProducts.length}] Uploaded: ${product.title}`,
//       );
//     }

//     console.log("🎉 Migration completed successfully!");
//     alert(`${uploaded} products were migrated to your Firestore account.`);
//   } catch (error) {
//     console.error("❌ Error during migration:", error);
//     alert("There was an error migrating the data. Check the console.");
//   }
// };
