import React, { Suspense, useState, useEffect } from "react";

export default function Rec(props) {
  const [rec, setRec] = useState([]);
  const Slider = React.lazy(() => import("../slider"));
  const getRec = () => {
    fetch(
      "https://api.themoviedb.org/3/" +
        props?.type +
        "/" +
        props?.id +
        "/recommendations?api_key=d295dbc3df693393259f2c07fb7a0e4a&page=1"
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
              link: "/tv/" + el.id,
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
            <Slider className="cursor-pointer" arr={rec} />
          </Suspense>
        </div>
      )}
    </>
  );
}
