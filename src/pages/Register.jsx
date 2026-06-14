import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/common/Button";
import { validateLocalEmail } from "../utils/validateLocalEmail";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState(""); // 🌟 Estado para la primera clave
  const [passwordTwo, setPasswordTwo] = useState(""); // 🌟 Estado para la repetición
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLoginRedirect, setShowLoginRedirect] = useState(false);

  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setShowLoginRedirect(false);

    if (!validateLocalEmail(email)) {
      setError("LOCAL: EL FORMATO DEL CORREO ELECTRÓNICO NO ES VÁLIDO.");
      return;
    }

    // 🔒 VALIDACIÓN LOCAL 1: Controlar la longitud mínima antes de viajar a Firebase
    if (passwordOne.length < 6) {
      setError("LOCAL: LA CONTRASEÑA DEBE TENER AL MENOS 6 CARACTERES.");
      return;
    }

    // 🔒 VALIDACIÓN LOCAL 2: Verificar que ambas claves coincidan
    if (passwordOne !== passwordTwo) {
      setError("LOCAL: LAS CONTRASEÑAS NO COINCIDEN.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 🚀 Ahora sí, enviamos 'passwordOne' que está validada y limpia
      await signup(email.trim(), passwordOne);
      navigate("/");
    } catch (err) {
      console.error("Error capturado en el registro:", err.code, err.message);

      if (err.code === "auth/email-already-in-use") {
        setError("ESTE CORREO ELECTRÓNICO YA ESTÁ REGISTRADO.");
        setShowLoginRedirect(true);
      } else if (err.code === "auth/weak-password") {
        setError("LA CONTRASEÑA ES MUY DÉBIL. MÍNIMO 6 CARACTERES.");
      } else if (err.code === "auth/invalid-email") {
        setError("EL FORMATO DEL CORREO ELECTRÓNICO NO ES VÁLIDO.");
      } else {
        setError("OCURRIÓ UN ERROR AL REGISTRAR EL USUARIO. INTENTE NUEVAMENTE.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex flex-col mx-4 justify-center items-center border-2 border-gray-300 rounded-xl p-8">
      <div className="w-full max-w-sm p-6 bg-green-200 border border-gray-300 rounded-sm shadow-md">
        <h2 className="text-sm font-bold text-gray-900 uppercase font-mono mb-4 text-center">
          Create a new account
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-gray-500 text-xxs font-mono uppercase">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-400 p-2 rounded-sm text-xs focus:outline-cyan-600 bg-gray-50"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-500 text-xxs font-mono uppercase">Password</label>
            <input
              type="password"
              value={passwordOne} // 🌟 CORREGIDO: Enlazado a passwordOne
              onChange={(e) => setPasswordOne(e.target.value)}
              required
              placeholder="Minimum 6 characters"
              className="border border-gray-400 p-2 rounded-sm text-xs focus:outline-cyan-600 bg-gray-50"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-500 text-xxs font-mono uppercase">Repeat Password</label>
            <input
              type="password"
              value={passwordTwo} // 🌟 CORREGIDO: Enlazado a passwordTwo
              onChange={(e) => setPasswordTwo(e.target.value)}
              required
              placeholder="Minimum 6 characters"
              className="border border-gray-400 p-2 rounded-sm text-xs focus:outline-cyan-600 bg-gray-50"
            />
          </div>

          {error && (
            <div className="text-red-600 text-xxs font-mono bg-red-50 p-2 border border-red-200 rounded-sm flex flex-col gap-2">
              <p>{error}</p>

              {showLoginRedirect && (
                <div className="flex gap-2 mt-1">
                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="bg-red-600 text-white px-2 py-1 rounded-sm font-bold uppercase text-[9px] hover:bg-red-700 cursor-pointer"
                  >
                    Ir al Login
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="border border-red-400 text-red-700 px-2 py-1 rounded-sm font-bold uppercase text-[9px] hover:bg-red-100 cursor-pointer"
                  >
                    Volver al Inicio
                  </button>
                </div>
              )}
            </div>
          )}

          <Button
            type="submit"
            variant={isSubmitting ? "outline" : "primary"}
            className="w-full py-2 rounded-sm font-bold uppercase text-xs mt-2"
            disabled={isSubmitting || showLoginRedirect}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </Button>
        </form>
      </div>
    </section>
  );
};