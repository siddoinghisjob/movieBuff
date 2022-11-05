import React, {useState} from 'react'
import { GiPopcorn, GiHamburgerMenu } from "react-icons/gi";

export default function Header(props) {
  const [menu,setMenu] = useState(false);
  return (
    <div>
        <header className="flex relative flex-row justify-center md:justify-between p-4 text-lg items-center bg-prime text-white">
          <div onClick={()=>window.location.href = "/"} className="flex cursor-pointer flex-row justify-center items-center gap-2 font-bold">
            <span className="p-1 rounded-md rotate-12 border-2 text-yellow-500">
              <GiPopcorn className="h-10 w-10" />{" "}
            </span>
            <ul className="flex flex-col gap-1 justify-center items-center">
              <li>Movie</li>
              <li>BUFF</li>
            </ul>
          </div>
          <div className='flex w-full justify-end md:hidden'>
            <GiHamburgerMenu className={!menu?'cursor-pointer':'hidden'} onClick={()=>setMenu(!menu)}/>
            <h1 className={menu?'cursor-pointer font-semibold border-2 rounded-full p-1 w-8 h-8 flex justify-center items-center':'hidden'} onClick={()=>setMenu(!menu)}>X</h1>
          </div>
          <div className={menu?'w-2/3 p-5 flex justify-center bg-tert text-prime z-50 flex-col absolute top-[5.7rem] rounded-bl-3xl shadow right-0':'w-full hidden md:flex justify-between'}>
            <div className='flex w-full justify-center'>
              <input type="search" className='w-full md:w-2/5 rounded-3xl p-2' placeholder='Search'/>
            </div>
            <ul className="md:flex flex-col md:flex-row gap-2 font-semibold">
              <li onClick={()=>window.location.href = "/"} className="cursor-pointer">Home</li>
              <li onClick={()=>window.location.href = "/about"} className="cursor-pointer">About</li>
            </ul>
          </div>
      </header>
    </div>
  )
}
