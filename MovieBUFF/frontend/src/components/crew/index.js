import React, { useEffect, Suspense, useState } from "react";
import { Dna } from "react-loader-spinner";

export default function CrewCard(props) {
  const [crew, setCrew] = useState([]);
  const Slider = React.lazy(() => import("../slider/index.js"));
  const getCrew = () => {
    fetch(
      "https://api.themoviedb.org/3/" +
        props.type +
        "/" +
        props.id +
        "/credits?api_key="+process.env.REACT_APP_MOVIE_API_KEY+""
    )
      .then((res) => res.json())
      .then((data) => {
        setCrew([]);
        for (
          let i = 0;
          i < (data?.crew?.length < 20 ? data?.crew?.length : 20);
          i++
        ) {
          const entr = {
            alt: data?.crew[i]?.name,
            tag: [data?.crew[i]?.job, data?.crew[i]?.name],
            src: data?.crew[i]?.profile_path
              ? "https://image.tmdb.org/t/p/w200" + data?.crew[i]?.profile_path
              : "/assets/images/nonfoundhor.png",
          };
          setCrew((crew) => [...crew, entr]);
        }
      })
      .catch((err) => {
        window.open("/404");
      });
  };

  useEffect(() => {
    getCrew();
  }, []);
  return (
    <>
      {crew?.length > 0 && (
        <div className="flex font-xl fontDesi p-2 flex-col w-full h-full">
          <div className="w-full flex justify-end">
            <div className="flex w-full flex-row-reverse items-center gap-0">
              <div className="w-28 h-1 bg-black"></div>
              <div className="border-2 border-black rounded-b-none bg-yellow-400 text-black w-fit p-2 py-1 rounded-xl">
                Crew
              </div>
            </div>
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
            <Slider arr={crew} />
          </Suspense>
        </div>
      )}
    </>
  );
}
