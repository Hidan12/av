import { configureStore } from "@reduxjs/toolkit";
import { reducerTheme } from "./reducer/themeReducer";
import { homeReducer } from "./reducer/homeReducer";
import { countryReducer } from "./reducer/countryReducer";
import { facturacionReducer } from "./reducer/facturacionReducer";

export const store = configureStore({
    reducer:{
        reducerHome: homeReducer,
        countryReducer:countryReducer,
        facturacionReducer:facturacionReducer
    }
})