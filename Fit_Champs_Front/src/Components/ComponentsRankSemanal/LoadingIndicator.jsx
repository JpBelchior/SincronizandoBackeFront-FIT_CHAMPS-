import React from "react";

const LoadingIndicator = () => {
  return (
    <div className="p-12 flex justify-center items-center">
      <div className="w-8 h-8 border-4 border-blue-300 border-t-transparent rounded-full animate-spin"></div>
      <span className="ml-4 text-blue-200 text-lg">Carregando ranking...</span>
    </div>
  );
};

export default LoadingIndicator;
