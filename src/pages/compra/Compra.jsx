import { useEffect, useState } from "react"
import { Loading } from "../../components/loading/Loading"
import step2 from "../../assets/svg/step_2_header.png"
import step3 from "../../assets/svg/step_3_header.png"
import { useSelector } from "react-redux"
import diner from "../../assets/svg/diners.svg"
import visa from "../../assets/svg/visa.svg"
import mastercard from "../../assets/svg/mc.svg"
import { useNavigate } from "react-router-dom"

const ComponetForm = ({ change }) => {
  const { cantPasajeros } = useSelector((state) => state.reducerHome);
  const [pasajeros, setPasajeros] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    celular: "",
    documento: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Oculta el error si empieza a escribir
  };

  const guardarPasajero = () => {
    const { nombre, email, celular, documento } = formData;
    if (!nombre || !email || !celular || !documento) {
      setError("Por favor, complete todos los campos antes de continuar.");
      return;
    }

    setPasajeros([...pasajeros, formData]);
    setFormData({ nombre: "", email: "", celular: "", documento: "" });
    setError("");
  };

  return (
    <div className="w-[95%] flex flex-col items-center justify-center gap-y-8 mb-4 mt-3.5">
      {pasajeros.map((p, i) => (
        <div key={i} className="w-full px-4 py-2 rounded-md bg-white shadow-xl text-black">
          <p className="font-semibold text-[14px]">Pasajero {i + 1}:</p>
          <p className="text-[13px]">Nombre: {p.nombre}</p>
          <p className="text-[13px]">Email: {p.email}</p>
          <p className="text-[13px]">Celular: {p.celular}</p>
          <p className="text-[13px]">Documento: {p.documento}</p>
        </div>
      ))}
      <h3 className="text-center font-semibold text-[18px]">Datos de los pasajeros</h3>
      {pasajeros.length < cantPasajeros && (
        <>
          {/* Nombre */}
          <div className="w-full px-4 py-2 border border-gray-300 border-b-2 border-b-green-500 rounded-md bg-white text-black flex items-center gap-x-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg>
            <div className="flex flex-col items-start w-full">
              <span className="text-[12px]">Nombre y Apellido</span>
              <input
                autoFocus
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Nombre y Apellido"
                className="w-full focus:outline-none font-semibold bg-white"
              />
            </div>
          </div>

          {/* Documento */}
          <div className="w-full px-4 py-2 border border-gray-300 border-b-2 border-b-green-500 rounded-md bg-white text-black flex items-center gap-x-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-credit-card-2-front-fill" viewBox="0 0 16 16">
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1H0V4zM0 6h16v6a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6zm3 3.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1H3z"/>
            </svg>
            <div className="flex flex-col items-start w-full">
              <span className="text-[12px]">Número de identificación</span>
              <input
                type="text"
                name="documento"
                value={formData.documento}
                onChange={handleChange}
                placeholder="Número de identificación"
                className="w-full focus:outline-none font-semibold bg-white"
              />
            </div>
          </div>

          {/* Email */}
          <div className="w-full px-4 py-2 border border-gray-300 border-b-2 border-b-green-500 rounded-md bg-white text-black flex items-center gap-x-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
              <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.685L0 4.697zM6.761 8.83 0 12.803A2 2 0 0 0 2 14h12a2 2 0 0 0 2-1.197L9.239 8.83 8 9.586l-1.239-.757zM16 4.697l-5.803 3.419L16 11.801V4.697z" />
            </svg>
            <div className="flex flex-col items-start w-full">
              <span className="text-[12px]">Email</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full focus:outline-none font-semibold bg-white"
              />
            </div>
          </div>

          {/* Celular */}
          <div className="w-full px-4 py-2 border border-gray-300 border-b-2 border-b-green-500 rounded-md bg-white text-black flex items-center gap-x-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-telephone-fill" viewBox="0 0 16 16">
              <path d="M3.654 1.328a.678.678 0 0 1 .736-.183l2.522 1.01c.24.096.393.327.393.583v2.02c0 .295-.172.56-.438.676l-1.014.443a11.58 11.58 0 0 0 4.518 4.518l.443-1.014a.678.678 0 0 1 .676-.438h2.02c.256 0 .487.153.583.393l1.01 2.522a.678.678 0 0 1-.183.736l-2.01 2.01c-.33.33-.81.44-1.233.29C4.478 13.58.42 5.522 1.037 2.561a1.25 1.25 0 0 1 .29-.233l2.327-1z" />
            </svg>
            <div className="flex flex-col items-start w-full">
              <span className="text-[12px]">Número de celular</span>
              <input
                type="number"
                name="celular"
                value={formData.celular}
                onChange={handleChange}
                placeholder="Número de celular"
                className="w-full focus:outline-none font-semibold bg-white"
              />
            </div>
          </div>

          

          {/* Error */}
          {error && (
            <div className="text-red-600 text-sm font-medium w-full px-4">
              {error}
            </div>
          )}

          {/* Guardar */}
          <button
            onClick={guardarPasajero}
            className="w-full py-3.5 bg-black font-semibold text-center text-white rounded-2xl text-[15px]"
          >
            Guardar pasajero
          </button>
        </>
      )}

      {/* Continuar */}
      {pasajeros.length === cantPasajeros && (
        <button
          onClick={() => change(false)}
          className="w-full py-3.5 bg-black font-semibold text-center text-white rounded-2xl text-[15px]"
        >
          Continuar
        </button>
      )}
    </div>
  );
};


