import { useState } from "react";

const Mensaje = ({close, label, min=4, max=10, error=null})=>{
    const [clave, setClave] = useState("");
    const [errores, setErrores] = useState({});


    
    const handlerClave = (v) => setClave(v.target.value);

    const handlerValidar = () => {
    const nuevosErrores = {};


    if (!clave || clave.trim().length < min && clave.trim().length < max) {
        nuevosErrores.clave = "La clave debe tener al menos 4 caracteres.";
    }
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length === 0) {
        close(clave);
    }
    };

    return (
    <div className="w-full flex flex-col justify-center mt-9 items-center gap gap-y-3">
        {error && <span className="text-red-600 text-[11px] mt-1 px-1 mb-3">{error}</span>}
        {/* CLAVE */}
        <div className="w-[90%] p-2 flex flex-col border border-slate-300 border-b-2 border-b-green-600">
            <span className="text-[12px] font-semibold">{label}</span>
            <input
                autoComplete="off"
                className="font-semibold h-[30px] w-full focus:outline-none pl-1.5"
                type="password"
                onChange={handlerClave}
                value={clave}
            />
            {errores.clave && <span className="text-red-500 text-sm">{errores.clave}</span>}
        </div>

        {/* BOTÓN */}
        <div className="w-[90%]">
            <button
                onClick={handlerValidar}
                className="w-full text-white bg-black rounded-full py-4"
            >
                Validar
            </button>
        </div>
    </div>
    );
}

export {Mensaje}