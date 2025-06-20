import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cantidadPasajeros, ClearFecha, fechaPartida, fechaRegreso } from "../../store/action/homeAction";
import { useNavigate } from "react-router-dom";

const FechaModal = ({close, pro = false}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { origin, destino, tipViaje, fechPartida, fechRegreso } = useSelector((state) => state.reducerHome);
    
    const [error, setError] = useState({})

    const [fecha, setFecha] = useState(fechPartida);
    const [mostrarCalendario, setMostrarCalendario] = useState(false);

    const [fechaVuelta, setFechaVuelta] = useState(fechRegreso);
    const [mostrarCalendarioVuelta, setMostrarCalendarioVuelta] = useState(false);

    const [pasajeros, setPasajeros] = useState(0);

    const toggleCalendario = () => setMostrarCalendario((prev) => !prev);
    const toggleCalendarioVuelta = () => {
       if(fecha) setMostrarCalendarioVuelta((prev) => !prev);
    }

    const seleccionarFecha = (date) => {
    setFecha(date);
    setMostrarCalendario(false);
    };

    const handlerBuscar = ()=>{
        if (!fecha || (!fechaVuelta && tipViaje === "idaYVuelta") || pasajeros == 0) {
            if(!fecha) setError(e => e = {...e, fecha:"Seleccione una fecha de partida"})
            if(!fechaVuelta && tipViaje === "idaYVuelta") setError(e => e = {...e, fechaVuelta:"Seleccione una fecha de regreso"})
            if(pasajeros == 0) setError(e => e = {...e, pasajeros:"Ingrese un numero mayor a 0"})
            console.log(error);
            
        }else{
            console.log("entroooooo");
            
            dispatch(fechaPartida(fecha?.toISOString?.() || fecha))
            if(fechaVuelta && tipViaje === "idaYVuelta") dispatch(fechaRegreso(fechaVuelta?.toISOString?.() || fechaVuelta))
            dispatch(cantidadPasajeros(pasajeros))
            if(!pro) navigate("/viaje")
            if(pro) close(false)
        }
    }

    const seleccionarFechaVuelta = (date) => {
    setFechaVuelta(date);
    setMostrarCalendarioVuelta(false);
    };

    useEffect(()=>{
        dispatch(ClearFecha())
    },[dispatch])

    return (
    <div className="fixed inset-0 top-0 bg-black bg-opacity-80 flex justify-center z-50">
        <div className="w-full flex flex-col bg-black">
        {/* Encabezado */}
        <div className="bg-black text-white py-4 px-5 flex justify-between items-center w-full">
            <button onClick={() => close((c) => !c)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5" />
            </svg>
            </button>
            <h2 className="text-[30px] font-semibold">Fecha</h2>
            <button onClick={() => close((c) => !c)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg>
            </button>
        </div>

        {/* Cuerpo */}
        <div className="px-6 py-5 rounded-t-2xl overflow-hidden shadow-xl bg-white h-screen space-y-4">

            {/* Botón Ida */}
            <button
            onClick={toggleCalendario}
            className="w-full px-4 py-2 border border-gray-300 border-b-2 border-b-green-600 rounded-md bg-white text-black flex items-center gap-x-4"
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-calendar3" viewBox="0 0 16 16">
                <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z" />
                <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
            </svg>
            <div className="flex flex-col items-start">
                <span className="text-[12px]">Ida</span>
                {fecha ? <span className="font-semibold">{format(fecha, "dd/MM/yyyy")}</span> : <span className="font-semibold">Seleccionar fecha</span>}
            </div>
            </button>
            {error?.fecha && <p className="mb-4 text-[14px] text-red-700">{error.fecha}</p>}

            {mostrarCalendario && (
            <div className="absolute z-50 mt-2">
                <DatePicker selected={fecha} onChange={seleccionarFecha} inline minDate={new Date()}/>
            </div>
            )}

            {/* Botón Vuelta (solo si ida y vuelta) */}
            {tipViaje === "idaYVuelta" && (
            <>
                <button onClick={toggleCalendarioVuelta} className="w-full px-4 py-2 border border-gray-300 border-b-2 border-b-green-600 rounded-md bg-white text-black flex items-center gap-x-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-calendar3" viewBox="0 0 16 16">
                    <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z" />
                    <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                </svg>
                <div className="flex flex-col items-start">
                    <span className="text-[12px]">Vuelta</span>
                    {fechaVuelta ? <span className="font-semibold">{format(fechaVuelta, "dd/MM/yyyy")}</span> : <span className="font-semibold">Seleccionar fecha</span>}
                </div>
                </button>

                {mostrarCalendarioVuelta && (
                <div className="absolute z-50 mt-2">
                    <DatePicker selected={fechaVuelta} onChange={seleccionarFechaVuelta} inline minDate={fecha || new Date()} />
                </div>
                )}
            </>
            )}
            {error?.fechaVuelta && <p className="mb-4 text-[14px] text-red-700">{error.fechaVuelta}</p>}
            
            <div className="w-full px-4 py-2 border border-gray-300 border-b-2 border-b-green-600 rounded-md bg-white text-black flex items-center gap-x-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                </svg>
                <div className="flex flex-col items-start w-full">
                    <span className="text-[12px]">Pasajeros</span>
                    <input
                    type="number"
                    min="1"
                    value={pasajeros > 0 ? pasajeros : ""}
                    onChange={(e) => setPasajeros(e.target.value)}
                    placeholder="Cantidad de pasajeros"
                    className="w-full focus:outline-none font-semibold bg-white"
                    />
                </div>
            </div>
            {error?.pasajeros && <p className="mb-4 text-[14px] text-red-700">{error.pasajeros}</p>}
            

            <button onClick={()=>handlerBuscar()} className="w-full px-4 py-2 bg-black rounded-2xl text-center text-white text-[20px]">
                Buscar
            </button>


        </div>
        </div>
    </div>
    );
};

export { FechaModal };
