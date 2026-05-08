export const formatSlug = (text) => {
  return text
    ? text
        .toLowerCase() //Pone en minúsculas el título
        .split(" ") // Transforma la cadena de texto de título en un array donde cada item es una palabra
        .slice(0, 4) // Recorta el array hasta 4 pañabras
        .join(" ") // Vuelva a formar una cadena te texto con esas 4 palabras máximo y en minúsculas
        .normalize("NFD") // Busca caracteres especiales y los despega de NFC a NFD ej. "á" => "a" "'"
        .replace(/[\u0300-\u036f]/g, "") // Elimina todos esos caracteres especiales como tildes
        .replace(/[^a-z0-9 ]/g, "") // Quita símbolos (deja letras, números y espacios)
        .replace(/\s+/g, "-") // Cambia espacios por guiones
        .replace(/-+/g, "-") // Colapsa guiones múltiples en uno solo
    : "";
};
