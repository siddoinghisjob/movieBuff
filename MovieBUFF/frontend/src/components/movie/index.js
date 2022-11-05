import React, {useRef} from "react";
import Header from "../header";
import { useParams } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Image from "../image";
import Slider from "../slider";
import { GiHearts } from "react-icons/gi";
import Footer from "../footer";

export default function Movie() {
  let {id} = useParams();
  const style = {
    banner: {
      background: "url('/assets/images/bg.jpg')",
      boxShadow: "inset 0 0 0 1000px rgba(1, 179, 228, 0.8)",
    },
  };

  const arr = [];
  for(let i = 0; i < 10; i++){
    arr.push({src:"/assets/images/prof.jpg",alt:"hero",tag:"HeroHeraLal"})
  }
  return (
    <div className="w-full h-full">
      <Header />
      <div
        style={style.banner}
        className="flex fontDesi h-full w-full gap-10 text-white flex-col p-2 md:px-10 py-5 justify-center items-center"
      >
        <div className="text-lg text-center h-full w-full p-2 md:flex flex-col md:flex-row items-center justify-between">
          <div>
            <div className="text-6xl">MovieName</div>
            <div>Created by Lauro, Lalit</div>
          </div>

          <div className="hidden md:flex">
            <ul className="flex flex-row gap-1 bg-white shadow-inner text-prime border-2 p-2 rounded-md">
              <li>Mystery hai tagline.</li>
            </ul>
          </div>
        </div>
        <div className="w-full h-full flex md:grid md:grid-cols-2 flex-col-reverse justify-center items-center gap-3">
          <div className="flex flex-col md:flex-row gap-2">
            <div className="hidden md:flex h-72 w-fit min-w-[12rem] fadeInOut justify-center items-center rounded-md">
              <Image source="/assets/images/prof.jpg" alt="HeroImage" />
            </div>
            <div className="flex flex-col fontDesi h-full justify-center w-full p-1">
              <div className="flex justify-center items-center">
                <iframe
                  src="https://www.youtube.com/embed/JfVOs4VSpmA"
                  frameborder="0"
                  allow="autoplay; encrypted-media"
                  allowfullscreen
                  title="video"
                  className="h-full md:min-h-[17rem] min-h-[13rem] w-11/12"
                />
              </div>{" "}
              <div className="flex md:hidden flex-row w-screen text-center justify-center items-center">
                Rated<b className="text-xl text-yellow-400"> &nbsp;7</b>/10
              </div>
            </div>
          </div>
          <div className="hidden md:flex flex-col justify-between h-full">
            <p className="w-fit">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro non
              sed maxime praesentium esse pariatur? Animi ut minima vero
              voluptatibus reprehenderit repellat neque iusto, eligendi culpa,
              rem nihil tempora? Ipsam!
            </p>
            <div className="p-2 w-full flex items-center justify-between flex-row">
              <button className="bg-yellow-500 text-black border-2 border-black rounded-xl p-2 font-extrabold">
                Watch on Netflix
              </button>
              <div className="w-14 h-14 overflow-hidden">
                <CircularProgressbar
                  className="h-14 flex justify-end"
                  value={80}
                  text={`${80}%`}
                  background={true}
                  styles={{
                    root: {},
                    path: {
                      stroke: `rgba(92, 233, 92,1)`,
                      strokeLinecap: "butt",
                      transition: "stroke-dashoffset 0.5s ease 0s",
                      transform: "rotate(0.25turn)",
                      transformOrigin: "center center",
                    },
                    trail: {
                      stroke: "#103201",
                      strokeLinecap: "butt",
                      transform: "rotate(0.25turn)",
                      transformOrigin: "center center",
                    },
                    text: {
                      fill: "#fff",
                      fontSize: "2rem",
                    },
                    background: {
                      fill: "#0d253f",
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex md:hidden flex-col items-center justify-center p-1 my-5">
        <div className="flex flex-row items-center gap-1">
          <div className="flex md:hidden h-32 w-28">
            <Image
              source="/assets/images/prof.jpg"
              className="h-10 w-5"
              alt="HeroImage"
            />
          </div>
          <p className="w-fit">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro non
            sed maxime praesentium esse pariatur? Animi ut minima vero
            voluptatibus reprehenderit repellat neque iusto, eligendi culpa, rem
            nihil tempora? Ipsam!
          </p>
        </div>
        <div className="items-center w-full flex flex-row justify-between">
          <button className="bg-yellow-500 text-black border-2 border-black rounded-xl p-2 font-extrabold">
            Watch on Netflix
          </button>
          <div className="w-14 h-14 overflow-hidden">
            <CircularProgressbar
              className="h-14 flex justify-end"
              value={80}
              text={`${80}%`}
              background={true}
              styles={{
                root: {},
                path: {
                  stroke: `rgba(92, 233, 92,1)`,
                  strokeLinecap: "butt",
                  transition: "stroke-dashoffset 0.5s ease 0s",
                  transform: "rotate(0.25turn)",
                  transformOrigin: "center center",
                },
                trail: {
                  stroke: "#103201",
                  strokeLinecap: "butt",
                  transform: "rotate(0.25turn)",
                  transformOrigin: "center center",
                },
                text: {
                  fill: "#fff",
                  fontSize: "2rem",
                },
                background: {
                  fill: "#0d253f",
                },
              }}
            />
          </div>
        </div>
      </div>
      <div className="w-full h-full p-7">
        <div className="border-2 rounded-lg border-black p-2 gap-5 flex flex-col">
          <ul className="flex flex-row overflow-auto w-full shadow-inner scroll gap-1 p-4 py-2 bg-gray-200">
            <li className="text-base border-2 p-1 rounded-md bg-white">Tag1</li>
            <li className="text-base border-2 p-1 rounded-md bg-white">Tag2</li>
            <li className="text-base border-2 p-1 rounded-md bg-white">Tag3</li>
            <li className="text-base border-2 p-1 rounded-md bg-white">Tag4</li>
            <li className="text-base border-2 p-1 rounded-md bg-white">Tag5</li>
            <li className="text-base border-2 p-1 rounded-md bg-white">Tag6</li>
            <li className="text-base border-2 p-1 rounded-md bg-white">Tag7</li>
          </ul>
          <div className="grid grid-cols-2 md:grid-cols-4 items-center p-4 py-2 rounded-lg">
            <span className="bg-white p-2 py-1 shadow-inner text-lg w-">146min.</span>
            <span className="bg-white p-2 py-1 shadow-inner text-lg w-">EN ES</span>
            <span className="bg-white p-2 py-1 shadow-inner text-lg w-">Build on : 146min.</span>
            <span className="bg-white p-2 py-1 shadow-inner text-lg w-">Collected : 146min.</span>
          </div>
        </div>
      </div>
      <hr />
      <div className="flex font-xl fontDesi p-2 flex-col w-full h-full">
        <div className="flex w-full flex-row items-center gap-0">
          <div className="w-28 h-1 bg-black"></div>
          <div className="border-2 border-black rounded-b-none bg-yellow-400 text-black w-fit p-2 py-1 rounded-xl">
            Cast
          </div>
        </div>
        <Slider arr={arr} />
      </div>
      <div className="flex font-xl fontDesi p-2 flex-col w-full h-full">
        <div className="w-full flex justify-end">
          <div className="flex w-full flex-row-reverse items-center gap-0">
            <div className="w-28 h-1 bg-black"></div>
            <div className="border-2 border-black rounded-b-none bg-yellow-400 text-black w-fit p-2 py-1 rounded-xl">
              Crew
            </div>
          </div>
        </div>
        <Slider arr={arr} />
      </div>
      <div className="flex font-xl fontDesi p-2 flex-col w-full h-full">
        <div className="flex w-full flex-row items-center gap-0">
          <div className="w-28 h-1 bg-black"></div>
          <div className="border-2 border-black rounded-b-none bg-yellow-400 text-black w-fit p-2 py-1 rounded-xl">
            Recommendations
          </div>
        </div>{" "}
        <Slider arr={arr} />
      </div>
      <Footer/>
    </div>
  );
}
