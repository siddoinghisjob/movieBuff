import React,{useRef} from 'react'
import Image from '../image';

export default function Slider(props) {
  const arr = [];
  const ref = useRef();
  const scrollTo = (parity)=>{
    let width = ref.current.clientWidth;
    if(parity > 0)
      ref.current.scrollLeft += width;
    else if(parity < 0)
      ref.current.scrollLeft -= width; 
  }

  for(let i = 0; i < props?.arr?.length; i++){
    arr.push(
      <span onClick={()=>{
        if(props?.arr[i]?.link){
          window.location.href = props?.arr[i]?.link;
        }
      }} className={props?.arr[i]?.link?
        "relative cursor-pointer Tiles min-h-[25rem] py-10 px-6 max-h-[25rem] lg:min-w-[20%] min-w-[100%] md:min-w-[50%] lg:max-w-[20%] max-w-[100%] md:max-w-[50%] justify-center items-center":
        "relative Tiles flex flex-col min-h-[25rem] py-10 px-6 max-h-[25rem] lg:min-w-[20%] min-w-[100%] md:min-w-[50%] lg:max-w-[20%] max-w-[100%] md:max-w-[50%]  justify-center items-center"}>
          <Image source={props?.arr[i]?.src} alt={props?.arr[i]?.alt}/>
          {props?.arr[i]?.tag?.length>0&&
          <span className='bg-yellow-500 p-1 w-full items-center justify-center flex px-2 bottom-1  roun text-prime'>
          <ul>
            <li className='font-bold p-1'>{props?.arr[i]?.tag[1]}</li>
            <li className='text-gray-500 p-1'>{props?.arr[i]?.tag[0]}</li>
          </ul>
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
              <b className="text-tert h-10 w-10 px-3">&lt;</b>
            </div>
            <div
              ref={ref}
              className="relative justify-start overflow-x-auto overflow-y-hidden md:overflow-hidden scroll-smooth flex"
            >
              {arr}
            </div>
            <div
              className="absolute top-1/2 right-0 bg-black rounded-full z-50 p-2 cursor-pointer opacity-60 hover:opacity-100"
              onClick={() => scrollTo(400)}
            >
              <b className="text-tert h-10 w-10 px-3">&gt;</b>
            </div>
          </div>
  )
}
