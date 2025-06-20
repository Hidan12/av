import { configureStore } from "@reduxjs/toolkit";
import { reducerTheme } from "./reducer/themeReducer";
import { homeReducer } from "./reducer/homeReducer";
import { countryReducer } from "./reducer/countryReducer";

export const store = configureStore({
    reducer:{
        reducerHome: homeReducer,
        reducerTheme: reducerTheme,
        countryReducer:countryReducer 
    }
})