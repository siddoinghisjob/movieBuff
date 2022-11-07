import React, { useState, useEffect, Suspense } from "react";
import Header from "../header";
import { useParams } from "react-router-dom";

export default function TV() {
  let { id } = useParams();
  const [tv, settv] = useState();
  const [trailer, setTrailer] = useState(null);
  const Rec = React.lazy(() => import("../rec"));
  const Cast = React.lazy(() => import("../cast"));
  const Crew = React.lazy(() => import("../crew"));
  const Image = React.lazy(() => import("../image"));
  const DivSlider = React.lazy(() => import("../divSlider"));
  const Footer = React.lazy(() => import("../footer"));

  const [episode, setEpisode] = useState();

  const getData = () => {
    fetch(
      "https://api.themoviedb.org/3/tv/" +
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
        const creters = [];
        data.created_by.map((el) => creters.push(el.name));
        const ent = {
          overview: data.overview ? data.overview : "No overview",
          poster: data.poster_path
            ? "https://image.tmdb.org/t/p/w500" + data.poster_path
            : "/assets/images/nofoundhor.png",
          bg: data.backdrop_path
            ? "https://image.tmdb.org/t/p/original" + data.backdrop_path
            : "/assets/images/nonfoundhor.png",
          genre: genres,
          name: data.name,
          status: data.status,
          tag: data.tagline,
          vote: data.vote_average ? rate : 0,
          voteAcu: data.vote_average ? data.vote_average : 0,
          home: data.homepage,
          lang: data.spoken_languages,
          firstSeason: data.seasons[0]?.season_number
            ? data.seasons[0]?.season_number
            : 0,
          lastSeason: data.number_of_seasons ? data.number_of_seasons : 0,
          createdBy: creters,
        };
        settv((tv) => ent);
        setKey((key) =>
          data.seasons[0]?.season_number ? data.seasons[0]?.season_number : 0
        );
      })
      .catch((err) => {
        window.location.href = "/error";
      });
  };
  const getTrailer = () => {
    fetch(
      "https://api.themoviedb.org/3/tv/" +
        id +
        "/videos?api_key=d295dbc3df693393259f2c07fb7a0e4a"
    )
      .then((res) => res.json())
      .then((data) => {
        data.results?.forEach((el) => {
          if (el.type === "Trailer" && el.official === true) {
            setTrailer(el.key);
          }
        });
      })
      .catch((err) => {
        window.location.href = "/error";
      });
  };

  document.title = tv?.name ? tv?.name : "Movie BUFF";
  useEffect(() => {
    getData();
    getTrailer();
  }, []);
  const [key, setKey] = useState(tv?.firstSeason);
  const getEpData = () => {
    fetch(
      "https://api.themoviedb.org/3/tv/" +
        id +
        "/season/" +
        (key ? key : tv?.firstSeason) +
        "?api_key=d295dbc3df693393259f2c07fb7a0e4a"
    )
      .then((res) => res.json())
      .then((data) => {
        const episodeData = [];
        data.episodes?.forEach((el) =>
          episodeData.push({
            name: el.name,
            poster: "https://image.tmdb.org/t/p/w200" + el.still_path,
            overview: data.overview,
            rating: el.vote_count,
            number: el.episode_number,
          })
        );
        const entr = {
          name: data.name,
          overview: data.overview,
          poster: data.poster_path
            ? "https://image.tmdb.org/t/p/w300" + data.poster_path
            : "/assets/images/nonfoundhor.png",
          episode: episodeData,
        };
        setEpisode((episode) => entr);
      });
  };
  useEffect(() => {
    getEpData();
  }, [key]);
  const arr = [];
  for (let i = tv?.firstSeason; i < tv?.lastSeason; i++) {
    arr.push(<option value={i}>Season {i}</option>);
  }
  const style = {
    banner: {
      background: "url('" + tv?.bg + "') no-repeat",
      boxShadow: "inset 0 0 0 1000px rgba(120, 20, 28, 0.6)",
      backgroundSize: "100%",
    },
  };

  return (
    <>
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
        <div className="w-full h-full">
          <Header />
          <div
            style={style.banner}
            className="flex fontDesi h-full w-full gap-10 text-white flex-col p-2 md:px-10 py-5 justify-center items-center"
          >
            <div className="text-lg text-center h-full w-full p-2 md:flex flex-col md:flex-row items-center justify-between">
              <div>
                <div className="text-4xl md:text-5xl lg:text-6xl w-full overflow-x-auto scrollSpec overflow-y-hidden">
                  {tv?.name}
                </div>
                <div className="flex flex-auto gap-2">
                  Created by
                  <ul className="w-full overflow-x-auto overflow-y-clip flex flex-row gap-3 items-center">
                    {tv?.createdBy?.map((el) => (
                      <li>{el}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="hidden md:flex">
                {tv?.tag && (
                  <ul className="flex flex-row gap-1 bg-white shadow-inner text-prime border-2 p-2 rounded-md">
                    <li>{tv?.tag}</li>
                  </ul>
                )}
              </div>
            </div>
            <div className="w-full h-full flex md:grid md:grid-cols-2 flex-col-reverse justify-center items-center gap-3">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="hidden md:flex h-72 w-fit min-w-[12rem] fadeInOut justify-center items-center rounded-md">
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
                    {" "}
                    <Image source={tv?.poster} alt={tv?.name} act={true} />
                  </Suspense>
                </div>
                <div className="flex flex-col fontDesi h-full justify-center w-full p-3">
                  {trailer && (
                    <div className="flex relative w-full min-w-[15rem] justify-center items-center md:min-h-[17rem] md:max-w-[60%] min-h-[13rem] bg-gradient-to-tr from-orange-300 to bg-green-400 rounded-lg">
                      <iframe
                        src={"https://www.youtube.com/embed/" + trailer}
                        frameborder="0"
                        allow="autoplay; encrypted-media"
                        allowfullscreen
                        title="video"
                        className="h-full z-10 min-w-full absolute max-w-full md:min-h-[17rem] min-h-[13rem]"
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
                </div>
              </div>
              <div className="hidden md:flex flex-col justify-between h-full">
                <p className="w-fit">
                  {tv?.overview}
                  {tv?.date}
                </p>
                <div className="p-2 w-full flex items-center justify-between flex-row">
                  {tv?.home && (
                    <a
                      href={tv?.home ? tv?.home : ""}
                      className="bg-yellow-500 text-black border-2 border-black rounded-xl p-2 font-extrabold"
                    >
                      Watch NOW
                    </a>
                  )}
                  <div className="flex flex-row text-center justify-center items-center">
                    Rated
                    <b className="text-xl text-yellow-400">
                      &nbsp;{tv?.voteAcu}
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
                  <Image
                    source={episode?.poster ? episode?.poster : tv?.poster}
                    className="h-10 w-5"
                    alt={episode?.name}
                    act={episode?.poster ? false : true}
                  />
                </Suspense>
              </div>
              <p className="w-fit">{tv?.overview}</p>
            </div>
            <div className="items-center w-full flex flex-row justify-between">
              {tv?.home && (
                <button
                  onClick={() => (window.location.href = tv?.home)}
                  className="bg-yellow-500 text-black border-2 border-black rounded-xl p-2 font-extrabold"
                >
                  Watch NOW
                </button>
              )}
              <span>
                Rated&nbsp;
                <b className="text-2xl text-yellow-400"> {tv?.voteAcu}</b>
                /10
              </span>
            </div>
          </div>
          <div className="w-full h-full p-7">
            <div className="border-2 rounded-lg border-black p-2 gap-5 flex flex-col">
              <ul className="flex flex-row overflow-auto w-full shadow-inner scroll gap-1 p-4 py-2 bg-gray-200">
                {tv?.genre?.map((el) => (
                  <li className="text-base border-2 p-1 rounded-md bg-white">
                    {el}
                  </li>
                ))}
              </ul>
              {arr.length > 0 && (
                <div>
                  <select onChange={(e) => setKey((key) => e.target.value)}>
                    {!episode && <option>Seasons</option>}
                    {arr}
                  </select>
                </div>
              )}
              <div className="flex flex-row gap-2 items-center p-3 rounded-lg">
                <span className="bg-cyan-100 text-cyan-800 px-2 py-2 font-bold rounded-md w-fit">
                  {tv?.status}
                </span>
                <ul>
                  {tv?.lang?.map((el) => (
                    <li>{el.name}</li>
                  ))}
                </ul>
              </div>
              <p className="text-lg">{episode?.overview}</p>
              {episode?.episode?.length > 0 && (
                <div>
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
                    <DivSlider arr={episode?.episode} />
                  </Suspense>
                </div>
              )}
            </div>
          </div>
          <hr />
          <div className="flex flex-col gap-2">
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
              <Cast id={id} type="tv" />
            </Suspense>
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
              <Crew id={id} type="tv" />
            </Suspense>
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
              <Rec id={id} type="tv" />
            </Suspense>
          </div>
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
            <Footer />
          </Suspense>
        </div>
      </Suspense>
    </>
  );
}
