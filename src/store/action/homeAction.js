import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL_AVIANCA = "https://avianca.procesogeneral.online/api/cities-by-country"
const URL_BACK = "http://localhost:8080/api"


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



export const setHome = createAsyncThunk("SET_HOME", async(country)=>{
  
    let city = await axios.post(URL_AVIANCA, {
      country: country,
      code_country: "PR"
    }, {
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json'
      }
    });
    
    city = city.data.cities[0]
    
    
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