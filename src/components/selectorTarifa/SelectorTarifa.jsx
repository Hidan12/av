import React, { useState } from 'react';

const FareSelectionModal = ({ fares, onClose }) => {
  // Formatear precio en COP
  const formatPrice = (price) => {
    return parseFloat(price).toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };

  // Obtener millas según tipo de tarifa
  const getMiles = (brandedFareLabel) => {
    switch (brandedFareLabel) {
      case 'BASIC': return 3;
      case 'CLASSIC': return 6;
      case 'FLEX': return 8;
      default: return 0;
    }
  };

  // Verificar si un servicio está incluido
  const hasAmenity = (amenities, keyword) => {
    return amenities.some(amenity => 
      amenity.description.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  // Agrupar tarifas por tipo (evitar duplicados)
  const uniqueFares = fares.reduce((acc, fare) => {
    const fareLabel = fare.fareDetailsBySegment[0].brandedFareLabel;
    if (!acc.some(f => f.fareDetailsBySegment[0].brandedFareLabel === fareLabel)) {
      acc.push(fare);
    }
    return acc;
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] flex flex-col">
        {/* Encabezado fijo */}
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
          <h2 className="text-xl font-bold">Selecciona tu tarifa</h2>
          <button 
            onClick={()=>onClose(false)}
            className="text-gray-500 hover:text-gray-700 text-2xl"
            aria-label="Cerrar modal"
          >
            &times;
          </button>
        </div>

        {/* Contenido desplazable con las tarjetas */}
        <div className="overflow-y-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {uniqueFares.map((fare, index) => {
            const fareDetails = fare.fareDetailsBySegment[0];
            const brandedFareLabel = fareDetails.brandedFareLabel;
            const miles = getMiles(brandedFareLabel);
            const amenities = fareDetails.amenities;

            // Determinar qué servicios están incluidos
            const hasCheckedBag = fareDetails.includedCheckedBags.quantity > 0;
            const hasCarryOn = fareDetails.includedCabinBags.quantity > 0;
            const hasAirportCheckin = hasAmenity(amenities, 'airport check in counter');
            const hasSeatAssignment = hasAmenity(amenities, 'pre reserved seat assignment');
            const hasOnboardMenu = hasAmenity(amenities, 'menu');
            const hasChanges = hasAmenity(amenities, 'change before departure');
            const hasRefund = hasAmenity(amenities, 'reembolso');

            return (
              <div key={index} className="border rounded-lg p-4 flex flex-col h-full transition-all hover:shadow-md hover:border-blue-300">
                <h3 className="text-center font-bold text-lg mb-4 uppercase tracking-wider text-blue-700">
                  {brandedFareLabel.toLowerCase()}
                </h3>

                <ul className="space-y-2 flex-grow">
                  {/* Artículo personal (siempre incluido) */}
                  <li className="flex items-center">
                    <span className="text-green-500 w-6 h-6 mr-2 text-xl">✓</span>
                    <span>1 artículo personal (bolso)</span>
                  </li>
                  
                  {/* Equipaje de mano */}
                  <li className="flex items-center">
                    {hasCarryOn ? (
                      <span className="text-green-500 w-6 h-6 mr-2 text-xl">✓</span>
                    ) : (
                      <span className="text-red-500 w-6 h-6 mr-2 text-xl">✗</span>
                    )}
                    <span>1 equipaje de mano (10 kg)</span>
                  </li>
                  
                  {/* Equipaje de bodega */}
                  <li className="flex items-center">
                    {hasCheckedBag ? (
                      <span className="text-green-500 w-6 h-6 mr-2 text-xl">✓</span>
                    ) : (
                      <span className="text-red-500 w-6 h-6 mr-2 text-xl">✗</span>
                    )}
                    <span>1 equipaje de bodega (23 kg)</span>
                  </li>
                  
                  {/* Check-in en aeropuerto */}
                  <li className="flex items-center">
                    {hasAirportCheckin ? (
                      <span className="text-green-500 w-6 h-6 mr-2 text-xl">✓</span>
                    ) : (
                      <span className="text-red-500 w-6 h-6 mr-2 text-xl">✗</span>
                    )}
                    <span>Check-in en aeropuerto</span>
                  </li>
                  
                  {/* Asiento */}
                  <li className="flex items-center">
                    {hasSeatAssignment ? (
                      <span className="text-green-500 w-6 h-6 mr-2 text-xl">✓</span>
                    ) : (
                      <span className="text-red-500 w-6 h-6 mr-2 text-xl">✗</span>
                    )}
                    <span>
                      {brandedFareLabel === 'FLEX' ? 'Asiento Plus (sujeto a disponibilidad)' : 'Asiento Economy incluido'}
                    </span>
                  </li>
                </ul>

                {/* Acumulación de millas */}
                <div className="my-4 p-2 bg-blue-50 rounded-md">
                  <p className="text-center text-blue-800">
                    <span className="font-bold">LM</span> Acumula {miles} lifemiles por cada USD
                  </p>
                </div>

                {/* Servicios adicionales (solo para CLASSIC y FLEX) */}
                {(brandedFareLabel === 'CLASSIC' || brandedFareLabel === 'FLEX') && (
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        {hasOnboardMenu ? (
                          <span className="text-green-500 w-6 h-6 mr-2 text-xl">✓</span>
                        ) : (
                          <span className="text-red-500 w-6 h-6 mr-2 text-xl">✗</span>
                        )}
                        <span>Menú a bordo</span>
                      </li>
                      
                      <li className="flex items-center">
                        {hasChanges ? (
                          <span className="text-green-500 w-6 h-6 mr-2 text-xl">✓</span>
                        ) : (
                          <span className="text-red-500 w-6 h-6 mr-2 text-xl">✗</span>
                        )}
                        <span>Cambios (antes del vuelo)</span>
                      </li>
                      
                      <li className="flex items-center">
                        {hasRefund ? (
                          <span className="text-green-500 w-6 h-6 mr-2 text-xl">✓</span>
                        ) : (
                          <span className="text-red-500 w-6 h-6 mr-2 text-xl">✗</span>
                        )}
                        <span>Reembolso (antes del vuelo)</span>
                      </li>
                    </ul>
                  </div>
                )}

                {/* Precio */}
                <div className="mt-auto pt-4">
                  <p className="text-center font-bold text-xl text-blue-900">
                    {formatPrice(fare.price.total)}
                  </p>
                  <p className="text-center text-gray-500 text-sm mt-1">
                    Precio por pasajero
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};



export default FareSelectionModal;