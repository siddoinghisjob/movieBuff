import React, {useRef} from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Tiles from "../tiles";
import { AiFillHeart } from "react-icons/ai";
import Header from "../header"

export default function Home() {

  return (
    <>
    <Header/>
      <div className="font-semibold min-w-[100wv] text-3xl shadow-md rounded-3xl rounded-t-none md:rounded-t-none bgbanner gap-4 p-6 text-white flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-5 md:w-3/4 w-full">
          <ul className="brandHeading mr-7 md:m-0 font-extrabold w-full justify-start items-start flex flex-col gap-2 h-full">
            <li className="text-6xl">Welcome.</li>
            <li>Dive into the world of 
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-orange-400 to-pink-600">{" "}FANTASY{" "}</span>.</li>
          </ul>
          <span className="w-full">
            <input
              type="search"
              placeholder="Find awesome shows, movies."
              className="w-full text-base md:text-lg font-sans flex justify-center items-center rounded-full p-2"
            />
        </span>
        </div>
        <Carousel showThumbs={false} className="w-full md:w-2/5 rounded-xl overflow-hidden">
          <div>
            <img src="/assets/images/portfolio.jpg" className="" alt="hi"/>
          </div>
          <div>
            <img src="/assets/images/portfolio.jpg" className="" alt="hi"/>
          </div> 
          <div>
            <img src="/assets/images/portfolio.jpg" className="" alt="hi"/>
          </div>
        </Carousel>
      </div>
      <div className="w-full flex flex-col items-center justify-center px-10 gap-10 mt-5">
        <Tiles url="https://www" heading="Trending"/>
        <Tiles url="https://www" heading="Action"/>
        <Tiles url="https://www" heading="Drama"/>
        <Tiles url="https://www" heading="Mystery"/>
      </div>
      <div className="bg-black text-gray-300 gap-2 text-xl p-2 flex justify-center items-center mt-4">
        Made by Soumya Deep Sarkar with <AiFillHeart className="text-red-600"/>
      </div>
    </>
  );
}
