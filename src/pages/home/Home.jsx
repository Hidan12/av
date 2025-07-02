import { useDispatch, useSelector } from "react-redux"
import "./home.css"
import bgImg from "../../assets/svg/header_bg_blue.png"
import rows from "../../assets/svg/flight-direction-icon.png"
import oriIcon from "../../assets/svg/takeoff_icon.png"
import desIcon from "../../assets/svg/landing_icon.png"
import { useEffect, useState } from "react";
import { setHome, tipoViaje } from "../../store/action/homeAction"
import { SelectDestino } from "../../components/selectDestino/SelectDestino"
import { FechaModal } from "../../components/fechaModal/FechaModal"
import { countryMoney } from "../../store/action/countryAction"
import { Loading } from "../../components/loading/Loading"
import axios from "axios"
import { Buscar } from "../../components/buscar/Buscar"


const UrlUbicacion = import.meta.env.VITE_API_URL_BASIC

const Home = ()=>{
  const dispatch = useDispatch()
  const [btnSelect, setBtnSelect] = useState("")
  const [btnBuscar, setBtnBuscar] = useState(false)
  
  const {origin, img, destino, tipViaje, cargando} = useSelector(state => state.reducerHome)
  
  const handlerCloseBuscar = ()=> {
    setBtnBuscar(c => c = !c)
  }
  const handlerBuscar = ()=>{
    setBtnBuscar(true)
  }

  useEffect(() => {
    const obtenerUbicacion = async ()=>{
       const ubi = await axios.get(`${UrlUbicacion}/location`)
       dispatch(setHome(ubi.data.location))
       dispatch(countryMoney(ubi.data.location))
    }
    obtenerUbicacion()
  }, [])

    
    return(
      <>
        {!cargando ? 
          (
            <div className="flex w-full flex-col items-center">
              {btnBuscar && <Buscar closeModal={handlerCloseBuscar} clickSelect={btnSelect}/>}
              <div className="w-full h-[50vh] flex  justify-center bg-cover bg-center" style={{ backgroundImage: `url(${bgImg})` }}>
                <div className="w-[90%] flex flex-col mt-4 bg-white/50 items-center   rounded-[15px]">
                <div className="w-[80%] h-[8vh] my-4 gap-x-5  bg-white px-4 py-3 flex rounded-[50px]">
                  <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="tipo-viaje" value="idaYVuelta" checked={tipViaje === "idaYVuelta"} onChange={(e) => dispatch(tipoViaje(e.target.value))} className="w-5 h-5 appearance-none rounded-full border-1 border-black bg-white  checked:bg-white checked:w-3 checked:h-3 checked:border-green-600 checked:ring-4 checked:ring-green-600"/>
                      <span className={`text-black text-[14px] ${tipViaje == "idaYVuelta" ? "font-semibold" : "font-normal"}`}>Ida y vuelta</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="tipo-viaje" value="ida" checked={tipViaje === "ida"} onChange={(e) => dispatch(tipoViaje(e.target.value))} className="w-5 h-5 appearance-none rounded-full border-1 border-black bg-white  checked:bg-white checked:w-3 checked:h-3 checked:border-green-600 checked:ring-4 checked:ring-green-600"/>
                      <span className={`text-black text-[14px] ${tipViaje == "ida" ? "font-semibold" : "font-normal"}`}>Solo ida</span>
                  </label>
                </div>
                <div className="w-full h-full flex flex-col items-center bg-white gap-y-1.5 rounded-[20px]">
                  <div className="w-[85%] flex  border-1 border-gray-200 mt-4">
                    <button className="w-[45%] flex items-center justify-center gap-2" onClick={()=>(handlerBuscar(), setBtnSelect("Origen"))}>
                      <img src={oriIcon} className="w-5 h-8 object-contain" alt="" />
                      <div className="flex flex-col items-start w-[70%]">
                        <span className="text-gray-400 text-[10px] text-start w-full">Origen</span>
                        <span className="text-[15px] text-start w-full font-bold whitespace-nowrap overflow-hidden text-ellipsis">
                          {origin}
                        </span>
                      </div>
                    </button>

                    <img src={rows} className="w-5 h-14 object-contain" alt="" />

                    <button className="w-[45%] flex items-center justify-center gap-2" onClick={()=>(handlerBuscar(), setBtnSelect("Destino"))}>
                      <img src={desIcon} className="w-5 h-8 object-contain" alt="" />
                      <div className="flex flex-col items-start w-[70%]">
                        <span className="text-gray-400 text-[10px] text-start w-full">Destino</span>
                        <span className="text-[15px] text-start w-full font-bold whitespace-nowrap overflow-hidden text-ellipsis">
                          {destino || "Destino"}
                        </span>
                      </div>
                    </button>
                  </div>
                  <div className="w-[85%] mt-5">
                    <button onClick={()=>handlerBuscar()} className="w-full bg-black rounded-[50px] py-4 text-center font-bold text-[20px] text-white">
                      Buscar
                    </button>
                  </div>
                </div>
                  
                </div>
              </div>
              
              <div className="w-full mt-2.5">
                {img && <img src={img} className="w-full object-contain" alt="" />}
              </div>
            
            </div>
          ):
          <Loading/>
        }
      </>
    )
}
export default Home