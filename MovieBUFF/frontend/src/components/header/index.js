import React, {useState, useEffect, useRef} from 'react';
import Search from '../search';

export default function Header(props) {
  const [search,setSearch] = useState([]);
  const div = useRef();
  const menu = [useRef(),useRef()];
  const [menuUtilState,setMenuUtilState] = useState(false);
  const [searchKey,setSearchKey] = useState();
  useEffect(()=>{
    document.addEventListener('click',(event)=>{
     if(div.current && !div.current.contains(event.target)) setSearchKey();
    })
   })
   useEffect(()=>{
    setSearch(search=>"");
    getSearch();
    const arr = search.sort((a,b)=>parseInt(b.popularity)-parseInt(a.popularity));
    setSearch(search => arr);
  },[searchKey])
  const getSearch = ()=>{
    fetch("https://api.themoviedb.org/3/search/multi?api_key="+process.env.REACT_APP_MOVIE_API_KEY+"&page=1&include_adult=false&query="+searchKey)
    .then(res=>res.json())
    .then(data=>{
      setSearch(search=>[]);
      data.results?.forEach(el=>{
        let link = 0, name= 0;
        if(el.media_type === "tv") {
          name = el.name;
          link = "/tv/"+el.id
        }
        else if(el.media_type === "movie"){
          name = el.title;
          link = "/movie/"+el.id
        }
        const dataEntr = {
            bg:'https://image.tmdb.org/t/p/w500'+el.backdrop_path,
            profile:el.poster_path?'https://image.tmdb.org/t/p/w500'+el.poster_path:"/assets/images/nonfoundhor.png",
            popularity: el.vote_count ? el.vote_count : 1,
            rate:el.vote_average,
            id: el.id,
            type: el.media_type,
            name: name,
            country:el.origin_country,
            link:link
          };
        setSearch(search=>[...search,dataEntr]);
      })
    })
  }
  return (
    <div>
      <header className="flex relative flex-row justify-center md:justify-between p-4 text-lg items-center bg-prime text-white">
        <div
          onClick={() => (window.location.href = "/")}
          className="flex cursor-pointer flex-row justify-center items-center gap-2 font-bold"
        >
          <span className="p-1 rounded-md rotate-12 border-2 flex justify-center items-center text-yellow-500">
            <img src="/assets/images/logo.svg" alt="popCorn icon" className="bg-prime md:h-14 md:w-14 h-10 w-20" />{" "}
          </span>
          <ul className="flex flex-col gap-1 justify-center items-center">
            <li>Movie</li>
            <li>BUFF</li>
          </ul>
        </div>
        <div className="flex w-full justify-end md:hidden">
          <div
            ref={menu[0]}
            className={!menuUtilState ? "cursor-pointer" : "hidden"}
            onClick={() => {
              setMenuUtilState(!menuUtilState);
              menu[0].current.classList.add("zoomOut");
              menu[1].current.classList.add("zoomIn");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              fill="currentColor"
              class="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          </div>
          <h1
            ref={menu[1]}
            className={
              menuUtilState
                ? "cursor-pointer font-semibold border-2 rounded-full p-1 w-8 h-8 flex justify-center items-center"
                : "hidden"
            }
            onClick={() => {
              setMenuUtilState(!menuUtilState);
              menu[0].current.classList.add("zoomIn");
              menu[1].current.classList.add("zoomOut");
            }}
          >
            X
          </h1>
        </div>
        <div
          className={
            menuUtilState
              ? "w-full p-5 flex justify-center bg-tert text-prime z-40 flex-col absolute top-[5.7rem] rounded-bl-3xl shadow right-0"
              : "w-full hidden md:flex justify-center"
          }
        >
          {!props?.search && (
            <div className="w-full flex justify-center">
              <p className="md:w-2/3 w-full">
                <Search />
              </p>
            </div>
          )}
          <ul className={props?.search?"flex md:w-fit md:absolute static right-2 top-1/3 w-full justify-between px-10 flex-row gap-2 font-semibold md:justify-end":"flex w-fit justify-between px-10 flex-row gap-2 font-semibold md:justify-end"}>
            <li
              onClick={() => (window.location.href = "/")}
              className="cursor-pointer"
            >
              Home
            </li>
            <li
              onClick={() =>
                (window.location.href = "https://siddoinghisjob.github.io/")
              }
              className="cursor-pointer"
            >
              About
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
