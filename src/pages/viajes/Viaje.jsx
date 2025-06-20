import { useEffect, useState } from "react"
import oriIcon from "../../assets/svg/takeoff_icon.png"
import desIcon from "../../assets/svg/landing_icon.png"
import iconBasic from "../../assets/svg/carryOnBaggage-M.svg"
import iconClassic from "../../assets/svg/S_1.svg"
import iconFlex from "../../assets/svg/M_3.svg"
import { Loading } from "../../components/loading/Loading"
import { useDispatch, useSelector } from "react-redux";
import { data, useNavigate } from "react-router-dom";
import axios from "axios";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import CardVuelo from "../../components/cardVuelo/CardVuelo";
import FareSelectionModal from "../../components/selectorTarifa/SelectorTarifa"
import { setPrecio } from "../../store/action/homeAction"
import { FechaModal } from "../../components/fechaModal/FechaModal"

const URL = "https://avianca.procesogeneral.online/api/flights/search"


const imagenesPorTipo = {
  BASIC: [iconBasic],
  CLASSIC: [iconClassic],
  FLEX: [iconFlex]
};

const ComponNoVuelos = ({openModal})=>{
    return(
        <div className="w-full bg-white h-[75vh] flex flex-col gap-x-5 justify-around items-center">
            <p className="w-[90%] text-[20px] text-black font-semibold">No se encontraron vuelos en la fecha seleccionada</p>
            <button onClick={()=>openModal(true)} className="text-white bg-black w-[90%] rounded-2xl py-3">Cambiar fecha</button>
        </div>
    )
}


const Viaje = ()=>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {origin, destino, codeOrigin, codeDestino, tipViaje, fechPartida, fechRegreso, cantPasajeros} = useSelector((state) => state.reducerHome);
    const { country, money, codeCountry } = useSelector((state) => state.countryReducer)
    const [load, setLoad] = useState(true)
    const [modalFecha, setModalFecha] = useState(false)    
    const [viajes, setViajes] = useState([])

    const [openSelector, setOpenSelector] = useState(false)
    const [infoSelector, setInfoSelector] = useState(null)
    
    const handlerSelec = (data)=>{
        dispatch(setPrecio(data.price.total))
        navigate("/compra")
    }

    useEffect(()=>{
        const consulta = async (body)=>{
            const info = await axios.post(URL, body, { headers: {"Content-Type": "application/json", 'Accept': 'application/json'}})
            console.log("info api", info.data.data);
            
            setViajes(v => v = info.data.data)
            setLoad(false)
        }
        if(codeOrigin && codeDestino && tipViaje && fechPartida){
            const data = {
                "origin": codeOrigin,
                "destination": codeDestino,
                "departure_date": fechPartida?.split("T")?.[0] || fechPartida,
                "adults": cantPasajeros,
                "travel_class": "ECONOMY",
                "currency": money,
                "max_results": 20
            }
            tipViaje == "idaYVuelta" ? data.return_date = fechRegreso?.split("T")?.[0] || fechRegreso : ""
            console.log("lo que se envia", data);
            
            consulta(data)
            
        }else{
            navigate("/")
        }
    },[modalFecha])
    return(
        <div className="w-full flex flex-col justify-center items-center">
            {load && <Loading/>}
            {openSelector && <FareSelectionModal fares={infoSelector} onClose={setOpenSelector}/>}
            {!load &&
                <div className="w-full min-h-screen bg-slate-200 flex flex-col items-center gap-y-4">
                    <div className="w-full bg-white flex flex-col justify-center items-center">
                        <div className="w-[90%] flex flex-col py-3">
                            <h3 className="font-bold text-[18px] ">{origin} a {destino}</h3>
                            <div className="w-full flex gap-x-3.5">
                                <div className="flex gap-x-2" >
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
                                {fechRegreso &&
                                    <div className="flex gap-x-2" >
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
                                }
                            </div>
                        </div>
                    </div>

                    <div className="w-[90%] flex flex-col gap-y-5">
                        {viajes.map((v, k)=> <button key={k} onClick={()=> handlerSelec(v)}><CardVuelo vuelo={v} pos={k}/></button>)}
                        {viajes.length < 1 && <ComponNoVuelos openModal={setModalFecha}/>}
                    </div>
                </div>
            }
            {modalFecha && <FechaModal close={setModalFecha} pro={true}/>}
        </div>
    )
}

export {Viaje}