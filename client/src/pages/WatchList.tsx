
import MovieCart from '../Components/MovieCart';
import axios from 'axios';
import { useContext,useEffect } from 'react';
import { WatchedListContext } from '../Context/watchedListContext';
import { useCookies } from "react-cookie";

function WatchList() {
  const [cookie , setCookie , removeCookie] = useCookies(['accestoken']);
  const {dispatchl , watchedList} = useContext(WatchedListContext)
  useEffect(() => {
    
    axios.get('http://localhost:8888/movie' , 
     {headers: { token : cookie?.accestoken }}
   ).then(res => {
     dispatchl({type:'FETCH_WATCHEDLIST' , payload:res.data});
    }).catch(err => {
     console.log(err)
    });
 },[]);
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
         <br /><br />
      </div>
       
    </div>
  )
};

export default WatchList