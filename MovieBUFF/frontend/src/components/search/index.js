import React, { useState, useEffect, useRef } from "react";
import {RotatingLines} from "react-loader-spinner"

export default function Search() {
  const [search, setSearch] = useState([]);
  const [searchKey, setSearchKey] = useState();
  const[loader,setLoader]=useState(true);
  const div = useRef();
  useEffect(() => {
    document.addEventListener("click", (event) => {
      if (div.current && !div.current.contains(event.target)) setSearchKey();
    });
  });
  const getSearch = () => {
    fetch(
      "https://api.themoviedb.org/3/search/multi?api_key="+process.env.REACT_APP_MOVIE_API_KEY+"&page=1&include_adult=false&query=" +
        searchKey
    )
      .then((res) => res.json())
      .then((data) => {
        setSearch((search) => []);
        data.results?.forEach((el) => {
          let link = 0,name = 0;
          if (el.media_type === "tv") {
            name = el.name;
            link = "/tv/" + el.id;
            const dataEntr = {
                bg: "https://image.tmdb.org/t/p/w500" + el.backdrop_path,
                profile: el.poster_path
                  ? "https://image.tmdb.org/t/p/w500" + el.poster_path
                  : "/assets/images/nonfoundhor.png",
                popularity: el.vote_count ? el.vote_count : 1,
                rate: el.vote_average,
                id: el.id,
                type: el.media_type,
                name: name,
                country: el.origin_country,
                link: link,
              };
            setSearch((search) => [...search, dataEntr]);
          } else if (el.media_type === "movie") {
            name = el.title;
            link = "/movie/" + el.id;
            const dataEntr = {
                bg: "https://image.tmdb.org/t/p/w500" + el.backdrop_path,
                profile: el.poster_path
                  ? "https://image.tmdb.org/t/p/w500" + el.poster_path
                  : "/assets/images/nonfoundhor.png",
                popularity: el.vote_count ? el.vote_count : 1,
                rate: el.vote_average,
                id: el.id,
                type: el.media_type,
                name: name,
                country: el.origin_country,
                link: link,
              };
            setSearch((search) => [...search, dataEntr]);
            setLoader(loader=>false);
          }
        });
      })
      .catch((err)=>{
        setSearch((search) => [{
            popularity:100,
            profile:"/assets/images/nonfoundhor.png",
            link:'/404',
            name:'Error occured : ',err
        }]);
      })
  };
  useEffect(() => {
    setSearch((search) => "");
    setLoader(loader=>true);
    getSearch();
    const arr = search.sort(
      (a, b) => parseInt(b.popularity) - parseInt(a.popularity)
    );
    setSearch((search) => arr);
  }, [searchKey]);
  return (
    <>
      <span className="w-full relative" ref={div}>
        <input
          onKeyUp={(e) => {
            setSearchKey(e.target.value);
          }}
          type="search"
          placeholder="Find awesome shows, movies."
          className={
            searchKey?.length > 0
              ? "w-full outline-none text-gray-400 rounded-b-none shadow-xl text-center md:text-lg font-sans flex justify-center items-center rounded-full p-2"
              : "w-full outline-none text-gray-400 text-center md:text-lg font-sans flex justify-center focus:shadow-lg items-center rounded-full p-2"
          }
        />
        <ul
          className={
            searchKey?.length > 0
              ? "absolute max-h-64 md:max-h-72 overflow-y-auto overflow-x-hidden scrollSpec bg-white z-[9999] gap-2 flex flex-col text-lg rounded-b-xl text-black p-2 left-0 right-0"
              : "hidden"
          }
        >
          {loader && (
            <div className="w-full h-full p-2 flex justify-center items-center">
              <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="36"
                visible={true}
              />
            </div>
          )}
          {!loader &&
            search?.map((el) => (
              <li
                onClick={() => (window.location.href = el.link)}
                className="items-center bg-gray-200 rounded-lg text-black cursor-pointer flex justify-between px-1 w-full"
              >
                <span className="h-full w-full flex justify-center">
                  <img
                    className="h-24"
                    alt={el.name}
                    src={el.profile}
                    loading="lazy"
                  />
                </span>
                <span className="flex flex-col md:flex-row gap-3 p-5 justify-start">
                  <span className="w-full overflow-x-auto scrollSpec capitalize">
                    {el.name}
                  </span>
                  <span className="uppercase font-bold">{el.type}</span>
                  <ul>
                    {el.country?.map((ele) => (
                      <li>{ele}</li>
                    ))}
                  </ul>
                  <span className="text-sm flex items-center justify-center"><b className="text-lg">{el.rate}</b>/10</span>
                </span>
              </li>
            ))}
        </ul>
      </span>
    </>
  );
}
