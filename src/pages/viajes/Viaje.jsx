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
import SelectorTarifa from "../../components/selectorTarifa/SelectorTarifa";

const URL = import.meta.env.VITE_API_URL_SEARCH_FLIGHTS;


const Viaje = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { origin, destino, codeOrigin, codeDestino, tipViaje, fechPartida, fechRegreso } = useSelector(state => state.reducerHome);
  const { money } = useSelector(state => state.countryReducer);
  const [loadCambio, setLoadCambio] = useState(false)
  const [load, setLoad] = useState(true);
  const [viajes, setViajes] = useState([]);
  const [btnSelect, setBtnSelect] = useState("")
  const [modalFecha, setModalFecha] = useState(false);
  const [vuelosVuelta, setVuelosVuelta] = useState()
  const [vueloIdaSeleccionado, setVueloIdaSeleccionado] = useState(null);
  const [vueloVueltaSeleccionado, setVueloVueltaSeleccionado] = useState(null);
  const [modalTarifa, setModalTarifa] = useState(null);

  const handlerCompra = () => {
        const total = vueloIdaSeleccionado.precio.total + (vueloVueltaSeleccionado?.precio?.total || 0)
        dispatch(setPrecio(total));
        navigate("/compra");
  };

  const handlerCloseFechaModal = ()=>{
    setModalFecha(false)
    console.log("fecha cambiada a ", fechRegreso);
    
  }  

  //carga inicial
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
        setVuelosVuelta( v => v = data.data.filter(v => v.tipo_vuelo === 'vuelta'))
        setViajes(data.data);
        setLoad(false);
      });
  }, [fechPartida]);

  //cambio de fecha
  useEffect(()=>{
    const cambiarFecha = ()=>{
      setLoadCambio(true)
      const body = {
      origin: codeDestino,
      destination: codeOrigin,
      departure_date: fechRegreso?.split("T")[0],
      adults: 1,
      currency: money,
      max_results: 20,
      };
      
      axios.post(URL, body, { headers: { "Content-Type": "application/json" } })
      .then(({ data }) => {
        setVuelosVuelta(data.data);
        setLoadCambio(false);
      })

    }
    if (fechRegreso) {
      cambiarFecha()
    }
  },[fechRegreso])

  const vuelosIda = viajes.filter(v => v.tipo_vuelo === 'ida');
  
  
  
  return (
    <div className="w-full flex flex-col items-center">
      {load && <Loading />}
      {modalTarifa && (
        <SelectorTarifa
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
        <div className="w-full min-h-screen bg-white flex flex-col items-center gap-y-4">
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
                {vuelosIda.length == 0 && !loadCambio &&
                  <div className="w-full flex flex-col mb-10">
                    <span className="font-semibold text-[16px] my-3">No se encontraron vuelos de regreso, por favor cambie fecha de regreso</span>
                    <button onClick={()=> (setModalFecha(true), setBtnSelect("ida"))} className="px-2 py-4 bg-black text-white rounded-full text-[18px]">Cambiar fecha</button>
                  </div>
                }
                {vuelosIda.length == 0 && loadCambio &&
                <div className="flex justify-center items-center">
                  <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
                </div>
                }
              </div>
            )}

            {vueloIdaSeleccionado && tipViaje != "ida" && !vueloVueltaSeleccionado && (
              <div className="w-[90%]">
                <h2 className="text-xl font-semibold mb-2">Vuelo de ida seleccionado</h2>
                <CardVuelo vuelo={vueloIdaSeleccionado} pos={-1} />

                <h2 className="text-xl font-semibold my-4">Selecciona tu vuelo de regreso</h2>
                {vuelosVuelta.slice(0, 10).map((v, k) => (
                  <button key={k} onClick={() => setModalTarifa({ vuelo: v, tipo: 'vuelta' })} className="w-full">
                    <CardVuelo vuelo={v} pos={k} label={"Vuelta"}/>
                  </button>
                ))}
                {vuelosVuelta.length == 0 && !loadCambio &&
                  <div className="w-full flex flex-col mb-10">
                    <span className="font-semibold text-[16px] my-3">No se encontraron vuelos de regreso, por favor cambie fecha de regreso</span>
                    <button onClick={()=> (setModalFecha(true), setBtnSelect("vuelta"))} className="px-2 py-4 bg-black text-white rounded-full text-[18px]">Cambiar fecha</button>
                  </div>
                }
                {vuelosVuelta.length == 0 && loadCambio &&
                <div className="flex justify-center items-center">
                  <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
                </div>
                }
              </div>
            )}

            {vueloIdaSeleccionado && tipViaje != "ida" && vueloVueltaSeleccionado && (
              <div className="w-[90%] space-y-4">
                <h2 className="text-xl font-semibold">Resumen de tu viaje</h2>
                <CardVuelo vuelo={vueloIdaSeleccionado} pos={-1} />
                <CardVuelo vuelo={vueloVueltaSeleccionado} pos={-1} label={"Vuelta"} />
                <button
                  onClick={handlerCompra}
                  className="bg-black text-white w-full py-4 rounded-xl text-lg font-semibold"
                >
                  Comprar
                </button>
              </div>
            )}

            {vueloIdaSeleccionado && tipViaje == "ida" &&
                <div className="w-[90%] space-y-4">
                <h2 className="text-xl font-semibold">Resumen de tu viaje</h2>
                <CardVuelo vuelo={vueloIdaSeleccionado} pos={-1} />
                <button onClick={handlerCompra} className="bg-black text-white w-full py-4 rounded-full text-lg font-semibold">
                  Comprar
                </button>
              </div>
            }
          </div>
        </div>
      )}

      {modalFecha && <FechaModal close={handlerCloseFechaModal} back={handlerCloseFechaModal} onSelected={handlerCloseFechaModal} selectClick={btnSelect} />}
    </div>
  );
};

export { Viaje };
