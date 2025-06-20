import React from "react";
import { format, parseISO } from "date-fns";
import { useSelector } from "react-redux";

const CardVuelo = ({ vuelo, pos }) => {
  const itinerarios = vuelo.itineraries;
  const {codeCountry } = useSelector((state) => state.countryReducer)
  // Función para extraer info de un segmento
  const getInfoVuelo = (itinerario) => {
    const segmento = itinerario.segments[0];

    const horaSalida = format(parseISO(segmento.departure.at), "HH:mm");
    const horaLlegada = format(parseISO(segmento.arrival.at), "HH:mm");

    const origen = segmento.departure.iata_code;
    const destino = segmento.arrival.iata_code;

    const duracion = itinerario.duration
      .replace("PT", "")
      .replace("H", "h ")
      .replace("M", "min");

    return { horaSalida, horaLlegada, origen, destino, duracion };
  };

  const ida = getInfoVuelo(itinerarios[0]);
  const vuelta = itinerarios[1] ? getInfoVuelo(itinerarios[1]) : null;

  const precio = Number(vuelo.price.total).toLocaleString(`es-${codeCountry}`, {
    style: "currency",
    currency: vuelo.price.currency,
    maximumFractionDigits: 0,
  });

  return (
    <div className="w-full rounded-3xl shadow-md bg-white border border-gray-300 relative">
      {pos == 0 && (
        <div className="absolute rounded-tr-3xl top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
          $ Mejor precio
        </div>
      )}

      <div className="p-5">
        {/* VUELO DE IDA */}
        <div className="mb-4">
          <div className="text-sm text-gray-500 font-medium mb-1">IDA</div>
          <div className="flex justify-between items-center text-[25px] font-semibold">
            <span>{ida.horaSalida}</span>
            <div className="flex gap-x-2 items-center justify-center">
              <div className="text-center text-sm text-green-700 font-medium underline">
                Directo
              </div>
              <p className="text-sm">|</p>
              <div className="text-center text-sm text-gray-500">
                {ida.duracion}
              </div>
            </div>
            <span>{ida.horaLlegada}</span>
          </div>
          <div className="flex justify-between text-[17px] font-semibold text-gray-600">
            <span>{ida.origen}</span>
            <span>{ida.destino}</span>
          </div>
        </div>

        {/* VUELO DE VUELTA */}
        {vuelta && (
          <div className="mb-4">
            <div className="text-sm text-gray-500 font-medium mb-1">VUELTA</div>
            <div className="flex justify-between items-center text-[25px] font-semibold">
              <span>{vuelta.horaSalida}</span>
              <div className="flex gap-x-2 items-center justify-center">
                <div className="text-center text-sm text-green-700 font-medium underline">
                  Directo
                </div>
                <p className="text-sm">|</p>
                <div className="text-center text-sm text-gray-500">
                  {vuelta.duracion}
                </div>
              </div>
              <span>{vuelta.horaLlegada}</span>
            </div>
            <div className="flex justify-between text-[17px] font-semibold text-gray-600">
              <span>{vuelta.origen}</span>
              <span>{vuelta.destino}</span>
            </div>
          </div>
        )}

        <div className="text-center text-xs text-gray-400 mb-4">
          Operado por Avianca
        </div>

        <hr className="mb-2" />

        <div className="text-center text-2xl font-bold text-black">
          {precio}
        </div>
      </div>
    </div>
  );
};

export default CardVuelo;
