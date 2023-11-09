import {useState} from 'react'
import { useFetch } from '../hooks/useFetch'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

function Images({id}) {
  const [open, setOpen] = useState(false);
  const [imgModal , setImgModal] = useState('')
  const handleOpen = (path) =>{
     setImgModal(path);
     setOpen(true);
  } 
  const handleClose = () => setOpen(false);
   const {data , loading , error} = useFetch(`https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_REACT_APP_TMDB_KEY}`,null)
  return (
    <>
    {data?.backdrops?.length !== 0 &&
     <div className='flex flex-col mx-auto justify-between text-white mt-8  gap-3 '>
    <div className='sm:w-8/12 w-9/12  flex  mx-auto'>
       <h2 className='font-semibold sm:text-2xl text-xl underline decoration-1 '>
        Images
      </h2> 
      <div></div>
    </div>
    <div className='flex flex-wrap gap-x-7 gap-y-6 justify-center'>
        {data?.backdrops?.slice(0,9).map((e,i) => {
            return(
            <div  width={200} height={100} className='img-film_backdrop sm:w-1/4 rounded-md   w-8/12 cursor-zoom-in overflow-hidden bg-black' key={i}>
              <img className='hover:scale-105 trans bg-black' onClick={() => handleOpen(e?.file_path)}  src={`https://image.tmdb.org/t/p/w500/${e?.file_path}`} alt="" /> 
       
             </div>
            )
        })}
    </div>
    <Modal
    className='flex justify-center items-center'
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className='flex  justify-center mx-auto sm:w-8/12 w-11/12 outline-none border border-black rounded-sm'>
          <div className='bg-red-200 w-full'>
          <img className=' mx-auto' src={`https://image.tmdb.org/t/p/original//${imgModal}`} alt="" />
          </div>
        </Box> 
      </Modal>
   </div>
  }</>

    
        
        
  
  )
}

export default Images