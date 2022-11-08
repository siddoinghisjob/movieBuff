import React,{useEffect,Suspense,useState} from 'react';
import { Dna } from 'react-loader-spinner';

export default function CastCard(props) {
  const [cast,setCast] = useState([]);
  const Slider = React.lazy(()=>import("../slider/index.js"));
  const getCast = ()=>{
    fetch(
      'https://api.themoviedb.org/3/'+props.type+'/'+props.id+'/credits?api_key='+process.env.REACT_APP_MOVIE_API_KEY)
    .then((res)=>res.json())
    .then(data=>{
      setCast([])
      for(let i = 0; i < (data?.cast?.length<20?data?.cast?.length:20); i++){
        const entr = {
          alt:data?.cast[i]?.name,
          tag:[data?.cast[i]?.character,data?.cast[i]?.name],
          src:data?.cast[i]?.profile_path?"https://image.tmdb.org/t/p/w300"+data?.cast[i]?.profile_path:"/assets/images/nonfoundhor.png"
        }
        setCast(cast=>[...cast,entr]);
      }
  })
    .catch(err=>{
      window.open("/404");
    })
  }

  useEffect(()=>{
    getCast();
  },[])
  return (
    <>
    {cast?.length>0 &&
        <div className="flex font-xl fontDesi p-2 flex-col w-full h-full">
            <div className="w-full flex justify-start mb-2">
            <div className="flex w-full flex-row items-center gap-0">
                <div className="w-28 h-1 bg-black"></div>
                <div className="border-2 border-black rounded-b-none bg-yellow-400 text-black w-fit p-2 py-1 rounded-xl">
                Cast
                </div>
            </div>
            </div>
            <Suspense fallback={
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
                  }>
                <Slider arr={cast} />
            </Suspense>
        </div>
        }
    </>
  )
}