import React, { useRef } from "react";
import Image from "../image";

export default function Slider(props) {
  const arr = [];
  const ref = useRef();
  const scrollTo = (p)=>{
    let width = ref.current.clientWidth;
    if(p>0) ref.current.scrollLeft += width;
    else ref.current.scrollLeft -= width;
  };
  for (let i = 0; i < props.arr?.length; i++) {
    arr.push(
      <div className="p-2 min-w-[100%] max-w-[100%] md:min-w-[50%] md:max-w-[50%] lg:min-w-[25%] lg:max-w-[25%] min-h-[18rem] max-h-[18rem]">
        <span className="bg-tert w-full font-mono p-5 rounded-3xl Tiles relative flex flex-col min-h-[17rem] max-h-[17rem]">
          <div className="w-full font-extrabold flex flex-row">
            <span className="w-full overflow-x-auto flex justify-start items-start scrollSpec">Ep#{props.arr[i]?.number}</span>
            <p className="w-full overflow-y-auto scrollSpec">{props.arr[i]?.name}</p>
          </div>
          {(props.arr[i]?.poster || props.arr[i]?.overview) &&
          <div className="flex flex-col items-center h-56 overflow-y-auto scrollSpec">
            {props.arr[i]?.poster &&
              <div className="h-44 max-w-[200px]">
              <Image source={props.arr[i]?.poster} alt={props.arr[i]?.name}/>
            </div>
            }
            {props.arr[i]?.overview && (
              <span className="py-1 w-full flex px-2 bottom-1 justify-start items-start h-full text-white">
                {props.arr[i]?.overview}
              </span>
            )}
          </div>
    }
      </span>
      </div>
    );
  }
  return (
    <div className="relative w-full overflow-x-auto">
      <div
        className="absolute top-0 h-full left-0 hidden md:block rounded-full z-50 p-2"
      >
        <p className="flex items-center justify-center h-full">
          <b onClick={() => scrollTo(-400)} className="text-prime h-12 w-12 shadow-2xl bg-white bg-opacity-40 opacity-70 hover:opacity-100 cursor-pointer p-2 px-3 rounded-lg hover:bg-opacity-100">&lt;</b>
        </p>
      </div>
      <div
        ref={ref}
        className="relative w-full overflow-x-hidden scroll-smooth flex flex-row"
      >
        {arr}
      </div>
      <div
        className="absolute top-0 h-full right-0 hidden md:block rounded-full z-50 p-2"
      >
        <p className="flex items-center justify-center h-full">
          <b onClick={() => scrollTo(400)} className="text-prime cursor-pointer rotate-180 h-12 w-12 shadow-2xl bg-white bg-opacity-40 opacity-70 hover:opacity-100 p-2 px-3 rounded-lg hover:bg-opacity-100">&gt;</b>
        </p>
      </div>
    </div>
  );
}
