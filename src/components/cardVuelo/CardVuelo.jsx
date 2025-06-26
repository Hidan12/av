import React from "react";
import { format, parseISO } from "date-fns";
import { useSelector } from "react-redux";

const CardVuelo = ({ vuelo, pos, label }) => {
  const { money } = useSelector(state => state.countryReducer);
  const isCombo = vuelo.ida && vuelo.vuelta;

  const renderTramo = (data, label) => {
    const salida = parseISO(data.horarios.salida);
    const llegada = parseISO(data.horarios.llegada);
    const [origen, destino] = data.ruta.split("→").map(s => s.trim());

    return (
      <div className="mb-4">
        <div className="text-sm text-gray-500 font-medium mb-1 uppercase">{label}</div>
        <div className="flex justify-between items-center text-[25px] font-semibold">
          <span>{format(salida, "HH:mm")}</span>
          <div className="flex gap-x-2 items-center justify-center">
            <div className="text-center text-sm text-green-700 font-medium underline">
              {data.escalas}
            </div>
            <p className="text-sm">|</p>
            <div className="text-center text-sm text-gray-500">
              {data.duracion.formato}
            </div>
          </div>
          <span>{format(llegada, "HH:mm")}</span>
        </div>
        <div className="flex justify-between text-[17px] font-semibold text-gray-600">
          <span>{origen}</span>
          <span>{destino}</span>
        </div>
      </div>
    );
  };

  const precio = isCombo
    ? vuelo.precioFormateado
    : vuelo.precio.formato;

  return (
    <div className={`w-full rounded-3xl mt-3 shadow-xl bg-white  relative ${pos == -1 ? " border-2 border-green-500":""}`}>
      {pos === 0 && (
        <div className="absolute rounded-tr-3xl top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
          $ Mejor precio
        </div>
      )}
      <div className="p-5">
        {isCombo
          ? <>
              {renderTramo(vuelo.ida, "Ida")}
              {renderTramo(vuelo.vuelta, "Vuelta")}
            </>
          : renderTramo(vuelo, (label ? label : vuelo.tipo_vuelo))
        }

        <div className="text-center text-xs text-gray-400 mb-4">
          Operado por Avianca
        </div>

        <hr className="mb-2" />

        <div className="flex items-center justify-center w-full">
          <span className="text-xl font-bold text-black">
            {vuelo.precio?.total ? `${money} ${vuelo.precio?.total.toLocaleString('es-CO')} ` : `${money} ${vuelo.precio.formato} `}
          </span>
          {vuelo.tipoServicio && (
            <span className={`ml-4 px-4 py-1 text-sm rounded-lg text-white capitalize ${vuelo.tipoServicio == "Flex" ? "bg-[#ff5c00]" : vuelo.tipoServicio == "Classic" ? "bg-[#b50080]": "bg-red-500"}`}>
              {vuelo.tipoServicio}
            </span>
          )}
        </div>
        <div className="w-full flex justify-center">
          <span className="text-[13px] text-gray-400">Precio por pasajero</span>
        </div>
      </div>
    </div>
  );
};

export default CardVuelo;
