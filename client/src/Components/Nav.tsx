import {useNavigate} from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { BiUserCircle } from 'react-icons/Bi';
import {useContext} from 'react'
import { AuthContext } from '../Context/authContext';
import { BsFillBookmarksFill } from 'react-icons/bs';
function Nav({query,setQuery}) {
  const [cookie , setCookie , removeCookie] = useCookies(['accestoken'])
  const navigate = useNavigate()
 const {user,dispatch} = useContext(AuthContext)
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
    setQuery('')
    navigate('/watchList')
  }
  
  const Logout = () => {
    dispatch({type:'LOGOUT'});
    removeCookie('accestoken');
  }
  return (
    <div className="bg_color flex  justify-center items-center overflow-hidden header_height p-2 sm:p-0">
      <div className="flex flex-col gap-2 sm:gap-2 sm:flex-row sm:w-9/12 w-10/12 justify-between sm:items-center items-start">
        <div className="font-bold text-white tracking-wider text-2xl cursor-pointer" onClick={navigateToHome}>CINEMAGIC</div>
        <div className="flex align-items gap-4">
          <input type="text" placeholder="search a movie ..." value={query} onChange={e => writeQuery(e)} className="p-2 outline-none rounded-sm w-1/2" />
          {cookie?.accestoken ?  
                <div className='sm:flex items-center gap-4'>
                <div className='flex items-center text-white gap-3 '>
                  <div className=' border border-slate-200 flex  items-center gap-2 p-1 rounded-md'>
                     <span>
                    <BiUserCircle className="text-xl"/>
                  </span>
                <span>
                 {user?.username}
                </span>
                  </div>
                 <div>
                  <button className='uppercase font-semibold tracking-wide' onClick={navigateToWatchList}><BsFillBookmarksFill className="text-xl"/></button>
                </div>
                </div>
                <div className='flex justify-center'>
                            <button className="text-white font-semibold uppercase tracking-wider  sm:text-base text-sm flex justify-center" onClick={Logout}>Logout</button>
                </div>
               </div>
           :        
           
           <button className="text-white font-semibold uppercase tracking-wider  sm:text-base text-sm" onClick={navigateToAuth}>Login</button>

          }
        </div>
      </div>
    </div>
  );
}

export default Nav;
