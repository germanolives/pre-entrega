export const ErrorMessage = ({ message }) => {
  return (
    <div className="container mx-auto p-10 max-w-2xl text-center">
      <div className="bg-red-50 border-l-4 border-red-500 p-8 shadow-md rounded-r-lg">
        <div className="flex flex-col items-center gap-4">
          <span className="text-5xl">⚠️</span>
          
          <h2 className="text-2xl font-bold text-red-800">
            ¡Ups! Algo salió mal
          </h2>
          
          <p className="text-red-600 font-medium">
            {message || "We were unable to load the information at this time."}
          </p>

          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors shadow-sm"
          >
            Reintentar
          </button>
        </div>
      </div>
    </div>
  );
};