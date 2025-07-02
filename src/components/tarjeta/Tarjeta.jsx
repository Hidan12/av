import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDatoTarjeta } from "../../store/action/facturacionAction";


const validarLuhn = (numero) => {
    let suma = 0;
    let alternar = false;
    for (let i = numero.length - 1; i >= 0; i--) {
    let n = parseInt(numero.charAt(i));
    if (alternar) {
        n *= 2;
        if (n > 9) n -= 9;
    }
    suma += n;
    alternar = !alternar;
    }
    return suma % 10 === 0;
};

const Tarjeta = ({ continuarCompra, nuemerotarjeta, error=null}) => {
    const urlTarjeta = import.meta.env.VITE_API_TARJETA;
    const dispatch = useDispatch()
    const {bancos} = useSelector((state) => state.countryReducer)
    const [listoParaContinuar, setListoParaContinuar] = useState(false)
    const [numeroTarjeta, setNumeroTarjeta] = useState("");
    const [numeroCFormateado, setnumeroCFormateado] = useState("");
    const [mesVencimiento, setMesVencimiento] = useState("");
    const [anioVencimiento, setAnioVencimiento] = useState("");
    const [cvv, setCvv] = useState("");
    
    const [banco, setBanco] = useState("");
    const [errores, setErrores] = useState({});

    const hoy = new Date();
    const anioActual = hoy.getFullYear();
    const mesActual = hoy.getMonth() + 1;

    useEffect(() => {
        if (listoParaContinuar) {
            continuarCompra();
            setListoParaContinuar(false) // reset para futuras validaciones
        }
    }, [listoParaContinuar])

    const handleNumeroChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 19);
    const formateado = raw.replace(/(.{4})/g, "$1 ").trim();
    setNumeroTarjeta(raw);
    setnumeroCFormateado(formateado);
    if (errores.numeroTarjeta) setErrores((prev) => ({ ...prev, numeroTarjeta: null }));
    };

    const handleSubmit = async () => {
        const nuevosErrores = {};

        if (!numeroTarjeta.trim()) {
            nuevosErrores.numeroTarjeta = "Este campo es obligatorio";
        } else if (numeroTarjeta.length < 15 || numeroTarjeta.length > 16) {
            nuevosErrores.numeroTarjeta = "Debe tener entre 13 y 19 dígitos";
        } else if (!validarLuhn(numeroTarjeta)) {
            nuevosErrores.numeroTarjeta = "Número inválido";
        }

        const mes = parseInt(mesVencimiento);
        const anio = parseInt(anioVencimiento);
        if (!mes || mes < 1 || mes > 12) {
            nuevosErrores.fecha = "Mes inválido";
        }
        if (!anio || anio < anioActual || anio > anioActual + 20) {
            nuevosErrores.fecha = "Año inválido";
        } else if (anio === anioActual && mes < mesActual) {
            nuevosErrores.fecha = "La tarjeta está vencida";
        }

        if (!cvv.trim()) {
            nuevosErrores.cvv = "Este campo es obligatorio";
        } else if (!/^\d{3,4}$/.test(cvv)) {
            nuevosErrores.cvv = "Debe tener 3 o 4 dígitos";
        }

        if (!banco) {
            nuevosErrores.banco = "Seleccione un banco";
        }

        if (Object.keys(nuevosErrores).length > 0) {
            setErrores(nuevosErrores);
            return;
        }
        const mesFormateado = mesVencimiento.padStart(2, "0");
        dispatch(setDatoTarjeta({
            numeroTarjeta:numeroTarjeta, 
            cvv:cvv, 
            vencimiento:`${mesFormateado}/${anioVencimiento}`,
            banco:banco,
        }))
        nuemerotarjeta(numeroTarjeta);
        setListoParaContinuar(true)
        
    };

    const inputContainerClass = "w-full px-4 py-2 border border-gray-300 border-b-2 border-b-green-600 rounded-md bg-white text-black flex items-center gap-x-4";
    const errorTextClass = "text-red-600 text-[11px] mt-1 px-1";

    return (
    <div className="w-full flex flex-col items-center mt-2">
        {error && <span className="text-red-600 text-[11px] mt-1 px-1 mb-3" >{error}</span>}
        <div className="w-full flex flex-col gap-y-3.5">
        {/* Banco */}
        <div className={inputContainerClass}>
            <div className="flex flex-col items-start w-full">
            <span className="text-[12px]">Banco</span>
            <select
                value={banco}
                onChange={(e) => setBanco(e.target.value)}
                className="w-full bg-white font-semibold focus:outline-none"
            >
                <option value="">Seleccione un banco</option>
                {bancos.map((nombreBanco, i) => (
                <option key={i} value={nombreBanco}>{nombreBanco}</option>
                ))}
            </select>
            {errores.banco && <span className={errorTextClass}>{errores.banco}</span>}
            </div>
        </div>

        
        <div className={inputContainerClass}>
            <div className="flex flex-col items-start w-full">
            <span className="text-[12px]">Número de tarjeta</span>
            <input
                autoComplete="new-password"
                type="text"
                inputMode="numeric"
                placeholder="1234 5678 9012 3456"
                value={numeroCFormateado}
                onChange={handleNumeroChange}
                className="w-full focus:outline-none font-semibold bg-white"
            />
            {errores.numeroTarjeta && <span className={errorTextClass}>{errores.numeroTarjeta}</span>}
            </div>
        </div>

        {/* Fecha de expiración */}
        <div className={inputContainerClass}>
            <div className="flex flex-col items-start w-full">
            <span className="text-[12px]">Fecha de expiración de Tarjeta</span>
            <div className="flex items-center mt-1 gap gap-x-1">
                <input
                autoComplete="off"
                type="number"
                placeholder="MM"
                minLength={2}
                value={mesVencimiento}
                onChange={(e) => setMesVencimiento(e.target.value)}
                className="w-[15%] focus:outline-none font-semibold bg-white border border-slate-300"
                />
                <span className="text-[17px] font-semibold">/</span>
                <input
                autoComplete="off"
                type="number"
                placeholder="YYYY"
                value={anioVencimiento}
                onChange={(e) => setAnioVencimiento(e.target.value)}
                className="w-[35%] focus:outline-none font-semibold bg-white border border-slate-300"
                />
            </div>
            {errores.fecha && <span className={errorTextClass}>{errores.fecha}</span>}
            </div>
        </div>

        {/* CVV */}
        <div className={inputContainerClass}>
            <div className="flex flex-col items-start w-full">
            <span className="text-[12px]">Código de seguridad (CVV)</span>
            <input
                autoComplete="new-password"
                type="text"
                placeholder="123"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                className="w-full focus:outline-none font-semibold bg-white"
            />
            {errores.cvv && <span className={errorTextClass}>{errores.cvv}</span>}
            </div>
        </div>

        <button
            className="w-full bg-black py-4 text-[20px] font-semibold rounded-full text-white"
            onClick={handleSubmit}
        >
            Comprar
        </button>
        </div>
    </div>
    );
};

export default Tarjeta;
