import { useState } from 'react';
import {useParams} from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import LoadingComp from '../Components/loading/loadingComp';
import Cast from '../Components/Cast';
import Images from '../Components/Images';
import Recomendation from '../Components/Recomendation';
import { motion } from 'framer-motion';
function MovieDetails() {
    const {id} = useParams()
    const [personNumber , setPersonNumber] = useState(true)
    const {data  , loading} = useFetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_REACT_APP_TMDB_KEY}&language=en-US`,id)
    const {original_title , overview,poster_path,release_date,budget,runtime,revenue, vote_average} = data
    const bg_color =  vote_average<7 ?  " bg_rating_bad" : " bg_rating_good";
  return (
    <div className='second_bg_color min-h-screen '>
        {
            loading ? 
            <div className='flex justify-center relative top-20'>
               <LoadingComp/>
             </div>
            : 
            <>
                <motion.div  
        initial={{y:22 , opacity:0}}
        animate={{y: 0,opacity:1}}
              >
            <div className='flex flex-row justify-center mx-auto items-start text-white relative top-5 gap-3'>
        <div className='relative '>
            <img src={`https://image.tmdb.org/t/p/w400/${poster_path}`} className='rounded-md img_details' />
            <span className={'absolute font-semibold tracking-wide top-3 rounded-r-lg p-1 text-white' + bg_color} >{vote_average}</span>
        </div>
        <div className='flex flex-col gap-4 w-1/2'>
            <div>
              title:
            <h2 className='font-semibold text-xl tracking-wide'>{original_title}</h2>  
            </div>
            <div className='flex flex-col '>
              overflow:
              <span className='text-sm sm:text-base'>{overview}</span>
            </div>
            <div className='sm:flex flex-col hidden'>
                <span className='text-sm'>Release date:</span>
                <span className='text-sm sm:text-base'>{release_date}</span>  
            </div>
            {
            budget!==0 &&
                <div className='sm:flex flex-col hidden'>
                <span className='text-sm'>Budget:</span> 
                <span className='text-sm sm:text-base'>{budget} $</span>
            </div>
            }
            {
            revenue!==0 &&
            <div className='sm:flex flex-col hidden'>
            <span className='text-sm'>Revenue:</span>
            <span className='text-sm sm:text-base'>{revenue} $</span>
        </div>
            }
            <div className='sm:flex flex-col hidden '>
                 <span className='text-sm'>Duration:</span>
                <span className='text-sm sm:text-base'>{runtime} mn</span>
            </div>
            <div className='sm:flex flex-col hidden '>
                <div className='flex flex-wrap gap-2'>
                    {data.genres?.map((e) => {
                return(
                    <div className='p-1 bg_rating_good font-semibold tracking-wide rounded-md text-sm sm:text-base'>{e.name}</div>
                )
               })}  
                </div>
            </div>
        </div>
    </div>
    <br />
    <div className='flex justify-evenly relative top-3 items-center flex-wrap gap-2'>
        <div className='flex flex-col sm:hidden text-white'>
                <span className='text-sm'>Release date:</span>
                <span className='text-sm'>{release_date}</span>  
            </div>
            {budget!==0 &&
            <div className='flex flex-col sm:hidden text-white'>
                <span className='text-sm'>Budget:</span> 
                <span className='text-sm sm:text-base'>{budget} $</span>
            </div>
            }
            {revenue!==0 &&
                  <div className='flex flex-col sm:hidden text-white'>
                  <span className='text-sm'>Revenue:</span>
                  <span className='text-sm sm:text-base'>{revenue} $</span>
              </div>

            }
            <div className='flex flex-col sm:hidden text-white'>
                 <span className='text-sm'>Duration:</span>
                <span className='text-sm sm:text-base'>{runtime} mn</span>
            </div>
            <div className='flex flex-col flex-wrap w-1/4 sm:hidden text-white justify-center'>
                <div className='flex flex-wrap  gap-2 mx-auto'>
                    {data.genres?.map((e) => {
                return(
                    <div className='p-1 bg_rating_good rounded-md text-xs sm:text-base font-semibold tracking-wide '>{e.name}</div>
                )
               })}  
                </div>
             </div> 
    </div>
     <Cast id={id} personNumber={personNumber} setPersonNumber={setPersonNumber}/>
     <Images id={id} />
     <Recomendation id={id} />
     </motion.div>
    </>
    
        } 
    <br /><br />
    </div>
     
  )
}

export default MovieDetails