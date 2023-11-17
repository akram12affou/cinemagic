import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useFetch } from '../hooks/useFetch';
import {useState} from 'react'
import LoadingComp from './loading/loadingComp';
import { motion } from 'framer-motion';

function PersonImageDetails({id}) {
  const [open, setOpen] = useState(false);
  const [imgModal , setImgModal] = useState('')
    const handleOpen = (path) =>{
     setImgModal(path);
     setOpen(true);
  } 
  const handleClose = () => setOpen(false);
const {data  , loading} = useFetch(`https://api.themoviedb.org/3/person/${id}/images?api_key=${import.meta.env.VITE_REACT_APP_TMDB_KEY}`,null)
  return (
    <div>
            <span className="font-semibold tracking-wide text-xl">Photos</span>
        
              <div className='flex flex-wrap gap-2 mt-4 overflow-hidden sm:gap-4'> 
                 {loading && <><LoadingComp/></>}
                {data?.profiles?.map((person) => {
                    return(
                        <div className='rounded-lg  w-1/4  sm:w-1/6 overflow-hidden bg_color'>
                                 <motion.div  
                              initial={{ scale: 0.9, opacity: 0.4 }}
                              animate={{ scale: 1, opacity: 1 }}>
                            <img className='rounded-lg w-full cursor-pointer hover:scale-105 hover:rotate-1 overflow-hidden trans bg_color' width={185}
                          height={260} onClick={() => handleOpen(person?.file_path)} src={`https://image.tmdb.org/t/p/w185/${person.file_path}`} alt="" />
                          </motion.div>
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
        <Box className='flex  sm:w-1/4 w-1/2 justify-center mx-auto  items-center outline-none border border-black rounded-sm '>
          <div className=''>
          <img className='' src={`https://image.tmdb.org/t/p/original/${imgModal}`} alt="" />
          </div>
        </Box> 
      </Modal>
          </div>
  )
}

export default PersonImageDetails