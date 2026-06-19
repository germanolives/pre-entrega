export const capitalize = (text) => {
  if (!text) return "";

  // Separamos por espacios O guiones, para cubrir ambos casos
  return text
    .split(/[-\s]/) 
    .map(word => {
      if (word.length === 0) return "";
      // Primera letra mayúscula + el resto de la palabra en minúsculas
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
};