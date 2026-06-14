import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/common/Button"; // Usando tu botón genérico
import { validateLocalEmail } from "../utils/validateLocalEmail";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(""); // 🌟 Estado local para mostrar errores en pantalla (sin alerts molestos)
  const [isSubmitting, setIsSubmitting] = useState(false); // Evita doble clicks asincrónicos

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setIsSubmitting(true);

    if (!validateLocalEmail(email)) {
      setError("LOCAL: EL FORMATO DEL CORREO ELECTRÓNICO NO ES VÁLIDO.");
      return;
    }
    setIsSubmitting(true);
    try {
      // 🚀 Ejecutamos el login a través de tu contexto centralizado
      await login(email, password);

      // Si el contexto resuelve con éxito, el observador cambia el estado 'user' global
      // y nos manda derecho al panel principal o al Home.
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Error capturado en componente Login:", error.code);

      // 🛡️ Mapeo semántico de errores (Adaptado a Firebase v10+)
      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        setErrorMsg("El correo electrónico o la contraseña son incorrectos.");
      } else if (error.code === "auth/too-many-requests") {
        setErrorMsg(
          "Demasiados intentos fallidos. Cuenta bloqueada temporalmente.",
        );
      } else if (error.code === "auth/invalid-email") {
        setErrorMsg("El formato del correo electrónico es inválido.");
      } else {
        setErrorMsg("Ocurrió un error inesperado. Intente más tarde.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex flex-col mx-4 justify-center items-center border-2 border-gray-300 rounded-xl p-8">
      <div className="w-full max-w-sm p-6 bg-blue-100 border border-gray-300 rounded-sm shadow-sm">
        <h2 className="text-sm font-bold text-gray-900 uppercase font-mono mb-4 text-center">
          My Account
        </h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-400 p-2 rounded-sm text-xs focus:outline-cyan-600 bg-gray-50"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-gray-400 p-2 rounded-sm text-xs focus:outline-cyan-600 bg-gray-50"
          />

          {/* ⚠️ Alerta de error visual estilizada */}
          {errorMsg && (
            <p className="text-red-600 text-xxs font-mono bg-red-50 p-2 border border-red-200 rounded-sm">
              {errorMsg.toUpperCase()}
            </p>
          )}

          <Button
            type="submit"
            variant="primary"
            className="w-full py-2 rounded-sm font-bold uppercase text-xs mt-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging In ..." : "Login"}
          </Button>
        </form>
      </div>
    </section>
  );
};
