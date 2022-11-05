import React, { useRef } from "react";
import { BiLeftArrow } from "react-icons/bi";
import useSmoothScroll from "react-smooth-scroll-hook";
import Image from "../image";

export default function Slider(props) {
  const arr = [];
  const ref = useRef();
  const { scrollTo } = useSmoothScroll({
    ref,
    speed: 100,
    direction: "x",
  });
  for (let i = 0; i < 10; i++) {
    arr.push(
      <span className="bg-tert w-full min-w-[22rem] font-mono p-2 rounded-3xl Tiles relative h-96 flex flex-col justify-center items-center m-2">
        <div className="w-full font-extrabold text-2xl grid grid-cols-2 items-center">
          <span className="w-full overflow-x-auto scrollSpec">Ep#1</span>
          <span className="w-full overflow-x-auto scrollSpec">EpName</span>
        </div>
        <div className="flex flex-col md:flex-row items-center h-56 overflow-y-auto scrollSpec">
          <div className="h-44">
            <Image source={props.arr[i].src} alt={props.arr[i].alt} />
          </div>
          {props.arr[i].overview && (
            <span className="py-1 w-full flex px-2 bottom-1 justify-start items-start h-full text-white">
              {props.arr[i].overview}
            </span>
          )}
        </div>
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
  );
}
