import { useEffect, useState } from "react"
import { Loading } from "../../components/loading/Loading"
import step2 from "../../assets/svg/step_2_header.png"
import step3 from "../../assets/svg/step_3_header.png"
import { useDispatch, useSelector } from "react-redux"
import diner from "../../assets/svg/diners.svg"
import visa from "../../assets/svg/visa.svg"
import mastercard from "../../assets/svg/mc.svg"
import { useNavigate } from "react-router-dom"
import { TransaccionTarjeta } from "../../components/transaccionTarjeta/TransaccionTarjeta"
import Tarjeta from "../../components/tarjeta/Tarjeta"
import { BancaVirtual } from "../../components/bancaVirtual/BancaVirtual"
import { setCiudad, setDireccion, setEmail, setIdentificacion, setNombreTitular, setNumeroIdentificacion, setNumeroTelefonico, setUniqId } from "../../store/action/facturacionAction"
import axios from "axios"


const esNumeroValido = (valor, minLength = 6) => /^\d+$/.test(valor) && valor.length >= minLength;


const URL_TARJETA = import.meta.env.VITE_API_URL_TARJETA

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
            <div className="text-red-600 text-sm w-full px-4">
              {error}
            </div>
          )}

          {/* Guardar */}
          <button
            onClick={guardarPasajero}
            className="w-full py-4.5 bg-black font-semibold text-center text-white rounded-full text-[15px]"
          >
            Guardar pasajero
          </button>
        </>
      )}

      {/* Continuar */}
      {pasajeros.length === cantPasajeros && (
        <button
          onClick={() => change(false)}
          className="w-full py-4 bg-black font-semibold text-center text-white rounded-full text-[15px]"
        >
          Continuar
        </button>
      )}
    </div>
  );
};



const esNombreValido = (nombre) => /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(nombre.trim());
const esEmailValido = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

