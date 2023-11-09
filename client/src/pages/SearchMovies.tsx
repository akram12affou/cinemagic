
import { useFetch } from "../hooks/useFetch"
import MovieCart from "../Components/MovieCart"
import LoadingComp from "../Components/loading/loadingComp"

function SearchMovies({query ,setQuery}) {
         const {data , loading , error} = useFetch(`https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_REACT_APP_TMDB_KEY}&language=en-US&page=${1}&include_adult=${false}&query=${query}`,query)
  return (
    <div className="second_bg_color  min-h-screen ">

    <div className='relative top-8 sm:w-10/12 w-11/12 mx-auto'>
    <div className='flex flex-wrap gap-x-7 gap-y-10 justify-center'>
        {
          loading ?
          <div className='relative top-20 mt-10'>
            <LoadingComp/>
          </div>
          :
          <>
          {data?.results?.map((movie)=> {
    return(
      <MovieCart  movie={movie}  setQuery={setQuery}/>
    )
          })}  
          </>
        }
    </div>
    </div>
<br /><br />
    </div>

  )
}

export default SearchMovies