import { useState } from "react";
import { FechaModal } from "../fechaModal/FechaModal"
import { SelectDestino } from "../selectDestino/SelectDestino"
import { useSelector } from "react-redux";
import { Pasajeros } from "../pasajeros/Pasajeros";
import { DetailModel } from "../detailModal/DetailModel";

const Buscar = ({closeModal})=>{
    const [showOrigenModal, setShowOrigenModal] = useState(false);
    const [showDestinoModal, setShowDestinoModal] = useState(false);
    const [showFecha, setShowFecha] = useState(false)
    const [showPasajero, setShowPasajero] = useState(false)
    const [showDetail, setShowDetail] = useState(false)
    const {origin, destino, tipViaje, fechPartida, fechRegres,} = useSelector(state => state.reducerHome)

    
    useState(()=>{
        if (!origin) {
            setShowOrigenModal(true)
        }else if (origin && !destino) {
            setShowDestinoModal(true)
        }else if(origin && destino && !fechPartida || (tipViaje == "idaYVuelta" && !fechRegres)){
            setShowFecha(true)
        }else if (origin && destino && fechPartida || (tipViaje == "idaYVuelta" && fechRegres)) {
            setShowPasajero(true)
        }
    }, [])
    
    
    //origen
    const handleSelectOrigen = () => {
        setShowOrigenModal(false);
        setShowDestinoModal(true); // abrir modal destino al cerrar origen
    };
    const handlerBackorigin = ()=>{
        closeModal()
    }

    //destino
    const handlerBackDestino = ()=>{
        setShowDestinoModal(false)
        setShowOrigenModal(true)
    }
    const handleSelectDestino = () => {
        setShowDestinoModal(false)
        setShowFecha(true)
    };

    //fecha
    const handlerSelectFecha = ()=>{
        setShowFecha(false)
        setShowPasajero(true)
    }
    const handlerBackFecha = ()=>{
        setShowFecha(false)
        setShowDestinoModal(true)
    }

    //pasajeros
    const handlerBackPasajero = ()=>{
        setShowPasajero(false)
        setShowFecha(true)
    }
    const handlerSelectPasajeros = ()=>{
        setShowPasajero(false)
        setShowDetail(true)
    }
    
    //detail
    const handlerBackDetail = ()=>{
        setShowDetail(false)
        setShowPasajero(true)
    }

    return(
        <div className="w-full">
            {showOrigenModal && (
            <SelectDestino close={closeModal} back={handlerBackorigin} select="Origen" onSelected={handleSelectOrigen} />
            )}

            {showDestinoModal && (
            <SelectDestino close={closeModal} back={handlerBackDestino} select="Destino" onSelected={handleSelectDestino} clDestino={setShowDestinoModal} fecha={setShowFecha}/>
            )}
            {showFecha && destino && <FechaModal back={handlerBackFecha} close={closeModal} onSelected={handlerSelectFecha}/>}
            {showPasajero && <Pasajeros close={closeModal} back={handlerBackPasajero} selectPasajero={handlerSelectPasajeros}/>}
            {showDetail && <DetailModel close={closeModal} back={handlerBackDetail}/>}
        </div>
    )
}

export {Buscar}