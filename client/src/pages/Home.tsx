import MovieCart from '../Components/MovieCart';
import Moviefilter from '../Components/Moviefilter'
import { useFetch } from '../hooks/useFetch'
import LoadingComp from '../Components/loading/loadingComp';
import { useContext, useState} from 'react'
import { WatchedListContext } from '../Context/watchedListContext';
function Home() {
    const {watchedList} = useContext(WatchedListContext);
    const [alignment, setAlignment] = useState('popular');
    const {data , loading} = useFetch(`https://api.themoviedb.org/3/movie/${alignment}?api_key=${import.meta.env.VITE_REACT_APP_TMDB_KEY}&language=en-US}`,alignment)
  return (
    <div className='second_bg_color min-h-screen'>
     <div className='sm:w-10/12 w-11/12 mx-auto'>
        <Moviefilter alignment={alignment} setAlignment={setAlignment} />
        <br />
        <div className='relative top-2'>
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
                     <MovieCart  movie={movie} watchedList={watchedList}/>
                  )
                  })}
                  </>
                }
            </div>
        </div>
        <br /><br />
     </div>
    </div>
   
  )
}

export default Home