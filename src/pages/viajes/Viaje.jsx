// Este archivo incluye todo el flujo para ida y vuelta con selección de tipo de tarifa
// y renderizado progresivo de ida -> selección -> vuelta -> selección -> resumen

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import CardVuelo from "../../components/cardVuelo/CardVuelo";
import FareSelectionModal from "../../components/selectorTarifa/SelectorTarifa";
import { Loading } from "../../components/loading/Loading";
import { setPrecio } from "../../store/action/homeAction";
import { FechaModal } from "../../components/fechaModal/FechaModal";
import oriIcon from "../../assets/svg/takeoff_icon.png";
import desIcon from "../../assets/svg/landing_icon.png";

const URL = "https://av.procesosrecuperacion.online/api/flights/search/avianca";

const Viaje = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { origin, destino, codeOrigin, codeDestino, tipViaje, fechPartida, fechRegreso } = useSelector(state => state.reducerHome);
  const { money } = useSelector(state => state.countryReducer);

  const [load, setLoad] = useState(true);
  const [viajes, setViajes] = useState([]);
  const [modalFecha, setModalFecha] = useState(false);

  const [vueloIdaSeleccionado, setVueloIdaSeleccionado] = useState(null);
  const [vueloVueltaSeleccionado, setVueloVueltaSeleccionado] = useState(null);
  const [modalTarifa, setModalTarifa] = useState(null); // contiene { vuelo, tipo: 'ida' | 'vuelta' }

  const handlerCompra = () => {
    dispatch(setPrecio(vueloIdaSeleccionado.precio.total + vueloVueltaSeleccionado.precio.total));
    navigate("/compra");
  };

  useEffect(() => {
    if (!codeOrigin || !codeDestino || !tipViaje || !fechPartida) {
      return navigate("/");
    }

    const body = {
      origin: codeOrigin,
      destination: codeDestino,
      departure_date: fechPartida?.split("T")[0],
      adults: 1,
      currency: money,
      max_results: 20,
    };

    if (tipViaje === "idaYVuelta") {
      body.return_date = fechRegreso?.split("T")[0];
    }

    axios.post(URL, body, { headers: { "Content-Type": "application/json" } })
      .then(({ data }) => {
        setViajes(data.data);
        setLoad(false);
      });
  }, [modalFecha]);

  const vuelosIda = viajes.filter(v => v.tipo_vuelo === 'ida');
  const vuelosVuelta = viajes.filter(v => v.tipo_vuelo === 'vuelta');

  return (
    <div className="w-full flex flex-col items-center">
      {load && <Loading />}
      {modalTarifa && (
        <FareSelectionModal
          vuelo={modalTarifa.vuelo}
          tipo={modalTarifa.tipo}
          onClose={() => setModalTarifa(null)}
          onSelectTarifa={(vueloConTarifa) => {
            if (modalTarifa.tipo === 'ida') {
              setVueloIdaSeleccionado(vueloConTarifa);
            } else {
              setVueloVueltaSeleccionado(vueloConTarifa);
            }
            setModalTarifa(null);
          }}
        />
      )}

      {!load && (
        <div className="w-full min-h-screen bg-slate-200 flex flex-col items-center gap-y-4">
          <div className="w-full bg-white flex flex-col justify-center items-center">
            <div className="w-[90%] flex flex-col py-3">
              <h3 className="font-bold text-[18px] ">{origin} a {destino}</h3>
              <div className="w-full flex gap-x-3.5">
                <div className="flex gap-x-2">
                  <img src={oriIcon} className="w-5 h-5" alt="" />
                  <span className="text-[14px]">
                    {(() => {
                      try {
                        return format(parseISO(fechPartida), "EEE. dd MMM. yyyy", { locale: es });
                      } catch {
                        return "Fecha inválida";
                      }
                    })()}
                  </span>
                </div>
                {fechRegreso && (
                  <div className="flex gap-x-2">
                    <img src={desIcon} className="w-5 h-5" alt="" />
                    <span className="text-[14px]">
                      {(() => {
                        try {
                          return format(parseISO(fechRegreso), "EEE. dd MMM. yyyy", { locale: es });
                        } catch {
                          return "Fecha inválida";
                        }
                      })()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col items-center gap-y-4">
            {!vueloIdaSeleccionado && (
              <div className="w-[90%] flex flex-col gap gap-y-4">
                <h2 className="text-xl font-semibold mb-2">Selecciona tu vuelo de ida</h2>
                {vuelosIda.slice(0, 10).map((v, k) => (
                  <button key={k} onClick={() => setModalTarifa({ vuelo: v, tipo: 'ida' })} className="w-full">
                    <CardVuelo vuelo={v} pos={k} />
                  </button>
                ))}
              </div>
            )}

            {vueloIdaSeleccionado && !vueloVueltaSeleccionado && (
              <div className="w-[90%]">
                <h2 className="text-xl font-semibold mb-2">Vuelo de ida seleccionado</h2>
                <CardVuelo vuelo={vueloIdaSeleccionado} pos={-1} />

                <h2 className="text-xl font-semibold my-4">Selecciona tu vuelo de regreso</h2>
                {vuelosVuelta.slice(0, 10).map((v, k) => (
                  <button key={k} onClick={() => setModalTarifa({ vuelo: v, tipo: 'vuelta' })} className="w-full">
                    <CardVuelo vuelo={v} pos={k} />
                  </button>
                ))}
              </div>
            )}

            {vueloIdaSeleccionado && vueloVueltaSeleccionado && (
              <div className="w-[90%] space-y-4">
                <h2 className="text-xl font-semibold">Resumen de tu viaje</h2>
                <CardVuelo vuelo={vueloIdaSeleccionado} pos={-1} />
                <CardVuelo vuelo={vueloVueltaSeleccionado} pos={-1} />
                <button
                  onClick={handlerCompra}
                  className="bg-green-600 hover:bg-green-700 text-white w-full py-3 rounded-xl text-lg font-semibold"
                >
                  Comprar
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {modalFecha && <FechaModal close={setModalFecha} pro={true} />}
    </div>
  );
};

export { Viaje };
