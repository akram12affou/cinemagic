
import MovieCart from '../Components/MovieCart';
import { useContext } from 'react';
import { WatchedListContext } from '../Context/watchedListContext';

function WatchList() {
  const {dispatch , watchedList} = useContext(WatchedListContext)

  return (
    <div className='second_bg_color min-h-screen'>
    <div className='sm:w-10/12 w-11/12 mx-auto'>
      <h2 className='font-semibold sm:text-2xl text-xl text-white decoration-1 pt-8'>Watched List</h2> 
      <div className='flex flex-wrap gap-x-7 gap-y-10 justify-center relative top-8'>
        {watchedList.map((movie) => {
          return(
                <MovieCart movie={movie} watchedList={watchedList}/>
          );
        })}
      </div>
         
      </div>
       
    </div>
  )
};

export default WatchList