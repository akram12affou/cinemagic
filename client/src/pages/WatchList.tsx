import {useEffect , useState} from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import MovieCart from '../Components/MovieCart';

function WatchList() {
  const [cookie,removeCookie,setCookie] = useCookies(['accestoken']);
  const [watchedList , setWatchedList]= useState([])
  useEffect(() => {
     axios.get('http://localhost:8888/movie' , 
      {headers: { token : cookie?.accestoken }}
    ).then(res => {
      setWatchedList(res.data);
     }).catch(err => {
      console.log(err)
     })
  },[])
  return (
    <div className='second_bg_color min-h-screen'>
    <div className='sm:w-10/12 w-11/12 mx-auto'>
      <h2 className='font-semibold sm:text-2xl text-xl text-white decoration-1 pt-8'>Watched List</h2> 
      <div className='flex flex-wrap gap-x-7 gap-y-10 justify-center relative top-8'>
        {watchedList.map((movie) => {
          return(
                <MovieCart movie={movie} />
          );
        })}
      </div>
         
      </div>
       
    </div>
  )
};

export default WatchList