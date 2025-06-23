import React, { useState } from 'react';

const FareSelectionModal = ({ precio, onClose }) => {
  
  return (
    <div className="fixed w-full top-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] flex flex-col justify-center">
        {/* Encabezado fijo */}
        <div className="sticky w-[90%] top-0 bg-white border-b p-4 flex justify-between items-center z-10">
          <h2 className="text-xl font-bold">Selecciona tu tarifa</h2>
          <button 
            onClick={()=>onClose(false)}
            className="text-gray-500 hover:text-gray-700 text-2xl"
            aria-label="Cerrar modal"
          >
            &times;
          </button>
        </div>

        <div className='w-[90%] flex flex-col justify-center items-center mt-4'>
          <button className='w-full p-3 border border-red-600 rounded-2xl flex flex-col justify-center items-center'> 
            <h3></h3>
          </button>
        </div>
      </div>
    </div>
  );
};



export default FareSelectionModal;