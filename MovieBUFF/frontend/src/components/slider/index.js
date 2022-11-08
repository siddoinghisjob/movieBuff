import React, { useRef } from "react";
import Image from "../image";

export default function Slider(props) {
  const arr = [];
  const ref = useRef();
  const scrollTo = (parity) => {
    let width = ref.current.clientWidth;
    if (parity > 0) ref.current.scrollLeft += width;
    else if (parity < 0) ref.current.scrollLeft -= width;
  };

  for (let i = 0; i < props?.arr?.length; i++) {
    arr.push(
      <span
        onClick={() => {
          if (props?.arr[i]?.link) {
            window.location.href = props?.arr[i]?.link;
          }
        }}
        className={
          props?.arr[i]?.link
            ? "relative cursor-pointer Tiles min-h-[25rem] py-10 px-6 max-h-[25rem] lg:min-w-[20%] min-w-[100%] md:min-w-[50%] lg:max-w-[20%] max-w-[100%] md:max-w-[50%] justify-center items-center"
            : "relative Tiles flex flex-col min-h-[25rem] py-10 px-6 max-h-[25rem] lg:min-w-[20%] min-w-[100%] md:min-w-[50%] lg:max-w-[20%] max-w-[100%] md:max-w-[50%]  justify-center items-center"
        }
      >
        <Image source={props?.arr[i]?.src} alt={props?.arr[i]?.alt} />
        {props?.arr[i]?.tag?.length > 0 && (
          <span className="bg-yellow-500 p-1 w-full items-center justify-center flex px-2 bottom-1  roun text-prime">
            <ul>
              <li className="font-bold p-1">{props?.arr[i]?.tag[1]}</li>
              <li className="text-gray-500 p-1">{props?.arr[i]?.tag[0]}</li>
            </ul>
          </span>
        )}
      </span>
    );
  }
  return (
    <div className="relative w-full overflow-x-auto">
      <div
        className="absolute top-1/2 left-0 bg-black rounded-full z-50 p-2 cursor-pointer opacity-60 hover:opacity-100"
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
        className="relative justify-start overflow-x-auto overflow-y-hidden md:overflow-hidden scroll-smooth flex"
      >
        {arr}
      </div>
      <div
        className="absolute bottom-1/2 right-0 bg-black rounded-full z-50 p-2 cursor-pointer opacity-60 hover:opacity-100"
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
