import {FiStar} from 'react-icons/fi';
import {FaStar} from 'react-icons/fa'
import {useNavigate} from 'react-router-dom';
import {SiThemoviedatabase} from 'react-icons/si'
import {Link} from 'react-router-dom'
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css"
import { useContext } from 'react';
import { WatchedListContext } from '../Context/watchedListContext';
function MovieCart({movie , setQuery}) {
  const {dispatch , watchedList} = useContext(WatchedListContext)

    const navigate = useNavigate();
    const [cookie ,_] =useCookies(['accestoken']);

    const {id,title,poster_path,vote_average} =movie;
    const bg_color =  vote_average<7 ?  " bg-gray-500" : " bg-lime-500";

    const navigatetoMovie = () => {
      scrollTo(0,0);
      navigate(`/movie/${id}`);
      setQuery('');
    };
    
    const addToFavorite = () => {
    if(cookie.accestoken){
         axios.post('http://localhost:8888/movie/add',{
         title,poster_path,vote_average, id
         },{headers: { token : cookie?.accestoken }}
         ).then(res => {
          console.log(res.data);
         });
    }else{
        navigate('/auth');
        scrollTo(0,0);
        Toastify({
          text: "login to Add to your watch List",
          className: "info",
          style: {
            background: "linear-gradient(to right, #ff8888, #454545)",
          },
          duration: 3000,
          offset: {
            x:10,
            y: 660 
          },
        }).showToast();
    }
  }

  const vote = () => {
    const voteN = +vote_average
    return voteN.toFixed(2)
  }

  const removeFromFavorite = (movie) => {
     axios.delete(`http://localhost:8888/movie/remove/${movie._id}` , {headers: { token : cookie?.accestoken }}
     ).then(res => {
      console.log(res.data)
     })
  }

  return (
    <div className='flex flex-col items-center gap-1.5'>
        <div className="relative">
        <div className='bg_color'>
           {poster_path ? <Link to={`/movie/${id}`}><img  className='w-10 rounded-md img hover:-translate-y-0.5 transition ease-in-out hover:sepia-[.5] cursor-pointer duration-700' src={`https://image.tmdb.org/t/p/w400/${poster_path}`} alt="" onClick={navigatetoMovie}/></Link>  :
          <>
           <div className='flex justify-center items-center w-10 rounded-md img hover:-translate-y-0.5 transition ease-in-out hover:sepia-[.5] cursor-pointer duration-700 bg_color'>
           <SiThemoviedatabase className='text-2xl'/>
           </div>
          </> }
        </div>
         
          
           <span className={"absolute text-white top-2  text-base p-1 rounded-r-lg" + bg_color}>{vote()}</span>
        </div>
        <div className='flex items-center w-full justify-evenly  gap-3'>
             <span className=' text-white text-sm sm:text-base hover:tracking-wide cursor-pointer trans '>
                    {title.substring(0,10)}
                </span>
                <div>
                   {JSON.stringify(watchedList)}
                  {movie.userId ? <FaStar className='text-white text-xl cursor-pointer active:scale-105' onClick={() => removeFromFavorite(movie)}/> : <FiStar  onClick={addToFavorite} className='text-white text-xl cursor-pointer active:scale-105'/> }
                </div>
        </div>      
    </div>
  )
}

export default MovieCart