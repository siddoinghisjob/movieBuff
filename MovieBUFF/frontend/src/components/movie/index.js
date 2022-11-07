import React, { useState, useEffect, Suspense } from "react";
import Header from "../header";
import { useParams } from "react-router-dom";
import Image from "../image";

export default function Movie() {
  let { id } = useParams();
  const Rec = React.lazy(() => import("../rec"));
  const Crew = React.lazy(() => import("../cast"));
  const Cast = React.lazy(() => import("../crew"));
  const Footer = React.lazy(() => import("../footer"));
  const [movie, setMovie] = useState();
  const [trailer, setTrailer] = useState(null);
  const getData = () => {
    fetch(
      "https://api.themoviedb.org/3/movie/" +
        id +
        "?api_key=d295dbc3df693393259f2c07fb7a0e4a"
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
        "/videos?api_key=d295dbc3df693393259f2c07fb7a0e4a"
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
        className="flex fontDesi h-full w-full gap-10 text-white flex-col p-2 md:px-10 py-5 justify-center items-center"
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
            <div className="flex flex-col fontDesi h-full justify-center w-full p-1">
              {trailer && (
                <div className="flex relative justify-center items-center md:min-h-[17rem] min-h-[13rem] w-full bg-gradient-to-tr from-orange-300 to bg-green-400 rounded-lg">
                  <iframe
                    src={"https://www.youtube.com/embed/" + trailer}
                    frameborder="0"
                    allow="autoplay; encrypted-media"
                    allowfullscreen
                    title="video"
                    className="h-full min-w-full absolute z-10 md:min-h-[17rem] min-h-[13rem]"
                    loading="lazy"
                  />
                  <div className="w-20 z-0 h-20 flex items-center justify-center animate-pulse text-prime bg-yellow-500 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="35"
                      height="35"
                      fill="currentColor"
                      class="bi bi-cloud-download-fill"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 0a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 4.095 0 5.555 0 7.318 0 9.366 1.708 11 3.781 11H7.5V5.5a.5.5 0 0 1 1 0V11h4.188C14.502 11 16 9.57 16 7.773c0-1.636-1.242-2.969-2.834-3.194C12.923 1.999 10.69 0 8 0zm-.354 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V11h-1v3.293l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z"
                      />
                    </svg>
                  </div>
                </div>
              )}
              <div className="flex md:hidden flex-row w-full text-center justify-center items-center">
                Rated
                <b className="text-xl text-yellow-400">
                  {" "}
                  &nbsp;{movie?.voteAcu}
                </b>
                /10
              </div>
            </div>
          </div>
          <div className="hidden md:flex flex-col justify-between h-full">
            <p className="w-fit">{movie?.overview}</p>
            <div className="p-2 w-full flex items-center justify-between flex-row">
              {movie?.home && (
                <a
                  href={movie?.home ? movie?.home : ""}
                  className="bg-yellow-500 text-black border-2 border-black rounded-xl p-2 font-extrabold"
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
          <p className="w-fit">{movie?.overview}</p>
        </div>
        <div className="items-center w-full flex flex-row justify-between">
          {movie?.home && (
            <button
              onClick={() => (window.location.href = movie?.home)}
              className="bg-yellow-500 text-black border-2 border-black rounded-xl p-2 font-extrabold"
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
            <span className="bg-white p-2 py-1 shadow-inner text-lg flex gap-2 flex-auto">
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
      <Suspense
        fallback={
          <div className="h-full w-full justify-center items-center flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-arrow-repeat"
              viewBox="0 0 16 16"
            >
              <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
              <path
                fill-rule="evenodd"
                d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
              />
            </svg>
          </div>
        }
      >
        <div className="flex flex-col">
          <Crew id={id} type="movie" />
          <Cast id={id} type="movie" />
          <Rec id={id} type="movie" />
        </div>
        <Footer />
      </Suspense>
    </div>
  );
}
