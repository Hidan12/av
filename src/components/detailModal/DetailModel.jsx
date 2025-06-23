import rows from "../../assets/svg/flight-direction-icon.png"
import oriIcon from "../../assets/svg/takeoff_icon.png"
import desIcon from "../../assets/svg/landing_icon.png"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tipoViaje } from "../../store/action/homeAction";
import { format } from "date-fns";
import { SelectDestino } from "../selectDestino/SelectDestino";
import { FechaModal } from "../fechaModal/FechaModal";
import { Pasajeros } from "../pasajeros/Pasajeros";
import { useNavigate } from "react-router-dom";

const ajustarZonaHoraria = (fecha) => {
  const offsetMs = fecha.getTimezoneOffset() * 60 * 1000;
  return new Date(fecha.getTime() + offsetMs);
};

const formatFecha = (fecha) =>
  fecha ? format(ajustarZonaHoraria(new Date(fecha)), "dd/MM/yyyy") : "Seleccionar";

const DetailModel = ({back})=>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [showOrigenModal, setShowOrigenModal] = useState(false);
    const [showDestinoModal, setShowDestinoModal] = useState(false);
    const [showFecha, setShowFecha] = useState(false)
    const [showPasajero, setShowPasajero] = useState(false)
    const [selectFecha, setSelectFecha] = useState("")
    const {origin, destino, tipViaje, fechPartida, fechRegreso, cantPasajeros} = useSelector(state => state.reducerHome)

    
    
    //origen
    const handleSelectOrigen = () => {
        setShowOrigenModal(false);
    };
    const handlerBackorigin = ()=>{
        setShowOrigenModal(false)
    }
    const handlerClickOrigen = ()=>{
        setShowOrigenModal(true)
    }

    //destino
    const handlerBackDestino = ()=>{
        setShowDestinoModal(false)
    }
    const handleSelectDestino = () => {
        setShowDestinoModal(false)
    };
    const handlerClickDestino = ()=>{
        setShowDestinoModal(true)
    }

    //fecha
    const handlerSelectFecha = ()=>{
        setShowFecha(false)
    }
    const handlerBackFecha = ()=>{
        setShowFecha(false)
    }
    const handlerClickFecha = (value) =>{
        setShowFecha(true)
        setSelectFecha(value)
    }

    //pasajeros
    const handlerBackPasajero = ()=>{
        setShowPasajero(false)
    }
    const handlerSelectPasajeros = ()=>{
        setShowPasajero(false)
    }
    const handlerClickPasajero = ()=>{
        setShowPasajero(true)
    }

    const handlerBuscar = ()=>{
        if (origin && destino && tipViaje && fechPartida && (tipViaje == "idaYVuelta" ? fechRegreso: true) && cantPasajeros > 0) {
            navigate("/viaje")
        }else{
            console.log("entro al else", (tipViaje == "idaYVuelta" && fechRegreso),tipViaje );
            
        }
    }

    return(
        <div className="fixed top-0 w-full h-screen bg-white bg-opacity-50 flex  z-50">
            {showOrigenModal && (
            <SelectDestino close={handlerBackorigin} back={handlerBackorigin} selectClick="Origen" onSelected={handleSelectOrigen} />
            )}

            {showDestinoModal && (
            <SelectDestino close={handlerBackDestino} back={handlerBackDestino} selectClick="Destino" onSelected={handleSelectDestino} clDestino={setShowDestinoModal} fecha={setShowFecha}/>
            )}
            {showFecha && destino && <FechaModal back={handlerBackFecha} close={handlerBackFecha} onSelected={handlerSelectFecha} selectClick={selectFecha}/>}
            {showPasajero && <Pasajeros close={handlerBackPasajero} back={handlerBackPasajero} selectPasajero={handlerSelectPasajeros}/>}
            <div className="bg-black w-full  overflow-hidden">
                {/* Header */}
                <div className="bg-black text-white py-4 px-5 flex justify-between items-center w-full">
                    <button onClick={()=>back()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"/>
                        </svg>
                    </button>
                    <h2 className="text-[25px] font-semibold">Reserva tu vuelo</h2>
                    <div>
                        
                    </div>
                </div>
                <div className="w-full h-screen bg-white rounded-2xl flex flex-col items-center">
                    {/* seleccion de Tipo de viaje */}
                    <div className="w-[90%] flex justify-center items-center">
                        <div className="w-[80%] h-[8vh] shadow-2xl my-4 gap-x-5  bg-white px-4 py-3 flex rounded-[50px]">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="tipo-viaje" value="idaYVuelta" checked={tipViaje === "idaYVuelta"} onChange={(e) => dispatch(tipoViaje(e.target.value))} className="w-5 h-5 appearance-none rounded-full border-1 border-black bg-white  checked:bg-white checked:w-3 checked:h-3 checked:border-green-600 checked:ring-4 checked:ring-green-600"/>
                                <span className={`text-black text-[13px] ${tipViaje == "idaYVuelta" ? "font-bold" : "font-normal"}`}>Ida y vuelta</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="tipo-viaje" value="ida" checked={tipViaje === "ida"} onChange={(e) => dispatch(tipoViaje(e.target.value))} className="w-5 h-5 appearance-none rounded-full border-1 border-black bg-white  checked:bg-white checked:w-3 checked:h-3 checked:border-green-600 checked:ring-4 checked:ring-green-600"/>
                                <span className={`text-black text-[13px] ${tipViaje == "ida" ? "font-bold" : "font-normal"}`}>Solo ida</span>
                            </label>
                        </div>
                    </div>

                    {/* seleccion de origen / destino */}
                    <div className="w-full flex flex-col items-center bg-white gap-y-1.5 rounded-[20px]">
                        <div className="w-[85%] flex  border-1 border-gray-200 mt-4">
                        <button className="w-[45%] flex items-center justify-center gap-2" onClick={()=> handlerClickOrigen()}>
                            <img src={oriIcon} className="w-5 h-8 object-contain" alt="" />
                            <div className="flex flex-col items-start w-[70%]">
                            <span className="text-gray-400 text-[10px] text-start w-full">Origen</span>
                            <span className="text-[15px] text-start w-full font-bold whitespace-nowrap overflow-hidden text-ellipsis">
                                {origin}
                            </span>
                            </div>
                        </button>
    
                        <img src={rows} className="w-5 h-14 object-contain" alt="" />
    
                        <button className="w-[45%] flex items-center justify-center gap-2" onClick={()=> handlerClickDestino()}>
                            <img src={desIcon} className="w-5 h-8 object-contain" alt="" />
                            <div className="flex flex-col items-start w-[70%]">
                            <span className="text-gray-400 text-[10px] text-start w-full">Destino</span>
                            <span className="text-[15px] text-start w-full font-bold whitespace-nowrap overflow-hidden text-ellipsis">
                                {destino || "Destino"}
                            </span>
                            </div>
                        </button>
                        </div>
                        
                    </div>

                    {/* fecha */}
                    <div className="w-[85%] flex items-center mt-4 bg-white gap-y-1.5 rounded-[20px]">
                        <div className={` flex justify-center items-center ${tipViaje == "idaYVuelta" ? "w-[50%] border-slate-300 border-t-1 border-b-1 border-l-1":"w-full border-1 border-slate-300"}`}>
                            <button onClick={()=> handlerClickFecha("ida")} className="w-full flex items-center gap gap-x-4 p-1  text-black">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-calendar3 pl-1.5" viewBox="0 0 16 16">
                                    <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z"/>
                                    <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
                                </svg>
                                <div className="w-full flex flex-col justify-start">
                                    <span className="text-start text-[13px] text-gray-500">Ida</span>
                                    <span className="text-start text-[15px] font-semibold">{formatFecha(fechPartida)}</span>
                                </div>
                            </button>
                        </div>
                        {tipViaje == "idaYVuelta" && 
                            <div className={` flex justify-center items-center ${tipViaje == "idaYVuelta" ? "w-[50%] border-slate-300 border-t-1 border-b-1 border-r-1":"w-full border-1 border-slate-300"}`}>
                                <button onClick={()=> handlerClickFecha("vuelta")} className="w-full flex items-center gap gap-x-4 p-1  text-black border-l-1 border-slate-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-calendar3 pl-1.5" viewBox="0 0 16 16">
                                        <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z"/>
                                        <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
                                    </svg>
                                    <div className="w-full  flex flex-col justify-start">
                                        <span className={`text-start text-[13px] text-gray-500 ${!fechRegreso ?  "p-[10px]":""}`}>{fechRegreso ?  "Vuelta":""}</span>
                                        <span className="text-start text-[15px] font-semibold">{fechRegreso ? formatFecha(fechRegreso): "Vuelta"}</span>
                                    </div>
                                </button>
                            </div>
                        }
                    </div>

                    {/* cantidad de pasajeros */}
                    <button onClick={()=> handlerClickPasajero()} className={`w-[85%] mt-2.5 flex items-center border border-slate-300 gap-x-2 text-left px-4 py-2 bg-white text-black shadow-sm hover:bg-gray-50 `}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-fill-add" viewBox="0 0 16 16">
                            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                            <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
                        </svg>
                        <span className="text-[20px] font-medium">{cantPasajeros}</span>
                    </button>

                    <div className="w-[85%] justify-center mt-2.5 ">
                        <button onClick={()=> handlerBuscar()} className="w-full bg-black text-center rounded-full text-white py-4">
                            Buscar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export {DetailModel}