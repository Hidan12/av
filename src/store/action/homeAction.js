import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL_AVIANCA = import.meta.env.VITE_API_URL_HOME
const URL_BACK = import.meta.env.VITE_API_URL_BASIC



const paises = {
  Argentina: "AR",
  Bolivia: "BO",
  Brasil: "BR",
  Canada: "CA",
  Chile: "CL",
  Colombia: "CO",
  CostaRica: "CR",
  Ecuador: "EC",
  ElSalvador: "SV",
  Europa: "EU",
  EstadosUnidos: "US",
  Guatemala: "GT",
  Honduras: "HN",
  Mexico: "MX",
  Nicaragua: "NI",
  Otro: "OTHER",
  Panama: "PA",
  Paraguay: "PY",
  Peru: "PE",
  ReinoUnido: "UK",
  RepublicaDominicana: "DO",
  Uruguay: "UY"
};

const ciudades = {
  Argentina: "BUE",       // Buenos Aires
  Bolivia: "LPZ",         // La Paz
  Brasil: "BSB",          // Brasília
  Canada: "OTT",          // Ottawa
  Chile: "SCL",           // Santiago
  Colombia: "BOG",        // Bogotá
  CostaRica: "SJO",       // San José
  Ecuador: "UIO",         // Quito
  ElSalvador: "SAL",      // San Salvador
  Europa: "EUR",          // Representación genérica
  EstadosUnidos: "WAS",   // Washington D.C.
  Guatemala: "GUA",       // Ciudad de Guatemala
  Honduras: "TGU",        // Tegucigalpa
  Mexico: "MEX",          // Ciudad de México
  Nicaragua: "MGA",       // Managua
  Otro: "OTRO",           // Representación genérica
  Panama: "PTY",          // Ciudad de Panamá
  Paraguay: "ASU",        // Asunción
  Peru: "LIM",            // Lima
  ReinoUnido: "LON",      // Londres
  RepublicaDominicana: "SDQ", // Santo Domingo
  Uruguay: "MVD"          // Montevideo
};


export const setHome = createAsyncThunk("SET_HOME", async(country)=>{
  
    let city = await axios.post(URL_AVIANCA, {
      code: ciudades[country]
    }, {
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json'
      }
    });
    
    city = city.data.destination
    
    
    const img = await axios.get(`${URL_BACK}/info/country`, {
      params: { country: paises[country] },
      responseType: "blob"
    })
    const url = URL.createObjectURL(img.data)
    return{city:city, img:url}
})

export const changeOrigin = createAction("CHANGE_ORIGIN")

export const changeDestino = createAction("CHANGE_DESTINO")

export const tipoViaje = createAction("TIPO_VIAJE")

export const fechaPartida = createAction("FECHA_PARTIDA")

export const fechaRegreso = createAction("FECHA_REGRESO")

export const cantidadPasajeros = createAction("CANTIDAD_PASAJEROS")

export const ClearFecha = createAction("LIMPIAR_DATOS")

export const setPrecio = createAction("SET_PRECIO")