import {useNavigate} from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { BiUserCircle } from 'react-icons/Bi';
import {useContext , useState} from 'react'
import { BsFillBookmarksFill } from 'react-icons/bs';
import { TbLogout } from "react-icons/tb";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import { MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useAuth } from '../hooks/getAuthContext';
import { useWatchedList } from '../hooks/getWatchedListContext';
function Nav({query,setQuery}) {
  const ITEM_HEIGHT = 48;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [cookie , setCookie , removeCookie] = useCookies(['accestoken'])
  const navigate = useNavigate()
  const {dispatchl} = useWatchedList()
 const {user,dispatch} = useAuth();
  const writeQuery = (e) => {
    setQuery(e.target.value)
    navigate('/')
  }

  const navigateToHome = () => {
    setQuery('')
    navigate('/')
  }
  const navigateToAuth = () => {
    setQuery('')
    navigate('/auth')
  }
  const navigateToWatchList = () => {
    setQuery('');
    navigate('/watchList');
  }
  
  const Logout = () => {
    dispatch({type:'LOGOUT'});
    removeCookie('accestoken');
    navigate('/');
    dispatchl({type:"DELETE_ALL_WATCHED_LIST"});
  }
  return (
    
    <div className="bg_color flex  justify-center items-center overflow-hidden header_height p-2 md:p-0">
      <div className="flex flex-col gap-2 md:gap-2 md:flex-row md:w-9/12 w-10/12 justify-between md:items-center items-start">
        <div className="font-bold text-white tracking-wider text-2xl cursor-pointer" onClick={navigateToHome}>CINEMAGIC</div>
        <div className="flex align-items gap-4">
          <input type="text" placeholder="search a movie" value={query} onChange={e => writeQuery(e)} className="p-2 outline-none rounded-sm w-7/12 text-sm sm:w-64" />
          {cookie?.accestoken ?  
          <> <div className='flex items-center gap-4'>
                <div className='flex items-center text-white  gap-3 '>
                  <div className=' border border-slate-200 flex  bg-white text-black items-center gap-2 p-1 rounded-md'>
                     <span>
                    <BiUserCircle className="text-xl"/>
                  </span>
                <span className='text-sm font-semibold tracking-wide'>
                 {user?.username}
                </span>
                  </div>
                  <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon className='text-white' />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
       
          <MenuItem key={'g'}  onClick={handleClose}>
           <button className='text-black flex  font-semibold tracking-wide items-center gap-2 trans hover:tracking-wider ' onClick={navigateToWatchList}><BsFillBookmarksFill className="text-xl"/> Watched List</button>
          </MenuItem>
          <MenuItem key={'g'}  onClick={handleClose}>
           <button className="text-black font-semibold  tracking-wide trans  sm:text-base  flex justify-center items-center gap-2 hover:tracking-wider" onClick={Logout} title='Logout'><TbLogout className="text-xl text-black"/> Log out</button>
          </MenuItem>
      </Menu>
    </div>           
                </div>
               </div>
               </> 
           :        
           <button className="text-white font-semibold uppercase tracking-wider  md:text-base text-sm" onClick={navigateToAuth} >Login</button>

          }
        </div>
      </div>
    </div>
  );
}

export default Nav;
