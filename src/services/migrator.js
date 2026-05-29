import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import jsonProducts from "../../public/data/products.json";

export const migrateCatalogToFirebase = async () => {
  console.log("🚀 Starting the migration of spare parts to Firestore...");

  let uploaded = 0;

  try {
    for (const product of jsonProducts) {
      // Usamos setDoc y doc() para forzar a Firebase a usar el ID de tu JSON
      const referenceDoc = doc(db, "products", String(product.id));

      // Subimos los datos estructurados igual que tu JSON
      await setDoc(referenceDoc, {
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

      console.log(
        `✅ [${uploaded}/${jsonProducts.length}] Uploaded: ${product.title}`,
      );
    }

    console.log("🎉 Migration completed successfully!");
    alert(`${uploaded} products were migrated to your Firestore account.`);
  } catch (error) {
    console.error("❌ Error during migration:", error);
    alert("There was an error migrating the data. Check the console.");
  }
};
