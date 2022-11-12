import React, { useState, useEffect, Suspense, useRef } from "react";
import Header from "../header";
import { Dna, ThreeDots, RotatingLines } from "react-loader-spinner";
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
        "/videos?api_key=" +
        process.env.REACT_APP_MOVIE_API_KEY
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
        "?api_key=" +
        process.env.REACT_APP_MOVIE_API_KEY
    )
      .then((res) => res.json())
      .then((data) => {
        const episodeData = [];
        data.episodes?.forEach((el) =>
          episodeData.push({
            name: el.name,
            poster: "https://image.tmdb.org/t/p/w300" + el.still_path,
            overview: el.overview ? el.overview : " ",
            rating: el.vote_count,
            number: el.episode_number,
          })
        );
        const entr = {
          name: data.name,
          overview: data.overview ? data.overview : " ",
          poster: data.poster_path
            ? "https://image.tmdb.org/t/p/w400" + data.poster_path
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
      backgroundSize: "100% 100%",
    },
  };

  return (
    <>
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
                    <Image source={tv?.poster} alt={tv?.name} act={true} />
                  </Suspense>
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
                    tv?.bg !== "/assets/images/nonfoundhor.png" && (
                      <img src={tv?.bg} alt={tv?.name} />
                    )}
                </div>
              </div>
              <div className="hidden md:flex flex-col justify-between h-full">
                <p className="w-full flex justify-center items-center">
                  {!tv?.overview && (
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
                  {tv?.overview}
                  {tv?.date}
                </p>
                <div className="p-2 w-full flex items-center justify-between flex-row">
                  {tv?.home && (
                    <a
                      href={tv?.home ? tv?.home : ""}
                      className="bg-yellow-500 text-center text-black border-2 border-black rounded-xl p-2 font-extrabold"
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
                  <Image
                    source={episode?.poster ? episode?.poster : tv?.poster}
                    className="h-10 w-5"
                    alt={episode?.name}
                    act={episode?.poster ? false : true}
                  />
                </Suspense>
              </div>
              <p className="w-full justify-center items-center">
                {!tv?.overview && (
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
                {tv?.overview}
              </p>
            </div>
            <div className="items-center w-full flex flex-row justify-between">
              {tv?.home && (
                <button
                  onClick={() => (window.location.href = tv?.home)}
                  className="bg-yellow-500 text-center text-black border-2 border-black rounded-xl p-2 font-extrabold"
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
                <span className="bg-cyan-100 overflow-x-auto text-cyan-800 px-2 py-2 font-bold rounded-md w-fit">
                  {tv?.status}
                </span>
                <ul>
                  {tv?.lang?.map((el) => (
                    <li>{el.name}</li>
                  ))}
                </ul>
              </div>
              <p className="text-lg flex w-full justify-center items-center">
                {!episode?.overview && (
                  <div className="flex items-center justify-center">
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
                {episode?.overview}
              </p>
              {episode?.episode?.length > 0 && (
                <div>
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
              <Cast id={id} type="tv" />
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
              <Crew id={id} type="tv" />
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
              <Rec act={false} id={id} type="tv" />
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
      </Suspense>
    </>
  );
}
