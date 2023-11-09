import { useFetch } from "../hooks/useFetch";
import Person from "./Person";
function Cast({ id,personNumber,setPersonNumber }) {
  const { data } = useFetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${import.meta.env.VITE_REACT_APP_TMDB_KEY}&language=en-US`);
  return (
    <div>
      {data?.cast?.length !== 0 && 
       <>
           <div className='sm:w-8/12 w-9/12 flex mx-auto justify-between text-white mt-8 sm:mt-5'>
        <h2 className='font-semibold sm:text-2xl text-xl underline decoration-1 '>
            Top Billed Cast
        </h2>
        <button className={!personNumber ? `border border-white rounded-md px-2 py-1 hover:scale-105 trans bg-white text-black` : `border border-white rounded-md px-2 py-1 hover:scale-105 trans`} onClick={() =>  setPersonNumber(prev => !prev)}>
            Show all
        </button>
    </div>
    <div>
    </div>
    <div>
      <div className="sm:w-10/12 w-11/12 mx-auto mt-3">
        <div className="flex flex-wrap justify-center sm:gap-x-6 sm:gap-y-5 gap-4">
         
       {data.cast?.slice(0,personNumber ? 6 : data.cast.length).map((person,i) => {
        return(
            <Person person={person} key={i} />
        )
       })}
        </div>
      </div>
    </div>
       </>
       
      }

    </div>
 
  );
}

export default Cast;
