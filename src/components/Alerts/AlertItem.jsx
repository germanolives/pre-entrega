export const AlertItem = ({ item }) => {
  const alertStyles = {
    success: "bg-green-100 text-green-800 border-l-4 border-green-500",
    error: "bg-red-100 text-red-800 border-l-4 border-red-500",
    info: "bg-blue-100 text-blue-800 border-l-4 border-blue-500",
  };

  return (
    <div
      className={`p-4 rounded-lg shadow-lg pointer-events-auto animate-in slide-in-from-right-4 ${alertStyles[item.type] || alertStyles.info}`}
    >
      {" "}
      {item.message}
    </div>
  );
};
