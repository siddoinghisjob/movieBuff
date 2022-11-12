import React, { Suspense, useState, useEffect } from "react";
import { Dna } from "react-loader-spinner";

export default function Rec(props) {
  const [rec, setRec] = useState([]);
  const Slider = React.lazy(() => import("../slider"));
  const getRec = () => {
    fetch(
      "https://api.themoviedb.org/3/" +
        props?.type +
        "/" +
        props?.id +
        "/recommendations?api_key=" +
        process.env.REACT_APP_MOVIE_API_KEY +
        "&page=1"
    )
      .then((res) => res.json())
      .then((data) => {
        setRec([]);
        data.results?.forEach((el) => {
          setRec((rec) => [
            ...rec,
            {
              src: el.poster_path
                ? "https://image.tmdb.org/t/p/w500" + el.poster_path
                : "/assets/images/nonfoundhor.png",
              alt: el.title,
              link: "/"+props?.type+"/" + el.id,
            },
          ]);
        });
      })
      .catch((err) => {
        window.open("/404");
      });
  };

  useEffect(() => {
    getRec();
  }, []);
  return (
    <>
      {rec?.length > 0 && (
        <div className="flex font-xl fontDesi p-2 flex-col w-full h-full">
          <div className="flex w-full flex-row items-center gap-0">
            <div className="w-28 h-1 bg-black"></div>
            <div className="border-2 border-black rounded-b-none bg-yellow-400 text-black w-fit p-2 py-1 rounded-xl">
              Recommendations
            </div>
          </div>{" "}
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
            <Slider className="cursor-pointer" arr={rec} />
          </Suspense>
        </div>
      )}
    </>
  );
}
