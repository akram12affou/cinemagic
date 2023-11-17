
import MovieCart from '../Components/MovieCart';
import axios from 'axios';
import { useContext,useEffect, useState } from 'react';
import { WatchedListContext } from '../Context/watchedListContext';
import { useCookies } from "react-cookie";
import LoadingComp from '../Components/loading/loadingComp';
import { MdKeyboardReturn } from "react-icons/md";
import { Link } from 'react-router-dom';
function WatchList() {
  const [loading , setLoading] = useState(false)
  const [cookie , setCookie , removeCookie] = useCookies(['accestoken']);
  const {dispatchl , watchedList} = useContext(WatchedListContext)
  useEffect(() => {
    setLoading(true)
    axios.get('http://localhost:8888/movie' , 
     {headers: { token : cookie?.accestoken }}
   ).then(res => {
    setLoading(false)
     dispatchl({type:'FETCH_WATCHEDLIST' , payload:res.data});
    }).catch(err => {
      setLoading(false)
     console.log(err)
    });
 },[]);
  return (
    <div className='second_bg_color min-h-screen'>
    <div className='sm:w-10/12 w-11/12 mx-auto'>
      <h2 className='font-semibold sm:text-2xl text-xl text-white decoration-1 pt-8'>Watched List</h2> 
      <div className='flex flex-wrap gap-x-7 gap-y-10 justify-center relative top-8'>
        
        {loading ? 
         <LoadingComp/> :   
         <>{watchedList.map((movie) => {
          return(
                <MovieCart movie={movie} watchedList={watchedList}/>
          );
        })}
        </>
        }
        {
           (!loading && watchedList.length==0 ) && <h1 className='text-white text-xl tracking-wide flex items-center gap-2'>Your list is empty. Return home to build your watched collection  <Link to='/'><button className='bg-white text-black rounded-sm hover:scale-105 trans'><MdKeyboardReturn className='text-2xl'/></button></Link>  </h1>
        }
      </div>
         <br/><br/>
      </div>
       
    </div>
  )
};

export default WatchList