export const idGenerator = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `TRX-${timestamp}-${random}`;
};
