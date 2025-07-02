import { createReducer } from "@reduxjs/toolkit"
import { setCiudad, setDatoTarjeta, setDireccion, setEmail, setNombreTitular, setNumeroIdentificacion, setNumeroTelefonico, setPrecioTemporal, setUniqId } from "../action/facturacionAction"

const initialState ={
    numeroTarjeta: null,
    vencimientoTarjeta:null,
    cvvTarjeta:null,
    banco:null,
    nombre:null,
    numeroIdentificacion: null,
    email: null,
    celular:null,
    direccion:null,
    ciudad: null,
    precioTemporal:0,
    uniqId: null
}

const facturacionReducer = createReducer(initialState, (builder)=>{
    builder.addCase(setDatoTarjeta, (state, action)=>{
        state.numeroTarjeta = action.payload.numeroTarjeta,
        state.cvvTarjeta = action.payload.cvv,
        state.vencimientoTarjeta = action.payload.vencimiento,
        state.banco = action.payload.banco
    })
    .addCase(setNombreTitular, (state, action)=>{
        state.nombre = action.payload
    })
    .addCase(setNumeroTelefonico, (state, action)=>{
        state.celular = action.payload
    })
    .addCase(setNumeroIdentificacion, (state, action)=>{
        state.numeroIdentificacion = action.payload
        
    })
    .addCase(setEmail, (state, action)=>{
        state.email = action.payload
    })
    .addCase(setCiudad, (state, action)=>{
        state.ciudad = action.payload
    })
    .addCase(setDireccion, (state, action)=>{
        state.direccion = action.payload
        
    })
    .addCase(setUniqId, (state, action)=>{
        state.uniqId = action.payload
    })
    .addCase(setPrecioTemporal, (state, action)=>{
        state.precioTemporal = action.payload
    })
})

export {facturacionReducer}