const Tarjeta = () => {
  const [nombre, setNombre] = useState("");
  const [numeroTarjeta, setNumeroTarjeta] = useState("");
  const [fechaExpiracion, setFechaExpiracion] = useState("");
  const [cvv, setCvv] = useState("");
  const [errores, setErrores] = useState({});

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
    if (errores.nombre) setErrores((prev) => ({ ...prev, nombre: null }));
  };

  const handleNumeroChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 19);
    setNumeroTarjeta(value);
    if (errores.numeroTarjeta) setErrores((prev) => ({ ...prev, numeroTarjeta: null }));
  };

  const handleFechaChange = (e) => {
    setFechaExpiracion(e.target.value);
    if (errores.fechaExpiracion) setErrores((prev) => ({ ...prev, fechaExpiracion: null }));
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    setCvv(value);
    if (errores.cvv) setErrores((prev) => ({ ...prev, cvv: null }));
  };

  const handleSubmit = () => {
    const nuevosErrores = {};
    if (!nombre.trim()) nuevosErrores.nombre = "Este campo es obligatorio";
    if (!numeroTarjeta.trim()) nuevosErrores.numeroTarjeta = "Este campo es obligatorio";
    if (!fechaExpiracion.trim()) nuevosErrores.fechaExpiracion = "Este campo es obligatorio";
    if (!cvv.trim()) nuevosErrores.cvv = "Este campo es obligatorio";

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }
    alert("Datos correctos. Procesando pago...");
  };

  const inputContainerClass = "w-full px-4 py-2 border border-gray-300 border-b-2 border-b-green-600 rounded-md bg-white text-black flex items-center gap-x-4";
  const errorTextClass = "text-red-600 text-sm mt-1 px-1";

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full flex flex-col gap-y-3.5">
        {/* Nombre */}
        <div className={inputContainerClass}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
          </svg>
          <div className="flex flex-col items-start w-full">
            <span className="text-[12px]">Nombre y Apellido del titular</span>
            <input
              type="text"
              placeholder="Nombre y Apellido"
              value={nombre}
              onChange={handleNombreChange}
              className="w-full focus:outline-none font-semibold bg-white"
            />
            {errores.nombre && <span className={errorTextClass}>{errores.nombre}</span>}
          </div>
        </div>

        {/* Número de tarjeta */}
        <div className={inputContainerClass}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-credit-card-2-front-fill" viewBox="0 0 16 16">
            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1H0V4zm0 2h16v6a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6zm2 3a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2H2z"/>
          </svg>
          <div className="flex flex-col items-start w-full">
            <span className="text-[12px]">Número de tarjeta</span>
            <input
              type="text"
              inputMode="numeric"
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              pattern="\d{13,19}"
              value={numeroTarjeta}
              onChange={handleNumeroChange}
              className="w-full focus:outline-none font-semibold bg-white"
            />
            {errores.numeroTarjeta && <span className={errorTextClass}>{errores.numeroTarjeta}</span>}
          </div>
        </div>

        {/* Fecha de expiración */}
        <div className={inputContainerClass}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-calendar-event" viewBox="0 0 16 16">
            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h.5A1.5 1.5 0 0 1 15 2.5V4H1V2.5A1.5 1.5 0 0 1 2.5 1H3v-.5a.5.5 0 0 1 .5-.5zM1 5v8.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5V5H1zm10.5 2a.5.5 0 0 1 .5.5V9h1.5a.5.5 0 0 1 0 1H12v1.5a.5.5 0 0 1-1 0V10h-1.5a.5.5 0 0 1 0-1H11V7.5a.5.5 0 0 1 .5-.5z"/>
          </svg>
          <div className="flex flex-col items-start w-full">
            <span className="text-[12px]">Fecha de expiración de Tarjeta</span>
            <input
              type="month"
              placeholder="MM/AA"
              value={fechaExpiracion}
              onChange={handleFechaChange}
              className="w-full focus:outline-none font-semibold bg-white"
            />
            {errores.fechaExpiracion && <span className={errorTextClass}>{errores.fechaExpiracion}</span>}
          </div>
        </div>

        {/* CVV */}
        <div className={inputContainerClass}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-shield-lock-fill" viewBox="0 0 16 16">
            <path d="M8 0c-.69 0-1.376.183-2 .52C5.376.183 4.69 0 4 0 1.79 0 0 1.79 0 4c0 1.11.29 2.134.803 3.02A7.963 7.963 0 0 0 8 16a7.963 7.963 0 0 0 7.197-8.98A5.979 5.979 0 0 0 16 4c0-2.21-1.79-4-4-4-.69 0-1.376.183-2 .52C9.376.183 8.69 0 8 0zm0 6a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm-.5 2.5a.5.5 0 0 0-1 0v1a.5.5 0 0 0 1 0v-1z"/>
          </svg>
          <div className="flex flex-col items-start w-full">
            <span className="text-[12px]">Código de seguridad (CVV)</span>
            <input
              type="text"
              placeholder="123"
              maxLength={4}
              pattern="\d{3,4}"
              inputMode="numeric"
              value={cvv}
              onChange={handleCvvChange}
              className="w-full focus:outline-none font-semibold bg-white"
            />
            {errores.cvv && <span className={errorTextClass}>{errores.cvv}</span>}
          </div>
        </div>

        <button
          className="w-full bg-black py-2 text-[20px] font-semibold rounded-2xl text-white"
          onClick={handleSubmit}
        >
          Comprar
        </button>
      </div>
    </div>
  );
};


