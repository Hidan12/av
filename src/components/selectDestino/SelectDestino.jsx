import { useEffect, useState } from "react";
import oriIcon from "../../assets/svg/takeoff_icon.png"
import desIcon from "../../assets/svg/landing_icon.png"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { changeDestino, changeOrigin } from "../../store/action/homeAction";

const url = "https://avianca.procesogeneral.online/api/search-destinations"

const SelectDestino = ({close, select, onSelected, clDestino, fecha})=>{
    const {origin, destino,} = useSelector(state => state.reducerHome)
    
    const [origenInput, setOrigen] = useState(select == "Origen" ? origin : destino)
    const [ciudades, setCiudades] = useState(null)
    const dispatch = useDispatch()
    
    
    useEffect(()=>{
        const search = async ()=>{
            const city = await axios.post(url, {search: origenInput}, { headers: {"Content-Type": "application/json",'Accept': 'application/json'}});
            setCiudades(c => c = city.data.destinations)
        }
        if (origenInput && origenInput !="") {
            search()
        }else{
            setCiudades(null)
        }
    },[origenInput])

    const handlerCity = (data)=>{
      if (select == "Origen") {
        dispatch(changeOrigin({origin:data.city, code:data.code}))
        close(c => c = !c)
      } else {
        dispatch(changeDestino({origin:data.city, code:data.code}))
        clDestino(true)
        fecha(true)
      }
      if (onSelected) onSelected(true);
    }

    return (
    <div className="fixed inset-0 top-0 bg-black bg-opacity-80 flex justify-center z-50">
        
      <div className="w-full flex flex-col bg-black">
        {/* Encabezado */}
        <div className="bg-black text-white py-4 px-5 flex justify-between items-center w-full">
          <button onClick={()=>close(c=> c = !c)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"/>
            </svg>
          </button>
          <h2 className="text-[30px] font-semibold">{select}</h2>
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
            </svg>
          </button>
        </div>

        {/* Input de origen */}
        <div className="px-6 py-5 rounded-t-2xl overflow-hidden shadow-xl bg-white h-screen">
          <div className="border border-gray-300 rounded-lg flex items-center px-4 py-3 focus-within:ring-2 focus-within:ring-green-500 gap-x-3.5">
            <img src={select == "Origen" ? oriIcon : desIcon} className="w-5 h-8 object-contain" alt="" />
            <input
              type="text"
              placeholder={select}
              value={origenInput || ""}
              onChange={(e) => setOrigen(e.target.value)}
              className="outline-none w-full text-black placeholder:text-gray-500"
            />
          </div>

          <div>
            {ciudades && ciudades.length > 0 && 
              ciudades.map((c, k) =>
                <button key={k} className="py-2 border-b-1 border-b-slate-200" onClick={()=>handlerCity(c)}>
                  <span className="text-[19px]">{c.city} ({c.country}) {c.code}</span>
                </button>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}


export {SelectDestino}