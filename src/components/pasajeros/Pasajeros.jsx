import { useState } from "react";
import { useDispatch } from "react-redux";
import { cantidadPasajeros } from "../../store/action/homeAction";


const Pasajeros = ({ close, back, selectPasajero }) => {
  const dispatch = useDispatch()
  const [error, setError] = useState(null)
  const [cantidades, setCantidades] = useState({
    adultos: 1,
    jovenes: 0,
    ninos: 0,
    bebes: 0,
  });

  

  const totalPasajeros =
    cantidades.adultos +
    cantidades.jovenes +
    cantidades.ninos +
    cantidades.bebes;

    
  const handleConfirmar = () => {
    if (totalPasajeros > 0) {
      dispatch(cantidadPasajeros({
        totalPasajeros,
        pasaAdulto: cantidades.adultos,
        pasaBebe: cantidades.bebes,
        pasaJovenes: cantidades.jovenes,
        pasaNinos: cantidades.ninos
      }))
      setError(null) // Limpiar error si había
      selectPasajero()
    } else {
      setError("Debes seleccionar al menos un pasajero para continuar.")
    }
  }

  const cambiarCantidad = (tipo, operacion) => {
    setCantidades((prev) => {
      const nuevaCantidad =
        operacion === "sumar"
          ? prev[tipo] + 1
          : Math.max(0, prev[tipo] - 1);

      if (error && totalPasajeros > 0) {
        setError(null);
      }

      return { ...prev, [tipo]: nuevaCantidad };
    });
  }

  return (
    <div className="fixed top-0 w-full h-screen bg-white bg-opacity-50 flex  z-50">
      <div className="bg-black w-full  overflow-hidden">
        {/* Header */}
        <div className="bg-black text-white py-4 px-5 flex justify-between items-center w-full">
          <button onClick={()=>back()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"/>
            </svg>
          </button>
          <h2 className="text-[30px] font-semibold">Pasajeros</h2>
          <button onClick={()=>close()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
            </svg>
          </button>
        </div>
        <div className="w-full h-screen bg-white rounded-2xl flex flex-col items-center">
          {/* Total pasajeros */}
          <div className={`w-[90%] mt-2.5 flex items-center gap-x-2 text-left px-4 py-2 bg-white text-black shadow-sm hover:bg-gray-50 border-b-green-600 border-b-2`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-fill-add" viewBox="0 0 16 16">
                  <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                  <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
              </svg>
              <span className="text-[20px] font-medium">{totalPasajeros}</span>
          </div>

          {/* Lista de tipos */}
          <div className="w-[90%]  py-4 space-y-5 overflow-y-auto">
            {[
              {
                key: "adultos",
                label: "Adultos",
                edad: "Desde 15 años",
              },
              {
                key: "jovenes",
                label: "Jóvenes",
                edad: "De 12 a 14 años",
              },
              {
                key: "ninos",
                label: "Niños",
                edad: "De 2 a 11 años",
              },
              {
                key: "bebes",
                label: "Bebés",
                edad: "Menores de 2 años",
              },
            ].map(({ key, label, edad }) => (
              <div
                key={key}
                className="w-full flex justify-between items-center border-b pb-2"
              >
                <div className="w-full">
                  <p className="font-medium">{label}</p>
                  <p className="text-sm text-gray-500">{edad}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => cambiarCantidad(key, "restar")}
                    className="text-black"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
                      <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>

                  </button>
                  <span className="w-5 text-center font-medium">
                    {cantidades[key]}
                  </span>
                  <button
                    onClick={() => cambiarCantidad(key, "sumar")}
                    className="text-black"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
                      <line x1="12" y1="8" x2="12" y2="16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                      <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>

                  </button>
                </div>
              </div>
            ))}
          </div>
          {error && <span className="text-red-600 font-semibold text-center my-2 text-[14px]">{error}</span>}
          {/* Botón Confirmar */}
          <div className="w-[90%]">
            <button onClick={() => handleConfirmar()} className="w-full bg-black text-white py-2 rounded-full font-semibold hover:bg-gray-800 transition">
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export  {Pasajeros};
