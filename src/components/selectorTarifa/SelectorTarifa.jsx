import React from 'react';
import lmClasic from "../../assets/svg/mileageAcrual-M.svg";
import c1 from "../../assets/svg/S_1.svg"
import c2 from "../../assets/svg/S_2.svg"
import c3 from "../../assets/svg/S_3.svg"
import c4 from "../../assets/svg/S_4.svg"
import c5 from "../../assets/svg/S_5.svg"
import c6 from "../../assets/svg/S_6.svg"
import fh from "../../assets/svg/carryOnBaggage-S.svg"
import f1 from "../../assets/svg/M_1.svg"
import f2 from "../../assets/svg/M_2.svg"
import f3 from "../../assets/svg/M_3.svg"
import f4 from "../../assets/svg/M_4.svg"
import f5 from "../../assets/svg/M_5.svg"
import f6 from "../../assets/svg/M_6.svg"
import f7 from "../../assets/svg/M_7.svg"
import f8 from "../../assets/svg/M_8.svg"
import x from "../../assets/svg/x_gris.JPG";
import { useDispatch, useSelector } from 'react-redux';
import { setPrecio } from '../../store/action/homeAction';

const SelectorTarifa = ({ vuelo, onClose, onSelectTarifa }) => {
  const { money } = useSelector(state => state.countryReducer);
  const { precio } = useSelector(state => state.reducerHome);

  const dispatch = useDispatch()
  const precioBase = vuelo.precio.total;
  const precioBasic = precioBase;
  const precioClasic = Math.round(precioBase * 1.20);
  const precioFlex = Math.round(precioBase * 1.35);
  
  const seleccionarTarifa = (precioFinal, tipoServicio) => {
  const vueloConTarifa = {
      ...vuelo,
      tipoServicio,
      precio: {
        ...vuelo.precio,
        total: precioFinal
      }
    };
    dispatch(setPrecio(precioFinal + precio));
    onSelectTarifa(vueloConTarifa);
    onClose();
  }


  return (
    <div className="fixed w-full min-h-screen top-0 bg-black bg-opacity-50 flex items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-h-[90vh] flex flex-col">

        {/* Encabezado fijo */}
        <div className="sticky w-full top-0 bg-white border-b p-4 flex justify-between items-center z-10">
          <h2 className="text-xl font-bold">Selecciona tu tarifa</h2>
          <button
            onClick={() => onClose(false)}
            className="text-gray-500 hover:text-gray-700 text-2xl"
            aria-label="Cerrar modal"
          >
            &times;
          </button>
        </div>

        {/* Contenido con scroll */}
        <div className="overflow-y-auto px-4 pb-4 flex-1">
          
          
          <div className='w-full flex flex-col justify-center items-center mt-4 shadow-2xl'>
            <button onClick={()=>seleccionarTarifa(precioBasic, "Basic")} className='w-full p-3 rounded-3xl flex flex-col justify-center items-center'> 
              <div className='flex items-center justify-between w-full text-red-500'>
                <h3 className='font-semibold text-[20px]'>Basic</h3>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-backpack2-fill" viewBox="0 0 16 16">
                  <path d="M5 13h6v-3h-1v.5a.5.5 0 0 1-1 0V10H5z"/>
                  <path d="M6 2v.341C3.67 3.165 2 5.388 2 8v1.191l-1.17.585A1.5 1.5 0 0 0 0 11.118V13.5A1.5 1.5 0 0 0 1.5 15h1c.456.607 1.182 1 2 1h7c.818 0 1.544-.393 2-1h1a1.5 1.5 0 0 0 1.5-1.5v-2.382a1.5 1.5 0 0 0-.83-1.342L14 9.191V8a6 6 0 0 0-4-5.659V2a2 2 0 1 0-4 0m2-1a1 1 0 0 1 1 1v.083a6 6 0 0 0-2 0V2a1 1 0 0 1 1-1m0 3a4 4 0 0 1 3.96 3.43.5.5 0 1 1-.99.14 3 3 0 0 0-5.94 0 .5.5 0 1 1-.99-.14A4 4 0 0 1 8 4M4.5 9h7a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5"/>
                </svg>
              </div>
              <div className='flex flex-col w-full'>
                <span className='text-[13px] text-start w-full'>Vuela ligero</span>
                <span className='font-semibold text-start text-[32px] my-5 text-red-500'>
                  <span className='text-[20px] mr-1.5'>{money}</span>
                  {precioBasic.toLocaleString('es-CO')}
                </span>
              </div>
              <div className='w-full flex text-red-500 items-center gap-x-2 my-2'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-backpack-fill" viewBox="0 0 16 16">
                  <path d="M5 13v-3h4v.5a.5.5 0 0 0 1 0V10h1v3z"/>
                  <path d="M6 2v.341C3.67 3.165 2 5.388 2 8v5.5A2.5 2.5 0 0 0 4.5 16h7a2.5 2.5 0 0 0 2.5-2.5V8a6 6 0 0 0-4-5.659V2a2 2 0 1 0-4 0m2-1a1 1 0 0 1 1 1v.083a6 6 0 0 0-2 0V2a1 1 0 0 1 1-1m0 3a4 4 0 0 1 3.96 3.43.5.5 0 1 1-.99.14 3 3 0 0 0-5.94 0 .5.5 0 1 1-.99-.14A4 4 0 0 1 8 4M4.5 9h7a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5"/>
                </svg>
                <span className='text-black'>1 artículo personal (bolso)</span>
              </div>
              <div className='w-full flex text-red-500 items-center gap-x-2 my-2'>
                <img src={lmClasic} className='w-[20px] h-[20px] object-cover' alt="" />
                <span className='text-black'>Acumula 3 lifemiles por cada USD</span>
              </div>
              <div className='w-full flex items-center gap-x-2 my-2'>
                <img src={x} className='w-[20px] h-[20px] object-cover' alt="" />
                <span>No incluye servicios adicionales</span>
              </div>
              <div className='w-full my-5'>
                <span className='w-full bg-red-500 py-2 px-3 rounded-2xl text-center text-white text-[25px]'>
                  {money} {precioBasic.toLocaleString('es-CO')}
                </span>
              <div className='w-full'>
                <span className='text-center text-[13px]'>Precio por pasajero</span>
              </div>
              </div>
            </button>
          </div>

          
          <div className='w-full flex flex-col items-center mt-4 border-2 border-[#b50080] rounded-xl bg-white'>
            <div className='w-full flex justify-end'>
              <span className='text-end font-bold text-white text-[10px] px-3 py-1 bg-[#b50080] rounded-bl-2xl rounded-tr-lg'>Recomendado</span> 
            </div>
            <button onClick={()=> seleccionarTarifa(precioClasic, "Classic")} className='w-full p-3 flex flex-col justify-center items-center'>
              <div className='flex items-center justify-between w-full text-[#b50080]'>
                <h3 className='font-semibold text-[20px]'>Classic</h3>
                <div className='flex gap gap-y-1'>
                  <img src={c1} className='w-[20px] h-[20px] object-cover' alt="" />
                  <img src={c2} className='w-[20px] h-[20px] object-cover' alt="" />
                </div>
              </div>
              
              <div className='flex flex-col w-full'>
                <span className='text-[13px] text-start w-full'>Más completo</span>
                <span className='font-semibold text-start text-[32px] my-5 text-[#b50080]'>
                  <span className='text-[20px] mr-1.5'>{money}</span>
                  {precioClasic.toLocaleString('es-CO')}
                </span>
              </div>

              <div className='w-full flex text-[#b50080] items-center gap-x-2 my-2'>
                <img src={c1} className='w-[20px] h-[20px] object-cover' alt="" />
                <span className='text-black'>1 artículo personal (bolso)</span>
              </div>

              <div className='w-full flex items-center gap-x-2 my-2'>
                <img src={c2} className='w-[20px] h-[20px] object-cover' alt="" />
                <span className='text-black'>1 equipaje de mano (10 kg)</span>
              </div>

              <div className='w-full flex items-center gap-x-2 my-2'>
                <img src={c3} className='w-[20px] h-[20px] object-cover' alt="" />
                <span className='text-black'>1 equipaje de bodega (23 kg)</span>
              </div>

              <div className='w-full flex items-center gap-x-2 my-2'>
                <img src={c4} className='w-[20px] h-[20px] object-cover' alt="" />
                <span className='text-black'>Check-in en aeropuerto</span>
              </div>

              <div className='w-full flex items-center gap-x-2 my-2'>
                <img src={c5} className='w-[20px] h-[20px] object-cover' alt="" />
                <span className='text-black'>Asiento Economy incluido</span>
              </div>

              <div className='w-full flex items-center gap-x-2 my-2'>
                <img src={c6} className='w-[20px] h-[20px] object-cover' alt="" />
                <span className='text-black'>Acumula 6 lifemiles por cada USD</span>
              </div>

              <div className='w-full flex items-center gap-x-2 my-2'>
                <img src={x} className='w-[20px] h-[20px] object-cover' alt="" />
                <span>No incluye servicios adicionales</span>
              </div>

              <div className='w-full my-5'>
                <span className='w-full bg-[#b50080] py-2 px-3 rounded-2xl text-center text-white text-[25px]'>
                  {money} {precioClasic.toLocaleString('es-CO')}
                </span>
                <div className='w-full'>
                  <span className='text-center text-[13px]'>Precio por pasajero</span>
                </div>
              </div>
            </button>
          </div>

          <div className='w-full flex flex-col items-center mt-4 shadow-2xl rounded-xl bg-white'>
            <button onClick={()=> seleccionarTarifa(precioFlex, "Flex")} className='w-full p-3 flex flex-col justify-center items-center'>
              <div className='flex items-center justify-between w-full text-[#ff5c00]'>
                <h3 className='font-semibold text-[20px]'>Flex</h3>
                <img src={fh} className='w-[30px] h-[30px] object-cover' alt="" />
              </div>
              
              <div className='flex flex-col w-full'>
                <span className='text-[13px] text-start w-full'>Más posibilidades</span>
                <span className='font-semibold text-start text-[32px] my-5 text-[#ff5c00]'>
                  <span className='text-[20px] mr-1.5'>{money}</span>
                  {precioFlex.toLocaleString('es-CO')}
                </span>
              </div>

              <div className='w-full flex text-[#ff5c00] items-center gap-x-2 my-2'>
                <img src={f1} className='w-[20px] h-[20px] object-cover' alt="" />
                <span className='text-black'>1 artículo personal (bolso)</span>
              </div>

              <div className='w-full flex items-center gap-x-2 my-2'>
                <img src={f2} className='w-[20px] h-[20px] object-cover' alt="" />
                <span className='text-black'>1 equipaje de mano (10 kg)</span>
              </div>

              <div className='w-full flex items-center gap-x-2 my-2'>
                <img src={f3} className='w-[20px] h-[20px] object-cover' alt="" />
                <span className='text-black'>1 equipaje de bodega (23 kg)</span>
              </div>

              <div className='w-full flex items-center gap-x-2 my-2'>
                <img src={f4} className='w-[20px] h-[20px] object-cover' alt="" />
                <span className='text-black'>Check-in en aeropuerto</span>
              </div>

              <div className='w-full flex items-center gap-x-2 my-2'>
                <img src={f5} className='w-[20px] h-[20px] object-cover' alt="" />
                <span className='text-black'>Asiento Economy incluido</span>
              </div>

              <div className='w-full flex items-center gap-x-2 my-2'>
                <img src={f6} className='w-[20px] h-[20px] object-cover' alt="" />
                <span className='text-black'>Acumula 6 lifemiles por cada USD</span>
              </div>

              <div className='w-full flex items-center gap-x-2 my-2'>
                <img src={f7} className='w-[20px] h-[20px] object-cover' alt="" />
                <span className='text-black'>Cambios (antes del vuelo)</span>
              </div>

              <div className='w-full flex items-center gap-x-2 my-2'>
                <img src={f8} className='w-[20px] h-[20px] object-cover' alt="" />
                <span className='text-black'>Reembolso (antes del vuelo)</span>
              </div>

              <div className='w-full my-5'>
                <span className='w-full bg-[#ff5c00] py-2 px-3 rounded-2xl text-center text-white text-[25px]'>
                  {money} {precioFlex.toLocaleString('es-CO')}
                </span>
                <div className='w-full'>
                  <span className='text-center text-[13px]'>Precio por pasajero</span>
                </div>
              </div>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SelectorTarifa;
