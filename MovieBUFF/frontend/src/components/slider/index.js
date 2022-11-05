import React,{useRef} from 'react'
import {ColorRing} from "react-loader-spinner";
import {BiLeftArrow} from "react-icons/bi";
import useSmoothScroll from "react-smooth-scroll-hook";
import Image from '../image';

export default function Slider(props) {
  const arr = [];
  const {createRef} = React;
  const refImg = Array.from({length : 10},()=>createRef(0));
  const refImgLoader = Array.from({length : 10},()=>createRef(0));
  const ref = useRef();
  const { scrollTo } = useSmoothScroll({
    ref,
    speed: 100,
    direction: "x",
  });
  for(let i = 0; i < 10; i++){
    arr.push(
      <span className="min-w-[10rem] Tiles relative min-h-[18rem] flex flex-col justify-center items-center m-2">
        <Image source={props.arr[i].src} alt={props.arr[i].alt}/>
        {props.arr[i].tag&&
        <span className='bg-black py-1 w-full items-center justify-center flex px-2 bottom-1  roun text-white'>
        {props.arr[i].tag}
      </span>}
      </span>
    );
  }
  return (
    <div className="relative w-full overflow-x-auto">
            <div
              className="absolute top-1/2 left-0 bg-black rounded-full z-50 p-2 cursor-pointer opacity-60 hover:opacity-100"
              onClick={() => scrollTo(-400)}
            >
              <BiLeftArrow className="text-tert h-10 w-10" />
            </div>
            <div
              ref={ref}
              className="relative w-full overflow-x-auto p-4 scroll px-10 flex flex-row"
            >
              {arr}
            </div>
            <div
              className="absolute top-1/2 right-0 bg-black rounded-full z-50 p-2 cursor-pointer opacity-60 hover:opacity-100"
              onClick={() => scrollTo(400)}
            >
              <BiLeftArrow className="text-tert h-10 w-10 rotate-180" />
            </div>
          </div>
  )
}
