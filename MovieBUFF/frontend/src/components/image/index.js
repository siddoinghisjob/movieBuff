import React,{useRef} from 'react';
import { ColorRing } from "react-loader-spinner";

export default function Image(source) {
    const image = useRef(0);
    const imageLoader = useRef(0);
  
  return (
    <>
        <div ref={imageLoader} className="bg-white w-full h-full flex items-center justify-center">
                <ColorRing
                className=""
                visible={true}
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
              />
              </div>
            <div ref={image} className="relative hidden h-full w-full" >
              <img src={source.source} className="h-full w-full" alt={source.alt} onLoad={()=>{
                image.current.classList.add('fadeIn');
                imageLoader.current.classList.add('hidden');
                image.current.classList.remove('hidden');
              }}/>
    </div>
    </>
  )
}
