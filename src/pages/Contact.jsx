import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { db } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import emailjs from "@emailjs/browser";
import { useAuth } from "../context/AuthContext";
import { capitalize } from "../utils/capitalize";

export const Contact = () => {
  const { user } = useAuth();

  // 🌟 Inicializamos el formulario. Si hay un usuario logueado, pre-cargamos sus datos de forma nativa
  const [formData, setFormData] = useState({
    name:
      user?.firstName && user?.surname
        ? capitalize(`${user.firstName} ${user.surname}`)
        : "",
    email: user?.email ? user.email : "",
    subject: "",
    message: "",
  });

  const [honeypot, setHoneypot] = useState("");
  const [loadTime, setLoadTime] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Sincronizamos el formulario si el usuario se loguea o cambia el estado asincrónicamente
  useEffect(() => {
    setLoadTime(Date.now());

    if (user) {
      // 🔐 Si el usuario inicia sesión, precargamos sus datos
      setFormData((prev) => ({
        ...prev,
        name:
          user.firstName && user.surname
            ? capitalize(`${user.firstName} ${user.surname}`)
            : prev.name,
        email: user.email ? user.email : prev.email,
      }));
    } else {
      // 🔓 Si el usuario se desloguea (user es null), limpiamos los campos Name y Email
      setFormData((prev) => ({
        ...prev,
        name: "",
        email: "",
      }));
    }
  }, [user]); // 🌟 Al tener [user] en las dependencias, esto se ejecuta CADA vez que el estado de autenticación cambia

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (honeypot.length > 0) {
      setSubmitted(true);
      setIsSubmitting(false);
      return;
    }

    const timeDifference = (Date.now() - loadTime) / 1000;
    if (timeDifference < 4) {
      setIsSubmitting(false);
      return;
    }

    try {
      const messageData = {
        ...formData,
        createdAt: new Date().toISOString(),
        userId: user?.uid || "GUEST", // 🚀 Súper útil: Guardamos también el UID en la BD para relacionarlo en tu Dashboard
      };

      await addDoc(collection(db, "messages"), messageData);

      const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        },
        PUBLIC_KEY,
      );

      setSubmitted(true);
      // Al limpiar, mantenemos los datos del usuario logueado para que no se le vacíe su nombre/mail si quiere mandar otro
      setFormData({
        name:
          user?.firstName && user?.surname
            ? capitalize(`${user.firstName} ${user.surname}`)
            : "",
        email: user?.email ? user.email : "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error("Error processing form transaction:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Tienda S.A.U.</title>
        <meta
          name="description"
          content="Get in touch with Tienda S.A.U. Send us a message for product inquiries or technical support."
        />
      </Helmet>

      <section className="mx-4 border-2 border-gray-300 rounded-xl p-8 bg-white flex flex-col gap-10 text-gray-700">
        <div className="text-center max-w-xl mx-auto flex flex-col gap-2">
          <span className="text-blue-700 text-xxs font-medium uppercase tracking-widest font-sans">
            Get In Touch
          </span>
          <h2 className="text-3xl font-bold text-gray-900 uppercase tracking-tight">
            Contact Us
          </h2>
          <div className="h-1 w-12 bg-blue-800 mx-auto mt-2 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto w-full">
          <div className="md:col-span-2 border border-gray-300 rounded-xl p-6 bg-gray-50 shadow-sm">
            <h3 className="text-base font-bold text-blue-800 uppercase mb-4">
              Send a Message
            </h3>

            {submitted ? (
              <div className="bg-green-50 border border-gray-300 p-4 rounded-sm text-center flex flex-col gap-2">
                <p className="text-xs font-bold text-green-800 uppercase">
                  Thank you! Your message has been sent.
                </p>
                <p className="text-xxs text-gray-600">
                  Our support team will review your inquiry and get back to you
                  shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-xxs font-semibold text-blue-700 underline uppercase self-center hover:text-blue-900 cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                {/* 🍯 Honeypot */}
                <div
                  className="absolute opacity-0 pointer-events-none -z-10"
                  aria-hidden="true"
                >
                  <input
                    type="text"
                    name="hp_address"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex="-1"
                    autoComplete="off"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-500 text-xxs uppercase font-medium">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      readOnly={!!user}
                      // 🎨 Mismo truco visual de Tailwind
                      className={`border border-gray-400 p-2 rounded-sm text-xs focus:outline-blue-800 ${user ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-500 text-xxs uppercase font-medium">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      readOnly={!!user}
                      className={`border border-gray-400 p-2 rounded-sm text-xs focus:outline-blue-800 ${user ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-gray-500 text-xxs uppercase font-medium">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="border border-gray-400 p-2 rounded-sm text-xs focus:outline-blue-800 bg-white"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-gray-500 text-xxs uppercase font-medium">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="border border-gray-400 p-2 rounded-sm text-xs focus:outline-blue-800 bg-white resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gray-900 text-white text-xs font-semibold uppercase px-4 py-2 rounded-sm hover:bg-blue-800 transition-colors self-start mt-2 min-w-32 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>

          {/* Información lateral de contacto */}
          <div className="flex flex-col gap-4">
            <div className="border border-gray-300 rounded-xl p-6 bg-gray-50 shadow-sm flex flex-col gap-4">
              <h3 className="text-base font-bold text-blue-800 uppercase">
                Direct Channels
              </h3>
              <div className="flex flex-col gap-3 text-xs">
                <div>
                  <p className="text-xxs text-gray-400 uppercase font-medium">
                    Customer Support
                  </p>
                  <a
                    href="mailto:info@tienda.com"
                    className="text-blue-700 hover:underline font-medium"
                  >
                    info@tienda.com
                  </a>
                </div>
                <div>
                  <p className="text-xxs text-gray-400 uppercase font-medium">
                    Phone Support
                  </p>
                  <a
                    href="tel:+543575654321"
                    className="text-gray-700 hover:text-blue-700 transition-colors"
                  >
                    +54 3575 654321
                  </a>
                </div>
              </div>
            </div>

            <div className="border border-gray-300 rounded-xl p-6 bg-green-50 shadow-sm flex flex-col gap-2">
              <h4 className="text-xs font-bold text-gray-900 uppercase">
                Business Hours
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Our technical support is operational during regular shifts:
              </p>
              <div className="text-xxs font-medium text-blue-700 mt-1">
                <p>Monday to Friday: 08:00 - 18:00 (UTC-3)</p>
                <p>Saturday & Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
