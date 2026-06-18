export const AlertItem = ({ item }) => {
  const alertStyles = {
    success: "bg-white border-green-500 text-green-800",
    error: "bg-white border-red-500 text-red-800",
    info: "bg-white border-blue-500 text-blue-800",
  };

  return (
    <div
      className={`
        p-4 rounded-xl shadow-lg border-l-8 
        ${alertStyles[item.type] || alertStyles.info}
        flex items-center gap-3 animate-in slide-in-from-right-4
      `}
    >
      <span className="font-medium">{item.message}</span>
    </div>
  );
};
