import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export const AboutUs = () => {
  return (
    <>
      <Helmet>
        <title>About Us | Tienda S.A.U.</title>
        <meta
          name="description"
          content="Learn more about Tienda S.A.U. Our mission is to provide high-quality clothing and electronics with a focus on customer satisfaction and innovation."
        />
      </Helmet>

      {/* Contenedor Principal (Mantiene tus márgenes mx-4, padding y bordes redondeados amplios) */}
      <section className="mx-4 border-2 border-gray-300 rounded-xl p-8 bg-white flex flex-col gap-12 text-gray-700">
        
        {/* ENCABEZADO PRINCIPAL */}
        <div className="text-center max-w-xl mx-auto flex flex-col gap-2">
          <span className="text-blue-700 text-xxs font-medium uppercase tracking-widest">
            Who We Are
          </span>
          <h2 className="text-3xl font-bold text-gray-900 uppercase tracking-tight">
            About Tienda S.A.U.
          </h2>
          <div className="h-1 w-12 bg-blue-800 mx-auto mt-2 rounded-full"></div>
        </div>

        {/* NUESTRA HISTORIA & PRESENTACIÓN */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto w-full">
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold text-blue-800 uppercase">
              Our Journey From Córdoba
            </h3>
            <p className="text-sm leading-relaxed text-gray-600">
              Headquartered in the vibrant province of Córdoba, <span className="font-bold text-gray-800">Tienda S.A.U.</span> was born as a bold vision to bridge two seemingly different worlds: <span className="font-bold text-gray-800">cutting-edge electronics and contemporary fashion</span>.
            </p>
            <p className="text-sm leading-relaxed text-gray-600">
              We believe that technology and style are no longer separate aspects of daily life—they 
              define how we express ourselves and interact with the world. From high-performance 
              gadgets to trendsetting clothing apparel, we curate every single product to match 
              international standards of quality and innovation.
            </p>
          </div>
          
          {/* BLOQUE ESTILIZADO DE DATOS (Combina con tu estética del Register) */}
          <div className="p-6 bg-green-50 border border-gray-300 rounded-xl shadow-sm flex flex-col gap-4">
            <h4 className="text-xs font-bold text-gray-900 uppercase">
              Why Tienda S.A.U.?
            </h4>
            <ul className="flex flex-col gap-3 text-xs text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-blue-700 font-bold">✓</span>
                <span><span className="font-bold text-gray-800">Global Standards:</span> We function as an international operator delivering carefully tested fashion and tech.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-700 font-bold">✓</span>
                <span><span className="font-bold text-gray-800">Customer-Centric:</span> Your satisfaction is our driving force, backed by full technical transparency.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-700 font-bold">✓</span>
                <span><span className="font-bold text-gray-800">Seamless Experience:</span> Secure checkout, real-time order tracking, and reliable support lines.</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-200 max-w-5xl w-full mx-auto" />

        {/* MISIÓN, VISIÓN Y VALORES (3 Columnas) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto w-full">
          {/* Misión */}
          <div className="border border-gray-300 rounded-lg p-5 flex flex-col gap-2 bg-gray-50">
            <span className="text-blue-700 text-xs font-bold uppercase">Mission</span>
            <p className="text-xs text-gray-600 leading-relaxed">
              To supply premium tech hardware and tailored apparel, empowering customers 
              with premium solutions that seamlessly elevate both their lifestyle and workspace productivity.
            </p>
          </div>

          {/* Visión */}
          <div className="border border-gray-300 rounded-lg p-5 flex flex-col gap-2 bg-gray-50">
            <span className="text-blue-700 text-xs font-bold uppercase">Vision</span>
            <p className="text-xs text-gray-600 leading-relaxed">
              To expand our international e-commerce ecosystem, becoming the digital catalog benchmark 
              where premium fashion trends and dynamic electronic infrastructure converge seamlessly.
            </p>
          </div>

          {/* Valores */}
          <div className="border border-gray-300 rounded-lg p-5 flex flex-col gap-2 bg-gray-50">
            <span className="text-blue-700 text-xs font-bold uppercase">Values</span>
            <p className="text-xs text-gray-600 leading-relaxed">
              Rooted in local honesty, strict quality compliance, absolute data privacy, and a forward-thinking 
              approach to tech accessibility.
            </p>
          </div>
        </div>

        {/* CALL TO ACTION FINAL */}
        <div className="text-center bg-lime-50 border border-gray-300 rounded-xl p-6 max-w-3xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-sm font-bold text-gray-900 uppercase">Ready to explore our catalog?</h4>
            <p className="text-xs text-gray-500 mt-1">Discover the latest arrivals in fashion apparel and electronic devices.</p>
          </div>
          <Link 
            to="/products" 
            className="bg-gray-900 text-white text-xs font-semibold uppercase px-4 py-2 rounded-sm hover:bg-blue-800 transition-colors shrink-0"
          >
            Browse Products
          </Link>
        </div>

      </section>
    </>
  );
};