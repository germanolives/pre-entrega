/**
 * Valida si un string tiene un formato de email válido.
 * @param {string} email 
 * @returns {boolean}
 */
export const validateLocalEmail = (email) => {
  // Expresión regular estándar para validación de correos
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  // .test() devuelve true si coincide con el formato, o false si no
  return regexEmail.test(email);
};