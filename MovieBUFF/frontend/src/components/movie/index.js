import React, { useState, useEffect, Suspense } from "react";
import Header from "../header";
import { useParams } from "react-router-dom";
import Image from "../image";
import { ThreeDots, Dna, RotatingLines } from "react-loader-spinner";

export default function Movie() {
  let { id } = useParams();
  const Rec = React.lazy(() => import("../rec"));
  const Crew = React.lazy(() => import("../cast"));
  const Cast = React.lazy(() => import("../crew"));
  const Footer = React.lazy(() => import("../footer"));
  const [movie, setMovie] = useState();
  const [trailer, setTrailer] = useState(false);
  const getData = () => {
    fetch(
      "https://api.themoviedb.org/3/movie/" +
        id +
        "?api_key=" +
        process.env.REACT_APP_MOVIE_API_KEY
    )
      .then((res) => res.json())
      .then((data) => {
        const genres = [];
        data.genres.map((el) => genres.push(el.name));
        const rate = Math.ceil(
          (data.vote_average ? data.vote_average : 0) * 10
        );
        const ent = {
          overview: data.overview ? data.overview : "No overview",
          poster: data.poster_path
            ? "https://image.tmdb.org/t/p/w500" + data.poster_path
            : "/assets/images/nonfoundhor.png",
          bg: "https://image.tmdb.org/t/p/original" + data.backdrop_path,
          genre: genres,
          name: data.title,
          status: data.status,
          tag: data.tagline,
          vote: data.vote_average ? rate : 0,
          voteAcu: data.vote_average ? data.vote_average : 0,
          home: data.homepage,
          budget: data.budget.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          }),
          boxOffice: data.revenue.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          }),
          date: data.release_date,
          time: data.runtime,
          lang: data.spoken_languages,
        };
        setMovie((movie) => ent);
      })
      .catch((err) => {
        window.location.href = "/404";
      });
  };
  const getTrailer = () => {
    fetch(
      "https://api.themoviedb.org/3/movie/" +
        id +
        "/videos?api_key=" +
        process.env.REACT_APP_MOVIE_API_KEY
    )
      .then((res) => res.json())
      .then((data) => {
        let fal = "";
        data.results?.forEach((el) => {
          if (el.type === "Trailer" && el.official === true) {
            setTrailer(el.key);
          } else if (el.type === "Trailer") fal = el.key;
        });
        if (!trailer) setTrailer(fal);
      })
      .catch((err) => {
        window.open("/404");
      });
  };
  useEffect(() => {
    getData();
    getTrailer();
  }, []);
  const style = {
    banner: {
      background: "url('" + movie?.bg + "') no-repeat",
      boxShadow: "inset 0 0 0 1000px rgba(120, 20, 28, 0.6)",
      backgroundSize: "100%",
    },
  };

  document.title = movie?.name ? movie?.name : "Movie BUFF";

  return (
    <div className="w-full h-full">
      <Header />
      <div
        style={style.banner}
        className="flex relative fontDesi h-full w-full gap-10 text-white flex-col p-2 md:px-10 py-5 justify-center items-center"
      >
        <div className="text-lg text-center h-full w-full p-2 md:flex flex-col md:flex-row items-center justify-between">
          <div>
            <div className="text-6xl w-full overflow-x-auto scrollSpec overflow-y-hidden">
              {movie?.name}
            </div>
          </div>

          {movie?.tag && (
            <div className="hidden md:flex">
              <ul className="flex flex-row gap-1 bg-white shadow-inner text-prime border-2 p-2 rounded-md">
                <li>{movie?.tag}</li>
              </ul>
            </div>
          )}
        </div>
        <div className="w-full h-full flex md:grid md:grid-cols-2 flex-col-reverse justify-center items-center gap-3">
          <div className="flex flex-col md:flex-row gap-2">
            <div className="hidden md:flex h-72 w-fit min-w-[12rem] fadeInOut justify-center items-center rounded-md">
              <Image source={movie?.poster} alt={movie?.name} />
            </div>
            <div className="flex flex-col fontDesi h-full justify-center w-full p-3">
                  {trailer && (
                    <div className="flex relative justify-center items-center md:min-h-[17rem] min-h-[13rem] w-full bg-black bg-opacity-50 rounded-lg">
                      <iframe
                        src={"https://www.youtube.com/embed/" + trailer}
                        frameborder="0"
                        allow="autoplay; encrypted-media"
                        allowfullscreen
                        title="video"
                        className="h-full z-10 min-w-full max-w-full md:min-h-[17rem] min-h-[13rem]"
                        loading="lazy"
                      />
                      <div className="w-20 z-0 absolute h-20 flex items-center justify-center animate-pulse shadow-xl rounded-full">
                        <RotatingLines
                          strokeColor="white"
                          strokeWidth="4"
                          animationDuration="0.75"
                          width="96"
                          visible={true}
                        />
                      </div>
                    </div>
                  )}
                  {!trailer &&
                    movie?.bg !== "/assets/images/nonfoundhor.png" && (
                      <img src={movie?.bg} alt={movie?.name} />
                    )}
                </div>
          </div>
          <div className="hidden md:flex flex-col justify-between h-full">
            <p className="w-full justify-center flex items-center">
              {!movie?.overview && (
                <div className="absolute top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <ThreeDots
                    height="80"
                    width="80"
                    radius="9"
                    color="#4fa94d"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                  />
                </div>
              )}
              {movie?.overview}
            </p>
            <div className="p-2 w-full flex items-center justify-between flex-row">
              {movie?.home && (
                <a
                  href={movie?.home ? movie?.home : ""}
                  className="bg-yellow-500 text-black border-2 border-black rounded-xl p-2 font-extrabold text-center"
                >
                  Watch NOW
                </a>
              )}
              <div className="flex flex-row w-full text-center justify-center items-center">
                Rated
                <b className="text-xl text-yellow-400">
                  {" "}
                  &nbsp;{movie?.voteAcu}
                </b>
                /10
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex md:hidden flex-col items-center justify-center p-1 my-5">
        <div className="flex flex-row items-center gap-1">
          <div className="flex md:hidden h-32 w-28">
            <Image
              source={movie?.poster}
              className="h-10 w-5"
              alt={movie?.name}
              act={true}
            />
          </div>
          <p className="w-full justify-center flex items-center">
            {!movie?.overview && (
              <div className="absolute top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 flex items-center justify-center">
                <ThreeDots
                  height="80"
                  width="80"
                  radius="9"
                  color="#4fa94d"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
              </div>
            )}
            {movie?.overview}
          </p>
        </div>
        <div className="items-center w-full flex flex-row justify-between">
          {movie?.home && (
            <button
              onClick={() => (window.location.href = movie?.home)}
              className="bg-yellow-500 text-black border-2 text-center border-black rounded-xl p-2 font-extrabold"
            >
              Watch NOW
            </button>
          )}
        </div>
      </div>
      <div className="w-full h-full p-7">
        <div className="border-2 rounded-lg border-black p-2 gap-5 flex flex-col">
          <ul className="flex flex-row overflow-auto w-full shadow-inner scroll gap-1 p-4 py-2 bg-gray-200">
            {movie?.genre?.map((el) => (
              <li className="text-base border-2 p-1 rounded-md bg-white">
                {el}
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-2 md:grid-cols-4 items-center p-4 py-2 rounded-lg">
            <span className="bg-white p-2 py-1 shadow-inner text-lg w-">
              {movie?.time}min.
            </span>
            <span className="bg-white p-2 py-1 overflow-x-auto shadow-inner text-lg flex gap-2 flex-auto">
              {movie?.lang?.map((el) => (
                <span>{el.name}</span>
              ))}
            </span>
            <span className="bg-white p-2 py-1 shadow-inner text-lg w-full overflow-x-auto">
              Build on : {movie?.budget}
            </span>
            <span className="bg-white p-2 py-1 shadow-inner text-lg w-full overflow-x-auto">
              Collected : {movie?.boxOffice}
            </span>
          </div>
        </div>
      </div>
      <hr />
      <div className="flex flex-col">
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
          <Crew id={id} type="movie" />
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
          <Cast id={id} type="movie" />
        </Suspense>
        <Suspense
          fallback={
            <div className="h-full w-full justify-center items-center h-7/12 md:h-9/12 flex">
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
          <Rec id={id} type="movie" />
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
          <Footer />{" "}
        </Suspense>
      </div>
    </div>
  );
}