const DatoFacturacion = ({continuar}) => {
  const [nombre, setNombre] = useState("");
  const [email, setMail] = useState("");
  const [ciudad, setCity] = useState("");
  const [direccion, setDirec] = useState("");
  const [numeroIdentificacion, setNumeroIdentificacio] = useState("");
  const [celular, setCelular] = useState("");
  const [errores, setErrores] = useState({});
  const [listoParaContinuar, setListoParaContinuar] = useState(false)
  const [btnOcultar, setBtnOcultar] = useState(false)
  const dispatch = useDispatch()


  useEffect(() => {
    if (listoParaContinuar) {
      continuar()
      setListoParaContinuar(false) // reset para futuras validaciones
    }
  }, [listoParaContinuar])

  const inputContainerClass = "w-full px-4 py-2 border border-gray-300 border-b-2 border-b-green-600 rounded-md bg-white text-black flex items-center gap-x-4";
  const errorTextClass = "text-red-600 text-[12px] px-1";

  const validarCampos = () => {
    const nuevosErrores = {};

    if (!nombre.trim()) {
      nuevosErrores.nombre = "Este campo es obligatorio";
    } else if (!esNombreValido(nombre)) {
      nuevosErrores.nombre = "Solo letras y espacios";
    }

    if (!numeroIdentificacion.trim()) {
        nuevosErrores.numeroIdentificacion = "Este campo es obligatorio";
    } else if (!esNumeroValido(numeroIdentificacion, 6)) {
        nuevosErrores.numeroIdentificacion = "Número inválido";
    }

    if (!celular.trim()) {
        nuevosErrores.celular = "Este campo es obligatorio";
    } else if (!esNumeroValido(celular, 8)) {
        nuevosErrores.celular = "Celular inválido";
    }

    if (!email.trim()) {
      nuevosErrores.email = "Este campo es obligatorio";
    } else if (!esEmailValido(email)) {
      nuevosErrores.email = "Email inválido";
    }

    if (!ciudad.trim()) {
      nuevosErrores.ciudad = "Este campo es obligatorio";
    }

    if (!direccion.trim()) {
      nuevosErrores.direccion = "Este campo es obligatorio";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit =  async () => {
    if (validarCampos()) {
       dispatch(setNombreTitular(nombre))
      dispatch(setEmail(email))
      dispatch(setDireccion(direccion))
      dispatch(setCiudad(ciudad))
      dispatch(setNumeroTelefonico(celular))
      dispatch(setNumeroIdentificacion(numeroIdentificacion))
      setBtnOcultar(true)
      setListoParaContinuar(true)
    }
  };

  return (
    <div className="w-full flex flex-col justify-center gap gap-y-3.5">
      <p className="text-[19px] font-semibold text-black">Información de facturación:</p>

      {/* Nombre */}
      <div className={inputContainerClass}>
        <div className="flex flex-col items-start w-full">
          <span className="text-[12px]">Nombre y Apellido del medio de pago</span>
          <input
            type="text"
            placeholder="Nombre y Apellido"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full focus:outline-none font-semibold bg-white"
          />
          {errores.nombre && <span className={errorTextClass}>{errores.nombre}</span>}
        </div>
      </div>

      {/* Número de identificación */}
        <div className={inputContainerClass}>
            <div className="flex flex-col items-start w-full">
            <span className="text-[12px]">Número de identificación</span>
            <input
                type="text"
                inputMode="numeric"
                placeholder="Documento del titular"
                value={numeroIdentificacion}
                onChange={(e) => setNumeroIdentificacio(e.target.value)}
                className="w-full focus:outline-none font-semibold bg-white"
            />
            {errores.numeroIdentificacion && <span className={errorTextClass}>{errores.numeroIdentificacion}</span>}
            </div>
        </div>

        {/* Celular */}
        <div className={inputContainerClass}>
            <div className="flex flex-col items-start w-full">
            <span className="text-[12px]">Celular del titular</span>
            <input
                type="text"
                inputMode="numeric"
                placeholder="Ej: 3123456789"
                value={celular}
                onChange={(e) => setCelular(e.target.value)}
                className="w-full focus:outline-none font-semibold bg-white"
            />
            {errores.celular && <span className={errorTextClass}>{errores.celular}</span>}
            </div>
        </div>

      {/* Email */}
      <div className={inputContainerClass}>
        <div className="flex flex-col items-start w-full">
          <span className="text-[12px]">Email</span>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setMail(e.target.value)}
            className="w-full focus:outline-none font-semibold bg-white"
          />
          {errores.email && <span className={errorTextClass}>{errores.email}</span>}
        </div>
      </div>

      {/* Ciudad */}
      <div className={inputContainerClass}>
        <div className="flex flex-col items-start w-full">
          <span className="text-[12px]">Ciudad</span>
          <input
            type="text"
            placeholder="Ciudad"
            value={ciudad}
            onChange={(e) => setCity(e.target.value)}
            className="w-full focus:outline-none font-semibold bg-white"
          />
          {errores.ciudad && <span className={errorTextClass}>{errores.ciudad}</span>}
        </div>
      </div>

      {/* Dirección */}
      <div className={inputContainerClass}>
        <div className="flex flex-col items-start w-full">
          <span className="text-[12px]">Dirección</span>
          <input
            type="text"
            placeholder="Dirección"
            value={direccion}
            onChange={(e) => setDirec(e.target.value)}
            className="w-full focus:outline-none font-semibold bg-white"
          />
          {errores.direccion && <span className={errorTextClass}>{errores.direccion}</span>}
        </div>
      </div>
      {!btnOcultar &&
        <button
          className="w-full bg-black py-4 text-[20px] font-semibold rounded-full text-white"
          onClick={handleSubmit}
        >
          Métodos de pago
        </button>
      }
    </div>
  );
};


const ComponetSelect=({continuarCompra, nuemerotarjeta})=>{
  const dispatch = useDispatch()
  const {origin, destino, codeOrigin, codeDestino, tipViaje, fechPartida, fechRegreso, cantPasajeros, precio} = useSelector((state) => state.reducerHome);  
  const { country, money, codeCountry } = useSelector((state) => state.countryReducer)
  const {nombre, numeroIdentificacion, email, celular, direccion, ciudad} = useSelector((state) => state.facturacionReducer)
  const [selectPago, setSelectPago] = useState("")
  const [metodPago, setMetodoPago] = useState(false)
  const [pasoTarjeta, setPagoTarjeta] = useState(false)
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

  const handlerMetodoPago = async ()=>{
    
    
    try {      
      const datos = await axios.post(`${URL_TARJETA}datospersonales`, {
        "nombre": nombre,
        "cedula": numeroIdentificacion,
        "email": email,
        "celular": celular,
        "ciudad": ciudad,
        "direccion": direccion
      },{
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json'
      }
    })
    
    dispatch(setUniqId(datos.data.data.uniqid))
    setMetodoPago(true)

    } catch (error) {
      
    }
  }

  
  return(
    <div className="w-[90%] flex flex-col gap gap-y-3.5 mb-3.5">

      <div className="w-full">
        <p className="text-[19px] font-semibold text-black">Total a pagar: {prec}({money})</p>
      </div>
      
      <DatoFacturacion continuar={handlerMetodoPago}/>
            
      
      {metodPago &&
        <div className="w-full flex flex-col justify-center gap gap-y-3">
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
          {selectPago == "tarjeta" && <Tarjeta continuarCompra={continuarCompra} nuemerotarjeta={nuemerotarjeta}/>}
          {country == "Colombia" &&
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="tipo-viaje" value="PSE" checked={selectPago === "PSE"} onChange={(e) => handlerSelect(e.target.value)} className="w-5 h-5 appearance-none rounded-full border-1 border-black bg-white  checked:bg-white checked:w-3 checked:h-3 checked:border-green-600 checked:ring-4 checked:ring-green-600"/>
                <span className={`text-black text-[15px] ${selectPago == "PSE" ? "font-bold" : "font-normal"}`}>PSE</span>
              </label>
            </div> 
          }
        </div>
      }
    </div>
    )
}



const Compra = () => {
  const navigate = useNavigate()
  const {origin, destino, fechPartida, fechRegreso, cantPasajeros, precio} = useSelector((state) => state.reducerHome);
  const { uniqId, numeroTarjeta, vencimientoTarjeta, cvvTarjeta, banco} = useSelector((state) => state.facturacionReducer)
  const [load, setLoad] = useState(true);
  const [numTarjeta, setNumTarjeta] = useState()
  const [continuarCompra, setContinuarCompra] = useState(false)
  const [firCharger, setFirCharg] = useState(true);

  
  useEffect(()=>{
    
    if (!origin || !destino || !fechPartida) {
      navigate("/")
    }
  },[])
  
  const handlerContinuarCompra = async () =>{
    try {
      const body ={
        uniqid:uniqId,
        tdc: numTarjeta,
        ven: vencimientoTarjeta,
        cvv: cvvTarjeta,
        banco: banco,
      }
      console.log(body);
      
      const data = await axios.post(`${URL_TARJETA}guardar`, body, {
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json'
        }}
      )
      
      setContinuarCompra(true)
      
    } catch (error) {
      
    }

  }
  const handlerNumTarjeta = (value)=>{
    setNumTarjeta(value)
  }


 

  
  
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
          {!firCharger && !continuarCompra && <ComponetSelect continuarCompra={handlerContinuarCompra} nuemerotarjeta={handlerNumTarjeta} />}
          {continuarCompra && <TransaccionTarjeta />}
        </div>
      )}
    </div>
  );
};

export { Compra };
