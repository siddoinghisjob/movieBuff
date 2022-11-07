import React,{useEffect, useState} from 'react';
import Slider from "../slider";
import {useInView} from "react-intersection-observer";

export default function Tiles(props) {
  const [list,setList] = useState([]);
  const getList = async()=>{
    let res = await fetch("https://api.themoviedb.org/3/discover/movie?api_key=d295dbc3df693393259f2c07fb7a0e4a&with_genres="+props?.genreNumberMO);
    let data = await res.json();
    let arrAction = [];
    data.results.forEach(el=>{
      const dataEntr = {
        bg:'https://image.tmdb.org/t/p/original'+el.backdrop_path,
        profile:el.poster_path?'https://image.tmdb.org/t/p/w300'+el.poster_path:"/assets/images/nonfoundhor.png",
      popularity:el.vote_count?el.vote_count:1,
        id:el.id,
        type:'movie',
        name:el.title
      }
      arrAction.push(dataEntr)
    })
    res = await fetch("https://api.themoviedb.org/3/discover/tv?api_key=d295dbc3df693393259f2c07fb7a0e4a&with_genres="+props?.genreNumberTV);
    data = await res.json();
    data.results.forEach(el=>{
      const dataEntr = {
        bg:'https://image.tmdb.org/t/p/original'+el.backdrop_path,
        profile:el.poster_path?'https://image.tmdb.org/t/p/w300'+el.poster_path:"/assets/images/nonfoundhor.png",
      popularity:el.vote_count?el.vote_count:1,
        id:el.id,
        type:'tv',
        name:el.name
      }
      arrAction.push(dataEntr)
    })
    arrAction = arrAction.sort((a,b)=>parseInt(b.popularity)-parseInt(a.popularity))
    setList(arrAction)
  }

  const arr=[];
  if(list?.length>0){
    let len = list?.length;
    if(props?.heading === 'Trending') len = list?.length>19?19:list?.length;
    for(let i = 0; i < len; i++){
      arr.push({
        src:list[i]?.profile,
        alt:list[i]?.name,
        link:list[i]?.type+'/'+list[i]?.id,
      });
    }
  }

  useEffect(()=>{
    getList();
  },[]);

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0.7,
  });

  return (
    <div ref={ref} 
    className={inView?"flex flex-col w-full rounded-md border-2 p-2 text-white justify-center items-center text-2xl py-10 opacity-100 active transition-all":"flex flex-col w-full rounded-md border-2 p-2 text-white justify-center items-center text-2xl py-10 opacity-50"}>
          <div className=" bg-gradient-to-r from-tert to-second text-prime p-2 rounded-md shadow-inner fontDesi">
            {props.heading}
          </div>
          <Slider arr={arr}/>
    </div>
  )
}
