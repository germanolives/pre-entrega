/**
 * Ordena un array de objetos de forma genérica y limpia.
 * @param {Array} data - El array original a ordenar.
 * @param {String} keyPath - La propiedad clave (soporta puntos para objetos anidados, ej: "rating.rate").
 * @param {Boolean} ascending - True para ascendente, False para descendente.
 * @returns {Array} Un nuevo array ordenado de forma inmutable.
 */
export const sortData = (data, keyPath, ascending = true) => {
  if (!Array.isArray(data) || !keyPath) return data;

  // Extractor de propiedades anidadas seguro
  const getValue = (obj, path) => {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  };

  // Validador dinámico: verifica si un valor es numérico o un string convertible a número
  const isNumeric = (val) => {
    if (typeof val === "number") return true;
    if (typeof val !== "string") return false;
    return val.trim() !== "" && !isNaN(val);
  };

  return [...data].sort((a, b) => {
    const rawA = getValue(a, keyPath);
    const rawB = getValue(b, keyPath);

    // Fusible para valores nulos o undefined
    const A = rawA ?? "";
    const B = rawB ?? "";

    let compare = 0;

    // 🌟 VALIDACIÓN POR TIPO DE DATO (Dinámica y genérica)
    if (isNumeric(A) && isNumeric(B)) {
      compare = Number(A) - Number(B);
    } else {
      // Ordenamiento alfanumérico natural (sirve para textos y códigos mezclados)
      compare = String(A).localeCompare(String(B), undefined, {
        numeric: true,
        sensitivity: "base",
      });
    }

    return ascending ? compare : compare * -1;
  });
};
