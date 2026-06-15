import { createContext, useState, useContext, useEffect } from "react";
import { Spinner } from "../components/common/Spinner";
import {
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";

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

  // Funciones de Auth
  const signup = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const newAuthUser = userCredential.user;
    const userDocRef = doc(db, "users", newAuthUser.uid);

    await setDoc(userDocRef, {
      email: newAuthUser.email,
      rol: "user",
      createdAt: new Date().toISOString(),
    });

    return userCredential;
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          setUser({ ...currentUser, ...userDocSnap.data() });
        } else {
          setUser({ ...currentUser, rol: "user" });
        }
      } catch (err) {
        console.error("Error cargando rol:", err);
      } finally {
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
      {/* Si el loading es true, mostramos el spinner.
         Si es false, renderizamos la app (children).
      */}
      {loading ? (
        // <div className="flex justify-center items-center h-screen">Cargando...</div>
        <Spinner />
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};