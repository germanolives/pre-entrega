import { createContext, useState, useContext, useEffect } from "react";
// 🌟 CORREGIDO: Imports específicos y limpios de Firebase Auth
import {
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// 🌟 CORREGIDO: Separamos e importamos los métodos nativos de Firestore
import { doc, getDoc, setDoc } from "firebase/firestore"; // 🌟 Agregamos 'setDoc'
import { auth, db } from "../config/firebase"; // 💡 NOTA: Idealmente traelos de tu archivo de config centralizado

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Funciones del ABM de Autenticación
  const signup = async (email, password) => {
    // 1. Creamos el usuario en Firebase Auth primero
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const newAuthUser = userCredential.user;

    // 2. Apuntamos a la colección "usuarios", nombrando al documento EXACTAMENTE como el uid de Auth
    const userDocRef = doc(db, "users", newAuthUser.uid);

    // 3. Guardamos los metadatos iniciales y el rol por defecto
    await setDoc(userDocRef, {
      email: newAuthUser.email,
      rol: "user", // 👮‍♂️ Todos nacen como usuario regular. Si querés un admin, lo cambiás a mano en la consola.
      createdAt: new Date().toISOString(),
    });

    return userCredential;
  };
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth); // 🌟 Retornamos la promesa del signOut por si querés usar un .then() en la UI
  };

  useEffect(() => {
    // onAuthStateChanged es el observador en tiempo real de Firebase
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser) {
          // Si hay un usuario, vamos a buscar su rol asignado en Firestore
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            // Inyectamos todas las propiedades del documento (incluido el rol) junto al usuario de Auth
            setUser({ ...currentUser, ...userData });
          } else {
            // Si el documento no existe por defecto le asignamos rol regular
            setUser({ ...currentUser, rol: "user" });
          }
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Error crítico al recuperar el rol del usuario:", err);
        setUser(null);
      } finally {
        // Garantizamos que el estado de carga termine pase lo que pase
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}{" "}
      {/* 🌟 Dejamos que renderice libre, el loading lo maneja el router o las pantallas */}
    </AuthContext.Provider>
  );
};
