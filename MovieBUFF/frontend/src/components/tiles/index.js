import React from 'react';
import { useInView } from "react-intersection-observer";
import Slider from "../slider";

export default function Tiles(props) {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0.4,
  });
  
  const arr=[];
  for(let i = 0; i < 10; i++){
    arr.push({src:"/assets/images/pic.jpg",alt:"harry potter"});
  }
  return (
    <div ref={ref} className={inView?"flex flex-col w-full rounded-md border-2 p-2 text-white justify-center items-center text-2xl py-10 transition-all opacity-100 active":"flex flex-col w-full rounded-md border-2 p-2 text-white justify-center items-center text-2xl py-10 opacity-40"}>
          <div className="fontDesi bg-gradient-to-r from-tert to-second text-prime p-2 rounded-md shadow-inner fontDesi">
            {props.heading}
          </div>
          <Slider arr={arr}/>
    </div>
  )
}
