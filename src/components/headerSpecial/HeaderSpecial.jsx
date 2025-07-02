import { useNavigate } from "react-router-dom"
import logo from "../../assets/svg/a_icon_banner.png"
import { useSelector } from "react-redux";

const HeaderSpecial = ()=>{
    const { precio, cantPasajeros } = useSelector(state => state.reducerHome);
    const { money } = useSelector(state => state.countryReducer);
    const navigate = useNavigate()
    const handlerLogo = ()=>{
        navigate("/")
    }
    return(
        <div className="w-full h-[10vh] bg-black flex justify-center items-center">
            <a href="/" className="w-[50%]">
                <picture  className="w-[90%]">
                    <img src={logo} className="w-[10vw] object-contain" alt="" />
                </picture>
            </a>
            {precio > 0 && 
            <div className="w-[50%] flex justify-end gap gap-x-2 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-cart-fill" viewBox="0 0 16 16">
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                </svg>
                <span className="font-semibold text-white text-[18px]">{money}</span>
                <span className="text-white text-[18px]">{(precio * cantPasajeros).toLocaleString('es-CO')}</span>
            </div>
            
            }
        </div>
    )
}
export {HeaderSpecial}