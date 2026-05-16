export const Spinner = () => {
  return (
    <div className="flex flex-col justify-center items-center h-64 w-full gap-4">
      <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      
      <p className="text-xl font-medium text-gray-600 animate-pulse">
        Loading...
      </p>
    </div>
  );
};