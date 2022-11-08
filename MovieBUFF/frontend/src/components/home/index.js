import React, { useEffect, useState, Suspense } from "react";
import Search from "../search";
import Header from "../header";
import { Dna } from "react-loader-spinner";

export default function Home() {
  const [trending, setTrending] = useState([]);
  const [top, setTop] = useState([]);

  const Tiles = React.lazy(() => import("../tiles"));
  const Slider = React.lazy(() => import("../slider"));
  const Footer = React.lazy(() => import("../footer"));
  const trendingList = async () => {
    fetch(
      "https://api.themoviedb.org/3/trending/all/day?api_key="+process.env.REACT_APP_MOVIE_API_KEY+""
    )
      .then((res) => res.json())
      .then((data) => {
        data.results.forEach((el) => {
          let name = "";
          if (el.media_type === "movie") name = el.title;
          else if (el.media_type === "tv") name = el.name;
          const dataEntr = {
            bg: "https://image.tmdb.org/t/p/original" + el.backdrop_path,
            profile: "https://image.tmdb.org/t/p/w300" + el.poster_path,
            id: el.id,
            type: el.media_type,
            name: name,
          };
          setTrending((trending) => [...trending, dataEntr]);
        });
      });
  };

  const getTop = async () => {
    let res = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?api_key="+process.env.REACT_APP_MOVIE_API_KEY+"&page=1"
    );
    let data = await res.json();
    let arr = [];
    data.results?.map((el) =>
      arr.push({
        bg: "https://image.tmdb.org/t/p/orignal" + el.backdrop_path,
        src: "https://image.tmdb.org/t/p/w300" + el.poster_path,
        popularity: el.vote_count ? el.vote_count : 1,
        id: el.id,
        type: "movie",
        alt: el.title,
        link: "/movie/" + el.id,
      })
    );
    res = await fetch(
      "https://api.themoviedb.org/3/tv/top_rated?api_key="+process.env.REACT_APP_MOVIE_API_KEY+"&page=1"
    );
    data = await res.json();
    data.results?.map((el) =>
      arr.push({
        bg: "https://image.tmdb.org/t/p/w500" + el.backdrop_path,
        src: "https://image.tmdb.org/t/p/original" + el.poster_path,
        popularity: el.vote_count ? el.vote_count : 1,
        id: el.id,
        type: "tv",
        alt: el.name,
        link: "/tv/" + el.id,
      })
    );
    setTop((top) =>
      arr.sort((a, b) => parseInt(b.popularity) - parseInt(a.popularity))
    );
  };

  useEffect(() => {
    getTop();
    trendingList();
  }, []);
  let select = Math.floor(Math.random() * 1);
  let randNum;
  if (select === 1) randNum = Math.floor(Math.random() * trending?.length);
  else if (select === 0) randNum = Math.floor(Math.random() * top?.length);
  randNum = randNum >= trending?.length ? trending?.length : randNum;
  let bg = trending[randNum]?.bg;
  const style = {
    background: "url('" + bg + "') no-repeat center",
    boxShadow: "inset 0 0 0 1000px rgba(1, 179, 228, 0.5)",
    backgroundSize: "110%",
  };
  return (
    <div className="min-h-screen h-screen justify-between flex flex-col">
      <div>
        <Header search />
      </div>
      <div
        style={style}
        className="font-semibold min-w-[100wv] text-3xl shadow-md rounded-3xl rounded-t-none md:rounded-t-none gap-4 p-6 text-white flex flex-col justify-center items-center"
      >
        <div className="flex flex-col justify-center items-center gap-5 md:w-3/4 w-full">
          <ul className="brandHeading mr-7 md:m-0 font-extrabold w-full justify-start items-start flex flex-col gap-2 h-full">
            <li className="text-6xl">Welcome.</li>
            <li>
              Dive into the world of
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-orange-400 to-pink-600">
                {" "}
                FANTASY{" "}
              </span>
              .
            </li>
          </ul>
          <Search />
        </div>
        <Suspense
          fallback={
            <div className="h-full w-full justify-center items-center flex">
              <Dna
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
              />
            </div>
          }
        >
          {" "}
          <Slider arr={top} />
        </Suspense>
      </div>
      <div className="w-full flex flex-col items-center justify-center px-10 gap-10 mt-5">
        <Suspense
          fallback={
            <div className="h-full w-full justify-center items-center flex">
              <Dna
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
              />
            </div>
          }
        >
          <Tiles url="https://www" heading="Trending" state={trending} />
        </Suspense>
        <Suspense
          fallback={
            <div className="h-full w-full justify-center items-center flex">
              <Dna
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
              />
            </div>
          }
        >
          <Tiles
            heading="Action and Adventure"
            genreNumberMO="28"
            genreNumberTV="10759"
          />
        </Suspense>
        <Suspense
          fallback={
            <div className="h-full w-full justify-center items-center flex">
              <Dna
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
              />
            </div>
          }
        >
          <Tiles heading="Drama" genreNumberMO="18" genreNumberTV="18" />
        </Suspense>
        <Suspense
          fallback={
            <div className="h-full w-full justify-center items-center flex">
              <Dna
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
              />
            </div>
          }
        >
          <Tiles heading="Mystery" genreNumberMO="9648" genreNumberTV="9648" />
        </Suspense>
      </div>
      <Suspense
        fallback={
          <div className="h-full w-full justify-center items-center flex">
            <Dna
              visible={true}
              height="80"
              width="80"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          </div>
        }
      >
        <Footer />
      </Suspense>
    </div>
  );
}