const ComponetSelect=()=>{
  const {origin, destino, codeOrigin, codeDestino, tipViaje, fechPartida, fechRegreso, cantPasajeros, precio} = useSelector((state) => state.reducerHome);
  const { country, money, codeCountry } = useSelector((state) => state.countryReducer)
  const [selectPago, setSelectPago] = useState("")
  const precTotal = precio * cantPasajeros
  const prec = Number(precTotal).toLocaleString("es-CO", {
    style: "currency",
    currency: money,
    maximumFractionDigits: 0,
  })
  
  if (country != "Colombia") {
    setSelectPago("tarjeta")
  }

  const handlerSelect = (val)=>{
    setSelectPago(val)
  }

  
  return(
    <div className="w-[90%] flex flex-col gap-y-3.5">

      <div className="w-full">
        <p className="text-[19px] font-semibold text-black">Total a pagar: {prec}({money})</p>
      </div>
      <div>
        <p className="text-[19px] font-semibold text-black">Seleccione Metodo de pago:</p>
      </div>

      <label className="flex items-center gap-2 cursor-pointer">
        <input type="radio" name="tipo-viaje" value="tarjeta" checked={selectPago === "tarjeta"} onChange={(e) => handlerSelect(e.target.value)} className="w-5 h-5 appearance-none rounded-full border-1 border-black bg-white  checked:bg-white checked:w-3 checked:h-3 checked:border-green-600 checked:ring-4 checked:ring-green-600"/>
        <span className={`text-black text-[15px] flex items-center gap-x-2 ${selectPago == "tarjeta" ? "font-bold" : "font-normal"}`}>
          Tarjeta de credito
          <div className="flex gap-x-2">
            <img className="w-10 h-10" src={mastercard} alt="" />
            <img className="w-10 h-10" src={visa} alt="" />
          </div>
        </span>
      </label>
      {selectPago == "tarjeta" && <Tarjeta/>}
      {country == "Colombia" &&
        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="tipo-viaje" value="PSE" checked={selectPago === "PSE"} onChange={(e) => handlerSelect(e.target.value)} className="w-5 h-5 appearance-none rounded-full border-1 border-black bg-white  checked:bg-white checked:w-3 checked:h-3 checked:border-green-600 checked:ring-4 checked:ring-green-600"/>
            <span className={`text-black text-[15px] ${selectPago == "PSE" ? "font-bold" : "font-normal"}`}>PSE</span>
          </label>
        </div> 
      }
    </div>
    )
}



const Compra = () => {
  const navigate = useNavigate()
  const {origin, destino, codeOrigin, codeDestino, tipViaje, fechPartida, fechRegreso, cantPasajeros, precio} = useSelector((state) => state.reducerHome);
  const [load, setLoad] = useState(true);
  const [firCharger, setFirCharg] = useState(true);

  
  useEffect(()=>{
    
    if (!origin || !destino || !fechPartida) {
      navigate("/")
    }
  },[])
  
  
  
  
  useEffect(() => {
    setLoad(true); // mostrar loader al montar o cuando cambia firCharger

    const timer = setTimeout(() => {
      setLoad(false); // ocultar loader después de 2 segundos
    }, 2000);

    return () => clearTimeout(timer); // limpieza
  }, [firCharger]);

  return (
    <div className="w-full flex justify-center items-center bg-slate-200">
      {load ? (
        <Loading />
      ) : (
        <div className="w-[90%] min-h-screen bg-white flex flex-col items-center gap-y-1.5">
          <img src={firCharger ? step2 : step3} className="w-[200px] h-[50px]" alt="" />
          {firCharger && <ComponetForm change={setFirCharg} />}
          {!firCharger && <ComponetSelect/>}
        </div>
      )}
    </div>
  );
};

export { Compra };
