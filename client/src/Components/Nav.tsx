import {useNavigate} from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { BiUserCircle } from 'react-icons/Bi';
function Nav({query,setQuery}) {
  const [cookie , setCookie , removeCookie] = useCookies(['accestoken'])
  const navigate = useNavigate()

  const writeQuery = (e) => {
    setQuery(e.target.value)
    navigate('/')
  }

  const navigateToHome = () => {
    setQuery('')
    navigate('/')
  }
  const Logout = () => {

  }
  return (
    <div className="bg_color flex  justify-center items-center overflow-hidden header_height p-2 sm:p-0">
      <div className="flex gap-5 header_gap  flex-col sm:flex-row sm:w-10/12 w-11/12 justify-evenly sm:items-center items-start">
        <div className="font-bold text-white tracking-wider text-2xl cursor-pointer" onClick={navigateToHome}>CINEMAGIC</div>
        <div className="flex align-items gap-4">
          <input type="text" placeholder="search a movie ..." value={query} onChange={e => writeQuery(e)} className="p-2 outline-none rounded-sm w-64" />
          {cookie ?  
                <div>
                <div className='flex items-center gap-1 text-white'>
                  <span>
                    <BiUserCircle className="text-xl"/>
                  </span>
                <span>
                 akram affou llej uyfs
                </span>
                </div>
            <button className="text-white font-semibold uppercase tracking-wider  sm:text-base text-sm flex justify-center" onClick={Logout}>Logout</button>
               </div>
           :        
           
           <button className="text-white font-semibold uppercase tracking-wider  sm:text-base text-sm" onClick={() => navigate('/auth')}>Login</button>

          }
        </div>
      </div>
    </div>
  );
}

export default Nav;
