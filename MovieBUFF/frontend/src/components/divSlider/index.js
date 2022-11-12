import React, { useRef } from "react";
import Image from "../image";

export default function Slider(props) {
  const arr = [];
  const ref = useRef();
  const scrollTo = (p) => {
    let width = ref.current.clientWidth;
    if (p > 0) ref.current.scrollLeft += width;
    else ref.current.scrollLeft -= width;
  };
  for (let i = 0; i < props.arr?.length; i++) {
    arr.push(
      <div className="p-2 min-w-[100%] max-w-[100%] md:min-w-[50%] md:max-w-[50%] lg:min-w-[25%] lg:max-w-[25%] min-h-[18rem] max-h-[18rem]">
        <span className="bg-tert w-full font-mono p-5 rounded-3xl Tiles justify-between relative flex flex-col min-h-[17rem] max-h-[17rem]">
          <div className="w-full font-extrabold flex flex-row">
            <span className="w-full overflow-x-auto flex justify-start items-start scrollSpec">
              Ep#{props.arr[i]?.number}
            </span>
            <p className="w-full overflow-y-auto scrollSpec">
              {props.arr[i]?.name}
            </p>
          </div>
          {(props.arr[i]?.poster || props.arr[i]?.overview!==" ") && (
            <div className={props.arr[i]?.overview !== " "?"flex flex-col justify-between items-center h-56 overflow-y-auto scrollSpec":"flex flex-col justify-end items-center h-56 overflow-y-auto scrollSpec"}>
              {props.arr[i]?.poster && (
                <div className="h-44 max-w-[200px]">
                  <Image
                    source={props.arr[i]?.poster}
                    alt={props.arr[i]?.name}
                    lazy={i>10?true:false}
                  />
                </div>
              )}
              {props.arr[i]?.overview!==" " && (
                <span className="py-1 w-full flex px-2 bottom-1 justify-start items-start h-full text-white">
                  {props.arr[i]?.overview}
                </span>
              )}
            </div>
          )}
        </span>
      </div>
    );
  }
  return (
    <div className="relative w-full overflow-x-auto">
      <div
        className="absolute hidden md:block top-1/2 left-0 bg-black rounded-full z-50 p-2 cursor-pointer opacity-60 hover:opacity-100"
        onClick={() => scrollTo(-400)}
      >
        <b className="text-tert p-0 rotate-180 rounded-full h-10 w-10 flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            fill="currentColor"
            class="bi bi-arrow-right-circle"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
            />
          </svg>
        </b>
      </div>
      <div
        ref={ref}
        className="relative w-full overflow-x-auto scrollSpec scroll-smooth flex flex-row"
      >
        {arr}
      </div>
      <div
        className="absolute hidden md:block bottom-1/2 right-0 bg-black rounded-full z-50 p-2 cursor-pointer opacity-60 hover:opacity-100"
        onClick={() => scrollTo(400)}
      >
        <b className="text-tert p-0 rotate-180 rounded-full h-10 w-10 flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            fill="currentColor"
            class="bi bi-arrow-left-circle"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
            />
          </svg>
        </b>
      </div>
    </div>
  );
}
