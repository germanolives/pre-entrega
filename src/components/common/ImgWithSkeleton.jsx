import { useState, useEffect, useCallback, useRef } from "react";

export const ImgWithSkeleton = ({
  title,
  image,
  className,
  size,
  isPriority,
}) => {
  const [isReady, setIsReady] = useState(false);
  const imgRef = useRef(null);

  const markReady = useCallback(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    setIsReady(false);
  }, [image]);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    if (el.complete && el.naturalHeight > 0) {
      markReady();
    }
  }, [image, markReady]);

  return (
    <div className={`relative ${size}`}>
      {!isReady && (
        <div className="absolute inset-0 bg-gray-300 animate-pulse" />
      )}
      <img
        ref={imgRef}
        className={`${className} ${size} object-contain transition-opacity duration-500 ${isReady ? "opacity-100" : "opacity-0"}`}
        src={image}
        alt={title}
        onLoad={markReady}
        onError={markReady}
        fetchPriority={isPriority ? "high" : "auto"}
        loading={isPriority ? "eager" : "lazy"}
      />
    </div>
  );
};

// 1. Importaciones y Props
// JavaScript

// import { useState, useEffect, useCallback, useRef } from "react";

// export const ImgWithSkeleton = ({ title, image, className, size, isPriority }) => {

//     Hooks: Importás las herramientas necesarias para manejar el estado (useState), efectos secundarios (useEffect), memorización (useCallback) y referencias al DOM (useRef).

//     Props: Recibís los datos de la imagen, estilos (className, size) y una bandera (isPriority) para saber si la imagen debe cargar rápido (LCP).

// 2. Definición de estados y referencias
// JavaScript

//   const [isReady, setIsReady] = useState(false);
//   const imgRef = useRef(null);

//     isReady: Un booleano que empieza en false. Nos dice si la imagen terminó de cargar para ocultar el gris y mostrar la foto.

//     imgRef: Una "caja" vacía donde React guardará el elemento <img> real del navegador.

// 3. Memorización de la función de éxito
// JavaScript

//   const markReady = useCallback(() => {
//     setIsReady(true);
//   }, []);

//     useCallback: Creás la función markReady. Al tener los corchetes vacíos [], React la crea una sola vez y la mantiene en memoria. Esto evita que el componente se confunda si se re-renderiza muchas veces.

// 4. Reset al cambiar de imagen
// JavaScript

//   useEffect(() => {
//     setIsReady(false);
//   }, [image]);

//     Propósito: Si el usuario cambia de producto (la URL de la imagen cambia), este efecto vuelve el estado a false. Así, el "gris pulse" aparece de nuevo mientras carga la nueva foto.

// 5. El "Seguro" para el Caché (Clave en móviles)
// JavaScript

//   useEffect(() => {
//     const el = imgRef.current;
//     if (!el) return;
//     if (el.complete && el.naturalHeight > 0) {
//       markReady();
//     }
//   }, [image, markReady]);

//     imgRef.current: Accedés directamente a la etiqueta <img> del HTML.

//     el.complete: Una propiedad nativa del navegador. Si la imagen ya estaba descargada (caché), esto es true inmediatamente.

//     naturalHeight > 0: Verifica que la imagen tenga altura real (que no sea un archivo roto).

//     Por qué está acá: A veces el navegador carga la foto tan rápido que el evento onLoad no llega a dispararse. Este código "chequea manualmente" si ya terminó.

// 6. El Renderizado (HTML/JSX)
// JavaScript

//   return (
//     <div className={`relative ${size}`}>
//       {/* 6.1 El Skeleton */}
//       {!isReady && (
//         <div className="absolute inset-0 bg-gray-300 animate-pulse" />
//       )}

//     relative: Contenedor padre. Necesario para que el esqueleto se ubique exactamente encima de la imagen.

//     Lógica: Si isReady es falso, mostramos un div gris con animación de pulso (animate-pulse).

// JavaScript

//       {/* 6.2 La Imagen */}
//       <img
//         ref={imgRef}
//         className={`${className} ${size} object-contain transition-opacity duration-500 ${isReady ? "opacity-100" : "opacity-0"}`}
//         src={image}
//         alt={title}
//         onLoad={markReady}
//         onError={markReady}
//         fetchPriority={isPriority ? "high" : "auto"}
//         loading={isPriority ? "eager" : "lazy"}
//       />
//     </div>
//   );
// };

//     ref={imgRef}: Conecta el código de arriba con esta etiqueta real.

//     transition-opacity: Hace que la imagen aparezca con un efecto suave (fade-in) en 500ms.

//     onLoad: El evento estándar que avisa cuando la imagen terminó de bajar.

//     onError: Si la imagen no existe (404), ejecutamos markReady para que al menos se vaya el gris y el usuario vea que hay un error.

//     fetchPriority / loading: Optimizaciones para Vercel. Si es la primera imagen de la página (isPriority), se descarga inmediatamente (eager); si no, espera a que el usuario haga scroll (lazy).

// Resumen de funcionamiento:

//     Se monta el componente -> Gris pulse visible.

//     El navegador descarga la imagen.

//     ¿La imagen ya estaba en caché? -> El useEffect con ref lo detecta y llama a markReady.

//     ¿Es una descarga nueva? -> El evento onLoad llama a markReady.

//     isReady pasa a true -> El gris desaparece y la imagen aparece suavemente con opacidad 100.

// import { useState, useEffect } from "react";

// export const ImgWithSkeleton = ({
//   title,
//   image,
//   className,
//   size,
//   isPriority,
// }) => {
//   const [isReady, setIsReady] = useState(false);

//   useEffect(() => {
//     setIsReady(false);
//   }, [image]);

//   return (
//     <div className={`relative ${size}`}>
//       {!isReady && (
//         <div className="absolute inset-0 bg-gray-300 animate-pulse" />
//       )}
//       <img
//         className={`${className} ${size} object-contain transition-opacity duration-500 ${isReady ? "opacity-100" : "opacity-0"}`}
//         src={image}
//         alt={title}
//         onLoad={() => setIsReady(true)}
//         fetchPriority={isPriority ? "high" : "auto"}
//         loading={isPriority ? "eager" : "lazy"}
//       />
//     </div>
//   );
// };
