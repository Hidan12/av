import SelectThema from '../butonsTheme/ButonsTheme'
import logo from "../../assets/logos/avianca_full.svg"
import './header.css'
import BurguerMenu from '../burguerMennu/burguerMenu'
import { useState } from 'react'
const Header =()=>{
    const [burguerMenu, setBurguerMenu] = useState(false)
    return(
        <header className="header-conteiner">
            {burguerMenu && <BurguerMenu close={setBurguerMenu}/>}
            <div className='flex h-[90%]'>
                <button className='pl-5' onClick={()=>setBurguerMenu(c => c = !c)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#1B1B1B" className="bi bi-list" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                    </svg>
                </button>
            </div>
            <div className='flex h-[90%] justify-center items-center'>
                <img src={logo} className=' object-cover' alt="" />
            </div>
        </header>
    )
}
export default Header