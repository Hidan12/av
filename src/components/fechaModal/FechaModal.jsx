import React, { useState } from "react";
import "./fecha.css"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useDispatch, useSelector } from "react-redux";
import { fechaPartida, fechaRegreso } from "../../store/action/homeAction";

const parseFechaLocal = (str) => {
  if (!str) return null;
  const [year, month, day] = str.split("-").map(Number);
  return new Date(year, month - 1, day); // month es base 0
};

const FechaModal = ({ close, back, onSelected, selectClick }) => {
  const dispatch = useDispatch();
  const { fechPartida, fechRegreso, tipViaje } = useSelector(state => state.reducerHome);
  

  const [fechaIda, setFechaIda] = useState(parseFechaLocal(fechPartida));
  const [fechaVuelta, setFechaVuelta] = useState(parseFechaLocal(fechRegreso));

  let select = selectClick === "ida" ? "ida" : (selectClick === "vuelta" && fechPartida ? "vuelta" : null);
  select = !select ? (!fechPartida ? "ida" : (tipViaje === "idaYVuelta" && fechPartida && "vuelta")) : select;

  const [mostrarCalendario, setMostrarCalendario] = useState(select);

  const handlerClickRegreso = ()=>{
    if (fechPartida) {
      setMostrarCalendario("vuelta")
    }else{
      setMostrarCalendario("ida")
    }
  }

  const handleFechaIda = (date) => {
    setFechaIda(date);
    dispatch(fechaPartida(format(date, "yyyy-MM-dd"))); // guarda como string local
    if (tipViaje === "idaYVuelta") {
      setMostrarCalendario("vuelta");
    } else {
      onSelected();
    }
  };

  const handleFechaVuelta = (date) => {
    console.log("entro");
    
    setFechaVuelta(date);
    dispatch(fechaRegreso(format(date, "yyyy-MM-dd"))); // guarda como string local
    onSelected();
  };

  const formatFecha = (fecha) =>
    fecha ? format(fecha, "dd/MM/yyyy") : "Seleccionar";

  return (
    <div className="fixed top-0 w-full h-screen bg-black bg-opacity-70 flex items-start justify-center z-50">
      <div className="h-full shadow-lg w-full max-w-md overflow-hidden">

        {/* Encabezado */}
        <div className="bg-black text-white py-4 px-5 flex justify-between items-center w-full">
          <button onClick={()=>back()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"/>
            </svg>
          </button>
          <h2 className="text-[30px] font-semibold">Fechas</h2>
          <button onClick={()=>close()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
            </svg>
          </button>
        </div>
        
        <div className="w-full h-screen bg-white rounded-2xl">
          {/* Botones de fecha */}
          <div className="p-4 space-y-4">
            <button
              onClick={() => setMostrarCalendario("ida")}
              className={`w-full text-left px-4 py-2 rounded-lg bg-white text-black shadow-sm hover:bg-gray-50 ${mostrarCalendario === "ida" ? "border-b-green-600 border-b-2" : ""}`}
            >
              <span className="block text-sm text-gray-500">Ida</span>
              <span className="text-lg font-semibold">{formatFecha(fechaIda)}</span>
            </button>

            {tipViaje === "idaYVuelta" && (
              <button
                onClick={() => handlerClickRegreso()}
                className={`w-full text-left px-4 py-2 rounded-lg bg-white text-black shadow-sm hover:bg-gray-50 ${mostrarCalendario === "vuelta" ? "border-b-green-600 border-b-2" : ""}`}
              >
                <span className="block text-sm text-gray-500">Vuelta</span>
                <span className="text-lg font-semibold">{formatFecha(fechaVuelta)}</span>
              </button>
            )}
          </div>

          {/* Calendario */}
          <div className="p-0">
            {mostrarCalendario === "ida" && (
              <DatePicker
                selected={fechaIda}
                onChange={handleFechaIda}
                inline
                minDate={new Date()}
                locale={es}
                calendarStartDay={1}
                calendarClassName="custom-datepicker"
              />
            )}

            {mostrarCalendario === "vuelta" && (
              <DatePicker
                selected={fechaVuelta}
                onChange={handleFechaVuelta}
                inline
                minDate={fechaIda || new Date()}
                locale={es}
                calendarStartDay={1}
                calendarClassName="custom-datepicker"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export  {FechaModal};
