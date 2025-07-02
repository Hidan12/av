import { useNavigate } from "react-router-dom"
import logo from "../../assets/logos/avianca_full.svg"
import { useEffect } from "react";
const CompraExitosa = ()=>{
    const navigate = useNavigate()

    useEffect(()=>{
    
    if (!origin || !destino || !fechPartida) {
      navigate("/")
    }
  },[])
  
    useEffect(() => {


        const timeout = setTimeout(() => {
        window.location.href = "http://avianca.com"
        }, 5000);

        return () => clearTimeout(timeout); // Limpieza por si se desmonta antes
    }, []);
    return(
        <div className="w-full flex justify-center items-center bg-slate-200">
            <div className="w-[90%] min-h-screen bg-white flex flex-col items-center gap gap-y-5">
                <img src={logo} className="w-[50vw] h-[20vw] object-contain" alt="" />
                <h3 className="text-[20px] font-semibold">¡Pago Exitoso!</h3>
                <span className="w-[90%] text-[15px]">Tu pago ha sido procesado correctamente. Hemos enviado un correo electrónico con los detalles de tu reserva.
            Gracias por volar con Avianca.</span>

                <div className="w-[90%] mt-12">

                </div>
            </div>

        </div>
    )
}

export {CompraExitosa}