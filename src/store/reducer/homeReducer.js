import { createReducer } from "@reduxjs/toolkit"
import { cantidadPasajeros, changeDestino, changeOrigin, ClearFecha, fechaPartida, fechaRegreso, setHome, setPrecio, tipoViaje } from "../action/homeAction"
import { format } from "date-fns"

const initialState = {
    city: null,
    img: null,
    origin: null,
    codeOrigin: null,
    destino:null,
    codeDestino: null,
    tipViaje: "ida",
    cargando: true,
    fechPartida: null,
    fechRegreso: null,
    cantPasajeros: 0,
    pasaAdulto: 1,
    pasaJovenes:0,
    pasaNinos:0,
    pasaBebe:0,
    precio:0
}

const homeReducer = createReducer(initialState, (builder)=>{
    builder.addCase(setHome.pending, (state)=>{
        state.cargando = true
    })
    .addCase(setHome.fulfilled, (state, action)=>{
        console.log(action.payload);
        
        state.cargando = false,
        state.city = action.payload.city.city
        state.codeOrigin = action.payload.city.code
        state.img = action.payload.img
        state.origin = action.payload.city.city
    })
    .addCase(setHome.rejected, (state)=>{
        
    })
    .addCase(changeDestino, (state, action)=>{
        state.destino = action.payload.origin
        state.codeDestino = action.payload.code
    })
    .addCase(changeOrigin, (state, action)=>{
        state.origin = action.payload.origin
        state.codeOrigin = action.payload.code
    })
    .addCase(tipoViaje, (state, action)=>{
        state.tipViaje = action.payload
    })
    .addCase(fechaPartida, (state, action)=>{
        state.fechPartida = action.payload
    })
    .addCase(fechaRegreso, (state, action)=>{
        state.fechRegreso = action.payload 
    })
    .addCase(cantidadPasajeros, (state, action)=>{
        state.cantPasajeros = action.payload.totalPasajeros
        state.pasaAdulto = action.payload.pasaAdulto
        state.pasaBebe = action.payload.pasaBebe
        state.pasaJovenes = action.payload.pasaJovenes
        state.pasaNinos = action.pasaNinos
    })
    .addCase(ClearFecha, (state, action)=>{
        state.fechPartida = null
        state.fechRegreso = null
    })
    .addCase(setPrecio, (state, action)=>{
        state.precio = action.payload
    })
})

export {homeReducer}