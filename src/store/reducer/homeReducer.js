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
    precio:0
}

const homeReducer = createReducer(initialState, (builder)=>{
    builder.addCase(setHome.pending, (state)=>{
        state.cargando = true
    })
    .addCase(setHome.fulfilled, (state, action)=>{
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
        state.fechPartida = format(new Date(action.payload), "yyyy-MM-dd")
    })
    .addCase(fechaRegreso, (state, action)=>{
        state.fechRegreso = format(new Date(action.payload), "yyyy-MM-dd") 
    })
    .addCase(cantidadPasajeros, (state, action)=>{
        state.cantPasajeros = action.payload
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