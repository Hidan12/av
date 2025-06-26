import { useNavigate } from "react-router-dom"
import logo from "../../assets/svg/a_icon_banner.png"

const HeaderSpecial = ()=>{
    const navigate = useNavigate()
    const handlerLogo = ()=>{
        navigate("/")
    }
    return(
        <div className="w-full h-[10vh] bg-black flex justify-center items-center">
            <a href="/" className="w-[90%]">
                <picture  className="w-[90%]">
                    <img src={logo} className="w-[10vw] object-contain" alt="" />
                </picture>
            </a>

        </div>
    )
}
export {HeaderSpecial}