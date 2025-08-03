import React from 'react';

const Loader = () => {
  return (
    <div className="h-screen flex items-center justify-center  justify-center ">
      <div className="flex gap-2">
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-0.5s]"></div>
      </div>
    </div>
  );
};

export default Loader;
