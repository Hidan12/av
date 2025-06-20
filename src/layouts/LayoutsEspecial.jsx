import { Outlet } from "react-router-dom";
import { HeaderSpecial } from "../components/headerSpecial/HeaderSpecial";


const LayoutsEspecial = ()=>{
    return(
        <>
            <HeaderSpecial/>
            <Outlet/>
        </>
    )
}

export {LayoutsEspecial}