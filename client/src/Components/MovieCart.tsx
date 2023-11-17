import {FiStar} from 'react-icons/fi';
import {FaStar} from 'react-icons/fa'
import {useNavigate} from 'react-router-dom';
import {SiThemoviedatabase} from 'react-icons/si'
import {Link} from 'react-router-dom'
import axios from 'axios';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css"

import { useGetToken } from '../hooks/useGetToken';
import {useWatchedList} from '../hooks/getWatchedListContext'
import { motion } from 'framer-motion';
function MovieCart({movie , setQuery}) {
    const token = useGetToken()
    const {dispatchl , watchedList} = useWatchedList()
    const navigate = useNavigate();
    const {id,title,poster_path,vote_average} =movie;
    const bg_color =  vote_average<7 ?  " bg_rating_bad" : " bg_rating_good";

    const navigatetoMovie = () => {
      scrollTo(0,0);
      navigate(`/movie/${id}`);
      setQuery('');
    };
    
    const addToFavorite = () => {
    if(token.headers.token){
      dispatchl({type:'ADD_TO_WATCHEDLIST' , payload:{
        title,poster_path,vote_average, id
        }})
         axios.post('http://localhost:8888/movie/add',{
         title,poster_path,vote_average, id
         },token
         ).then(res => {
          // console.log(res.data);
         });
    }else{
        navigate('/auth');
        scrollTo(0,0);
        Toastify({
          text: "login to Add to your watch List",
          className: "info",
          style: {
            background: "linear-gradient(to right, #1f1f1f, #141414)",
          },
          duration: 3000,
          offset: {
            x:20,
            y: 70 
          },
        }).showToast();
    }
  }

  const vote = () => {
    const voteN = +vote_average
    return voteN.toFixed(2)
  }

  const removeFromFavorite = (movie) => {
     dispatchl({type: 'REMOVE_FROM_WATCHEDLIST', payload:movie})
     axios.delete(`http://localhost:8888/movie/remove/${movie.id}` ,token
     ).then(res => {
      // console.log(res.data);
     })
  }

const InFavorite = (id) => {
  let exist = false
  for(let i =0 ; watchedList?.length > i ; i++){
    if(+watchedList[i].id == id ){
      exist = true
    }
  }
   return exist
 }

  return (
    <div className='flex flex-col items-center gap-1 overflow-hidden'>
        <div className="relative">
        <motion.div  
          initial={{ scale: 0.9, opacity: 0.4 }}
          animate={{ scale: 1, opacity: 1 }}>
        <div className='bg_color hover:-translate-y-0.5 transition ease-in-out rounded-md duration-700'>
        

           {poster_path ? <Link to={`/movie/${id}`}><img  className='w-10 rounded-md img hover:sepia-[.5] cursor-pointer duration-700' src={`https://image.tmdb.org/t/p/w400/${poster_path}`} alt="" onClick={navigatetoMovie}/></Link>  :
          <>
           <div className='flex justify-center items-center w-10 rounded-md img hover:-translate-y-0.5 transition ease-in-out hover:sepia-[.5] cursor-pointer duration-700 bg_color'>
           <SiThemoviedatabase className='text-2xl'/>
           </div>
          </>}
         
        </div>
        </motion.div>
           <span className={"absolute text-white top-2 font-semibold tracking-wide text-sm p-1 rounded-r-lg md:text-base " + bg_color}>{vote()}</span>
        </div>
        <div className='flex items-center w-full justify-evenly  gap-3'>
               <span className='text-white text-sm lg:text-base hover:tracking-wide cursor-pointer trans ' title={title}>
               <Link to={`/movie/${id}`}>{title.substring(0,10)} {title.length>10 && <>...</>}</Link>
                </span>
                <div>
                  {InFavorite(movie.id) ? <FaStar className='text-white text-base lg:text-xl cursor-pointer active:scale-105' onClick={() => removeFromFavorite(movie)}/> : <FiStar  onClick={addToFavorite} className='text-white text-base lg:text-xl cursor-pointer active:scale-105'/> }
                </div>
        </div>
    </div>
  )
}

export default MovieCart