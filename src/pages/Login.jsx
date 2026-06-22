import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/common/Button";
import { validateLocalEmail } from "../utils/validateLocalEmail";
import { Helmet } from "react-helmet-async";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pendingNav, setPendingNav] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const { login, user, loading } = useAuth();

  useEffect(() => {
    if (pendingNav && user && !loading) {
      navigate(pendingNav, { replace: true });
      setPendingNav(null);
    }
  }, [pendingNav, user, loading, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setIsSubmitting(true);

    if (!validateLocalEmail(email)) {
      setErrorMsg("LOCAL: EL FORMATO DEL CORREO ELECTRÓNICO NO ES VÁLIDO.");
      setIsSubmitting(false);
      return;
    }

    try {
      await login(email, password);
      setPendingNav(from);
    } catch (error) {
      console.error("Error capturado en componente Login:", error.code);

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
      <Helmet>
        <title>Login | Tienda S.A.U.</title>
        <meta
          name="description"
          content="Access your Tienda S.A.U. account to track orders, manage your profile, and enjoy a personalized shopping experience. Sign in securely."
        />
      </Helmet>
      <div className="w-full max-w-sm p-6 bg-blue-100 border border-gray-300 rounded-sm shadow-sm">
        <h2 className="text-sm font-bold text-gray-900 uppercase mb-4 text-center">
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

          {errorMsg && (
            <p className="text-red-600 text-xxs bg-red-50 p-2 border border-red-200 rounded-sm">
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
