import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export const Services = () => {
  return (
    <>
      <Helmet>
        <title>Services | Tienda S.A.U.</title>
        <meta
          name="description"
          content="Discover the professional services offered by Tienda S.A.U., from nationwide shipping and expert advice to reliable technical support for your purchases."
        />
      </Helmet>

      {/* Contenedor Principal (Mantiene tus márgenes, paddings y bordes amplios) */}
      <section className="mx-4 border-2 border-gray-300 rounded-xl p-8 bg-white flex flex-col gap-12 text-gray-700">
        
        {/* ENCABEZADO PRINCIPAL */}
        <div className="text-center max-w-xl mx-auto flex flex-col gap-2">
          <span className="text-blue-700 text-xxs font-medium uppercase tracking-widest">
            What We Do
          </span>
          <h2 className="text-3xl font-bold text-gray-900 uppercase tracking-tight">
            Our Services
          </h2>
          <div className="h-1 w-12 bg-blue-800 mx-auto mt-2 rounded-full"></div>
        </div>

        {/* REJILLA DE SERVICIOS (2x2 adaptado tipográficamente) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto w-full">
          
          {/* SERVICIO 1: Logística y Envíos */}
          <div className="border border-gray-300 rounded-xl p-6 bg-gray-50 flex flex-col justify-between gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-blue-700 text-xs font-bold uppercase">
                Logistics
              </span>
              <h3 className="text-lg font-bold text-blue-800 uppercase leading-tight">
                Nationwide & International Shipping
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Operating directly from our core facilities in Córdoba, we manage a robust distribution 
                network ensuring your apparel and high-end electronics arrive safely. Every shipment is 
                fully insured and packed with industrial care to guarantee item integrity.
              </p>
            </div>
            <div className="text-xxs font-medium uppercase text-blue-700 bg-gray-100 p-1 px-2 rounded-sm self-start">
              ⚡ Real-time tracking included
            </div>
          </div>

          {/* SERVICIO 2: Asesoramiento Técnico */}
          <div className="border border-gray-300 rounded-xl p-6 bg-gray-50 flex flex-col justify-between gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-blue-700 text-xs font-bold uppercase">
                Consultation
              </span>
              <h3 className="text-lg font-bold text-blue-800 uppercase leading-tight">
                Expert Tech & Fashion Guidance
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Confused about hardware specifications or finding the perfect fit? Our dedicated support 
                team offers personalized remote guidance. We cross-reference compatibility metrics for your 
                electronic setups and assist you with detailed size charts.
              </p>
            </div>
            <div className="text-xxs font-medium uppercase text-blue-700 bg-gray-100 p-1 px-2 rounded-sm self-start">
              💬 Personalized channels
            </div>
          </div>

          {/* SERVICIO 3: Soporte y Garantía */}
          <div className="border border-gray-300 rounded-xl p-6 bg-gray-50 flex flex-col justify-between gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-blue-700 text-xs font-bold uppercase">
                Quality Assurance
              </span>
              <h3 className="text-lg font-bold text-blue-800 uppercase leading-tight">
                Extended Warranty & Post-Sale Support
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Peace of mind comes standard with Tienda S.A.U. All electronics are backed by factory 
                warranties, and we offer a streamlined return window for fashion pieces. Our technical team 
                is always ready to handle any technical failure or setup bottleneck.
              </p>
            </div>
            <div className="text-xxs font-medium uppercase text-blue-700 bg-gray-100 p-1 px-2 rounded-sm self-start">
              🛡️ Secure investment
            </div>
          </div>

          {/* SERVICIO 4: Cuentas Corporativas / Mayoristas */}
          <div className="border border-gray-300 rounded-xl p-6 bg-gray-50 flex flex-col justify-between gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-blue-700 text-xs font-bold uppercase">
                Enterprise Solutions
              </span>
              <h3 className="text-lg font-bold text-blue-800 uppercase leading-tight">
                B2B & Bulk Order Infrastructure
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                We provide dynamic solutions for businesses looking to equip their offices with computer 
                hardware or corporate uniform lines. Enjoy flexible payment terms, scalable wholesale discounts, 
                and a dedicated account representative to streamline operations.
              </p>
            </div>
            <div className="text-xxs font-medium uppercase text-blue-700 bg-gray-100 p-1 px-2 rounded-sm self-start">
              💼 Tailored corporate accounts
            </div>
          </div>

        </div>

        {/* SECCIÓN INFORMATIVA DE SOPORTE DIRECTO */}
        <div className="bg-green-50 border border-gray-300 rounded-xl p-6 max-w-5xl mx-auto w-full text-center">
          <h4 className="text-sm font-bold text-gray-900 uppercase mb-2">
            Need urgent assistance with a product code or shipment?
          </h4>
          <p className="text-xs text-gray-600 max-w-2xl mx-auto mb-4">
            Our multi-channel support center is online Monday through Friday. Reach out directly via our verified 
            communication channels listed below in our footer for instant response.
          </p>
          <Link 
            to="/contact" 
            className="inline-block bg-gray-900 text-white text-xs font-semibold uppercase px-4 py-2 rounded-sm hover:bg-blue-800 transition-colors"
          >
            Go to Contact Page
          </Link>
        </div>

      </section>
    </>
  );
};