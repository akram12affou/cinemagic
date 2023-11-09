import {FiStar} from 'react-icons/fi';
import {useNavigate} from 'react-router-dom';
import {SiThemoviedatabase} from 'react-icons/si'
import {Link} from 'react-router-dom'
function MovieCart({movie , setQuery}) {
    const navigate = useNavigate();
    const {id,title,poster_path,vote_average} =movie;
    const bg_color =  vote_average<7 ?  " bg-gray-500" : " bg-lime-500";
    const navigatetoMovie = () => {
      scrollTo(0,0)
      navigate(`/movie/${id}`)
      setQuery('')
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
         
          
           <span className={"absolute text-white top-2  text-base p-1 rounded-r-lg" + bg_color}>{vote_average.toFixed(2)}</span>
        </div>
        <div className='flex items-center w-full justify-evenly  gap-3'>
             <span className=' text-white text-sm sm:text-base hover:tracking-wide cursor-pointer trans '>
                    {title.substring(0,10)}
                </span>
                <div>
                  <FiStar className='text-white text-xl cursor-pointer'/>  
                </div>
        </div>      
    </div>
  )
}

export default MovieCart