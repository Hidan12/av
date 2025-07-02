import { useNavigate } from "react-router-dom"
import logo from "../../assets/logos/avianca_full.svg"
import { useEffect } from "react";
const ErrorCompra = ()=>{

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
                    <h3 className="text-[20px] font-semibold">Ocurrió un error</h3>
                    <span className="w-[90%] text-[15px]">Lo sentimos, no pudimos procesar tu pago en este momento. Puede que haya ocurrido un problema temporal con tu banco o con nuestro sistema de pagos.</span>
    
                    <div className="w-[90%] mt-12">
                        
                    </div>
                </div>
    
            </div>
        )
}

export {ErrorCompra}