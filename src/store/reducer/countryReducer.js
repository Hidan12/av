import { createReducer } from "@reduxjs/toolkit"
import { countryMoney } from "../action/countryAction"


const paises = {
  "Argentina": "AR",
  "Bolivia": "BO",
  "Brasil": "BR",
  "Canadá": "CA",
  "Chile": "CL",
  "Colombia": "CO",
  "Costa Rica": "CR",
  "Ecuador": "EC",
  "El Salvador": "SV",
  "España": "EU",
  "Estados Unidos": "US",
  "Guatemala": "GT",
  "Honduras": "HN",
  "México": "MX",
  "Nicaragua": "NI",
  "Otros países": "OTHER",
  "Panamá": "PA",
  "Paraguay": "PY",
  "Perú": "PE",
  "Reino Unido": "UK",
  "República Dominicana": "DO",
  "Uruguay": "UY"
};

const monedasPorPais = {
  "Argentina": "ARS",
  "Bolivia": "USD",
  "Brasil": "BRL",
  "Canadá": "USD",
  "Chile": "USD",
  "Colombia": "COP",
  "Costa Rica": "USD",
  "Ecuador": "USD",
  "El Salvador": "USD",
  "España": "EUR",
  "Estados Unidos": "USD",
  "Guatemala": "USD",
  "Honduras": "USD",
  "México": "USD",
  "Nicaragua": "USD",
  "Otros países": "USD",
  "Panamá": "USD",
  "Paraguay": "USD",
  "Perú": "USD",
  "Reino Unido": "GBP",
  "República Dominicana": "USD",
  "Uruguay": "USD"
};


const initialState = {
    country: "",
    money: "",
    codeCountry: ""
}

const countryReducer = createReducer(initialState, (builder)=>{
    builder.addCase(countryMoney, (state, action)=>{
        state.country = action.payload
        state.codeCountry = paises[action.payload]
        state.money = monedasPorPais[action.payload]
    })
})

export {countryReducer}