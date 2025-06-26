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

const emisoresTarjetasPorPais = {
  AR: [
    "Banco Nación", "Banco Galicia", "Santander Río", "BBVA Argentina", "Banco Macro", 
    "Tarjeta Naranja", "Credicoop", "Ualá", "Brubank", "Rebanking", "Naranja X", "Otro"
  ],
  BO: [
    "Banco Nacional de Bolivia", "Banco Mercantil Santa Cruz", "Banco Bisa", 
    "Banco de Crédito BCP", "Banco FIE", "Otro"
  ],
  BR: [
    "Banco do Brasil", "Itaú", "Bradesco", "Caixa", "Santander Brasil", 
    "Nubank", "Inter", "Banco Pan", "C6 Bank", "Otro"
  ],
  CA: [
    "RBC", "TD", "Scotiabank", "CIBC", "BMO", 
    "Capital One", "American Express", "Koho", "Neo Financial", "Otro"
  ],
  CL: [
    "Banco de Chile", "BCI", "Santander", "Banco Estado", "Scotiabank", 
    "CMR Falabella", "Ripley", "Tenpo", "Mach", "Chek", "Otro"
  ],
  CO: [
  "Bancolombia", "Davivienda", "Banco de Bogotá", "BBVA Colombia", "Banco Popular", "Tuya",
  "Nequi", "RappiPay", "Lulo Bank", "Movii", "Bancamía S.A.", "Banco Agrario", "Banco AV Villas",
  "Banco Caja Social", "Banco Cooperativo Coopcentral", "Banco Credifinanciera", "Banco de Occidente",
  "Banco Falabella", "Banco Finandina S.A. BIC", "Banco GNB Sudameris", "Banco Itaú", "Banco Pichincha S.A.",
  "Banco Santander Colombia", "Banco Serfinanza", "Banco Union antes Giros", "Bancomeva S.A.", "CFA Cooperativa Financiera",
  "Citibank", "Coltefinanciera", "Confiar Cooperativa Financiera","Coofinep Cooperativa Financiera", "Cotrafa", "Dale", 
  "Daviplata","Iris","Scotiabank Colpatria", "Otro"
],
  CR: [
    "Banco Nacional", "Banco de Costa Rica", "BAC Credomatic", "Scotiabank", 
    "Coopeservidores", "MikroBank", "Otro"
  ],
  EC: [
    "Banco Pichincha", "Banco Guayaquil", "Banco del Pacífico", "Produbanco", 
    "Cooperativa Jep", "Kushki", "PayPhone", "Banco Internacional", "Banco Bolivariano",
    "Banco del Austro", "Banco de Desarrollo del Ecuador", "Banco General Rumiñahui",
    "Banco de Machala", "Banco Solidario", "BanEcuador", "Banco de Loja", "Citybank",
    "Banco ProCredit", "Banco Amazonas", "Banco Coopnacional", "Banco VisionFund Ecuador",
    "Banco D-Miro", "Banco Amibank", "Banco Comercial de Manabí", "Banco Capital",
    "Banco del Litoral", "Banco Delbank", "Pibank", "Bimo", "Deuna!", "Global66", "Peigo",
    "Otro"
  ],
  SV: [
    "Banco Agrícola", "Davivienda", "Promerica", "Scotiabank", "Banco Cuscatlán", 
    "Tigo Money", "Otro"
  ],
  EU: [
    "CaixaBank", "BBVA", "Santander", "Sabadell", "Unicaja", "Abanca", 
    "Bankinter", "Rebellion Pay", "Verse", "Bnext", "Otro"
  ],
  US: [
    "Chase", "Bank of America", "Wells Fargo", "Citibank", "Capital One", 
    "American Express", "Discover", "Chime", "Venmo", "Cash App", "SoFi", "Otro"
  ],
  GT: [
    "Banco Industrial", "Banrural", "G&T Continental", "Promerica", "BAC", 
    "Tigo Money", "Otro"
  ],
  HN: [
    "Banco Atlántida", "Ficohsa", "Occidente", "BAC", "Banpaís", 
    "Tigo Money", "Otro"
  ],
  MX: [
    "BBVA México", "Citibanamex", "Banorte", "Santander", "HSBC", 
    "American Express México", "Invex", "Hey Banco", "Ualá México", "Nu México", 
    "Stori", "Klar", "Otro"
  ],
  NI: [
    "BANPRO", "Lafise", "BAC Nicaragua", "Banco de América Central", 
    "Tigo Money Nicaragua", "Otro"
  ],
  OTHER: [
    "Payoneer", "Wise", "Revolut", "N26", "Western Union (tarjeta prepaga)", 
    "Zolve", "Chime", "Curve", "Vivid Money", "Otro"
  ],
  PA: [
    "Banco General", "Banistmo", "Global Bank", "Multibank", "BAC Panamá", 
    "Nequi Panamá", "PayCash", "Otro"
  ],
  PY: [
    "Banco Itaú", "Continental", "Visión Banco", "Sudameris", "Banco Familiar", 
    "Tigo Money", "Zimple", "Otro"
  ],
  PE: [
    "BCP", "Interbank", "BBVA Perú", "Scotiabank Perú", "Banco Ripley", 
    "CMR Falabella", "Yape", "Plin", "RappiCard", "Ligo", "Otro"
  ],
  UK: [
    "HSBC", "Barclays", "Lloyds", "NatWest", "TSB", "Santander UK", 
    "Revolut", "Monzo", "Starling Bank", "Curve", "Tide", "Otro"
  ],
  DO: [
    "Banco Popular", "BHD León", "Banreservas", "Santa Cruz", 
    "Scotiabank RD", "Azul", "TuCrédito", "Otro"
  ],
  UY: [
    "Banco República", "Santander Uruguay", "Scotiabank Uruguay", "Banco Itaú", 
    "OCA", "Creditel", "Prex", "Otro"
  ]
};


const initialState = {
    country: "",
    money: "",
    codeCountry: "",
    bancos : ""
}

const countryReducer = createReducer(initialState, (builder)=>{
    builder.addCase(countryMoney, (state, action)=>{
        state.country = action.payload
        state.codeCountry = paises[action.payload]
        state.money = monedasPorPais[action.payload]
        state.bancos = emisoresTarjetasPorPais[paises[action.payload]]
    })
})

export {countryReducer}